import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import {
  getAuthenticatedUser,
  errorResponse,
  successResponse,
  unauthorizedResponse,
} from '@/lib/api-helpers'
import { PROFILE_QUESTIONS, type IProfileQuestion } from '@/lib/constants'

const submitSchema = z.object({
  assessmentId: z.string().min(1).optional(),
  standard: z.string().min(1).default('12th-standard'),
  // Reusing Assessment.region to store stream (science/commerce/arts) for 12th.
  region: z.string().min(1).default('general'),
  timeExpired: z.boolean().default(false),
  profileAnswers: z.record(z.string(), z.number().int().nullable()).default({}),
})

function computeProfileScores(profileAnswers: Record<string, number | null>) {
  const factorSums: Record<string, number> = {}
  const factorCounts: Record<string, number> = {}

  for (const q of PROFILE_QUESTIONS) {
    const rawScore = profileAnswers[q.id]
    if (rawScore === null || rawScore === undefined) continue

    const finalScore = q.isReversed ? 6 - rawScore : rawScore
    factorSums[q.type] = (factorSums[q.type] || 0) + finalScore
    factorCounts[q.type] = (factorCounts[q.type] || 0) + 1
  }

  const types = Array.from(new Set(PROFILE_QUESTIONS.map((q) => q.type)))
  const breakdown: Record<string, number> = {}
  const rows = types.map((type) => {
    const sum = factorSums[type] || 0
    const count = factorCounts[type] || 0

    const averageScore = count > 0 ? sum / count : 0
    const percentage = count > 0 ? parseFloat((((averageScore - 1) / 4) * 100).toFixed(1)) : 0

    breakdown[type] = percentage

    return { factor: type, averageScore, percentage }
  })

  return { breakdown, rows }
}

type ClusterWeights = Record<string, Record<string, number>>

const SCIENCE_WEIGHTS: ClusterWeights = {
  Engineering: {
    Investigative: 0.3,
    Realistic: 0.25,
    Conscientiousness: 0.25,
    Extraversion: -0.1,
    Social: -0.1,
    TotalWeight: 0.7,
  },
  Medicine: {
    Social: 0.3,
    Investigative: 0.2,
    Agreeableness: 0.2,
    Neuroticism: -0.1,
    Extraversion: 0.1,
    TotalWeight: 0.9,
  },
  Research: {
    Investigative: 0.25,
    Artistic: 0.15,
    Openness: 0.3,
    Extraversion: -0.15,
    Conscientiousness: 0.15,
    TotalWeight: 1.0,
  },
}

const COMMERCE_WEIGHTS: ClusterWeights = {
  Accounting: {
    Conventional: 0.35,
    Investigative: 0.2,
    Conscientiousness: 0.25,
    Neuroticism: -0.15,
    Social: -0.1,
    TotalWeight: 1.05,
  },
  Management: {
    Enterprising: 0.3,
    Social: 0.25,
    Extraversion: 0.2,
    Openness: 0.15,
    Realistic: -0.1,
    TotalWeight: 1.0,
  },
  CorporateLaw: {
    Conventional: 0.25,
    Enterprising: 0.25,
    Conscientiousness: 0.25,
    Extraversion: 0.15,
    Agreeableness: -0.1,
    TotalWeight: 1.0,
  },
  DataAnalytics: {
    Investigative: 0.35,
    Conventional: 0.15,
    Openness: 0.25,
    Conscientiousness: 0.15,
    Extraversion: -0.1,
    TotalWeight: 1.0,
  },
}

const ARTS_WEIGHTS: ClusterWeights = {
  SocialSciences: {
    Social: 0.35,
    Investigative: 0.2,
    Agreeableness: 0.2,
    Neuroticism: -0.1,
    TotalWeight: 0.85,
  },
  CreativeArts: {
    Artistic: 0.35,
    Openness: 0.3,
    Extraversion: 0.1,
    Conventional: -0.15,
    Realistic: -0.1,
    TotalWeight: 1.0,
  },
  Journalism: {
    Enterprising: 0.25,
    Social: 0.2,
    Extraversion: 0.25,
    Openness: 0.15,
    Conscientiousness: -0.1,
    TotalWeight: 0.95,
  },
  CivilService: {
    Conventional: 0.25,
    Investigative: 0.25,
    Conscientiousness: 0.25,
    Openness: 0.1,
    Agreeableness: -0.1,
    TotalWeight: 1.0,
  },
}

function getClusterWeightsForStream(stream: string): ClusterWeights {
  const s = stream.toLowerCase()
  if (s.includes('science')) return SCIENCE_WEIGHTS
  if (s.includes('commerce')) return COMMERCE_WEIGHTS
  if (s.includes('arts')) return ARTS_WEIGHTS
  return SCIENCE_WEIGHTS
}

function mapToCareerClusters(scores: Record<string, number>, clusterWeights: ClusterWeights) {
  const results: Array<{ cluster: string; score: number }> = []

  for (const [cluster, weights] of Object.entries(clusterWeights)) {
    let weightedSum = 0
    for (const [trait, weight] of Object.entries(weights)) {
      if (trait === 'TotalWeight') continue
      const userScore = scores[trait] !== undefined ? scores[trait] : 50
      weightedSum += userScore * weight
    }
    const totalAbsoluteWeight = (weights as any).TotalWeight || 1
    const finalScore = weightedSum / totalAbsoluteWeight
    results.push({ cluster, score: parseFloat(finalScore.toFixed(1)) })
  }

  results.sort((a, b) => b.score - a.score)
  return results
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) return unauthorizedResponse()

    const body = await request.json()
    const data = submitSchema.parse(body)

    const assessmentId = data.assessmentId

    const profileAnswers: Record<string, number | null> = {}
    for (const q of PROFILE_QUESTIONS) {
      const v = data.profileAnswers[q.id]
      profileAnswers[q.id] = v === undefined ? null : v
    }

    const { breakdown: profileBreakdown, rows: profileRows } = computeProfileScores(profileAnswers)
    const clusterWeights = getClusterWeightsForStream(data.region)
    const clusterFits = mapToCareerClusters(profileBreakdown, clusterWeights)
    const top = clusterFits[0]
    const second = clusterFits[1]

    const confidence = Math.min(100, Math.max(0, Math.round(top?.score ?? 0)))
    const flexibility = Math.min(100, Math.max(0, Math.round((top?.score ?? 0) - (second?.score ?? 0))))

    const result = await prisma.$transaction(async (tx) => {
      const now = new Date()

      let assessment: any = null

      if (assessmentId) {
        assessment = await tx.assessment.findFirst({ where: { id: assessmentId, userId: user.id } })

        if (assessment) {
          await Promise.all([
            tx.assessmentAnswer.deleteMany({ where: { assessmentId } }),
            tx.profileScore.deleteMany({ where: { assessmentId } }),
            tx.finalScore.deleteMany({ where: { assessmentId } }),
          ])

          assessment = await tx.assessment.update({
            where: { id: assessmentId },
            data: {
              standard: data.standard,
              region: data.region,
              completed: true,
              timeExpired: data.timeExpired,
              completedAt: now,
            },
          })
        } else {
          try {
            assessment = await tx.assessment.create({
              data: {
                id: assessmentId,
                userId: user.id,
                standard: data.standard,
                region: data.region,
                completed: true,
                timeExpired: data.timeExpired,
                completedAt: now,
              },
            })
          } catch {
            assessment = await tx.assessment.create({
              data: {
                userId: user.id,
                standard: data.standard,
                region: data.region,
                completed: true,
                timeExpired: data.timeExpired,
                completedAt: now,
              },
            })
          }
        }
      } else {
        assessment = await tx.assessment.create({
          data: {
            userId: user.id,
            standard: data.standard,
            region: data.region,
            completed: true,
            timeExpired: data.timeExpired,
            completedAt: now,
          },
        })
      }

      const answersToCreate = PROFILE_QUESTIONS.map((q: IProfileQuestion) => ({
        assessmentId: assessment.id,
        questionId: q.id,
        questionType: 'profile',
        answerValue: profileAnswers[q.id],
      }))

      await tx.assessmentAnswer.createMany({ data: answersToCreate })
      await tx.profileScore.createMany({
        data: profileRows.map((r) => ({
          assessmentId: assessment.id,
          factor: r.factor,
          averageScore: r.averageScore,
          percentage: r.percentage,
        })),
      })

      const finalScore = await tx.finalScore.create({
        data: {
          assessmentId: assessment.id,
          // 12th test doesn't map to science/commerce/arts fits directly; keep 0s and store recommendation.
          scienceFit: clusterFits[0]?.score ?? 0,
          commerceFit: clusterFits[1]?.score ?? 0,
          artsFit: clusterFits[2]?.score ?? 0,
          recommendedStream: top?.cluster ?? 'Unknown',
          confidence,
          flexibility,
        },
      })

      return {
        assessmentId: assessment.id,
        finalScore,
        profileBreakdown,
      }
    })

    return successResponse(result, 201)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return errorResponse(error.errors[0]?.message || 'Invalid input', 400)
    }
    console.error('12th assessment submit error:', error)
    return errorResponse('Failed to save assessment results', 500)
  }
}

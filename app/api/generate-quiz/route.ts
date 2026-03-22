import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

type QuizQuestion = {
  question: string
  options: string[]
  correctAnswer: 'A' | 'B' | 'C' | 'D'
}

type QuizResponse = {
  questions: QuizQuestion[]
}

function extractYoutubeId(url: string): string | null {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : null
}

function normalizeApiKey(raw: string | undefined) {
  if (!raw) return ''
  let apiKey = raw.trim().replace(/^['"]|['"]$/g, '')
  if (apiKey.includes(' ')) apiKey = apiKey.split(' ')[0]
  return apiKey
}

function fallbackQuizFromTranscript(transcript: string): QuizResponse {
  const source = transcript.replace(/\s+/g, ' ').trim()
  const snippet = source.slice(0, 160)

  return {
    questions: [
      {
        question: 'What is the main topic discussed in this lesson?',
        options: [
          `A: ${snippet || 'Core web development concepts'}`,
          'B: Advanced rocket propulsion systems',
          'C: Ancient mythology timelines',
          'D: Professional cooking techniques',
        ],
        correctAnswer: 'A',
      },
      {
        question: 'Which approach best helps you learn from this video?',
        options: [
          'A: Skip practice and only watch once',
          'B: Practice with small examples while learning',
          'C: Avoid taking notes or summaries',
          'D: Memorize without understanding',
        ],
        correctAnswer: 'B',
      },
      {
        question: 'What should be your next step after watching?',
        options: [
          'A: Build one small project using the topic',
          'B: Ignore the topic and switch randomly',
          'C: Delete your notes and restart later',
          'D: Avoid trying any exercises',
        ],
        correctAnswer: 'A',
      },
      {
        question: 'How do you best verify your understanding?',
        options: [
          'A: Explain the concept in your own words',
          'B: Only watch at higher speed',
          'C: Never test yourself',
          'D: Avoid asking questions',
        ],
        correctAnswer: 'A',
      },
    ],
  }
}

function sanitizeQuiz(input: any): QuizResponse {
  const rows = Array.isArray(input?.questions) ? input.questions : []
  const normalized = rows
    .map((q: any) => {
      const question = (q?.question || '').toString().trim()
      const options = Array.isArray(q?.options)
        ? q.options.map((o: any) => (o || '').toString().trim()).slice(0, 4)
        : []
      let correctAnswer = (q?.correctAnswer || '').toString().trim().toUpperCase()

      if (!['A', 'B', 'C', 'D'].includes(correctAnswer)) {
        correctAnswer = 'A'
      }

      if (!question || options.length < 4) return null
      return {
        question,
        options,
        correctAnswer: correctAnswer as 'A' | 'B' | 'C' | 'D',
      }
    })
    .filter(Boolean) as QuizQuestion[]

  if (normalized.length === 0) {
    return fallbackQuizFromTranscript('')
  }

  return { questions: normalized.slice(0, 4) }
}

async function fetchTranscript(videoId: string): Promise<string> {
  try {
    const { YtTranscript } = await import('yt-transcript')
    const transcriptFetcher = new YtTranscript({ videoId })
    const transcriptData = await transcriptFetcher.getTranscript()
    if (Array.isArray(transcriptData) && transcriptData.length > 0) {
      return transcriptData.map((item: any) => item.text).join(' ')
    }
  } catch (error) {
    console.warn('Could not fetch transcript from yt-transcript:', error)
  }

  return 'This lesson explains foundational web development ideas and practical best practices for beginners.'
}

async function generateQuizWithGemini(transcript: string, apiKey: string): Promise<QuizResponse | null> {
  const prompt =
    'Generate exactly 4 multiple-choice quiz questions from this transcript. ' +
    'Output only valid JSON in this shape: ' +
    '{"questions":[{"question":"...","options":["A: ...","B: ...","C: ...","D: ..."],"correctAnswer":"A"}]}. ' +
    'Keep each question clear for beginners.\n\n' +
    `Transcript:\n${transcript.slice(0, 4000)}`

  try {
    const genai = (await import('@google/genai').catch(() => null)) as any
    if (!genai) return null

    const ClientCandidates = [
      genai?.GoogleGenAI,
      genai?.default?.GoogleGenAI,
      genai?.default,
      genai?.createClient,
      genai?.default?.createClient,
    ]

    let ai: any = null
    for (const Candidate of ClientCandidates) {
      if (!Candidate) continue
      try {
        if (typeof Candidate === 'function') {
          try {
            ai = new Candidate({ apiKey })
            break
          } catch {
            ai = Candidate({ apiKey })
            break
          }
        }
      } catch {
        // Keep trying variants.
      }
    }

    if (!ai?.models?.generateContent) return null

    const resp = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: { temperature: 0.4, maxOutputTokens: 800 },
    })

    const text =
      resp?.text ||
      resp?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join('\n') ||
      ''

    if (!text.trim()) return null

    const jsonCandidate = text.match(/\{[\s\S]*\}/)?.[0]
    if (!jsonCandidate) return null

    const parsed = JSON.parse(jsonCandidate)
    return sanitizeQuiz(parsed)
  } catch (error) {
    console.warn('Gemini quiz generation failed, using fallback quiz:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { videoUrl } = await request.json()

    if (!videoUrl || typeof videoUrl !== 'string') {
      return NextResponse.json({ error: 'Video URL is required' }, { status: 400 })
    }

    const videoId = extractYoutubeId(videoUrl)
    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 })
    }

    const transcript = await fetchTranscript(videoId)

    const apiKey =
      normalizeApiKey(process.env.GEMINI_API_KEY) ||
      normalizeApiKey((process.env as any).gemini_api_key) ||
      normalizeApiKey(process.env.GOOGLE_API_KEY)

    const aiQuiz = apiKey ? await generateQuizWithGemini(transcript, apiKey) : null
    const quiz = aiQuiz || fallbackQuizFromTranscript(transcript)

    return NextResponse.json(quiz)
  } catch (error) {
    console.error('Quiz generation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

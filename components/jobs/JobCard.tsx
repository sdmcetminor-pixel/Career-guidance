/**
 * JobCard Component
 * =================
 * Renders a single job recommendation with:
 * - Match percentage ring
 * - Skill chips (green = matched, red = missing)
 * - Readiness feedback
 * - Apply button
 * - Framer Motion entrance animation
 */

'use client'

import { motion } from 'framer-motion'
import type { MatchResult } from '@/lib/skill-matcher'

type Job = {
  id: string
  title: string
  company: string
  location: string
  employmentType: string
  applyUrl: string
  requiredSkills: string[]
  datePosted: string
  description: string
}

type Props = {
  job: Job
  match: MatchResult
  index: number
  isSelected: boolean
  onSelect: (jobId: string) => void
}

/**
 * Returns a color based on the match score.
 * Green for high match, yellow for moderate, red for low.
 */
function getScoreColor(score: number): string {
  if (score >= 70) return '#22c55e' // green
  if (score >= 40) return '#eab308' // yellow
  return '#ef4444' // red
}

/**
 * Maps employment type codes to human-readable badges.
 */
function formatEmploymentType(type: string): string {
  const map: Record<string, string> = {
    'FULLTIME': 'Full-Time',
    'PARTTIME': 'Part-Time',
    'INTERN': 'Internship',
    'CONTRACTOR': 'Contract',
  }
  return map[type] || type
}

export default function JobCard({ job, match, index, isSelected, onSelect }: Props) {
  const scoreColor = getScoreColor(match.score)
  const circumference = 2 * Math.PI * 36 // radius 36
  const offset = circumference - (match.score / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
      onClick={() => onSelect(job.id)}
      className={`
        relative overflow-hidden rounded-3xl border cursor-pointer
        transition-all duration-300 hover:scale-[1.02]
        ${isSelected
          ? 'border-primary bg-surface shadow-lg shadow-primary/10'
          : 'border-outline-variant/30 bg-surface hover:border-outline-variant hover:shadow-sm'
        }
      `}
    >
      {/* Gradient accent strip at top */}
      <div
        className="h-1.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${scoreColor}, ${scoreColor}88, transparent)`,
        }}
      />

      <div className="p-5">
        {/* Header: Company initials + title */}
        <div className="flex items-start gap-4">
          {/* Company initial avatar */}
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
            style={{ background: `linear-gradient(135deg, ${scoreColor}cc, ${scoreColor}66)` }}
          >
            {job.company.charAt(0).toUpperCase()}
          </div>

          {/* Title + company + badges */}
          <div className="flex-1 min-w-0">
            <h3 className="text-on-surface font-extrabold text-base leading-tight truncate">
              {job.title}
            </h3>
            <p className="text-on-surface-variant font-medium text-sm mt-0.5 truncate">{job.company}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant">
                📍 {job.location}
              </span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant">
                {formatEmploymentType(job.employmentType)}
              </span>
            </div>
          </div>

          {/* Match score ring */}
          <div className="flex-shrink-0 relative w-20 h-20">
            <svg width="80" height="80" viewBox="0 0 80 80">
              {/* Background circle */}
              <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" className="text-outline-variant/30" strokeWidth="6" />
              {/* Progress circle */}
              <circle
                cx="40" cy="40" r="36"
                fill="none"
                stroke={scoreColor}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 40 40)"
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-black" style={{ color: scoreColor }}>{match.score}%</span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wide">match</span>
            </div>
          </div>
        </div>

        {/* Description preview */}
        {job.description && (
          <p className="text-on-surface-variant text-xs mt-4 line-clamp-2 leading-relaxed">
            {job.description}
          </p>
        )}

        {/* Skill chips */}
        <div className="mt-5">
          <p className="text-[11px] text-on-surface-variant/70 uppercase tracking-wider mb-2 font-black">Skills Overview</p>
          <div className="flex flex-wrap gap-1.5">
            {match.matchedSkills.map(skill => (
              <span
                key={skill}
                className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20"
              >
                ✓ {skill}
              </span>
            ))}
            {match.missingSkills.slice(0, 4).map(skill => (
              <span
                key={skill}
                className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20"
              >
                ✗ {skill}
              </span>
            ))}
            {match.missingSkills.length > 4 && (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant border border-outline-variant/30">
                +{match.missingSkills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Feedback message */}
        <p className="text-sm mt-4 text-on-surface-variant italic">
          &ldquo;{match.feedback}&rdquo;
        </p>

        {/* Apply button */}
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="
            mt-5 w-full block text-center text-sm font-bold py-3 rounded-xl
            bg-primary text-white hover:bg-primary-dim
            transition-all duration-200 shadow-sm
          "
        >
          Apply Now →
        </a>
      </div>
    </motion.div>
  )
}

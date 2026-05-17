/**
 * Job Fetching API Route
 * ======================
 * GET /api/jobs?pathway=frontend&skills=HTML,CSS&level=beginner&location=India
 *
 * Architecture:
 * 1. Receives user context (pathway, skills, level) from frontend
 * 2. Builds a JSearch API query
 * 3. Normalizes results into a consistent shape
 * 4. Caches results in-memory for 10 minutes to avoid rate limits
 * 5. Falls back to curated mock data when RAPIDAPI_KEY is missing
 */

import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type JobResult = {
  id: string
  title: string
  company: string
  location: string
  city: string
  lat: number | null
  lng: number | null
  applyUrl: string
  requiredSkills: string[]
  employmentType: string
  datePosted: string
  description: string
}

// ---------------------------------------------------------------------------
// Simple in-memory cache (key → { data, timestamp })
// Entries expire after 10 minutes to balance freshness vs rate limits.
// ---------------------------------------------------------------------------

const cache = new Map<string, { data: JobResult[]; ts: number }>()
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

// ---------------------------------------------------------------------------
// Known city coordinates for geocoding fallback
// When the API doesn't return lat/lng, we look up the city here.
// ---------------------------------------------------------------------------

const CITY_COORDS: Record<string, [number, number]> = {
  'bangalore':  [12.9716, 77.5946],
  'bengaluru':  [12.9716, 77.5946],
  'mumbai':     [19.0760, 72.8777],
  'delhi':      [28.7041, 77.1025],
  'new delhi':  [28.7041, 77.1025],
  'hyderabad':  [17.3850, 78.4867],
  'chennai':    [13.0827, 80.2707],
  'pune':       [18.5204, 73.8567],
  'kolkata':    [22.5726, 88.3639],
  'noida':      [28.5355, 77.3910],
  'gurugram':   [28.4595, 77.0266],
  'gurgaon':    [28.4595, 77.0266],
  'ahmedabad':  [23.0225, 72.5714],
  'jaipur':     [26.9124, 75.7873],
  'remote':     [20.5937, 78.9629], // center of India
  // International
  'new york':   [40.7128, -74.0060],
  'san francisco': [37.7749, -122.4194],
  'london':     [51.5074, -0.1278],
  'berlin':     [52.5200, 13.4050],
  'singapore':  [1.3521, 103.8198],
  'dubai':      [25.2048, 55.2708],
  'toronto':    [43.6532, -79.3832],
  'sydney':     [-33.8688, 151.2093],
  'tokyo':      [35.6762, 139.6503],
}

function geocodeCity(city: string): [number | null, number | null] {
  if (!city) return [null, null]
  const key = city.toLowerCase().trim()
  for (const [name, coords] of Object.entries(CITY_COORDS)) {
    if (key.includes(name)) return coords
  }
  return [null, null]
}

// ---------------------------------------------------------------------------
// Extract skills from job description text using keyword matching.
// This is a lightweight alternative to NLP — we scan for known tech terms.
// ---------------------------------------------------------------------------

const KNOWN_SKILLS = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue',
  'Node.js', 'Express', 'Next.js', 'Python', 'Django', 'Flask', 'FastAPI',
  'Java', 'Spring', 'C++', 'C#', '.NET', 'Go', 'Rust', 'Ruby', 'Rails',
  'PHP', 'Laravel', 'Swift', 'Kotlin', 'Flutter', 'React Native',
  'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Terraform',
  'Git', 'GitHub', 'CI/CD', 'Jenkins', 'Linux', 'Nginx',
  'REST API', 'GraphQL', 'gRPC', 'Microservices',
  'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy',
  'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision',
  'Data Science', 'Data Engineering', 'ETL', 'Spark', 'Airflow', 'Kafka',
  'Cybersecurity', 'Penetration Testing', 'SIEM', 'Firewalls',
  'Figma', 'Tailwind CSS', 'SASS', 'Responsive Design',
  'Agile', 'Scrum', 'JIRA',
]

function extractSkillsFromText(text: string): string[] {
  if (!text) return []
  const found: string[] = []
  const lower = text.toLowerCase()
  for (const skill of KNOWN_SKILLS) {
    if (lower.includes(skill.toLowerCase())) {
      found.push(skill)
    }
  }
  return [...new Set(found)]
}

// ---------------------------------------------------------------------------
// JSearch API integration
// ---------------------------------------------------------------------------

async function fetchFromJSearch(query: string, location: string): Promise<JobResult[]> {
  const apiKey = process.env.RAPIDAPI_KEY
  if (!apiKey) return []

  const params = new URLSearchParams({
    query: `${query} in ${location}`,
    page: '1',
    num_pages: '1',
    date_posted: 'month',
  })

  try {
    const res = await fetch(`https://jsearch.p.rapidapi.com/search?${params.toString()}`, {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      },
    })

    if (!res.ok) {
      console.error('JSearch API error:', res.status, await res.text())
      return []
    }

    const json = await res.json()
    const results = json.data || []

    return results.map((job: any, idx: number): JobResult => {
      const city = job.job_city || job.job_state || 'Remote'
      const [lat, lng] = job.job_latitude && job.job_longitude
        ? [job.job_latitude, job.job_longitude]
        : geocodeCity(city)

      return {
        id: job.job_id || `jsearch-${idx}`,
        title: job.job_title || 'Untitled Position',
        company: job.employer_name || 'Unknown Company',
        location: [job.job_city, job.job_state, job.job_country].filter(Boolean).join(', ') || 'Remote',
        city,
        lat,
        lng,
        applyUrl: job.job_apply_link || job.job_google_link || '#',
        requiredSkills: extractSkillsFromText(
          `${job.job_title} ${job.job_description || ''} ${(job.job_required_skills || []).join(' ')}`
        ),
        employmentType: job.job_employment_type || 'FULLTIME',
        datePosted: job.job_posted_at_datetime_utc || new Date().toISOString(),
        description: (job.job_description || '').slice(0, 300),
      }
    })
  } catch (err) {
    console.error('JSearch fetch error:', err)
    return []
  }
}

// ---------------------------------------------------------------------------
// Mock fallback data — used when RAPIDAPI_KEY is not set.
// This ensures the feature is demo-able without an API key.
// ---------------------------------------------------------------------------

function getMockJobs(query: string): JobResult[] {
  const mockPool: JobResult[] = [
    {
      id: 'mock-1',
      title: 'Frontend Developer Intern',
      company: 'TechStart Solutions',
      location: 'Bangalore, Karnataka, India',
      city: 'Bangalore',
      lat: 12.9716, lng: 77.5946,
      applyUrl: 'https://www.linkedin.com/jobs',
      requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
      employmentType: 'INTERN',
      datePosted: new Date().toISOString(),
      description: 'Join our team as a frontend intern to build responsive web applications using modern frameworks.',
    },
    {
      id: 'mock-2',
      title: 'Junior Full Stack Developer',
      company: 'InnovateTech Pvt Ltd',
      location: 'Mumbai, Maharashtra, India',
      city: 'Mumbai',
      lat: 19.0760, lng: 72.8777,
      applyUrl: 'https://www.linkedin.com/jobs',
      requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'PostgreSQL'],
      employmentType: 'FULLTIME',
      datePosted: new Date().toISOString(),
      description: 'Looking for a junior full stack developer with knowledge of React and Node.js for building SaaS products.',
    },
    {
      id: 'mock-3',
      title: 'React Developer',
      company: 'CloudNine Systems',
      location: 'Hyderabad, Telangana, India',
      city: 'Hyderabad',
      lat: 17.3850, lng: 78.4867,
      applyUrl: 'https://www.linkedin.com/jobs',
      requiredSkills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Git'],
      employmentType: 'FULLTIME',
      datePosted: new Date().toISOString(),
      description: 'We need a React developer experienced with TypeScript and Next.js to maintain our frontend platform.',
    },
    {
      id: 'mock-4',
      title: 'Python Data Science Intern',
      company: 'DataMinds Analytics',
      location: 'Pune, Maharashtra, India',
      city: 'Pune',
      lat: 18.5204, lng: 73.8567,
      applyUrl: 'https://www.linkedin.com/jobs',
      requiredSkills: ['Python', 'Pandas', 'NumPy', 'SQL', 'Machine Learning'],
      employmentType: 'INTERN',
      datePosted: new Date().toISOString(),
      description: 'Data science internship for students passionate about ML and data analysis using Python ecosystem.',
    },
    {
      id: 'mock-5',
      title: 'DevOps Engineer',
      company: 'ScaleUp Cloud Services',
      location: 'Gurugram, Haryana, India',
      city: 'Gurugram',
      lat: 28.4595, lng: 77.0266,
      applyUrl: 'https://www.linkedin.com/jobs',
      requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Terraform'],
      employmentType: 'FULLTIME',
      datePosted: new Date().toISOString(),
      description: 'Join our DevOps team to build and maintain cloud infrastructure using Kubernetes and Terraform.',
    },
    {
      id: 'mock-6',
      title: 'Machine Learning Engineer',
      company: 'AI Solutions Lab',
      location: 'Chennai, Tamil Nadu, India',
      city: 'Chennai',
      lat: 13.0827, lng: 80.2707,
      applyUrl: 'https://www.linkedin.com/jobs',
      requiredSkills: ['Python', 'TensorFlow', 'Deep Learning', 'NLP', 'MLOps'],
      employmentType: 'FULLTIME',
      datePosted: new Date().toISOString(),
      description: 'Build and deploy ML models for NLP applications. Experience with TensorFlow and production ML required.',
    },
    {
      id: 'mock-7',
      title: 'Cybersecurity Analyst',
      company: 'SecureNet India',
      location: 'Delhi, India',
      city: 'Delhi',
      lat: 28.7041, lng: 77.1025,
      applyUrl: 'https://www.linkedin.com/jobs',
      requiredSkills: ['Cybersecurity', 'SIEM', 'Linux', 'Firewalls', 'Penetration Testing'],
      employmentType: 'FULLTIME',
      datePosted: new Date().toISOString(),
      description: 'Protect enterprise systems from threats. Must have experience with SIEM tools and vulnerability assessment.',
    },
    {
      id: 'mock-8',
      title: 'Backend Developer Trainee',
      company: 'CodeCraft Technologies',
      location: 'Noida, UP, India',
      city: 'Noida',
      lat: 28.5355, lng: 77.3910,
      applyUrl: 'https://www.linkedin.com/jobs',
      requiredSkills: ['Node.js', 'Express', 'MongoDB', 'REST API', 'Git'],
      employmentType: 'INTERN',
      datePosted: new Date().toISOString(),
      description: 'Trainee position for fresh graduates. Learn backend development with Node.js in a fast-paced startup.',
    },
  ]

  // Strict filter mock jobs by relevance to the query
  const q = query.toLowerCase()
  let relevant = mockPool.filter(j => {
    const text = `${j.title} ${j.requiredSkills.join(' ')}`.toLowerCase()
    
    // Strict pathway matching to avoid Data Science showing up in unrelated pathways
    if (q.includes('full-stack') || q.includes('full stack') || (q.includes('html') && q.includes('node'))) {
      // Full Stack should show frontend, backend, or full stack jobs (but NO Data Science/Cyber)
      return text.includes('frontend') || text.includes('backend') || text.includes('full') || text.includes('react') || text.includes('node')
    }
    if (q.includes('frontend') || q.includes('html')) {
      return text.includes('frontend') || text.includes('react') || text.includes('ui')
    }
    if (q.includes('backend') || q.includes('node')) {
      return text.includes('backend') || text.includes('node') || text.includes('express')
    }
    if (q.includes('data') || q.includes('python')) {
      return text.includes('data') || text.includes('machine learning') || text.includes('python')
    }
    if (q.includes('cyber') || q.includes('security')) {
      return text.includes('cyber') || text.includes('security')
    }
    
    const words = q.split(/\s+/)
    return words.some(w => w.length > 3 && text.includes(w))
  })

  // Fallback to full stack jobs if nothing matches to ensure something renders
  if (relevant.length === 0) {
    relevant = mockPool.filter(j => j.title.toLowerCase().includes('frontend') || j.title.toLowerCase().includes('backend'))
  }

  return relevant
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pathway = searchParams.get('pathway') || 'full-stack'
    const level = (searchParams.get('level') || 'beginner') as 'beginner' | 'intermediate' | 'advanced'
    const location = searchParams.get('location') || 'India'
    const query = searchParams.get('query') || ''

    // Import skill matcher to build the search query
    const { mapPathwayToSearchQuery } = await import('@/lib/skill-matcher')
    const searchQuery = query || mapPathwayToSearchQuery(pathway, level)

    // Check cache
    const cacheKey = `${searchQuery}:${location}`
    const cached = cache.get(cacheKey)
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      return NextResponse.json({ jobs: cached.data, source: 'cache', query: searchQuery })
    }

    // Fetch from JSearch or fall back to mock
    let jobs: JobResult[]
    let source: string

    if (process.env.RAPIDAPI_KEY) {
      jobs = await fetchFromJSearch(searchQuery, location)
      source = 'jsearch'
      if (jobs.length === 0) {
        // API returned no results — use mock as fallback
        jobs = getMockJobs(searchQuery)
        source = 'mock-fallback'
      }
    } else {
      jobs = getMockJobs(searchQuery)
      source = 'mock'
    }

    // Store in cache
    cache.set(cacheKey, { data: jobs, ts: Date.now() })

    return NextResponse.json({ jobs, source, query: searchQuery })
  } catch (error) {
    console.error('Jobs API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch jobs', jobs: [] },
      { status: 500 }
    )
  }
}

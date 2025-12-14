'use client'

// 12th Standard Students Page
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, BookOpen, ClipboardCheck } from 'lucide-react'

export default function TwelfthStandardPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push('/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            12th Standard Students
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Find your path after completing 12th grade
          </p>
          <Button
            size="lg"
            onClick={() => router.push('/dashboard/12th-standard/test')}
            className="bg-green-600 hover:bg-green-700"
          >
            <ClipboardCheck className="h-5 w-5 mr-2" />
            Take Career Assessment Test
          </Button>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Engineering</CardTitle>
              <CardDescription>B.Tech, B.E. in various specializations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Computer Science, Mechanical, Civil, Electrical, and more engineering branches.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medical Sciences</CardTitle>
              <CardDescription>MBBS, BDS, Pharmacy, Nursing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pursue careers in medicine, dentistry, pharmacy, and healthcare.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Commerce & Business</CardTitle>
              <CardDescription>B.Com, BBA, CA, CS, CMA</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Business administration, accounting, finance, and management programs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Arts & Humanities</CardTitle>
              <CardDescription>BA, BFA, Law, Journalism</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Literature, fine arts, law, journalism, psychology, and social sciences.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

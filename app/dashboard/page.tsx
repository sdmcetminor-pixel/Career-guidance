'use client'

// Dashboard Page - Career Guidance App (Fully Responsive)
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GraduationCap, BookOpen, Code } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()

  const handleCardClick = (group: string) => {
    // Navigate to group page
    router.push(`/dashboard/${group}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
            Career Guidance Dashboard
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 px-2 mb-4">
            Choose your educational level to explore career options
          </p>
          <Button
            onClick={() => router.push('/dashboard/my-dashboard')}
            variant="outline"
            size="lg"
            className="mb-4"
          >
            View My Dashboard
          </Button>
        </div>

        {/* Cards Grid - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
          {/* 10th Standard Card */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 border-2 hover:border-blue-500 w-full"
            onClick={() => handleCardClick('10th-standard')}
          >
            <CardHeader className="text-center pb-3 sm:pb-4 px-4 sm:px-6">
              <div className="mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-semibold">10th Standard Students</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-2">
                Explore career options after completing 10th grade
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Discover various streams and career paths available after 10th standard
              </p>

              <div className="mt-4 flex justify-center">
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push('/dashboard/10th-standard/profile')
                  }}
                >
                  Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 12th Standard Card */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 border-2 hover:border-green-500 w-full"
            onClick={() => handleCardClick('12th-standard')}
          >
            <CardHeader className="text-center pb-3 sm:pb-4 px-4 sm:px-6">
              <div className="mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-semibold">12th Standard Students</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-2">
                Find your path after completing 12th grade
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Explore degree programs, courses, and career opportunities
              </p>

              <div className="mt-4 flex justify-center">
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push('/dashboard/12th-standard/profile')
                  }}
                >
                  Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Technical Group Card */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 border-2 hover:border-purple-500 w-full sm:col-span-2 lg:col-span-1"
            onClick={() => handleCardClick('technical-group')}
          >
            <CardHeader className="text-center pb-3 sm:pb-4 px-4 sm:px-6">
              <div className="mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Code className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-semibold">Technical Group</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-2">
                Career guidance for technical and engineering fields
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Explore engineering, technology, and technical career paths
              </p>

              <div className="mt-4 flex justify-center">
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push('/dashboard/technical-group/profile')
                  }}
                >
                  Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

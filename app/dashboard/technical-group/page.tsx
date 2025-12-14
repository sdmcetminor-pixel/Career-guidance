'use client'

// Technical Group Page
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Code, ClipboardCheck } from 'lucide-react'

export default function TechnicalGroupPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
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
          <div className="mx-auto mb-4 w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
            <Code className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Technical Group
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Career guidance for technical and engineering fields
          </p>
          <Button
            size="lg"
            onClick={() => router.push('/dashboard/technical-group/test')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <ClipboardCheck className="h-5 w-5 mr-2" />
            Take Technical Assessment Test
          </Button>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Software Engineering</CardTitle>
              <CardDescription>Programming, Web Development, Mobile Apps</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full-stack development, mobile app development, software architecture, and cloud computing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Science & AI</CardTitle>
              <CardDescription>Machine Learning, Data Analytics, AI</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Data analysis, machine learning, artificial intelligence, and big data technologies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cybersecurity</CardTitle>
              <CardDescription>Information Security, Ethical Hacking</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Network security, ethical hacking, information security, and digital forensics.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hardware Engineering</CardTitle>
              <CardDescription>Electronics, Embedded Systems, IoT</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Circuit design, embedded systems, IoT development, and hardware engineering.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

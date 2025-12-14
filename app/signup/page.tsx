"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.name.trim()) return setError('Name is required')
    if (!formData.email.includes('@')) return setError('Valid email required')
    if (formData.password.length < 6) return setError('Password must be at least 6 characters')
    if (formData.password !== formData.confirm) return setError('Passwords do not match')

    setIsLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        // API helper returns { error: 'message' } on failures
        setError((data && (data.error || data.message)) || 'Failed to register')
        setIsLoading(false)
        return
      }

      // success -> redirect to login
      router.push('/login')
    } catch (err) {
      setError('Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription className="text-lg">Sign up to access personalized recommendations</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" type="password" value={formData.confirm} onChange={(e) => setFormData({ ...formData, confirm: e.target.value })} required />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Creating...' : 'Create Account'}</Button>
            <Button type="button" variant="ghost" className="w-full" onClick={() => router.push('/login')}>Already have an account? Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

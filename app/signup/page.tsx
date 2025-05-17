"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Globe, Eye, EyeOff, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createUser } from "@/app/actions/auth"

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError("")

    try {
      // In a real app, this would call a server action to create the user
      const result = await createUser(formData)

      if (result.success) {
        setUserEmail(formData.get("email") as string)
        setEmailSent(true)
      } else {
        setError(result.message || "Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <Link href="/" className="absolute left-8 top-8 flex items-center gap-2 font-bold text-xl">
        <Globe className="h-6 w-6" />
        <span>CushPay</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your details below to create your account and get started</CardDescription>
        </CardHeader>

        {emailSent ? (
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-medium">Verify your email</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-xs">
                We've sent a verification email to <strong>{userEmail}</strong>. Please check your inbox and click the
                verification link to activate your account.
              </p>
            </div>
            <Alert>
              <AlertDescription>
                If you don't see the email in your inbox, please check your spam folder.
              </AlertDescription>
            </Alert>
          </CardContent>
        ) : (
          <form action={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country of Residence</Label>
                <Input id="country" name="country" placeholder="United States" required />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-primary underline underline-offset-4 hover:text-primary/90">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  )
}

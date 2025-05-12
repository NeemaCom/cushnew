"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Globe, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { verifyEmail, resendVerificationEmail } from "@/app/actions/auth"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")

  const [isLoading, setIsLoading] = useState(true)
  const [isResending, setIsResending] = useState(false)
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying")
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setStatus("error")
        setMessage("Invalid verification link. Please request a new one.")
        setIsLoading(false)
        return
      }

      try {
        const result = await verifyEmail(token)

        if (result.success) {
          setStatus("success")
          setMessage("Your email has been verified successfully.")
        } else {
          setStatus("error")
          setMessage(result.message || "Failed to verify email. Please try again.")
        }
      } catch (err) {
        setStatus("error")
        setMessage("An unexpected error occurred. Please try again.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    verifyToken()
  }, [token])

  const handleResendEmail = async () => {
    if (!email) return

    setIsResending(true)
    try {
      const result = await resendVerificationEmail(email)

      if (result.success) {
        setMessage("A new verification email has been sent. Please check your inbox.")
      } else {
        setMessage(result.message || "Failed to resend verification email. Please try again.")
      }
    } catch (err) {
      setMessage("An unexpected error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsResending(false)
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
          <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
          <CardDescription>
            {isLoading
              ? "Verifying your email address..."
              : status === "success"
                ? "Your email has been verified"
                : "Email verification failed"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center py-4 text-center">
            {isLoading ? (
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            ) : status === "success" ? (
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            ) : (
              <XCircle className="h-12 w-12 text-red-500 mb-4" />
            )}

            <p className="text-sm text-gray-500 mt-2 max-w-xs">{message}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {status === "success" ? (
            <Button className="w-full" onClick={() => router.push("/login")}>
              Go to Login
            </Button>
          ) : (
            <>
              {email && (
                <Button variant="outline" className="w-full" onClick={handleResendEmail} disabled={isResending}>
                  {isResending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resending...
                    </>
                  ) : (
                    "Resend Verification Email"
                  )}
                </Button>
              )}
              <Button className="w-full" onClick={() => router.push("/login")}>
                Back to Login
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Globe, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { verifyTwoFactor } from "@/app/actions/auth"

export default function TwoFactorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session")

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("app")

  if (!sessionId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Invalid Session</CardTitle>
            <CardDescription>Your session is invalid or has expired.</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>Please try logging in again.</AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/login">Return to Login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  async function handleVerify(formData: FormData) {
    setIsLoading(true)
    setError("")

    try {
      const code = formData.get("code") as string
      const useBackupCode = activeTab === "backup"

      const result = await verifyTwoFactor(sessionId, code, useBackupCode)

      if (result.success) {
        router.push("/dashboard")
      } else {
        setError(result.message || "Verification failed")
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
          <div className="flex items-center justify-center mb-4">
            <ShieldCheck className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Two-Factor Authentication</CardTitle>
          <CardDescription className="text-center">Enter the verification code to complete your login</CardDescription>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="app">Authenticator App</TabsTrigger>
            <TabsTrigger value="backup">Backup Code</TabsTrigger>
          </TabsList>

          <TabsContent value="app">
            <form action={handleVerify}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Authentication Code</Label>
                  <Input
                    id="code"
                    name="code"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="one-time-code"
                    required
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="backup">
            <form action={handleVerify}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Backup Code</Label>
                  <Input
                    id="code"
                    name="code"
                    placeholder="Enter 8-digit backup code"
                    maxLength={8}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter one of your backup codes. Each code can only be used once.
                  </p>
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

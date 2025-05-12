"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, Copy, Check, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { setup2FA, confirm2FA, getCurrentUser } from "@/app/actions/auth"

export default function TwoFactorSetupPage() {
  const router = useRouter()
  const [step, setStep] = useState<"loading" | "setup" | "verify" | "success">("loading")
  const [secret, setSecret] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push("/login")
        return
      }
      setUser(currentUser)

      // Start 2FA setup
      try {
        const result = await setup2FA(currentUser.id)
        if (result.success) {
          setSecret(result.secret)
          setQrCodeUrl(result.qrCodeUrl)
          setStep("setup")
        } else {
          setError(result.message || "Failed to set up 2FA")
        }
      } catch (err) {
        setError("Something went wrong. Please try again.")
        console.error(err)
      }
    }

    loadUser()
  }, [router])

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (!user) {
        setError("User not found")
        return
      }

      const result = await confirm2FA(user.id, verificationCode)

      if (result.success) {
        setBackupCodes(result.backupCodes)
        setStep("success")
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

  function copySecret() {
    navigator.clipboard.writeText(secret)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function copyBackupCodes() {
    navigator.clipboard.writeText(backupCodes.join("\n"))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (step === "loading") {
    return (
      <div className="container max-w-4xl py-6">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Setting up Two-Factor Authentication</CardTitle>
            <CardDescription>Loading...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (step === "setup") {
    return (
      <div className="container max-w-4xl py-6">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-bold">Set Up Two-Factor Authentication</CardTitle>
            </div>
            <CardDescription>Two-factor authentication adds an extra layer of security to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">1. Scan QR Code</h3>
              <p className="text-sm text-muted-foreground">
                Scan this QR code with your authenticator app (like Google Authenticator, Authy, or Microsoft
                Authenticator).
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="relative h-48 w-48 overflow-hidden rounded-lg border bg-white p-2">
                  {/* In a real app, you would generate a QR code image */}
                  <div className="flex h-full w-full items-center justify-center bg-gray-100">
                    <p className="text-center text-sm">QR Code would appear here</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="secret">Secret Key</Label>
                    <div className="flex">
                      <Input id="secret" value={secret} readOnly className="font-mono" />
                      <Button type="button" variant="outline" size="icon" className="ml-2" onClick={copySecret}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span className="sr-only">Copy</span>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      If you can't scan the QR code, you can manually enter this secret key into your app.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">2. Verify Setup</h3>
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit verification code from your authenticator app to confirm setup.
              </p>
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify and Enable 2FA"}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "success") {
    return (
      <div className="container max-w-4xl py-6">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-green-500" />
              <CardTitle className="text-2xl font-bold">Two-Factor Authentication Enabled</CardTitle>
            </div>
            <CardDescription>Two-factor authentication has been successfully enabled for your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> Store your backup codes in a safe place. They can be used to access your
                account if you lose your authenticator device.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Backup Codes</h3>
              <p className="text-sm text-muted-foreground">
                Each backup code can only be used once. Keep these codes somewhere safe but accessible.
              </p>
              <div className="rounded-lg border p-4">
                <div className="grid grid-cols-2 gap-2">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="font-mono text-sm">
                      {code}
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline" size="sm" className="mt-4" onClick={copyBackupCodes}>
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  Copy All Codes
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <a href="/dashboard/security">Return to Security Settings</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return null
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShieldCheck, ShieldAlert, ShieldOff, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getCurrentUser, disable2FAForUser } from "@/app/actions/auth"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SecurityPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [disableDialogOpen, setDisableDialogOpen] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [disableError, setDisableError] = useState("")
  const [disableLoading, setDisableLoading] = useState(false)

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          router.push("/login")
          return
        }
        setUser(currentUser)
      } catch (err) {
        setError("Failed to load user data")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [router])

  async function handleDisable2FA(e: React.FormEvent) {
    e.preventDefault()
    setDisableLoading(true)
    setDisableError("")

    try {
      if (!user) {
        setDisableError("User not found")
        return
      }

      const result = await disable2FAForUser(user.id, verificationCode)

      if (result.success) {
        setUser({ ...user, twoFactorEnabled: false })
        setDisableDialogOpen(false)
        setVerificationCode("")
      } else {
        setDisableError(result.message || "Failed to disable 2FA")
      }
    } catch (err) {
      setDisableError("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setDisableLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Loading...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-6">
      <h1 className="text-2xl font-bold mb-6">Security Settings</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <CardTitle>Two-Factor Authentication</CardTitle>
              </div>
              {user?.twoFactorEnabled ? (
                <div className="flex items-center gap-2 text-sm font-medium text-green-500">
                  <ShieldCheck className="h-4 w-4" />
                  Enabled
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm font-medium text-amber-500">
                  <ShieldAlert className="h-4 w-4" />
                  Not Enabled
                </div>
              )}
            </div>
            <CardDescription>
              Add an extra layer of security to your account by requiring a verification code in addition to your
              password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user?.twoFactorEnabled ? (
              <div className="space-y-4">
                <p className="text-sm">
                  Two-factor authentication is currently enabled for your account. This means you'll need to enter a
                  verification code from your authenticator app when you sign in.
                </p>
                <Dialog open={disableDialogOpen} onOpenChange={setDisableDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <ShieldOff className="mr-2 h-4 w-4" />
                      Disable Two-Factor Authentication
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Disable Two-Factor Authentication</DialogTitle>
                      <DialogDescription>
                        This will remove the extra layer of security from your account. You'll only need your password
                        to sign in.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleDisable2FA} className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="verification-code">Verification Code</Label>
                        <Input
                          id="verification-code"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          placeholder="Enter 6-digit code"
                          maxLength={6}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Enter the 6-digit code from your authenticator app to confirm.
                        </p>
                      </div>
                      {disableError && (
                        <Alert variant="destructive">
                          <AlertDescription>{disableError}</AlertDescription>
                        </Alert>
                      )}
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setDisableDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" variant="destructive" disabled={disableLoading}>
                          {disableLoading ? "Disabling..." : "Disable 2FA"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm">
                  Two-factor authentication is not enabled for your account. We strongly recommend enabling this feature
                  to protect your account.
                </p>
                <Button asChild>
                  <Link href="/dashboard/security/two-factor">
                    Enable Two-Factor Authentication
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Manage your account password</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">It's a good idea to use a strong password that you don't use elsewhere.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/dashboard/security/change-password">
                Change Password
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Login History</CardTitle>
            <CardDescription>Review your recent login activity</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Monitor your account for any suspicious activity.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/dashboard/security/login-history">
                View Login History
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

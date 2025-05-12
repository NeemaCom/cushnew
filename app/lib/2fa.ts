// This is a mock implementation for demonstration purposes
// In a real application, you would use a proper 2FA library like otplib

// Mock storage for 2FA secrets
const twoFactorSecrets = new Map<string, string>()
const twoFactorBackupCodes = new Map<string, string[]>()

// Generate a random secret key for TOTP
export function generateSecret(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
  let secret = ""
  for (let i = 0; i < 32; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return secret
}

// Generate a QR code URL for the authenticator app
export function generateQrCodeUrl(email: string, secret: string): string {
  const issuer = encodeURIComponent("CushPay")
  const account = encodeURIComponent(email)
  const secretParam = encodeURIComponent(secret)
  return `otpauth://totp/${issuer}:${account}?secret=${secretParam}&issuer=${issuer}`
}

// Store the 2FA secret for a user
export function storeSecret(userId: string, secret: string): void {
  twoFactorSecrets.set(userId, secret)
}

// Get the 2FA secret for a user
export function getSecret(userId: string): string | undefined {
  return twoFactorSecrets.get(userId)
}

// Check if a user has 2FA enabled
export function has2FAEnabled(userId: string): boolean {
  return twoFactorSecrets.has(userId)
}

// Verify a TOTP code
export function verifyTOTP(secret: string, token: string): boolean {
  // In a real app, you would use a library like otplib to verify the token
  // For demo purposes, we'll accept any 6-digit code
  return /^\d{6}$/.test(token)
}

// Generate backup codes
export function generateBackupCodes(userId: string): string[] {
  const codes: string[] = []
  for (let i = 0; i < 10; i++) {
    let code = ""
    for (let j = 0; j < 8; j++) {
      code += Math.floor(Math.random() * 10)
    }
    codes.push(code)
  }

  // Store the backup codes
  twoFactorBackupCodes.set(userId, codes)

  return codes
}

// Verify a backup code
export function verifyBackupCode(userId: string, code: string): boolean {
  const codes = twoFactorBackupCodes.get(userId)
  if (!codes) return false

  const index = codes.indexOf(code)
  if (index === -1) return false

  // Remove the used backup code
  codes.splice(index, 1)
  twoFactorBackupCodes.set(userId, codes)

  return true
}

// Disable 2FA for a user
export function disable2FA(userId: string): void {
  twoFactorSecrets.delete(userId)
  twoFactorBackupCodes.delete(userId)
}

import type React from "react"
import { Globe } from "lucide-react"
import Link from "next/link"

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Globe className="h-6 w-6" />
            <span>CushPay</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>
      <div className="container px-4 py-6 md:px-6 md:py-8">{children}</div>
    </div>
  )
}

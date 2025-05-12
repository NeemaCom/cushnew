import type { ReactNode } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // For pages that aren't caught by the middleware (like the dashboard)
  // we do an additional server-side check
  if (cookies().get("admin_session")?.value !== "true") {
    redirect("/admin/login")
  }

  return <div className="min-h-screen bg-gray-50">{children}</div>
}

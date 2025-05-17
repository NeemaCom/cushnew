"use client"

import { render, screen, waitFor } from "../utils/test-utils"
import { useState, useEffect } from "react"

// This is a mock component that loads data asynchronously
const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 100))

        // Mock response based on userId
        if (userId === "valid-id") {
          setUser({ name: "John Doe", email: "john@example.com" })
        } else {
          throw new Error("User not found")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>No user data</div>

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  )
}

describe("UserProfile", () => {
  it("shows loading state initially", () => {
    render(<UserProfile userId="valid-id" />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it("displays user data when loaded successfully", async () => {
    render(<UserProfile userId="valid-id" />)

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    // Check that user data is displayed
    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument()
  })

  it("displays error message when user fetch fails", async () => {
    render(<UserProfile userId="invalid-id" />)

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    // Check that error message is displayed
    expect(screen.getByText(/error: user not found/i)).toBeInTheDocument()
  })
})

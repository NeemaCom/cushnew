"use client"

import { render, screen, waitFor } from "../utils/test-utils"
import { server } from "../mocks/server"
import { http, HttpResponse } from "msw"
import React from "react"

// This is a mock component that we'll test
// In a real project, this would be in its own file
// For this example, we're defining it here
const UserList = () => {
  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://api.example.com/users")
        if (!response.ok) throw new Error("Failed to fetch users")
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div>Loading users...</div>
  if (error) return <div>Error: {error}</div>
  if (users.length === 0) return <div>No users found</div>

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
          </li>
        ))}
      </ul>
    </div>
  )
}

describe("UserList Component", () => {
  it("renders loading state initially", () => {
    render(<UserList />)
    expect(screen.getByText(/loading users/i)).toBeInTheDocument()
  })

  it("renders the list of users", async () => {
    render(<UserList />)

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/loading users/i)).not.toBeInTheDocument()
    })

    // Check that users are displayed
    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
    expect(screen.getByText(/jane smith/i)).toBeInTheDocument()
    expect(screen.getByText(/bob johnson/i)).toBeInTheDocument()
  })

  it("handles error when API request fails", async () => {
    // Override the handler for this specific test
    server.use(
      http.get("https://api.example.com/users", () => {
        return new HttpResponse(null, { status: 500 })
      }),
    )

    render(<UserList />)

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/loading users/i)).not.toBeInTheDocument()
    })

    // Check that error message is displayed
    expect(screen.getByText(/error: failed to fetch users/i)).toBeInTheDocument()
  })

  it("shows message when no users are found", async () => {
    // Override the handler for this specific test
    server.use(
      http.get("https://api.example.com/users", () => {
        return HttpResponse.json([])
      }),
    )

    render(<UserList />)

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText(/loading users/i)).not.toBeInTheDocument()
    })

    // Check that "no users" message is displayed
    expect(screen.getByText(/no users found/i)).toBeInTheDocument()
  })
})

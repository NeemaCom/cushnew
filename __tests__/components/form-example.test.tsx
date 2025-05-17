"use client"

import type React from "react"

import { render, screen } from "../utils/test-utils"

// This is a mock component for testing purposes
const LoginForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Login Form">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="Enter your email" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="Enter your password" required />
      </div>
      <button type="submit">Log in</button>
    </form>
  )
}

describe("LoginForm", () => {
  it("renders all form elements correctly", () => {
    render(<LoginForm />)

    // Check form exists
    expect(screen.getByRole("form", { name: /login form/i })).toBeInTheDocument()

    // Check inputs exist
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()

    // Check button exists
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument()
  })

  it("allows entering email and password", async () => {
    const { user } = render(<LoginForm />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    await user.type(emailInput, "test@example.com")
    await user.type(passwordInput, "password123")

    expect(emailInput).toHaveValue("test@example.com")
    expect(passwordInput).toHaveValue("password123")
  })

  it("requires email and password fields", async () => {
    const { user } = render(<LoginForm />)

    // Try to submit the form without filling in required fields
    const submitButton = screen.getByRole("button", { name: /log in/i })
    await user.click(submitButton)

    // Check that the form validation prevents submission
    // This is how HTML5 validation works - the form won't submit and the browser will show validation messages
    // We can't easily test the browser validation messages, but we can check that the inputs have the required attribute
    expect(screen.getByLabelText(/email/i)).toBeRequired()
    expect(screen.getByLabelText(/password/i)).toBeRequired()
  })
})

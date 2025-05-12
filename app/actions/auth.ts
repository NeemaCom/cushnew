"use server"

// This is a mock implementation for demonstration purposes
// In a real application, you would use a proper authentication system

import { cookies } from "next/headers"

// Mock user database
const users = new Map()

export async function createUser(formData: FormData) {
  // In a real app, you would:
  // 1. Validate the form data
  // 2. Hash the password
  // 3. Store the user in a database
  // 4. Create a session

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const country = formData.get("country") as string

  if (!name || !email || !password || !country) {
    throw new Error("Missing required fields")
  }

  // Check if user already exists
  if (users.has(email)) {
    throw new Error("User already exists")
  }

  // Create user
  const user = {
    id: Date.now().toString(),
    name,
    email,
    country,
    // In a real app, you would hash the password
    password,
    createdAt: new Date(),
  }

  // Store user
  users.set(email, user)

  // Create session
  await createSession(user.id)

  return user
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    throw new Error("Missing email or password")
  }

  // Check if user exists
  const user = users.get(email)
  if (!user) {
    throw new Error("User not found")
  }

  // Check password
  // In a real app, you would compare hashed passwords
  if (user.password !== password) {
    throw new Error("Invalid password")
  }

  // Create session
  await createSession(user.id)

  return user
}

export async function logoutUser() {
  // Clear session
  cookies().delete("session")
}

async function createSession(userId: string) {
  // In a real app, you would:
  // 1. Create a session token
  // 2. Store the session in a database
  // 3. Set a cookie with the session token

  // For demo purposes, we'll just set a simple cookie
  cookies().set({
    name: "session",
    value: userId,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}

export async function getSession() {
  const session = cookies().get("session")

  if (!session) {
    return null
  }

  // In a real app, you would:
  // 1. Verify the session token
  // 2. Fetch the user from the database

  return session.value
}

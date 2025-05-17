import { http, HttpResponse, delay } from "msw"
import { getDelay } from "../../app/lib/mocks/delay-store"

// Define your API base URL
const API_URL = "https://api.example.com"

// User handlers
export const userHandlers = [
  // GET /users - Get all users
  http.get(`${API_URL}/users`, async () => {
    await delay(getDelay("users"))
    return HttpResponse.json([
      { id: "1", name: "John Doe", email: "john@example.com" },
      { id: "2", name: "Jane Smith", email: "jane@example.com" },
      { id: "3", name: "Bob Johnson", email: "bob@example.com" },
    ])
  }),

  // GET /users/:id - Get user by ID
  http.get(`${API_URL}/users/:id`, async ({ params }) => {
    await delay(getDelay("users"))
    const { id } = params

    if (id === "1") {
      return HttpResponse.json({ id: "1", name: "John Doe", email: "john@example.com" })
    }

    if (id === "2") {
      return HttpResponse.json({ id: "2", name: "Jane Smith", email: "jane@example.com" })
    }

    // Return 404 for non-existent users
    return new HttpResponse(null, { status: 404 })
  }),

  // POST /users - Create a new user
  http.post(`${API_URL}/users`, async ({ request }) => {
    await delay(getDelay("users"))
    const user = await request.json()

    // Validate required fields
    if (!user.name || !user.email) {
      return new HttpResponse(JSON.stringify({ error: "Name and email are required" }), { status: 400 })
    }

    // Return created user with ID
    return HttpResponse.json({ id: "4", ...user }, { status: 201 })
  }),

  // PUT /users/:id - Update a user
  http.put(`${API_URL}/users/:id`, async ({ params, request }) => {
    await delay(getDelay("users"))
    const { id } = params
    const updates = await request.json()

    // Check if user exists
    if (id !== "1" && id !== "2" && id !== "3") {
      return new HttpResponse(null, { status: 404 })
    }

    // Return updated user
    return HttpResponse.json({ id, ...updates })
  }),

  // DELETE /users/:id - Delete a user
  http.delete(`${API_URL}/users/:id`, async ({ params }) => {
    await delay(getDelay("users"))
    const { id } = params

    // Check if user exists
    if (id !== "1" && id !== "2" && id !== "3") {
      return new HttpResponse(null, { status: 404 })
    }

    // Return success with no content
    return new HttpResponse(null, { status: 204 })
  }),
]

// Transaction handlers
export const transactionHandlers = [
  // GET /transactions - Get all transactions
  http.get(`${API_URL}/transactions`, async ({ request }) => {
    await delay(getDelay("transactions"))
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")

    const transactions = [
      { id: "t1", userId: "1", amount: 100, description: "Payment", date: "2023-01-15" },
      { id: "t2", userId: "1", amount: 50, description: "Refund", date: "2023-01-20" },
      { id: "t3", userId: "2", amount: 200, description: "Purchase", date: "2023-01-25" },
    ]

    // Filter by userId if provided
    if (userId) {
      return HttpResponse.json(transactions.filter((t) => t.userId === userId))
    }

    return HttpResponse.json(transactions)
  }),

  // POST /transactions - Create a new transaction
  http.post(`${API_URL}/transactions`, async ({ request }) => {
    await delay(getDelay("transactions"))
    const transaction = await request.json()

    // Validate required fields
    if (!transaction.userId || !transaction.amount) {
      return new HttpResponse(JSON.stringify({ error: "UserId and amount are required" }), { status: 400 })
    }

    // Return created transaction with ID
    return HttpResponse.json(
      { id: `t${Date.now()}`, ...transaction, date: new Date().toISOString().split("T")[0] },
      { status: 201 },
    )
  }),
]

// Authentication handlers
export const authHandlers = [
  // POST /auth/login - User login
  http.post(`${API_URL}/auth/login`, async ({ request }) => {
    await delay(getDelay("auth"))
    const credentials = await request.json()

    // Check credentials
    if (credentials.email === "user@example.com" && credentials.password === "password") {
      return HttpResponse.json({
        user: { id: "1", name: "John Doe", email: "user@example.com" },
        token: "mock-jwt-token",
      })
    }

    // Return unauthorized for invalid credentials
    return new HttpResponse(JSON.stringify({ error: "Invalid credentials" }), { status: 401 })
  }),

  // POST /auth/register - User registration
  http.post(`${API_URL}/auth/register`, async ({ request }) => {
    await delay(getDelay("auth"))
    const userData = await request.json()

    // Validate required fields
    if (!userData.name || !userData.email || !userData.password) {
      return new HttpResponse(JSON.stringify({ error: "Name, email, and password are required" }), { status: 400 })
    }

    // Check if email is already taken
    if (userData.email === "user@example.com") {
      return new HttpResponse(JSON.stringify({ error: "Email already in use" }), { status: 409 })
    }

    // Return created user with token
    return HttpResponse.json(
      {
        user: { id: "4", name: userData.name, email: userData.email },
        token: "mock-jwt-token",
      },
      { status: 201 },
    )
  }),

  // GET /auth/me - Get current user
  http.get(`${API_URL}/auth/me`, async ({ request }) => {
    await delay(getDelay("auth"))
    const authHeader = request.headers.get("Authorization")

    // Check if token is provided
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new HttpResponse(null, { status: 401 })
    }

    const token = authHeader.split(" ")[1]

    // Validate token
    if (token === "mock-jwt-token") {
      return HttpResponse.json({
        id: "1",
        name: "John Doe",
        email: "user@example.com",
      })
    }

    // Return unauthorized for invalid token
    return new HttpResponse(null, { status: 401 })
  }),
]

// Combine all handlers
export const handlers = [...userHandlers, ...transactionHandlers, ...authHandlers]

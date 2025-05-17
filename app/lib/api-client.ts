// Simple API client for demonstration purposes
const API_URL = "https://api.example.com"

export type User = {
  id: string
  name: string
  email: string
}

export type Transaction = {
  id: string
  userId: string
  amount: number
  description: string
  date: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterData = {
  name: string
  email: string
  password: string
}

export type AuthResponse = {
  user: User
  token: string
}

// User API
export const userApi = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(`${API_URL}/users`)
    if (!response.ok) throw new Error("Failed to fetch users")
    return response.json()
  },

  // Get user by ID
  getUserById: async (id: string): Promise<User> => {
    const response = await fetch(`${API_URL}/users/${id}`)
    if (!response.ok) throw new Error(`Failed to fetch user with ID ${id}`)
    return response.json()
  },

  // Create a new user
  createUser: async (userData: Omit<User, "id">): Promise<User> => {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
    if (!response.ok) throw new Error("Failed to create user")
    return response.json()
  },

  // Update a user
  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
    if (!response.ok) throw new Error(`Failed to update user with ID ${id}`)
    return response.json()
  },

  // Delete a user
  deleteUser: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error(`Failed to delete user with ID ${id}`)
  },
}

// Transaction API
export const transactionApi = {
  // Get all transactions
  getTransactions: async (userId?: string): Promise<Transaction[]> => {
    const url = userId ? `${API_URL}/transactions?userId=${userId}` : `${API_URL}/transactions`

    const response = await fetch(url)
    if (!response.ok) throw new Error("Failed to fetch transactions")
    return response.json()
  },

  // Create a new transaction
  createTransaction: async (transactionData: Omit<Transaction, "id" | "date">): Promise<Transaction> => {
    const response = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transactionData),
    })
    if (!response.ok) throw new Error("Failed to create transaction")
    return response.json()
  },
}

// Auth API
export const authApi = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
    if (!response.ok) throw new Error("Invalid credentials")
    return response.json()
  },

  // Register
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Registration failed")
    }
    return response.json()
  },

  // Get current user
  getCurrentUser: async (token: string): Promise<User> => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error("Failed to get current user")
    return response.json()
  },
}

// Export all APIs as a single object
export const api = {
  users: userApi,
  transactions: transactionApi,
  auth: authApi,
}

export default api

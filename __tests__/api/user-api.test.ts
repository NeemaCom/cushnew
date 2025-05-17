import { userApi } from "@/lib/api-client"
import { server } from "../mocks/server"
import { http, HttpResponse } from "msw"

describe("User API", () => {
  it("fetches users successfully", async () => {
    const users = await userApi.getUsers()

    expect(users).toHaveLength(3)
    expect(users[0].name).toBe("John Doe")
    expect(users[1].name).toBe("Jane Smith")
    expect(users[2].name).toBe("Bob Johnson")
  })

  it("fetches a single user by ID", async () => {
    const user = await userApi.getUserById("1")

    expect(user.id).toBe("1")
    expect(user.name).toBe("John Doe")
    expect(user.email).toBe("john@example.com")
  })

  it("handles 404 when fetching non-existent user", async () => {
    await expect(userApi.getUserById("999")).rejects.toThrow("Failed to fetch user with ID 999")
  })

  it("creates a new user successfully", async () => {
    const newUser = {
      name: "Alice Williams",
      email: "alice@example.com",
    }

    const createdUser = await userApi.createUser(newUser)

    expect(createdUser.id).toBe("4")
    expect(createdUser.name).toBe("Alice Williams")
    expect(createdUser.email).toBe("alice@example.com")
  })

  it("handles validation errors when creating a user", async () => {
    // Override the handler for this specific test
    server.use(
      http.post("https://api.example.com/users", () => {
        return new HttpResponse(JSON.stringify({ error: "Name and email are required" }), { status: 400 })
      }),
    )

    const invalidUser = { name: "" }

    await expect(userApi.createUser(invalidUser as any)).rejects.toThrow("Failed to create user")
  })

  it("updates a user successfully", async () => {
    const updates = {
      name: "John Updated",
    }

    const updatedUser = await userApi.updateUser("1", updates)

    expect(updatedUser.id).toBe("1")
    expect(updatedUser.name).toBe("John Updated")
  })

  it("deletes a user successfully", async () => {
    // This should not throw an error
    await expect(userApi.deleteUser("1")).resolves.not.toThrow()
  })
})

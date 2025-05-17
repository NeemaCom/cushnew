"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
}

interface Transaction {
  id: string
  userId: string
  amount: number
  description: string
  date: string
}

export default function ApiDelaysDemo() {
  const [activeTab, setActiveTab] = useState("users")
  const [users, setUsers] = useState<User[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [loadingTransactions, setLoadingTransactions] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [authResult, setAuthResult] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoadingUsers(true)
    try {
      const response = await fetch("https://api.example.com/users")
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoadingUsers(false)
    }
  }

  const fetchTransactions = async () => {
    setLoadingTransactions(true)
    try {
      const response = await fetch("https://api.example.com/transactions")
      const data = await response.json()
      setTransactions(data)
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setLoadingTransactions(false)
    }
  }

  const simulateLogin = async () => {
    setAuthLoading(true)
    setAuthResult(null)
    try {
      const response = await fetch("https://api.example.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "user@example.com",
          password: "password",
        }),
      })
      const data = await response.json()
      setAuthResult("Login successful")
    } catch (error) {
      console.error("Error logging in:", error)
      setAuthResult("Login failed")
    } finally {
      setAuthLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">API Delay Controls Demo</h1>
        <p className="text-muted-foreground">
          Test different API response times using the API Controls button in the bottom right
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Users API</TabsTrigger>
          <TabsTrigger value="transactions">Transactions API</TabsTrigger>
          <TabsTrigger value="auth">Authentication API</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Users API</CardTitle>
              <CardDescription>Test loading states with different response times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                <Button onClick={fetchUsers} disabled={loadingUsers}>
                  {loadingUsers ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading Users...
                    </>
                  ) : (
                    "Fetch Users"
                  )}
                </Button>
              </div>

              {loadingUsers ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : users.length > 0 ? (
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="p-4 border rounded-lg">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No users loaded. Click the button above to fetch users.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Transactions API</CardTitle>
              <CardDescription>Test loading states with different response times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                <Button onClick={fetchTransactions} disabled={loadingTransactions}>
                  {loadingTransactions ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading Transactions...
                    </>
                  ) : (
                    "Fetch Transactions"
                  )}
                </Button>
              </div>

              {loadingTransactions ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="p-4 border rounded-lg">
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-muted-foreground">
                        ${transaction.amount.toFixed(2)} • {transaction.date}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No transactions loaded. Click the button above to fetch transactions.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auth" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication API</CardTitle>
              <CardDescription>Test login response times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                <Button onClick={simulateLogin} disabled={authLoading}>
                  {authLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Simulate Login"
                  )}
                </Button>
              </div>

              {authLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : authResult ? (
                <div className="text-center py-8 text-green-600 font-medium">{authResult}</div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Click the button above to simulate a login request.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center text-sm text-muted-foreground">
        <p>Adjust the API response times using the API Controls button in the bottom right corner.</p>
        <p>Try setting different delays for each API category and observe the loading states.</p>
      </div>
    </div>
  )
}

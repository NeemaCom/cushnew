"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Globe,
  Users,
  CreditCard,
  ArrowLeftRight,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { logoutAdmin } from "@/app/actions/admin-auth"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = async () => {
    await logoutAdmin()
    router.push("/admin/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl">
            <Globe className="h-6 w-6" />
            <span>CushPay</span>
            <Badge variant="outline" className="ml-2 font-normal">
              Admin
            </Badge>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/admin-avatar.png" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-white md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="flex items-center gap-2 px-2 py-3">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Admin Panel</span>
            </div>
            <Button
              variant={activeTab === "overview" ? "secondary" : "ghost"}
              className="justify-start gap-2"
              onClick={() => setActiveTab("overview")}
            >
              <BarChart3 className="h-4 w-4" />
              Overview
            </Button>
            <Button
              variant={activeTab === "users" ? "secondary" : "ghost"}
              className="justify-start gap-2"
              onClick={() => setActiveTab("users")}
            >
              <Users className="h-4 w-4" />
              Users
            </Button>
            <Button
              variant={activeTab === "transactions" ? "secondary" : "ghost"}
              className="justify-start gap-2"
              onClick={() => setActiveTab("transactions")}
            >
              <ArrowLeftRight className="h-4 w-4" />
              Transactions
            </Button>
            <Button
              variant={activeTab === "accounts" ? "secondary" : "ghost"}
              className="justify-start gap-2"
              onClick={() => setActiveTab("accounts")}
            >
              <CreditCard className="h-4 w-4" />
              Accounts
            </Button>
            <Button
              variant={activeTab === "settings" ? "secondary" : "ghost"}
              className="justify-start gap-2"
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <div className="mt-2 border-t pt-2">
              <p className="px-2 py-1 text-xs font-medium text-muted-foreground">ADMIN MANAGEMENT</p>
              <Button
                variant="ghost"
                className="justify-start gap-2 w-full"
                onClick={() => router.push("/admin/users")}
              >
                <Shield className="h-4 w-4" />
                Admin Users
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-2 w-full"
                onClick={() => router.push("/admin/permission-groups")}
              >
                <Lock className="h-4 w-4" />
                Permission Groups
              </Button>
            </div>
            <div className="mt-auto">
              <Button
                variant="ghost"
                className="justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 w-full"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <TabsList className="hidden md:flex">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="accounts">Accounts</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,248</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                    <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$842,503</div>
                    <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3,157</div>
                    <p className="text-xs text-muted-foreground">+8.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$42,503</div>
                    <p className="text-xs text-muted-foreground">+18.2% from last month</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Recent Signups</CardTitle>
                    <CardDescription>New users in the last 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback>{`U${i}`}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {["John Smith", "Sarah Johnson", "Michael Brown", "Emma Wilson", "James Davis"][i - 1]}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {["United States", "United Kingdom", "Germany", "France", "Canada"][i - 1]}
                            </p>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      View All Users
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                    <CardDescription>Recent system notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">High Transaction Volume</p>
                          <p className="text-xs text-muted-foreground">Transaction volume is 25% higher than usual</p>
                          <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">System Update Completed</p>
                          <p className="text-xs text-muted-foreground">The system update was completed successfully</p>
                          <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Scheduled Maintenance</p>
                          <p className="text-xs text-muted-foreground">
                            System maintenance scheduled for June 15, 2023
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      View All Alerts
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Other TabsContent sections remain the same */}
          </Tabs>
        </main>
      </div>
    </div>
  )
}

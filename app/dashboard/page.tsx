"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Link from "next/link"
import {
  Globe,
  User,
  CreditCard,
  ArrowLeftRight,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Search,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Globe className="h-6 w-6" />
            <span>CushPay</span>
          </Link>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/diverse-group.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-gray-50 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <Button variant="ghost" className="justify-start gap-2" onClick={() => setActiveTab("overview")}>
              <BarChart3 className="h-4 w-4" />
              Overview
            </Button>
            <Button variant="ghost" className="justify-start gap-2" onClick={() => setActiveTab("accounts")}>
              <CreditCard className="h-4 w-4" />
              Accounts
            </Button>
            <Button variant="ghost" className="justify-start gap-2" onClick={() => setActiveTab("transfers")}>
              <ArrowLeftRight className="h-4 w-4" />
              Transfers
            </Button>
            <Button variant="ghost" className="justify-start gap-2" onClick={() => setActiveTab("profile")}>
              <User className="h-4 w-4" />
              Profile
            </Button>
            <Button variant="ghost" className="justify-start gap-2" onClick={() => setActiveTab("settings")}>
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <div className="mt-auto">
              <Button variant="ghost" className="justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <TabsList className="hidden md:flex">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="accounts">Accounts</TabsTrigger>
                <TabsTrigger value="transfers">Transfers</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$12,580.00</div>
                    <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">USD, EUR, GBP</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recent Transfers</CardTitle>
                    <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">in the last 30 days</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent transactions and transfers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <ArrowLeftRight className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Transfer to {i % 2 === 0 ? "John Smith" : "Sarah Johnson"}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(Math.random() * 1000).toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">{i % 2 === 0 ? "USD" : "EUR"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Transactions
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="accounts" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Your Accounts</h2>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Account
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">USD Account</CardTitle>
                    <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      Primary
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$8,250.00</div>
                    <p className="text-xs text-muted-foreground">Account ending in 4589</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Transfer
                    </Button>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">EUR Account</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">€3,180.00</div>
                    <p className="text-xs text-muted-foreground">Account ending in 7823</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Transfer
                    </Button>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">GBP Account</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">£1,150.00</div>
                    <p className="text-xs text-muted-foreground">Account ending in 2341</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Transfer
                    </Button>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="transfers" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Transfers</h2>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Transfer
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Transfer History</CardTitle>
                  <CardDescription>View and manage your recent transfers</CardDescription>
                  <div className="mt-4">
                    <Input placeholder="Search transfers..." className="max-w-sm" icon={Search} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <ArrowLeftRight className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {i % 2 === 0 ? "Sent to " : "Received from "}
                              {i % 3 === 0 ? "John Smith" : i % 3 === 1 ? "Sarah Johnson" : "Michael Brown"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${i % 2 === 0 ? "text-red-500" : "text-green-500"}`}>
                            {i % 2 === 0 ? "-" : "+"}${(Math.random() * 1000).toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {i % 3 === 0 ? "USD" : i % 3 === 1 ? "EUR" : "GBP"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Load More
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/diverse-group.png" alt="User" />
                      <AvatarFallback className="text-2xl">JD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 text-center sm:text-left">
                      <h3 className="text-xl font-bold">John Doe</h3>
                      <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                      <p className="text-sm text-muted-foreground">Member since {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue="123 Main St, Anytown, USA" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences and security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Notifications</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-notifications" defaultChecked />
                      <label
                        htmlFor="email-notifications"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email notifications
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sms-notifications" defaultChecked />
                      <label
                        htmlFor="sms-notifications"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        SMS notifications
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Security</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="two-factor" />
                      <label
                        htmlFor="two-factor"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Enable two-factor authentication
                      </label>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Change Password
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Language & Region</h3>
                    <div className="grid gap-2">
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div className="grid gap-2 mt-2">
                      <Label htmlFor="currency">Default Currency</Label>
                      <select
                        id="currency"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="usd">USD - US Dollar</option>
                        <option value="eur">EUR - Euro</option>
                        <option value="gbp">GBP - British Pound</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

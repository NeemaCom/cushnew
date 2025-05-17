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
  Calendar,
  Download,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Percent,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { logoutAdmin } from "@/app/actions/admin-auth"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"

// Mock data for analytics
const userGrowthData = [
  { date: "Jan", users: 1200, newUsers: 200 },
  { date: "Feb", users: 1400, newUsers: 220 },
  { date: "Mar", users: 1600, newUsers: 240 },
  { date: "Apr", users: 1900, newUsers: 300 },
  { date: "May", users: 2200, newUsers: 320 },
  { date: "Jun", users: 2500, newUsers: 340 },
  { date: "Jul", users: 2800, newUsers: 360 },
  { date: "Aug", users: 3100, newUsers: 380 },
  { date: "Sep", users: 3400, newUsers: 400 },
  { date: "Oct", users: 3700, newUsers: 420 },
  { date: "Nov", users: 4000, newUsers: 440 },
  { date: "Dec", users: 4300, newUsers: 460 },
]

const transactionVolumeData = [
  { date: "Jan", volume: 125000, count: 1500 },
  { date: "Feb", volume: 145000, count: 1700 },
  { date: "Mar", volume: 165000, count: 1900 },
  { date: "Apr", volume: 195000, count: 2200 },
  { date: "May", volume: 225000, count: 2500 },
  { date: "Jun", volume: 255000, count: 2800 },
  { date: "Jul", volume: 285000, count: 3100 },
  { date: "Aug", volume: 315000, count: 3400 },
  { date: "Sep", volume: 345000, count: 3700 },
  { date: "Oct", volume: 375000, count: 4000 },
  { date: "Nov", volume: 405000, count: 4300 },
  { date: "Dec", volume: 435000, count: 4600 },
]

const revenueData = [
  { date: "Jan", revenue: 12500, expenses: 8000, profit: 4500 },
  { date: "Feb", revenue: 14500, expenses: 9000, profit: 5500 },
  { date: "Mar", revenue: 16500, expenses: 10000, profit: 6500 },
  { date: "Apr", revenue: 19500, expenses: 12000, profit: 7500 },
  { date: "May", revenue: 22500, expenses: 14000, profit: 8500 },
  { date: "Jun", revenue: 25500, expenses: 16000, profit: 9500 },
  { date: "Jul", revenue: 28500, expenses: 18000, profit: 10500 },
  { date: "Aug", revenue: 31500, expenses: 20000, profit: 11500 },
  { date: "Sep", revenue: 34500, expenses: 22000, profit: 12500 },
  { date: "Oct", revenue: 37500, expenses: 24000, profit: 13500 },
  { date: "Nov", revenue: 40500, expenses: 26000, profit: 14500 },
  { date: "Dec", revenue: 43500, expenses: 28000, profit: 15500 },
]

const userDemographicsData = [
  { name: "North America", value: 35 },
  { name: "Europe", value: 30 },
  { name: "Asia", value: 25 },
  { name: "Africa", value: 5 },
  { name: "South America", value: 3 },
  { name: "Australia", value: 2 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

const conversionRateData = [
  { date: "Jan", rate: 2.5 },
  { date: "Feb", rate: 2.7 },
  { date: "Mar", rate: 3.0 },
  { date: "Apr", rate: 3.2 },
  { date: "May", rate: 3.5 },
  { date: "Jun", rate: 3.8 },
  { date: "Jul", rate: 4.0 },
  { date: "Aug", rate: 4.2 },
  { date: "Sep", rate: 4.5 },
  { date: "Oct", rate: 4.7 },
  { date: "Nov", rate: 5.0 },
  { date: "Dec", rate: 5.2 },
]

const serviceUsageData = [
  { name: "Payments", value: 40 },
  { name: "Transfers", value: 30 },
  { name: "Loans", value: 15 },
  { name: "Savings", value: 10 },
  { name: "Documentation", value: 5 },
]

const dailyActiveUsersData = [
  { date: "Mon", users: 1200 },
  { date: "Tue", users: 1300 },
  { date: "Wed", users: 1400 },
  { date: "Thu", users: 1350 },
  { date: "Fri", users: 1250 },
  { date: "Sat", users: 900 },
  { date: "Sun", users: 800 },
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [dateRange, setDateRange] = useState("year")
  const [comparisonPeriod, setComparisonPeriod] = useState("previous")

  const handleLogout = async () => {
    await logoutAdmin()
    router.push("/admin/login")
  }

  // Calculate summary metrics with comparison to previous period
  const calculateMetrics = () => {
    // In a real app, these would be calculated from actual data
    return {
      totalUsers: {
        value: 4300,
        change: 12,
        increasing: true,
      },
      totalTransactions: {
        value: "$842,503",
        change: 5.2,
        increasing: true,
      },
      activeAccounts: {
        value: 3157,
        change: 8.1,
        increasing: true,
      },
      revenue: {
        value: "$43,500",
        change: 18.2,
        increasing: true,
      },
      conversionRate: {
        value: "5.2%",
        change: 0.5,
        increasing: true,
      },
      averageOrderValue: {
        value: "$94.50",
        change: 3.2,
        increasing: true,
      },
      churnRate: {
        value: "2.1%",
        change: 0.3,
        increasing: false,
      },
      customerAcquisitionCost: {
        value: "$25.40",
        change: 1.5,
        increasing: false,
      },
    }
  }

  const metrics = calculateMetrics()

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
              variant={activeTab === "analytics" ? "secondary" : "ghost"}
              className="justify-start gap-2"
              onClick={() => setActiveTab("analytics")}
            >
              <Activity className="h-4 w-4" />
              Analytics
            </Button>
            <Button variant="ghost" className="justify-start gap-2" onClick={() => router.push("/admin/reports")}>
              <BarChart3 className="h-4 w-4" />
              Custom Reports
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
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
                    <div className="text-2xl font-bold">{metrics.totalUsers.value}</div>
                    <div className="flex items-center text-xs">
                      {metrics.totalUsers.increasing ? (
                        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                      )}
                      <span className={metrics.totalUsers.increasing ? "text-green-500" : "text-red-500"}>
                        {metrics.totalUsers.change}% from last month
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                    <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.totalTransactions.value}</div>
                    <div className="flex items-center text-xs">
                      {metrics.totalTransactions.increasing ? (
                        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                      )}
                      <span className={metrics.totalTransactions.increasing ? "text-green-500" : "text-red-500"}>
                        {metrics.totalTransactions.change}% from last month
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.activeAccounts.value}</div>
                    <div className="flex items-center text-xs">
                      {metrics.activeAccounts.increasing ? (
                        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                      )}
                      <span className={metrics.activeAccounts.increasing ? "text-green-500" : "text-red-500"}>
                        {metrics.activeAccounts.change}% from last month
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.revenue.value}</div>
                    <div className="flex items-center text-xs">
                      {metrics.revenue.increasing ? (
                        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                      )}
                      <span className={metrics.revenue.increasing ? "text-green-500" : "text-red-500"}>
                        {metrics.revenue.change}% from last month
                      </span>
                    </div>
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

            <TabsContent value="analytics" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
                  <p className="text-muted-foreground">Comprehensive metrics and performance insights</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-[180px]">
                      <Calendar className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Last 7 days</SelectItem>
                      <SelectItem value="month">Last 30 days</SelectItem>
                      <SelectItem value="quarter">Last 90 days</SelectItem>
                      <SelectItem value="year">Last 12 months</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    <Percent className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.conversionRate.value}</div>
                    <div className="flex items-center text-xs">
                      {metrics.conversionRate.increasing ? (
                        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                      )}
                      <span className={metrics.conversionRate.increasing ? "text-green-500" : "text-red-500"}>
                        {metrics.conversionRate.change}% from last month
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.averageOrderValue.value}</div>
                    <div className="flex items-center text-xs">
                      {metrics.averageOrderValue.increasing ? (
                        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                      )}
                      <span className={metrics.averageOrderValue.increasing ? "text-green-500" : "text-red-500"}>
                        {metrics.averageOrderValue.change}% from last month
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.churnRate.value}</div>
                    <div className="flex items-center text-xs">
                      {!metrics.churnRate.increasing ? (
                        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                      )}
                      <span className={!metrics.churnRate.increasing ? "text-green-500" : "text-red-500"}>
                        {metrics.churnRate.change}% from last month
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Customer Acquisition Cost</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.customerAcquisitionCost.value}</div>
                    <div className="flex items-center text-xs">
                      {!metrics.customerAcquisitionCost.increasing ? (
                        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                      )}
                      <span className={!metrics.customerAcquisitionCost.increasing ? "text-green-500" : "text-red-500"}>
                        {metrics.customerAcquisitionCost.change}% from last month
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-1">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>User Growth</CardTitle>
                        <CardDescription>Total and new users over time</CardDescription>
                      </div>
                      <Select defaultValue="year">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">Week</SelectItem>
                          <SelectItem value="month">Month</SelectItem>
                          <SelectItem value="quarter">Quarter</SelectItem>
                          <SelectItem value="year">Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          users: {
                            label: "Total Users",
                            color: "hsl(var(--chart-1))",
                          },
                          newUsers: {
                            label: "New Users",
                            color: "hsl(var(--chart-2))",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={userGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="users"
                              stroke="var(--color-users)"
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 5 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="newUsers"
                              stroke="var(--color-newUsers)"
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 5 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Transaction Volume</CardTitle>
                        <CardDescription>Total transaction amount over time</CardDescription>
                      </div>
                      <Select defaultValue="year">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">Week</SelectItem>
                          <SelectItem value="month">Month</SelectItem>
                          <SelectItem value="quarter">Quarter</SelectItem>
                          <SelectItem value="year">Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          volume: {
                            label: "Volume ($)",
                            color: "hsl(var(--chart-1))",
                          },
                          count: {
                            label: "Count",
                            color: "hsl(var(--chart-2))",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={transactionVolumeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis yAxisId="left" orientation="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="volume"
                              yAxisId="left"
                              stroke="var(--color-volume)"
                              fill="var(--color-volume)"
                              fillOpacity={0.2}
                            />
                            <Area
                              type="monotone"
                              dataKey="count"
                              yAxisId="right"
                              stroke="var(--color-count)"
                              fill="var(--color-count)"
                              fillOpacity={0.2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-1">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Revenue & Expenses</CardTitle>
                        <CardDescription>Financial performance over time</CardDescription>
                      </div>
                      <Select defaultValue="year">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">Week</SelectItem>
                          <SelectItem value="month">Month</SelectItem>
                          <SelectItem value="quarter">Quarter</SelectItem>
                          <SelectItem value="year">Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          revenue: {
                            label: "Revenue",
                            color: "hsl(var(--chart-1))",
                          },
                          expenses: {
                            label: "Expenses",
                            color: "hsl(var(--chart-2))",
                          },
                          profit: {
                            label: "Profit",
                            color: "hsl(var(--chart-3))",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="revenue" fill="var(--color-revenue)" />
                            <Bar dataKey="expenses" fill="var(--color-expenses)" />
                            <Bar dataKey="profit" fill="var(--color-profit)" />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Conversion Rate</CardTitle>
                        <CardDescription>Visitor to customer conversion rate</CardDescription>
                      </div>
                      <Select defaultValue="year">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">Week</SelectItem>
                          <SelectItem value="month">Month</SelectItem>
                          <SelectItem value="quarter">Quarter</SelectItem>
                          <SelectItem value="year">Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          rate: {
                            label: "Conversion Rate (%)",
                            color: "hsl(var(--chart-1))",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={conversionRateData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="rate"
                              stroke="var(--color-rate)"
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 5 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>User Demographics</CardTitle>
                    <CardDescription>User distribution by region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={userDemographicsData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {userDemographicsData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Service Usage</CardTitle>
                    <CardDescription>Distribution of service usage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={serviceUsageData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {serviceUsageData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-1">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Daily Active Users</CardTitle>
                        <CardDescription>User activity by day of week</CardDescription>
                      </div>
                      <Select defaultValue="current">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="current">Current Week</SelectItem>
                          <SelectItem value="previous">Previous Week</SelectItem>
                          <SelectItem value="average">Average</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          users: {
                            label: "Active Users",
                            color: "hsl(var(--chart-1))",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart data={dailyActiveUsersData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="users" fill="var(--color-users)" />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
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

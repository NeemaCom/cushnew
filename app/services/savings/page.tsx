"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Globe, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function SavingsPage() {
  const [initialDeposit, setInitialDeposit] = useState(1000)
  const [monthlyContribution, setMonthlyContribution] = useState(200)
  const [interestRate, setInterestRate] = useState(3.5)
  const [years, setYears] = useState(5)
  const [activeTab, setActiveTab] = useState("regular")

  // Calculate future value
  const calculateFutureValue = () => {
    const monthlyRate = interestRate / 100 / 12
    const months = years * 12

    // Future value of initial deposit
    const initialDepositFV = initialDeposit * Math.pow(1 + monthlyRate, months)

    // Future value of monthly contributions
    const contributionFV = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)

    const totalFV = initialDepositFV + contributionFV
    return isNaN(totalFV) ? 0 : totalFV.toFixed(2)
  }

  // Calculate total contributions
  const calculateTotalContributions = () => {
    const totalContributions = initialDeposit + monthlyContribution * years * 12
    return isNaN(totalContributions) ? 0 : totalContributions.toFixed(2)
  }

  // Calculate interest earned
  const calculateInterestEarned = () => {
    const futureValue = Number.parseFloat(calculateFutureValue())
    const totalContributions = Number.parseFloat(calculateTotalContributions())
    const interestEarned = futureValue - totalContributions
    return isNaN(interestEarned) ? 0 : interestEarned.toFixed(2)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Globe className="h-6 w-6" />
            <span>CushPay</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="/services/loans" className="text-sm font-medium hover:underline underline-offset-4">
              Loans
            </Link>
            <Link
              href="/services/savings"
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              Savings
            </Link>
            <Link href="/services/documentation" className="text-sm font-medium hover:underline underline-offset-4">
              Documentation
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Smart Savings for Global Citizens</h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Grow your wealth with competitive interest rates and flexible savings options designed for expatriates
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col items-center space-y-4 text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tighter">Our Savings Products</h2>
                <p className="text-gray-500 md:text-xl/relaxed max-w-[700px]">
                  Choose the savings account that best fits your financial goals
                </p>
                <TabsList className="grid w-full max-w-md grid-cols-3 mt-4">
                  <TabsTrigger value="regular">Regular Savings</TabsTrigger>
                  <TabsTrigger value="fixed">Fixed Deposits</TabsTrigger>
                  <TabsTrigger value="goal">Goal-Based</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="regular" className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Flexible Savings Account</CardTitle>
                      <CardDescription>Easy access to your funds</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">2.5%</span>
                        <span className="ml-1 text-gray-500">APY</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>No minimum balance</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Unlimited withdrawals</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Multi-currency options</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>No monthly fees</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Open Account</Button>
                    </CardFooter>
                  </Card>
                  <Card className="border-primary">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Premium Savings Account</CardTitle>
                          <CardDescription>Higher returns for larger balances</CardDescription>
                        </div>
                        <Badge>Best Rate</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">3.5%</span>
                        <span className="ml-1 text-gray-500">APY</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>$5,000 minimum balance</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Up to 6 free withdrawals per month</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Tiered interest rates</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Complimentary financial advisory</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Open Account</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Digital Savings Account</CardTitle>
                      <CardDescription>Fully online experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">3.0%</span>
                        <span className="ml-1 text-gray-500">APY</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>$1,000 minimum balance</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Automated savings tools</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Real-time notifications</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>24/7 digital support</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Open Account</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="fixed" className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>6-Month Fixed Deposit</CardTitle>
                      <CardDescription>Short-term commitment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">3.8%</span>
                        <span className="ml-1 text-gray-500">APY</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>$1,000 minimum deposit</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Fixed 6-month term</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Interest paid at maturity</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Early withdrawal penalties apply</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Open Account</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>1-Year Fixed Deposit</CardTitle>
                      <CardDescription>Medium-term savings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">4.2%</span>
                        <span className="ml-1 text-gray-500">APY</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>$2,500 minimum deposit</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Fixed 12-month term</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Interest paid quarterly or at maturity</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Auto-renewal option</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Open Account</Button>
                    </CardFooter>
                  </Card>
                  <Card className="border-primary">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>5-Year Fixed Deposit</CardTitle>
                          <CardDescription>Long-term growth</CardDescription>
                        </div>
                        <Badge>Highest Yield</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">5.0%</span>
                        <span className="ml-1 text-gray-500">APY</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>$5,000 minimum deposit</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Fixed 60-month term</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Interest paid annually or compounded</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Partial withdrawal options available</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Open Account</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="goal" className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Emergency Fund</CardTitle>
                      <CardDescription>For unexpected expenses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">2.8%</span>
                        <span className="ml-1 text-gray-500">APY</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Quick access when needed</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Automated monthly contributions</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Goal tracking and visualization</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>No penalties for withdrawals</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Start Saving</Button>
                    </CardFooter>
                  </Card>
                  <Card className="border-primary">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Education Fund</CardTitle>
                          <CardDescription>For future educational expenses</CardDescription>
                        </div>
                        <Badge>Popular</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">4.5%</span>
                        <span className="ml-1 text-gray-500">APY</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Long-term growth potential</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Tax advantages in some countries</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Flexible withdrawal for education expenses</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Educational resources included</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Start Saving</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Retirement Fund</CardTitle>
                      <CardDescription>For your future security</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">4.8%</span>
                        <span className="ml-1 text-gray-500">APY</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Long-term investment options</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Tax-efficient structure</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Retirement planning tools</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>International portability</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Start Saving</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Savings Calculator</h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  See how your savings can grow over time with regular contributions
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="initial-deposit">Initial Deposit</Label>
                      <span className="text-sm font-medium">${initialDeposit.toLocaleString()}</span>
                    </div>
                    <Slider
                      id="initial-deposit"
                      min={0}
                      max={50000}
                      step={100}
                      value={[initialDeposit]}
                      onValueChange={(value) => setInitialDeposit(value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>$0</span>
                      <span>$50,000</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="monthly-contribution">Monthly Contribution</Label>
                      <span className="text-sm font-medium">${monthlyContribution}</span>
                    </div>
                    <Slider
                      id="monthly-contribution"
                      min={0}
                      max={2000}
                      step={10}
                      value={[monthlyContribution]}
                      onValueChange={(value) => setMonthlyContribution(value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>$0</span>
                      <span>$2,000</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                      <span className="text-sm font-medium">{interestRate}%</span>
                    </div>
                    <Slider
                      id="interest-rate"
                      min={0.1}
                      max={10}
                      step={0.1}
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0.1%</span>
                      <span>10%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="years">Time Period (years)</Label>
                      <span className="text-sm font-medium">{years} years</span>
                    </div>
                    <Slider
                      id="years"
                      min={1}
                      max={30}
                      step={1}
                      value={[years]}
                      onValueChange={(value) => setYears(value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>1 year</span>
                      <span>30 years</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LineChart className="mr-2 h-5 w-5" />
                      Savings Projection
                    </CardTitle>
                    <CardDescription>Based on your inputs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Initial Deposit:</span>
                        <span className="font-medium">${initialDeposit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Monthly Contribution:</span>
                        <span className="font-medium">${monthlyContribution}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Interest Rate:</span>
                        <span className="font-medium">{interestRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Time Period:</span>
                        <span className="font-medium">{years} years</span>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Future Value:</span>
                        <span className="text-2xl font-bold">${calculateFutureValue()}</span>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-500">Total Contributions:</span>
                            <span className="font-medium">${calculateTotalContributions()}</span>
                          </div>
                          <Progress
                            value={
                              (Number.parseFloat(calculateTotalContributions()) /
                                Number.parseFloat(calculateFutureValue())) *
                              100
                            }
                            className="h-2"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-500">Interest Earned:</span>
                            <span className="font-medium">${calculateInterestEarned()}</span>
                          </div>
                          <Progress
                            value={
                              (Number.parseFloat(calculateInterestEarned()) /
                                Number.parseFloat(calculateFutureValue())) *
                              100
                            }
                            className="h-2 bg-gray-100"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Open a Savings Account</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Start Saving Today</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
                  Open an account in minutes and begin your journey to financial security
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1.5">
                  Open an Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Compare All Accounts
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6" />
            <span className="font-bold">CushPay</span>
          </div>
          <p className="text-center text-sm text-gray-500 md:text-left">
            © {new Date().getFullYear()} CushPay. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6 md:ml-auto">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

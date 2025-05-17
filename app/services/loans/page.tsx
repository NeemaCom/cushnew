"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Calculator, Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function LoansPage() {
  const [loanAmount, setLoanAmount] = useState(5000)
  const [loanTerm, setLoanTerm] = useState(12)
  const [interestRate, setInterestRate] = useState(8.9)
  const [activeTab, setActiveTab] = useState("personal")

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = loanAmount
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    return isNaN(monthlyPayment) ? 0 : monthlyPayment.toFixed(2)
  }

  // Calculate total payment
  const calculateTotalPayment = () => {
    const monthlyPayment = Number.parseFloat(calculateMonthlyPayment())
    const totalPayment = monthlyPayment * loanTerm
    return isNaN(totalPayment) ? 0 : totalPayment.toFixed(2)
  }

  // Calculate total interest
  const calculateTotalInterest = () => {
    const totalPayment = Number.parseFloat(calculateTotalPayment())
    const totalInterest = totalPayment - loanAmount
    return isNaN(totalInterest) ? 0 : totalInterest.toFixed(2)
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
            <Link
              href="/services/loans"
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              Loans
            </Link>
            <Link href="/services/savings" className="text-sm font-medium hover:underline underline-offset-4">
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Flexible Loans for Expatriates</h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Access the funds you need with competitive rates and flexible repayment options designed for global
                  citizens
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col items-center space-y-4 text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tighter">Our Loan Products</h2>
                <p className="text-gray-500 md:text-xl/relaxed max-w-[700px]">
                  Choose the loan that best fits your needs
                </p>
                <TabsList className="grid w-full max-w-md grid-cols-3 mt-4">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="business">Business</TabsTrigger>
                  <TabsTrigger value="property">Property</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="personal" className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Personal Loan</CardTitle>
                      <CardDescription>Fast approval for immediate needs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">8.9%</span>
                        <span className="ml-1 text-gray-500">APR</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Borrow up to $25,000</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Terms from 6 to 60 months</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>No early repayment fees</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Decision within 24 hours</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Apply Now</Button>
                    </CardFooter>
                  </Card>
                  <Card className="border-primary">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Expat Relocation Loan</CardTitle>
                          <CardDescription>Designed for international moves</CardDescription>
                        </div>
                        <Badge>Popular</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">7.5%</span>
                        <span className="ml-1 text-gray-500">APR</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Borrow up to $50,000</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Terms from 12 to 84 months</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Grace period of up to 3 months</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Multi-currency repayment options</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Apply Now</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Debt Consolidation</CardTitle>
                      <CardDescription>Simplify your finances</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">9.2%</span>
                        <span className="ml-1 text-gray-500">APR</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Borrow up to $75,000</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Terms from 12 to 120 months</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Consolidate multiple debts</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Fixed monthly payments</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Apply Now</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="business" className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Business Startup Loan</CardTitle>
                      <CardDescription>For new ventures abroad</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">10.5%</span>
                        <span className="ml-1 text-gray-500">APR</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Borrow up to $100,000</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Terms from 12 to 60 months</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Business plan assistance</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Mentorship program included</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Apply Now</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Working Capital Loan</CardTitle>
                      <CardDescription>For day-to-day operations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">9.8%</span>
                        <span className="ml-1 text-gray-500">APR</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Borrow up to $250,000</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Revolving credit option</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Interest-only periods available</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Quick approval process</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Apply Now</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Equipment Financing</CardTitle>
                      <CardDescription>For business equipment needs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">8.7%</span>
                        <span className="ml-1 text-gray-500">APR</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Finance up to 100% of equipment value</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Terms up to 84 months</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Tax benefits available</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Equipment serves as collateral</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Apply Now</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="property" className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>International Mortgage</CardTitle>
                      <CardDescription>For property purchases abroad</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">5.2%</span>
                        <span className="ml-1 text-gray-500">APR</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Borrow up to $1,000,000</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Terms up to 30 years</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Fixed and variable rates available</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>International property expertise</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Apply Now</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Home Equity Loan</CardTitle>
                      <CardDescription>Leverage your property value</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">6.5%</span>
                        <span className="ml-1 text-gray-500">APR</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Borrow up to 80% of equity</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Terms from 5 to 20 years</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Tax-deductible interest (in some countries)</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Use funds for any purpose</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Apply Now</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Property Renovation Loan</CardTitle>
                      <CardDescription>For home improvements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">7.8%</span>
                        <span className="ml-1 text-gray-500">APR</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Borrow up to $150,000</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Terms from 1 to 15 years</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Staged disbursement options</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span>Renovation planning assistance</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Apply Now</Button>
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
                <h2 className="text-3xl font-bold tracking-tighter">Loan Calculator</h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Estimate your monthly payments and see how much you could borrow
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="loan-amount">Loan Amount</Label>
                      <span className="text-sm font-medium">${loanAmount.toLocaleString()}</span>
                    </div>
                    <Slider
                      id="loan-amount"
                      min={1000}
                      max={100000}
                      step={1000}
                      value={[loanAmount]}
                      onValueChange={(value) => setLoanAmount(value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>$1,000</span>
                      <span>$100,000</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="loan-term">Loan Term (months)</Label>
                      <span className="text-sm font-medium">{loanTerm} months</span>
                    </div>
                    <Slider
                      id="loan-term"
                      min={6}
                      max={120}
                      step={6}
                      value={[loanTerm]}
                      onValueChange={(value) => setLoanTerm(value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>6 months</span>
                      <span>120 months</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                      <span className="text-sm font-medium">{interestRate}%</span>
                    </div>
                    <Slider
                      id="interest-rate"
                      min={1}
                      max={20}
                      step={0.1}
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>1%</span>
                      <span>20%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calculator className="mr-2 h-5 w-5" />
                      Loan Summary
                    </CardTitle>
                    <CardDescription>Based on your selected parameters</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Loan Amount:</span>
                        <span className="font-medium">${loanAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Loan Term:</span>
                        <span className="font-medium">{loanTerm} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Interest Rate:</span>
                        <span className="font-medium">{interestRate}%</span>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Monthly Payment:</span>
                        <span className="text-2xl font-bold">${calculateMonthlyPayment()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Total Payment:</span>
                        <span className="font-medium">${calculateTotalPayment()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Total Interest:</span>
                        <span className="font-medium">${calculateTotalInterest()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Apply for This Loan</Button>
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
                <h2 className="text-3xl font-bold tracking-tighter">Ready to Get Started?</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
                  Apply for a loan today and get a decision within 24 hours
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1.5">
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Speak to an Advisor
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

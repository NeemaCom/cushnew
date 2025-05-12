"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Globe, Upload, Shield, Search, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState("verification")
  const [searchQuery, setSearchQuery] = useState("")

  const documentTypes = [
    {
      id: "passport",
      name: "Passport Verification",
      description: "Verify and authenticate international passports",
      price: "$49",
      processingTime: "24-48 hours",
      features: [
        "Digital verification of passport validity",
        "Authentication of passport details",
        "Verification against international databases",
        "Secure digital certificate of verification",
      ],
    },
    {
      id: "visa",
      name: "Visa Documentation",
      description: "Assistance with visa applications and documentation",
      price: "$99",
      processingTime: "3-5 business days",
      features: [
        "Document preparation for visa applications",
        "Review of application materials",
        "Translation services for required documents",
        "Digital storage of visa documents",
      ],
    },
    {
      id: "residence",
      name: "Residency Certification",
      description: "Official proof of residence documentation",
      price: "$79",
      processingTime: "2-3 business days",
      features: [
        "Verification of address and residency status",
        "Official residency certificates",
        "Digital and physical copies provided",
        "Accepted by most financial institutions",
      ],
    },
    {
      id: "employment",
      name: "Employment Verification",
      description: "Verify employment history and income",
      price: "$69",
      processingTime: "2-4 business days",
      features: [
        "Verification of employment status",
        "Income verification",
        "Work history documentation",
        "Digital certification for banking and rental applications",
      ],
    },
    {
      id: "financial",
      name: "Financial Document Authentication",
      description: "Authenticate and certify financial records",
      price: "$89",
      processingTime: "3-4 business days",
      features: [
        "Bank statement verification",
        "Income document certification",
        "Tax document authentication",
        "Financial history reports",
      ],
    },
    {
      id: "education",
      name: "Educational Credential Evaluation",
      description: "Verify and evaluate international educational credentials",
      price: "$129",
      processingTime: "5-7 business days",
      features: [
        "Degree and diploma verification",
        "Credential evaluation for employment",
        "Academic transcript authentication",
        "Equivalency assessment for international qualifications",
      ],
    },
  ]

  const filteredDocuments = searchQuery
    ? documentTypes.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : documentTypes

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
            <Link href="/services/savings" className="text-sm font-medium hover:underline underline-offset-4">
              Savings
            </Link>
            <Link
              href="/services/documentation"
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Document Verification & Services</h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Secure, reliable documentation services designed for expatriates and global citizens
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col items-center space-y-4 text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tighter">Our Documentation Services</h2>
                <p className="text-gray-500 md:text-xl/relaxed max-w-[700px]">
                  Comprehensive solutions for all your international documentation needs
                </p>
                <TabsList className="grid w-full max-w-md grid-cols-3 mt-4">
                  <TabsTrigger value="verification">Verification</TabsTrigger>
                  <TabsTrigger value="translation">Translation</TabsTrigger>
                  <TabsTrigger value="certification">Certification</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="verification" className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">Document Verification Services</h3>
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search services..."
                      className="w-full bg-white pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredDocuments.map((doc) => (
                    <Card key={doc.id} className="flex flex-col">
                      <CardHeader>
                        <CardTitle>{doc.name}</CardTitle>
                        <CardDescription>{doc.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="flex items-baseline mb-4">
                          <span className="text-2xl font-bold">{doc.price}</span>
                          <span className="ml-1 text-gray-500">/ service</span>
                        </div>
                        <div className="flex items-center mb-4 text-sm text-gray-500">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>Processing time: {doc.processingTime}</span>
                        </div>
                        <ul className="space-y-2 text-sm">
                          {doc.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Request Service</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="translation" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Standard Document Translation</CardTitle>
                      <CardDescription>Translation of common documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-2xl font-bold">$0.10</span>
                        <span className="ml-1 text-gray-500">/ word</span>
                      </div>
                      <div className="flex items-center mb-4 text-sm text-gray-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Processing time: 2-3 business days</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Personal documents (ID cards, birth certificates)</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>General correspondence</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Basic business documents</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Available in 30+ languages</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Request Translation</Button>
                    </CardFooter>
                  </Card>
                  <Card className="border-primary">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Certified Translation</CardTitle>
                          <CardDescription>Official translations for legal purposes</CardDescription>
                        </div>
                        <Badge>Most Popular</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-2xl font-bold">$0.15</span>
                        <span className="ml-1 text-gray-500">/ word</span>
                      </div>
                      <div className="flex items-center mb-4 text-sm text-gray-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Processing time: 3-5 business days</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Legal documents (contracts, court documents)</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Academic records and diplomas</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Immigration documents</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Includes certification stamp and signature</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Request Translation</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Technical Translation</CardTitle>
                      <CardDescription>Specialized industry-specific translations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-2xl font-bold">$0.20</span>
                        <span className="ml-1 text-gray-500">/ word</span>
                      </div>
                      <div className="flex items-center mb-4 text-sm text-gray-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Processing time: 5-7 business days</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Medical documents</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Technical manuals and specifications</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Financial and legal industry documents</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Translated by industry specialists</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Request Translation</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="certification" className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notarization Service</CardTitle>
                      <CardDescription>Official notary services for documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-2xl font-bold">$49</span>
                        <span className="ml-1 text-gray-500">/ document</span>
                      </div>
                      <div className="flex items-center mb-4 text-sm text-gray-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Processing time: 1-2 business days</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Official notarization of documents</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Verification of signatures</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Document authentication</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Digital and physical copies provided</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Request Service</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Apostille Certification</CardTitle>
                      <CardDescription>International document authentication</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-2xl font-bold">$99</span>
                        <span className="ml-1 text-gray-500">/ document</span>
                      </div>
                      <div className="flex items-center mb-4 text-sm text-gray-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Processing time: 5-10 business days</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Apostille certification for international use</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Valid in all Hague Convention countries</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Document legalization</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Includes courier delivery</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Request Service</Button>
                    </CardFooter>
                  </Card>
                  <Card className="border-primary">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Digital Document Certification</CardTitle>
                          <CardDescription>Secure digital certification with blockchain</CardDescription>
                        </div>
                        <Badge>New</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline mb-4">
                        <span className="text-2xl font-bold">$79</span>
                        <span className="ml-1 text-gray-500">/ document</span>
                      </div>
                      <div className="flex items-center mb-4 text-sm text-gray-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Processing time: 24-48 hours</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Blockchain-based document certification</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Tamper-proof digital verification</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Instant verification by third parties</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          <span>Lifetime digital storage and access</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Request Service</Button>
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
                <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Our simple process makes document verification and certification easy
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Upload Your Documents</h3>
                      <p className="text-gray-500">Securely upload your documents through our encrypted platform</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Select Your Service</h3>
                      <p className="text-gray-500">
                        Choose from our range of verification, translation, or certification services
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Expert Processing</h3>
                      <p className="text-gray-500">
                        Our team of experts processes your documents with the highest standards
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Receive Your Documents</h3>
                      <p className="text-gray-500">
                        Get your verified documents digitally or physically delivered to you
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Upload className="mr-2 h-5 w-5" />
                      Upload Your Documents
                    </CardTitle>
                    <CardDescription>Get started with your document processing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        All documents are processed with bank-level encryption and security
                      </AlertDescription>
                    </Alert>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">Drag and drop your files here, or click to browse</p>
                      <p className="text-xs text-gray-400 mt-1">Supports PDF, JPG, PNG (Max 10MB per file)</p>
                      <Button className="mt-4">Select Files</Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Start Processing</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Frequently Asked Questions</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
                  Find answers to common questions about our documentation services
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What types of documents can you verify?</AccordionTrigger>
                  <AccordionContent>
                    We can verify a wide range of documents including passports, visas, residence permits, educational
                    certificates, employment records, financial statements, and more. Our verification services ensure
                    the authenticity and validity of your documents for international use.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How long does the verification process take?</AccordionTrigger>
                  <AccordionContent>
                    Processing times vary depending on the type of document and service requested. Standard
                    verifications typically take 24-48 hours, while more complex services like apostille certification
                    may take 5-10 business days. Expedited services are available for urgent needs at an additional
                    cost.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Are your document services legally recognized?</AccordionTrigger>
                  <AccordionContent>
                    Yes, our document services are legally recognized in most countries. Our certifications,
                    translations, and verifications are performed by licensed professionals and meet international
                    standards. For specific country requirements, please contact our customer service team.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How secure is your document handling process?</AccordionTrigger>
                  <AccordionContent>
                    We implement bank-level security measures to protect your documents. All uploads are encrypted using
                    256-bit SSL encryption, and our storage systems comply with GDPR and other international data
                    protection regulations. We also offer blockchain-based verification for additional security.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>What languages do you support for translation?</AccordionTrigger>
                  <AccordionContent>
                    We support translations between more than 50 languages, including all major European, Asian, and
                    Middle Eastern languages. Our translators are native speakers with expertise in specific fields such
                    as legal, medical, technical, and financial documentation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>Can I track the status of my document processing?</AccordionTrigger>
                  <AccordionContent>
                    Yes, once you submit your documents, you'll receive a unique tracking number. You can use this to
                    check the status of your request through our secure online portal. We also provide email and SMS
                    notifications at key stages of the process.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">Ready to Get Started?</h2>
                <p className="max-w-[700px] md:text-xl/relaxed">
                  Secure your documents with our trusted verification and certification services
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" className="gap-1.5">
                  Upload Documents
                  <Upload className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="bg-primary-foreground text-primary">
                  Contact an Expert
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

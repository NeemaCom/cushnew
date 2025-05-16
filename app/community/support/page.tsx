"use client"

import { useState } from "react"
import { Bot, Send, User, FileText, Home, Briefcase, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SupportPage() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hi there! I'm your CushPay AI assistant. How can I help you today with visas, jobs, housing, or banking questions?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      role: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate AI response after a short delay
    setTimeout(() => {
      let botResponse

      if (inputValue.toLowerCase().includes("visa")) {
        botResponse = {
          role: "bot",
          content:
            "For visa information, it depends on your destination country. Many countries offer digital nomad visas now, including Estonia, Portugal, and Costa Rica. Would you like specific information about a particular country's visa requirements?",
          timestamp: new Date().toISOString(),
        }
      } else if (inputValue.toLowerCase().includes("bank") || inputValue.toLowerCase().includes("account")) {
        botResponse = {
          role: "bot",
          content:
            "Opening a bank account abroad typically requires proof of identity, proof of address, and sometimes a visa or residence permit. Some online banks like Wise, Revolut, or N26 offer accounts that can be opened remotely. Would you like more specific information about banking in a particular country?",
          timestamp: new Date().toISOString(),
        }
      } else if (inputValue.toLowerCase().includes("housing") || inputValue.toLowerCase().includes("rent")) {
        botResponse = {
          role: "bot",
          content:
            "Finding housing abroad can be challenging. Popular platforms include Airbnb for short-term stays, and local sites like Idealista (Spain/Portugal), Immobilienscout24 (Germany), or Craigslist (US). Would you like tips for a specific location or advice on rental agreements?",
          timestamp: new Date().toISOString(),
        }
      } else if (inputValue.toLowerCase().includes("job") || inputValue.toLowerCase().includes("work")) {
        botResponse = {
          role: "bot",
          content:
            "For international job opportunities, sites like LinkedIn, Indeed Global, and Glassdoor are good starting points. There are also platforms specifically for remote work like Remote OK, We Work Remotely, and Dynamite Jobs. Would you like advice on work permits or finding jobs in a specific industry?",
          timestamp: new Date().toISOString(),
        }
      } else {
        botResponse = {
          role: "bot",
          content:
            "I can help with questions about visas, banking, housing, and jobs for global citizens. Could you provide more details about what you're looking for?",
          timestamp: new Date().toISOString(),
        }
      }

      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const quickQuestions = [
    "How do I apply for a digital nomad visa?",
    "What's the best way to open a bank account abroad?",
    "Tips for finding short-term housing in Europe?",
    "How can I find remote-friendly jobs?",
  ]

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
      <div className="space-y-6">
        <div>
          <h2 className="mb-2 text-xl font-semibold">Quick Resources</h2>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-2">
              <FileText className="h-4 w-4" />
              Visa Guide
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Home className="h-4 w-4" />
              Housing Resources
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Briefcase className="h-4 w-4" />
              Job Search Tips
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <CreditCard className="h-4 w-4" />
              Banking FAQ
            </Button>
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Popular Topics</h2>
          <Tabs defaultValue="visas">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="visas">Visas</TabsTrigger>
              <TabsTrigger value="banking">Banking</TabsTrigger>
            </TabsList>
            <TabsContent value="visas" className="space-y-2 pt-2">
              <Button variant="ghost" className="w-full justify-start text-sm font-normal">
                Digital Nomad Visas
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm font-normal">
                Work Permits
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm font-normal">
                Visa Requirements by Country
              </Button>
            </TabsContent>
            <TabsContent value="banking" className="space-y-2 pt-2">
              <Button variant="ghost" className="w-full justify-start text-sm font-normal">
                International Banking
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm font-normal">
                Currency Exchange
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm font-normal">
                Online Banking Options
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Need Human Help?</h2>
          <Button className="w-full">Contact Support</Button>
        </div>
      </div>

      <Card className="flex h-[600px] flex-col">
        <CardHeader>
          <CardTitle>AI Support Assistant</CardTitle>
          <CardDescription>Ask questions about visas, jobs, housing, or banking for global citizens</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-auto p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex max-w-[80%] items-start gap-3 rounded-lg p-3 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.role === "bot" && (
                    <Avatar className="h-8 w-8">
                      <Bot className="h-4 w-4" />
                    </Avatar>
                  )}
                  <div>
                    <p className="text-sm">{message.content}</p>
                    <p className="mt-1 text-xs opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8">
                      <User className="h-4 w-4" />
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <div className="px-4 py-2">
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => setInputValue(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
            <Input
              placeholder="Type your question here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

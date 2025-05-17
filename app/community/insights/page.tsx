import { ChevronRight, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function InsightsPage() {
  const articles = [
    {
      id: 1,
      title: "Banking Across Borders: A Comprehensive Guide",
      excerpt: "Learn how to manage your finances effectively when living or working in multiple countries.",
      category: "Banking",
      date: "May 10, 2023",
      readTime: "8 min read",
      image: "/placeholder.svg?key=q4jwm",
    },
    {
      id: 2,
      title: "Visa Updates for Remote Workers in 2023",
      excerpt: "Stay updated on the latest visa policies for digital nomads and remote workers around the world.",
      category: "Visas",
      date: "May 5, 2023",
      readTime: "6 min read",
      image: "/placeholder.svg?key=82beu",
    },
    {
      id: 3,
      title: "Finding Housing in a New Country: Tips and Tricks",
      excerpt: "Practical advice for securing accommodation when relocating to a foreign country.",
      category: "Housing",
      date: "April 28, 2023",
      readTime: "10 min read",
      image: "/placeholder.svg?key=b8qk1",
    },
    {
      id: 4,
      title: "Building a Career Abroad: Opportunities and Challenges",
      excerpt: "Insights on developing your professional life in a new country and culture.",
      category: "Career",
      date: "April 20, 2023",
      readTime: "7 min read",
      image: "/placeholder.svg?key=cgnhv",
    },
    {
      id: 5,
      title: "Tax Implications for Global Citizens",
      excerpt: "Understanding your tax obligations when living and working across multiple jurisdictions.",
      category: "Finance",
      date: "April 15, 2023",
      readTime: "9 min read",
      image: "/placeholder.svg?key=y0rxt",
    },
    {
      id: 6,
      title: "Cultural Adaptation: Thriving in a New Environment",
      excerpt: "Strategies for adapting to new cultures and building a sense of belonging abroad.",
      category: "Lifestyle",
      date: "April 8, 2023",
      readTime: "5 min read",
      image: "/placeholder.svg?height=200&width=400&query=cultural adaptation abroad",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Insights & Articles</h1>
        <p className="text-muted-foreground">
          Explore articles, guides, and resources to help you navigate global living
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search articles..." className="w-full bg-background pl-8" />
        </div>
        <Tabs defaultValue="all" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="banking">Banking</TabsTrigger>
            <TabsTrigger value="visas">Visas</TabsTrigger>
            <TabsTrigger value="housing">Housing</TabsTrigger>
            <TabsTrigger value="career">Career</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {article.category}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{article.readTime}</span>
                </div>
              </div>
              <CardTitle className="line-clamp-2 text-xl">{article.title}</CardTitle>
              <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
            </CardHeader>
            <CardFooter className="p-4 pt-0">
              <div className="flex w-full items-center justify-between">
                <span className="text-xs text-muted-foreground">{article.date}</span>
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  Read more
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Load More Articles</Button>
      </div>
    </div>
  )
}

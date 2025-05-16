import { Building, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function JobsPage() {
  const jobs = [
    {
      id: 1,
      title: "International Finance Manager",
      company: "Global Finance Corp",
      location: "Remote (US/EU)",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      posted: "2 days ago",
      logo: "/placeholder.svg?height=50&width=50&query=global finance corp logo",
    },
    {
      id: 2,
      title: "Bilingual Customer Support Specialist",
      company: "TechGlobal Solutions",
      location: "Berlin, Germany",
      type: "Full-time",
      salary: "€45,000 - €55,000",
      posted: "3 days ago",
      logo: "/placeholder.svg?height=50&width=50&query=techglobal solutions logo",
    },
    {
      id: 3,
      title: "International Business Development",
      company: "Expansion Partners",
      location: "Singapore",
      type: "Full-time",
      salary: "S$80,000 - S$100,000",
      posted: "1 week ago",
      logo: "/placeholder.svg?height=50&width=50&query=expansion partners logo",
    },
    {
      id: 4,
      title: "Remote Software Engineer",
      company: "Distributed Systems Inc",
      location: "Remote (Global)",
      type: "Full-time",
      salary: "$100,000 - $140,000",
      posted: "2 weeks ago",
      logo: "/placeholder.svg?height=50&width=50&query=distributed systems logo",
    },
    {
      id: 5,
      title: "Global Logistics Coordinator",
      company: "WorldWide Shipping",
      location: "Dubai, UAE",
      type: "Full-time",
      salary: "AED 15,000 - AED 20,000/month",
      posted: "3 weeks ago",
      logo: "/placeholder.svg?height=50&width=50&query=worldwide shipping logo",
    },
    {
      id: 6,
      title: "International Marketing Consultant",
      company: "Global Reach Marketing",
      location: "Remote (Part-time)",
      type: "Contract",
      salary: "$50-70/hour",
      posted: "1 month ago",
      logo: "/placeholder.svg?height=50&width=50&query=global reach marketing logo",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Jobs Board</h1>
        <p className="text-muted-foreground">Find global career opportunities and connect with employers worldwide</p>
      </div>

      <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search jobs by title, company, or keyword..."
            className="w-full bg-background pl-8"
          />
        </div>
        <Select defaultValue="location">
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="location">Any Location</SelectItem>
            <SelectItem value="remote">Remote Only</SelectItem>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="eu">Europe</SelectItem>
            <SelectItem value="asia">Asia</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="type">
          <SelectTrigger>
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="type">Any Type</SelectItem>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex-shrink-0">
                  <img
                    src={job.logo || "/placeholder.svg"}
                    alt={`${job.company} logo`}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                </div>
                <div className="flex-grow space-y-1">
                  <h3 className="font-semibold">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building className="h-3.5 w-3.5" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{job.location}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {job.type}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{job.salary}</p>
                </div>
                <div className="flex flex-col items-end justify-between gap-2">
                  <span className="text-xs text-muted-foreground">Posted {job.posted}</span>
                  <Button size="sm">Apply Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Load More Jobs</Button>
      </div>
    </div>
  )
}

import { Clock, Search, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MentorsPage() {
  const mentors = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "International Finance Expert",
      specialties: ["Banking", "Investment", "Taxes"],
      rating: 4.9,
      reviews: 56,
      hourlyRate: "$75",
      availability: "Next available: Tomorrow",
      bio: "15+ years helping expats navigate international finance and banking across 20+ countries.",
      image: "/placeholder.svg?height=200&width=200&query=professional woman headshot",
    },
    {
      id: 2,
      name: "Miguel Rodriguez",
      title: "Global Mobility Specialist",
      specialties: ["Visas", "Immigration", "Relocation"],
      rating: 4.8,
      reviews: 42,
      hourlyRate: "$65",
      availability: "Next available: Today",
      bio: "Immigration consultant with expertise in work visas and residency permits for EU, US, and APAC regions.",
      image: "/placeholder.svg?height=200&width=200&query=professional man headshot",
    },
    {
      id: 3,
      name: "Aisha Patel",
      title: "International Housing Consultant",
      specialties: ["Real Estate", "Rentals", "Property Law"],
      rating: 4.7,
      reviews: 38,
      hourlyRate: "$60",
      availability: "Next available: Friday",
      bio: "Real estate professional specializing in helping newcomers find and secure housing in major global cities.",
      image: "/placeholder.svg?height=200&width=200&query=professional woman real estate",
    },
    {
      id: 4,
      name: "David Chen",
      title: "Global Career Coach",
      specialties: ["Job Search", "Networking", "Interviews"],
      rating: 4.9,
      reviews: 64,
      hourlyRate: "$80",
      availability: "Next available: Monday",
      bio: "Career development expert helping professionals transition to international roles and navigate global job markets.",
      image: "/placeholder.svg?height=200&width=200&query=professional asian man headshot",
    },
    {
      id: 5,
      name: "Elena Petrova",
      title: "Cultural Adaptation Specialist",
      specialties: ["Cultural Training", "Language", "Integration"],
      rating: 4.8,
      reviews: 51,
      hourlyRate: "$70",
      availability: "Next available: Wednesday",
      bio: "Helps expatriates and their families adapt to new cultures and environments with practical strategies and support.",
      image: "/placeholder.svg?height=200&width=200&query=professional woman cultural consultant",
    },
    {
      id: 6,
      name: "James Wilson",
      title: "International Education Advisor",
      specialties: ["Schools", "Universities", "Scholarships"],
      rating: 4.6,
      reviews: 33,
      hourlyRate: "$65",
      availability: "Next available: Thursday",
      bio: "Education consultant with expertise in international schools, university admissions, and scholarship opportunities worldwide.",
      image: "/placeholder.svg?height=200&width=200&query=professional education consultant",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Find a Mentor</h1>
        <p className="text-muted-foreground">
          Connect with experienced mentors who can guide you through your global journey
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search mentors by name, specialty, or keyword..."
            className="w-full bg-background pl-8"
          />
        </div>
        <Select defaultValue="specialty">
          <SelectTrigger>
            <SelectValue placeholder="Specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="specialty">Any Specialty</SelectItem>
            <SelectItem value="banking">Banking & Finance</SelectItem>
            <SelectItem value="visas">Visas & Immigration</SelectItem>
            <SelectItem value="housing">Housing & Real Estate</SelectItem>
            <SelectItem value="career">Career Development</SelectItem>
            <SelectItem value="culture">Cultural Adaptation</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="availability">
          <SelectTrigger>
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="availability">Any Availability</SelectItem>
            <SelectItem value="today">Available Today</SelectItem>
            <SelectItem value="this-week">Available This Week</SelectItem>
            <SelectItem value="next-week">Available Next Week</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mentors.map((mentor) => (
          <Card key={mentor.id} className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={mentor.image || "/placeholder.svg"} alt={mentor.name} />
                  <AvatarFallback>
                    {mentor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{mentor.rating}</span>
                  <span className="text-xs text-muted-foreground">({mentor.reviews})</span>
                </div>
              </div>
              <CardTitle className="mt-2 text-xl">{mentor.name}</CardTitle>
              <CardDescription>{mentor.title}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow pb-2">
              <div className="mb-2 flex flex-wrap gap-1">
                {mentor.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{mentor.bio}</p>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4 pt-2">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{mentor.availability}</span>
                </div>
                <span className="font-medium">{mentor.hourlyRate}/hour</span>
              </div>
              <Button className="w-full">Book Session</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Load More Mentors</Button>
      </div>
    </div>
  )
}

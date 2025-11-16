import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Search, Calendar, Mail, Phone, MapPin, Users, Trophy, Flag, Music, Palette, Sparkles, Facebook, Twitter, Instagram, ChevronLeft, ChevronRight } from "lucide-react";

// Import images
import festivalLogo from "@/assets/festival-logo.jpg";
import heroPoster from "@/assets/hero-poster.jpg";
import heroKaleidoscope from "@/assets/hero-kaleidoscope.jpg";
import conceptBurst from "@/assets/concept-burst.jpg";
import experienceWorkshop from "@/assets/experience-workshop.jpg";
import communityTeam from "@/assets/community-team.jpg";
import eventDigitalCanvas from "@/assets/event-digital-canvas.jpg";
import eventAcousticSunset from "@/assets/event-acoustic-sunset.jpg";
import eventKineticSculpture from "@/assets/event-kinetic-sculpture.jpg";
import eventDanceFusion from "@/assets/event-dance-fusion.jpg";
import eventPottery from "@/assets/event-pottery.jpg";
import eventLightInstallation from "@/assets/event-light-installation.jpg";

// Types
type EventCategory = "All" | "Workshop" | "Performance" | "Exhibit";

interface Event {
  id: number;
  name: string;
  category: "Workshop" | "Performance" | "Exhibit";
  date: string;
  time: string;
  description: string;
  image: string;
  eventType: "pre-event" | "upcoming";
}

interface GroupResult {
  name: string;
  rank: number;
  totalScore: number;
  events: number;
  rounds: { round: string; score: number }[];
  color: string;
}

interface Team {
  name: string;
  color: string;
  bio: string;
  contact: string;
  members: number;
  participants: string[];
}

// Dummy Data
const eventsData: Event[] = [
  {
    id: 1,
    name: "Digital Canvas Painting",
    category: "Workshop",
    date: "Oct 26",
    time: "2:00 PM",
    description: "Unleash your inner artist with digital tools",
    image: eventDigitalCanvas,
    eventType: "pre-event",
  },
  {
    id: 2,
    name: "Acoustic Sunset Session",
    category: "Performance",
    date: "Oct 26",
    time: "6:00 PM",
    description: "Sway with live music as the sun goes down",
    image: eventAcousticSunset,
    eventType: "pre-event",
  },
  {
    id: 3,
    name: "Kinetic Sculpture Showcase",
    category: "Exhibit",
    date: "Oct 27",
    time: "11:00 AM",
    description: "Experience art that moves and inspires",
    image: eventKineticSculpture,
    eventType: "pre-event",
  },
  {
    id: 4,
    name: "Modern Dance Fusion",
    category: "Performance",
    date: "Dec 12",
    time: "3:00 PM",
    description: "A dynamic fusion of contemporary dance styles",
    image: eventDanceFusion,
    eventType: "upcoming",
  },
  {
    id: 5,
    name: "Clay Pottery Fundamentals",
    category: "Workshop",
    date: "Dec 13",
    time: "10:00 AM",
    description: "Get your hands dirty and create something beautiful",
    image: eventPottery,
    eventType: "upcoming",
  },
  {
    id: 6,
    name: "Interactive Light Installation",
    category: "Exhibit",
    date: "Dec 14",
    time: "1:00 PM",
    description: "A mesmerizing display of light and technology",
    image: eventLightInstallation,
    eventType: "upcoming",
  },
];

const groupResults: GroupResult[] = [
  {
    name: "Nebula Navigators",
    rank: 1,
    totalScore: 88,
    events: 3,
    rounds: [
      { round: "Round 1", score: 30 },
      { round: "Round 2", score: 31 },
      { round: "Round 3", score: 27 },
    ],
    color: "from-festival-orange to-festival-coral",
  },
  {
    name: "Crimson Canvas",
    rank: 2,
    totalScore: 85,
    events: 4,
    rounds: [
      { round: "Round 1", score: 28 },
      { round: "Round 2", score: 30 },
      { round: "Round 3", score: 27 },
    ],
    color: "from-festival-coral to-festival-peach",
  },
  {
    name: "Echo Ensemble",
    rank: 3,
    totalScore: 82,
    events: 3,
    rounds: [
      { round: "Round 1", score: 27 },
      { round: "Round 2", score: 28 },
      { round: "Round 3", score: 27 },
    ],
    color: "from-festival-purple to-festival-blue",
  },
  {
    name: "Solstice Studios",
    rank: 4,
    totalScore: 79,
    events: 5,
    rounds: [
      { round: "Round 1", score: 26 },
      { round: "Round 2", score: 27 },
      { round: "Round 3", score: 26 },
    ],
    color: "from-festival-yellow to-festival-orange",
  },
  {
    name: "Pixel Pioneers",
    rank: 5,
    totalScore: 75,
    events: 3,
    rounds: [
      { round: "Round 1", score: 25 },
      { round: "Round 2", score: 25 },
      { round: "Round 3", score: 25 },
    ],
    color: "from-festival-blue to-festival-purple",
  },
  {
    name: "Rhythm Rebels",
    rank: 6,
    totalScore: 71,
    events: 4,
    rounds: [
      { round: "Round 1", score: 24 },
      { round: "Round 2", score: 24 },
      { round: "Round 3", score: 23 },
    ],
    color: "from-festival-peach to-festival-coral",
  },
];

const teamsData: Team[] = [
  {
    name: "Team Aurora",
    color: "bg-festival-orange",
    bio: "A dynamic group focusing on the vibrant intersection of visual arts and performance, bringing stories to life through color and movement.",
    contact: "aurora@arcrino.edu",
    members: 5,
    participants: ["Emma Chen", "Marcus Rodriguez", "Aisha Patel"],
  },
  {
    name: "Team Solara",
    color: "bg-festival-yellow",
    bio: "Comprised of talented musicians and dancers, Team Solara creates electrifying performances that celebrate rhythm and collaborative energy.",
    contact: "solara@arcrino.edu",
    members: 5,
    participants: ["Diego Santos", "Yuki Tanaka", "Olivia Anderson"],
  },
  {
    name: "Team Noctis",
    color: "bg-festival-blue",
    bio: "Specializing in digital media and theatrical productions, Team Noctis explores modern narratives through innovative technology and compelling stagecraft.",
    contact: "noctis@arcrino.edu",
    members: 4,
    participants: ["Jamal Washington", "Sofia Kowalski", "Ravi Sharma"],
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<GroupResult | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const filteredEvents = eventsData.filter((event) =>
    selectedCategory === "All" ? true : event.category === selectedCategory
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const result = groupResults.find(
      (group) => group.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResult(result || null);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        id="home" 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${heroPoster})` }}
      >
        {/* Menu Bar and Get Result Button */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Menu Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => scrollToSection("home")} 
                  className="px-6 py-2.5 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all hover:scale-105"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection("events")} 
                  className="px-6 py-2.5 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all hover:scale-105"
                >
                  Events
                </button>
                <button 
                  onClick={() => scrollToSection("gallery")} 
                  className="px-6 py-2.5 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all hover:scale-105"
                >
                  Results
                </button>
                <button 
                  onClick={() => scrollToSection("about")} 
                  className="px-6 py-2.5 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all hover:scale-105"
                >
                  Teams
                </button>
                <button 
                  onClick={() => scrollToSection("contact")} 
                  className="px-6 py-2.5 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all hover:scale-105"
                >
                  Contact
                </button>
              </div>

              {/* Get Result Button */}
              <button 
                onClick={() => scrollToSection("gallery")}
                className="px-8 py-2.5 bg-festival-teal hover:bg-festival-darkteal text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Get Result
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Events Gallery */}
      <section id="events" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Pre-Events Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Pre-Events</h2>
              <p className="text-lg text-muted-foreground">
                Workshops and activities leading up to the main festival.
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {(["All", "Workshop", "Performance", "Exhibit"] as EventCategory[]).map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category ? "bg-primary text-primary-foreground" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Pre-Events Carousel */}
            <Carousel className="w-full max-w-6xl mx-auto">
              <CarouselContent>
                {eventsData
                  .filter(event => event.eventType === "pre-event")
                  .filter(event => selectedCategory === "All" || event.category === selectedCategory)
                  .map((event) => (
                    <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                        <div className="aspect-video overflow-hidden relative">
                          <Badge className="absolute top-4 left-4 z-10 bg-card/90 text-foreground border-0">
                            {event.category.toUpperCase()}
                          </Badge>
                          <img 
                            src={event.image} 
                            alt={event.name} 
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-foreground mb-2">{event.name}</h3>
                          <p className="text-muted-foreground mb-4">{event.description}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{event.date}</span>
                            <span>{event.time}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Upcoming Events Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Upcoming Events</h2>
              <p className="text-lg text-muted-foreground">
                Main festival events happening in December 2025.
              </p>
            </div>

            {/* Upcoming Events Carousel */}
            <Carousel className="w-full max-w-6xl mx-auto">
              <CarouselContent>
                {eventsData
                  .filter(event => event.eventType === "upcoming")
                  .filter(event => selectedCategory === "All" || event.category === selectedCategory)
                  .map((event) => (
                    <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                        <div className="aspect-video overflow-hidden relative">
                          <Badge className="absolute top-4 left-4 z-10 bg-card/90 text-foreground border-0">
                            {event.category.toUpperCase()}
                          </Badge>
                          <img 
                            src={event.image} 
                            alt={event.name} 
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-foreground mb-2">{event.name}</h3>
                          <p className="text-muted-foreground mb-4">{event.description}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{event.date}</span>
                            <span>{event.time}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Results & Leaderboard */}
      <section id="gallery" className="py-20 px-4 bg-gradient-to-br from-festival-lightblue/20 to-festival-teal/10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Find Your Spark: Results & Leaderboard
            </h2>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by group name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Search
              </Button>
            </form>
          </div>

          {/* Featured Result */}
          {searchResult && (
            <Card className="max-w-3xl mx-auto mb-12 overflow-hidden animate-scale-in">
              <div className="flex flex-col md:flex-row">
                <div className={`w-full md:w-1/3 bg-gradient-to-br ${searchResult.color} p-8 flex items-center justify-center`}>
                  <Trophy className="h-24 w-24 text-white/90" />
                </div>
                <CardContent className="flex-1 p-8">
                  <Badge className="mb-2 bg-primary/10 text-primary border-0">FEATURED RESULT</Badge>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{searchResult.name}</h3>
                  <p className="text-festival-orange font-bold text-lg mb-4">Winner</p>
                  <p className="text-muted-foreground mb-4">
                    Total Score: <span className="font-bold text-foreground">{searchResult.totalScore}/100</span>
                  </p>
                  <div className="space-y-2">
                    {searchResult.rounds.map((round) => (
                      <div key={round.round} className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{round.round}</span>
                        <span className="font-semibold text-foreground">{round.score}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          )}

          {/* Leaderboard */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-foreground">Overall Standings</h3>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "card" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("card")}
                  className={viewMode === "card" ? "bg-primary" : ""}
                >
                  Card View
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className={viewMode === "table" ? "bg-primary" : ""}
                >
                  Table View
                </Button>
              </div>
            </div>

            {viewMode === "card" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupResults.map((group) => (
                  <Card key={group.name} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl">
                            {group.rank}
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground">{group.name}</h4>
                            <p className="text-sm text-muted-foreground">{group.events} Events</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Score</span>
                          <span className="font-bold text-foreground">{group.totalScore}</span>
                        </div>
                        <Progress value={group.totalScore} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Rank</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Team</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Events</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupResults.map((group) => (
                          <tr key={group.name} className="border-b border-border last:border-0">
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                                {group.rank}
                              </div>
                            </td>
                            <td className="py-3 px-4 font-semibold text-foreground">{group.name}</td>
                            <td className="py-3 px-4 text-muted-foreground">{group.events}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Progress value={group.totalScore} className="h-2 w-20" />
                                <span className="font-bold text-foreground">{group.totalScore}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Meet Our Teams</h2>
            <p className="text-lg text-muted-foreground">
              Discover the creative forces behind the festival.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamsData.map((team) => (
              <Card key={team.name} className="hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-full ${team.color} mb-6`} />
                  <h3 className="text-2xl font-bold text-foreground mb-4">{team.name}</h3>
                  <p className="text-muted-foreground mb-6">{team.bio}</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{team.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{team.members} members</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-6 hover:bg-primary hover:text-primary-foreground transition-colors">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Schedule */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Event Schedule</h2>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                {[
                  { icon: Flag, name: "Opening Ceremony", time: "Day 1, 10:00 AM" },
                  { icon: Music, name: "Dance Competition", time: "Day 1, 01:00 PM" },
                  { icon: Palette, name: "Music Fest", time: "Day 2, 11:00 AM" },
                  { icon: Trophy, name: "Awards Night", time: "Day 2, 05:00 PM" },
                ].map((event, index) => (
                  <div key={index} className="flex items-start gap-4 pb-6 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      <event.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground mb-1">{event.name}</h4>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Rules & FAQ */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-8">Rules & Judging Criteria</h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="eligibility" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  Eligibility
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Attendees must be currently enrolled students at an accredited college or university. A valid student ID is required at check-in. Teams can have 3-6 members from any academic discipline.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="submission" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  Submission Guidelines
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  All submissions must be original work created specifically for this festival. Teams must register at least 2 weeks in advance and submit a brief description of their planned performance or exhibit. Materials must be submitted by the announced deadline.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="judging" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  Judging Process
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Judging will be based on creativity (30%), technical execution (30%), theme interpretation (20%), and audience engagement (20%). A panel of faculty and professional artists will evaluate all performances and exhibits. Winners will be announced at the Awards Night ceremony.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="fees" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  What are the registration fees?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Registration is $25 per team, which covers access to all workshops, performances, and exhibits. Individual attendee passes are available for $10. Early bird discounts of 20% are available until October 1st.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="parking" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  Is parking available at the venue?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, free parking is available at the college campus lots adjacent to the festival venue. Additional overflow parking with shuttle service is available at the North Campus lot. We also encourage carpooling and public transportation.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Sponsors</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center opacity-60">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground text-xs">Logo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Venue */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Contact & Venue</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h3>
                <p className="text-muted-foreground mb-6">Have questions? Reach out to us!</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-foreground">events@arcrino.edu</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-foreground">(123) 456-7890</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Arcrino College Campus, Main Arts Building</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-festival-yellow/20 to-festival-orange/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-foreground font-semibold">Campus Map</p>
                  <p className="text-sm text-muted-foreground mt-2">Interactive map placeholder</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-6 w-6" />
                <span className="text-xl font-bold">Of Arcrino</span>
              </div>
              <p className="text-background/70 text-sm">
                Celebrating creativity, competition, and community through art.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><button onClick={() => scrollToSection("home")} className="hover:text-background transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection("events")} className="hover:text-background transition-colors">Events</button></li>
                <li><button onClick={() => scrollToSection("about")} className="hover:text-background transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection("contact")} className="hover:text-background transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Schedule</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Rules</a></li>
                <li><a href="#" className="hover:text-background transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Sponsors</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:scale-110 transition-transform" aria-label="Facebook">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="hover:scale-110 transition-transform" aria-label="Twitter">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="hover:scale-110 transition-transform" aria-label="Instagram">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <Separator className="bg-background/20 mb-8" />
          <div className="text-center text-sm text-background/70">
            © 2024 Of Arcrino. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { useState } from "react";
import { Search, Mail, Phone, MapPin, Users, Trophy, Flag, Music, Palette, Sparkles, Facebook, Twitter, Instagram, BookOpen, Feather, ChevronDown } from "lucide-react";

// Types
type EventCategory = "All" | "Workshop" | "Performance" | "Exhibit";

interface Event {
  id: number;
  name: string;
  category: "Workshop" | "Performance" | "Exhibit";
  date: string;
  time: string;
  description: string;
  color: string;
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

// Dummy Data with color-coded placeholders
const eventsData: Event[] = [
  {
    id: 1,
    name: "Digital Canvas Painting",
    category: "Workshop",
    date: "Oct 26",
    time: "2:00 PM",
    description: "Unleash your inner artist with digital tools",
    color: "bg-gradient-to-br from-blue-400 to-purple-500",
    eventType: "pre-event",
  },
  {
    id: 2,
    name: "Acoustic Sunset Session",
    category: "Performance",
    date: "Oct 26",
    time: "6:00 PM",
    description: "Sway with live music as the sun goes down",
    color: "bg-gradient-to-br from-orange-400 to-red-500",
    eventType: "pre-event",
  },
  {
    id: 3,
    name: "Kinetic Sculpture Showcase",
    category: "Exhibit",
    date: "Oct 27",
    time: "11:00 AM",
    description: "Experience art that moves and inspires",
    color: "bg-gradient-to-br from-green-400 to-teal-500",
    eventType: "pre-event",
  },
  {
    id: 4,
    name: "Modern Dance Fusion",
    category: "Performance",
    date: "Dec 12",
    time: "3:00 PM",
    description: "A dynamic fusion of contemporary dance styles",
    color: "bg-gradient-to-br from-pink-400 to-rose-500",
    eventType: "upcoming",
  },
  {
    id: 5,
    name: "Clay Pottery Fundamentals",
    category: "Workshop",
    date: "Dec 13",
    time: "10:00 AM",
    description: "Get your hands dirty and create something beautiful",
    color: "bg-gradient-to-br from-amber-400 to-orange-600",
    eventType: "upcoming",
  },
  {
    id: 6,
    name: "Interactive Light Installation",
    category: "Exhibit",
    date: "Dec 14",
    time: "1:00 PM",
    description: "A mesmerizing display of light and technology",
    color: "bg-gradient-to-br from-indigo-400 to-blue-600",
    eventType: "upcoming",
  },
];

const groupResults: GroupResult[] = [
  { name: "Nebula Navigators", rank: 1, totalScore: 88, events: 3, rounds: [{ round: "Round 1", score: 30 }, { round: "Round 2", score: 31 }, { round: "Round 3", score: 27 }], color: "from-orange-400 to-pink-500" },
  { name: "Crimson Canvas", rank: 2, totalScore: 85, events: 4, rounds: [{ round: "Round 1", score: 28 }, { round: "Round 2", score: 30 }, { round: "Round 3", score: 27 }], color: "from-pink-500 to-red-500" },
  { name: "Echo Ensemble", rank: 3, totalScore: 82, events: 3, rounds: [{ round: "Round 1", score: 27 }, { round: "Round 2", score: 28 }, { round: "Round 3", score: 27 }], color: "from-purple-500 to-blue-500" },
  { name: "Solstice Studios", rank: 4, totalScore: 79, events: 5, rounds: [{ round: "Round 1", score: 26 }, { round: "Round 2", score: 27 }, { round: "Round 3", score: 26 }], color: "from-yellow-400 to-orange-500" },
  { name: "Pixel Pioneers", rank: 5, totalScore: 75, events: 3, rounds: [{ round: "Round 1", score: 25 }, { round: "Round 2", score: 25 }, { round: "Round 3", score: 25 }], color: "from-blue-500 to-purple-600" },
  { name: "Rhythm Rebels", rank: 6, totalScore: 71, events: 4, rounds: [{ round: "Round 1", score: 24 }, { round: "Round 2", score: 24 }, { round: "Round 3", score: 23 }], color: "from-pink-400 to-orange-500" },
];

const teamsData: Team[] = [
  { name: "Team Aurora", color: "bg-orange-500", bio: "A dynamic group focusing on the vibrant intersection of visual arts and performance, bringing stories to life through color and movement.", contact: "aurora@arcrino.edu", members: 5, participants: ["Emma Chen", "Marcus Rodriguez", "Aisha Patel"] },
  { name: "Team Solara", color: "bg-yellow-500", bio: "Comprised of talented musicians and dancers, Team Solara creates electrifying performances that celebrate rhythm and collaborative energy.", contact: "solara@arcrino.edu", members: 5, participants: ["Diego Santos", "Yuki Tanaka", "Olivia Anderson"] },
  { name: "Team Noctis", color: "bg-blue-600", bio: "Specializing in digital media and theatrical productions, Team Noctis explores modern narratives through innovative technology and compelling stagecraft.", contact: "noctis@arcrino.edu", members: 4, participants: ["Jamal Washington", "Sofia Kowalski", "Ravi Sharma"] },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<GroupResult | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const result = groupResults.find((group) => group.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setSearchResult(result || null);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="home" className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(251, 146, 60, 0.3) 35px, rgba(251, 146, 60, 0.3) 70px)` }}></div>
        </div>

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-center">
          <div className="w-full max-w-4xl px-4 py-6">
            <div className="bg-white/30 backdrop-blur-xl border border-orange-300/40 rounded-full shadow-2xl px-3 py-2 flex flex-wrap items-center justify-center gap-2">
              {["home", "theme", "events", "gallery", "about", "contact"].map((section) => (
                <button key={section} onClick={() => scrollToSection(section)} className="px-4 md:px-6 py-2 text-sm md:text-base font-semibold text-gray-800 hover:bg-orange-200/40 rounded-full transition-all duration-300 hover:scale-105">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              <button onClick={() => scrollToSection("gallery")} className="px-4 md:px-6 py-2 text-sm md:text-base font-bold text-white bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg">
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Get Result</span>
                <span className="sm:hidden">Result</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto max-w-6xl px-4 h-screen flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            <div className="space-y-6">
              <span className="inline-block bg-gradient-to-r from-orange-500 to-pink-600 text-white px-4 py-2 text-sm font-semibold rounded-full shadow-lg">Samastha Kerala Centenary Celebration</span>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">Diacritics of Discernment</h1>
              <div className="flex items-center gap-3 text-gray-700">
                <BookOpen className="h-6 w-6 text-orange-500" />
                <p className="text-xl font-medium">A Century of Scholarly Legacy</p>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">Honoring an unbroken tradition of scholarship that safeguarded Islam through clarity, nuance, and patient distinction. Where precision safeguards unity, distinction preserves identity, and nuance nurtures harmony.</p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button onClick={() => scrollToSection("theme")} className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white rounded-lg font-semibold shadow-lg transition-all flex items-center gap-2">
                  <Feather className="h-5 w-5" />
                  Explore Theme
                </button>
                <button onClick={() => scrollToSection("events")} className="px-6 py-3 border-2 border-orange-500 text-orange-600 hover:bg-orange-50 rounded-lg font-semibold transition-all">View Events</button>
              </div>
              <div className="pt-6 border-t border-orange-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><p className="text-3xl font-bold text-orange-600">100</p><p className="text-sm text-gray-600">Years Legacy</p></div>
                  <div><p className="text-3xl font-bold text-pink-600">2025</p><p className="text-sm text-gray-600">Festival Year</p></div>
                  <div><p className="text-3xl font-bold text-purple-600">Unity</p><p className="text-sm text-gray-600">Through Clarity</p></div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 p-1 shadow-2xl">
                <div className="w-full h-full rounded-3xl bg-white p-8 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="text-8xl font-serif text-orange-600">ٰ</div>
                    <div className="text-2xl font-bold text-gray-900">A Mark Above</div>
                    <p className="text-gray-600 max-w-sm mx-auto">Like a diacritic changes meaning, discernment shapes understanding</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-400 rounded-full opacity-30 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-500 rounded-full opacity-30 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Explanation */}
      <section id="theme" className="py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Understanding the Theme</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">A tribute to an unbroken tradition of scholarship that preserved, propagated, and dignified Islam in Malabar</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Feather, title: "The Diacritic as Guardian", text: "A mark above, a mark below — small but powerful. It stands as a guardrail preventing the community from slipping into error, excess, or confusion.", color: "bg-orange-500" },
              { icon: BookOpen, title: "Distinction Without Division", text: "The middle way — clarity without cruelty, identity without insularity. Uncompromising in creed, yet generous in interpretation.", color: "bg-pink-500" },
              { icon: Users, title: "Community Through Clarity", text: "Drawing boundaries not to create enemies, but to preserve the integrity of what we hold sacred. Coexistence with conviction.", color: "bg-purple-500" }
            ].map((item, i) => (
              <div key={i} className="border-2 border-orange-200 rounded-xl p-8 hover:border-orange-400 transition-all hover:shadow-xl bg-white">
                <div className={`w-14 h-14 ${item.color} rounded-lg flex items-center justify-center mb-6 shadow-lg`}>
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-orange-500 via-pink-600 to-purple-700 text-white rounded-2xl p-12 shadow-2xl">
            <blockquote className="text-center space-y-6">
              <p className="text-2xl md:text-3xl font-serif italic leading-relaxed">"To discern is to honour our heritage. To mark is to protect truth. To distinguish is to remain united."</p>
              <footer className="text-orange-100 text-lg">— The Diacritical Legacy We Celebrate</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Festival Events</h2>
            <p className="text-lg text-gray-600">Workshops, performances, and exhibits celebrating our heritage</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {(["All", "Workshop", "Performance", "Exhibit"] as EventCategory[]).map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2 rounded-lg font-semibold transition-all ${selectedCategory === cat ? "bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg" : "border-2 border-orange-300 text-gray-700 hover:bg-orange-50"}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsData.filter(e => selectedCategory === "All" || e.category === selectedCategory).map((event) => (
              <div key={event.id} className="border-2 border-orange-200 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
                <div className={`aspect-video ${event.color} relative flex items-center justify-center`}>
                  <span className="absolute top-4 left-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">{event.category.toUpperCase()}</span>
                  <div className="text-white text-6xl opacity-50">{event.category === "Workshop" ? "🎨" : event.category === "Performance" ? "🎭" : "🖼️"}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{event.date}</span><span>{event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="gallery" className="py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Results & Leaderboard</h2>
          </div>
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by group name..." className="w-full pl-10 pr-4 py-3 border-2 border-orange-300 rounded-lg focus:outline-none focus:border-orange-500" />
              </div>
              <button onClick={handleSearch} className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white rounded-lg font-semibold transition-all shadow-lg">Search</button>
            </div>
          </div>
          {searchResult && (
            <div className="max-w-3xl mx-auto mb-12 border-2 border-orange-300 rounded-2xl overflow-hidden shadow-xl bg-white">
              <div className="flex flex-col md:flex-row">
                <div className={`w-full md:w-1/3 bg-gradient-to-br ${searchResult.color} p-8 flex items-center justify-center`}>
                  <Trophy className="h-24 w-24 text-white/90" />
                </div>
                <div className="flex-1 p-8">
                  <span className="inline-block mb-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">FEATURED RESULT</span>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{searchResult.name}</h3>
                  <p className="text-orange-600 font-bold text-lg mb-4">Rank #{searchResult.rank}</p>
                  <p className="text-gray-700 mb-4">Total Score: <span className="font-bold text-gray-900">{searchResult.totalScore}/100</span></p>
                </div>
              </div>
            </div>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupResults.map((group) => (
              <div key={group.name} className="bg-white border-2 border-orange-200 rounded-xl p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold text-xl shadow-lg">{group.rank}</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{group.name}</h4>
                    <p className="text-sm text-gray-600">{group.events} Events</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Score</span>
                    <span className="font-bold text-gray-900">{group.totalScore}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teams */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Teams</h2>
            <p className="text-lg text-gray-600">Discover the creative forces behind the festival</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamsData.map((team) => (
              <div key={team.name} className="border-2 border-orange-200 rounded-xl p-8 hover:shadow-xl transition-all hover:-translate-y-1 bg-white">
                <div className={`w-16 h-16 rounded-full ${team.color} mb-6 shadow-lg`} />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{team.name}</h3>
                <p className="text-gray-600 mb-6">{team.bio}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4 text-orange-500" />
                    <span>{team.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-orange-500" />
                    <span>{team.members} members</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-orange-200 rounded-xl p-8 bg-white shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-700">events@samastha.edu</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-pink-500" />
                  <span className="text-gray-700">(123) 456-7890</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-purple-500" />
                  <span className="text-gray-700">Samastha Campus, Kerala</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-500 via-pink-600 to-purple-700 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Feather className="h-6 w-6" />
                <span className="text-xl font-bold">Diacritics of Discernment</span>
              </div>
              <p className="text-orange-100 text-sm">Celebrating a century of scholarly tradition and communal clarity.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-orange-100">
                {["home", "theme", "events", "gallery", "about", "contact"].map((link) => (
                  <li key={link}><button onClick={() => scrollToSection(link)} className="hover:text-white transition-colors">{link.charAt(0).toUpperCase() + link.slice(1)}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:scale-110 transition-transform" aria-label="Facebook"><Facebook className="h-6 w-6" /></a>
                <a href="#" className="hover:scale-110 transition-transform" aria-label="Twitter"><Twitter className="h-6 w-6" /></a>
                <a href="#" className="hover:scale-110 transition-transform" aria-label="Instagram"><Instagram className="h-6 w-6" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-sm text-orange-100">© 2025 Samastha Kerala Centenary. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

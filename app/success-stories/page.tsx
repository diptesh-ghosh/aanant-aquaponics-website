'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  Award, 
  Users, 
  Star,
  Quote,
  MapPin,
  Calendar,
  CheckCircle,
  ArrowRight,
  Play,
  Download,
  MessageCircle,
  TrendingUp,
  Wind,
  DollarSign,
  Heart,
  Leaf,
  Target,
  Filter,
  Search,
  ChevronRight,
  Mail
} from 'lucide-react';

// Success stories data
const successStories = [
  {
    id: 'rajesh-kumar',
    name: 'Rajesh Kumar',
    location: 'Gurgaon',
    occupation: 'Software Engineer',
    beforeAQI: 267,
    afterAQI: 18,
    monthlyIncome: 15000,
    timeframe: '6 months',
    story: `
      <p>When I first heard about Dr. Singh's aquaponics system, I was skeptical. The idea that plants could clean Delhi's air to AQI 15 levels seemed impossible. But my son's worsening asthma pushed me to try anything.</p>
      
      <p>Following the AQI Mastery Program exactly as instructed, I transformed our 3BHK apartment's balcony into a vertical growing system. Within 3 months, our indoor AQI dropped from 267 to consistently under 20. My son's asthma attacks stopped completely.</p>
      
      <p>The unexpected benefit was the income. I now sell premium organic produce to neighbors every weekend, generating ₹15,000 monthly with minimal effort. The system paid for itself within 6 months.</p>
      
      <p>Dr. Singh's scientific approach and detailed guidance made this transformation possible. My family breathes clean air while creating sustainable income - truly life-changing.</p>
    `,
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    testimonial: "My son's asthma disappeared within 6 months. AQI in our home went from 250+ to 18. The additional income is a wonderful bonus.",
    featured: true
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    location: 'Delhi',
    occupation: 'Homemaker & Entrepreneur',
    beforeAQI: 298,
    afterAQI: 16,
    monthlyIncome: 22000,
    timeframe: '8 months',
    story: `
      <p>Living in central Delhi, my family suffered from constant respiratory issues. Air purifiers helped marginally, but we still experienced headaches, congestion, and fatigue. After attending Dr. Singh's workshop, I decided to implement his system in our home.</p>
      
      <p>The transformation was remarkable. Within 4 months, our indoor AQI dropped from nearly 300 to consistently under 20. My children's chronic coughs disappeared, and we all experienced improved sleep and energy levels.</p>
      
      <p>I took the business aspect seriously, creating a WhatsApp group for my apartment complex to sell our organic produce. This has grown into a thriving business generating ₹22,000 monthly. I've expanded to three residential complexes in our area, with a waiting list of customers.</p>
      
      <p>Dr. Singh and Neeno's guidance was invaluable throughout this journey. Their scientific approach, combined with practical implementation strategies, made this success possible. Our home is now both a sanctuary of clean air and a source of sustainable income.</p>
    `,
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    testimonial: "Dr. Singh's method saved our family. We can finally breathe freely at home, and the business has given me financial independence.",
    featured: true
  },
  {
    id: 'jyothsna-singh',
    name: 'Jyothsna Singh',
    location: 'Lucknow',
    occupation: 'Business Owner',
    beforeAQI: 220,
    afterAQI: 18,
    monthlyIncome: 12000,
    timeframe: '3 months',
    story: `
      <p>As the daughter of Dr. Peter Singh, I had the unique opportunity to implement his aquaponics system in my Lucknow residence. Despite being familiar with the science behind it, I was still amazed by the transformation of our home environment.</p>
      
      <p>Our property in Hazratganj had decent air quality compared to Delhi, but still suffered from significant pollution. Within just 3 months of implementing the system, we achieved consistent AQI readings of 18, a dramatic improvement from our previous average of 220.</p>
      
      <p>What surprised me most was the impact on our fruit trees. The nutrient-rich water from the aquaponics system has led to a 175% increase in fruit production. Our mango, guava, and citrus trees are thriving like never before, producing fruit of exceptional quality and taste.</p>
      
      <p>The system has been designed to blend seamlessly with our traditional garden aesthetic. Visitors don't even realize it's there until we point it out. It's become a wonderful educational tool for our children and a source of pride for our family.</p>
      
      <p>We now generate approximately ₹12,000 monthly from selling excess produce to neighbors and local shops. The system has truly transformed our home into a sustainable, healthy living space that contributes positively to both our family's wellbeing and our finances.</p>
    `,
    image: '/image copy.png',
    testimonial: "The transformation of our garden has been incredible. Not only do we have pristine air quality, but our fruit trees are thriving like never before.",
    featured: true
  },
  {
    id: 'anita-gupta',
    name: 'Anita Gupta',
    location: 'South Delhi',
    occupation: 'Retired Teacher',
    beforeAQI: 275,
    afterAQI: 15,
    monthlyIncome: 12000,
    timeframe: '7 months',
    story: `
      <p>After retiring from 35 years of teaching, I was looking for a meaningful project. My husband and I had been suffering from Delhi's pollution for years, with recurring bronchial infections becoming a normal part of life.</p>
      
      <p>Dr. Singh's presentation at our community center caught my attention. The combination of improving our health while creating a productive garden seemed ideal for our retirement years.</p>
      
      <p>With our son's help, we transformed our terrace into an aquaponics system following Dr. Singh's specifications. The results were beyond our expectations. Our home's AQI dropped from 275 to consistently under 20, and our respiratory issues improved dramatically.</p>
      
      <p>I've found great joy in tending to the plants and fish, watching the system thrive. We sell our excess produce to neighbors and local shops, generating around ₹12,000 monthly - a welcome supplement to our pension.</p>
      
      <p>At 68, I've found a new purpose that keeps me active, contributes to our health and finances, and connects me with a community of like-minded individuals. Dr. Singh's system has truly enriched our retirement years.</p>
    `,
    image: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=400',
    testimonial: "At our age, breathing clean air has made a tremendous difference to our quality of life. The garden keeps us active and the extra income is a blessing.",
    featured: false
  },
  {
    id: 'vikram-singh',
    name: 'Vikram Singh',
    location: 'Faridabad',
    occupation: 'Engineer',
    beforeAQI: 320,
    afterAQI: 22,
    monthlyIncome: 35000,
    timeframe: '3 months',
    story: `
      <p>As an engineer, I approached Dr. Singh's claims with healthy skepticism. The idea that an aquaponics system could reduce indoor AQI from 300+ to under 20 seemed scientifically improbable. But my daughter's worsening respiratory issues motivated me to investigate further.</p>
      
      <p>After attending a workshop and reviewing the technical documentation, I was impressed by the rigorous methodology. I decided to implement the system in our Faridabad apartment, carefully following the specifications and monitoring the results.</p>
      
      <p>The data speaks for itself. Within 3 months, our indoor AQI dropped from 320 to consistently under 25. My daughter's respiratory incidents decreased from 3-4 weekly to zero in the past month. The improvement in our family's health has been remarkable.</p>
      
      <p>Applying my engineering background, I optimized the system for our specific space constraints, achieving excellent results despite our limited balcony area. I've documented the entire process with precise measurements and data collection.</p>
      
      <p>The economic aspect has been equally impressive. By creating a subscription model for weekly produce delivery to neighbors, I've generated a consistent monthly income of ₹35,000. The system paid for itself within the first 2 months.</p>
      
      <p>For those with technical backgrounds who might be skeptical: review the data, understand the science, and implement with precision. The results are reproducible and verifiable.</p>
    `,
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
    testimonial: "As an engineer, I needed to see the data. The system has transformed my daughter's health while creating a significant additional income stream.",
    featured: true
  }
];

// Metrics data
const metrics = [
  {
    title: 'Average AQI Improvement',
    value: 94.6,
    unit: '%',
    description: 'Consistent across all implementations',
    icon: Wind,
    color: 'blue'
  },
  {
    title: 'Average Monthly Income',
    value: 18500,
    unit: '₹',
    description: 'Generated by graduates',
    icon: DollarSign,
    color: 'green'
  },
  {
    title: 'Success Rate',
    value: 87.3,
    unit: '%',
    description: 'Students achieving target metrics',
    icon: Target,
    color: 'purple'
  },
  {
    title: 'Implementation Time',
    value: 5.2,
    unit: 'months',
    description: 'Average time to full results',
    icon: Calendar,
    color: 'orange'
  }
];

export default function SuccessStoriesPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedStory, setSelectedStory] = useState('rajesh-kumar');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [activeTab, setActiveTab] = useState('stories');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Find the currently selected story
  const story = successStories.find(s => s.id === selectedStory);
  
  // Filter stories based on search term and location
  const filteredStories = successStories.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         s.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.occupation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation === 'all' || s.location === filterLocation;
    return matchesSearch && matchesLocation;
  });

  // Get unique locations for filter
  const locations = ['all', ...new Set(successStories.map(s => s.location))];

  // Get featured stories
  const featuredStories = successStories.filter(s => s.featured);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200',
      orange: 'text-orange-600 bg-orange-50 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-2 text-green-700 border-green-200">
                <Users className="w-4 h-4 mr-2" />
                Real Results
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                Success Stories from{' '}
                <span className="text-green-700">Real People</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover how families across Delhi NCR have transformed their health, homes, and finances
                through our scientifically-proven aquaponics methodology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Measurable Results Across 750+ Implementations
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our methodology delivers consistent, measurable outcomes across diverse homes and environments.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${getColorClasses(metric.color)}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {metric.value}{metric.unit}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{metric.title}</h3>
                      <p className="text-sm text-gray-600">{metric.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="stories" onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stories">Success Stories</TabsTrigger>
                <TabsTrigger value="videos">Video Testimonials</TabsTrigger>
                <TabsTrigger value="submit">Submit Your Story</TabsTrigger>
              </TabsList>

              {/* Success Stories Tab */}
              <TabsContent value="stories" className="space-y-8">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search stories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border rounded-md"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Filter by:</span>
                    </div>
                    <select
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      className="p-2 border rounded-md"
                    >
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location === 'all' ? 'All Locations' : location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Story List */}
                  <div className="lg:col-span-1 space-y-4">
                    {filteredStories.length === 0 ? (
                      <div className="text-center py-8">
                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No stories found</h3>
                        <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setSearchTerm('');
                            setFilterLocation('all');
                          }}
                        >
                          Clear Filters
                        </Button>
                      </div>
                    ) : (
                      filteredStories.map((s) => (
                        <Card 
                          key={s.id}
                          className={`cursor-pointer transition-all duration-300 ${
                            selectedStory === s.id ? 'ring-2 ring-green-400 bg-green-50' : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedStory(s.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <img
                                src={s.image}
                                alt={s.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <h3 className="font-semibold text-gray-900">{s.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <MapPin className="w-3 h-3" />
                                  <span>{s.location}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center gap-1 text-blue-600">
                                <Wind className="w-3 h-3" />
                                <span>AQI: {s.beforeAQI} → {s.afterAQI}</span>
                              </div>
                              <div className="flex items-center gap-1 text-green-600">
                                <DollarSign className="w-3 h-3" />
                                <span>₹{s.monthlyIncome.toLocaleString()}/month</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>

                  {/* Story Detail */}
                  {story && (
                    <div className="lg:col-span-2">
                      <Card className="overflow-hidden">
                        <div className="relative h-64">
                          <img
                            src={story.image}
                            alt={story.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h2 className="text-2xl font-bold mb-2">{story.name}</h2>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{story.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                <span>{story.occupation}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="grid md:grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                              <Wind className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                              <div className="text-sm text-gray-600 mb-1">AQI Improvement</div>
                              <div className="flex items-center justify-center gap-2">
                                <span className="text-red-600 font-bold">{story.beforeAQI}</span>
                                <span className="text-gray-400">→</span>
                                <span className="text-green-600 font-bold">{story.afterAQI}</span>
                              </div>
                              <div className="text-xs text-blue-600 mt-1">
                                {Math.round((1 - story.afterAQI / story.beforeAQI) * 100)}% reduction
                              </div>
                            </div>
                            
                            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                              <div className="text-sm text-gray-600 mb-1">Monthly Income</div>
                              <div className="text-xl font-bold text-green-700">
                                ₹{story.monthlyIncome.toLocaleString()}
                              </div>
                              <div className="text-xs text-green-600 mt-1">
                                Sustainable revenue
                              </div>
                            </div>
                            
                            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                              <div className="text-sm text-gray-600 mb-1">Implementation Time</div>
                              <div className="text-xl font-bold text-purple-700">
                                {story.timeframe}
                              </div>
                              <div className="text-xs text-purple-600 mt-1">
                                From start to results
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Their Story</h3>
                            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: story.story }}></div>
                          </div>
                          
                          <div className="bg-gray-50 p-6 rounded-lg border">
                            <div className="flex items-center gap-4 mb-4">
                              <Quote className="w-8 h-8 text-gray-400" />
                              <h4 className="text-lg font-semibold text-gray-900">In Their Words</h4>
                            </div>
                            <blockquote className="text-lg text-gray-700 italic">
                              "{story.testimonial}"
                            </blockquote>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Video Testimonials Tab */}
              <TabsContent value="videos" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Video Success Stories
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Watch our students share their transformation journeys in their own words.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Video 1 */}
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative">
                      <img
                        src="https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Rajesh Kumar Video Testimonial"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                          <Play className="w-5 h-5 mr-2" />
                          Watch Testimonial
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Rajesh Kumar's Transformation</h3>
                      <p className="text-sm text-gray-600 mb-2">From skeptic to advocate - how aquaponics changed this family's health and finances</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Duration: 5:24</span>
                        <span>Gurgaon, Delhi NCR</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Video 2 */}
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative">
                      <img
                        src="https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Priya Sharma Video Testimonial"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                          <Play className="w-5 h-5 mr-2" />
                          Watch Testimonial
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Priya's Business Success</h3>
                      <p className="text-sm text-gray-600 mb-2">How a homemaker built a ₹22,000/month business while improving family health</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Duration: 7:12</span>
                        <span>South Delhi</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Video 3 */}
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative">
                      <img
                        src="/image copy.png"
                        alt="Jyothsna Singh Video Testimonial"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                          <Play className="w-5 h-5 mr-2" />
                          Watch Testimonial
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Jyothsna's Lucknow Garden</h3>
                      <p className="text-sm text-gray-600 mb-2">Daughter's residence transformation with fruit tree integration</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Duration: 8:45</span>
                        <span>Lucknow</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Video 4 */}
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative">
                      <img
                        src="https://images.pexels.com/photos/4503276/pexels-photo-4503276.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Family Transformation Video"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                          <Play className="w-5 h-5 mr-2" />
                          Watch Testimonial
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Complete Family Transformation</h3>
                      <p className="text-sm text-gray-600 mb-2">The Agarwal family's journey to health and sustainability</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Duration: 10:18</span>
                        <span>Ghaziabad</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Video 5 */}
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative">
                      <img
                        src="https://images.pexels.com/photos/4503277/pexels-photo-4503277.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Technical Walkthrough Video"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                          <Play className="w-5 h-5 mr-2" />
                          Watch Testimonial
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Technical System Walkthrough</h3>
                      <p className="text-sm text-gray-600 mb-2">Detailed tour of a successful implementation with technical insights</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Duration: 15:42</span>
                        <span>Noida</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Video 6 */}
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative">
                      <img
                        src="https://images.pexels.com/photos/4503278/pexels-photo-4503278.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Business Model Video"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                          <Play className="w-5 h-5 mr-2" />
                          Watch Testimonial
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Business Model Breakdown</h3>
                      <p className="text-sm text-gray-600 mb-2">How to maximize revenue from your aquaponics system</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Duration: 12:35</span>
                        <span>Multiple Locations</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Featured Video */}
                <div className="mt-12">
                  <Card className="overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="relative h-full min-h-[300px]">
                        <img
                          src="https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800"
                          alt="Featured Success Story"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full w-16 h-16">
                            <Play className="w-8 h-8 ml-1" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-6">
                        <Badge className="mb-4 bg-purple-100 text-purple-800">
                          Featured Story
                        </Badge>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          Complete System Transformation: The Singh Family Journey
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Follow the complete journey of the Singh family from initial setup to full implementation,
                          with detailed insights into their process, challenges, and remarkable results.
                        </p>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-3">
                            <Wind className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">AQI Improvement</p>
                              <p className="text-sm text-gray-600">From 285 to 15 (94.7% reduction)</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            <div>
                              <p className="font-medium text-gray-900">Monthly Revenue</p>
                              <p className="text-sm text-gray-600">₹25,000+ from organic produce sales</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-purple-600" />
                            <div>
                              <p className="font-medium text-gray-900">Implementation Time</p>
                              <p className="text-sm text-gray-600">4 months from start to full results</p>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full bg-purple-700 hover:bg-purple-800">
                          <Play className="w-5 h-5 mr-2" />
                          Watch Full Documentary (25:18)
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              {/* Submit Your Story Tab */}
              <TabsContent value="submit" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Share Your Success Story
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Inspire others by sharing your aquaponics journey and results. Selected stories will be
                    featured on our website and may receive special recognition.
                  </p>
                </div>

                <Card>
                  <CardContent className="p-8">
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                          <input
                            id="name"
                            type="text"
                            className="w-full p-2 border rounded-md"
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                          <input
                            id="email"
                            type="email"
                            className="w-full p-2 border rounded-md"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="location" className="text-sm font-medium text-gray-700">Location</label>
                          <input
                            id="location"
                            type="text"
                            className="w-full p-2 border rounded-md"
                            placeholder="City, State"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="occupation" className="text-sm font-medium text-gray-700">Occupation</label>
                          <input
                            id="occupation"
                            type="text"
                            className="w-full p-2 border rounded-md"
                            placeholder="Your profession"
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="beforeAQI" className="text-sm font-medium text-gray-700">Before AQI</label>
                          <input
                            id="beforeAQI"
                            type="number"
                            className="w-full p-2 border rounded-md"
                            placeholder="e.g., 250"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="afterAQI" className="text-sm font-medium text-gray-700">After AQI</label>
                          <input
                            id="afterAQI"
                            type="number"
                            className="w-full p-2 border rounded-md"
                            placeholder="e.g., 15"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="monthlyIncome" className="text-sm font-medium text-gray-700">Monthly Income (₹)</label>
                          <input
                            id="monthlyIncome"
                            type="number"
                            className="w-full p-2 border rounded-md"
                            placeholder="e.g., 15000"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="story" className="text-sm font-medium text-gray-700">Your Success Story</label>
                        <textarea
                          id="story"
                          className="w-full p-2 border rounded-md min-h-[200px]"
                          placeholder="Share your journey, challenges, and results in detail..."
                        ></textarea>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="photo" className="text-sm font-medium text-gray-700">Upload Photo (Optional)</label>
                        <input
                          id="photo"
                          type="file"
                          className="w-full p-2 border rounded-md"
                        />
                        <p className="text-xs text-gray-500">Max file size: 5MB. Accepted formats: JPG, PNG</p>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <input
                          id="consent"
                          type="checkbox"
                          className="mt-1"
                        />
                        <label htmlFor="consent" className="text-sm text-gray-700">
                          I consent to having my story and photo published on the Aanant Aquaponics website and social media channels.
                        </label>
                      </div>
                      
                      <Button className="bg-green-700 hover:bg-green-800">
                        <Heart className="w-5 h-5 mr-2" />
                        Submit Your Success Story
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Featured Success Stories */}
      {activeTab !== 'stories' && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Featured Success Stories</h2>
                <Button variant="outline">
                  View All Stories
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {featuredStories.map((story) => (
                  <Card key={story.id} className="hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl font-bold mb-1">{story.name}</h3>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{story.location}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="text-center p-2 bg-blue-50 rounded-lg">
                          <div className="font-semibold text-blue-700">AQI {story.afterAQI}</div>
                          <div className="text-xs text-gray-600">From {story.beforeAQI}</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded-lg">
                          <div className="font-semibold text-green-700">₹{story.monthlyIncome.toLocaleString()}</div>
                          <div className="text-xs text-gray-600">Monthly Income</div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 italic">
                        "{story.testimonial}"
                      </p>
                      
                      <Button variant="outline" className="w-full">
                        Read Full Story
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Join the Community */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Write Your Own Success Story?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Join 750+ families who have transformed their lives through our scientifically-proven 
              aquaponics methodology. Clean air, better health, and sustainable income await.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                Explore Our Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <MessageCircle className="w-5 h-5 mr-2" />
                Join Our Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <div className="text-center">
                <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Get Inspired by Weekly Success Stories
                </h3>
                <p className="text-gray-700 mb-6">
                  Subscribe to our newsletter to receive weekly success stories, implementation tips,
                  and exclusive content from Dr. Peter Singh and our community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 rounded-lg border"
                  />
                  <Button className="bg-green-700 hover:bg-green-800">
                    <Mail className="w-5 h-5 mr-2" />
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
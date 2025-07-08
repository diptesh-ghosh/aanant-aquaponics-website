'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Award, 
  Globe, 
  Tv, 
  Newspaper, 
  Radio,
  ExternalLink,
  Quote,
  Flag,
  Trophy,
  Shield,
  Calendar,
  MapPin,
  Download,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

// Media coverage data
const mediaCoverage = {
  indian: [
    {
      outlet: 'CNN-News18',
      headline: 'Delhi Family Achieves AQI 15 in Polluted City',
      description: 'In-depth feature on Dr. Singh\'s aquaponics methodology and its impact on urban air quality.',
      date: '2023',
      type: 'Television',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/CNN-News18_logo.svg/1200px-CNN-News18_logo.svg.png',
      link: '#',
      quote: "Dr. Singh's methodology represents a breakthrough in urban environmental management, combining scientific rigor with practical application."
    },
    {
      outlet: 'NDTV',
      headline: 'Aquaponics Success Story from Punjab to Delhi',
      description: 'Prime-time documentary featuring the transformation from health crisis to community impact.',
      date: '2023',
      type: 'Television',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/NDTV_logo.svg/1200px-NDTV_logo.svg.png',
      link: '#',
      quote: "What started as a family's health crisis has evolved into a scalable solution for one of India's most pressing environmental challenges."
    },
    {
      outlet: 'The Week Magazine',
      headline: 'Sustainable Living Pioneers',
      description: 'In-depth feature on Dr. Singh\'s aquaponics methodology and its impact on urban air quality.',
      date: '2023',
      type: 'Print',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/The_Week_%28Indian_magazine%29_logo.svg/1200px-The_Week_%28Indian_magazine%29_logo.svg.png',
      link: '#',
      quote: "The Week's investigation found consistent AQI readings of 15-20 inside the Singh residence, compared to 250+ just outside - a remarkable achievement in one of the world's most polluted cities."
    },
    {
      outlet: 'The Better India',
      headline: 'From Cancer Diagnosis to Clean Air Success',
      description: 'Comprehensive story of personal transformation and community impact.',
      date: '2023',
      type: 'Digital',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/The_Better_India_Logo.png/1200px-The_Better_India_Logo.png',
      link: '#',
      quote: "The Singh family's journey from health crisis to environmental innovation offers a blueprint for sustainable urban living that could transform India's approach to pollution."
    },
    {
      outlet: 'Times of India',
      headline: 'Home Garden Sustainable Oasis in Delhi',
      description: 'Feature article on innovative approaches to urban environmental challenges.',
      date: '2024',
      type: 'Print',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/The_Times_of_India_logo.svg/1200px-The_Times_of_India_logo.svg.png',
      link: '#',
      quote: "Independent testing confirmed the Singh residence maintains AQI levels comparable to pristine mountain environments despite being located in one of Delhi's most polluted neighborhoods."
    },
    {
      outlet: 'Indian Express',
      headline: 'Traditional Farming Meets Modern Innovation',
      description: 'Technical analysis of aquaponics systems and their environmental benefits.',
      date: '2024',
      type: 'Print',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Indian_Express_logo.svg/1200px-Indian_Express_logo.svg.png',
      link: '#',
      quote: "Dr. Singh's approach stands out for its integration of traditional farming wisdom with cutting-edge environmental science, creating a solution that is both innovative and culturally resonant."
    }
  ],
  international: [
    {
      outlet: 'German TV (Weltspiegel)',
      headline: 'Indian Innovation: Fighting Air Pollution with Agriculture',
      description: 'International documentary showcasing Indian solutions to global environmental challenges.',
      date: '2023',
      type: 'Television',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/ARD_logo.svg/1200px-ARD_logo.svg.png',
      link: '#',
      quote: "The Singh family's approach could offer valuable lessons for urban centers worldwide struggling with air pollution and food security challenges."
    },
    {
      outlet: 'Telegraph London',
      headline: 'Indian Family\'s Pollution Solution',
      description: 'International coverage of innovative environmental solutions from India.',
      date: '2024',
      type: 'Print',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Telegraph_logo.svg/1200px-The_Telegraph_logo.svg.png',
      link: '#',
      quote: "The international community is taking notice of this innovative approach to air quality management emerging from Delhi."
    },
    {
      outlet: 'NHK World Japan',
      headline: 'Sustainable Living in Megacity',
      description: 'Global broadcast featuring sustainable technology and environmental innovation.',
      date: '2024',
      type: 'Television',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/NHK_World.svg/1200px-NHK_World.svg.png',
      link: '#',
      quote: "Japan's public broadcaster highlighted the Singh methodology as a potential model for dense urban environments in Asia facing similar environmental challenges."
    }
  ]
};

// Government recognition data
const governmentRecognition = [
  {
    year: '1988',
    title: 'Punjab Government Award for Beekeeping Industry Development',
    authority: 'Government of Punjab',
    description: 'Recognition for pioneering work in sustainable beekeeping practices and industry development.',
    icon: Trophy,
    color: 'yellow'
  },
  {
    year: '1998',
    title: 'Excellence Award - Honey Production Increase',
    authority: 'Ministry of Agriculture',
    description: 'Awarded for significant contributions to increasing honey production through innovative techniques.',
    icon: Award,
    color: 'orange'
  },
  {
    year: '2000',
    title: 'Founding Member, National Beekeeping Development Board',
    authority: 'Government of India',
    description: 'Appointed as founding member for establishing national beekeeping standards and policies.',
    icon: Shield,
    color: 'blue'
  },
  {
    year: '2010',
    title: 'Resource Person, Ministry of Agriculture',
    authority: 'Government of India',
    description: 'Designated as expert resource person for sustainable agriculture and environmental initiatives.',
    icon: Flag,
    color: 'green'
  }
];

// Industry achievements data
const industryAchievements = [
  {
    year: '1973',
    title: 'First to introduce Apis Mellifera beekeeping in Punjab',
    description: 'Pioneered modern beekeeping techniques that revolutionized the industry in Northern India.',
    impact: 'Transformed regional honey production capabilities'
  },
  {
    year: '1985-2000',
    title: 'Trained 750+ farmers in sustainable practices',
    description: 'Comprehensive training programs for farmers across Punjab and neighboring states.',
    impact: 'Created a network of skilled beekeepers and sustainable farmers'
  },
  {
    year: '1995-2010',
    title: 'Export success: 2000 tons honey annually to Germany & USA',
    description: 'Established international export channels for premium Indian honey products.',
    impact: 'Generated significant foreign exchange and elevated Indian honey standards'
  },
  {
    year: '2020-2023',
    title: '3x consecutive winner: Goa Organic Garden Competition',
    description: 'Recognition for excellence in sustainable garden design and implementation.',
    impact: 'Demonstrated the effectiveness of aquaponics in diverse environments'
  }
];

// Media quotes
const mediaQuotes = [
  {
    quote: "Dr. Singh's methodology represents a breakthrough in urban environmental management, combining scientific rigor with practical application.",
    source: "The Week Magazine",
    journalist: "Environmental Correspondent"
  },
  {
    quote: "What started as a family's health crisis has evolved into a scalable solution for one of India's most pressing environmental challenges.",
    source: "CNN-News18",
    journalist: "Prime Time Documentary"
  },
  {
    quote: "The international community is taking notice of this innovative approach to air quality management emerging from Delhi.",
    source: "Telegraph London",
    journalist: "International Affairs Desk"
  }
];

export default function RecognitionPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('media');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getColorClasses = (color: string) => {
    const colors = {
      yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      orange: 'text-orange-600 bg-orange-50 border-orange-200',
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getMediaTypeIcon = (type: string) => {
    switch (type) {
      case 'Television':
        return Tv;
      case 'Print':
        return Newspaper;
      case 'Digital':
        return Globe;
      case 'Radio':
        return Radio;
      default:
        return Newspaper;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-2 text-purple-700 border-purple-200">
                <Award className="w-4 h-4 mr-2" />
                Third-Party Validation
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                Media Coverage &{' '}
                <span className="text-purple-700">Recognition</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our pioneering work in sustainable agriculture and air quality improvement has been recognized
                by leading media outlets, government institutions, and industry organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="media" onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="media">Media Coverage</TabsTrigger>
                <TabsTrigger value="government">Government Recognition</TabsTrigger>
                <TabsTrigger value="industry">Industry Achievements</TabsTrigger>
              </TabsList>

              {/* Media Coverage Tab */}
              <TabsContent value="media" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Featured in Leading Media
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Our work has been featured in prominent national and international media outlets,
                    highlighting the impact and innovation of our sustainable living solutions.
                  </p>
                </div>

                {/* Indian Media Coverage */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Flag className="w-5 h-5 text-orange-600" />
                    Indian Coverage
                  </h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {mediaCoverage.indian.map((media, index) => {
                      const MediaIcon = getMediaTypeIcon(media.type);
                      return (
                        <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                <MediaIcon className="w-6 h-6 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-bold text-gray-900">{media.outlet}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    {media.type}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{media.date}</p>
                              </div>
                            </div>
                            
                            <h5 className="font-semibold text-gray-900 mb-2 leading-tight">
                              {media.headline}
                            </h5>
                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                              {media.description}
                            </p>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full group-hover:bg-blue-50 group-hover:border-blue-300"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Read Coverage
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* International Media Coverage */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    International Recognition
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {mediaCoverage.international.map((media, index) => {
                      const MediaIcon = getMediaTypeIcon(media.type);
                      return (
                        <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                                <MediaIcon className="w-6 h-6 text-purple-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-bold text-gray-900">{media.outlet}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    {media.type}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{media.date}</p>
                              </div>
                            </div>
                            
                            <h5 className="font-semibold text-gray-900 mb-2 leading-tight">
                              {media.headline}
                            </h5>
                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                              {media.description}
                            </p>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full group-hover:bg-purple-50 group-hover:border-purple-300"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Read Coverage
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Media Quotes */}
                <div className="bg-gray-50 p-8 rounded-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">
                    What Media Leaders Are Saying
                  </h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    {mediaQuotes.map((quote, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg border">
                        <Quote className="w-6 h-6 text-blue-600 mb-3" />
                        <blockquote className="text-gray-700 italic mb-4">
                          "{quote.quote}"
                        </blockquote>
                        <div className="text-sm">
                          <p className="font-semibold text-gray-900">{quote.source}</p>
                          <p className="text-gray-600">{quote.journalist}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Government Recognition Tab */}
              <TabsContent value="government" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Government Awards & Recognition
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Our work has been recognized by various government institutions for its contribution
                    to sustainable agriculture, environmental improvement, and community development.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {governmentRecognition.map((recognition, index) => {
                    const Icon = recognition.icon;
                    return (
                      <Card key={index} className={`hover:shadow-lg transition-all duration-300 ${getColorClasses(recognition.color)}`}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(recognition.color)}`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-gray-900 text-white">
                                  {recognition.year}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {recognition.authority}
                                </Badge>
                              </div>
                              <h4 className="font-bold text-gray-900 mb-2 leading-tight">
                                {recognition.title}
                              </h4>
                              <p className="text-sm text-gray-700 leading-relaxed">
                                {recognition.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Recognition Summary */}
                <div className="mt-12">
                  <Card className="p-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                    <div className="text-center">
                      <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Recognition Timeline
                      </h3>
                      <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
                        From pioneering beekeeping innovations in 1988 to becoming a resource person for the Ministry of Agriculture, 
                        our founders have consistently received recognition for their contributions to sustainable agriculture and 
                        environmental innovation.
                      </p>
                      <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-yellow-700">36 Years</div>
                          <p className="text-sm text-gray-600">Government Recognition</p>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-orange-700">9 Outlets</div>
                          <p className="text-sm text-gray-600">Media Coverage</p>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-700">3 Countries</div>
                          <p className="text-sm text-gray-600">Global Recognition</p>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-700">4 Awards</div>
                          <p className="text-sm text-gray-600">Government Honors</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              {/* Industry Achievements Tab */}
              <TabsContent value="industry" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Industry Achievements & Milestones
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Our journey of innovation and impact in sustainable agriculture spans over four decades,
                    with significant achievements and industry firsts.
                  </p>
                </div>

                <div className="space-y-6">
                  {industryAchievements.map((achievement, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                          <div className="md:w-1/4">
                            <Badge className="bg-blue-700 text-white px-4 py-2">
                              <Calendar className="w-4 h-4 mr-2" />
                              {achievement.year}
                            </Badge>
                          </div>
                          <div className="md:w-3/4">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">
                              {achievement.title}
                            </h4>
                            <p className="text-gray-600 mb-3">
                              {achievement.description}
                            </p>
                            <Badge variant="outline" className="text-green-700 border-green-200">
                              Impact: {achievement.impact}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Student Success Metrics */}
                <div className="mt-12">
                  <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                    <div className="text-center">
                      <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Student Success Metrics
                      </h3>
                      <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
                        Our teaching methodology has created measurable impact across hundreds of implementations,
                        with consistent results in air quality improvement and income generation.
                      </p>
                      <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-700">750+</div>
                          <p className="text-sm text-gray-600">Farmers Trained</p>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-700">94.6%</div>
                          <p className="text-sm text-gray-600">Average AQI Improvement</p>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-700">₹18.5K</div>
                          <p className="text-sm text-gray-600">Average Monthly Income</p>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-orange-700">87.3%</div>
                          <p className="text-sm text-gray-600">Success Rate</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Publications & Research
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our work is backed by rigorous research and documented in peer-reviewed publications,
                establishing the scientific foundation of our methodology.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-blue-100 text-blue-800">
                    Research Paper
                  </Badge>
                  <h3 className="font-bold text-gray-900 mb-2">
                    "Aquaponics as an Urban Air Purification Strategy: A Delhi Case Study"
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Published in the International Journal of Environmental Science, this peer-reviewed paper
                    documents the methodology and results of our Delhi implementation.
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">2022</span>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-green-100 text-green-800">
                    Technical Report
                  </Badge>
                  <h3 className="font-bold text-gray-900 mb-2">
                    "Quantitative Analysis of Plant-Based Air Purification in Urban Environments"
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Comprehensive technical report documenting the specific mechanisms and efficiency
                    of our plant selection and placement methodology.
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">2023</span>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-purple-100 text-purple-800">
                    Case Study
                  </Badge>
                  <h3 className="font-bold text-gray-900 mb-2">
                    "Economic Viability of Urban Aquaponics: Income Generation Analysis"
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Detailed case study analyzing the economic aspects of our methodology,
                    including ROI calculations and long-term financial sustainability.
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">2024</span>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Media Appearances */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Media Appearances & Interviews
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Watch and listen to Dr. Peter Singh and Neeno Kaur discuss their journey and methodology
                in these featured media appearances.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="CNN-News18 Interview"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                      <Play className="w-5 h-5 mr-2" />
                      Watch Interview
                    </Button>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                    <Tv className="w-3 h-3 mr-1" />
                    CNN-News18
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">Prime Time Interview with Dr. Singh</h3>
                  <p className="text-sm text-gray-600 mb-2">In-depth discussion of aquaponics methodology and results</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Duration: 18:45</span>
                    <span>March 2023</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="NDTV Documentary"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                      <Play className="w-5 h-5 mr-2" />
                      Watch Documentary
                    </Button>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                    <Tv className="w-3 h-3 mr-1" />
                    NDTV
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">Special Documentary: From Crisis to Solution</h3>
                  <p className="text-sm text-gray-600 mb-2">The complete journey from health crisis to environmental innovation</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Duration: 45:12</span>
                    <span>June 2023</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="German TV Feature"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                      <Play className="w-5 h-5 mr-2" />
                      Watch Feature
                    </Button>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-yellow-600 text-white">
                    <Globe className="w-3 h-3 mr-1" />
                    German TV
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">Weltspiegel International Feature</h3>
                  <p className="text-sm text-gray-600 mb-2">German public television spotlight on innovative environmental solutions</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Duration: 12:35</span>
                    <span>November 2023</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Press Kit & Media Resources
                </h2>
                <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
                  Download our comprehensive press kit containing high-resolution images, fact sheets,
                  founder biographies, and detailed information about our methodology and results.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-white">
                    <CardContent className="p-6 text-center">
                      <Download className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">Press Release</h3>
                      <p className="text-sm text-gray-600 mb-4">Latest announcements and news</p>
                      <Button variant="outline" size="sm">
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white">
                    <CardContent className="p-6 text-center">
                      <Download className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">Media Kit</h3>
                      <p className="text-sm text-gray-600 mb-4">High-resolution images and logos</p>
                      <Button variant="outline" size="sm">
                        Download ZIP
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white">
                    <CardContent className="p-6 text-center">
                      <Download className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">Fact Sheet</h3>
                      <p className="text-sm text-gray-600 mb-4">Key statistics and achievements</p>
                      <Button variant="outline" size="sm">
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-purple-700 hover:bg-purple-800">
                    <Download className="w-5 h-5 mr-2" />
                    Download Complete Press Kit
                  </Button>
                  <Button variant="outline" size="lg">
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Media Relations
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Expert Endorsements
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Industry experts and academic leaders validate our methodology and results.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Dr. Rajesh Mehta"
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">Dr. Rajesh Mehta</h4>
                      <p className="text-sm text-gray-600">Agricultural Scientist, ICAR</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic mb-4">
                    "Dr. Peter Singh's work represents a paradigm shift in urban agriculture. His systematic approach to combining air quality improvement with income generation is revolutionary."
                  </blockquote>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Priya Sharma"
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">Priya Sharma</h4>
                      <p className="text-sm text-gray-600">Trained Farmer, Delhi</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic mb-4">
                    "Neeno Kaur's personal journey inspired me to transform my own health. The organic farming techniques she taught have changed my family's life completely."
                  </blockquote>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Prof. Anita Gupta"
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">Prof. Anita Gupta</h4>
                      <p className="text-sm text-gray-600">Environmental Science, DU</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic mb-4">
                    "Their research methodology is impeccable. The combination of scientific rigor with practical application makes their work truly impactful."
                  </blockquote>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Experience Our Award-Winning Methodology
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Join 750+ families who have transformed their lives through our scientifically-proven 
              and widely recognized aquaponics methodology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                Book a Site Visit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Explore Our Courses
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
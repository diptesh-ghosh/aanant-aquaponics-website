'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Quote, 
  MapPin, 
  TrendingUp,
  Wind,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Play,
  Users,
  Trophy,
  Home,
  Award,
  Target,
  Leaf,
  Building,
  Coffee,
  CheckCircle
} from 'lucide-react';

const featuredTestimonial = {
  id: 'featured',
  name: 'Jahnavi Prasada',
  role: 'Resort Owner & Entrepreneur',
  businesses: ['Abbotsford Resort', 'Cafe Chica'],
  location: 'Goa',
  quote: "Dr. Peter Singh's aquaponics methodology has completely transformed our resort's sustainability profile. We've achieved consistent AQI levels of 12-15 throughout our property while generating ₹45,000 monthly revenue from our organic produce sales. Our guests are amazed by the pristine air quality and fresh, chemical-free food. This isn't just farming - it's a complete lifestyle transformation that has elevated our business to new heights.",
  image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
  businessImage: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
  beforeAQI: 89,
  afterAQI: 13,
  monthlyRevenue: 45000,
  timeframe: '8 months',
  rating: 5,
  verified: true,
  achievements: [
    'Reduced resort AQI from 89 to 13',
    'Generated ₹45,000 monthly organic revenue',
    'Achieved 100% guest satisfaction on air quality',
    'Eliminated need for air purification systems',
    'Created sustainable food supply for restaurant'
  ]
};

const keyAchievements = [
  {
    id: 'farmers-trained',
    title: '750+ Farmers Trained',
    subtitle: 'Ongoing Training Programs',
    description: 'Comprehensive aquaponics education across Punjab and Delhi NCR',
    icon: Users,
    value: '750+',
    location: 'Punjab & Delhi NCR',
    color: 'blue',
    stats: [
      { label: 'Success Rate', value: '94.6%' },
      { label: 'Avg Income Increase', value: '₹18,500' },
      { label: 'AQI Improvement', value: '89.4%' }
    ],
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'competition-wins',
    title: '3-Time Champions',
    subtitle: 'Goa Organic Garden Competition',
    description: 'Consecutive victories demonstrating superior aquaponics methodology',
    icon: Trophy,
    value: '3x',
    location: 'Goa State Competition',
    color: 'yellow',
    stats: [
      { label: '2022 Winner', value: 'Gold Medal' },
      { label: '2023 Winner', value: 'Gold Medal' },
      { label: '2024 Winner', value: 'Gold Medal' }
    ],
    image: 'https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'student-success',
    title: 'Student Success Stories',
    subtitle: 'Part-time Income Generator',
    description: 'Home-based systems generating substantial monthly income',
    icon: Home,
    value: '₹15,000+',
    location: 'Monthly Income Average',
    color: 'green',
    stats: [
      { label: 'Average Monthly', value: '₹15,000+' },
      { label: 'Top Earners', value: '₹35,000+' },
      { label: 'Success Rate', value: '87.3%' }
    ],
    image: 'https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const additionalTestimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Software Engineer',
    location: 'Gurgaon',
    beforeAQI: 267,
    afterAQI: 18,
    monthlyIncome: 15000,
    timeframe: '6 months',
    rating: 5,
    quote: "My son's asthma completely disappeared within 6 months. The AQI in our home went from 250+ to consistently under 20. Plus, we're earning ₹15,000 monthly from plant sales.",
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Homemaker & Entrepreneur',
    location: 'Delhi',
    beforeAQI: 298,
    afterAQI: 16,
    monthlyIncome: 22000,
    timeframe: '8 months',
    rating: 5,
    quote: "I was skeptical at first, but the results speak for themselves. Our home's air quality is now better than most hill stations. The business side exceeded my expectations!",
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    verified: true
  },
  {
    id: 3,
    name: 'Jyothsna Singh',
    role: 'Business Owner',
    location: 'Lucknow',
    beforeAQI: 220,
    afterAQI: 18,
    monthlyIncome: 12000,
    timeframe: '3 months',
    rating: 5,
    quote: "The transformation of our garden has been incredible. Not only do we have pristine air quality, but our fruit trees are thriving like never before. The system is so well integrated that visitors don't even realize it's there until we point it out.",
    image: '/image copy.png',
    verified: true
  }
];

const videoTestimonials = [
  {
    id: 'video-1',
    title: 'Jahnavi\'s Resort Transformation',
    duration: '2:45',
    thumbnail: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Complete walkthrough of Abbotsford Resort\'s aquaponics system'
  },
  {
    id: 'video-2',
    title: 'Family Health Transformation',
    duration: '1:30',
    thumbnail: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Rajesh Kumar shares his family\'s health journey'
  },
  {
    id: 'video-3',
    title: 'Jyothsna\'s Lucknow Garden',
    duration: '2:15',
    thumbnail: '/image copy.png',
    description: 'Daughter\'s residence transformation with fruit tree integration'
  }
];

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeAchievement, setActiveAchievement] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('testimonials-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentTestimonial(prev => (prev + 1) % additionalTestimonials.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % additionalTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + additionalTestimonials.length) % additionalTestimonials.length);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 text-white',
      yellow: 'from-yellow-500 to-yellow-600 text-white',
      green: 'from-green-500 to-green-600 text-white'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getBgColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200',
      yellow: 'bg-yellow-50 border-yellow-200',
      green: 'bg-green-50 border-green-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="testimonials-section" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Badge variant="outline" className="mb-4 px-4 py-2 text-green-700 border-green-200">
              <Star className="w-4 h-4 mr-2" />
              Impact Stories
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              Real Transformations from{' '}
              <span className="text-green-700">Aquaponics Farming</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover how our scientifically-proven aquaponics methods have transformed lives, 
              businesses, and communities across India.
            </p>
          </div>

          {/* Featured Testimonial - Jahnavi Prasada */}
          <div className={`mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="overflow-hidden shadow-2xl bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Content Side */}
                <div className="p-8 lg:p-12">
                  {/* Decorative Quote Mark */}
                  <div className="relative mb-8">
                    <Quote className="w-16 h-16 text-green-200 absolute -top-4 -left-2" />
                    <div className="relative z-10">
                      <Badge className="bg-green-700 text-white mb-4">
                        <Award className="w-4 h-4 mr-2" />
                        FEATURED SUCCESS STORY
                      </Badge>
                    </div>
                  </div>

                  {/* Profile */}
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={featuredTestimonial.image}
                      alt={featuredTestimonial.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {featuredTestimonial.name}
                      </h3>
                      <p className="text-green-700 font-medium mb-1">
                        {featuredTestimonial.role}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Building className="w-4 h-4" />
                        <span>{featuredTestimonial.businesses.join(' • ')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{featuredTestimonial.location}</span>
                        {featuredTestimonial.verified && (
                          <Badge variant="outline" className="text-green-700 border-green-200 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(featuredTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                    <span className="ml-2 text-gray-600 text-sm">
                      ({featuredTestimonial.rating}.0 rating)
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg text-gray-700 italic leading-relaxed mb-8 relative">
                    "{featuredTestimonial.quote}"
                  </blockquote>

                  {/* Key Achievements */}
                  <div className="space-y-3 mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">Key Achievements:</h4>
                    {featuredTestimonial.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg border">
                      <Wind className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-600 mb-1">AQI Improvement</div>
                      <div className="font-bold text-blue-700">
                        {featuredTestimonial.beforeAQI} → {featuredTestimonial.afterAQI}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border">
                      <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-600 mb-1">Monthly Revenue</div>
                      <div className="font-bold text-green-700">
                        ₹{featuredTestimonial.monthlyRevenue.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border">
                      <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-600 mb-1">Timeframe</div>
                      <div className="font-bold text-purple-700">
                        {featuredTestimonial.timeframe}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Image Side */}
                <div className="relative">
                  <img
                    src={featuredTestimonial.businessImage}
                    alt="Abbotsford Resort"
                    className="w-full h-full object-cover min-h-[600px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  
                  {/* Business Info Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Coffee className="w-6 h-6 text-green-600" />
                        <div>
                          <h4 className="font-bold text-gray-900">Abbotsford Resort & Cafe Chica</h4>
                          <p className="text-sm text-gray-600">Sustainable Hospitality Business</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Property AQI:</span>
                          <span className="font-bold text-green-600 ml-2">12-15</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Guest Satisfaction:</span>
                          <span className="font-bold text-blue-600 ml-2">100%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Play Button */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full w-20 h-20">
                      <Play className="w-8 h-8 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Key Achievements Section */}
          <div className={`mb-20 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Our Impact Across India
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Measurable results from our comprehensive aquaponics training and implementation programs
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {keyAchievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card 
                    key={achievement.id} 
                    className={`hover:shadow-xl transition-all duration-300 ${getBgColorClasses(achievement.color)} border-2`}
                  >
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getColorClasses(achievement.color)} flex items-center justify-center`}>
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Badge className="bg-white/90 text-gray-900">
                          <MapPin className="w-3 h-3 mr-1" />
                          {achievement.location}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Main Value */}
                      <div className="text-center mb-6">
                        <div className="text-4xl font-bold text-gray-900 mb-2">
                          {achievement.value}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-1">
                          {achievement.title}
                        </h4>
                        <p className="text-sm font-medium text-gray-600 mb-3">
                          {achievement.subtitle}
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="space-y-3">
                        {achievement.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                            <span className="text-sm text-gray-600">{stat.label}:</span>
                            <span className="font-bold text-gray-900">{stat.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="mt-6">
                        <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                          <Award className="w-4 h-4 mr-2" />
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Video Testimonials */}
          <div className={`mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Watch Success Stories
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear directly from our students and partners about their transformation journey
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {videoTestimonials.map((video) => (
                <Card key={video.id} className="hover:shadow-lg transition-all duration-300 group">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full">
                        <Play className="w-6 h-6 ml-1" />
                      </Button>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-black/60 text-white">
                        {video.duration}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{video.title}</h4>
                    <p className="text-sm text-gray-600">{video.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Testimonials Carousel */}
          <div className={`mb-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                More Success Stories
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join hundreds of families who have transformed their lives through aquaponics
              </p>
            </div>

            {/* Featured Testimonial */}
            <Card className="p-8 bg-white shadow-xl mb-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={additionalTestimonials[currentTestimonial].image}
                      alt={additionalTestimonials[currentTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-green-200"
                    />
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        {additionalTestimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-green-700 font-medium">
                        {additionalTestimonials[currentTestimonial].role}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{additionalTestimonials[currentTestimonial].location}</span>
                        {additionalTestimonials[currentTestimonial].verified && (
                          <Badge variant="outline" className="text-green-700 border-green-200 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(additionalTestimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-lg text-gray-700 italic mb-6">
                    "{additionalTestimonials[currentTestimonial].quote}"
                  </blockquote>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Wind className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600 mb-1">AQI Change</div>
                    <div className="font-bold text-blue-700">
                      {additionalTestimonials[currentTestimonial].beforeAQI} → {additionalTestimonials[currentTestimonial].afterAQI}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600 mb-1">Monthly Income</div>
                    <div className="font-bold text-green-700">
                      ₹{additionalTestimonials[currentTestimonial].monthlyIncome.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600 mb-1">Timeframe</div>
                    <div className="font-bold text-purple-700">
                      {additionalTestimonials[currentTestimonial].timeframe}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex gap-2">
                {additionalTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className={`text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <h3 className="text-2xl font-bold mb-6 text-green-800">
                Join Our Growing Community of Success Stories
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">750+</div>
                  <p className="text-sm text-green-600">Successful Graduates</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-700">94%</div>
                  <p className="text-sm text-blue-600">Satisfaction Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-700">89%</div>
                  <p className="text-sm text-purple-600">Average AQI Improvement</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-700">₹18.5K</div>
                  <p className="text-sm text-orange-600">Average Monthly Income</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
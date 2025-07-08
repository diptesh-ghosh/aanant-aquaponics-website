'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Users, Award, TrendingUp, BookOpen, MapPin } from 'lucide-react';

const credentials = [
  {
    title: 'Agricultural Sciences PhD',
    institution: 'Delhi University',
    year: '1995',
    description: 'Specialized in sustainable farming and environmental agriculture'
  },
  {
    title: 'Aquaponics Research Fellow',
    institution: 'Indian Agricultural Research Institute',
    year: '2000-2005',
    description: 'Published 12 research papers on soil-less farming techniques'
  },
  {
    title: 'Environmental Health Certification',
    institution: 'World Health Organization',
    year: '2010',
    description: 'Certified in air quality monitoring and health impact assessment'
  }
];

const achievements = [
  {
    metric: '750+',
    label: 'Successful Farmer Implementations',
    description: 'Families now breathing clean air',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    metric: '₹2.5L',
    label: 'Monthly Revenue',
    description: 'From sustainable plant sales',
    icon: TrendingUp,
    color: 'text-green-600'
  },
  {
    metric: '94.6%',
    label: 'Air Quality Improvement',
    description: 'Consistent across all installations',
    icon: Award,
    color: 'text-purple-600'
  },
  {
    metric: '15 AQI',
    label: 'Maintained for 12+ Months',
    description: 'Proven long-term effectiveness',
    icon: Star,
    color: 'text-yellow-600'
  }
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    location: 'Gurgaon',
    quote: 'My son\'s asthma disappeared within 6 months. AQI in our home went from 250+ to 18.',
    beforeAQI: '267',
    afterAQI: '18',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Priya Sharma',
    location: 'Delhi',
    quote: 'Dr. Singh\'s method saved our family. We can finally breathe freely at home.',
    beforeAQI: '298',
    afterAQI: '16',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Jyothsna Singh',
    location: 'Lucknow',
    quote: 'The transformation of our garden has been incredible. Our fruit trees are thriving like never before.',
    beforeAQI: '220',
    afterAQI: '18',
    image: '/image copy.png'
  }
];

export function CredibilitySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'credentials' | 'achievements' | 'testimonials'>('credentials');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('credibility-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="credibility-section" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Badge variant="outline" className="mb-4 px-4 py-2 text-green-700 border-green-200">
              <Award className="w-4 h-4 mr-2" />
              Scientific Credibility
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              Meet{' '}
              <span className="text-green-700">Dr. Peter Singh</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              26 years of dedicated research, 750+ successful implementations, and government recognition. 
              Our solution is backed by science, proven by results, and validated by real families breathing clean air.
            </p>
          </div>

          {/* Dr. Peter Singh Profile */}
          <div className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-200">
                    <img
                      src="/image.png"
                      alt="Dr. Peter Singh"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Peter Singh</h3>
                  <p className="text-green-700 font-medium">Agricultural Sciences PhD</p>
                  <p className="text-sm text-gray-600">Environmental Health Specialist</p>
                </div>
                <div className="md:col-span-2">
                  <blockquote className="text-lg text-gray-700 italic mb-4">
                    "What began as a desperate search for clean air for my family has become a mission to help 
                    every family in Delhi breathe freely. Science gave us the solution, persistence made it scalable."
                  </blockquote>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-green-700">26 Years</div>
                      <p className="text-sm text-gray-600">Research Experience</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-700">12 Papers</div>
                      <p className="text-sm text-gray-600">Published Research</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Tab Navigation */}
          <div className={`flex justify-center mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={activeTab === 'credentials' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('credentials')}
                className="rounded-md"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Credentials
              </Button>
              <Button
                variant={activeTab === 'achievements' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('achievements')}
                className="rounded-md"
              >
                <Award className="w-4 h-4 mr-2" />
                Achievements
              </Button>
              <Button
                variant={activeTab === 'testimonials' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('testimonials')}
                className="rounded-md"
              >
                <Users className="w-4 h-4 mr-2" />
                Success Stories
              </Button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {/* Credentials Tab */}
            {activeTab === 'credentials' && (
              <div className={`grid md:grid-cols-3 gap-6 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {credentials.map((credential, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-700">{credential.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium text-gray-900 mb-2">{credential.institution}</p>
                      <Badge variant="outline" className="mb-3">{credential.year}</Badge>
                      <p className="text-sm text-gray-600">{credential.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300">
                      <Icon className={`w-8 h-8 mx-auto mb-4 ${achievement.color}`} />
                      <div className={`text-3xl font-bold mb-2 ${achievement.color}`}>
                        {achievement.metric}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{achievement.label}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <div className={`grid md:grid-cols-3 gap-6 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                      <blockquote className="text-gray-700 italic mb-4">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex justify-between items-center text-sm">
                        <div className="text-red-600">
                          Before: {testimonial.beforeAQI} AQI
                        </div>
                        <div className="text-green-600">
                          After: {testimonial.afterAQI} AQI
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Government Recognition */}
          <div className={`mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <div className="text-center">
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Government Recognition</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Our aquaponics methodology has been acknowledged by the Delhi Pollution Control Committee 
                  and featured in the Ministry of Agriculture's sustainable farming initiatives.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Badge variant="outline" className="mb-2 px-4 py-2 text-blue-700 border-blue-200">
                      Delhi Pollution Control Committee
                    </Badge>
                    <p className="text-sm text-gray-600">
                      Recognized as innovative air quality improvement solution
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2 px-4 py-2 text-purple-700 border-purple-200">
                      Ministry of Agriculture
                    </Badge>
                    <p className="text-sm text-gray-600">
                      Featured in sustainable urban farming initiatives
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
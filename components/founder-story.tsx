'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Award, 
  BookOpen, 
  Users,
  Heart,
  Microscope,
  TrendingUp,
  Play
} from 'lucide-react';

const timeline = [
  {
    year: '1998',
    title: 'The Health Crisis',
    description: 'Dr. Peter Singh and Neeno faced severe respiratory issues in Delhi',
    impact: 'AQI 400+ daily exposure',
    image: 'https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    year: '2009',
    title: 'First Breakthrough',
    description: 'Implemented first aquaponics system after 11 years of research',
    impact: '60% air quality improvement',
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    year: '2015',
    title: 'Community Impact',
    description: 'Started sharing methods with local families',
    impact: '20 families transformed',
    image: 'https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    year: '2024',
    title: 'Academy Launch',
    description: 'Launched comprehensive education platform',
    impact: '750+ successful graduates',
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const credentials = [
  {
    title: 'PhD in Agricultural Sciences',
    institution: 'Delhi University',
    year: '1995',
    icon: BookOpen
  },
  {
    title: 'Environmental Health Certification',
    institution: 'World Health Organization',
    year: '2010',
    icon: Heart
  },
  {
    title: 'Research Publications',
    institution: '12 Peer-Reviewed Papers',
    year: '2000-2020',
    icon: Microscope
  },
  {
    title: 'Government Recognition',
    institution: 'Delhi Pollution Control Committee',
    year: '2022',
    icon: Award
  }
];

export function FounderStory() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('founder-story');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setSelectedYear(prev => (prev + 1) % timeline.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const handleScheduleConsultation = () => {
    window.location.href = '/services';
  };

  return (
    <section id="founder-story" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Badge variant="outline" className="mb-4 px-4 py-2 text-green-700 border-green-200">
              <Calendar className="w-4 h-4 mr-2" />
              Founder's Journey
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              From Crisis to{' '}
              <span className="text-green-700">Scientific Solution</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet Dr. Peter Singh, whose personal health crisis became the catalyst for a 
              revolutionary approach to clean air that's now helping thousands of families.
            </p>
          </div>

          {/* Founder Profile */}
          <div className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-green-200">
                    <img
                      src="/image.png"
                      alt="Dr. Peter Singh"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. Peter Singh</h3>
                  <p className="text-green-700 font-medium mb-2">Founder & Chief Scientist</p>
                  <p className="text-sm text-gray-600">Agricultural Sciences PhD</p>
                </div>
                
                <div className="md:col-span-2 space-y-6">
                  <blockquote className="text-xl text-gray-700 italic">
                    "What began as a desperate search for clean air for my family has become 
                    a mission to help every family in Delhi breathe freely. Science gave us 
                    the solution, persistence made it scalable."
                  </blockquote>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-white rounded-lg border">
                      <div className="text-3xl font-bold text-green-700">26</div>
                      <p className="text-sm text-gray-600">Years Research</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border">
                      <div className="text-3xl font-bold text-blue-700">750+</div>
                      <p className="text-sm text-gray-600">Lives Transformed</p>
                    </div>
                  </div>

                  <Button 
                    className="bg-green-700 hover:bg-green-800 text-white"
                    onClick={handleScheduleConsultation}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Watch Dr. Singh's Story
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Timeline */}
          <div className={`mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                26-Year Journey of Innovation
              </h3>
              <p className="text-gray-600">
                From personal crisis to scientific breakthrough
              </p>
            </div>

            {/* Timeline Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {timeline.map((item, index) => (
                  <Button
                    key={index}
                    variant={selectedYear === index ? 'default' : 'ghost'}
                    onClick={() => setSelectedYear(index)}
                    className="rounded-md"
                    size="sm"
                  >
                    {item.year}
                  </Button>
                ))}
              </div>
            </div>

            {/* Timeline Content */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center gap-4 mb-2">
                      <Badge className="bg-green-700 text-white text-lg px-4 py-2">
                        {timeline[selectedYear].year}
                      </Badge>
                      <Badge variant="outline" className="text-blue-700 border-blue-200">
                        {timeline[selectedYear].impact}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl text-gray-900">
                      {timeline[selectedYear].title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      {timeline[selectedYear].description}
                    </p>
                    
                    {/* Progress Indicator */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Journey Progress</span>
                        <span className="font-medium">
                          {Math.round(((selectedYear + 1) / timeline.length) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={((selectedYear + 1) / timeline.length) * 100} 
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative overflow-hidden rounded-lg shadow-xl">
                  <img
                    src={timeline[selectedYear].image}
                    alt={timeline[selectedYear].title}
                    className="w-full h-80 object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Scientific Credentials & Recognition
              </h3>
              <p className="text-gray-600">
                Backed by decades of research and institutional recognition
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {credentials.map((credential, index) => {
                const Icon = credential.icon;
                return (
                  <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{credential.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{credential.institution}</p>
                    <Badge variant="outline" className="text-xs">
                      {credential.year}
                    </Badge>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Media Recognition */}
          <div className={`mt-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Featured in Leading Media
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 bg-white rounded-lg border">
                    <div className="text-lg font-bold text-blue-700 mb-2">CNN-News18</div>
                    <p className="text-sm text-gray-600">
                      "Revolutionary approach to Delhi's air pollution crisis"
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <div className="text-lg font-bold text-green-700 mb-2">NDTV</div>
                    <p className="text-sm text-gray-600">
                      "Scientist's personal journey becomes public solution"
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <div className="text-lg font-bold text-purple-700 mb-2">The Week</div>
                    <p className="text-sm text-gray-600">
                      "Aquaponics: The future of urban air purification"
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
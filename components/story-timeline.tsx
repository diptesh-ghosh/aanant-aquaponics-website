'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Heart, Scaling as Seedling, Trophy, Users } from 'lucide-react';

const timelineEvents = [
  {
    year: '1998',
    title: 'The Health Crisis Discovery',
    description: 'Dr. Peter Singh and Neeno faced severe respiratory issues in Delhi. Medical reports showed lung damage equivalent to smoking 44 cigarettes daily.',
    icon: Heart,
    color: 'red',
    stats: 'AQI 400+ regularly',
    image: 'https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    year: '2009',
    title: 'Aquaponics Implementation',
    description: 'After 11 years of research, implemented the first aquaponics system. Initial results showed 60% improvement in indoor air quality within 3 months.',
    icon: Seedling,
    color: 'blue',
    stats: 'AQI reduced to 120',
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    year: '2015',
    title: 'First Success Milestone',
    description: 'Achieved consistent AQI below 50. Started documenting methods and sharing with local community. First 20 families adopted the system.',
    icon: Trophy,
    color: 'yellow',
    stats: 'AQI 35-45 range',
    image: 'https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    year: '2020',
    title: 'Scaling the Solution',
    description: 'COVID-19 highlighted importance of clean air. Trained 200+ farmers, established supply chain, and documented health improvements.',
    icon: Users,
    color: 'purple',
    stats: '200+ systems installed',
    image: 'https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    year: '2024',
    title: 'AQI 15 Achievement',
    description: 'Consistent AQI 15 maintained for 12+ months. 750+ successful implementations across Delhi NCR. Monthly revenue of ₹2.5L from plant sales.',
    icon: Trophy,
    color: 'green',
    stats: 'AQI 15 consistently',
    image: 'https://images.pexels.com/photos/4503274/pexels-photo-4503274.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export function StoryTimeline() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    timelineEvents.forEach((_, index) => {
      const element = document.getElementById(`timeline-${index}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'bg-red-100 text-red-700 border-red-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      green: 'bg-green-100 text-green-700 border-green-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColor = (color: string) => {
    const colors = {
      red: 'text-red-600',
      blue: 'text-blue-600',
      yellow: 'text-yellow-600',
      purple: 'text-purple-600',
      green: 'text-green-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-green-700 border-green-200">
              <Calendar className="w-4 h-4 mr-2" />
              Our Journey
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              26 Years of{' '}
              <span className="text-green-700">Scientific Innovation</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From a health crisis to a revolutionary solution that's transforming lives across Delhi. 
              Here's our documented journey of turning desperation into hope.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gray-200 via-green-200 to-green-400 hidden md:block"></div>

            <div className="space-y-16">
              {timelineEvents.map((event, index) => {
                const Icon = event.icon;
                const isVisible = visibleItems.includes(index);
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    id={`timeline-${index}`}
                    data-index={index}
                    className={`relative transition-all duration-1000 ${
                      isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isEven ? '-translate-x-8' : 'translate-x-8'}`
                    }`}
                  >
                    {/* Timeline Point */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border-4 border-green-400 rounded-full flex items-center justify-center z-10 hidden md:flex">
                      <Icon className={`w-6 h-6 ${getIconColor(event.color)}`} />
                    </div>

                    {/* Content Card */}
                    <div className={`grid md:grid-cols-2 gap-8 items-center ${isEven ? '' : 'md:direction-rtl'}`}>
                      {/* Text Content */}
                      <div className={`${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                        <Card className={`p-6 ${getColorClasses(event.color)} hover:shadow-xl transition-all duration-300`}>
                          <CardContent className="p-0">
                            <div className="flex items-center gap-3 mb-4 md:hidden">
                              <Icon className={`w-6 h-6 ${getIconColor(event.color)}`} />
                              <Badge variant="secondary" className="text-lg font-bold">
                                {event.year}
                              </Badge>
                            </div>
                            <Badge variant="secondary" className="text-lg font-bold mb-4 hidden md:inline-block">
                              {event.year}
                            </Badge>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">
                              {event.title}
                            </h3>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                              {event.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-sm">
                                {event.stats}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Image */}
                      <div className={`${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
                        <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Impact Summary */}
          <div className={`mt-20 text-center transition-all duration-1000 ${
            visibleItems.length > 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  The Result: A Proven, Scalable Solution
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  What started as a personal health crisis has become a scientifically-validated method 
                  that's helping hundreds of families breathe clean air in one of the world's most polluted cities.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-green-700">94.6%</div>
                    <p className="text-sm text-gray-600">Air Quality Improvement</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-700">750+</div>
                    <p className="text-sm text-gray-600">Successful Implementations</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-700">26 Years</div>
                    <p className="text-sm text-gray-600">Of Scientific Research</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
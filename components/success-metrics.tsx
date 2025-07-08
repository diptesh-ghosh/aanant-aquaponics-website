'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  Award, 
  DollarSign,
  Wind,
  Heart,
  Leaf,
  BarChart3
} from 'lucide-react';

const metrics = [
  {
    title: 'Course Completion Rate',
    value: 87,
    target: 50,
    unit: '%',
    icon: Award,
    color: 'green',
    description: 'Students who complete their courses'
  },
  {
    title: 'Student Satisfaction',
    value: 94,
    target: 80,
    unit: '%',
    icon: Heart,
    color: 'red',
    description: 'Average satisfaction rating'
  },
  {
    title: 'Average AQI Improvement',
    value: 89,
    target: 60,
    unit: '%',
    icon: Wind,
    color: 'blue',
    description: 'Air quality improvement achieved'
  },
  {
    title: 'Monthly Income Generated',
    value: 18500,
    target: 10000,
    unit: '₹',
    icon: DollarSign,
    color: 'yellow',
    description: 'Average student monthly earnings'
  }
];

const successStories = [
  {
    name: 'Rajesh Kumar',
    location: 'Gurgaon',
    beforeAQI: 267,
    afterAQI: 18,
    monthlyIncome: 15000,
    timeframe: '6 months',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Priya Sharma',
    location: 'Delhi',
    beforeAQI: 298,
    afterAQI: 16,
    monthlyIncome: 22000,
    timeframe: '8 months',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Mohammed Ali',
    location: 'Noida',
    beforeAQI: 245,
    afterAQI: 14,
    monthlyIncome: 18500,
    timeframe: '5 months',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export function SuccessMetrics() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate metrics
          metrics.forEach((metric, index) => {
            const duration = 2000;
            const steps = 60;
            const increment = metric.value / steps;
            let current = 0;
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= metric.value) {
                current = metric.value;
                clearInterval(timer);
              }
              setAnimatedValues(prev => {
                const newValues = [...prev];
                newValues[index] = Math.round(current);
                return newValues;
              });
            }, duration / steps);
          });
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('success-metrics');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'text-green-600 bg-green-50 border-green-200',
      red: 'text-red-600 bg-red-50 border-red-200',
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200'
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  return (
    <section id="success-metrics" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Badge variant="outline" className="mb-4 px-4 py-2 text-green-700 border-green-200">
              <BarChart3 className="w-4 h-4 mr-2" />
              Success Analytics
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              Proven Results from{' '}
              <span className="text-green-700">Real Students</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive tracking system monitors student progress, satisfaction, 
              and real-world outcomes to ensure consistent success.
            </p>
          </div>

          {/* Key Metrics */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              const progress = (animatedValues[index] / metric.value) * 100;
              const isAboveTarget = animatedValues[index] >= metric.target;
              
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(metric.color)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {isAboveTarget && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          Target Exceeded
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {metric.unit === '₹' ? '₹' : ''}{animatedValues[index].toLocaleString()}{metric.unit !== '₹' ? metric.unit : ''}
                        </div>
                        <p className="text-sm text-gray-600">{metric.title}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Target: {metric.target}{metric.unit !== '₹' ? metric.unit : ''}</span>
                          <span className={isAboveTarget ? 'text-green-600' : 'text-gray-500'}>
                            {Math.round((animatedValues[index] / metric.target) * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={Math.min(progress, 100)} 
                          className="h-2"
                        />
                      </div>
                      
                      <p className="text-xs text-gray-500">{metric.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Success Stories */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Featured Success Stories
              </h3>
              <p className="text-gray-600">
                Real transformations from our academy graduates
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <CardTitle className="text-lg">{story.name}</CardTitle>
                    <p className="text-sm text-gray-600">{story.location}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* AQI Improvement */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-800">AQI Improvement</span>
                        <Wind className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <div className="text-lg font-bold text-red-600">{story.beforeAQI}</div>
                          <div className="text-xs text-gray-600">Before</div>
                        </div>
                        <div className="text-2xl text-gray-400">→</div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{story.afterAQI}</div>
                          <div className="text-xs text-gray-600">After</div>
                        </div>
                      </div>
                      <div className="mt-2 text-center">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {Math.round((1 - story.afterAQI / story.beforeAQI) * 100)}% Improvement
                        </Badge>
                      </div>
                    </div>

                    {/* Income Generation */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-800">Monthly Income</span>
                        <DollarSign className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-700">
                          ₹{story.monthlyIncome.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">
                          Achieved in {story.timeframe}
                        </div>
                      </div>
                    </div>

                    {/* Transformation Badge */}
                    <div className="text-center">
                      <Badge className="bg-purple-100 text-purple-800">
                        <Leaf className="w-3 h-3 mr-1" />
                        Complete Transformation
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className={`text-center mt-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Ready to Join Our Success Stories?
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  Start your transformation journey today and become part of our growing community 
                  of successful aquaponics practitioners.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Badge variant="outline" className="px-4 py-2 text-green-700 border-green-200">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    87% Success Rate
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2 text-blue-700 border-blue-200">
                    <Users className="w-4 h-4 mr-2" />
                    750+ Graduates
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2 text-purple-700 border-purple-200">
                    <Award className="w-4 h-4 mr-2" />
                    94% Satisfaction
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
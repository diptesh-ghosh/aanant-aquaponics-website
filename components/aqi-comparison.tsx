'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingDown, TrendingUp, Calculator, BarChart3 } from 'lucide-react';
import { AQIWidget } from './aqi-widget';

export function AQIComparison() {
  const [improvement, setImprovement] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate improvement calculation
          setTimeout(() => {
            const interval = setInterval(() => {
              setImprovement(prev => {
                if (prev >= 94.6) {
                  clearInterval(interval);
                  return 94.6; // (280-15)/280 * 100
                }
                return prev + 2.3;
              });
            }, 50);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('aqi-comparison');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleCalculateClick = () => {
    // Add functionality for the calculator button
    window.location.href = '/tools/aqi-calculator';
  };

  return (
    <section id="aqi-comparison" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Badge variant="outline" className="mb-4 px-4 py-2 text-green-700 border-green-200">
              <BarChart3 className="w-4 h-4 mr-2" />
              Live Data Comparison
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              The Transformation That{' '}
              <span className="text-green-700">Changed Everything</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real-time air quality monitoring shows the dramatic difference between Delhi's average AQI 
              and the pristine environment we've created through aquaponics.
            </p>
          </div>

          {/* Main Comparison Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Delhi AQI Card */}
            <Card className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'} hover:shadow-xl border-red-200`}>
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center text-red-700">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Delhi Current AQI
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <AQIWidget location="delhi" />
                <div className="mt-4 p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-700 font-medium">Health Impact:</p>
                  <p className="text-xs text-red-600 mt-1">
                    Respiratory issues, eye irritation, reduced lung function
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Improvement Indicator */}
            <Card className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} border-blue-200 bg-gradient-to-br from-blue-50 to-white`}>
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center text-blue-700">
                  <Calculator className="w-5 h-5 mr-2" />
                  Improvement Achieved
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {improvement.toFixed(1)}%
                </div>
                <p className="text-sm text-blue-700 mb-4">Air Quality Improvement</p>
                <Progress value={improvement} className="h-3 mb-4" />
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">
                    18.7× Better Air Quality
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Aanant Home AQI Card */}
            <Card className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'} hover:shadow-xl border-green-200`}>
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center text-green-700">
                  <TrendingDown className="w-5 h-5 mr-2" />
                  Aanant Home AQI
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <AQIWidget location="aanant" />
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">Health Impact:</p>
                  <p className="text-xs text-green-600 mt-1">
                    Optimal breathing, enhanced immunity, increased vitality
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Impact Statistics */}
          <div className={`grid md:grid-cols-4 gap-6 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">15</div>
              <p className="text-sm text-green-600">Consistent AQI</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">26 Years</div>
              <p className="text-sm text-blue-600">Research Journey</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">750+</div>
              <p className="text-sm text-purple-600">Success Stories</p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-700">₹2.5L</div>
              <p className="text-sm text-orange-600">Monthly Revenue</p>
            </div>
          </div>

          {/* CTA */}
          <div className={`text-center mt-12 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button 
              size="lg" 
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full"
              onClick={handleCalculateClick}
            >
              Calculate Your Air Quality Improvement
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
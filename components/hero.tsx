'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowDown, Leaf, Wind, Heart, Home, Thermometer, DollarSign, TrendingUp, Users, Fish } from 'lucide-react';
import { AQIWidget } from './aqi-widget';

const technicalAchievements = [
  {
    icon: Home,
    title: 'AQI 15 Clean Air Achievement',
    subtitle: 'PM2.5 = 5 | PM10 = 10 | All Year Round',
    value: '15',
    unit: 'AQI',
    color: 'blue',
    description: 'Consistent pristine air quality maintained throughout the year'
  },
  {
    icon: Leaf,
    title: '15,000 Plants Growing System',
    subtitle: 'Vegetables | Herbs | Fruits | 120kg Fish Annually',
    value: '15,000',
    unit: 'Plants',
    color: 'green',
    description: 'Thriving ecosystem producing fresh food and clean air'
  },
  {
    icon: Thermometer,
    title: 'Natural Cooling System',
    subtitle: '25°C Inside When 45°C Outside | Zero Air Conditioning',
    value: '20°C',
    unit: 'Cooler',
    color: 'cyan',
    description: 'Natural temperature regulation without electricity'
  },
  {
    icon: DollarSign,
    title: 'Income Generation Proof',
    subtitle: '₹25,000+ Monthly Revenue | 240 Plants Sold Every Saturday',
    value: '₹25,000+',
    unit: 'Monthly',
    color: 'purple',
    description: 'Sustainable income from eco-friendly practices'
  }
];

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Rotate through achievements
    const interval = setInterval(() => {
      setCurrentAchievement(prev => (prev + 1) % technicalAchievements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollToComparison = () => {
    document.getElementById('aqi-comparison')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScheduleConsultation = () => {
    window.location.href = '/services';
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 text-white',
      green: 'from-green-500 to-green-600 text-white',
      cyan: 'from-cyan-500 to-cyan-600 text-white',
      purple: 'from-purple-500 to-purple-600 text-white'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getBgColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      cyan: 'bg-cyan-50 border-cyan-200',
      purple: 'bg-purple-50 border-purple-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNMjAgMjBjMC0xMC40NTEgOC40OTEtMTguOTQgMTktMTguOTRzMTkgOC40ODkgMTkgMTguOTQtOC40OTEgMTguOTQtMTkgMTguOTQtMTktOC40ODktMTktMTguOTR6IiBmaWxsPSJub25lIiBzdHJva2U9IiMyQzVGMkQiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Main Hero Content */}
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-green-100 text-green-800 border-green-200">
              <Leaf className="w-4 h-4 mr-2" />
              AANANT AQUAPONIC URBAN FARMS
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-green-800 via-green-700 to-green-600 bg-clip-text text-transparent leading-tight">
              Create an AQI 15 Clean Naturally Cool Air Home
              <span className="block text-3xl md:text-4xl lg:text-5xl mt-2">
                From 1945 Punjab Farm to Delhi's Cleanest Home
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Where Traditional Farming Wisdom Meets Modern Aquaponics Innovation. 
              Live an Organic Sustainable Lifestyle with our scientifically-proven methods.
            </p>
          </div>

          {/* Real-Time AQI Comparison - Prominent */}
          <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="p-8 bg-gradient-to-r from-red-50 via-white to-green-50 border-2 border-green-200 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Live Air Quality Comparison
                </h2>
                <p className="text-gray-600">Real-time data showing the dramatic difference</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Delhi AQI */}
                <div className="text-center p-6 bg-red-50 border-2 border-red-200 rounded-xl">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Wind className="w-8 h-8 text-red-600" />
                    <h3 className="text-xl font-bold text-red-800">Delhi Current AQI</h3>
                  </div>
                  <AQIWidget location="delhi" className="text-red-600" />
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-red-700">Health Impact:</p>
                    <p className="text-xs text-red-600">Respiratory issues, eye irritation, reduced lung function</p>
                    <Badge variant="destructive" className="mt-2">Hazardous to Health</Badge>
                  </div>
                </div>

                {/* VS Indicator */}
                <div className="flex flex-col items-center justify-center">
                  <div className="text-6xl font-bold text-gray-400 mb-2">VS</div>
                  <div className="text-lg font-semibold text-gray-600">Real-Time Comparison</div>
                  <TrendingUp className="w-8 h-8 text-green-600 mt-2" />
                </div>

                {/* Aanant Home AQI */}
                <div className="text-center p-6 bg-green-50 border-2 border-green-200 rounded-xl">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Heart className="w-8 h-8 text-green-600" />
                    <h3 className="text-xl font-bold text-green-800">Aanant Home AQI</h3>
                  </div>
                  <AQIWidget location="aanant" className="text-green-600" />
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-green-700">Health Impact:</p>
                    <p className="text-xs text-green-600">Optimal breathing, enhanced immunity, increased vitality</p>
                    <Badge className="mt-2 bg-green-600">Pristine Air Quality</Badge>
                  </div>
                </div>
              </div>

              {/* Improvement Percentage */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="text-4xl font-bold text-blue-700">94.6%</div>
                  <div className="text-left">
                    <p className="font-semibold text-blue-800">Air Quality Improvement</p>
                    <p className="text-sm text-blue-600">18.7× Better Than Delhi Average</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Technical Achievements Grid */}
          <div className={`mb-12 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Real Measurements from Our Delhi Home
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Documented results from our operational system demonstrating measurable achievements
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technicalAchievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card 
                    key={index} 
                    className={`hover:shadow-xl transition-all duration-300 ${getBgColorClasses(achievement.color)} border-2`}
                  >
                    <div className="p-6 text-center">
                      {/* Icon */}
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${getColorClasses(achievement.color)} flex items-center justify-center`}>
                        <Icon className="w-8 h-8" />
                      </div>

                      {/* Main Value */}
                      <div className="mb-3">
                        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                          {achievement.value}
                        </div>
                        <div className="text-sm font-medium text-gray-600">
                          {achievement.unit}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-gray-900 mb-2 text-sm">
                        {achievement.title}
                      </h3>

                      {/* Subtitle with specs */}
                      <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                        {achievement.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-xs text-gray-500 italic">
                        {achievement.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Detailed Proof Points */}
          <div className={`mb-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="p-8 bg-gradient-to-r from-gray-50 to-white border border-gray-200">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* AQI Details */}
                <div className="text-center">
                  <div className="mb-4">
                    <Wind className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-bold text-gray-900">Air Quality Specs</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">PM2.5:</span>
                      <span className="font-bold text-blue-600">5 μg/m³</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">PM10:</span>
                      <span className="font-bold text-blue-600">10 μg/m³</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Consistency:</span>
                      <span className="font-bold text-green-600">365 Days</span>
                    </div>
                  </div>
                </div>

                {/* Plant System */}
                <div className="text-center">
                  <div className="mb-4">
                    <Leaf className="w-12 h-12 text-green-600 mx-auto mb-2" />
                    <h4 className="font-bold text-gray-900">Growing System</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Plants:</span>
                      <span className="font-bold text-green-600">15,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fish Harvest:</span>
                      <span className="font-bold text-green-600">120kg/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Varieties:</span>
                      <span className="font-bold text-green-600">50+ Types</span>
                    </div>
                  </div>
                </div>

                {/* Cooling System */}
                <div className="text-center">
                  <div className="mb-4">
                    <Thermometer className="w-12 h-12 text-cyan-600 mx-auto mb-2" />
                    <h4 className="font-bold text-gray-900">Natural Cooling</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Outside:</span>
                      <span className="font-bold text-red-600">45°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Inside:</span>
                      <span className="font-bold text-cyan-600">25°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">AC Usage:</span>
                      <span className="font-bold text-green-600">Zero</span>
                    </div>
                  </div>
                </div>

                {/* Income Proof */}
                <div className="text-center">
                  <div className="mb-4">
                    <DollarSign className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-bold text-gray-900">Revenue Proof</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly:</span>
                      <span className="font-bold text-purple-600">₹25,000+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weekly Sales:</span>
                      <span className="font-bold text-purple-600">240 Plants</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Profit Margin:</span>
                      <span className="font-bold text-green-600">85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* CTA Section */}
          <div className={`text-center transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex justify-center gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleScheduleConsultation}
              >
                Schedule Consultation Call
              </Button>
              <a href="/fresh-produce">
                <Button 
                  size="lg"
                  className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Order Fresh Vegetables
                </Button>
              </a>
              <a href="/services">
                <Button 
                  size="lg"
                  className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Create Your AQI 15 Home
                </Button>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-600" />
                <span>750+ Successful Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span>26 Years Research</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>94.6% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Fish className="w-4 h-4 text-cyan-600" />
                <span>Government Recognized</span>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="text-center mt-16 animate-bounce">
            <ArrowDown 
              className="w-6 h-6 text-green-600 mx-auto cursor-pointer hover:text-green-800 transition-colors"
              onClick={scrollToComparison}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
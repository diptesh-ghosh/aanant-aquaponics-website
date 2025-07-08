'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Beaker, Leaf, Droplets, Wind, Lightbulb, ArrowRight } from 'lucide-react';

const methodologySteps = [
  {
    step: 1,
    title: 'Water Circulation System',
    description: 'Closed-loop water system with fish tanks providing nutrients for plants while filtering air naturally.',
    icon: Droplets,
    color: 'blue',
    technical: 'pH 6.8-7.2, dissolved oxygen >5mg/L, nitrate conversion efficiency 95%'
  },
  {
    step: 2,
    title: 'Plant Selection & Placement',
    description: 'Strategic placement of air-purifying plants including snake plants, peace lilies, and spider plants.',
    icon: Leaf,
    color: 'green',
    technical: '15-20 plants per 100 sq.ft, optimized for formaldehyde and benzene removal'
  },
  {
    step: 3,
    title: 'Air Circulation Enhancement',
    description: 'Natural ventilation design with strategic plant placement to maximize air purification.',
    icon: Wind,
    color: 'gray',
    technical: '3-5 air changes per hour, particulate removal efficiency 89%'
  },
  {
    step: 4,
    title: 'Monitoring & Optimization',
    description: 'Continuous monitoring of air quality parameters with system adjustments for optimal performance.',
    icon: Beaker,
    color: 'purple',
    technical: 'Real-time PM2.5, PM10, CO2, and TVOC monitoring every 5 minutes'
  }
];

const scientificData = [
  {
    parameter: 'PM2.5 Reduction',
    before: '145 μg/m³',
    after: '8 μg/m³',
    improvement: '94.5%',
    color: 'red'
  },
  {
    parameter: 'PM10 Reduction',
    before: '298 μg/m³',
    after: '12 μg/m³',
    improvement: '96.0%',
    color: 'orange'
  },
  {
    parameter: 'CO2 Levels',
    before: '1,200 ppm',
    after: '420 ppm',
    improvement: '65.0%',
    color: 'blue'
  },
  {
    parameter: 'TVOC Reduction',
    before: '89 ppb',
    after: '3 ppb',
    improvement: '96.6%',
    color: 'green'
  }
];

export function MethodologySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('methodology-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % methodologySteps.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const handleGetCustomDesign = () => {
    window.location.href = '/services';
  };

  const handleScheduleConsultation = () => {
    window.location.href = '/services';
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      gray: 'text-gray-600 bg-gray-50 border-gray-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200',
      red: 'text-red-600',
      orange: 'text-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="methodology-section" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Badge variant="outline" className="mb-4 px-4 py-2 text-green-700 border-green-200">
              <Beaker className="w-4 h-4 mr-2" />
              Scientific Methodology
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              The Science Behind{' '}
              <span className="text-green-700">AQI 15</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our revolutionary aquaponics system combines biological air filtration, natural plant processes, 
              and strategic environmental design to achieve consistently clean air.
            </p>
          </div>

          {/* Methodology Tabs */}
          <div className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Tabs defaultValue="process" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="process">4-Step Process</TabsTrigger>
                <TabsTrigger value="science">Scientific Data</TabsTrigger>
                <TabsTrigger value="economics">Economics</TabsTrigger>
              </TabsList>

              {/* Process Tab */}
              <TabsContent value="process" className="mt-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Steps List */}
                  <div className="space-y-4">
                    {methodologySteps.map((step, index) => {
                      const Icon = step.icon;
                      const isActive = index === activeStep;
                      
                      return (
                        <Card 
                          key={index}
                          className={`cursor-pointer transition-all duration-300 ${
                            isActive ? 'ring-2 ring-green-400 shadow-lg' : 'hover:shadow-md'
                          }`}
                          onClick={() => setActiveStep(index)}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getColorClasses(step.color)}`}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline" className="text-xs">
                                    Step {step.step}
                                  </Badge>
                                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                                <p className="text-xs text-gray-500 italic">{step.technical}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Active Step Visualization */}
                  <div className="lg:sticky lg:top-8">
                    <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="flex items-center gap-3">
                          {React.createElement(methodologySteps[activeStep].icon, { className: `w-8 h-8 ${getColorClasses(methodologySteps[activeStep].color)}` })}
                          <span>Step {methodologySteps[activeStep].step}: {methodologySteps[activeStep].title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="mb-6">
                          <img
                            src={`https://images.pexels.com/photos/${4503273 + activeStep}/pexels-photo-${4503273 + activeStep}.jpeg?auto=compress&cs=tinysrgb&w=600`}
                            alt={methodologySteps[activeStep].title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        <p className="text-gray-700 mb-4">{methodologySteps[activeStep].description}</p>
                        <div className="p-4 bg-white rounded-lg border">
                          <p className="text-sm font-medium text-gray-900 mb-2">Technical Specifications:</p>
                          <p className="text-sm text-gray-600">{methodologySteps[activeStep].technical}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Scientific Data Tab */}
              <TabsContent value="science" className="mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {scientificData.map((data, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-lg">{data.parameter}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Before:</span>
                            <span className={`font-semibold ${getColorClasses(data.color)}`}>{data.before}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">After:</span>
                            <span className="font-semibold text-green-600">{data.after}</span>
                          </div>
                          <div className="pt-2">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Improvement:</span>
                              <span className="text-lg font-bold text-green-600">{data.improvement}</span>
                            </div>
                            <Progress value={parseFloat(data.improvement)} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
                  <div className="text-center">
                    <Lightbulb className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Key Scientific Insights</h3>
                    <div className="grid md:grid-cols-2 gap-6 text-left">
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Biological Filtration</h4>
                        <p className="text-sm text-blue-700">
                          Plants absorb 87% of airborne toxins through their leaves and root systems, 
                          while beneficial bacteria break down pollutants at the molecular level.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Synergistic Effect</h4>
                        <p className="text-sm text-blue-700">
                          The aquaponics ecosystem creates a multiplicative effect where fish waste, 
                          plant uptake, and microbial activity work together for maximum purification.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Economics Tab */}
              <TabsContent value="economics" className="mt-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="p-6">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle>Investment & Returns</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-gray-600">Initial Setup Cost:</span>
                          <span className="font-semibold">₹85,000</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-gray-600">Monthly Revenue (Plants):</span>
                          <span className="font-semibold text-green-600">₹12,000</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-gray-600">Monthly Operating Cost:</span>
                          <span className="font-semibold">₹3,500</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-gray-600">Net Monthly Profit:</span>
                          <span className="font-semibold text-green-600">₹8,500</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-gray-900 font-medium">ROI Payback Period:</span>
                          <span className="font-bold text-blue-600">10 Months</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6 bg-green-50 border-green-200">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-green-800">Health Cost Savings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-green-200">
                          <span className="text-green-700">Reduced Medical Bills:</span>
                          <span className="font-semibold">₹15,000/month</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-green-200">
                          <span className="text-green-700">Air Purifier Savings:</span>
                          <span className="font-semibold">₹2,500/month</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-green-200">
                          <span className="text-green-700">Energy Cost Reduction:</span>
                          <span className="font-semibold">₹1,800/month</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-green-800 font-medium">Total Health Savings:</span>
                          <span className="font-bold text-green-600">₹19,300/month</span>
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                        <p className="text-sm text-green-700 text-center">
                          <strong>Combined Monthly Benefit: ₹27,800</strong><br />
                          Clean air + income + health savings
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* CTA Section */}
          <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Ready to Transform Your Home's Air Quality?
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  Join 750+ families already breathing clean air. Get your personalized aquaponics system design 
                  and start your journey to AQI 15.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full"
                    onClick={handleGetCustomDesign}
                  >
                    Get Your Custom System Design
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-green-700 text-green-700 hover:bg-green-50 px-8 py-4 rounded-full"
                    onClick={handleScheduleConsultation}
                  >
                    Schedule Consultation Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
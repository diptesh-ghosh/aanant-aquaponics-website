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
  Home, 
  Wind, 
  Thermometer, 
  Leaf, 
  Fish, 
  Sun, 
  DollarSign,
  BarChart3,
  Droplets,
  Zap,
  Download,
  ArrowRight,
  Calendar,
  CheckCircle,
  MapPin,
  Ruler,
  Building,
  Users,
  Layers,
  Maximize,
  Minimize,
  ChevronRight,
  Play,
  Waves,
  Umbrella,
  Cloud,
  Palmtree,
  Globe,
  Flower
} from 'lucide-react';

const projectSpecs = {
  location: 'Hazratganj, Lucknow, India',
  area: 'Daughter\'s residence',
  plantCapacity: '2,000 plants',
  fishCapacity: 'Underground fish tanks',
  completionDate: 'August 2023',
  maintenanceCost: '₹4,500/month',
  monthlyRevenue: '₹12,000+',
  aqiImprovement: '91.8%',
  beforeAQI: 220,
  afterAQI: 18,
  naturalCooling: '15°C reduction',
  energySavings: '₹6,000/month',
  waterSavings: '78% reduction',
  carbonOffset: '2.8 tons/year'
};

const systemComponents = [
  {
    name: 'Ground-Level Media Beds',
    description: 'Specialized growing beds integrated into garden landscape',
    capacity: '1,200 plants in active rotation',
    maintenance: 'Monthly media cleaning, weekly inspection',
    image: 'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Underground Fish Tanks',
    description: 'Concealed fish habitat with temperature regulation',
    capacity: '80kg fish production annually',
    maintenance: 'Weekly water testing, monthly cleaning',
    image: 'https://images.pexels.com/photos/7538686/pexels-photo-7538686.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Fruit Tree Irrigation',
    description: 'Nutrient-rich water distribution to orchard trees',
    capacity: '12 mature fruit trees supported',
    maintenance: 'Seasonal adjustment, monthly inspection',
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Vertical Garden Walls',
    description: 'Decorative and functional growing surfaces on property walls',
    capacity: '800 plants in aesthetic arrangement',
    maintenance: 'Weekly inspection, monthly cleaning',
    image: 'https://images.pexels.com/photos/6231753/pexels-photo-6231753.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Water Circulation System',
    description: 'Energy-efficient pumping with solar backup power',
    capacity: '2,000L/hour circulation rate',
    maintenance: 'Monthly filter cleaning, quarterly pump check',
    image: 'https://images.pexels.com/photos/4503277/pexels-photo-4503277.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Climate Adaptation Features',
    description: 'Specialized components for Lucknow\'s seasonal climate variations',
    capacity: 'Manages 5-45°C temperature range',
    maintenance: 'Seasonal adjustment, minimal intervention',
    image: 'https://images.pexels.com/photos/4503278/pexels-photo-4503278.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const results = [
  {
    category: 'Air Quality',
    metrics: [
      { name: 'PM2.5 Reduction', before: '120 μg/m³', after: '8 μg/m³', improvement: '93.3%' },
      { name: 'PM10 Reduction', before: '220 μg/m³', after: '18 μg/m³', improvement: '91.8%' },
      { name: 'VOC Levels', before: '650 ppb', after: '40 ppb', improvement: '93.8%' },
      { name: 'CO2 Levels', before: '950 ppm', after: '480 ppm', improvement: '49.5%' }
    ]
  },
  {
    category: 'Environmental Impact',
    metrics: [
      { name: 'Water Usage', before: '320L/day', after: '70L/day', improvement: '78.1%' },
      { name: 'Energy Consumption', before: '32 kWh/day', after: '10 kWh/day', improvement: '68.8%' },
      { name: 'Carbon Footprint', before: '5.1 tons/year', after: '2.3 tons/year', improvement: '54.9%' },
      { name: 'Waste Production', before: '7.2 kg/week', after: '1.5 kg/week', improvement: '79.2%' }
    ]
  },
  {
    category: 'Economic Benefits',
    metrics: [
      { name: 'Monthly Produce Value', before: '₹0', after: '₹12,000+', improvement: 'New Revenue' },
      { name: 'Energy Costs', before: '₹9,000/month', after: '₹3,000/month', improvement: '66.7%' },
      { name: 'Water Costs', before: '₹3,500/month', after: '₹800/month', improvement: '77.1%' },
      { name: 'Property Value', before: 'Base Value', after: '+12% Premium', improvement: '12.0%' }
    ]
  },
  {
    category: 'Fruit Production',
    metrics: [
      { name: 'Mango Yield', before: '45kg/year', after: '120kg/year', improvement: '166.7%' },
      { name: 'Guava Production', before: '30kg/year', after: '85kg/year', improvement: '183.3%' },
      { name: 'Citrus Harvest', before: '25kg/year', after: '70kg/year', improvement: '180.0%' },
      { name: 'Fruit Quality', before: 'Average', after: 'Premium', improvement: 'Significant' }
    ]
  }
];

const galleryImages = [
  {
    url: 'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Ground-Level Media Beds'
  },
  {
    url: 'https://images.pexels.com/photos/7538686/pexels-photo-7538686.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Underground Fish Tank System'
  },
  {
    url: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Fruit Tree Irrigation System'
  },
  {
    url: 'https://images.pexels.com/photos/6231753/pexels-photo-6231753.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Vertical Garden Wall'
  },
  {
    url: 'https://images.pexels.com/photos/4503277/pexels-photo-4503277.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Water Circulation System'
  },
  {
    url: 'https://images.pexels.com/photos/4503278/pexels-photo-4503278.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Climate Adaptation Features'
  },
  {
    url: 'https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Integrated Garden Landscape'
  },
  {
    url: 'https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Fruit Orchard Integration'
  }
];

const uniqueFeatures = [
  {
    title: 'Fruit Tree Integration',
    description: 'Specialized system designed to support existing fruit trees with nutrient-rich water',
    icon: Apple,
    color: 'red'
  },
  {
    title: 'Underground Fish Tanks',
    description: 'Concealed fish habitat system that maintains optimal temperature year-round',
    icon: Fish,
    color: 'blue'
  },
  {
    title: 'Seasonal Adaptation',
    description: 'System designed to handle Lucknow\'s extreme seasonal variations from winter to summer',
    icon: Sun,
    color: 'yellow'
  },
  {
    title: 'Ornamental Integration',
    description: 'Seamless blending of functional aquaponics with traditional garden aesthetics',
    icon: Flower,
    color: 'pink'
  },
  {
    title: 'Family-Friendly Design',
    description: 'Child-safe system with educational components for multi-generational engagement',
    icon: Heart,
    color: 'purple'
  },
  {
    title: 'Heritage Property Adaptation',
    description: 'Specialized installation respecting the architectural integrity of the heritage property',
    icon: Building,
    color: 'orange'
  }
];

export default function LucknowProjectPage() {
  const [mounted, setMounted] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Auto-rotate through features
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % uniqueFeatures.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'text-red-600 bg-red-50 border-red-200',
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      pink: 'text-pink-600 bg-pink-50 border-pink-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200',
      orange: 'text-orange-600 bg-orange-50 border-orange-200',
      green: 'text-green-600 bg-green-50 border-green-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4 px-4 py-2 text-amber-700 border-amber-200">
                  <TreePine className="w-4 h-4 mr-2" />
                  Family Project
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Lucknow Home Project
                  <span className="block text-2xl md:text-3xl mt-2 text-amber-700">
                    Daughter's Residence
                  </span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  A specialized aquaponics system designed for our daughter's residence in Hazratganj, 
                  featuring ground-level media beds, underground fish tanks, and integrated fruit tree 
                  irrigation for a beautiful and productive family garden.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <Wind className="w-8 h-8 text-amber-600 flex-shrink-0" />
                    <div>
                      <div className="text-xl font-bold text-amber-700">AQI 18</div>
                      <p className="text-sm text-amber-600">Clean Air Quality</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <Sprout className="w-8 h-8 text-green-600 flex-shrink-0" />
                    <div>
                      <div className="text-xl font-bold text-green-700">2,000</div>
                      <p className="text-sm text-green-600">Plants Capacity</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                    <Apple className="w-8 h-8 text-red-600 flex-shrink-0" />
                    <div>
                      <div className="text-xl font-bold text-red-700">12 Trees</div>
                      <p className="text-sm text-red-600">Fruit Orchard</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Fish className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <div className="text-xl font-bold text-blue-700">Underground</div>
                      <p className="text-sm text-blue-600">Fish Tank System</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-amber-700 hover:bg-amber-800">
                    <Download className="w-5 h-5 mr-2" />
                    Download Case Study
                  </Button>
                  <Button variant="outline" size="lg" className="border-amber-700 text-amber-700 hover:bg-amber-50">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Video Tour
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Lucknow Home Project"
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <div className="flex items-center gap-2 text-white">
                      <MapPin className="w-5 h-5" />
                      <span className="font-medium">Hazratganj, Lucknow, India</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-green-400/20 rounded-3xl blur-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Project Overview
              </h2>
              <p className="text-gray-600">
                A family-focused aquaponics system designed to enhance our daughter's residence 
                while preserving the aesthetic beauty of the traditional garden.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                    <Building className="w-6 h-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl">Property Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Property Type:</span>
                    <span className="font-medium">Residential Home</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">Hazratganj, Lucknow</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Garden Area:</span>
                    <span className="font-medium">450 sq.m.</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Existing Trees:</span>
                    <span className="font-medium">12 fruit trees</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completion Date:</span>
                    <span className="font-medium">August 2023</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Project Duration:</span>
                    <span className="font-medium">3 months</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Layers className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">System Capacity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Plants:</span>
                    <span className="font-medium">2,000 capacity</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fish Production:</span>
                    <span className="font-medium">80kg annually</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Water Circulation:</span>
                    <span className="font-medium">2,000L/hour</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Growing Area:</span>
                    <span className="font-medium">180 sq.meters</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Plant Varieties:</span>
                    <span className="font-medium">30+ types</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fruit Trees:</span>
                    <span className="font-medium">Mango, Guava, Citrus</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Key Outcomes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">AQI Improvement:</span>
                    <span className="font-medium text-green-600">91.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Temperature Reduction:</span>
                    <span className="font-medium text-blue-600">15°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Revenue:</span>
                    <span className="font-medium text-purple-600">₹12,000+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Energy Savings:</span>
                    <span className="font-medium text-orange-600">68.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Water Savings:</span>
                    <span className="font-medium text-cyan-600">78.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fruit Yield Increase:</span>
                    <span className="font-medium text-red-600">175%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Unique Family-Focused Features
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our Lucknow project features specialized adaptations for family living, 
                combining functionality with traditional garden aesthetics.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Feature Navigation */}
              <div className="lg:col-span-1">
                <div className="space-y-4 sticky top-24">
                  {uniqueFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <Card 
                        key={index}
                        className={`cursor-pointer transition-all duration-300 ${
                          activeFeature === index ? 'ring-2 ring-amber-400 bg-amber-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setActiveFeature(index)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(feature.color)}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <h3 className="font-medium text-gray-900">{feature.title}</h3>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Feature Details */}
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <div className="relative h-80">
                    <img
                      src={galleryImages[activeFeature].url}
                      alt={uniqueFeatures[activeFeature].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-amber-700 text-white px-4 py-2">
                        {uniqueFeatures[activeFeature].title}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(uniqueFeatures[activeFeature].color)}`}>
                        {React.createElement(uniqueFeatures[activeFeature].icon, { className: "w-6 h-6" })}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {uniqueFeatures[activeFeature].title}
                        </h3>
                        <p className="text-gray-600">
                          {uniqueFeatures[activeFeature].description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      {activeFeature === 0 && (
                        <>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            <span className="text-gray-700">Nutrient-rich water delivery system for 12 fruit trees</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            <span className="text-gray-700">175% increase in fruit production quantity and quality</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            <span className="text-gray-700">Seasonal adjustment system for varying water needs</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            <span className="text-gray-700">Root zone monitoring for optimal nutrient delivery</span>
                          </div>
                        </>
                      )}
                      {activeFeature === 1 && (
                        <>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                            <span className="text-gray-700">Temperature-stable underground fish habitat</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                            <span className="text-gray-700">Concealed system preserves garden aesthetics</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                            <span className="text-gray-700">Automated feeding and monitoring system</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                            <span className="text-gray-700">Easy access points for maintenance and harvesting</span>
                          </div>
                        </>
                      )}
                      {activeFeature === 2 && (
                        <>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <span className="text-gray-700">Specialized components for Lucknow's extreme seasons</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <span className="text-gray-700">Summer cooling system for 45°C+ temperatures</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <span className="text-gray-700">Winter protection for sensitive components</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <span className="text-gray-700">Monsoon management with excess water handling</span>
                          </div>
                        </>
                      )}
                      {activeFeature === 3 && (
                        <>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-pink-600 mt-0.5" />
                            <span className="text-gray-700">Traditional garden aesthetic maintained with hidden technology</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-pink-600 mt-0.5" />
                            <span className="text-gray-700">Decorative elements that serve functional purposes</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-pink-600 mt-0.5" />
                            <span className="text-gray-700">Seasonal flowering plants integrated into system</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-pink-600 mt-0.5" />
                            <span className="text-gray-700">Heritage garden design principles preserved</span>
                          </div>
                        </>
                      )}
                      {activeFeature === 4 && (
                        <>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                            <span className="text-gray-700">Child-safe design with no exposed water hazards</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                            <span className="text-gray-700">Educational components for children to learn about ecosystem</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                            <span className="text-gray-700">Interactive elements for family engagement</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                            <span className="text-gray-700">Low-maintenance design for busy family lifestyle</span>
                          </div>
                        </>
                      )}
                      {activeFeature === 5 && (
                        <>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                            <span className="text-gray-700">System designed to complement heritage architecture</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                            <span className="text-gray-700">Non-invasive installation methods</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                            <span className="text-gray-700">Reversible modifications for property preservation</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                            <span className="text-gray-700">Traditional materials used where visible</span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className={`bg-${uniqueFeatures[activeFeature].color}-50 p-4 rounded-lg border border-${uniqueFeatures[activeFeature].color}-200`}>
                      <h4 className={`font-semibold text-${uniqueFeatures[activeFeature].color}-800 mb-2`}>Technical Specifications:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Ruler className={`w-4 h-4 text-${uniqueFeatures[activeFeature].color}-600`} />
                          <span className={`text-${uniqueFeatures[activeFeature].color}-700`}>
                            Area: {activeFeature === 0 ? '120' : activeFeature === 1 ? '40' : '60'} sq.m.
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Droplets className={`w-4 h-4 text-${uniqueFeatures[activeFeature].color}-600`} />
                          <span className={`text-${uniqueFeatures[activeFeature].color}-700`}>
                            Water Usage: {activeFeature === 0 ? '40' : activeFeature === 1 ? '20' : '10'} L/day
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className={`w-4 h-4 text-${uniqueFeatures[activeFeature].color}-600`} />
                          <span className={`text-${uniqueFeatures[activeFeature].color}-700`}>
                            Power: {activeFeature === 0 ? '0.8' : activeFeature === 1 ? '1.2' : '0.5'} kWh/day
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className={`w-4 h-4 text-${uniqueFeatures[activeFeature].color}-600`} />
                          <span className={`text-${uniqueFeatures[activeFeature].color}-700`}>
                            Maintenance: {activeFeature === 0 ? 'Seasonal' : activeFeature === 1 ? 'Weekly' : 'Monthly'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Components */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Key System Components
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our Lucknow project features specialized components designed for family living and 
                integration with existing fruit trees and garden landscape.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {systemComponents.map((component, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={component.image}
                      alt={component.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{component.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-700 mb-4">{component.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Maximize className="w-4 h-4 text-amber-600 mt-0.5" />
                        <span className="text-gray-700"><span className="font-medium">Capacity:</span> {component.capacity}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-green-600 mt-0.5" />
                        <span className="text-gray-700"><span className="font-medium">Maintenance:</span> {component.maintenance}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results & Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Measurable Results & Impact
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our Lucknow project has achieved remarkable improvements in air quality, resource efficiency, 
                and fruit production, creating a healthier family environment.
              </p>
            </div>

            <Tabs defaultValue="air-quality" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="air-quality">Air Quality</TabsTrigger>
                <TabsTrigger value="environmental-impact">Environmental</TabsTrigger>
                <TabsTrigger value="economic-benefits">Economic</TabsTrigger>
                <TabsTrigger value="fruit-production">Fruit Production</TabsTrigger>
              </TabsList>

              {results.map((category, categoryIndex) => (
                <TabsContent key={categoryIndex} value={category.category.toLowerCase().replace(' ', '-')}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.metrics.map((metric, metricIndex) => (
                      <Card key={metricIndex}>
                        <CardHeader>
                          <CardTitle className="text-lg">{metric.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Before:</span>
                            <span className="font-semibold text-red-600">{metric.before}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">After:</span>
                            <span className="font-semibold text-green-600">{metric.after}</span>
                          </div>
                          <div className="pt-2">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Improvement:</span>
                              <span className="text-lg font-bold text-blue-600">{metric.improvement}</span>
                            </div>
                            {metric.improvement.includes('%') && (
                              <Progress 
                                value={parseFloat(metric.improvement)} 
                                className="h-2" 
                              />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Summary Card */}
            <Card className="mt-12 p-8 bg-gradient-to-r from-amber-50 to-green-50 border-amber-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Overall Impact Summary
                </h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-700">AQI 18</div>
                    <p className="text-sm text-gray-600">Clean Air Quality</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-700">78%</div>
                    <p className="text-sm text-gray-600">Water Conservation</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-700">175%</div>
                    <p className="text-sm text-gray-600">Fruit Yield Increase</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-700">₹12,000+</div>
                    <p className="text-sm text-gray-600">Monthly Value</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Project Gallery
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Visual documentation of our Lucknow home project showcasing the integration 
                of aquaponics with traditional garden elements and fruit trees.
              </p>
            </div>

            <div className="relative mb-8">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={galleryImages[currentImage].url}
                  alt={galleryImages[currentImage].caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xl font-bold">{galleryImages[currentImage].caption}</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={() => setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={() => setCurrentImage((prev) => (prev + 1) % galleryImages.length)}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {galleryImages.map((image, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                    currentImage === index ? 'border-amber-500' : 'border-transparent'
                  }`}
                  onClick={() => setCurrentImage(index)}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-16 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Family Testimonial */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-amber-200 bg-gradient-to-r from-amber-50 to-white">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="rounded-full overflow-hidden border-4 border-amber-200 w-40 h-40 mx-auto">
                    <img
                      src="/image copy.png"
                      alt="Jyothsna Singh"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <div className="text-4xl text-amber-300 mb-4">"</div>
                  <p className="text-lg text-gray-700 italic mb-6">
                    The transformation of our garden has been incredible. Not only do we have pristine air quality, 
                    but our fruit trees are thriving like never before. The system is so well integrated that visitors 
                    don't even realize it's there until we point it out. It's become a wonderful educational tool for 
                    our children and a source of pride for our family.
                  </p>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">Jyothsna Singh</p>
                    <p className="text-amber-700">Daughter & Homeowner</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Family Garden?
            </h2>
            <p className="text-xl mb-8 text-amber-100">
              Schedule a consultation to discuss how we can implement a similar system in your property, 
              customized to your family's needs and garden layout.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-amber-700 hover:bg-gray-100">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Consultation
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <ArrowRight className="w-5 h-5 mr-2" />
                Explore Other Projects
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
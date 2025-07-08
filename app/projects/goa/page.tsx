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
  location: 'Dona Paula, Goa, India',
  area: '180m villa',
  plantCapacity: '5,000 plants',
  fishCapacity: '120kg (Seabass, Carp, Prawns)',
  completionDate: 'March 2023',
  maintenanceCost: '₹6,500/month',
  monthlyRevenue: '₹18,000+',
  aqiImprovement: '92.3%',
  beforeAQI: 65,
  afterAQI: 5,
  naturalCooling: '12°C reduction',
  energySavings: '₹8,000/month',
  waterSavings: '92% reduction',
  carbonOffset: '3.2 tons/year'
};

const systemComponents = [
  {
    name: 'Rooftop Greenhouse',
    description: 'Climate-controlled greenhouse with integrated solar panels and rainwater collection',
    capacity: '3,000 plants in active rotation',
    maintenance: 'Monthly cleaning, quarterly system check',
    image: 'https://images.pexels.com/photos/6231753/pexels-photo-6231753.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Japanese Aquaponic Garden',
    description: 'Ornamental garden with koi ponds integrated into aquaponics system',
    capacity: '1,200 plants + decorative fish',
    maintenance: 'Weekly water testing, bi-weekly cleaning',
    image: 'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Coastal Fish Tanks',
    description: 'Specialized tanks for seabass, carp, and prawn cultivation with saltwater adaptation',
    capacity: '120kg fish production annually',
    maintenance: 'Daily feeding, weekly water testing',
    image: 'https://images.pexels.com/photos/7538686/pexels-photo-7538686.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Vertical Growing Towers',
    description: 'Space-efficient vertical systems for leafy greens and herbs',
    capacity: '800 plants in compact arrangement',
    maintenance: 'Weekly inspection, monthly cleaning',
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Saltwater Adaptation System',
    description: 'Specialized filtration for coastal environment with salt tolerance',
    capacity: 'Processes 3,000L/hour with salt management',
    maintenance: 'Monthly filter cleaning, quarterly salt balance check',
    image: 'https://images.pexels.com/photos/4503277/pexels-photo-4503277.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Humidity Control System',
    description: 'Manages high coastal humidity for optimal plant growth',
    capacity: 'Maintains 60-70% humidity in growing areas',
    maintenance: 'Monthly sensor calibration, quarterly cleaning',
    image: 'https://images.pexels.com/photos/4503278/pexels-photo-4503278.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const results = [
  {
    category: 'Air Quality',
    metrics: [
      { name: 'PM2.5 Reduction', before: '45 μg/m³', after: '3 μg/m³', improvement: '93.3%' },
      { name: 'PM10 Reduction', before: '65 μg/m³', after: '5 μg/m³', improvement: '92.3%' },
      { name: 'VOC Levels', before: '420 ppb', after: '25 ppb', improvement: '94.0%' },
      { name: 'Salt Aerosol Filtration', before: 'High', after: 'Minimal', improvement: 'Significant' }
    ]
  },
  {
    category: 'Environmental Impact',
    metrics: [
      { name: 'Water Usage', before: '380L/day', after: '30L/day', improvement: '92.1%' },
      { name: 'Energy Consumption', before: '38 kWh/day', after: '8 kWh/day', improvement: '78.9%' },
      { name: 'Carbon Footprint', before: '4.8 tons/year', after: '1.6 tons/year', improvement: '66.7%' },
      { name: 'Waste Production', before: '6.2 kg/week', after: '0.8 kg/week', improvement: '87.1%' }
    ]
  },
  {
    category: 'Economic Benefits',
    metrics: [
      { name: 'Monthly Produce Value', before: '₹0', after: '₹18,000+', improvement: 'New Revenue' },
      { name: 'Energy Costs', before: '₹12,000/month', after: '₹4,000/month', improvement: '66.7%' },
      { name: 'Water Costs', before: '₹5,000/month', after: '₹800/month', improvement: '84.0%' },
      { name: 'Property Value', before: 'Base Value', after: '+18% Premium', improvement: '18.0%' }
    ]
  },
  {
    category: 'Coastal Adaptation',
    metrics: [
      { name: 'Salt Tolerance', before: 'Poor', after: 'Excellent', improvement: 'Significant' },
      { name: 'Humidity Management', before: 'Problematic', after: 'Optimized', improvement: 'Significant' },
      { name: 'Storm Resilience', before: 'Vulnerable', after: 'Protected', improvement: 'Significant' },
      { name: 'Seasonal Adaptation', before: 'Limited', after: 'Year-round', improvement: 'Significant' }
    ]
  }
];

const galleryImages = [
  {
    url: 'https://images.pexels.com/photos/6231753/pexels-photo-6231753.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Rooftop Greenhouse with Ocean View'
  },
  {
    url: 'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Japanese Aquaponic Garden'
  },
  {
    url: 'https://images.pexels.com/photos/7538686/pexels-photo-7538686.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Coastal Fish Tank System'
  },
  {
    url: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Vertical Growing Towers'
  },
  {
    url: 'https://images.pexels.com/photos/4503277/pexels-photo-4503277.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Saltwater Adaptation System'
  },
  {
    url: 'https://images.pexels.com/photos/4503278/pexels-photo-4503278.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Humidity Control Components'
  },
  {
    url: 'https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Integrated Living Space'
  },
  {
    url: 'https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Outdoor Connection Area'
  }
];

const uniqueFeatures = [
  {
    title: 'Saltwater Adaptation',
    description: 'Specialized system designed to handle coastal salt exposure and humidity',
    icon: Waves,
    color: 'blue'
  },
  {
    title: 'Japanese Garden Integration',
    description: 'Aesthetic design combining traditional Japanese garden elements with functional aquaponics',
    icon: Flower,
    color: 'pink'
  },
  {
    title: 'Coastal Species Cultivation',
    description: 'Specialized growing environment for salt-tolerant plants and coastal fish species',
    icon: Fish,
    color: 'cyan'
  },
  {
    title: 'Monsoon Water Harvesting',
    description: 'Advanced rainwater collection system optimized for heavy monsoon rainfall',
    icon: Cloud,
    color: 'purple'
  },
  {
    title: 'Tourism Integration',
    description: 'System designed to serve as both functional farm and educational tourist attraction',
    icon: Users,
    color: 'orange'
  },
  {
    title: 'Tropical Climate Optimization',
    description: 'Specialized cooling and humidity management for tropical coastal conditions',
    icon: Palmtree,
    color: 'green'
  }
];

export default function GoaProjectPage() {
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
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      cyan: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200',
      orange: 'text-orange-600 bg-orange-50 border-orange-200',
      pink: 'text-pink-600 bg-pink-50 border-pink-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4 px-4 py-2 text-blue-700 border-blue-200">
                  <Waves className="w-4 h-4 mr-2" />
                  Coastal Project
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Goa Home Project
                  <span className="block text-2xl md:text-3xl mt-2 text-blue-700">
                    Coastal Aquaponics Villa
                  </span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our 180m coastal villa in Dona Paula showcases how aquaponics technology can be 
                  adapted to coastal environments, combining Japanese garden aesthetics with 
                  practical food production and air purification.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Wind className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <div className="text-xl font-bold text-blue-700">AQI 5</div>
                      <p className="text-sm text-blue-600">Pristine Air Quality</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                    <Fish className="w-8 h-8 text-cyan-600 flex-shrink-0" />
                    <div>
                      <div className="text-xl font-bold text-cyan-700">120kg</div>
                      <p className="text-sm text-cyan-600">Seafood Production</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <Leaf className="w-8 h-8 text-green-600 flex-shrink-0" />
                    <div>
                      <div className="text-xl font-bold text-green-700">5,000</div>
                      <p className="text-sm text-green-600">Plants Capacity</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <Flower className="w-8 h-8 text-purple-600 flex-shrink-0" />
                    <div>
                      <div className="text-xl font-bold text-purple-700">Japanese</div>
                      <p className="text-sm text-purple-600">Garden Design</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                    <Download className="w-5 h-5 mr-2" />
                    Download Case Study
                  </Button>
                  <Button variant="outline" size="lg" className="border-blue-700 text-blue-700 hover:bg-blue-50">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Video Tour
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/6231753/pexels-photo-6231753.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Goa Home Project"
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <div className="flex items-center gap-2 text-white">
                      <MapPin className="w-5 h-5" />
                      <span className="font-medium">Dona Paula, Goa, India</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-3xl blur-3xl -z-10"></div>
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
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A coastal adaptation of our aquaponics system, designed to thrive in Goa's unique 
                climate while providing aesthetic beauty and practical benefits.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Property Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Property Type:</span>
                    <span className="font-medium">Coastal Villa</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Area:</span>
                    <span className="font-medium">180 square meters</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Built-up Area:</span>
                    <span className="font-medium">140 sq.m.</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Outdoor Space:</span>
                    <span className="font-medium">40 sq.m.</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completion Date:</span>
                    <span className="font-medium">March 2023</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Project Duration:</span>
                    <span className="font-medium">4 months</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                    <Layers className="w-6 h-6 text-cyan-600" />
                  </div>
                  <CardTitle className="text-xl">System Capacity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Plants:</span>
                    <span className="font-medium">5,000 capacity</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fish Production:</span>
                    <span className="font-medium">120kg annually</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Water Circulation:</span>
                    <span className="font-medium">3,000L/hour</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Growing Area:</span>
                    <span className="font-medium">120 sq.meters</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fish Species:</span>
                    <span className="font-medium">Seabass, Carp, Prawns</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Plant Varieties:</span>
                    <span className="font-medium">35+ types</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Key Outcomes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">AQI Improvement:</span>
                    <span className="font-medium text-green-600">92.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Temperature Reduction:</span>
                    <span className="font-medium text-blue-600">12°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Revenue:</span>
                    <span className="font-medium text-purple-600">₹18,000+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Energy Savings:</span>
                    <span className="font-medium text-orange-600">66.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Water Savings:</span>
                    <span className="font-medium text-cyan-600">92.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Carbon Offset:</span>
                    <span className="font-medium text-green-600">3.2 tons/year</span>
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
                Unique Coastal Adaptations
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our Goa project features specialized adaptations for coastal environments, 
                combining functionality with aesthetic beauty.
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
                          activeFeature === index ? 'ring-2 ring-blue-400 bg-blue-50' : 'hover:bg-gray-50'
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
                      <Badge className="bg-blue-700 text-white px-4 py-2">
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
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                            <span className="text-gray-700">Specialized filtration system to handle salt aerosols</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                            <span className="text-gray-700">Corrosion-resistant materials throughout the system</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                            <span className="text-gray-700">Salt-tolerant plant varieties selection</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                            <span className="text-gray-700">Specialized water chemistry management for coastal conditions</span>
                          </div>
                        </>
                      )}
                      {activeFeature === 1 && (
                        <>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-pink-600 mt-0.5" />
                            <span className="text-gray-700">Traditional Japanese garden design principles</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-pink-600 mt-0.5" />
                            <span className="text-gray-700">Ornamental koi fish integrated with edible fish species</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-pink-600 mt-0.5" />
                            <span className="text-gray-700">Zen-inspired meditation spaces within productive areas</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-pink-600 mt-0.5" />
                            <span className="text-gray-700">Aesthetic water features that serve functional purposes</span>
                          </div>
                        </>
                      )}
                      {activeFeature === 2 && (
                        <>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-cyan-600 mt-0.5" />
                            <span className="text-gray-700">Specialized tanks for seabass, carp, and prawn cultivation</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-cyan-600 mt-0.5" />
                            <span className="text-gray-700">Brackish water management for diverse species</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-cyan-600 mt-0.5" />
                            <span className="text-gray-700">Integrated breeding program for sustainable stock</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-cyan-600 mt-0.5" />
                            <span className="text-gray-700">Temperature-controlled environments for optimal growth</span>
                          </div>
                        </>
                      )}
                      {activeFeature === 3 && (
                        <>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                            <span className="text-gray-700">Advanced rainwater collection from monsoon rains</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                            <span className="text-gray-700">High-capacity storage system for dry season use</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                            <span className="text-gray-700">Filtration system for contaminant removal</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                            <span className="text-gray-700">Overflow management for extreme rainfall events</span>
                          </div>
                        </>
                      )}
                      {activeFeature === 4 && (
                        <>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                            <span className="text-gray-700">Educational signage and guided tour routes</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                            <span className="text-gray-700">Visitor-friendly viewing areas without system disruption</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                            <span className="text-gray-700">Demonstration areas for hands-on learning</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                            <span className="text-gray-700">Integration with local tourism initiatives</span>
                          </div>
                        </>
                      )}
                      {activeFeature === 5 && (
                        <>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            <span className="text-gray-700">Passive cooling through plant transpiration</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            <span className="text-gray-700">Humidity management for optimal growing conditions</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            <span className="text-gray-700">Seasonal adjustments for monsoon and dry periods</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            <span className="text-gray-700">Integration with natural coastal breezes</span>
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
                            Area: {activeFeature === 0 ? '60' : activeFeature === 1 ? '40' : '20'} sq.m.
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Droplets className={`w-4 h-4 text-${uniqueFeatures[activeFeature].color}-600`} />
                          <span className={`text-${uniqueFeatures[activeFeature].color}-700`}>
                            Water Usage: {activeFeature === 0 ? '800' : activeFeature === 1 ? '600' : '400'} L/day
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className={`w-4 h-4 text-${uniqueFeatures[activeFeature].color}-600`} />
                          <span className={`text-${uniqueFeatures[activeFeature].color}-700`}>
                            Power: {activeFeature === 0 ? '2.5' : activeFeature === 1 ? '1.2' : '0.8'} kWh/day
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className={`w-4 h-4 text-${uniqueFeatures[activeFeature].color}-600`} />
                          <span className={`text-${uniqueFeatures[activeFeature].color}-700`}>
                            Maintenance: {activeFeature === 0 ? 'Monthly' : activeFeature === 1 ? 'Weekly' : 'Bi-weekly'}
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
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our Goa project features specialized components designed for coastal environments, 
                combining aesthetic beauty with practical functionality.
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
                        <Maximize className="w-4 h-4 text-blue-600 mt-0.5" />
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
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our Goa project has achieved remarkable improvements in air quality, resource efficiency, 
                and economic benefits, all adapted to coastal conditions.
              </p>
            </div>

            <Tabs defaultValue="air-quality" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="air-quality">Air Quality</TabsTrigger>
                <TabsTrigger value="environmental-impact">Environmental</TabsTrigger>
                <TabsTrigger value="economic-benefits">Economic</TabsTrigger>
                <TabsTrigger value="coastal-adaptation">Coastal Adaptation</TabsTrigger>
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
            <Card className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Overall Impact Summary
                </h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-700">AQI 5</div>
                    <p className="text-sm text-gray-600">Pristine Air Quality</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-700">92%</div>
                    <p className="text-sm text-gray-600">Water Conservation</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-700">₹18,000+</div>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-700">12°C</div>
                    <p className="text-sm text-gray-600">Temperature Reduction</p>
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
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Visual documentation of our Goa home project showcasing the Japanese garden 
                integration and coastal adaptations.
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
                    currentImage === index ? 'border-blue-500' : 'border-transparent'
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

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Coastal Property?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Schedule a consultation to discuss how we can implement a similar system in your coastal property, 
              adapted to your specific environment and needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
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
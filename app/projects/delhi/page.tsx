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
  Play
} from 'lucide-react';

const projectSpecs = {
  location: 'South Delhi, India',
  area: '800 yards (3-story villa)',
  plantCapacity: '15,000 plants',
  fishCapacity: '120kg',
  completionDate: 'January 2023',
  maintenanceCost: '₹8,500/month',
  monthlyRevenue: '₹25,000+',
  aqiImprovement: '94.6%',
  beforeAQI: 280,
  afterAQI: 15,
  naturalCooling: '20°C reduction',
  energySavings: '₹12,000/month',
  waterSavings: '85% reduction',
  carbonOffset: '4.5 tons/year'
};

const floorPlans = [
  {
    floor: 'Ground Floor',
    plantCapacity: 3000,
    features: [
      'Main aquaponics system with fish tanks',
      'Primary filtration and water circulation',
      'Nutrient-rich water distribution system',
      'Leafy green production area',
      'System monitoring station'
    ],
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    floor: 'First Floor',
    plantCapacity: 1000,
    features: [
      'Vertical growing walls in living spaces',
      'Integrated air purification system',
      'Decorative herb gardens',
      'Natural cooling air channels',
      'Secondary water circulation'
    ],
    image: 'https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    floor: 'Second Floor',
    plantCapacity: 5000,
    features: [
      'Agrivoltaic solar integration',
      'Rooftop greenhouse',
      'Climate-controlled growing environment',
      'Rainwater harvesting system',
      'Advanced monitoring equipment'
    ],
    image: 'https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    floor: 'Climate Controlled Area',
    plantCapacity: 5000,
    features: [
      'Specialized growing environment',
      'Temperature and humidity control',
      'CO2 enrichment system',
      'High-value crop production',
      'Research and development space'
    ],
    image: 'https://images.pexels.com/photos/4503276/pexels-photo-4503276.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const systemComponents = [
  {
    name: 'Fish Tanks',
    description: 'Four 1,000L tanks housing tilapia and carp in balanced ecosystem',
    capacity: '120kg fish production annually',
    maintenance: 'Monthly water testing, quarterly cleaning',
    image: 'https://images.pexels.com/photos/7538686/pexels-photo-7538686.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Grow Beds',
    description: 'Specialized media beds with expanded clay pellets for optimal root development',
    capacity: '8,000 plants in active rotation',
    maintenance: 'Bi-annual media cleaning, monthly inspection',
    image: 'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Vertical Towers',
    description: 'Space-efficient vertical growing systems integrated into living spaces',
    capacity: '3,000 plants in decorative arrangements',
    maintenance: 'Weekly inspection, monthly cleaning',
    image: 'https://images.pexels.com/photos/6231753/pexels-photo-6231753.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Agrivoltaic Solar',
    description: 'Dual-purpose solar panels providing energy while creating optimal growing conditions',
    capacity: '5kW electricity + 4,000 plants underneath',
    maintenance: 'Quarterly panel cleaning, annual system check',
    image: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Water Circulation',
    description: 'Energy-efficient pumping and filtration system with backup power',
    capacity: '5,000L/hour circulation rate',
    maintenance: 'Monthly filter cleaning, annual pump service',
    image: 'https://images.pexels.com/photos/4503277/pexels-photo-4503277.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Climate Control',
    description: 'Passive cooling system using plant transpiration and water evaporation',
    capacity: '20°C temperature reduction (45°C outside to 25°C inside)',
    maintenance: 'Seasonal adjustment, minimal intervention',
    image: 'https://images.pexels.com/photos/4503278/pexels-photo-4503278.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const results = [
  {
    category: 'Air Quality',
    metrics: [
      { name: 'PM2.5 Reduction', before: '145 μg/m³', after: '5 μg/m³', improvement: '96.6%' },
      { name: 'PM10 Reduction', before: '280 μg/m³', after: '10 μg/m³', improvement: '96.4%' },
      { name: 'VOC Levels', before: '850 ppb', after: '35 ppb', improvement: '95.9%' },
      { name: 'CO2 Levels', before: '1,200 ppm', after: '450 ppm', improvement: '62.5%' }
    ]
  },
  {
    category: 'Environmental Impact',
    metrics: [
      { name: 'Water Usage', before: '450L/day', after: '65L/day', improvement: '85.6%' },
      { name: 'Energy Consumption', before: '45 kWh/day', after: '12 kWh/day', improvement: '73.3%' },
      { name: 'Carbon Footprint', before: '6.2 tons/year', after: '1.7 tons/year', improvement: '72.6%' },
      { name: 'Waste Production', before: '8.5 kg/week', after: '1.2 kg/week', improvement: '85.9%' }
    ]
  },
  {
    category: 'Economic Benefits',
    metrics: [
      { name: 'Monthly Produce Value', before: '₹0', after: '₹25,000+', improvement: 'New Revenue' },
      { name: 'Energy Costs', before: '₹15,000/month', after: '₹3,000/month', improvement: '80.0%' },
      { name: 'Health Expenses', before: '₹12,000/month', after: '₹2,500/month', improvement: '79.2%' },
      { name: 'Property Value', before: 'Base Value', after: '+15% Premium', improvement: '15.0%' }
    ]
  },
  {
    category: 'Health Improvements',
    metrics: [
      { name: 'Respiratory Issues', before: 'Frequent', after: 'Rare/None', improvement: 'Significant' },
      { name: 'Sleep Quality', before: 'Poor', after: 'Excellent', improvement: 'Significant' },
      { name: 'Allergy Symptoms', before: 'Severe', after: 'Minimal', improvement: 'Significant' },
      { name: 'Overall Wellbeing', before: 'Compromised', after: 'Optimal', improvement: 'Significant' }
    ]
  }
];

const galleryImages = [
  {
    url: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Ground Floor Aquaponics System'
  },
  {
    url: 'https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'First Floor Living Wall Integration'
  },
  {
    url: 'https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Rooftop Greenhouse with Agrivoltaic Solar'
  },
  {
    url: 'https://images.pexels.com/photos/4503276/pexels-photo-4503276.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Climate Controlled Growing Area'
  },
  {
    url: 'https://images.pexels.com/photos/4503277/pexels-photo-4503277.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Water Circulation and Filtration System'
  },
  {
    url: 'https://images.pexels.com/photos/4503278/pexels-photo-4503278.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Natural Cooling System Components'
  },
  {
    url: 'https://images.pexels.com/photos/7538686/pexels-photo-7538686.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Fish Tank Ecosystem'
  },
  {
    url: 'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=800',
    caption: 'Media Bed Growing System'
  }
];

export default function DelhiProjectPage() {
  const [mounted, setMounted] = useState(false);
  const [activeFloor, setActiveFloor] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4 px-4 py-2 text-green-700 border-green-200">
                  <Home className="w-4 h-4 mr-2" />
                  Flagship Project
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Delhi Home Project
                  <span className="block text-2xl md:text-3xl mt-2 text-green-700">
                    AQI 15 Demonstration Villa
                  </span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our flagship 800-yard, 3-story villa showcases the complete integration of aquaponics 
                  technology to achieve pristine air quality, natural cooling, and sustainable income 
                  generation in one of Delhi's most polluted areas.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <Wind className="w-8 h-8 text-green-600 flex-shrink-0" />
                    <div>
                      <div className="text-xl font-bold text-green-700">AQI 15</div>
                      <p className="text-sm text-green-600">Consistent Air Quality</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Thermometer className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <div className="text-xl font-bold text-blue-700">25°C</div>
                      <p className="text-sm text-blue-600">Natural Cooling</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <Leaf className="w-8 h-8 text-purple-600 flex-shrink-0" />
                    <div>
                      <div className="text-xl font-bold text-purple-700">15,000</div>
                      <p className="text-sm text-purple-600">Plants Capacity</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <DollarSign className="w-8 h-8 text-orange-600 flex-shrink-0" />
                    <div>
                      <div className="text-xl font-bold text-orange-700">₹25,000+</div>
                      <p className="text-sm text-orange-600">Monthly Income</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-green-700 hover:bg-green-800">
                    <Download className="w-5 h-5 mr-2" />
                    Download Case Study
                  </Button>
                  <Button variant="outline" size="lg" className="border-green-700 text-green-700 hover:bg-green-50">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Video Tour
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Delhi Home Project"
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <div className="flex items-center gap-2 text-white">
                      <MapPin className="w-5 h-5" />
                      <span className="font-medium">South Delhi, India</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-3xl blur-3xl -z-10"></div>
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
                A comprehensive integration of aquaponics technology across a three-story villa, 
                demonstrating the full potential of sustainable living in urban environments.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Maximize className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Property Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Property Type:</span>
                    <span className="font-medium">3-Story Villa</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Area:</span>
                    <span className="font-medium">800 yards</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Built-up Area:</span>
                    <span className="font-medium">5,400 sq.ft.</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Outdoor Space:</span>
                    <span className="font-medium">1,200 sq.ft.</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completion Date:</span>
                    <span className="font-medium">January 2023</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Project Duration:</span>
                    <span className="font-medium">6 months</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Layers className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">System Capacity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Plants:</span>
                    <span className="font-medium">15,000 capacity</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fish Production:</span>
                    <span className="font-medium">120kg annually</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Water Circulation:</span>
                    <span className="font-medium">5,000L/hour</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Growing Area:</span>
                    <span className="font-medium">320 sq.meters</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Plant Varieties:</span>
                    <span className="font-medium">50+ types</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fish Species:</span>
                    <span className="font-medium">Tilapia, Carp</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Key Outcomes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">AQI Improvement:</span>
                    <span className="font-medium text-green-600">94.6%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Temperature Reduction:</span>
                    <span className="font-medium text-blue-600">20°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Revenue:</span>
                    <span className="font-medium text-purple-600">₹25,000+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Energy Savings:</span>
                    <span className="font-medium text-orange-600">80%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Water Savings:</span>
                    <span className="font-medium text-cyan-600">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Carbon Offset:</span>
                    <span className="font-medium text-green-600">4.5 tons/year</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plans */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Floor-by-Floor System Design
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Each floor of the villa serves a specific purpose in our integrated aquaponics system, 
                creating a complete ecosystem that maximizes efficiency and results.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Floor Navigation */}
              <div className="lg:col-span-1">
                <div className="space-y-4 sticky top-24">
                  {floorPlans.map((floor, index) => (
                    <Card 
                      key={index}
                      className={`cursor-pointer transition-all duration-300 ${
                        activeFloor === index ? 'ring-2 ring-green-400 bg-green-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveFloor(index)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">{floor.floor}</h3>
                          <Badge>{floor.plantCapacity} plants</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Floor Details */}
              <div className="lg:col-span-4">
                <Card className="overflow-hidden">
                  <div className="relative h-80">
                    <img
                      src={floorPlans[activeFloor].image}
                      alt={floorPlans[activeFloor].floor}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-700 text-white px-4 py-2">
                        {floorPlans[activeFloor].floor}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {floorPlans[activeFloor].floor}
                      </h3>
                      <Badge variant="outline" className="text-green-700 border-green-200">
                        <Leaf className="w-4 h-4 mr-2" />
                        {floorPlans[activeFloor].plantCapacity} Plant Capacity
                      </Badge>
                    </div>

                    <div className="space-y-4 mb-6">
                      {floorPlans[activeFloor].features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">Technical Specifications:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Ruler className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-700">Area: {activeFloor === 0 ? '1,800' : activeFloor === 1 ? '1,600' : '2,000'} sq.ft.</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-700">Water Usage: {activeFloor === 0 ? '1,200' : activeFloor === 1 ? '800' : '1,000'} L/day</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-700">Power: {activeFloor === 0 ? '1.2' : activeFloor === 1 ? '0.8' : '3.5'} kWh/day</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wind className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-700">AQI Contribution: {activeFloor === 0 ? '40%' : activeFloor === 1 ? '20%' : '40%'}</span>
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
                Our integrated system combines multiple technologies to create a self-sustaining 
                ecosystem that purifies air, regulates temperature, and produces food.
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
                        <Maximize className="w-4 h-4 text-green-600 mt-0.5" />
                        <span className="text-gray-700"><span className="font-medium">Capacity:</span> {component.capacity}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-blue-600 mt-0.5" />
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
                Our Delhi project has achieved remarkable, scientifically-verified improvements 
                across multiple environmental and economic metrics.
              </p>
            </div>

            <Tabs defaultValue="air-quality" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="air-quality">Air Quality</TabsTrigger>
                <TabsTrigger value="environmental-impact">Environmental</TabsTrigger>
                <TabsTrigger value="economic-benefits">Economic</TabsTrigger>
                <TabsTrigger value="health-improvements">Health</TabsTrigger>
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
            <Card className="mt-12 p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Overall Impact Summary
                </h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-700">AQI 15</div>
                    <p className="text-sm text-gray-600">Consistent Air Quality</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-700">20°C</div>
                    <p className="text-sm text-gray-600">Temperature Reduction</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-700">₹25,000+</div>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-700">85%</div>
                    <p className="text-sm text-gray-600">Resource Efficiency</p>
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
                Visual documentation of our Delhi home project showcasing the integration 
                of aquaponics technology throughout the property.
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
                    currentImage === index ? 'border-green-500' : 'border-transparent'
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
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Home?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Schedule a consultation to discuss how we can implement a similar system in your property, 
              customized to your specific needs and space constraints.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
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
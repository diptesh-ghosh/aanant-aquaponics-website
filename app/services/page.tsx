'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  Wind, 
  Leaf, 
  Droplets, 
  Sun, 
  BookOpen,
  Package,
  Eye,
  Calendar,
  ArrowRight,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Settings,
  FileText,
  Ruler,
  Thermometer,
  DollarSign,
  Recycle,
  Zap,
  Building
} from 'lucide-react';

// Service data
const consultationServices = [
  {
    id: 'aqi-assessment',
    title: 'AQI 15 Home Assessment',
    price: 5000,
    description: 'Comprehensive evaluation of your home\'s air quality and implementation potential',
    features: [
      'On-site air quality testing with professional equipment',
      'Detailed analysis of current pollution sources',
      'Custom implementation plan for your specific space',
      'Equipment recommendations and sourcing guidance',
      'ROI calculation and timeline projection'
    ],
    duration: '3-4 hours',
    deliverables: [
      'Comprehensive assessment report',
      'Custom implementation plan',
      'Equipment sourcing guide',
      'ROI projection document'
    ],
    icon: Wind,
    color: 'blue'
  },
  {
    id: 'system-design',
    title: 'System Design Consultation',
    price: 10000,
    description: 'Expert design of your complete aquaponics system with technical specifications',
    features: [
      'Detailed technical drawings and specifications',
      'Complete equipment list with sourcing options',
      'Installation timeline and process documentation',
      'Integration plan for existing structures',
      'Maintenance schedule and protocols'
    ],
    duration: '1-2 days',
    deliverables: [
      'Technical drawings (CAD format and PDF)',
      'Complete equipment specifications',
      'Installation guide',
      'Maintenance manual'
    ],
    icon: Settings,
    color: 'purple'
  },
  {
    id: 'home-transformation',
    title: 'Complete Home Transformation',
    price: 50000,
    description: 'Full-service implementation of your custom aquaponics system',
    features: [
      'End-to-end project management',
      'Equipment procurement and quality verification',
      'Professional installation by trained technicians',
      'System initialization and stabilization',
      'Comprehensive training for maintenance and operation',
      '3 months of ongoing support and troubleshooting'
    ],
    duration: '2-4 weeks',
    deliverables: [
      'Fully operational aquaponics system',
      'Complete documentation package',
      'Training sessions for all family members',
      'Maintenance toolkit and supplies',
      '3-month support package'
    ],
    icon: Home,
    color: 'green'
  }
];

const siteVisits = [
  {
    id: 'delhi-tour',
    title: 'Delhi Home Tour',
    price: 2000,
    description: 'Experience our flagship 800-yard, 3-story villa with AQI 15 and natural cooling',
    features: [
      '3-hour guided tour of all systems',
      'Hands-on demonstrations of key components',
      'Q&A session with Dr. Peter Singh',
      'Air quality monitoring demonstration',
      'Plant selection and placement guidance'
    ],
    location: 'Sainik Farms, Delhi',
    schedule: 'Every Saturday, 10:00 AM - 1:00 PM',
    capacity: '10 participants per session',
    icon: Home,
    color: 'green'
  },
  {
    id: 'goa-experience',
    title: 'Goa Home Experience',
    price: 5000,
    description: '2-day immersive experience at our coastal adaptation site in Dona Paula',
    features: [
      'Comprehensive tour of coastal adaptation techniques',
      'Tropical fruit growing methods demonstration',
      'Saltwater-tolerant system design principles',
      'Japanese garden integration concepts',
      'Overnight stay in AQI 5 environment (accommodations included)'
    ],
    location: 'Dona Paula, Goa',
    schedule: 'First weekend of each month',
    capacity: '6 participants per session',
    icon: Droplets,
    color: 'blue'
  },
  {
    id: 'multi-location',
    title: 'Multi-Location Study Tour',
    price: 15000,
    description: 'Comprehensive 5-day tour of Delhi, Goa, and Lucknow implementation sites',
    features: [
      'Complete system comparison across different environments',
      'Implementation strategy development for your specific needs',
      'Advanced technical training and troubleshooting',
      'Business model development and marketing strategies',
      'Networking with successful implementers',
      'All transportation and accommodations included'
    ],
    location: 'Delhi, Goa, and Lucknow',
    schedule: 'Quarterly (March, June, September, December)',
    capacity: '8 participants per tour',
    icon: MapPin,
    color: 'purple'
  }
];

const equipmentKits = [
  {
    id: 'aqi-monitor-basic',
    title: 'AQI Monitoring Device - Basic',
    price: 8000,
    description: 'Essential air quality monitoring for tracking your system\'s performance',
    features: [
      'PM2.5 and PM10 monitoring',
      'Temperature and humidity sensors',
      'Mobile app integration',
      'Historical data tracking',
      'Calibrated for accuracy'
    ],
    specifications: [
      'Accuracy: ±10% for PM2.5, ±15% for PM10',
      'Battery life: 8 hours',
      'Connectivity: WiFi, Bluetooth',
      'Data storage: 30 days on device, unlimited in cloud'
    ],
    icon: Wind,
    color: 'blue'
  },
  {
    id: 'aqi-monitor-pro',
    title: 'AQI Monitoring Device - Professional',
    price: 15000,
    description: 'Advanced air quality monitoring with comprehensive pollutant tracking',
    features: [
      'PM2.5, PM10, VOCs, CO2, NO2 monitoring',
      'Temperature, humidity, and pressure sensors',
      'Real-time alerts and notifications',
      'Advanced analytics and reporting',
      'Research-grade accuracy'
    ],
    specifications: [
      'Accuracy: ±5% for all pollutants',
      'Battery life: 12 hours',
      'Connectivity: WiFi, Bluetooth, Ethernet',
      'Data storage: 90 days on device, unlimited in cloud',
      'API access for custom integrations'
    ],
    icon: Wind,
    color: 'purple'
  },
  {
    id: 'starter-kit-basic',
    title: 'Aquaponics Starter Kit - Basic',
    price: 25000,
    description: 'Complete system for beginners with 100-plant capacity',
    features: [
      'Compact fish tank (100L) with filtration',
      '4 vertical growing towers (100 plant capacity)',
      'Water pump and air stones',
      'Basic nutrient testing kit',
      'Complete setup guide and video tutorials'
    ],
    specifications: [
      'Dimensions: 6ft x 3ft footprint',
      'Power consumption: 60W',
      'Water usage: 100L initial, 10L weekly',
      'Plant capacity: 100 plants',
      'Fish capacity: 10-15 tilapia'
    ],
    icon: Leaf,
    color: 'green'
  },
  {
    id: 'starter-kit-advanced',
    title: 'Aquaponics Starter Kit - Advanced',
    price: 75000,
    description: 'Professional-grade system with 500-plant capacity and automation',
    features: [
      'Dual fish tanks (200L each) with advanced filtration',
      '12 vertical growing towers (500 plant capacity)',
      'Automated water testing and nutrient dosing',
      'Solar backup power system',
      'Remote monitoring and control capabilities',
      'Professional installation and training included'
    ],
    specifications: [
      'Dimensions: 12ft x 6ft footprint',
      'Power consumption: 120W (with solar backup)',
      'Water usage: 400L initial, 30L weekly',
      'Plant capacity: 500 plants',
      'Fish capacity: 40-50 tilapia or carp',
      'Expected monthly income: ₹15,000-25,000'
    ],
    icon: Leaf,
    color: 'green'
  },
  {
    id: 'solar-system',
    title: 'Solar System Components',
    price: 35000,
    description: 'Renewable energy solution for powering your aquaponics system',
    features: [
      '1kW solar panel array',
      'Charge controller and battery storage',
      'Inverter for AC power',
      'Monitoring system for energy production',
      'Complete installation kit'
    ],
    specifications: [
      'Solar panels: 4 x 250W monocrystalline',
      'Battery: 200Ah lithium iron phosphate',
      'Inverter: 1500W pure sine wave',
      'Expected daily output: 4-5kWh',
      'Backup capacity: 2-3 days'
    ],
    icon: Sun,
    color: 'yellow'
  },
  {
    id: 'water-filtration',
    title: 'Water Filtration System',
    price: 12000,
    description: 'Advanced water purification for optimal plant and fish health',
    features: [
      'Mechanical filtration for solid waste removal',
      'Biological filtration for ammonia conversion',
      'UV sterilization for pathogen control',
      'Mineral balancing system',
      'Automated monitoring and control'
    ],
    specifications: [
      'Filtration capacity: 1000L/hour',
      'Power consumption: 40W',
      'Dimensions: 2ft x 2ft x 3ft',
      'Maintenance: Monthly cleaning',
      'Expected lifespan: 5+ years'
    ],
    icon: Droplets,
    color: 'blue'
  },
  {
    id: 'composting-system',
    title: 'Composting Equipment',
    price: 8000,
    description: 'Complete system for converting kitchen waste into valuable nutrients',
    features: [
      'Dual-chamber composting bin',
      'Worm composting system',
      'Compost tea brewer',
      'Testing kit for nutrient analysis',
      'Odor control system'
    ],
    specifications: [
      'Capacity: 100L (50L per chamber)',
      'Processing time: 4-6 weeks',
      'Dimensions: 3ft x 2ft x 3ft',
      'Waste capacity: 5-7kg per week',
      'Compost output: 2-3kg per month'
    ],
    icon: Recycle,
    color: 'green'
  }
];

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('consultation');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200',
      yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-2 text-green-700 border-green-200">
                <Leaf className="w-4 h-4 mr-2" />
                Complete Solutions
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                Comprehensive{' '}
                <span className="text-green-700">Sustainable Living Services</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From expert consultation to complete home transformation, equipment, and site visits,
                we offer everything you need to achieve pristine air quality and sustainable living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="consultation" onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="consultation">Consultation Services</TabsTrigger>
                <TabsTrigger value="site-visits">Site Visit Packages</TabsTrigger>
                <TabsTrigger value="equipment">Equipment & Starter Kits</TabsTrigger>
              </TabsList>

              {/* Consultation Services Tab */}
              <TabsContent value="consultation" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Expert Consultation Services
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Our consultation services provide expert guidance for implementing sustainable living solutions
                    tailored to your specific needs and space constraints.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {consultationServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Card key={service.id} className="hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getColorClasses(service.color)}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <CardTitle className="text-xl">{service.title}</CardTitle>
                          <p className="text-2xl font-bold text-green-700 mt-2">
                            ₹{service.price.toLocaleString()}
                          </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-600">{service.description}</p>
                          
                          <div className="space-y-2">
                            <p className="font-medium text-gray-900">Includes:</p>
                            {service.features.map((feature, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="pt-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <Clock className="w-4 h-4" />
                              <span>Duration: {service.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FileText className="w-4 h-4" />
                              <span>Deliverables: {service.deliverables.length} items</span>
                            </div>
                          </div>
                          
                          <Button className="w-full bg-green-700 hover:bg-green-800 mt-4">
                            Book Consultation
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Process Overview */}
                <Card className="mt-12 p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
                      Our Consultation Process
                    </h3>
                    
                    <div className="grid md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                          <span className="text-xl font-bold text-green-700">1</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Initial Assessment</h4>
                        <p className="text-sm text-gray-600">
                          Comprehensive evaluation of your space, needs, and goals
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                          <span className="text-xl font-bold text-blue-700">2</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Custom Design</h4>
                        <p className="text-sm text-gray-600">
                          Tailored solution design based on your specific requirements
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                          <span className="text-xl font-bold text-purple-700">3</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Implementation</h4>
                        <p className="text-sm text-gray-600">
                          Professional installation and system setup
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                          <span className="text-xl font-bold text-orange-700">4</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Ongoing Support</h4>
                        <p className="text-sm text-gray-600">
                          Continuous guidance and troubleshooting assistance
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Site Visit Packages Tab */}
              <TabsContent value="site-visits" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Immersive Site Visit Experiences
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Experience our successful implementations firsthand with guided tours of our demonstration sites
                    across India, led by Dr. Peter Singh and our expert team.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {siteVisits.map((visit) => {
                    const Icon = visit.icon;
                    return (
                      <Card key={visit.id} className="hover:shadow-xl transition-all duration-300">
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                          <img
                            src={visit.id === 'delhi-tour' 
                              ? 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800'
                              : visit.id === 'goa-experience'
                                ? 'https://images.pexels.com/photos/6231753/pexels-photo-6231753.jpeg?auto=compress&cs=tinysrgb&w=800'
                                : 'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=800'
                            }
                            alt={visit.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute top-4 left-4">
                            <Badge className={`bg-${visit.color}-700 text-white`}>
                              <Icon className="w-3 h-3 mr-1" />
                              {visit.id === 'delhi-tour' ? 'Delhi' : visit.id === 'goa-experience' ? 'Goa' : 'Multi-Location'}
                            </Badge>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h3 className="text-xl font-bold">{visit.title}</h3>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4" />
                              <span>{visit.location}</span>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant="outline" className="text-green-700 border-green-200">
                              <Users className="w-3 h-3 mr-1" />
                              {visit.capacity}
                            </Badge>
                            <div className="text-xl font-bold text-green-700">
                              ₹{visit.price.toLocaleString()}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4 text-sm">{visit.description}</p>
                          
                          <div className="space-y-2 mb-4">
                            <p className="font-medium text-gray-900 text-sm">Includes:</p>
                            {visit.features.slice(0, 3).map((feature, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-gray-700">{feature}</span>
                              </div>
                            ))}
                            {visit.features.length > 3 && (
                              <p className="text-xs text-gray-500 pl-6">
                                +{visit.features.length - 3} more features
                              </p>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
                            <Calendar className="w-4 h-4" />
                            <span>{visit.schedule}</span>
                          </div>
                          
                          <Button className="w-full bg-green-700 hover:bg-green-800">
                            Book Visit
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Testimonials */}
                <Card className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
                      What Visitors Say
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-white p-6 rounded-lg border">
                        <div className="flex items-center gap-3 mb-4">
                          <img
                            src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                            alt="Jahnavi Prasada"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900">Jahnavi Prasada</h4>
                            <p className="text-xs text-gray-600">Resort Owner, Nainital</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 italic">
                          "An insightful 10 days into the world of Aquaponics. The Aanant Aquaponics team of Peter and Neeno have opened a whole new world in organic farming in the hills of Kumaon for me."
                        </p>
                      </div>
                      
                      <div className="bg-white p-6 rounded-lg border">
                        <div className="flex items-center gap-3 mb-4">
                          <img
                            src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
                            alt="Rajesh Kumar"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900">Rajesh Kumar</h4>
                            <p className="text-xs text-gray-600">Software Engineer, Gurgaon</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 italic">
                          "The Delhi home tour was eye-opening. Seeing the system in action and being able to ask questions directly to Dr. Singh made all the difference in my implementation."
                        </p>
                      </div>
                      
                      <div className="bg-white p-6 rounded-lg border">
                        <div className="flex items-center gap-3 mb-4">
                          <img
                            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400"
                            alt="Mohammed Ali"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900">Mohammed Ali</h4>
                            <p className="text-xs text-gray-600">Marketing Manager, Noida</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 italic">
                          "The multi-location tour was worth every rupee. Seeing the different implementations across various environments helped me design the perfect system for my home."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Equipment & Starter Kits Tab */}
              <TabsContent value="equipment" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Professional Equipment & Starter Kits
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    High-quality equipment and complete starter kits designed and tested by Dr. Peter Singh
                    for optimal performance and reliability.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {equipmentKits.map((kit) => {
                    const Icon = kit.icon;
                    return (
                      <Card key={kit.id} className="hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getColorClasses(kit.color)}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <CardTitle className="text-lg">{kit.title}</CardTitle>
                          <p className="text-2xl font-bold text-green-700 mt-2">
                            ₹{kit.price.toLocaleString()}
                          </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-600 text-sm">{kit.description}</p>
                          
                          <div className="space-y-2">
                            <p className="font-medium text-gray-900 text-sm">Includes:</p>
                            {kit.features.map((feature, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-2">
                            <p className="font-medium text-gray-900 text-sm">Specifications:</p>
                            {kit.specifications.map((spec, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                                <span className="text-xs text-gray-700">{spec}</span>
                              </div>
                            ))}
                          </div>
                          
                          <Button className="w-full bg-green-700 hover:bg-green-800 mt-4">
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Custom Solutions */}
                <Card className="mt-12 p-8 bg-gradient-to-r from-gray-50 to-blue-50 border-blue-200">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
                      Need a Custom Solution?
                    </h3>
                    <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
                      We offer custom equipment configurations and specialized components for unique requirements.
                      Contact our technical team for a personalized recommendation.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card className="bg-white">
                        <CardContent className="p-6 text-center">
                          <Ruler className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                          <h4 className="font-semibold text-gray-900 mb-2">Custom Sizing</h4>
                          <p className="text-sm text-gray-600">
                            Systems designed for your specific space constraints
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white">
                        <CardContent className="p-6 text-center">
                          <Thermometer className="w-12 h-12 text-red-600 mx-auto mb-4" />
                          <h4 className="font-semibold text-gray-900 mb-2">Climate Adaptation</h4>
                          <p className="text-sm text-gray-600">
                            Specialized components for extreme climates
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white">
                        <CardContent className="p-6 text-center">
                          <Building className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                          <h4 className="font-semibold text-gray-900 mb-2">Commercial Scale</h4>
                          <p className="text-sm text-gray-600">
                            Large-scale systems for businesses and institutions
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="text-center mt-8">
                      <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                        Request Custom Quote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Expected Outcomes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Measurable Outcomes You Can Expect
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our services deliver consistent, measurable results across air quality, health, and financial metrics.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Wind className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-blue-700 mb-2">AQI 15-25</h3>
                  <p className="text-gray-700 mb-4">
                    Consistent air quality improvement to pristine levels, regardless of external pollution.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>94.6% average improvement</strong> across all implementations
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Thermometer className="w-16 h-16 text-red-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-red-700 mb-2">Natural Cooling</h3>
                  <p className="text-gray-700 mb-4">
                    Significant temperature reduction without air conditioning, especially in summer months.
                  </p>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-700">
                      <strong>15-20°C reduction</strong> during peak summer temperatures
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-700 mb-2">Monthly Income</h3>
                  <p className="text-gray-700 mb-4">
                    Sustainable revenue from organic produce sales, with minimal ongoing costs.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-700">
                      <strong>₹15,000-25,000 monthly</strong> from weekend vegetable sales
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Calendar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Book Your Service
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Select your preferred service and date to begin your sustainable living journey.
              </p>
            </div>

            <Card className="p-8">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      Available Services
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-3">
                          <Wind className="w-6 h-6 text-green-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">AQI 15 Home Assessment</h4>
                            <p className="text-sm text-gray-600">3-4 hours on-site evaluation</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-700">₹5,000</div>
                          <Button size="sm" className="mt-2 bg-green-700 hover:bg-green-800">
                            Select
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-3">
                          <Settings className="w-6 h-6 text-blue-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">System Design Consultation</h4>
                            <p className="text-sm text-gray-600">1-2 days comprehensive design</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-blue-700">₹10,000</div>
                          <Button size="sm" className="mt-2 bg-blue-700 hover:bg-blue-800">
                            Select
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-center gap-3">
                          <Home className="w-6 h-6 text-purple-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Delhi Home Tour</h4>
                            <p className="text-sm text-gray-600">3-hour guided tour (Saturdays only)</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-purple-700">₹2,000</div>
                          <Button size="sm" className="mt-2 bg-purple-700 hover:bg-purple-800">
                            Select
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-3">
                          <Package className="w-6 h-6 text-yellow-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Aquaponics Starter Kit</h4>
                            <p className="text-sm text-gray-600">Complete system with installation</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-yellow-700">₹25,000</div>
                          <Button size="sm" className="mt-2 bg-yellow-700 hover:bg-yellow-800">
                            Select
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      Select Date & Time
                    </h3>
                    
                    <div className="bg-gray-50 p-6 rounded-lg border mb-6">
                      <div className="text-center mb-4">
                        <p className="text-gray-600">May 2025</p>
                      </div>
                      
                      <div className="grid grid-cols-7 gap-2 mb-4">
                        <div className="text-center text-sm text-gray-500">Su</div>
                        <div className="text-center text-sm text-gray-500">Mo</div>
                        <div className="text-center text-sm text-gray-500">Tu</div>
                        <div className="text-center text-sm text-gray-500">We</div>
                        <div className="text-center text-sm text-gray-500">Th</div>
                        <div className="text-center text-sm text-gray-500">Fr</div>
                        <div className="text-center text-sm text-gray-500">Sa</div>
                      </div>
                      
                      <div className="grid grid-cols-7 gap-2">
                        {[...Array(31)].map((_, i) => (
                          <Button 
                            key={i} 
                            variant={i === 14 ? 'default' : 'outline'} 
                            className="h-10 p-0"
                          >
                            {i + 1}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <p className="font-medium text-gray-900">Available Time Slots:</p>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" className="text-sm">9:00 AM</Button>
                        <Button variant="outline" className="text-sm">11:00 AM</Button>
                        <Button variant="default" className="text-sm">2:00 PM</Button>
                        <Button variant="outline" className="text-sm">4:00 PM</Button>
                        <Button variant="outline" className="text-sm">6:00 PM</Button>
                      </div>
                    </div>
                    
                    <Button size="lg" className="w-full bg-green-700 hover:bg-green-800">
                      Confirm Booking
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Have Questions?
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our expert team is ready to assist you with any questions about our services.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-600 mb-4">Speak directly with our service team</p>
                  <p className="text-xl font-bold text-green-700">+91 98765 43210</p>
                  <p className="text-sm text-gray-500 mt-2">Monday-Saturday, 9 AM - 6 PM</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600 mb-4">Send your inquiries anytime</p>
                  <p className="text-xl font-bold text-blue-700">services@aanantaquaponics.com</p>
                  <p className="text-sm text-gray-500 mt-2">24-48 hour response time</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Visit Us</h3>
                  <p className="text-gray-600 mb-4">Schedule a visit to our demonstration site</p>
                  <p className="text-xl font-bold text-purple-700">Sainik Farms, Delhi</p>
                  <p className="text-sm text-gray-500 mt-2">By appointment only</p>
                </CardContent>
              </Card>
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
              Take the first step toward pristine air quality, natural cooling, and sustainable income.
              Our expert team is ready to help you create your personalized solution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                Book a Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                View Our Projects
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
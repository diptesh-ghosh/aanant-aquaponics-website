'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Image, 
  Calendar, 
  MapPin, 
  Leaf, 
  Wind, 
  Fish,
  Thermometer,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Play,
  Download,
  Info
} from 'lucide-react';

// Define the gallery data structure
const galleryData = {
  locations: [
    {
      id: 'delhi',
      name: 'Delhi Home',
      description: '800 yards, 3-story villa in Sainik Farms',
      specs: {
        plants: '15,000 plants across 3 floors',
        fish: '120kg annually (Carp, fresh water fish)',
        aqi: 'AQI 15 consistently',
        cooling: '25°C inside when 45°C outside'
      },
      floors: [
        {
          name: 'Ground Floor',
          description: '3,000 plants in greenhouse with fish tanks',
          images: [
            'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/4503276/pexels-photo-4503276.jpeg?auto=compress&cs=tinysrgb&w=800'
          ]
        },
        {
          name: 'First Floor',
          description: '1,000 plants in vertical growing walls',
          images: [
            'https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/4503277/pexels-photo-4503277.jpeg?auto=compress&cs=tinysrgb&w=800'
          ]
        },
        {
          name: 'Second Floor',
          description: '5,000 plants under Agrivoltaic solar',
          images: [
            'https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/4503278/pexels-photo-4503278.jpeg?auto=compress&cs=tinysrgb&w=800'
          ]
        },
        {
          name: 'Climate Controlled Area',
          description: '5,000 plants in aeroponic towers',
          images: [
            'https://images.pexels.com/photos/7538686/pexels-photo-7538686.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=800'
          ]
        }
      ]
    },
    {
      id: 'goa',
      name: 'Goa Home',
      description: '180m villa in Dona Paula',
      specs: {
        plants: '5,000 plants',
        fish: '120kg (Seabass, Carp, Prawns)',
        aqi: 'AQI 5 consistently',
        cooling: 'Natural sea breeze integration'
      },
      floors: [
        {
          name: 'Rooftop Greenhouse',
          description: 'Aquaponic Japanese garden with ocean view',
          images: [
            'https://images.pexels.com/photos/6231753/pexels-photo-6231753.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=800'
          ]
        },
        {
          name: 'Coastal Fish Tanks',
          description: 'Specialized tanks for seabass and prawns',
          images: [
            'https://images.pexels.com/photos/7538686/pexels-photo-7538686.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800'
          ]
        }
      ]
    },
    {
      id: 'lucknow',
      name: 'Lucknow Home',
      description: 'Daughter\'s residence in Hazratganj',
      specs: {
        plants: '2,000 plants',
        fish: 'Underground fish tanks',
        aqi: 'AQI 18 consistently',
        cooling: 'Natural cooling system'
      },
      floors: [
        {
          name: 'Ground-Level Media Beds',
          description: 'Integrated with garden landscape',
          images: [
            'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/7538686/pexels-photo-7538686.jpeg?auto=compress&cs=tinysrgb&w=800'
          ]
        },
        {
          name: 'Fruit Tree Integration',
          description: 'Nutrient-rich water for orchard',
          images: [
            'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/6231753/pexels-photo-6231753.jpeg?auto=compress&cs=tinysrgb&w=800'
          ]
        }
      ]
    }
  ],
  harvests: [
    {
      id: 'may-2025',
      date: 'May 15, 2025',
      location: 'Delhi',
      description: 'Weekly harvest of vegetables and herbs',
      items: 'Spring onions (2 kg), Oyster mushrooms (1.5 kg), Celery bunches (8 pieces), Parsley (1 kg), Mint leaves (500g), Microgreens (12 trays), Spinach (3 kg), Lettuce heads (15 pieces)',
      quantity: '240 plants',
      revenue: '₹2,400',
      images: [
        'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      id: 'april-2025',
      date: 'April 26, 2025',
      location: 'Delhi',
      description: 'Weekly harvest of seasonal vegetables',
      items: 'Lettuce, spinach, cherry tomatoes, basil, cilantro, mint, microgreens',
      quantity: '235 plants',
      revenue: '₹23,500',
      images: [
        'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4198020/pexels-photo-4198020.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4503277/pexels-photo-4503277.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      id: 'april-2025-2',
      date: 'April 12, 2025',
      location: 'Delhi',
      description: 'Weekly harvest of premium produce',
      items: 'Premium lettuce, baby spinach, heirloom tomatoes, specialty herbs, edible flowers',
      quantity: '250 plants',
      revenue: '₹27,500',
      images: [
        'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4503276/pexels-photo-4503276.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    }
  ],
  systems: [
    {
      id: 'fish-tanks',
      name: 'Fish Tanks',
      description: 'Four 1,000L tanks housing tilapia and carp in balanced ecosystem',
      specs: {
        capacity: '120kg fish production annually',
        maintenance: 'Monthly water testing, quarterly cleaning'
      },
      images: [
        'https://images.pexels.com/photos/7538686/pexels-photo-7538686.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      id: 'grow-beds',
      name: 'Grow Beds',
      description: 'Specialized media beds with expanded clay pellets for optimal root development',
      specs: {
        capacity: '8,000 plants in active rotation',
        maintenance: 'Bi-annual media cleaning, monthly inspection'
      },
      images: [
        'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      id: 'vertical-towers',
      name: 'Vertical Towers',
      description: 'Space-efficient vertical growing systems integrated into living spaces',
      specs: {
        capacity: '3,000 plants in decorative arrangements',
        maintenance: 'Weekly inspection, monthly cleaning'
      },
      images: [
        'https://images.pexels.com/photos/6231753/pexels-photo-6231753.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      id: 'agrivoltaic-solar',
      name: 'Agrivoltaic Solar',
      description: 'Dual-purpose solar panels providing energy while creating optimal growing conditions',
      specs: {
        capacity: '5kW electricity + 4,000 plants underneath',
        maintenance: 'Quarterly panel cleaning, annual system check'
      },
      images: [
        'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/4503278/pexels-photo-4503278.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    }
  ]
};

export default function GalleryPage() {
  const [mounted, setMounted] = useState(false);
  const [activeLocation, setActiveLocation] = useState('delhi');
  const [activeFloor, setActiveFloor] = useState(0);
  const [activeHarvest, setActiveHarvest] = useState('may-2025');
  const [activeSystem, setActiveSystem] = useState('fish-tanks');
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState('locations');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Find the currently selected location
  const selectedLocation = galleryData.locations.find(loc => loc.id === activeLocation);
  
  // Find the currently selected floor
  const selectedFloor = selectedLocation?.floors[activeFloor];
  
  // Find the currently selected harvest
  const selectedHarvest = galleryData.harvests.find(harvest => harvest.id === activeHarvest);
  
  // Find the currently selected system
  const selectedSystem = galleryData.systems.find(system => system.id === activeSystem);

  // Get the current images based on active tab and selection
  const getCurrentImages = () => {
    if (activeTab === 'locations' && selectedFloor?.images) {
      return selectedFloor.images;
    } else if (activeTab === 'harvests' && selectedHarvest?.images) {
      return selectedHarvest.images;
    } else if (activeTab === 'systems' && selectedSystem?.images) {
      return selectedSystem.images;
    }
    return [];
  };

  const images = getCurrentImages();
  
  // Navigation functions
  const nextImage = () => {
    if (images && images.length > 0) {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images && images.length > 0) {
      setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    }
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
                <Image className="w-4 h-4 mr-2" />
                Visual Documentation
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                Live Harvest Gallery &{' '}
                <span className="text-green-700">Real Results</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore our comprehensive visual documentation of weekly harvests, system components, 
                and real results from our Delhi, Goa, and Lucknow homes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <Tabs defaultValue="locations" onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="locations">Location Galleries</TabsTrigger>
                <TabsTrigger value="harvests">Recent Harvests</TabsTrigger>
                <TabsTrigger value="systems">System Components</TabsTrigger>
              </TabsList>

              {/* Locations Tab */}
              <TabsContent value="locations" className="space-y-8">
                {/* Location Selection */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {galleryData.locations.map((location) => (
                    <Button
                      key={location.id}
                      variant={activeLocation === location.id ? 'default' : 'outline'}
                      onClick={() => {
                        setActiveLocation(location.id);
                        setActiveFloor(0);
                        setCurrentImage(0);
                      }}
                      className="flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      {location.name}
                    </Button>
                  ))}
                </div>

                {/* Location Details */}
                {selectedLocation && (
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-green-600" />
                        {selectedLocation.name}
                      </CardTitle>
                      <p className="text-gray-600">{selectedLocation.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                          <Leaf className="w-6 h-6 text-green-600 flex-shrink-0" />
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">Plants</div>
                            <div className="text-gray-600">{selectedLocation.specs.plants}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <Fish className="w-6 h-6 text-blue-600 flex-shrink-0" />
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">Fish</div>
                            <div className="text-gray-600">{selectedLocation.specs.fish}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <Wind className="w-6 h-6 text-purple-600 flex-shrink-0" />
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">Air Quality</div>
                            <div className="text-gray-600">{selectedLocation.specs.aqi}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <Thermometer className="w-6 h-6 text-orange-600 flex-shrink-0" />
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">Cooling</div>
                            <div className="text-gray-600">{selectedLocation.specs.cooling}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Floor Selection */}
                {selectedLocation && selectedLocation.floors && (
                  <div className="grid lg:grid-cols-5 gap-8">
                    {/* Floor Navigation */}
                    <div className="lg:col-span-1">
                      <div className="space-y-4 sticky top-24">
                        {selectedLocation.floors.map((floor, index) => (
                          <Card 
                            key={index}
                            className={`cursor-pointer transition-all duration-300 ${
                              activeFloor === index ? 'ring-2 ring-green-400 bg-green-50' : 'hover:bg-gray-50'
                            }`}
                            onClick={() => {
                              setActiveFloor(index);
                              setCurrentImage(0);
                            }}
                          >
                            <CardContent className="p-4">
                              <div className="font-medium text-gray-900">{floor.name}</div>
                              <p className="text-sm text-gray-600 truncate">{floor.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Image Display */}
                    <div className="lg:col-span-4">
                      {selectedFloor && (
                        <div className="space-y-6">
                          <div className="relative">
                            {selectedFloor.images && selectedFloor.images.length > 0 && (
                              <div className="relative h-96 rounded-lg overflow-hidden">
                                <img
                                  src={selectedFloor.images[currentImage]}
                                  alt={selectedFloor.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                  <h3 className="text-xl font-bold">{selectedFloor.name}</h3>
                                  <p>{selectedFloor.description}</p>
                                </div>
                              </div>
                            )}
                            
                            {selectedFloor.images && selectedFloor.images.length > 1 && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                                  onClick={prevImage}
                                >
                                  <ChevronLeft className="w-6 h-6" />
                                </Button>
                                
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                                  onClick={nextImage}
                                >
                                  <ChevronRight className="w-6 h-6" />
                                </Button>
                              </>
                            )}
                          </div>

                          {/* Thumbnail Navigation */}
                          {selectedFloor.images && selectedFloor.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                              {selectedFloor.images.map((image, index) => (
                                <div 
                                  key={index}
                                  className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                                    currentImage === index ? 'border-green-500' : 'border-transparent'
                                  }`}
                                  onClick={() => setCurrentImage(index)}
                                >
                                  <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-16 object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Harvests Tab */}
              <TabsContent value="harvests" className="space-y-8">
                {/* Harvest Selection */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {galleryData.harvests.map((harvest) => (
                    <Button
                      key={harvest.id}
                      variant={activeHarvest === harvest.id ? 'default' : 'outline'}
                      onClick={() => {
                        setActiveHarvest(harvest.id);
                        setCurrentImage(0);
                      }}
                      className="flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      {harvest.date}
                    </Button>
                  ))}
                </div>

                {/* Harvest Details */}
                {selectedHarvest && (
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-green-600" />
                        Harvest: {selectedHarvest.date}
                      </CardTitle>
                      <p className="text-gray-600">{selectedHarvest.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                          <Leaf className="w-6 h-6 text-green-600 flex-shrink-0" />
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">Items</div>
                            <div className="text-gray-600">{selectedHarvest.items}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0" />
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">Location</div>
                            <div className="text-gray-600">{selectedHarvest.location}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <DollarSign className="w-6 h-6 text-purple-600 flex-shrink-0" />
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">Revenue</div>
                            <div className="text-gray-600">{selectedHarvest.revenue} ({selectedHarvest.quantity})</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Image Display */}
                {selectedHarvest && selectedHarvest.images && (
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="relative h-96 rounded-lg overflow-hidden">
                        <img
                          src={selectedHarvest.images[currentImage]}
                          alt={`Harvest on ${selectedHarvest.date}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                          <h3 className="text-xl font-bold">{selectedHarvest.date} Harvest</h3>
                          <p>{selectedHarvest.description}</p>
                        </div>
                      </div>
                      
                      {selectedHarvest.images.length > 1 && (
                        <>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                            onClick={prevImage}
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                            onClick={nextImage}
                          >
                            <ChevronRight className="w-6 h-6" />
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Thumbnail Navigation */}
                    {selectedHarvest.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {selectedHarvest.images.map((image, index) => (
                          <div 
                            key={index}
                            className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                              currentImage === index ? 'border-green-500' : 'border-transparent'
                            }`}
                            onClick={() => setCurrentImage(index)}
                          >
                            <img
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-16 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>

              {/* Systems Tab */}
              <TabsContent value="systems" className="space-y-8">
                {/* System Selection */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {galleryData.systems.map((system) => (
                    <Button
                      key={system.id}
                      variant={activeSystem === system.id ? 'default' : 'outline'}
                      onClick={() => {
                        setActiveSystem(system.id);
                        setCurrentImage(0);
                      }}
                      className="flex items-center gap-2"
                    >
                      {system.name}
                    </Button>
                  ))}
                </div>

                {/* System Details */}
                {selectedSystem && (
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Info className="w-5 h-5 text-blue-600" />
                        {selectedSystem.name}
                      </CardTitle>
                      <p className="text-gray-600">{selectedSystem.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <Leaf className="w-6 h-6 text-blue-600 flex-shrink-0" />
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">Capacity</div>
                            <div className="text-gray-600">{selectedSystem.specs.capacity}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                          <Calendar className="w-6 h-6 text-green-600 flex-shrink-0" />
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">Maintenance</div>
                            <div className="text-gray-600">{selectedSystem.specs.maintenance}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Image Display */}
                {selectedSystem && selectedSystem.images && (
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="relative h-96 rounded-lg overflow-hidden">
                        <img
                          src={selectedSystem.images[currentImage]}
                          alt={selectedSystem.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                          <h3 className="text-xl font-bold">{selectedSystem.name}</h3>
                          <p>{selectedSystem.description}</p>
                        </div>
                      </div>
                      
                      {selectedSystem.images.length > 1 && (
                        <>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                            onClick={prevImage}
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                            onClick={nextImage}
                          >
                            <ChevronRight className="w-6 h-6" />
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Thumbnail Navigation */}
                    {selectedSystem.images.length > 1 && (
                      <div className="grid grid-cols-2 gap-2">
                        {selectedSystem.images.map((image, index) => (
                          <div 
                            key={index}
                            className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                              currentImage === index ? 'border-green-500' : 'border-transparent'
                            }`}
                            onClick={() => setCurrentImage(index)}
                          >
                            <img
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-24 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Download Technical Documentation
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Access detailed technical specifications, system designs, and implementation guides
              for our proven aquaponics methodology.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">System Blueprints</h3>
                  <p className="text-sm text-gray-600 mb-4">Complete technical drawings and specifications</p>
                  <Button className="w-full bg-green-700 hover:bg-green-800">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Fish className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Maintenance Guide</h3>
                  <p className="text-sm text-gray-600 mb-4">Step-by-step maintenance procedures</p>
                  <Button className="w-full bg-blue-700 hover:bg-blue-800">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Income Guide</h3>
                  <p className="text-sm text-gray-600 mb-4">Revenue generation strategies and pricing</p>
                  <Button className="w-full bg-purple-700 hover:bg-purple-800">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
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
              Ready to Create Your Own Success Story?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Join 750+ families who have transformed their lives through our scientifically-proven 
              aquaponics methodology. Clean air, better health, and sustainable income await.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                Schedule a Consultation
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Play className="w-5 h-5 mr-2" />
                Watch Video Tour
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Home, 
  Waves, 
  TreePine, 
  ChevronLeft, 
  ArrowRight, 
  CheckCircle, 
  Phone, 
  Mail, 
  Info, 
  Smartphone,
  CreditCard
} from 'lucide-react';

// Location data
const locations = [
  {
    id: 'delhi',
    name: 'Delhi Home Tour',
    subtitle: 'Sainik Farms',
    description: 'Experience our flagship 800-yard, 3-story villa with AQI 15 and natural cooling',
    price: 2000,
    studentPrice: 1500,
    duration: '3 hours',
    schedule: 'Saturdays 10 AM - 1 PM, Sundays 2 PM - 5 PM',
    maxGroupSize: 8,
    features: [
      'All floor systems tour',
      'Live AQI measurements',
      'Fish tank demonstrations',
      'Plant selection guidance',
      'Q&A with Dr. Peter Singh'
    ],
    highlights: [
      { title: 'AQI 15 Achievement', description: 'Experience pristine air quality in one of Delhi\'s most polluted areas' },
      { title: 'Natural Cooling System', description: '25°C inside when 45°C outside without air conditioning' },
      { title: 'Income Generation', description: 'See how the system produces ₹25,000+ monthly revenue' },
      { title: 'Complete Ecosystem', description: 'Witness the integration of fish, plants, and natural processes' }
    ],
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Home,
    color: 'green'
  },
  {
    id: 'goa',
    name: 'Goa Home Experience',
    subtitle: 'Dona Paula Villa',
    description: 'Immerse yourself in our coastal adaptation with Japanese garden aesthetics',
    price: 5000,
    studentPrice: 4000,
    duration: '2 days',
    schedule: 'Weekend packages available',
    maxGroupSize: 6,
    features: [
      'Coastal aquaponics systems',
      'Tropical fruit growing techniques',
      'Hands-on workshops',
      'Japanese garden integration',
      'Seabass and prawn aquaponics'
    ],
    highlights: [
      { title: 'Coastal Adaptation', description: 'Specialized system designed for coastal environments and salt exposure' },
      { title: 'Japanese Garden Integration', description: 'Beautiful blend of functionality and traditional aesthetics' },
      { title: 'Diverse Fish Species', description: 'Seabass, carp, and prawn cultivation in integrated system' },
      { title: 'Tourism Integration', description: 'Learn how to create systems that serve as both functional farms and attractions' }
    ],
    image: 'https://images.pexels.com/photos/6231753/pexels-photo-6231753.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: Waves,
    color: 'blue'
  },
  {
    id: 'lucknow',
    name: 'Lucknow Home Visit',
    subtitle: 'Daughter\'s Residence',
    description: 'See our compact urban system perfect for family homes',
    price: 1500,
    studentPrice: 1200,
    duration: 'Half-day',
    schedule: 'By appointment only',
    maxGroupSize: 6,
    features: [
      'Compact urban system demonstration',
      'Underground fish tanks',
      'Fruit tree integration',
      'Family-friendly design',
      'Small space optimization'
    ],
    highlights: [
      { title: 'Underground Fish Tanks', description: 'Innovative concealed system that maintains optimal temperature' },
      { title: 'Fruit Tree Integration', description: 'Specialized system supporting existing fruit trees with nutrient-rich water' },
      { title: 'Family-Friendly Design', description: 'Child-safe system with educational components' },
      { title: 'Heritage Property Adaptation', description: 'Implementation respecting architectural integrity' }
    ],
    image: 'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=800',
    icon: TreePine,
    color: 'amber'
  }
];

// Available dates (mock data)
const availableDates = [
  { date: '2025-05-15', location: 'delhi', slots: ['10:00 AM', '2:00 PM'] },
  { date: '2025-05-16', location: 'delhi', slots: ['10:00 AM'] },
  { date: '2025-05-17', location: 'delhi', slots: ['10:00 AM', '2:00 PM'] },
  { date: '2025-05-18', location: 'delhi', slots: ['2:00 PM'] },
  { date: '2025-05-20', location: 'lucknow', slots: ['11:00 AM', '3:00 PM'] },
  { date: '2025-05-21', location: 'lucknow', slots: ['11:00 AM'] },
  { date: '2025-05-24', location: 'goa', slots: ['Full Weekend Package'] },
  { date: '2025-05-31', location: 'goa', slots: ['Full Weekend Package'] }
];

// Testimonials
const testimonials = [
  {
    name: 'Rajesh Kumar',
    location: 'Gurgaon',
    quote: 'Seeing their AQI 15 home in person convinced me this is possible in Delhi. The tour was incredibly informative and inspiring.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Priya Sharma',
    location: 'Delhi',
    quote: 'The fish tanks and plant systems integration is incredible to witness live. I learned more in 3 hours than in weeks of online research.',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Mohammed Ali',
    location: 'Noida',
    quote: 'The Goa experience was worth every rupee. Seeing how the system adapts to coastal conditions gave me confidence for my own implementation.',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export default function VisitPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('delhi');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [participants, setParticipants] = useState(1);
  const [bookingStep, setBookingStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Find the currently selected location
  const location = locations.find(loc => loc.id === selectedLocation);
  
  // Get available dates for the selected location
  const locationDates = availableDates.filter(date => date.location === selectedLocation);

  // Calculate total price
  const calculateTotal = () => {
    if (!location) return 0;
    return location.price * participants;
  };

  // Handle booking submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    } else {
      // Submit booking (would connect to backend in production)
      alert('Booking submitted successfully! You will receive a confirmation email shortly.');
      // Reset form
      setBookingStep(1);
      setSelectedDate('');
      setSelectedTime('');
      setParticipants(1);
      setCustomerInfo({
        name: '',
        email: '',
        phone: '',
        specialRequests: ''
      });
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'text-green-600 bg-green-50 border-green-200',
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      amber: 'text-amber-600 bg-amber-50 border-amber-200'
    };
    return colors[color as keyof typeof colors] || colors.green;
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
                <Calendar className="w-4 h-4 mr-2" />
                Site Visits
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                Visit Our{' '}
                <span className="text-green-700">Sustainable Homes</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Experience our AQI 15 achievement in person. Tour our demonstration sites in Delhi, Goa, and Lucknow
                to see firsthand how our aquaponics systems transform air quality and create sustainable living environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Sidebar - Location Selection */}
              <div className="lg:col-span-1">
                <div className="space-y-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Our Locations
                  </h2>

                  {locations.map((loc) => {
                    const LocationIcon = loc.icon;
                    return (
                      <Card 
                        key={loc.id}
                        className={`cursor-pointer transition-all duration-300 ${
                          selectedLocation === loc.id ? 'ring-2 ring-green-400 bg-green-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => {
                          setSelectedLocation(loc.id);
                          setSelectedDate('');
                          setSelectedTime('');
                        }}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(loc.color)}`}>
                              <LocationIcon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">{loc.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>{loc.subtitle}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{loc.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Users className="w-4 h-4" />
                              <span>Max {loc.maxGroupSize} participants</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>{loc.schedule}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-lg font-bold text-green-700">
                              ₹{loc.price.toLocaleString()}
                            </div>
                            {selectedLocation === loc.id ? (
                              <Badge className="bg-green-700">Selected</Badge>
                            ) : (
                              <Button size="sm" variant="outline">
                                Select
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}

                  {/* Contact Information */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-blue-800 mb-4">Need Assistance?</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">Call Us</p>
                            <p className="text-sm text-gray-600">+91 98765 43210</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">Email Us</p>
                            <p className="text-sm text-gray-600">visit@aanantaquaponics.com</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Info className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">Special Requests</p>
                            <p className="text-sm text-gray-600">Contact us for custom tours</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2">
                {location && (
                  <div className="space-y-8">
                    {/* Location Details */}
                    <Card className="overflow-hidden">
                      <div className="relative h-80">
                        <img
                          src={location.image}
                          alt={location.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <Badge className={`bg-${location.color}-700 text-white`}>
                            {(() => {
                              const HighlightIcon = location.icon;
                              return <><HighlightIcon className="w-4 h-4 mr-2" />{location.id.charAt(0).toUpperCase() + location.id.slice(1)}</>;
                            })()}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h2 className="text-3xl font-bold mb-2">{location.name}</h2>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{location.subtitle}</span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <p className="text-gray-700 mb-6">{location.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Tour Features:</h3>
                            <div className="space-y-2">
                              {location.features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                                  <span className="text-gray-700">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Tour Details:</h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-blue-600" />
                                <div>
                                  <p className="font-medium text-gray-900">Duration</p>
                                  <p className="text-sm text-gray-600">{location.duration}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Users className="w-5 h-5 text-purple-600" />
                                <div>
                                  <p className="font-medium text-gray-900">Group Size</p>
                                  <p className="text-sm text-gray-600">Maximum {location.maxGroupSize} participants</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-green-600" />
                                <div>
                                  <p className="font-medium text-gray-900">Schedule</p>
                                  <p className="text-sm text-gray-600">{location.schedule}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Separator className="my-6" />
                        
                        <h3 className="font-semibold text-gray-900 mb-4">Key Highlights:</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {location.highlights.map((highlight, index) => (
                            <Card key={index} className={`bg-${location.color}-50 border-${location.color}-200`}>
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-gray-900 mb-1">{highlight.title}</h4>
                                <p className="text-sm text-gray-600">{highlight.description}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Booking Form */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Book Your Visit</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSubmit}>
                          {bookingStep === 1 && (
                            <div className="space-y-6">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 1: Select Date & Participants</h3>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-3">
                                    <Label htmlFor="date">Select Date</Label>
                                    <select 
                                      id="date"
                                      className="w-full p-2 border rounded-md"
                                      value={selectedDate}
                                      onChange={(e) => {
                                        setSelectedDate(e.target.value);
                                        setSelectedTime('');
                                      }}
                                      required
                                    >
                                      <option value="">Choose a date</option>
                                      {locationDates.map((date) => (
                                        <option key={date.date} value={date.date}>
                                          {new Date(date.date).toLocaleDateString('en-US', { 
                                            weekday: 'long', 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                          })}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <Label htmlFor="time">Select Time</Label>
                                    <select 
                                      id="time"
                                      className="w-full p-2 border rounded-md"
                                      value={selectedTime}
                                      onChange={(e) => setSelectedTime(e.target.value)}
                                      disabled={!selectedDate}
                                      required
                                    >
                                      <option value="">Choose a time</option>
                                      {selectedDate && 
                                        locationDates
                                          .find(date => date.date === selectedDate)
                                          ?.slots.map((slot, index) => (
                                            <option key={index} value={slot}>{slot}</option>
                                          ))
                                      }
                                    </select>
                                  </div>
                                </div>
                                
                                <div className="mt-6 space-y-3">
                                  <Label htmlFor="participants">Number of Participants</Label>
                                  <div className="flex items-center gap-2">
                                    <Button 
                                      type="button"
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => setParticipants(Math.max(1, participants - 1))}
                                    >
                                      -
                                    </Button>
                                    <Input 
                                      id="participants"
                                      type="number"
                                      min="1"
                                      max={location.maxGroupSize}
                                      value={participants}
                                      onChange={(e) => setParticipants(parseInt(e.target.value) || 1)}
                                      className="w-20 text-center"
                                    />
                                    <Button 
                                      type="button"
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => setParticipants(Math.min(location.maxGroupSize, participants + 1))}
                                    >
                                      +
                                    </Button>
                                    <span className="text-sm text-gray-500 ml-2">
                                      (Max {location.maxGroupSize})
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Price per person:</span>
                                    <span className="font-semibold">₹{location.price.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Participants:</span>
                                    <span className="font-semibold">{participants}</span>
                                  </div>
                                  <Separator className="my-2" />
                                  <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Total:</span>
                                    <span className="text-green-700">₹{calculateTotal().toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex justify-end">
                                <Button type="submit" className="bg-green-700 hover:bg-green-800">
                                  Continue to Personal Details
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                              </div>
                            </div>
                          )}

                          {bookingStep === 2 && (
                            <div className="space-y-6">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 2: Personal Details</h3>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-3">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                      id="name"
                                      value={customerInfo.name}
                                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                                      placeholder="Enter your full name"
                                      required
                                    />
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                      id="email"
                                      type="email"
                                      value={customerInfo.email}
                                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                                      placeholder="your.email@example.com"
                                      required
                                    />
                                  </div>
                                </div>
                                
                                <div className="mt-6 space-y-3">
                                  <Label htmlFor="phone">Phone Number</Label>
                                  <Input
                                    id="phone"
                                    value={customerInfo.phone}
                                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                                    placeholder="+91 98765 43210"
                                    required
                                  />
                                </div>
                                
                                <div className="mt-6 space-y-3">
                                  <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                                  <textarea
                                    id="specialRequests"
                                    value={customerInfo.specialRequests}
                                    onChange={(e) => setCustomerInfo({...customerInfo, specialRequests: e.target.value})}
                                    placeholder="Any special requirements or questions"
                                    className="w-full p-2 border rounded-md min-h-[100px]"
                                  />
                                </div>
                              </div>
                              
                              <div className="flex justify-between">
                                <Button 
                                  type="button" 
                                  variant="outline"
                                  onClick={() => setBookingStep(1)}
                                >
                                  <ChevronLeft className="w-4 h-4 mr-2" />
                                  Back
                                </Button>
                                <Button type="submit" className="bg-green-700 hover:bg-green-800">
                                  Continue to Payment
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                              </div>
                            </div>
                          )}

                          {bookingStep === 3 && (
                            <div className="space-y-6">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 3: Payment</h3>
                                
                                <div className="p-4 bg-gray-50 rounded-lg mb-6">
                                  <h4 className="font-semibold text-gray-900 mb-3">Booking Summary</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Location:</span>
                                      <span className="font-medium">{location.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Date:</span>
                                      <span className="font-medium">
                                        {new Date(selectedDate).toLocaleDateString('en-US', { 
                                          weekday: 'long', 
                                          year: 'numeric', 
                                          month: 'long', 
                                          day: 'numeric' 
                                        })}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Time:</span>
                                      <span className="font-medium">{selectedTime}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Participants:</span>
                                      <span className="font-medium">{participants}</span>
                                    </div>
                                    <Separator className="my-2" />
                                    <div className="flex justify-between font-bold">
                                      <span>Total Amount:</span>
                                      <span className="text-green-700">₹{calculateTotal().toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Payment Method</h4>
                                    <div className="space-y-3">
                                      <div className="flex items-center gap-3 p-4 border rounded-lg bg-white">
                                        <input 
                                          type="radio" 
                                          id="card" 
                                          name="paymentMethod" 
                                          defaultChecked 
                                        />
                                        <label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                                          <CreditCard className="w-5 h-5 text-gray-600" />
                                          <span>Credit/Debit Card</span>
                                        </label>
                                      </div>
                                      
                                      <div className="flex items-center gap-3 p-4 border rounded-lg bg-white">
                                        <input 
                                          type="radio" 
                                          id="upi" 
                                          name="paymentMethod" 
                                        />
                                        <label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                                          <Smartphone className="w-5 h-5 text-gray-600" />
                                          <span>UPI Payment</span>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <Label htmlFor="cardNumber">Card Number</Label>
                                    <Input
                                      id="cardNumber"
                                      placeholder="1234 5678 9012 3456"
                                    />
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label htmlFor="expiry">Expiry Date</Label>
                                        <Input
                                          id="expiry"
                                          placeholder="MM/YY"
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="cvv">CVV</Label>
                                        <Input
                                          id="cvv"
                                          placeholder="123"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex justify-between">
                                <Button 
                                  type="button" 
                                  variant="outline"
                                  onClick={() => setBookingStep(2)}
                                >
                                  <ChevronLeft className="w-4 h-4 mr-2" />
                                  Back
                                </Button>
                                <Button type="submit" className="bg-green-700 hover:bg-green-800">
                                  Complete Booking
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </form>
                      </CardContent>
                    </Card>

                    {/* Testimonials */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gray-900">
                        What Visitors Say
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {testimonials.map((testimonial, index) => (
                          <Card key={index}>
                            <CardContent className="p-6">
                              <div className="flex items-center gap-4 mb-4">
                                <img
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                                </div>
                              </div>
                              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Everything you need to know about visiting our demonstration sites
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">What should I bring for the tour?</h3>
                  <p className="text-gray-600">
                    We recommend comfortable clothing and shoes, a water bottle, and a notebook if you wish to take notes. 
                    All necessary equipment for demonstrations will be provided.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Is photography allowed during the tour?</h3>
                  <p className="text-gray-600">
                    Yes, photography is allowed and encouraged for personal use. We ask that you respect the privacy of other 
                    visitors and our team members.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">What is your cancellation policy?</h3>
                  <p className="text-gray-600">
                    Cancellations made 48+ hours before the scheduled visit receive a full refund. Cancellations within 
                    48 hours receive a 50% refund. No-shows are not eligible for refunds.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Can I book a private tour for my group?</h3>
                  <p className="text-gray-600">
                    Yes, private tours are available for groups of 5 or more. Please contact us directly to arrange a 
                    private tour at your preferred date and time.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Will Dr. Peter Singh be present during the tour?</h3>
                  <p className="text-gray-600">
                    Dr. Singh personally leads the Delhi tours on Saturdays. For other locations and times, tours are 
                    conducted by our trained experts who work directly with Dr. Singh.
                  </p>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Experience AQI 15 in Person?
            </h2>
            <p className="text-xl mb-8 text-white">
              Book your visit today and see firsthand how our aquaponics systems 
              transform air quality, create natural cooling, and generate sustainable income.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 px-8">
                Book Delhi Home Tour
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 bg-transparent px-8">
                Explore All Locations
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
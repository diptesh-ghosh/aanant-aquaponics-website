'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle,
  Home,
  Recycle,
  Droplets,
  Sun,
  Leaf,
  BookOpen,
  Package,
  Eye,
  IndianRupee,
  Calendar,
  Shield,
  CheckCircle,
  Clock,
  Send,
  AlertCircle,
  Star,
  Award
} from 'lucide-react';
import { toast } from 'sonner';

interface FormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  
  // Service Selection
  services: string[];
  visitLocation: string;
  
  // Investment Range
  investmentRange: string;
  
  // Project Details
  requirements: string;
}

const services = [
  {
    id: 'aqi-cooling',
    name: 'AQI 15 Natural Home Cooling System',
    icon: Home,
    description: 'Complete air purification and natural cooling solution',
    estimatedPrice: '₹75,000 - ₹2,50,000',
    features: ['25°C inside when 45°C outside', 'Zero air conditioning needed', 'PM2.5 reduction to 5 μg/m³']
  },
  {
    id: 'composting',
    name: 'Complete Kitchen & Garden Composting Solution',
    icon: Recycle,
    description: 'Sustainable waste management and soil enrichment',
    estimatedPrice: '₹15,000 - ₹50,000',
    features: ['100% kitchen waste recycling', 'Rich compost production', 'Odor-free operation']
  },
  {
    id: 'rainwater',
    name: 'Integrated Rainwater Harvesting & Groundwater Recharge',
    icon: Droplets,
    description: 'Water conservation and groundwater management',
    estimatedPrice: '₹40,000 - ₹1,50,000',
    features: ['50,000L+ annual collection', 'Groundwater recharge', 'Filtration systems']
  },
  {
    id: 'greywater',
    name: 'Greywater Recycling for Urban Fruit Gardens',
    icon: Droplets,
    description: 'Water recycling for sustainable gardening',
    estimatedPrice: '₹25,000 - ₹80,000',
    features: ['Kitchen & bathroom water reuse', 'Fruit garden irrigation', '60% water savings']
  },
  {
    id: 'solar',
    name: 'Custom Agrivoltaic Solar Installation',
    icon: Sun,
    description: 'Solar energy with integrated agriculture',
    estimatedPrice: '₹1,50,000 - ₹8,00,000',
    features: ['Dual land use efficiency', '5-10kW solar capacity', 'Crop protection benefits']
  },
  {
    id: 'course',
    name: 'Aquaponics & Permaculture Online Course (2 Weeks)',
    icon: BookOpen,
    description: 'Comprehensive online training program',
    estimatedPrice: '₹10,000',
    features: ['Live interactive sessions', 'Lifetime access', 'Certification included']
  },
  {
    id: 'subscription',
    name: 'Premium Organic Green Pack Subscription',
    icon: Package,
    description: 'Monthly delivery of organic produce',
    estimatedPrice: '₹2,000 - ₹5,000/month',
    features: ['AQI-certified produce', 'Same-day delivery', 'Seasonal variety']
  },
  {
    id: 'visit',
    name: 'Guided Site Visit',
    icon: Eye,
    description: 'Guided tour of working systems',
    estimatedPrice: '₹2,500 per person',
    features: ['3-hour guided tour', 'Hands-on experience', 'Expert consultation']
  }
];

const investmentRanges = [
  { 
    id: 'basic', 
    label: 'Basic Package (Under ₹50,000)', 
    icon: IndianRupee,
    description: 'Starter solutions for small spaces'
  },
  { 
    id: 'standard', 
    label: 'Standard Package (₹50,000 - ₹1,00,000)', 
    icon: IndianRupee,
    description: 'Comprehensive home solutions'
  },
  { 
    id: 'premium', 
    label: 'Premium Package (₹1,00,000 - ₹5,00,000)', 
    icon: IndianRupee,
    description: 'Complete sustainable home transformation'
  },
  { 
    id: 'custom', 
    label: 'Custom Solution (Above ₹5,00,000)', 
    icon: IndianRupee,
    description: 'Large-scale or commercial projects'
  },
  { 
    id: 'consultation', 
    label: 'Initial Consultation Required', 
    icon: MessageCircle,
    description: 'Need expert guidance on budget planning'
  }
];

const visitLocations = [
  { value: 'delhi', label: 'Delhi - Main Research Facility' },
  { value: 'goa', label: 'Goa - Coastal Demonstration Site' },
  { value: 'lucknow', label: 'Lucknow - Urban Integration Center' }
];

export function ServiceSelectionForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    services: [],
    visitLocation: '',
    investmentRange: '',
    requirements: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Required field validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Complete address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pinCode.trim()) newErrors.pinCode = 'PIN code is required';
    if (formData.services.length === 0) newErrors.services = 'Please select at least one service';
    if (!formData.investmentRange) newErrors.investmentRange = 'Investment range is required';
    if (!formData.requirements.trim() || formData.requirements.length < 100) {
      newErrors.requirements = 'Please provide at least 100 characters describing your requirements';
    }
    if (!captchaVerified) newErrors.captcha = 'Please verify you are not a robot';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (with country code)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number with country code';
    }

    // PIN code validation
    const pinRegex = /^\d{6}$/;
    if (formData.pinCode && !pinRegex.test(formData.pinCode)) {
      newErrors.pinCode = 'PIN code must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call with auto-responder
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      toast.success('Form submitted successfully! Auto-responder email sent. We\'ll contact you within 24-48 hours.');
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const simulateCaptcha = () => {
    setCaptchaVerified(true);
    toast.success('reCAPTCHA verified successfully');
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <Card className="text-center p-8 bg-green-50 border-green-200">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Thank You for Your Service Request!
          </h2>
          <p className="text-green-700 mb-6">
            We've received your comprehensive service request and an auto-responder email has been sent to your inbox. 
            Our expert team will contact you within 24-48 hours to discuss your requirements and provide a customized solution.
          </p>
          <div className="bg-white p-6 rounded-lg border border-green-200 space-y-4">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Expected Response Time: 24-48 hours</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-blue-700">
              <Mail className="w-5 h-5" />
              <span className="font-medium">Auto-responder email sent to {formData.email}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-purple-700">
              <Award className="w-5 h-5" />
              <span className="font-medium">Reference ID: SR{Date.now().toString().slice(-6)}</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="shadow-2xl">
        <CardHeader className="text-center pb-8 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-8 h-8 text-green-600" />
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
            Service Selection & Consultation Request
          </CardTitle>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Transform your home into a sustainable, healthy living space. Tell us about your requirements 
            and we'll design a customized solution for your clean air and eco-friendly goals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-green-700">
              <Clock className="w-4 h-4" />
              <span className="font-medium">24-48 hour response</span>
            </div>
            <div className="flex items-center gap-2 text-blue-700">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Secure & confidential</span>
            </div>
            <div className="flex items-center gap-2 text-purple-700">
              <Award className="w-4 h-4" />
              <span className="font-medium">Expert consultation</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Personal Information Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                  <p className="text-gray-600">Your contact details for personalized consultation</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter your full name"
                    className={`mt-1 ${errors.fullName ? 'border-red-500' : ''}`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      className={`pl-10 mt-1 ${errors.email ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number (with country code) *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      className={`pl-10 mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address" className="text-sm font-medium">Complete Address *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="House/Flat No., Street, Area"
                      className={`pl-10 mt-1 ${errors.address ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div>
                  <Label htmlFor="city" className="text-sm font-medium">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="City"
                    className={`mt-1 ${errors.city ? 'border-red-500' : ''}`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="state" className="text-sm font-medium">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="State"
                    className={`mt-1 ${errors.state ? 'border-red-500' : ''}`}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.state}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="pinCode" className="text-sm font-medium">PIN Code *</Label>
                  <Input
                    id="pinCode"
                    value={formData.pinCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, pinCode: e.target.value }))}
                    placeholder="123456"
                    className={`mt-1 ${errors.pinCode ? 'border-red-500' : ''}`}
                  />
                  {errors.pinCode && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.pinCode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Service Selection Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Service Selection</h3>
                  <p className="text-gray-600">Choose the services that match your sustainability goals</p>
                </div>
                <Badge variant="outline" className="ml-auto">Multiple Selection Allowed</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {services.map((service) => {
                  const Icon = service.icon;
                  const isSelected = formData.services.includes(service.id);
                  
                  return (
                    <Card 
                      key={service.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        isSelected ? 'ring-2 ring-green-400 bg-green-50 border-green-200' : 'hover:border-gray-300'
                      }`}
                      onClick={() => handleServiceToggle(service.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Checkbox
                            checked={isSelected}
                            onChange={() => handleServiceToggle(service.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Icon className="w-6 h-6 text-green-600" />
                              <h4 className="font-bold text-gray-900 text-lg">
                                {service.name}
                              </h4>
                            </div>
                            <p className="text-gray-600 mb-3 leading-relaxed">
                              {service.description}
                            </p>
                            <div className="space-y-2 mb-4">
                              {service.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span className="text-sm text-gray-700">{feature}</span>
                                </div>
                              ))}
                            </div>
                            <Badge variant="outline" className="text-green-700 border-green-200 font-medium">
                              {service.estimatedPrice}
                            </Badge>
                            {service.id === 'visit' && isSelected && (
                              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <Label className="text-sm font-medium text-blue-800">Select Visit Location:</Label>
                                <Select 
                                  value={formData.visitLocation} 
                                  onValueChange={(value) => setFormData(prev => ({ ...prev, visitLocation: value }))}
                                >
                                  <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="Choose demonstration site" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {visitLocations.map((location) => (
                                      <SelectItem key={location.value} value={location.value}>
                                        {location.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {errors.services && (
                <p className="text-red-500 text-sm mt-4 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.services}
                </p>
              )}
            </div>

            <Separator />

            {/* Investment Range Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Investment Range</h3>
                  <p className="text-gray-600">Select your preferred investment level for the project</p>
                </div>
              </div>

              <RadioGroup 
                value={formData.investmentRange} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, investmentRange: value }))}
                className="space-y-4"
              >
                {investmentRanges.map((range) => {
                  const Icon = range.icon;
                  return (
                    <div key={range.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value={range.id} id={range.id} className="mt-1" />
                      <Icon className="w-6 h-6 text-purple-600 mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={range.id} className="cursor-pointer font-medium text-gray-900 block mb-1">
                          {range.label}
                        </Label>
                        <p className="text-sm text-gray-600">{range.description}</p>
                      </div>
                    </div>
                  );
                })}
              </RadioGroup>

              {errors.investmentRange && (
                <p className="text-red-500 text-sm mt-4 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.investmentRange}
                </p>
              )}
            </div>

            <Separator />

            {/* Project Details Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Project Details</h3>
                  <p className="text-gray-600">Help us understand your specific needs and requirements</p>
                </div>
              </div>

              <div>
                <Label htmlFor="requirements" className="text-sm font-medium">
                  Specific Requirements, Questions, or Project Details * 
                  <span className="text-gray-500 font-normal">(minimum 100 characters)</span>
                </Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                  placeholder="Please describe your specific requirements, current challenges, sustainability goals, space constraints, timeline expectations, and any special considerations. The more details you provide, the better we can customize our solution for you..."
                  className={`mt-2 min-h-[120px] ${errors.requirements ? 'border-red-500' : ''}`}
                  rows={6}
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.requirements && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.requirements}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 ml-auto">
                    {formData.requirements.length}/100 characters
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Security & Privacy */}
            <div className="space-y-6">
              {/* reCAPTCHA */}
              <div>
                <Label className="text-sm font-medium">Security Verification *</Label>
                <div className="mt-3">
                  {!captchaVerified ? (
                    <Button
                      type="button"
                      onClick={simulateCaptcha}
                      variant="outline"
                      className="w-full p-6 border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors"
                    >
                      <Shield className="w-6 h-6 mr-3 text-gray-500" />
                      <div className="text-left">
                        <div className="font-medium">Click to verify you are not a robot</div>
                        <div className="text-sm text-gray-500">reCAPTCHA protection</div>
                      </div>
                    </Button>
                  ) : (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <span className="text-green-700 font-medium">Verification successful</span>
                        <p className="text-sm text-green-600">reCAPTCHA completed</p>
                      </div>
                    </div>
                  )}
                  {errors.captcha && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.captcha}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="bg-green-700 hover:bg-green-800 text-white px-12 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6 mr-3" />
                    Submit Service Request
                  </>
                )}
              </Button>
              
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-green-700">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">We'll respond within 24-48 hours</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-blue-700">
                  <Mail className="w-4 h-4" />
                  <span>Auto-responder email will be sent immediately</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Your information is secure and confidential</span>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
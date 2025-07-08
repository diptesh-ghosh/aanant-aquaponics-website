'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  CheckCircle, 
  Star, 
  Gift, 
  TrendingUp,
  Users,
  Award,
  Zap
} from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { toast } from 'sonner';

const bundles = [
  {
    id: 'starter-bundle',
    name: 'Clean Air Starter',
    description: 'Perfect for beginners wanting to improve their home air quality',
    courses: ['basic-aquaponics'],
    price: 1999,
    originalPrice: 2999,
    savings: 1000,
    popular: false,
    features: [
      'Aquaponics Fundamentals Course',
      'Basic AQI monitoring guide',
      'Plant selection toolkit',
      'Email support for 3 months',
      'Community access'
    ],
    outcomes: [
      'Achieve 40-60% AQI improvement',
      'Learn fundamental principles',
      'Set up first system'
    ]
  },
  {
    id: 'mastery-bundle',
    name: 'AQI Mastery Bundle',
    description: 'Complete solution for achieving and maintaining AQI 15',
    courses: ['basic-aquaponics', 'aqi-mastery'],
    price: 5999,
    originalPrice: 10998,
    savings: 4999,
    popular: true,
    features: [
      'Aquaponics Fundamentals Course',
      'AQI Mastery Program',
      'Advanced monitoring equipment guide',
      'Income generation strategies',
      'Priority support for 6 months',
      'Monthly group coaching calls',
      'Scientific protocol templates'
    ],
    outcomes: [
      'Achieve AQI 15-25 consistently',
      'Generate ₹8,000-15,000 monthly',
      'Master scientific protocols'
    ]
  },
  {
    id: 'entrepreneur-bundle',
    name: 'Entrepreneur Complete',
    description: 'Build a profitable aquaponics business while helping others',
    courses: ['basic-aquaponics', 'aqi-mastery', 'business-mastery'],
    price: 12999,
    originalPrice: 25997,
    savings: 12998,
    popular: false,
    features: [
      'All 3 comprehensive courses',
      'Business development toolkit',
      'Marketing templates and strategies',
      'Financial planning spreadsheets',
      '1-year premium support',
      'Weekly mentorship calls',
      'Certification program',
      'Exclusive entrepreneur community'
    ],
    outcomes: [
      'Build ₹50,000+ monthly business',
      'Help 50+ families achieve clean air',
      'Create lasting environmental impact'
    ]
  }
];

const physicalProducts = [
  {
    id: 'aqi-monitor',
    name: 'Professional AQI Monitor',
    price: 4999,
    originalPrice: 7999,
    image: 'https://images.pexels.com/photos/4503276/pexels-photo-4503276.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'High-precision air quality monitor with real-time data logging',
    features: [
      'PM2.5, PM10, CO2, TVOC monitoring',
      'Real-time data logging',
      'Mobile app connectivity',
      'Historical trend analysis'
    ]
  },
  {
    id: 'starter-kit',
    name: 'Aquaponics Starter Kit',
    price: 8999,
    originalPrice: 12999,
    image: 'https://images.pexels.com/photos/4503277/pexels-photo-4503277.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Complete physical setup for your first aquaponics system',
    features: [
      'Fish tank and grow bed',
      'Water pump and filtration',
      'pH testing kit',
      'Starter plants and fish food'
    ]
  }
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { addItem } = useCart();

  const handleAddBundle = (bundle: typeof bundles[0]) => {
    addItem({
      id: bundle.id,
      type: 'bundle',
      name: bundle.name,
      price: bundle.price,
      originalPrice: bundle.originalPrice,
      image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: bundle.description,
      metadata: {
        includes: bundle.features
      }
    });
    toast.success(`${bundle.name} added to cart!`);
  };

  const handleAddProduct = (product: typeof physicalProducts[0]) => {
    addItem({
      id: product.id,
      type: 'physical',
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      description: product.description,
      metadata: {
        includes: product.features
      }
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-green-700 border-green-200">
              <Gift className="w-4 h-4 mr-2" />
              Course Bundles & Equipment
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              Choose Your{' '}
              <span className="text-green-700">Learning Path</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive bundles designed to take you from beginner to expert, 
              with optional equipment to accelerate your success.
            </p>
          </div>

          {/* Bundle Pricing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              One-time Payment
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className={`text-sm ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Annual Access
            </span>
            {isAnnual && (
              <Badge variant="destructive" className="ml-2">
                Save 30%
              </Badge>
            )}
          </div>

          {/* Course Bundles */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {bundles.map((bundle) => (
              <Card 
                key={bundle.id} 
                className={`relative hover:shadow-xl transition-all duration-300 ${
                  bundle.popular ? 'ring-2 ring-green-400 scale-105' : ''
                }`}
              >
                {bundle.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-700 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl mb-2">{bundle.name}</CardTitle>
                  <p className="text-gray-600 text-sm">{bundle.description}</p>
                  
                  <div className="mt-6">
                    <div className="text-4xl font-bold text-green-700">
                      ₹{(isAnnual ? bundle.price * 0.7 : bundle.price).toLocaleString()}
                    </div>
                    <div className="text-lg text-gray-500 line-through">
                      ₹{bundle.originalPrice.toLocaleString()}
                    </div>
                    <Badge variant="destructive" className="mt-2">
                      Save ₹{(isAnnual ? bundle.savings + (bundle.price * 0.3) : bundle.savings).toLocaleString()}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                    <div className="space-y-2">
                      {bundle.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Expected Outcomes:</h4>
                    <div className="space-y-2">
                      {bundle.outcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full ${
                      bundle.popular 
                        ? 'bg-green-700 hover:bg-green-800 text-white' 
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                    size="lg"
                    onClick={() => handleAddBundle(bundle)}
                  >
                    Get Started Now
                  </Button>

                  {/* Additional Info */}
                  <div className="text-center text-sm text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Join 750+ successful students</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Physical Products */}
          <div className="border-t pt-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Optional Equipment & Tools
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Accelerate your success with professional-grade equipment recommended by Dr. Singh.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {physicalProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-4 left-4 bg-blue-700">
                        Equipment
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{product.name}</h4>
                        <p className="text-gray-600 text-sm">{product.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Zap className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-700">
                          ₹{product.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleAddProduct(product)}
                        className="bg-blue-700 hover:bg-blue-800"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-16 text-center">
            <Card className="p-8 bg-green-50 border-green-200">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Award className="w-8 h-8 text-green-700" />
                <h3 className="text-2xl font-bold text-green-800">
                  30-Day Money Back Guarantee
                </h3>
              </div>
              <p className="text-green-700 max-w-2xl mx-auto">
                If you don't see measurable AQI improvement within 30 days of implementing our methods, 
                we'll refund your entire course fee. No questions asked.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
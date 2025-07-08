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
import { 
  ShoppingCart, 
  Leaf, 
  MapPin, 
  Clock, 
  Truck,
  Shield,
  Star,
  Plus,
  Minus,
  Wind,
  Thermometer,
  Calendar,
  CheckCircle,
  Phone,
  Mail,
  AlertCircle,
  Package,
  Heart
} from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  image: string;
  inStock: boolean;
  category: 'pack' | 'individual';
  nutritionalInfo?: {
    vitamins: string;
    minerals: string;
    benefits: string;
  };
  harvestDate?: string;
  shelfLife?: string;
}

const products: Product[] = [
  // Green Packs
  {
    id: 'immunity-green-pack',
    name: 'Immunity Boosting Green Pack',
    price: 200,
    unit: 'pack',
    description: 'Lettuce, Spinach, Spring Onions, Celery, Parsley - Perfect combination for immune system support',
    image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    category: 'pack',
    nutritionalInfo: {
      vitamins: 'A, C, K, Folate',
      minerals: 'Iron, Calcium, Potassium',
      benefits: 'Immune support, detoxification, anti-inflammatory'
    },
    harvestDate: '2024-01-15',
    shelfLife: '7 days'
  },
  {
    id: 'microgreen-pack',
    name: 'Nutritious Microgreen Pack',
    price: 150,
    unit: 'pack',
    description: 'Red Radish, Mustard, Bokchoy, Methi, Moong Beans - Nutrient-dense superfood collection',
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    category: 'pack',
    nutritionalInfo: {
      vitamins: 'C, E, K, Beta-carotene',
      minerals: 'Magnesium, Phosphorus, Zinc',
      benefits: 'High antioxidants, protein-rich, enzyme activation'
    },
    harvestDate: '2024-01-16',
    shelfLife: '5 days'
  },
  // Individual Items
  {
    id: 'tomatoes',
    name: 'Juicy Tomatoes',
    price: 80,
    unit: 'kg',
    description: 'Fresh, vine-ripened tomatoes with exceptional flavor and nutrition',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    category: 'individual',
    nutritionalInfo: {
      vitamins: 'C, K, Lycopene',
      minerals: 'Potassium, Folate',
      benefits: 'Heart health, skin protection, cancer prevention'
    },
    harvestDate: '2024-01-14',
    shelfLife: '10 days'
  },
  {
    id: 'celery',
    name: 'Crunchy Celery',
    price: 100,
    unit: 'bunch',
    description: 'Crisp, fresh celery stalks perfect for snacking and cooking',
    image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    category: 'individual',
    nutritionalInfo: {
      vitamins: 'K, C, A',
      minerals: 'Potassium, Sodium, Calcium',
      benefits: 'Hydration, digestive health, anti-inflammatory'
    },
    harvestDate: '2024-01-15',
    shelfLife: '14 days'
  },
  {
    id: 'lettuce',
    name: 'Crisp Lettuce',
    price: 60,
    unit: 'head',
    description: 'Fresh, crunchy lettuce heads with vibrant green leaves',
    image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    category: 'individual',
    nutritionalInfo: {
      vitamins: 'A, K, Folate',
      minerals: 'Iron, Calcium',
      benefits: 'Eye health, bone strength, blood formation'
    },
    harvestDate: '2024-01-16',
    shelfLife: '8 days'
  },
  {
    id: 'spinach',
    name: 'Baby Spinach',
    price: 70,
    unit: 'bunch',
    description: 'Tender baby spinach leaves packed with nutrients',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    category: 'individual',
    nutritionalInfo: {
      vitamins: 'A, C, K, Folate',
      minerals: 'Iron, Magnesium, Calcium',
      benefits: 'Energy boost, muscle function, brain health'
    },
    harvestDate: '2024-01-15',
    shelfLife: '6 days'
  },
  {
    id: 'spring-onions',
    name: 'Spring Onions',
    price: 40,
    unit: 'bunch',
    description: 'Fresh spring onions with mild flavor and crisp texture',
    image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    category: 'individual',
    nutritionalInfo: {
      vitamins: 'C, K, A',
      minerals: 'Sulfur compounds, Potassium',
      benefits: 'Immune support, antimicrobial, digestive health'
    },
    harvestDate: '2024-01-16',
    shelfLife: '12 days'
  },
  {
    id: 'mushrooms',
    name: 'Oyster Mushrooms',
    price: 150,
    unit: 'kg',
    description: 'Fresh oyster mushrooms with delicate flavor and meaty texture',
    image: 'https://images.pexels.com/photos/4198020/pexels-photo-4198020.jpeg?auto=compress&cs=tinysrgb&w=600',
    inStock: true,
    category: 'individual',
    nutritionalInfo: {
      vitamins: 'B complex, D',
      minerals: 'Selenium, Potassium, Phosphorus',
      benefits: 'Protein source, immune support, heart health'
    },
    harvestDate: '2024-01-14',
    shelfLife: '5 days'
  }
];

interface CartItem {
  productId: string;
  quantity: number;
}

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  area: string;
  pincode: string;
}

export default function FreshProducePage() {
  const [mounted, setMounted] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
    address: '',
    area: '',
    pincode: ''
  });
  const [isValidLocation, setIsValidLocation] = useState<boolean | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { addItem } = useCart();

  // South Delhi areas for location verification
  const validAreas = [
    'Greater Kailash', 'Defence Colony', 'Lajpat Nagar', 'Nehru Place',
    'Saket', 'Malviya Nagar', 'Green Park', 'Hauz Khas', 'Vasant Kunj',
    'Vasant Vihar', 'Safdarjung', 'Khan Market', 'Lodhi Road', 'AIIMS',
    'INA', 'Dhaula Kuan', 'R.K. Puram', 'Munirka', 'Katwaria Sarai'
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
    
    const product = products.find(p => p.id === productId);
    if (product) {
      toast.success(`${product.name} added to cart!`);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.productId !== productId));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const verifyLocation = (area: string, pincode: string) => {
    const isValidArea = validAreas.some(validArea => 
      area.toLowerCase().includes(validArea.toLowerCase()) ||
      validArea.toLowerCase().includes(area.toLowerCase())
    );
    
    // South Delhi PIN codes start with 110 and are in range 110001-110070
    const isValidPin = /^110[0-6][0-9]$/.test(pincode) || /^11007[0]$/.test(pincode);
    
    const isValid = isValidArea && isValidPin;
    setIsValidLocation(isValid);
    
    if (!isValid && area && pincode) {
      toast.error('Sorry, we currently deliver only in South Delhi areas');
    } else if (isValid) {
      toast.success('Great! We deliver to your area');
    }
    
    return isValid;
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setShowCheckout(true);
  };

  const handlePlaceOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || !customerInfo.area || !customerInfo.pincode) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!verifyLocation(customerInfo.area, customerInfo.pincode)) {
      toast.error('Please check your delivery location');
      return;
    }

    // Add items to main cart
    cart.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        addItem({
          id: product.id,
          type: 'physical',
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          metadata: {
            unit: product.unit,
            harvestDate: product.harvestDate,
            shelfLife: product.shelfLife,
            aqiCertified: true,
            currentAQI: 15
          }
        }, item.quantity);
      }
    });

    setOrderPlaced(true);
    setCart([]);
    toast.success('Order placed successfully! You will receive a confirmation call within 2 hours.');
  };

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8 bg-green-50 border-green-200">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                Order Placed Successfully!
              </h2>
              <p className="text-green-700 mb-6">
                Thank you for choosing our AQI 15 certified organic produce. 
                Your order will be delivered fresh every Saturday.
              </p>
              <div className="bg-white p-6 rounded-lg border border-green-200 space-y-4">
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">Confirmation call within 2 hours</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-blue-700">
                  <Truck className="w-5 h-5" />
                  <span className="font-medium">Delivery every Saturday before 10 AM</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-purple-700">
                  <Wind className="w-5 h-5" />
                  <span className="font-medium">Grown in AQI 15 environment</span>
                </div>
              </div>
              <Button 
                onClick={() => setOrderPlaced(false)}
                className="mt-6 bg-green-700 hover:bg-green-800"
              >
                Place Another Order
              </Button>
            </Card>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (showCheckout) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Button 
                variant="outline" 
                onClick={() => setShowCheckout(false)}
              >
                ← Back to Products
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.map(item => {
                    const product = products.find(p => p.id === item.productId);
                    if (!product) return null;
                    
                    return (
                      <div key={item.productId} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            ₹{product.price} per {product.unit} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold">₹{product.price * item.quantity}</p>
                      </div>
                    );
                  })}
                  <Separator />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span>₹{getCartTotal()}</span>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 text-green-700 mb-2">
                      <Wind className="w-5 h-5" />
                      <span className="font-medium">AQI 15 Certified</span>
                    </div>
                    <p className="text-sm text-green-600">
                      All produce grown in controlled AQI 15 environment for maximum nutrition and safety
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Complete Address *</Label>
                    <Input
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="House/Flat No., Street, Landmark"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="area">Area/Locality *</Label>
                      <Input
                        id="area"
                        value={customerInfo.area}
                        onChange={(e) => {
                          const value = e.target.value;
                          setCustomerInfo(prev => ({ ...prev, area: value }));
                          if (value && customerInfo.pincode) {
                            verifyLocation(value, customerInfo.pincode);
                          }
                        }}
                        placeholder="e.g., Greater Kailash"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">PIN Code *</Label>
                      <Input
                        id="pincode"
                        value={customerInfo.pincode}
                        onChange={(e) => {
                          const value = e.target.value;
                          setCustomerInfo(prev => ({ ...prev, pincode: value }));
                          if (value && customerInfo.area) {
                            verifyLocation(customerInfo.area, value);
                          }
                        }}
                        placeholder="110048"
                      />
                    </div>
                  </div>

                  {/* Location Verification Status */}
                  {isValidLocation !== null && (
                    <div className={`p-4 rounded-lg border ${
                      isValidLocation 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <div className={`flex items-center gap-2 ${
                        isValidLocation ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {isValidLocation ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <AlertCircle className="w-5 h-5" />
                        )}
                        <span className="font-medium">
                          {isValidLocation 
                            ? 'Delivery available in your area!' 
                            : 'Sorry, we don\'t deliver to this area yet'
                          }
                        </span>
                      </div>
                      {!isValidLocation && (
                        <p className="text-sm text-red-600 mt-2">
                          We currently deliver only in South Delhi areas. Please check our service area or contact us for updates.
                        </p>
                      )}
                    </div>
                  )}

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 text-blue-700 mb-2">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">Delivery Schedule</span>
                    </div>
                    <p className="text-sm text-blue-600">
                      Fresh produce delivered every Saturday between 7 AM - 10 AM
                    </p>
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    disabled={!isValidLocation}
                    className="w-full bg-green-700 hover:bg-green-800 text-white py-3"
                  >
                    <Package className="w-5 h-5 mr-2" />
                    Place Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              <Leaf className="w-4 h-4 mr-2" />
              🥬 ORDER FRESH ORGANIC PRODUCE
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Home Delivered Every Saturday
              <span className="block text-2xl md:text-3xl mt-2 text-green-100">
                in South Delhi
              </span>
            </h1>
            <p className="text-xl mb-8 text-green-100">
              Fresh, organic produce grown in our AQI 15 controlled environment. 
              Delivered fresh to your doorstep every Saturday morning.
            </p>
            
            {/* Key Selling Points */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <Wind className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Grown in AQI 15 Environment</h3>
                <p className="text-sm text-green-100">
                  Pristine air quality ensures maximum nutrition and zero pollution contamination
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <Truck className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Same-Day Fresh Delivery</h3>
                <p className="text-sm text-green-100">
                  Harvested Friday evening, delivered Saturday morning for maximum freshness
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <Shield className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-bold mb-2">100% Organic Certified</h3>
                <p className="text-sm text-green-100">
                  No chemicals, pesticides, or artificial additives - pure, natural nutrition
                </p>
              </div>
            </div>

            {/* Service Area Notice */}
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg border border-yellow-200 max-w-2xl mx-auto">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Currently serving South Delhi</p>
                  <p className="text-sm">
                    Greater Kailash, Defence Colony, Lajpat Nagar, Nehru Place, Saket, Malviya Nagar, Green Park, Hauz Khas & more
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Available Products Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                AVAILABLE PRODUCTS
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fresh, organic produce harvested from our AQI 15 controlled environment facilities. 
                All items are available for Saturday delivery.
              </p>
            </div>

            {/* Green Packs */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Package className="w-6 h-6 text-green-600" />
                Curated Green Packs
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {products.filter(p => p.category === 'pack').map((product) => (
                  <Card key={product.id} className="hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-700 text-white">
                          <Wind className="w-3 h-3 mr-1" />
                          AQI 15 Grown
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-white/90">
                          <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                          Premium
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-gray-900">{product.name}</h4>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-700">₹{product.price}</div>
                          <div className="text-sm text-gray-500">per {product.unit}</div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{product.description}</p>

                      {/* Nutritional Info */}
                      {product.nutritionalInfo && (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                          <h5 className="font-semibold text-green-800 mb-2">Nutritional Benefits:</h5>
                          <div className="grid grid-cols-1 gap-2 text-sm">
                            <div>
                              <span className="font-medium text-green-700">Vitamins: </span>
                              <span className="text-green-600">{product.nutritionalInfo.vitamins}</span>
                            </div>
                            <div>
                              <span className="font-medium text-green-700">Benefits: </span>
                              <span className="text-green-600">{product.nutritionalInfo.benefits}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Harvest Info */}
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Harvested: {product.harvestDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Fresh for: {product.shelfLife}</span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">Quantity:</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const item = cart.find(item => item.productId === product.id);
                                if (item) {
                                  updateQuantity(product.id, item.quantity - 1);
                                }
                              }}
                              disabled={!cart.find(item => item.productId === product.id)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center">
                              {cart.find(item => item.productId === product.id)?.quantity || 0}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const item = cart.find(item => item.productId === product.id);
                                if (item) {
                                  updateQuantity(product.id, item.quantity + 1);
                                } else {
                                  addToCart(product.id);
                                }
                              }}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <Button
                          onClick={() => addToCart(product.id)}
                          className="bg-green-700 hover:bg-green-800"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Individual Items */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Leaf className="w-6 h-6 text-green-600" />
                Individual Items
              </h3>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.filter(p => p.category === 'individual').map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-all duration-300">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-green-700 text-white text-xs">
                          <Wind className="w-2 h-2 mr-1" />
                          AQI 15
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h4 className="font-bold text-gray-900 mb-2">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-lg font-bold text-green-700">₹{product.price}</div>
                          <div className="text-xs text-gray-500">per {product.unit}</div>
                        </div>
                        <div className="text-xs text-gray-600">
                          <div>Fresh: {product.shelfLife}</div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const item = cart.find(item => item.productId === product.id);
                              if (item) {
                                updateQuantity(product.id, item.quantity - 1);
                              }
                            }}
                            disabled={!cart.find(item => item.productId === product.id)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-6 text-center text-sm">
                            {cart.find(item => item.productId === product.id)?.quantity || 0}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const item = cart.find(item => item.productId === product.id);
                              if (item) {
                                updateQuantity(product.id, item.quantity + 1);
                              } else {
                                addToCart(product.id);
                              }
                            }}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <Button
                          onClick={() => addToCart(product.id)}
                          size="sm"
                          className="bg-green-700 hover:bg-green-800"
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Card className="bg-green-700 text-white shadow-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-medium">{getCartItemCount()} items</span>
                </div>
                <div className="text-lg font-bold">₹{getCartTotal()}</div>
                <Button
                  onClick={handleCheckout}
                  className="bg-white text-green-700 hover:bg-gray-100"
                >
                  Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quality Assurance Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quality Assurance & Delivery
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Every product is grown in our AQI 15 controlled facilities and delivered with 
                complete transparency about growing conditions and nutritional content.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <Wind className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">AQI 15 Certified</h3>
                <p className="text-sm text-gray-600">
                  All produce grown in facilities with AQI 15 for maximum nutrition and purity
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <Thermometer className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Temperature Controlled</h3>
                <p className="text-sm text-gray-600">
                  Maintained at optimal temperature throughout delivery for freshness
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <Truck className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Saturday Delivery</h3>
                <p className="text-sm text-gray-600">
                  Fresh delivery every Saturday between 7 AM - 10 AM in South Delhi
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <Shield className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Quality Guarantee</h3>
                <p className="text-sm text-gray-600">
                  100% freshness guarantee or full replacement within 24 hours
                </p>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="mt-12 text-center">
              <Card className="p-6 bg-blue-50 border-blue-200 max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  Questions about your order?
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Phone className="w-4 h-4" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-700">
                    <Mail className="w-4 h-4" />
                    <span>orders@aanantaquaponics.com</span>
                  </div>
                </div>
                <p className="text-sm text-blue-600 mt-3">
                  Available Monday to Saturday, 9 AM - 6 PM
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
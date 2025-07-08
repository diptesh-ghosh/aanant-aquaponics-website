'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Leaf, 
  Truck, 
  Shield, 
  Star,
  MapPin,
  Clock,
  Thermometer,
  Wind,
  Search,
  Filter,
  Plus,
  Minus
} from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { toast } from 'sonner';

const freshProduce = [
  {
    id: 'lettuce-premium',
    name: 'Premium Lettuce',
    category: 'Leafy Greens',
    price: 120,
    originalPrice: 150,
    unit: 'per 250g',
    aqiCertified: true,
    currentAQI: 12,
    harvestDate: '2024-01-15',
    expiryDate: '2024-01-22',
    temperature: '4°C',
    farmer: 'Rajesh Kumar',
    location: 'Gurgaon Facility',
    image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Crisp, fresh lettuce grown in our AQI-controlled environment',
    nutritionalInfo: {
      calories: 15,
      protein: 1.4,
      carbs: 2.9,
      fiber: 1.3,
      vitaminC: 9.2
    },
    availability: 'In Stock',
    stock: 45,
    rating: 4.8,
    reviews: 127
  },
  {
    id: 'spinach-organic',
    name: 'Organic Spinach',
    category: 'Leafy Greens',
    price: 80,
    originalPrice: 100,
    unit: 'per 200g',
    aqiCertified: true,
    currentAQI: 14,
    harvestDate: '2024-01-14',
    expiryDate: '2024-01-21',
    temperature: '3°C',
    farmer: 'Priya Sharma',
    location: 'Delhi Facility',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Nutrient-rich spinach with exceptional iron content',
    nutritionalInfo: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fiber: 2.2,
      vitaminC: 28.1
    },
    availability: 'In Stock',
    stock: 32,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 'tomatoes-cherry',
    name: 'Cherry Tomatoes',
    category: 'Fruits',
    price: 180,
    originalPrice: 220,
    unit: 'per 500g',
    aqiCertified: true,
    currentAQI: 11,
    harvestDate: '2024-01-13',
    expiryDate: '2024-01-25',
    temperature: '8°C',
    farmer: 'Mohammed Ali',
    location: 'Noida Facility',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Sweet, juicy cherry tomatoes perfect for salads',
    nutritionalInfo: {
      calories: 18,
      protein: 0.9,
      carbs: 3.9,
      fiber: 1.2,
      vitaminC: 13.7
    },
    availability: 'In Stock',
    stock: 28,
    rating: 4.7,
    reviews: 156
  },
  {
    id: 'herbs-basil',
    name: 'Fresh Basil',
    category: 'Herbs',
    price: 60,
    originalPrice: 80,
    unit: 'per 50g',
    aqiCertified: true,
    currentAQI: 13,
    harvestDate: '2024-01-15',
    expiryDate: '2024-01-20',
    temperature: '5°C',
    farmer: 'Anita Gupta',
    location: 'Faridabad Facility',
    image: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Aromatic basil with intense flavor and aroma',
    nutritionalInfo: {
      calories: 22,
      protein: 3.2,
      carbs: 2.6,
      fiber: 1.6,
      vitaminC: 18.0
    },
    availability: 'Limited Stock',
    stock: 12,
    rating: 4.9,
    reviews: 73
  },
  {
    id: 'cucumber-english',
    name: 'English Cucumber',
    category: 'Vegetables',
    price: 90,
    originalPrice: 110,
    unit: 'per piece',
    aqiCertified: true,
    currentAQI: 15,
    harvestDate: '2024-01-14',
    expiryDate: '2024-01-28',
    temperature: '6°C',
    farmer: 'Vikram Singh',
    location: 'Ghaziabad Facility',
    image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Crisp, seedless cucumber perfect for fresh consumption',
    nutritionalInfo: {
      calories: 16,
      protein: 0.7,
      carbs: 4.0,
      fiber: 0.5,
      vitaminC: 2.8
    },
    availability: 'In Stock',
    stock: 38,
    rating: 4.6,
    reviews: 94
  },
  {
    id: 'microgreens-mix',
    name: 'Microgreens Mix',
    category: 'Specialty',
    price: 250,
    originalPrice: 300,
    unit: 'per 100g',
    aqiCertified: true,
    currentAQI: 10,
    harvestDate: '2024-01-15',
    expiryDate: '2024-01-18',
    temperature: '2°C',
    farmer: 'Dr. Peter Singh',
    location: 'Research Facility',
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Premium microgreens mix with exceptional nutritional density',
    nutritionalInfo: {
      calories: 29,
      protein: 3.7,
      carbs: 4.0,
      fiber: 3.8,
      vitaminC: 85.0
    },
    availability: 'Pre-Order',
    stock: 8,
    rating: 5.0,
    reviews: 42
  }
];

const courseBundles = [
  {
    id: 'produce-starter-bundle',
    name: 'Fresh Start Bundle',
    description: 'Aquaponics Fundamentals + 2 weeks fresh produce delivery',
    coursePrice: 1999,
    produceValue: 800,
    bundlePrice: 2399,
    savings: 400,
    includes: ['Aquaponics Fundamentals Course', '2 weeks produce delivery', 'Setup consultation'],
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'produce-mastery-bundle',
    name: 'Complete Mastery Bundle',
    description: 'AQI Mastery Program + 1 month premium produce subscription',
    coursePrice: 4999,
    produceValue: 2400,
    bundlePrice: 6499,
    savings: 900,
    includes: ['AQI Mastery Program', '1 month premium produce', 'Priority delivery', 'Nutrition consultation'],
    image: 'https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export default function EcommercePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const { addItem } = useCart();

  const categories = ['all', 'Leafy Greens', 'Fruits', 'Vegetables', 'Herbs', 'Specialty'];

  const filteredProduce = freshProduce.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProduce = [...filteredProduce].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'aqi':
        return a.currentAQI - b.currentAQI;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const updateCart = (productId: string, change: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const handleAddToCart = (product: typeof freshProduce[0]) => {
    const quantity = cart[product.id] || 1;
    addItem({
      id: product.id,
      type: 'physical',
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      description: product.description,
      metadata: {
        unit: product.unit,
        farmer: product.farmer,
        aqiCertified: product.aqiCertified,
        currentAQI: product.currentAQI
      }
    }, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddBundle = (bundle: typeof courseBundles[0]) => {
    addItem({
      id: bundle.id,
      type: 'bundle',
      name: bundle.name,
      price: bundle.bundlePrice,
      originalPrice: bundle.coursePrice + bundle.produceValue,
      image: bundle.image,
      description: bundle.description,
      metadata: {
        includes: bundle.includes
      }
    });
    toast.success(`${bundle.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Fresh Produce Marketplace
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                AQI-certified fresh produce grown in our controlled environment facilities. 
                Delivered fresh to your doorstep in South Delhi.
              </p>
            </div>

            {/* Service Area Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Currently serving South Delhi</p>
                  <p className="text-sm text-green-700">
                    Same-day delivery for orders placed before 2 PM • Temperature-controlled delivery
                  </p>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search produce..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="aqi">Best AQI</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="produce" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="produce">Fresh Produce</TabsTrigger>
              <TabsTrigger value="bundles">Course + Produce Bundles</TabsTrigger>
            </TabsList>

            {/* Fresh Produce Tab */}
            <TabsContent value="produce">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProduce.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          {product.aqiCertified && (
                            <Badge className="bg-green-600 text-white">
                              <Wind className="w-3 h-3 mr-1" />
                              AQI {product.currentAQI}
                            </Badge>
                          )}
                          <Badge variant={product.availability === 'In Stock' ? 'default' : 'secondary'}>
                            {product.availability}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <Badge variant="outline" className="bg-white/90">
                            <Thermometer className="w-3 h-3 mr-1" />
                            {product.temperature}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6">
                      {/* Product Info */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">{product.name}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-xs text-gray-500">({product.reviews})</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                        <Badge variant="outline" className="text-xs">{product.category}</Badge>
                      </div>

                      {/* Farmer & Location */}
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <p className="font-medium text-gray-800">Grown by {product.farmer}</p>
                            <p className="text-gray-600">{product.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-600">Harvested</p>
                            <p className="font-medium">{new Date(product.harvestDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      {/* Nutritional Info */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-800 mb-2">Nutritional Info (per 100g):</p>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="font-semibold">{product.nutritionalInfo.calories}</div>
                            <div className="text-gray-600">Calories</div>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded">
                            <div className="font-semibold">{product.nutritionalInfo.protein}g</div>
                            <div className="text-gray-600">Protein</div>
                          </div>
                          <div className="text-center p-2 bg-orange-50 rounded">
                            <div className="font-semibold">{product.nutritionalInfo.vitaminC}mg</div>
                            <div className="text-gray-600">Vit C</div>
                          </div>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-xl font-bold text-green-700">
                            ₹{product.price}
                          </div>
                          <div className="text-sm text-gray-500 line-through">
                            ₹{product.originalPrice}
                          </div>
                          <div className="text-xs text-gray-600">{product.unit}</div>
                        </div>
                        <Badge variant="destructive">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </Badge>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium">Quantity:</span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCart(product.id, -1)}
                            disabled={!cart[product.id]}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">
                            {cart[product.id] || 1}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCart(product.id, 1)}
                            disabled={cart[product.id] >= product.stock}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Add to Cart */}
                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.availability === 'Out of Stock'}
                        className="w-full bg-green-700 hover:bg-green-800"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>

                      {/* Stock Info */}
                      <div className="mt-3 text-center">
                        <p className="text-xs text-gray-500">
                          {product.stock} units available • Expires {new Date(product.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Course + Produce Bundles Tab */}
            <TabsContent value="bundles">
              <div className="grid lg:grid-cols-2 gap-8">
                {courseBundles.map((bundle) => (
                  <Card key={bundle.id} className="hover:shadow-xl transition-all duration-300">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={bundle.image}
                          alt={bundle.name}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-purple-600 text-white">
                            Bundle Deal
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="destructive">
                            Save ₹{bundle.savings}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{bundle.name}</h3>
                      <p className="text-gray-600 mb-4">{bundle.description}</p>

                      {/* Bundle Contents */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3">What's Included:</h4>
                        <div className="space-y-2">
                          {bundle.includes.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing Breakdown */}
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Course Value:</span>
                            <span>₹{bundle.coursePrice.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Produce Value:</span>
                            <span>₹{bundle.produceValue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-gray-500 line-through">
                            <span>Regular Price:</span>
                            <span>₹{(bundle.coursePrice + bundle.produceValue).toLocaleString()}</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-bold text-green-700">
                            <span>Bundle Price:</span>
                            <span>₹{bundle.bundlePrice.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <Button
                        onClick={() => handleAddBundle(bundle)}
                        className="w-full bg-purple-700 hover:bg-purple-800 text-white"
                        size="lg"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add Bundle to Cart
                      </Button>

                      {/* Additional Info */}
                      <div className="mt-4 text-center">
                        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Truck className="w-3 h-3" />
                            <span>Free Delivery</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Instant Access</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            <span>30-Day Guarantee</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Delivery Information */}
          <div className="mt-16">
            <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Quality Assurance & Delivery
                </h3>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  Every product is grown in our AQI-controlled facilities and delivered with 
                  complete transparency about growing conditions and nutritional content.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <Wind className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-800 mb-2">AQI Certified</h4>
                  <p className="text-sm text-gray-600">
                    All produce grown in facilities with AQI 10-15
                  </p>
                </div>
                <div className="text-center">
                  <Thermometer className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-800 mb-2">Temperature Controlled</h4>
                  <p className="text-sm text-gray-600">
                    Maintained at optimal temperature throughout delivery
                  </p>
                </div>
                <div className="text-center">
                  <Truck className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-800 mb-2">Same-Day Delivery</h4>
                  <p className="text-sm text-gray-600">
                    Orders before 2 PM delivered the same day
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-800 mb-2">Quality Guarantee</h4>
                  <p className="text-sm text-gray-600">
                    100% freshness guarantee or full replacement
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
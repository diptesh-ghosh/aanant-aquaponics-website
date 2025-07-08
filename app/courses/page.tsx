'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Filter,
  Search,
  Play,
  Download,
  CheckCircle,
  Award,
  TrendingUp
} from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { toast } from 'sonner';

const allCourses = [
  {
    id: 'basic-aquaponics',
    title: 'Aquaponics Fundamentals',
    subtitle: 'Master the Basics of Clean Air Generation',
    price: 1999,
    originalPrice: 2999,
    level: 'Beginner',
    duration: '4 weeks',
    students: 1250,
    rating: 4.9,
    category: 'fundamentals',
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Learn the fundamental principles of aquaponics and achieve your first AQI improvement within 30 days.',
    features: [
      'Complete system setup guide',
      'Plant selection methodology',
      'Water quality management',
      'Basic AQI monitoring',
      'Troubleshooting guide'
    ],
    outcomes: [
      'Achieve 40-60% AQI improvement',
      'Set up your first aquaponics system',
      'Understand plant-fish symbiosis',
      'Monitor air quality effectively'
    ],
    modules: 12,
    videos: 45,
    downloads: 15,
    certificate: true,
    support: '3 months email support'
  },
  {
    id: 'aqi-mastery',
    title: 'AQI Mastery Program',
    subtitle: 'Advanced Air Quality Optimization',
    price: 4999,
    originalPrice: 7999,
    level: 'Intermediate',
    duration: '8 weeks',
    students: 850,
    rating: 4.8,
    category: 'advanced',
    image: 'https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Advanced techniques to achieve and maintain AQI 15-25 consistently while generating supplementary income.',
    features: [
      'Advanced system optimization',
      'Scientific monitoring protocols',
      'Income generation strategies',
      'Scaling methodologies',
      'Expert consultation calls'
    ],
    outcomes: [
      'Achieve AQI 15-25 consistently',
      'Generate ₹8,000-15,000 monthly',
      'Master scientific protocols',
      'Scale to multiple locations'
    ],
    modules: 24,
    videos: 85,
    downloads: 35,
    certificate: true,
    support: '6 months priority support'
  },
  {
    id: 'business-mastery',
    title: 'Aquaponics Business Mastery',
    subtitle: 'Build Your Clean Air Enterprise',
    price: 9999,
    originalPrice: 15999,
    level: 'Advanced',
    duration: '12 weeks',
    students: 420,
    rating: 4.9,
    category: 'business',
    image: 'https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Complete business framework to build a profitable aquaponics enterprise while helping others achieve clean air.',
    features: [
      'Business model development',
      'Marketing and sales strategies',
      'Team building and scaling',
      'Financial planning tools',
      'Ongoing mentorship program'
    ],
    outcomes: [
      'Build ₹50,000+ monthly business',
      'Help 50+ families achieve clean air',
      'Develop sustainable revenue streams',
      'Create lasting environmental impact'
    ],
    modules: 36,
    videos: 120,
    downloads: 50,
    certificate: true,
    support: '12 months mentorship'
  },
  {
    id: 'equipment-mastery',
    title: 'Equipment & Monitoring Mastery',
    subtitle: 'Professional AQI Monitoring & Equipment Setup',
    price: 3499,
    originalPrice: 4999,
    level: 'Intermediate',
    duration: '6 weeks',
    students: 650,
    rating: 4.7,
    category: 'technical',
    image: 'https://images.pexels.com/photos/4503276/pexels-photo-4503276.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Master professional-grade equipment setup, calibration, and monitoring for optimal aquaponics performance.',
    features: [
      'Equipment selection guide',
      'Calibration procedures',
      'Data analysis techniques',
      'Maintenance protocols',
      'Troubleshooting methods'
    ],
    outcomes: [
      'Set up professional monitoring',
      'Achieve 95%+ system efficiency',
      'Reduce maintenance costs',
      'Optimize system performance'
    ],
    modules: 18,
    videos: 65,
    downloads: 25,
    certificate: true,
    support: '4 months technical support'
  },
  {
    id: 'health-wellness',
    title: 'Health & Wellness Through Clean Air',
    subtitle: 'Understanding Health Benefits of AQI Improvement',
    price: 2499,
    originalPrice: 3499,
    level: 'Beginner',
    duration: '5 weeks',
    students: 980,
    rating: 4.8,
    category: 'health',
    image: 'https://images.pexels.com/photos/4503277/pexels-photo-4503277.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Comprehensive guide to understanding and maximizing the health benefits of improved air quality.',
    features: [
      'Health impact analysis',
      'Respiratory improvement tracking',
      'Family health planning',
      'Medical consultation guidance',
      'Wellness monitoring tools'
    ],
    outcomes: [
      'Understand health benefits',
      'Track family wellness improvements',
      'Reduce medical expenses',
      'Improve quality of life'
    ],
    modules: 15,
    videos: 55,
    downloads: 20,
    certificate: true,
    support: '3 months health guidance'
  },
  {
    id: 'community-impact',
    title: 'Community Impact & Scaling',
    subtitle: 'Creating Neighborhood-Wide Clean Air Solutions',
    price: 5999,
    originalPrice: 8999,
    level: 'Advanced',
    duration: '10 weeks',
    students: 320,
    rating: 4.9,
    category: 'community',
    image: 'https://images.pexels.com/photos/4503278/pexels-photo-4503278.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Learn to implement community-wide aquaponics solutions and create lasting environmental impact.',
    features: [
      'Community engagement strategies',
      'Large-scale implementation',
      'Government liaison protocols',
      'Funding and grants guidance',
      'Impact measurement tools'
    ],
    outcomes: [
      'Implement community solutions',
      'Secure funding and grants',
      'Create measurable impact',
      'Build sustainable programs'
    ],
    modules: 30,
    videos: 95,
    downloads: 40,
    certificate: true,
    support: '8 months community support'
  }
];

const categories = [
  { value: 'all', label: 'All Courses' },
  { value: 'fundamentals', label: 'Fundamentals' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'business', label: 'Business' },
  { value: 'technical', label: 'Technical' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'community', label: 'Community Impact' }
];

const levels = [
  { value: 'all', label: 'All Levels' },
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' }
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState<{[key: string]: boolean}>({});

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'students':
        return b.students - a.students;
      default: // popular
        return b.students - a.students;
    }
  });

  const handleAddToCart = (course: typeof allCourses[0], courseId: string) => {
    addItem({
      id: course.id,
      type: 'course',
      name: course.title,
      price: course.price,
      originalPrice: course.originalPrice,
      image: course.image,
      description: course.description,
      metadata: {
        duration: course.duration,
        level: course.level,
        includes: course.features
      }
    });
    toast.success(`${course.title} added to cart!`);
    setAddedToCart(prev => ({...prev, [courseId]: true}));
  };

  const handleRemoveFromCart = (courseId: string) => {
    setAddedToCart(prev => ({...prev, [courseId]: false}));
    toast.success("Removed from cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Comprehensive Aquaponics Education
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Master clean air generation, AQI optimization, and sustainable income creation 
                through our scientifically-proven course curriculum.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="grid md:grid-cols-4 gap-4 mb-8 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search courses..."
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
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="students">Most Students</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {sortedCourses.length} of {allCourses.length} courses
              </p>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {selectedCategory !== 'all' && `${categories.find(c => c.value === selectedCategory)?.label} • `}
                  {selectedLevel !== 'all' && `${selectedLevel} • `}
                  {searchTerm && `"${searchTerm}" • `}
                  Sorted by {sortBy === 'popular' ? 'popularity' : sortBy}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Course Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={`${
                        course.level === 'Beginner' ? 'bg-green-600' :
                        course.level === 'Intermediate' ? 'bg-blue-600' : 'bg-purple-600'
                      }`}>
                        {course.level}
                      </Badge>
                      {course.certificate && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          <Award className="w-3 h-3 mr-1" />
                          Certificate
                      {!addedToCart[course.id] ? (
                        <Button
                          onClick={() => handleAddToCart(course, course.id)}
                          disabled={course.availability === 'Out of Stock'}
                          className="w-full bg-green-700 hover:bg-green-800"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleRemoveFromCart(course.id)}
                          className="w-full bg-red-600 hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove from Cart
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Rating and Students */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium text-sm">{course.rating}</span>
                      <span className="text-gray-500 text-sm">({course.students})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                  </div>

                  {/* Title and Description */}
                  <CardTitle className="text-lg mb-2 line-clamp-2">{course.title}</CardTitle>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.subtitle}</p>

                  {/* Course Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold">{course.modules}</div>
                      <div className="text-gray-600">Modules</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold">{course.videos}</div>
                      <div className="text-gray-600">Videos</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold">{course.downloads}</div>
                      <div className="text-gray-600">Downloads</div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-4">
                    <div className="space-y-1">
                      {course.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700 truncate">{feature}</span>
                        </div>
                      ))}
                      {course.features.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{course.features.length - 3} more features
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-green-700">
                        ₹{course.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        ₹{course.originalPrice.toLocaleString()}
                      </div>
                    </div>
                    <Badge variant="destructive">
                      {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(course)}
                      className="flex-1 bg-green-700 hover:bg-green-800"
                    >
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Support Info */}
                  <div className="mt-3 text-xs text-gray-500 text-center">
                    {course.support}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {sortedCourses.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all courses.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
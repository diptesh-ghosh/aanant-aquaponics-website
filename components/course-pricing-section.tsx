'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  Star, 
  Users, 
  Clock,
  CheckCircle,
  Zap,
  Leaf,
  Droplets,
  Sun,
  Recycle,
  Home,
  ShoppingCart,
  ArrowRight,
  Award,
  Play,
  Download,
  MessageCircle,
  TrendingUp,
  Gift
} from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { toast } from 'sonner';

const primaryCourse = {
  id: 'comprehensive-certification',
  title: 'Comprehensive Aquaponics Certification Program',
  subtitle: 'Complete 2-Week Interactive Training',
  price: 10000,
  originalPrice: 15000,
  duration: '2 weeks',
  students: 2847,
  rating: 4.9,
  completionRate: 94,
  satisfactionRate: 96,
  image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=600',
  features: [
    'Full 2-Week Online Interactive Training',
    'Complete Aquaponics System Design',
    'Permaculture Integration Methods',
    'Step-by-Step AQI 15 Home Setup Guide',
    'Live Q&A Sessions',
    'Lifetime Access to Course Materials'
  ],
  highlights: [
    { icon: Play, text: 'Live Interactive Sessions' },
    { icon: Download, text: 'Lifetime Access' },
    { icon: MessageCircle, text: 'Expert Support' },
    { icon: Award, text: 'Certification Included' }
  ]
};

const specializedCourses = [
  {
    id: 'aqi-15-masterclass',
    title: 'AQI 15 Home Creation Masterclass',
    description: 'Complete system design and implementation',
    price: 5000,
    originalPrice: 7000,
    icon: Home,
    color: 'blue',
    completionRate: 89,
    satisfactionRate: 94,
    students: 1456,
    features: [
      'Complete system design and implementation',
      'Material selection guide',
      'Maintenance manual',
      'Detailed PDF guides',
      'Video tutorials',
      '3 months of support'
    ]
  },
  {
    id: 'composting-kitchen-waste',
    title: 'Composting Kitchen Waste',
    description: 'Step-by-step composting techniques',
    price: 1000,
    originalPrice: 1500,
    icon: Recycle,
    color: 'green',
    completionRate: 92,
    satisfactionRate: 95,
    students: 2134,
    features: [
      'Step-by-step composting techniques',
      'Troubleshooting guide',
      'Best practices manual',
      'Detailed PDF guides',
      'Video tutorials',
      '3 months of support'
    ]
  },
  {
    id: 'rainwater-harvesting',
    title: 'Rainwater Harvesting',
    description: 'System design fundamentals',
    price: 1000,
    originalPrice: 1500,
    icon: Droplets,
    color: 'cyan',
    completionRate: 87,
    satisfactionRate: 93,
    students: 1789,
    features: [
      'System design fundamentals',
      'Installation guide',
      'Maintenance checklist',
      'Detailed PDF guides',
      'Video tutorials',
      '3 months of support'
    ]
  },
  {
    id: 'grey-water-recycling',
    title: 'Grey Water Recycling',
    description: 'System setup tutorial',
    price: 1000,
    originalPrice: 1500,
    icon: Droplets,
    color: 'teal',
    completionRate: 85,
    satisfactionRate: 91,
    students: 1234,
    features: [
      'System setup tutorial',
      'Safety guidelines',
      'Implementation manual',
      'Detailed PDF guides',
      'Video tutorials',
      '3 months of support'
    ]
  },
  {
    id: 'agrivoltaic-solar',
    title: 'Agrivoltaic Solar Systems',
    description: 'Design principles',
    price: 1000,
    originalPrice: 1500,
    icon: Sun,
    color: 'yellow',
    completionRate: 83,
    satisfactionRate: 90,
    students: 987,
    features: [
      'Design principles',
      'Integration guide',
      'Efficiency optimization',
      'Detailed PDF guides',
      'Video tutorials',
      '3 months of support'
    ]
  }
];

const bundleDiscounts = [
  { courses: 2, discount: 10, savings: 200 },
  { courses: 3, discount: 15, savings: 450 },
  { courses: 4, discount: 20, savings: 800 },
  { courses: 5, discount: 25, savings: 1250 }
];

export function CoursePricingSection() {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const { addItem } = useCart();

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      cyan: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      teal: 'text-teal-600 bg-teal-50 border-teal-200',
      yellow: 'text-yellow-600 bg-yellow-50 border-yellow-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      cyan: 'text-cyan-600',
      teal: 'text-teal-600',
      yellow: 'text-yellow-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const calculateBundleDiscount = () => {
    const courseCount = selectedCourses.length;
    if (courseCount < 2) return { discount: 0, savings: 0 };
    
    const bundle = bundleDiscounts.find(b => b.courses === courseCount) || 
                   bundleDiscounts[bundleDiscounts.length - 1];
    return bundle;
  };

  const calculateTotal = () => {
    const selectedCoursesData = specializedCourses.filter(course => 
      selectedCourses.includes(course.id)
    );
    const subtotal = selectedCoursesData.reduce((sum, course) => sum + course.price, 0);
    const { discount } = calculateBundleDiscount();
    const savings = Math.round(subtotal * (discount / 100));
    return { subtotal, savings, total: subtotal - savings };
  };

  const handleAddToCart = (course: any, isPrimary = false) => {
    addItem({
      id: course.id,
      type: 'course',
      name: course.title,
      price: course.price,
      originalPrice: course.originalPrice,
      image: isPrimary ? course.image : 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: isPrimary ? course.subtitle : course.description,
      metadata: {
        duration: isPrimary ? course.duration : '3 months support',
        level: isPrimary ? 'Comprehensive' : 'Specialized',
        includes: course.features
      }
    });
    toast.success(`${course.title} added to cart!`);
  };

  const handleAddBundle = () => {
    const selectedCoursesData = specializedCourses.filter(course => 
      selectedCourses.includes(course.id)
    );
    const { total, savings } = calculateTotal();
    
    addItem({
      id: `bundle-${selectedCourses.length}-courses`,
      type: 'bundle',
      name: `${selectedCourses.length} Course Bundle`,
      price: total,
      originalPrice: total + savings,
      image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: `Bundle of ${selectedCourses.length} specialized courses`,
      metadata: {
        includes: selectedCoursesData.map(course => course.title),
        discount: calculateBundleDiscount().discount
      }
    });
    toast.success(`Bundle of ${selectedCourses.length} courses added to cart!`);
    setSelectedCourses([]);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-green-700 border-green-200">
              <BookOpen className="w-4 h-4 mr-2" />
              Course Catalog
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              Master Sustainable Living with{' '}
              <span className="text-green-700">Expert-Led Courses</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Transform your home into an eco-friendly haven with our comprehensive training programs. 
              From AQI improvement to sustainable systems, learn from industry experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setShowComparison(!showComparison)}
                variant="outline" 
                size="lg"
                className="border-green-700 text-green-700 hover:bg-green-50"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Compare Courses
              </Button>
              <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                <Play className="w-5 h-5 mr-2" />
                Watch Course Preview
              </Button>
            </div>
          </div>

          {/* Primary Course - Featured */}
          <div className="mb-16">
            <Card className="relative overflow-hidden border-2 border-green-200 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="absolute top-4 left-4">
                <Badge className="bg-green-700 text-white px-4 py-2 text-sm font-bold">
                  <Award className="w-4 h-4 mr-2" />
                  FEATURED PROGRAM
                </Badge>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8 p-8">
                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {primaryCourse.title}
                    </h3>
                    <p className="text-xl text-gray-600 mb-4">
                      {primaryCourse.subtitle}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="font-bold">{primaryCourse.rating}</span>
                        <span className="text-gray-500">({primaryCourse.students} students)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{primaryCourse.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {primaryCourse.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-4">
                    {primaryCourse.highlights.map((highlight, index) => {
                      const Icon = highlight.icon;
                      return (
                        <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg border">
                          <Icon className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium text-gray-700">{highlight.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-green-700">
                      ₹{primaryCourse.price.toLocaleString()}
                    </div>
                    <div className="text-xl text-gray-500 line-through">
                      ₹{primaryCourse.originalPrice.toLocaleString()}
                    </div>
                    <Badge variant="destructive" className="text-lg px-3 py-1">
                      {Math.round((1 - primaryCourse.price / primaryCourse.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={() => handleAddToCart(primaryCourse, true)}
                    size="lg"
                    className="w-full bg-green-700 hover:bg-green-800 text-white text-lg py-4"
                  >
                    <ShoppingCart className="w-6 h-6 mr-2" />
                    ENROLL NOW
                  </Button>
                </div>

                {/* Image & Stats */}
                <div className="space-y-6">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={primaryCourse.image}
                      alt={primaryCourse.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Progress Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                        <span className="text-sm font-bold text-green-600">{primaryCourse.completionRate}%</span>
                      </div>
                      <Progress value={primaryCourse.completionRate} className="h-2" />
                    </div>
                    <div className="p-4 bg-white rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Satisfaction</span>
                        <span className="text-sm font-bold text-blue-600">{primaryCourse.satisfactionRate}%</span>
                      </div>
                      <Progress value={primaryCourse.satisfactionRate} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Specialized Courses */}
          <div className="mb-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Specialized Individual Courses
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Each course includes detailed PDF guides, video tutorials, and 3 months of expert support. 
                Mix and match to create your perfect learning path.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specializedCourses.map((course) => {
                const Icon = course.icon;
                const isSelected = selectedCourses.includes(course.id);
                
                return (
                  <Card 
                    key={course.id} 
                    className={`hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      isSelected ? 'ring-2 ring-green-400 bg-green-50' : ''
                    }`}
                    onClick={() => toggleCourseSelection(course.id)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(course.color)}`}>
                          <Icon className={`w-6 h-6 ${getIconColor(course.color)}`} />
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        )}
                      </div>
                      
                      <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                      <p className="text-gray-600 text-sm">{course.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Features */}
                      <div className="space-y-2">
                        {course.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                        {course.features.length > 3 && (
                          <p className="text-xs text-gray-500 ml-6">
                            +{course.features.length - 3} more features
                          </p>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-sm font-bold text-gray-900">{course.completionRate}%</div>
                          <div className="text-xs text-gray-600">Completion</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-sm font-bold text-gray-900">{course.satisfactionRate}%</div>
                          <div className="text-xs text-gray-600">Satisfaction</div>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold text-gray-900">
                            ₹{course.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500 line-through">
                            ₹{course.originalPrice.toLocaleString()}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-green-700 border-green-200">
                          {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                        </Badge>
                      </div>

                      {/* CTA */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(course);
                        }}
                        className="w-full bg-green-700 hover:bg-green-800"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        ENROLL NOW
                      </Button>

                      {/* Student Count */}
                      <div className="text-center text-xs text-gray-500">
                        <Users className="w-3 h-3 inline mr-1" />
                        {course.students} students enrolled
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Bundle Pricing */}
          {selectedCourses.length >= 2 && (
            <div className="mb-12">
              <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    <Gift className="w-6 h-6 inline mr-2 text-purple-600" />
                    Bundle Discount Available!
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <div className="text-3xl font-bold text-purple-700">
                        {selectedCourses.length}
                      </div>
                      <p className="text-sm text-gray-600">Courses Selected</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-700">
                        {calculateBundleDiscount().discount}%
                      </div>
                      <p className="text-sm text-gray-600">Discount</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-700">
                        ₹{calculateTotal().savings.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-600">You Save</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 mb-6">
                    <span className="text-2xl text-gray-500 line-through">
                      ₹{calculateTotal().subtotal.toLocaleString()}
                    </span>
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                    <span className="text-3xl font-bold text-green-700">
                      ₹{calculateTotal().total.toLocaleString()}
                    </span>
                  </div>

                  <Button
                    onClick={handleAddBundle}
                    size="lg"
                    className="bg-purple-700 hover:bg-purple-800 text-white px-8"
                  >
                    <Gift className="w-5 h-5 mr-2" />
                    Add Bundle to Cart
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Bundle Discount Table */}
          <div className="mb-12">
            <Card className="p-6">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-center text-xl">Bundle Discount Structure</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid md:grid-cols-4 gap-4">
                  {bundleDiscounts.map((bundle, index) => (
                    <div key={index} className="text-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {bundle.courses} Courses
                      </div>
                      <div className="text-lg font-semibold text-green-700 mb-1">
                        Save {bundle.discount}%
                      </div>
                      <div className="text-sm text-gray-600">
                        ₹{bundle.savings} savings
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Table */}
          {showComparison && (
            <div className="mb-12">
              <Card className="p-6">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-center text-xl">Course Comparison</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Course</th>
                          <th className="text-center p-3">Price</th>
                          <th className="text-center p-3">Duration</th>
                          <th className="text-center p-3">Completion Rate</th>
                          <th className="text-center p-3">Students</th>
                          <th className="text-center p-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b bg-green-50">
                          <td className="p-3">
                            <div className="font-semibold">{primaryCourse.title}</div>
                            <div className="text-gray-600 text-xs">{primaryCourse.subtitle}</div>
                          </td>
                          <td className="text-center p-3 font-bold text-green-700">
                            ₹{primaryCourse.price.toLocaleString()}
                          </td>
                          <td className="text-center p-3">{primaryCourse.duration}</td>
                          <td className="text-center p-3">{primaryCourse.completionRate}%</td>
                          <td className="text-center p-3">{primaryCourse.students}</td>
                          <td className="text-center p-3">
                            <Button size="sm" className="bg-green-700 hover:bg-green-800">
                              Enroll
                            </Button>
                          </td>
                        </tr>
                        {specializedCourses.map((course) => (
                          <tr key={course.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                              <div className="font-semibold">{course.title}</div>
                              <div className="text-gray-600 text-xs">{course.description}</div>
                            </td>
                            <td className="text-center p-3 font-bold">
                              ₹{course.price.toLocaleString()}
                            </td>
                            <td className="text-center p-3">3 months support</td>
                            <td className="text-center p-3">{course.completionRate}%</td>
                            <td className="text-center p-3">{course.students}</td>
                            <td className="text-center p-3">
                              <Button size="sm" variant="outline">
                                Enroll
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Trust Indicators */}
          <div className="text-center">
            <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">2,847+</div>
                  <p className="text-sm text-gray-600">Students Enrolled</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-700">4.9★</div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-700">94%</div>
                  <p className="text-sm text-gray-600">Completion Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-700">100%</div>
                  <p className="text-sm text-gray-600">Money-Back Guarantee</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
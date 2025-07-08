'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Award, 
  Play,
  Download,
  CheckCircle,
  Star,
  ShoppingCart
} from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { toast } from 'sonner';

const courses = [
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
    downloads: 15
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
    downloads: 35
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
    downloads: 50
  }
];

export function CourseShowcase() {
  const [selectedCourse, setSelectedCourse] = useState(0);
  const { addItem } = useCart();

  const handleAddToCart = (course: typeof courses[0]) => {
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
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-green-700 border-green-200">
              <BookOpen className="w-4 h-4 mr-2" />
              Expert-Led Courses
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              Transform Your Life with{' '}
              <span className="text-green-700">Scientific Education</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn from Dr. Peter Singh's 26-year research journey. Master aquaponics, 
              achieve clean air, and build sustainable income streams.
            </p>
          </div>

          {/* Course Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {courses.map((course, index) => (
              <Button
                key={course.id}
                variant={selectedCourse === index ? 'default' : 'outline'}
                onClick={() => setSelectedCourse(index)}
                className="flex items-center gap-2"
              >
                <Badge variant="secondary" className="text-xs">
                  {course.level}
                </Badge>
                {course.title}
              </Button>
            ))}
          </div>

          {/* Featured Course */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Course Image & Video */}
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <img
                  src={courses[selectedCourse].image}
                  alt={courses[selectedCourse].title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                    <Play className="w-6 h-6 mr-2" />
                    Watch Preview
                  </Button>
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">
                    {courses[selectedCourse].modules}
                  </div>
                  <p className="text-sm text-green-600">Modules</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">
                    {courses[selectedCourse].videos}
                  </div>
                  <p className="text-sm text-blue-600">Videos</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700">
                    {courses[selectedCourse].downloads}
                  </div>
                  <p className="text-sm text-purple-600">Downloads</p>
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-green-100 text-green-800">
                    {courses[selectedCourse].level}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{courses[selectedCourse].rating}</span>
                    <span className="text-gray-500">
                      ({courses[selectedCourse].students} students)
                    </span>
                  </div>
                </div>

                <h3 className="text-3xl font-bold mb-2 text-gray-900">
                  {courses[selectedCourse].title}
                </h3>
                <p className="text-xl text-gray-600 mb-4">
                  {courses[selectedCourse].subtitle}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {courses[selectedCourse].description}
                </p>
              </div>

              {/* Pricing */}
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-green-700">
                  ₹{courses[selectedCourse].price.toLocaleString()}
                </div>
                <div className="text-lg text-gray-500 line-through">
                  ₹{courses[selectedCourse].originalPrice.toLocaleString()}
                </div>
                <Badge variant="destructive">
                  {Math.round((1 - courses[selectedCourse].price / courses[selectedCourse].originalPrice) * 100)}% OFF
                </Badge>
              </div>

              {/* Course Features */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">What You'll Learn:</h4>
                <div className="space-y-2">
                  {courses[selectedCourse].features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Learning Outcomes:</h4>
                <div className="space-y-2">
                  {courses[selectedCourse].outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-green-700 hover:bg-green-800 text-white flex-1"
                  onClick={() => handleAddToCart(courses[selectedCourse])}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-green-700 text-green-700 hover:bg-green-50"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Syllabus
                </Button>
              </div>

              {/* Course Duration */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{courses[selectedCourse].duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{courses[selectedCourse].students} enrolled</span>
                </div>
              </div>
            </div>
          </div>

          {/* All Courses Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card 
                key={course.id} 
                className={`hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  selectedCourse === index ? 'ring-2 ring-green-400' : ''
                }`}
                onClick={() => setSelectedCourse(index)}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-green-700">
                      {course.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium text-sm">{course.rating}</span>
                    <span className="text-gray-500 text-sm">({course.students})</span>
                  </div>
                  
                  <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                  <p className="text-gray-600 text-sm mb-4">{course.subtitle}</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-green-700">
                        ₹{course.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        ₹{course.originalPrice.toLocaleString()}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(course);
                      }}
                      className="bg-green-700 hover:bg-green-800"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Smartphone, 
  Download, 
  Star, 
  Wind, 
  BookOpen, 
  Users,
  Bell,
  Camera,
  BarChart3,
  Share2,
  Shield,
  Zap,
  Globe,
  Play,
  CheckCircle,
  Apple,
  Chrome
} from 'lucide-react';

const appFeatures = [
  {
    icon: Wind,
    title: 'Real-Time AQI Tracking',
    description: 'Monitor your home\'s air quality with live data from connected devices',
    details: [
      'Connect with 15+ popular AQI monitors',
      'Manual entry with photo verification',
      'Historical trend analysis and predictions',
      'Goal setting with progress notifications',
      'Comparative analysis with local averages'
    ]
  },
  {
    icon: BookOpen,
    title: 'Offline Course Access',
    description: 'Download courses for uninterrupted learning anywhere',
    details: [
      'Download videos for offline viewing',
      'Sync progress across all devices',
      'Interactive quizzes and assessments',
      'Note-taking and bookmark functionality',
      'Certificate generation and sharing'
    ]
  },
  {
    icon: Share2,
    title: 'Social Sharing',
    description: 'Share your success and connect with the community',
    details: [
      'Share AQI improvements with privacy controls',
      'Celebrate milestones and achievements',
      'Connect with local study groups',
      'Peer messaging and support',
      'Success story submissions'
    ]
  },
  {
    icon: BarChart3,
    title: 'Progress Analytics',
    description: 'Comprehensive tracking of your learning and improvement journey',
    details: [
      'Detailed progress dashboards',
      'Goal tracking with custom targets',
      'Achievement badges and recognition',
      'Peer comparison tools',
      'Automated progress reports'
    ]
  }
];

const screenshots = [
  {
    title: 'Dashboard',
    description: 'Your personalized learning and progress hub',
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    title: 'AQI Tracking',
    description: 'Real-time air quality monitoring and trends',
    image: 'https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    title: 'Course Learning',
    description: 'Interactive video lessons with offline capability',
    image: 'https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    title: 'Community',
    description: 'Connect with fellow learners and share success',
    image: 'https://images.pexels.com/photos/4503276/pexels-photo-4503276.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const technicalSpecs = {
  platforms: ['iOS 14.0+', 'Android 8.0+', 'Progressive Web App'],
  size: '45 MB',
  languages: ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu'],
  offline: 'Full offline course access',
  sync: 'Real-time cloud synchronization',
  security: 'End-to-end encryption',
  performance: 'Optimized for 3G+ networks'
};

const userReviews = [
  {
    name: 'Rajesh Kumar',
    rating: 5,
    review: 'The offline feature is amazing! I can learn during my commute without worrying about data.',
    location: 'Delhi',
    verified: true
  },
  {
    name: 'Priya Sharma',
    rating: 5,
    review: 'AQI tracking is so convenient. Love seeing my progress in real-time!',
    location: 'Mumbai',
    verified: true
  },
  {
    name: 'Mohammed Ali',
    rating: 4,
    review: 'Great app with excellent content. The community features are very helpful.',
    location: 'Bangalore',
    verified: true
  }
];

export default function MobileAppPage() {
  const [selectedFeature, setSelectedFeature] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-white/20 text-white border-white/30">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile App
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Learn & Track AQI
                  <span className="block">On the Go</span>
                </h1>
                <p className="text-xl mb-8 text-green-100">
                  Access your courses, track air quality improvements, and connect with the community 
                  from anywhere with our comprehensive mobile app.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                    <Apple className="w-5 h-5 mr-2" />
                    Download for iOS
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Chrome className="w-5 h-5 mr-2" />
                    Get on Android
                  </Button>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>4.8 Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>10K+ Downloads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Secure & Private</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10">
                  <img
                    src="https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Mobile App Screenshot"
                    className="w-80 mx-auto rounded-3xl shadow-2xl"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-3xl blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Features Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Powerful Features for Your Success
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to learn, track progress, and achieve your air quality goals 
              in one comprehensive mobile application.
            </p>
          </div>

          <Tabs defaultValue="features" className="space-y-12">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* Features Tab */}
            <TabsContent value="features">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Feature List */}
                <div className="space-y-4">
                  {appFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <Card 
                        key={index}
                        className={`cursor-pointer transition-all duration-300 ${
                          selectedFeature === index ? 'ring-2 ring-green-400 shadow-lg' : 'hover:shadow-md'
                        }`}
                        onClick={() => setSelectedFeature(index)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                              <Icon className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                              <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Feature Details */}
                <Card className="lg:sticky lg:top-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      {React.createElement(appFeatures[selectedFeature].icon, { className: 'w-6 h-6 text-green-600' })}
                      {appFeatures[selectedFeature].title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6">{appFeatures[selectedFeature].description}</p>
                    
                    <div className="space-y-3">
                      {appFeatures[selectedFeature].details.map((detail, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700">
                        <strong>Pro Tip:</strong> Enable notifications to get reminded about daily AQI readings 
                        and course progress milestones.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Screenshots Tab */}
            <TabsContent value="screenshots">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {screenshots.map((screenshot, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={screenshot.image}
                          alt={screenshot.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                            <Play className="w-4 h-4 mr-2" />
                            View Demo
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{screenshot.title}</h3>
                      <p className="text-sm text-gray-600">{screenshot.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Card className="p-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
                  <CardContent>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Experience the Full App
                    </h3>
                    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                      Download the app to explore all features, including offline course access, 
                      real-time AQI tracking, and community interactions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                        <Apple className="w-5 h-5 mr-2" />
                        Download for iOS
                      </Button>
                      <Button size="lg" variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-50">
                        <Chrome className="w-5 h-5 mr-2" />
                        Get on Android
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Technical Specifications Tab */}
            <TabsContent value="technical">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>System Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Platforms</h4>
                        <div className="space-y-1">
                          {technicalSpecs.platforms.map((platform, index) => (
                            <div key={index} className="text-sm text-gray-600">{platform}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Languages</h4>
                        <div className="space-y-1">
                          {technicalSpecs.languages.map((language, index) => (
                            <div key={index} className="text-sm text-gray-600">{language}</div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-600">App Size:</span>
                          <span className="font-medium ml-2">{technicalSpecs.size}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Network:</span>
                          <span className="font-medium ml-2">{technicalSpecs.performance}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Capabilities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-800">Offline Access</p>
                          <p className="text-sm text-gray-600">{technicalSpecs.offline}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-800">Cloud Sync</p>
                          <p className="text-sm text-gray-600">{technicalSpecs.sync}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-gray-800">Security</p>
                          <p className="text-sm text-gray-600">{technicalSpecs.security}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-orange-600" />
                        <div>
                          <p className="font-medium text-gray-800">Multi-language</p>
                          <p className="text-sm text-gray-600">5 Indian languages supported</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>API Integration & Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Device Integration</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• IQAir AirVisual Pro</li>
                        <li>• Dyson Air Quality Monitors</li>
                        <li>• Xiaomi Mi Air Purifier</li>
                        <li>• Honeywell Air Touch</li>
                        <li>• Custom API support</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Security Features</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• End-to-end encryption</li>
                        <li>• Biometric authentication</li>
                        <li>• Secure data transmission</li>
                        <li>• Privacy controls</li>
                        <li>• GDPR compliance</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Performance</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• 3G+ network optimization</li>
                        <li>• Offline-first architecture</li>
                        <li>• Battery optimization</li>
                        <li>• Minimal data usage</li>
                        <li>• Fast app startup</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* User Reviews Tab */}
            <TabsContent value="reviews">
              <div className="space-y-8">
                {/* Overall Rating */}
                <Card className="p-8 text-center">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="text-5xl font-bold text-green-700">4.8</div>
                    <div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600">Based on 1,247 reviews</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm">{rating}</span>
                        <Progress 
                          value={rating === 5 ? 78 : rating === 4 ? 18 : rating === 3 ? 3 : rating === 2 ? 1 : 0} 
                          className="h-2" 
                        />
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Individual Reviews */}
                <div className="grid md:grid-cols-3 gap-6">
                  {userReviews.map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <p className="text-sm text-gray-600">{review.location}</p>
                          </div>
                          {review.verified && (
                            <Badge variant="outline" className="text-green-700 border-green-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                        
                        <p className="text-gray-700 text-sm italic">"{review.review}"</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Download CTA */}
                <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                  <CardContent>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Join 10,000+ Happy Users
                      </h3>
                      <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                        Download the Aanant Academy app today and start your journey towards 
                        cleaner air and better health.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-green-700 hover:bg-green-800">
                          <Apple className="w-5 h-5 mr-2" />
                          Download for iOS
                        </Button>
                        <Button size="lg" variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
                          <Chrome className="w-5 h-5 mr-2" />
                          Get on Android
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          <span>Free Download</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          <span>Secure & Private</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          <span>Works Offline</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
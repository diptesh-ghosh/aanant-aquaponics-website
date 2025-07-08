'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Calculator,
  ArrowRight,
  Users,
  Award,
  Star
} from 'lucide-react';
import { ServiceSelectionForm } from '@/components/service-selection-form';

export function ContactSection() {
  const [showFullForm, setShowFullForm] = useState(false);

  if (showFullForm) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <Button 
                variant="outline" 
                onClick={() => setShowFullForm(false)}
                className="mb-4"
              >
                ← Back to Contact Information
              </Button>
            </div>
            <ServiceSelectionForm />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-green-700 border-green-200">
              <MessageCircle className="w-4 h-4 mr-2" />
              Get Started Today
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              Transform Your Home to{' '}
              <span className="text-green-700">AQI 15</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ready to breathe clean air like 750+ families already do? Let's design your personalized 
              sustainable living solution and start your journey to pristine air quality.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="p-6">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-xl text-gray-900">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">dr.peter@aanantaquaponics.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Service Area</p>
                      <p className="text-gray-600">Delhi NCR (Gurgaon, Noida, Faridabad)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Response Time</p>
                      <p className="text-gray-600">Within 24-48 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What You Get */}
              <Card className="p-6 bg-green-50 border-green-200">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-xl text-green-800">What You Get</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <span className="text-green-700">Free air quality assessment of your current home</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <span className="text-green-700">Personalized sustainable system design</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <span className="text-green-700">ROI calculator for your specific situation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <span className="text-green-700">Step-by-step implementation timeline</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <span className="text-green-700">Ongoing support and monitoring guidance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Quick Calculator */}
              <Card className="p-6 bg-blue-50 border-blue-200">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Quick Savings Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Monthly health savings:</span>
                      <span className="font-semibold text-blue-800">₹15,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Plant sales income:</span>
                      <span className="font-semibold text-blue-800">₹8,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Energy cost savings:</span>
                      <span className="font-semibold text-blue-800">₹1,800</span>
                    </div>
                    <div className="border-t border-blue-200 pt-2 flex justify-between">
                      <span className="font-medium text-blue-800">Total monthly benefit:</span>
                      <span className="font-bold text-blue-800">₹25,300</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="space-y-8">
              <Card className="p-8 shadow-lg">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-2xl text-gray-900">Get Your Free Consultation</CardTitle>
                  <p className="text-gray-600">
                    Fill out our comprehensive service selection form and Dr. Peter Singh's team will contact you within 24-48 hours 
                    with a personalized sustainable living solution plan.
                  </p>
                </CardHeader>
                <CardContent className="p-0 space-y-6">
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-4">Our Comprehensive Form Includes:</h3>
                    <ul className="space-y-2 text-sm text-green-700">
                      <li>• Personal information and contact preferences</li>
                      <li>• Service selection from 8 specialized solutions</li>
                      <li>• Investment range and budget planning</li>
                      <li>• Detailed project requirements and goals</li>
                      <li>• Site visit scheduling options (Delhi/Goa/Lucknow)</li>
                      <li>• reCAPTCHA protection and secure submission</li>
                    </ul>
                  </div>

                  <Button
                    onClick={() => setShowFullForm(true)}
                    size="lg"
                    className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-full text-lg font-medium"
                  >
                    Start Service Selection Form
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Form takes 5-7 minutes to complete</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-green-700">750+</div>
                  <p className="text-sm text-gray-600">Happy Families</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-blue-700">26 Years</div>
                  <p className="text-sm text-gray-600">Research Experience</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-purple-700">15 AQI</div>
                  <p className="text-sm text-gray-600">Consistent Results</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-orange-700">24-48 Hrs</div>
                  <p className="text-sm text-gray-600">Response Time</p>
                </div>
              </div>

              {/* Additional Trust Elements */}
              <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Trusted by Families Across Delhi NCR</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Join hundreds of satisfied customers who have transformed their homes into healthy, sustainable living spaces.
                  </p>
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      <span>Government Recognized</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>Expert Team</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
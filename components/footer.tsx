'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Leaf,
  Award,
  Shield,
  Heart
} from 'lucide-react';

const footerLinks = {
  courses: [
    { name: 'Aquaponics Fundamentals', href: '/courses/basic-aquaponics' },
    { name: 'AQI Mastery Program', href: '/courses/aqi-mastery' },
    { name: 'Business Development', href: '/courses/business-mastery' },
    { name: 'All Course Bundles', href: '/courses' }
  ],
  resources: [
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'AQI Calculator', href: '/tools/aqi-calculator' },
    { name: 'Equipment Guide', href: '/resources/equipment' },
    { name: 'Scientific Papers', href: '/resources/research' }
  ],
  support: [
    { name: 'Help Center', href: '/support' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Student Portal', href: '/dashboard' },
    { name: 'Technical Support', href: '/support/technical' }
  ],
  company: [
    { name: 'About Dr. Singh', href: '/about' },
    { name: 'Our Mission', href: '/mission' },
    { name: 'Media Coverage', href: '/media' },
    { name: 'Careers', href: '/careers' }
  ]
};

const certifications = [
  { name: 'ISO 9001:2015', description: 'Quality Management' },
  { name: 'DPCC Approved', description: 'Delhi Pollution Control' },
  { name: 'WHO Certified', description: 'Environmental Health' },
  { name: 'ICAR Recognized', description: 'Agricultural Research' }
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl">Aanant Academy</span>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Transforming lives through scientifically-proven aquaponics education. 
                Achieve AQI 15 and generate sustainable income with Dr. Peter Singh's 
                26-year research methodology.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-green-400" />
                  <span className="text-sm">dr.peter@aanantaquaponics.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Delhi NCR, India</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Courses</h3>
              <ul className="space-y-3">
                {footerLinks.courses.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gray-800 rounded-lg p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Our Impact</h3>
              <p className="text-gray-300">Real results from our community</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">750+</div>
                <p className="text-sm text-gray-300">Successful Graduates</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">94.6%</div>
                <p className="text-sm text-gray-300">Average AQI Improvement</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">₹18.5K</div>
                <p className="text-sm text-gray-300">Average Monthly Income</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">26 Years</div>
                <p className="text-sm text-gray-300">Research Experience</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-center">Certifications & Recognition</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {certifications.map((cert) => (
                <div key={cert.name} className="text-center p-4 bg-gray-800 rounded-lg">
                  <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="font-semibold text-sm">{cert.name}</div>
                  <div className="text-xs text-gray-400">{cert.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-green-900 rounded-lg p-8 mb-12">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-green-100 mb-6">
                Get weekly tips on aquaponics, AQI monitoring, and success stories from our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500"
                />
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold mb-4">Follow Our Journey</h3>
            <div className="flex justify-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <Separator className="bg-gray-700 mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>© 2024 Aanant Aquaponics Academy. All rights reserved.</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund" className="text-gray-400 hover:text-white transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex justify-center items-center gap-6 mt-8 pt-8 border-t border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Heart className="w-4 h-4 text-red-400" />
              <span>30-Day Money Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Lifetime Access</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
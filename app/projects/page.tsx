'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Home, 
  Wind, 
  Thermometer, 
  Leaf, 
  Fish, 
  DollarSign,
  ArrowRight,
  MapPin,
  Waves,
  TreePine,
  Building,
  Flower,
  Apple,
  Palmtree,
  Calendar,
  Download
} from 'lucide-react';

const projects = [
  {
    id: 'delhi',
    title: 'Delhi Home Project',
    subtitle: 'AQI 15 Demonstration Villa',
    description: 'Our flagship 800-yard, 3-story villa showcasing the complete integration of aquaponics technology to achieve pristine air quality, natural cooling, and sustainable income generation.',
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'South Delhi, India',
    icon: Home,
    color: 'green',
    stats: [
      { label: 'Area', value: '800 yards' },
      { label: 'Capacity', value: '15,000 plants' },
      { label: 'Fish', value: '120kg' },
      { label: 'AQI', value: '15' }
    ],
    features: [
      'AQI 15 air quality',
      'Natural cooling system',
      'Income generation',
      'Agrivoltaic solar integration'
    ]
  },
  {
    id: 'goa',
    title: 'Goa Home Project',
    subtitle: 'Coastal Aquaponics Villa',
    description: 'Our 180m coastal villa in Dona Paula showcases how aquaponics technology can be adapted to coastal environments, combining Japanese garden aesthetics with practical food production.',
    image: 'https://images.pexels.com/photos/6231753/pexels-photo-6231753.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'Dona Paula, Goa, India',
    icon: Waves,
    color: 'blue',
    stats: [
      { label: 'Area', value: '180m villa' },
      { label: 'Capacity', value: '5,000 plants' },
      { label: 'Fish', value: '120kg' },
      { label: 'AQI', value: '5' }
    ],
    features: [
      'Rooftop greenhouse',
      'Aquaponic Japanese garden',
      'Seabass, Carp, Prawns',
      'Coastal adaptation'
    ]
  },
  {
    id: 'lucknow',
    title: 'Lucknow Home Project',
    subtitle: 'Daughter\'s Residence',
    description: 'A specialized aquaponics system designed for our daughter\'s residence in Hazratganj, featuring ground-level media beds, underground fish tanks, and integrated fruit tree irrigation.',
    image: 'https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'Hazratganj, Lucknow, India',
    icon: TreePine,
    color: 'amber',
    stats: [
      { label: 'Area', value: 'Residential' },
      { label: 'Capacity', value: '2,000 plants' },
      { label: 'Fish', value: 'Underground' },
      { label: 'AQI', value: '18' }
    ],
    features: [
      'Ground-level media beds',
      'Underground fish tanks',
      'Fruit tree irrigation',
      'Family-friendly design'
    ]
  }
];

const additionalProjects = [
  {
    id: 'mumbai-apartment',
    title: 'Mumbai Apartment',
    subtitle: 'High-Rise Urban Solution',
    description: 'Compact system designed for limited balcony space in a high-rise apartment building.',
    image: 'https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'Bandra, Mumbai',
    icon: Building,
    color: 'purple',
    stats: [
      { label: 'Area', value: '60 sq.m.' },
      { label: 'Capacity', value: '800 plants' },
      { label: 'Fish', value: '30kg' },
      { label: 'AQI', value: '22' }
    ]
  },
  {
    id: 'bangalore-tech-campus',
    title: 'Bangalore Tech Campus',
    subtitle: 'Commercial Implementation',
    description: 'Large-scale implementation for a tech company campus, providing fresh produce for the cafeteria.',
    image: 'https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'Electronic City, Bangalore',
    icon: Leaf,
    color: 'cyan',
    stats: [
      { label: 'Area', value: '1,200 sq.m.' },
      { label: 'Capacity', value: '25,000 plants' },
      { label: 'Fish', value: '350kg' },
      { label: 'AQI', value: '20' }
    ]
  },
  {
    id: 'kerala-resort',
    title: 'Kerala Resort',
    subtitle: 'Tropical Adaptation',
    description: 'Specialized system designed for high humidity and tropical conditions at a luxury resort.',
    image: 'https://images.pexels.com/photos/4503276/pexels-photo-4503276.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'Kumarakom, Kerala',
    icon: Palmtree,
    color: 'emerald',
    stats: [
      { label: 'Area', value: '400 sq.m.' },
      { label: 'Capacity', value: '8,000 plants' },
      { label: 'Fish', value: '180kg' },
      { label: 'AQI', value: '12' }
    ]
  }
];

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'from-green-500 to-green-600 text-white',
      blue: 'from-blue-500 to-blue-600 text-white',
      amber: 'from-amber-500 to-amber-600 text-white',
      purple: 'from-purple-500 to-purple-600 text-white',
      cyan: 'from-cyan-500 to-cyan-600 text-white',
      emerald: 'from-emerald-500 to-emerald-600 text-white'
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  const getBgColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-50 border-green-200',
      blue: 'bg-blue-50 border-blue-200',
      amber: 'bg-amber-50 border-amber-200',
      purple: 'bg-purple-50 border-purple-200',
      cyan: 'bg-cyan-50 border-cyan-200',
      emerald: 'bg-emerald-50 border-emerald-200'
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Showcase Projects
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Explore our portfolio of successful aquaponics implementations across India, 
              each demonstrating our ability to adapt to different environments and requirements.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((project) => {
                const Icon = project.icon;
                return (
                  <Card key={project.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-white/20 to-white/10 flex items-center justify-center">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-300 mb-4">{project.subtitle}</p>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Detailed case studies of our most successful implementations, showcasing the versatility 
                and effectiveness of our aquaponics technology in different environments.
              </p>
            </div>

            <div className="space-y-12">
              {projects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Image Side */}
                      <div className={`relative ${index % 2 === 1 ? 'order-1 lg:order-2' : ''}`}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover min-h-[400px]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <Badge className={`bg-${project.color}-700 text-white`}>
                            <Icon className="w-4 h-4 mr-2" />
                            {project.subtitle}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="grid grid-cols-4 gap-2">
                            {project.stats.map((stat, statIndex) => (
                              <div key={statIndex} className="bg-white/80 backdrop-blur-sm p-2 rounded-lg text-center">
                                <div className="font-bold text-gray-900">{stat.value}</div>
                                <div className="text-xs text-gray-700">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className={`p-8 ${index % 2 === 1 ? 'order-2 lg:order-1' : ''}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getColorClasses(project.color)} flex items-center justify-center`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{project.location}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="space-y-3 mb-6">
                          {project.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full bg-${project.color}-500`}></div>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Link href={`/projects/${project.id}`}>
                          <Button className={`bg-${project.color}-700 hover:bg-${project.color}-800`}>
                            View Project Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Projects */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                More Success Stories
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Additional projects showcasing the versatility of our aquaponics systems 
                across different environments and use cases.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalProjects.map((project) => {
                const Icon = project.icon;
                return (
                  <Card key={project.id} className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${getBgColorClasses(project.color)}`}>
                    <div className="relative h-48">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <Badge className={`bg-${project.color}-700 text-white`}>
                          <Icon className="w-3 h-3 mr-1" />
                          {project.subtitle}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getColorClasses(project.color)} flex items-center justify-center`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span>{project.location}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 text-sm">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {project.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="bg-white p-2 rounded-lg text-center">
                            <div className="font-bold text-gray-900 text-sm">{stat.value}</div>
                            <div className="text-xs text-gray-700">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      <Button variant="outline" className="w-full">
                        Coming Soon
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Create Your Own Success Story?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Schedule a consultation to discuss how we can implement a custom aquaponics system 
              for your specific needs, location, and goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Consultation
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Download className="w-5 h-5 mr-2" />
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
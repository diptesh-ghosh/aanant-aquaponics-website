import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// This is a utility endpoint to seed initial data for testing
// In production, you would remove this endpoint or secure it properly
export async function GET(req: Request) {
  try {
    const supabase = createAdminClient()
    
    // Seed AQI readings
    await seedAQIReadings(supabase)
    
    // Seed harvest stats
    await seedHarvestStats(supabase)
    
    // Seed testimonials
    await seedTestimonials(supabase)
    
    // Seed courses
    await seedCourses(supabase)
    
    // Seed blog posts
    await seedBlogPosts(supabase)
    
    return NextResponse.json({ success: true, message: 'Data seeded successfully' })
  } catch (error) {
    console.error('Error seeding data:', error)
    return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 })
  }
}

async function seedAQIReadings(supabase: any) {
  // Check if data already exists
  const { data: existingData } = await supabase
    .from('aqi_readings')
    .select('id')
    .limit(1)
  
  if (existingData && existingData.length > 0) {
    console.log('AQI readings already exist, skipping seed')
    return
  }
  
  // Seed Delhi AQI
  await supabase.from('aqi_readings').insert({
    current_aqi: 280,
    pm25: 168,
    pm10: 336,
    location: 'Delhi',
    timestamp: new Date().toISOString()
  })
  
  // Seed Aanant Home AQI
  await supabase.from('aqi_readings').insert({
    current_aqi: 15,
    pm25: 5,
    pm10: 10,
    location: 'Aanant Home',
    timestamp: new Date().toISOString()
  })
}

async function seedHarvestStats(supabase: any) {
  // Check if data already exists
  const { data: existingData } = await supabase
    .from('harvest_stats')
    .select('id')
    .limit(1)
  
  if (existingData && existingData.length > 0) {
    console.log('Harvest stats already exist, skipping seed')
    return
  }
  
  // Seed harvest stats
  await supabase.from('harvest_stats').insert({
    total_plants: 15000,
    fish_production: 120,
    monthly_revenue: 25000,
    updated_at: new Date().toISOString()
  })
}

async function seedTestimonials(supabase: any) {
  // Check if data already exists
  const { data: existingData } = await supabase
    .from('testimonials')
    .select('id')
    .limit(1)
  
  if (existingData && existingData.length > 0) {
    console.log('Testimonials already exist, skipping seed')
    return
  }
  
  // Seed testimonials
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      content: 'My son\'s asthma disappeared within 6 months. AQI in our home went from 250+ to 18. The additional income is a wonderful bonus.',
      rating: 5,
      featured: true,
      avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Priya Sharma',
      content: 'Dr. Singh\'s method saved our family. We can finally breathe freely at home, and the business has given me financial independence.',
      rating: 5,
      featured: true,
      avatar_url: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Mohammed Ali',
      content: 'As an engineer, I needed to see the data. The system has transformed my daughter\'s health while creating a significant additional income stream.',
      rating: 5,
      featured: true,
      avatar_url: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]
  
  await supabase.from('testimonials').insert(testimonials)
}

async function seedCourses(supabase: any) {
  // Check if data already exists
  const { data: existingData } = await supabase
    .from('courses')
    .select('id')
    .limit(1)
  
  if (existingData && existingData.length > 0) {
    console.log('Courses already exist, skipping seed')
    return
  }
  
  // Seed courses
  const courses = [
    {
      title: 'Aquaponics Fundamentals',
      subtitle: 'Master the Basics of Clean Air Generation',
      description: 'Learn the fundamental principles of aquaponics and achieve your first AQI improvement within 30 days.',
      price: 1999,
      original_price: 2999,
      duration: '4 weeks',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=600',
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
      title: 'AQI Mastery Program',
      subtitle: 'Advanced Air Quality Optimization',
      description: 'Advanced techniques to achieve and maintain AQI 15-25 consistently while generating supplementary income.',
      price: 4999,
      original_price: 7999,
      duration: '8 weeks',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=600',
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
      title: 'Aquaponics Business Mastery',
      subtitle: 'Build Your Clean Air Enterprise',
      description: 'Complete business framework to build a profitable aquaponics enterprise while helping others achieve clean air.',
      price: 9999,
      original_price: 15999,
      duration: '12 weeks',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/4503735/pexels-photo-4503735.jpeg?auto=compress&cs=tinysrgb&w=600',
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
    }
  ]
  
  await supabase.from('courses').insert(courses)
  
  // Seed course bundles
  const bundles = [
    {
      bundle_name: 'Clean Air Starter',
      description: 'Perfect for beginners wanting to improve their home air quality',
      courses_included: ['Aquaponics Fundamentals'],
      original_price: 2999,
      discounted_price: 1999,
      image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: [
        'Aquaponics Fundamentals Course',
        'Basic AQI monitoring guide',
        'Plant selection toolkit',
        'Email support for 3 months',
        'Community access'
      ]
    },
    {
      bundle_name: 'AQI Mastery Bundle',
      description: 'Complete solution for achieving and maintaining AQI 15',
      courses_included: ['Aquaponics Fundamentals', 'AQI Mastery Program'],
      original_price: 10998,
      discounted_price: 5999,
      image: 'https://images.pexels.com/photos/4503734/pexels-photo-4503734.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: [
        'Aquaponics Fundamentals Course',
        'AQI Mastery Program',
        'Advanced monitoring equipment guide',
        'Income generation strategies',
        'Priority support for 6 months',
        'Monthly group coaching calls',
        'Scientific protocol templates'
      ]
    }
  ]
  
  await supabase.from('course_bundles').insert(bundles)
}

async function seedBlogPosts(supabase: any) {
  // Check if data already exists
  const { data: existingData } = await supabase
    .from('blog_posts')
    .select('id')
    .limit(1)
  
  if (existingData && existingData.length > 0) {
    console.log('Blog posts already exist, skipping seed')
    return
  }
  
  // Get admin user for author_id
  const { data: adminUser } = await supabase
    .from('profiles')
    .select('id')
    .eq('role', 'admin')
    .limit(1)
  
  const authorId = adminUser && adminUser.length > 0 ? adminUser[0].id : null
  
  // Seed blog posts
  const blogPosts = [
    {
      title: '15 May 2025: Weekend Harvest Bonanza from Delhi Home',
      content: `<p>This weekend's harvest from our Delhi home system was particularly abundant, with perfect growing conditions leading to exceptional quality across all produce varieties.</p>
      
      <h3>Harvest Breakdown</h3>
      <ul>
        <li><strong>Spring Onions:</strong> 2kg (45 bunches, 8-10 stalks per bunch)</li>
        <li><strong>Oyster Mushrooms:</strong> 1.5kg total harvest</li>
        <li><strong>Celery:</strong> 8 bunches, average weight 250g per bunch</li>
        <li><strong>Parsley:</strong> 1kg (20 bunches)</li>
        <li><strong>Mint:</strong> 500g (20 bunches)</li>
        <li><strong>Microgreens:</strong> 12 trays, 150g per tray</li>
        <li><strong>Spinach:</strong> 3kg (42 bunches, 200g per bunch)</li>
        <li><strong>Lettuce:</strong> 15 heads, average weight 300g</li>
      </ul>`,
      excerpt: 'Fresh harvest showcase: 2kg spring onions, 1.5kg oyster mushrooms, 8 celery bunches, 1kg parsley, 500g mint, 12 microgreen trays, 3kg spinach, 15 lettuce heads. Weekend sales revenue: ₹2,400.',
      author_id: authorId,
      published_date: '2025-05-15T10:00:00Z',
      featured_image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=800',
      slug: '15-may-2025-weekend-harvest-bonanza',
      category: 'Weekly Harvest Reports',
      tags: ['Delhi', 'Harvest', 'Organic Produce', 'Weekend Sales'],
      featured: true,
      read_time: '5 min'
    },
    {
      title: '10 May 2025: Seasonal Transition - Summer Vegetables Thriving',
      content: `<p>As we transition fully into Delhi's summer season, our aquaponics system is demonstrating exceptional resilience and productivity despite the challenging external conditions.</p>
      
      <h3>Top Performing Summer Vegetables</h3>
      
      <h4>1. Bhindi (Okra)</h4>
      <p>Our vertical growing towers are producing exceptional bhindi yields. The plants are thriving in the nutrient-rich water and controlled environment, producing tender, flavorful pods every 2-3 days.</p>
      
      <h4>2. Beans (Multiple Varieties)</h4>
      <p>Both bush and pole bean varieties are performing exceptionally well. The climbing varieties are utilizing vertical space efficiently while producing abundant harvests.</p>`,
      excerpt: 'Best vegetables for Delhi summer: Bhindi, beans, bottle gourd, cucumber, melons. System adjustments for hot weather. Natural cooling performance: 25°C inside, 45°C outside. Water consumption optimization techniques.',
      author_id: authorId,
      published_date: '2025-05-10T10:00:00Z',
      featured_image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=800',
      slug: '10-may-2025-seasonal-transition-summer-vegetables',
      category: 'Seasonal Growing Guides',
      tags: ['Summer', 'Vegetables', 'Growing Guide', 'Climate Adaptation'],
      featured: true,
      read_time: '8 min'
    }
  ]
  
  await supabase.from('blog_posts').insert(blogPosts)
}
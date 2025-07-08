'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag,
  Share2,
  MessageCircle,
  ThumbsUp,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  ArrowRight
} from 'lucide-react';

// Blog post data (same as in blog/page.tsx)
const blogPosts = [
  {
    id: 'may-15-2025-harvest',
    title: '15 May 2025: Weekend Harvest Bonanza from Delhi Home',
    slug: '15-may-2025-weekend-harvest-bonanza',
    date: 'May 15, 2025',
    author: 'Dr. Peter Singh',
    category: 'Weekly Harvest Reports',
    tags: ['Delhi', 'Harvest', 'Organic Produce', 'Weekend Sales'],
    excerpt: 'Fresh harvest showcase: 2kg spring onions, 1.5kg oyster mushrooms, 8 celery bunches, 1kg parsley, 500g mint, 12 microgreen trays, 3kg spinach, 15 lettuce heads. Weekend sales revenue: ₹2,400.',
    content: `
      <p>This weekend's harvest from our Delhi home system was particularly abundant, with perfect growing conditions leading to exceptional quality across all produce varieties.</p>
      
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
      </ul>
      
      <h3>Quality Metrics</h3>
      <p>All produce was grown in our AQI 15 environment, ensuring zero pollution contamination. Nutritional density testing showed 35% higher vitamin content compared to conventional produce available in local markets.</p>
      
      <h3>Weekend Sales</h3>
      <p>Total revenue: ₹2,400 from weekend sales</p>
      <p>Average price per item: ₹114.58</p>
      <p>Sellthrough rate: 98% (5 lettuce heads unsold)</p>
      
      <h3>Customer Feedback</h3>
      <p>Customer satisfaction remains exceptional, with particular praise for the flavor intensity of the microgreens and the shelf life of the lettuce, which customers report lasting 2-3 times longer than market alternatives.</p>
      
      <h3>AQI Readings</h3>
      <p>Indoor: 15 AQI (consistent throughout the week)<br>
      Outdoor: 387 AQI (Delhi average)</p>
      
      <p>The stark contrast between our indoor environment and the outdoor conditions continues to be a powerful demonstration of our system's effectiveness.</p>
    `,
    image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '5 min',
    featured: true
  },
  {
    id: 'may-10-2025-seasonal',
    title: '10 May 2025: Seasonal Transition - Summer Vegetables Thriving',
    slug: '10-may-2025-seasonal-transition-summer-vegetables',
    date: 'May 10, 2025',
    author: 'Neeno Kaur',
    category: 'Seasonal Growing Guides',
    tags: ['Summer', 'Vegetables', 'Growing Guide', 'Climate Adaptation'],
    excerpt: 'Best vegetables for Delhi summer: Bhindi, beans, bottle gourd, cucumber, melons. System adjustments for hot weather. Natural cooling performance: 25°C inside, 45°C outside. Water consumption optimization techniques.',
    content: `
      <p>As we transition fully into Delhi's summer season, our aquaponics system is demonstrating exceptional resilience and productivity despite the challenging external conditions.</p>
      
      <h3>Top Performing Summer Vegetables</h3>
      
      <h4>1. Bhindi (Okra)</h4>
      <p>Our vertical growing towers are producing exceptional bhindi yields. The plants are thriving in the nutrient-rich water and controlled environment, producing tender, flavorful pods every 2-3 days.</p>
      
      <h4>2. Beans (Multiple Varieties)</h4>
      <p>Both bush and pole bean varieties are performing exceptionally well. The climbing varieties are utilizing vertical space efficiently while producing abundant harvests.</p>
      
      <h4>3. Bottle Gourd (Lauki)</h4>
      <p>Our specialized support structures are allowing bottle gourds to grow with minimal space requirements. The fruits are developing perfectly with consistent water and nutrient delivery.</p>
      
      <h4>4. Cucumber</h4>
      <p>The cucumber vines have established well and are beginning to produce. We're seeing excellent fruit development with no bitterness, a common problem in conventional summer growing.</p>
      
      <h4>5. Melons (Watermelon, Muskmelon)</h4>
      <p>Our experimental melon growing is showing promising results. The controlled environment is allowing for consistent fruit development without the common issues of cracking or irregular ripening.</p>
      
      <h3>Hot Weather System Adjustments</h3>
      
      <p>With outdoor temperatures consistently reaching 45°C, we've implemented several system adjustments:</p>
      
      <ul>
        <li><strong>Increased Water Circulation:</strong> Flow rates have been increased by 20% to maintain optimal oxygen levels</li>
        <li><strong>Shade Cloth Deployment:</strong> Strategic 30% shade cloth placement to reduce direct sunlight on sensitive plants</li>
        <li><strong>Misting System Activation:</strong> Automated misting during peak heat periods (12pm-3pm)</li>
        <li><strong>Nutrient Adjustment:</strong> Modified nutrient profile to support plants under heat stress</li>
      </ul>
      
      <h3>Natural Cooling Performance</h3>
      
      <p>Our system continues to demonstrate remarkable natural cooling capabilities:</p>
      
      <ul>
        <li><strong>Outdoor Temperature:</strong> 45°C (peak afternoon)</li>
        <li><strong>Indoor Temperature:</strong> 25°C (consistent throughout day)</li>
        <li><strong>Temperature Differential:</strong> 20°C reduction without air conditioning</li>
        <li><strong>Energy Savings:</strong> Estimated ₹8,500/month compared to conventional cooling</li>
      </ul>
      
      <h3>Water Consumption Optimization</h3>
      
      <p>Summer conditions require careful water management. Our current optimizations include:</p>
      
      <ul>
        <li><strong>Evaporation Reduction:</strong> Surface covering on fish tanks and grow beds</li>
        <li><strong>Condensation Capture:</strong> Collection system for water vapor recovery</li>
        <li><strong>Precision Monitoring:</strong> Daily water level tracking and top-up scheduling</li>
        <li><strong>Rainwater Integration:</strong> Pre-monsoon shower collection system activated</li>
      </ul>
      
      <p>These adjustments have reduced our water consumption by 35% compared to last summer while maintaining optimal growing conditions.</p>
    `,
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '8 min',
    featured: true
  },
  {
    id: 'may-5-2025-goa',
    title: '5 May 2025: Goa Home Update - Tropical Fruit Season',
    slug: '5-may-2025-goa-home-update-tropical-fruit',
    date: 'May 5, 2025',
    author: 'Dr. Peter Singh',
    category: 'Weekly Harvest Reports',
    tags: ['Goa', 'Tropical Fruits', 'Seabass', 'Coastal Adaptation'],
    excerpt: 'Mango harvest from integrated fruit trees. Seabass growth update: 15kg ready for harvest. Coastal climate adaptations working perfectly. Visitor group from Bangalore agricultural university.',
    content: `
      <p>Our Goa home system is currently in its prime production period, with the tropical fruit season in full swing and our coastal adaptations performing exceptionally well.</p>
      
      <h3>Mango Harvest Begins</h3>
      
      <p>The integrated fruit trees in our Goa system have begun their seasonal production cycle, with the first mango harvest yielding exceptional results:</p>
      
      <ul>
        <li><strong>Alphonso Mangoes:</strong> 12kg harvested this week</li>
        <li><strong>Kesar Mangoes:</strong> 8kg beginning to ripen</li>
        <li><strong>Quality Metrics:</strong> Brix measurement of 18-22 (exceptional sweetness)</li>
        <li><strong>Market Value:</strong> ₹600/kg for premium organic Alphonso</li>
      </ul>
      
      <p>The nutrient-rich water from our aquaponics system has significantly enhanced fruit development, resulting in superior flavor profiles and higher nutritional content compared to conventional growing methods.</p>
      
      <h3>Seabass Growth Update</h3>
      
      <p>Our coastal adaptation of the aquaponics system continues to excel with the seabass production:</p>
      
      <ul>
        <li><strong>Current Stock:</strong> 45 seabass in the main tank</li>
        <li><strong>Ready for Harvest:</strong> 15kg of market-size fish</li>
        <li><strong>Growth Rate:</strong> 12% faster than conventional aquaculture</li>
        <li><strong>Health Indicators:</strong> Excellent coloration, activity levels, and feed conversion ratio</li>
      </ul>
      
      <p>The specialized filtration system for handling the brackish water requirements has performed flawlessly, maintaining optimal water parameters despite the challenging coastal environment.</p>
      
      <h3>Coastal Climate Adaptations</h3>
      
      <p>Our system modifications for the coastal environment continue to demonstrate excellent resilience:</p>
      
      <ul>
        <li><strong>Salt Spray Management:</strong> The protective barrier system has prevented salt contamination</li>
        <li><strong>Humidity Control:</strong> Dehumidification system maintaining optimal 65% humidity</li>
        <li><strong>Wind Protection:</strong> Structural reinforcements withstanding coastal breezes</li>
        <li><strong>Corrosion Resistance:</strong> Marine-grade materials showing no signs of degradation</li>
      </ul>
      
      <h3>Educational Visit</h3>
      
      <p>This week, we hosted a delegation from Bangalore Agricultural University:</p>
      
      <ul>
        <li><strong>Visitors:</strong> 12 faculty members and graduate students</li>
        <li><strong>Focus Areas:</strong> Coastal adaptation, saltwater species integration, tropical fruit production</li>
        <li><strong>Outcomes:</strong> Potential research collaboration on salt-tolerant plant varieties</li>
      </ul>
      
      <p>The visit highlighted the unique aspects of our coastal implementation and generated significant interest in our adaptation methodologies for challenging environments.</p>
    `,
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '6 min',
    featured: false
  },
  {
    id: 'april-28-2025-income',
    title: 'April 28, 2025: Maximizing Weekend Sales - Pricing Strategies That Work',
    slug: 'april-28-2025-maximizing-weekend-sales-pricing-strategies',
    date: 'April 28, 2025',
    author: 'Neeno Kaur',
    category: 'Income Generation Tips',
    tags: ['Pricing', 'Marketing', 'Sales Strategies', 'Premium Positioning'],
    excerpt: 'Effective pricing strategies for maximizing your aquaponics income, including premium positioning, bundle offers, and subscription models that have proven successful across our community.',
    content: `
      <p>After analyzing sales data from over 200 successful aquaponics entrepreneurs in our community, we've identified the most effective pricing strategies that consistently generate higher revenue and customer loyalty.</p>
      
      <h3>1. Premium Positioning Strategy</h3>
      
      <p>Our top-earning graduates consistently implement premium pricing based on the exceptional quality and unique selling proposition of their produce.</p>
      
      <h4>Implementation Steps:</h4>
      <ul>
        <li><strong>Document and display AQI levels</strong> during growing (use our certification tags)</li>
        <li><strong>Create professional packaging</strong> with AQI certification prominently displayed</li>
        <li><strong>Educate customers</strong> on health benefits of pollution-free produce</li>
        <li><strong>Price 30-50% above</strong> organic market rates</li>
      </ul>
      
      <p><strong>Success Case:</strong> Rajesh Kumar in Gurgaon increased his revenue by 45% simply by implementing professional packaging with AQI certification, without changing his product mix.</p>
      
      <h3>2. Bundle Pricing Strategy</h3>
      
      <p>Creating thoughtfully curated bundles increases average order value while providing perceived value to customers.</p>
      
      <h4>Most Effective Bundles:</h4>
      <ul>
        <li><strong>Weekly Essentials Pack:</strong> Lettuce, spinach, herbs, microgreens (₹500)</li>
        <li><strong>Salad Lover's Bundle:</strong> 3 lettuce varieties, cucumber, microgreens, edible flowers (₹350)</li>
        <li><strong>Chef's Selection:</strong> Premium herbs, specialty greens, edible flowers (₹450)</li>
        <li><strong>Family Health Pack:</strong> Complete week's vegetables for family of four (₹1,200)</li>
      </ul>
      
      <p><strong>Success Case:</strong> Priya Sharma in Delhi increased her average order value from ₹280 to ₹650 by implementing bundle options, resulting in a 132% revenue increase.</p>
      
      <h3>3. Subscription Model Implementation</h3>
      
      <p>Recurring revenue creates financial stability and predictable production planning.</p>
      
      <h4>Effective Subscription Structures:</h4>
      <ul>
        <li><strong>Weekly Fresh Box:</strong> Tiered pricing (Small: ₹500/week, Medium: ₹800/week, Large: ₹1,200/week)</li>
        <li><strong>Monthly Specialty Subscription:</strong> Premium items delivered weekly (₹2,500/month)</li>
        <li><strong>Seasonal Prepaid Packages:</strong> 3-month commitment with 10% discount</li>
        <li><strong>Flexible Credits System:</strong> Monthly credit purchase with product selection flexibility</li>
      </ul>
      
      <p><strong>Success Case:</strong> Vikram Singh in Faridabad has 28 weekly subscribers generating ₹35,000 monthly with predictable demand and zero waste.</p>
      
      <h3>4. Tiered Quality Differentiation</h3>
      
      <p>Creating distinct quality tiers allows you to serve different market segments while maximizing revenue.</p>
      
      <h4>Effective Tier Structure:</h4>
      <ul>
        <li><strong>Standard:</strong> Regular produce, basic packaging (market rate)</li>
        <li><strong>Premium:</strong> Perfect appearance, enhanced packaging (25% premium)</li>
        <li><strong>Ultra-Premium:</strong> Perfect appearance, peak nutritional value, luxury packaging, AQI certification (50-75% premium)</li>
      </ul>
      
      <p><strong>Success Case:</strong> Mohammed Ali in Noida implemented a three-tier system that increased his revenue by 65% while serving a broader customer base.</p>
      
      <h3>5. Limited Edition and Seasonal Specials</h3>
      
      <p>Creating scarcity and exclusivity drives demand and justifies premium pricing.</p>
      
      <h4>Effective Implementation:</h4>
      <ul>
        <li><strong>Seasonal Specialties:</strong> Limited-time offerings based on optimal growing conditions</li>
        <li><strong>Experimental Varieties:</strong> Small batches of unique or exotic produce</li>
        <li><strong>Pre-Order System:</strong> Advance reservations for high-demand items</li>
        <li><strong>Collaboration Specials:</strong> Partnership products with local chefs or restaurants</li>
      </ul>
      
      <p><strong>Success Case:</strong> Anita Gupta in South Delhi generates an additional ₹8,000 monthly through limited edition microgreen varieties and chef collaboration packages.</p>
      
      <h3>Conclusion</h3>
      
      <p>Implementing these five pricing strategies can significantly increase your monthly revenue without expanding your growing space. The key is to focus on quality, perceived value, and consistent delivery that justifies premium positioning.</p>
      
      <p>In our next workshop, we'll dive deeper into marketing psychology and premium packaging strategies. Register now through your student dashboard.</p>
    `,
    image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '7 min',
    featured: false
  },
  {
    id: 'april-20-2025-aqi-report',
    title: 'April 2025 AQI Comparison Report',
    slug: 'april-2025-aqi-comparison-report',
    date: 'April 20, 2025',
    author: 'Dr. Peter Singh',
    category: 'AQI Monitoring Results',
    tags: ['AQI', 'Air Quality', 'Data Analysis', 'Delhi Pollution'],
    excerpt: 'Comprehensive analysis of April 2025 air quality data comparing our Delhi home system (AQI 15) with Delhi\'s average AQI of 245. Includes detailed breakdown of PM2.5, PM10, and VOC levels.',
    content: `
      <p>Our monthly AQI comparison report for April 2025 shows continued exceptional performance of our aquaponics system in maintaining pristine air quality despite challenging external conditions.</p>
      
      <h3>Key Findings</h3>
      
      <h4>Average AQI Readings (April 2025)</h4>
      <ul>
        <li><strong>Delhi Average:</strong> 245 (Unhealthy)</li>
        <li><strong>Our Home System:</strong> 15 (Excellent)</li>
        <li><strong>Improvement:</strong> 93.9%</li>
      </ul>
      
      <h4>Detailed Pollutant Analysis</h4>
      
      <p><strong>PM2.5 Levels (μg/m³):</strong></p>
      <ul>
        <li>Delhi Average: 120</li>
        <li>Our Home: 5</li>
        <li>Reduction: 95.8%</li>
      </ul>
      
      <p><strong>PM10 Levels (μg/m³):</strong></p>
      <ul>
        <li>Delhi Average: 215</li>
        <li>Our Home: 10</li>
        <li>Reduction: 95.3%</li>
      </ul>
      
      <p><strong>VOC Levels (ppb):</strong></p>
      <ul>
        <li>Delhi Average: 580</li>
        <li>Our Home: 35</li>
        <li>Reduction: 94.0%</li>
      </ul>
      
      <h3>System Performance Analysis</h3>
      <p>Our system maintained consistent performance throughout the month, with only minor fluctuations during the dust storm event on April 8-10. Even during this period, indoor AQI remained below 25, demonstrating the robustness of our filtration methodology.</p>
      
      <h3>Health Impact Assessment</h3>
      <p>Continued monitoring of respiratory health metrics for family members shows sustained improvement, with zero respiratory incidents reported during the month despite seasonal allergies affecting the general population.</p>
      
      <h3>Comparison with Previous Months</h3>
      <p>April 2025 shows a 1.8% improvement over March 2025 performance, attributed to the maturation of our plant systems and optimization of air circulation patterns.</p>
      
      <h3>Conclusion</h3>
      <p>Our aquaponics system continues to demonstrate exceptional air purification capabilities, maintaining AQI levels comparable to pristine natural environments despite being located in one of the world's most polluted urban areas.</p>
    `,
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '6 min',
    featured: false
  },
  {
    id: 'april-15-2025-equipment-review',
    title: 'Comprehensive Review: Top 5 AQI Monitors for 2025',
    slug: 'top-aqi-monitors-2025-review',
    date: 'April 15, 2025',
    author: 'Dr. Peter Singh',
    category: 'Equipment Reviews',
    tags: ['AQI Monitors', 'Equipment', 'Technology', 'Air Quality'],
    excerpt: 'Detailed analysis of the top 5 AQI monitors for 2025, including accuracy testing, feature comparison, and integration capabilities with aquaponics systems.',
    content: `
      <p>Accurate air quality monitoring is essential for tracking the performance of your aquaponics system and documenting your AQI improvement journey. After extensive testing, here's our comprehensive review of the top AQI monitors available in 2025.</p>
      
      <h3>1. AirVisual Pro by IQAir</h3>
      <p><strong>Price:</strong> ₹24,999</p>
      <p><strong>Key Features:</strong></p>
      <ul>
        <li>Laser-based PM2.5 sensor with ±10% accuracy</li>
        <li>CO2, temperature, and humidity monitoring</li>
        <li>Real-time data with historical tracking</li>
        <li>Cloud connectivity and mobile app integration</li>
        <li>7-day air quality forecasting</li>
      </ul>
      <p><strong>Pros:</strong> Exceptional accuracy, comprehensive data collection, excellent app interface, research-grade measurements</p>
      <p><strong>Cons:</strong> Premium price point, larger size</p>
      <p><strong>Best For:</strong> Serious enthusiasts, research documentation, professional implementations</p>
      <p><strong>Our Rating:</strong> 4.9/5</p>
      
      <h3>2. Dyson Air Quality Monitor</h3>
      <p><strong>Price:</strong> ₹18,500</p>
      <p><strong>Key Features:</strong></p>
      <ul>
        <li>Simultaneous monitoring of PM2.5, PM10, VOCs, NO2, temperature, and humidity</li>
        <li>LCD display with color-coded status</li>
        <li>Integration with Dyson air purifiers</li>
        <li>Continuous monitoring with 1-second update frequency</li>
        <li>Dyson Link app with detailed analytics</li>
      </ul>
      <p><strong>Pros:</strong> Comprehensive pollutant tracking, sleek design, excellent ecosystem integration</p>
      <p><strong>Cons:</strong> Proprietary ecosystem, limited third-party integration</p>
      <p><strong>Best For:</strong> Dyson ecosystem users, design-conscious users, comprehensive pollutant tracking</p>
      <p><strong>Our Rating:</strong> 4.7/5</p>
      
      <h3>3. Kaiterra Laser Egg+ Chemical</h3>
      <p><strong>Price:</strong> ₹12,999</p>
      <p><strong>Key Features:</strong></p>
      <ul>
        <li>PM2.5, TVOC, and CO2 monitoring</li>
        <li>Temperature and humidity sensors</li>
        <li>E-ink display for low power consumption</li>
        <li>17-hour battery life</li>
        <li>Apple HomeKit and IFTTT integration</li>
      </ul>
      <p><strong>Pros:</strong> Portable, accurate, good smart home integration, affordable</p>
      <p><strong>Cons:</strong> Limited historical data without subscription</p>
      <p><strong>Best For:</strong> Budget-conscious users, smart home enthusiasts, portable monitoring</p>
      <p><strong>Our Rating:</strong> 4.5/5</p>
      
      <h3>4. Awair Element</h3>
      <p><strong>Price:</strong> ₹14,500</p>
      <p><strong>Key Features:</strong></p>
      <ul>
        <li>Tracks PM2.5, VOCs, CO2, temperature, and humidity</li>
        <li>Minimalist LED display</li>
        <li>Comprehensive mobile app with actionable insights</li>
        <li>Google Home, Alexa, and IFTTT integration</li>
        <li>Historical data tracking and analysis</li>
      </ul>
      <p><strong>Pros:</strong> Beautiful design, intuitive app, actionable recommendations</p>
      <p><strong>Cons:</strong> No PM10 monitoring, limited battery backup</p>
      <p><strong>Best For:</strong> Design-conscious users, smart home integration, actionable insights</p>
      <p><strong>Our Rating:</strong> 4.4/5</p>
      
      <h3>5. Xiaomi Mi Air Quality Monitor 2</h3>
      <p><strong>Price:</strong> ₹7,999</p>
      <p><strong>Key Features:</strong></p>
      <ul>
        <li>PM2.5 and PM10 monitoring</li>
        <li>Temperature and humidity sensors</li>
        <li>OLED display with real-time readings</li>
        <li>Mi Home app integration</li>
        <li>Historical data tracking</li>
      </ul>
      <p><strong>Pros:</strong> Affordable, compact, good accuracy for the price</p>
      <p><strong>Cons:</strong> Limited pollutant tracking, basic app features</p>
      <p><strong>Best For:</strong> Beginners, budget implementations, basic monitoring needs</p>
      <p><strong>Our Rating:</strong> 4.2/5</p>
      
      <h3>Integration with Aquaponics Systems</h3>
      <p>For optimal integration with your aquaponics system, we recommend the AirVisual Pro or Dyson Air Quality Monitor due to their comprehensive data collection and API access for custom implementations. Both devices can be positioned strategically within your growing environment to provide accurate readings of the air your plants are processing.</p>
      
      <h3>Testing Methodology</h3>
      <p>All monitors were tested in identical conditions over a 30-day period, with readings compared against a calibrated reference instrument. Tests were conducted in both high-pollution environments (outdoor Delhi) and controlled environments (aquaponics system) to assess accuracy across the full range of potential readings.</p>
      
      <h3>Conclusion</h3>
      <p>While all five monitors provide valuable data for tracking your air quality improvement journey, your specific needs and budget will determine the best choice. For scientific documentation and maximum accuracy, the AirVisual Pro remains our top recommendation despite its premium price point.</p>
    `,
    image: 'https://images.pexels.com/photos/4503276/pexels-photo-4503276.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '10 min',
    featured: false
  }
];

// Related posts function
const getRelatedPosts = (currentSlug: string, currentCategory: string) => {
  return blogPosts
    .filter(post => post.slug !== currentSlug && post.category === currentCategory)
    .slice(0, 3);
};

export default function BlogPostPage() {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    setMounted(true);
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  if (!mounted) {
    return null;
  }

  // Find the current post
  const post = blogPosts.find(post => post.slug === slug);
  
  // If post not found
  if (!post) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
            <Button className="bg-green-700 hover:bg-green-800">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Get related posts
  const relatedPosts = getRelatedPosts(post.slug, post.category);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Button 
              variant="outline" 
              className="mb-6"
              onClick={() => window.history.back()}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
            
            <Badge className="mb-4 bg-green-700 text-white">
              {post.category}
            </Badge>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Social Sharing Sidebar */}
              <div className="hidden lg:block">
                <div className="sticky top-24 space-y-4">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600 mb-2">Share this article</p>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Facebook className="w-4 h-4 mr-2" />
                        Facebook
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="text-center">
                    <Button variant="outline" size="sm" className="w-full">
                      <Bookmark className="w-4 h-4 mr-2" />
                      Save Article
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Article Reactions</p>
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm" className="px-3">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        <span>42</span>
                      </Button>
                      <Button variant="outline" size="sm" className="px-3">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        <span>12</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="lg:col-span-3">
                <article className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                </article>
                
                {/* Tags */}
                <div className="mt-8">
                  <p className="text-sm text-gray-600 mb-2">Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-gray-700">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Author Bio */}
                <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-4">
                    <img
                      src={post.author === 'Dr. Peter Singh' 
                        ? '/image.png'
                        : 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400'
                      }
                      alt={post.author}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{post.author}</h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {post.author === 'Dr. Peter Singh' 
                          ? 'Founder & Chief Scientist at Aanant Aquaponics Academy with 26 years of research experience in sustainable agriculture and air quality improvement.'
                          : 'Co-founder & Organic Farming Specialist at Aanant Aquaponics Academy with expertise in health transformation through environmental harmony.'
                        }
                      </p>
                      <Button variant="outline" size="sm">
                        View All Articles
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Share Buttons */}
                <div className="mt-8 flex justify-center gap-4 lg:hidden">
                  <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative h-48">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-700 text-white text-xs">
                          {relatedPost.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{relatedPost.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{relatedPost.date}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Read Article
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Subscribe to Our Weekly Updates
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Get the latest harvest reports, seasonal growing guides, and success stories 
              delivered directly to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500"
              />
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                Subscribe
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            <p className="text-sm text-green-100 mt-4">
              Join 5,000+ subscribers who receive our weekly updates. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
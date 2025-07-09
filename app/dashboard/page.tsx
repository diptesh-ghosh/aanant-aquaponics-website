'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  TrendingUp, 
  Award, 
  DollarSign,
  Wind,
  Users,
  Calendar,
  Download,
  Play,
  CheckCircle,
  Clock,
  Target,
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { AuthModal } from '@/components/auth-modal';
import { createClient } from '@/lib/supabase/client';

const mockCourseProgress = [
  {
    id: 'basic-aquaponics',
    title: 'Aquaponics Fundamentals',
    progress: 85,
    totalLessons: 12,
    completedLessons: 10,
    timeSpent: '24 hours',
    lastAccessed: '2 days ago',
    status: 'in-progress'
  },
  {
    id: 'aqi-mastery',
    title: 'AQI Mastery Program',
    progress: 45,
    totalLessons: 24,
    completedLessons: 11,
    timeSpent: '18 hours',
    lastAccessed: '1 day ago',
    status: 'in-progress'
  }
];

const mockAchievements = [
  { id: 1, title: 'First System Setup', description: 'Completed your first aquaponics system', earned: true },
  { id: 2, title: 'AQI Improver', description: 'Achieved 50% AQI improvement', earned: true },
  { id: 3, title: 'Income Generator', description: 'Generated first ₹1,000 from plant sales', earned: true },
  { id: 4, title: 'Community Helper', description: 'Helped 5 other students', earned: false },
  { id: 5, title: 'Master Graduate', description: 'Completed all courses with 90%+ scores', earned: false }
];

const mockIncomeData = [
  { month: 'Jan', revenue: 8500, expenses: 3200 },
  { month: 'Feb', revenue: 12000, expenses: 3500 },
  { month: 'Mar', revenue: 15000, expenses: 3800 },
  { month: 'Apr', revenue: 18500, expenses: 4000 },
  { month: 'May', revenue: 22000, expenses: 4200 },
  { month: 'Jun', revenue: 25000, expenses: 4500 }
];

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [courseProgress, setCourseProgress] = useState<typeof mockCourseProgress>([]);
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    
    // Fetch user's course progress if logged in
    if (user) {
      fetchUserCourseProgress();
    }
  }, []);

  const fetchUserCourseProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          id,
          progress,
          courses:course_id (
            id,
            title
          )
        `)
        .eq('user_id', user?.id);
      
      if (error) {
        console.error('Error fetching course progress:', error);
        return;
      }
      
      if (data && data.length > 0) {
        const formattedProgress = data.map(enrollment => ({
          id: enrollment.courses.id,
          title: enrollment.courses.title,
          progress: enrollment.progress,
          totalLessons: 12, // This would ideally come from the course data
          completedLessons: Math.round((enrollment.progress / 100) * 12),
          timeSpent: `${Math.round(enrollment.progress / 4)} hours`, // Just an example calculation
          lastAccessed: '2 days ago', // This would ideally be stored in the database
          status: enrollment.progress === 100 ? 'completed' : 'in-progress'
        }));
        
        setCourseProgress(formattedProgress);
      } else {
        // If no enrollments, use mock data for now
        setCourseProgress(mockCourseProgress);
      }
    } catch (error) {
      console.error('Error fetching course progress:', error);
    }
  };

  if (!mounted) {
    return null;
  }

  if (!user) {
    // Redirect to login page
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600">Track your progress and achievements</p>
            </div>
            <Badge className="bg-green-100 text-green-800">
              Active Student
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Course Progress</p>
                    <p className="text-2xl font-bold text-green-700">65%</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current AQI</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {user.aqiData?.currentAQI || 18}
                    </p>
                  </div>
                  <Wind className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-purple-700">
                      ₹{user.incomeData?.monthlyRevenue.toLocaleString() || '15,000'}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Achievements</p>
                    <p className="text-2xl font-bold text-orange-700">
                      {mockAchievements.filter(a => a.earned).length}/5
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard */}
          <Tabs defaultValue="courses" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {courseProgress.map((course) => (
                  <Card key={course.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <Badge variant={course.status === 'completed' ? 'default' : 'secondary'}>
                          {course.status === 'completed' ? 'Completed' : 'In Progress'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Lessons</p>
                          <p className="font-semibold">{course.completedLessons}/{course.totalLessons}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Time Spent</p>
                          <p className="font-semibold">{course.timeSpent}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Play className="w-4 h-4 mr-2" />
                          Continue Learning
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* AQI Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wind className="w-5 h-5 text-blue-600" />
                      AQI Improvement Journey
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Starting AQI</span>
                        <span className="font-bold text-red-600">
                          {user.aqiData?.beforeAQI || 267}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Current AQI</span>
                        <span className="font-bold text-green-600">
                          {user.aqiData?.currentAQI || 18}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Improvement</span>
                        <span className="font-bold text-blue-600">
                          {Math.round((1 - (user.aqiData?.currentAQI || 18) / (user.aqiData?.beforeAQI || 267)) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={Math.round((1 - (user.aqiData?.currentAQI || 18) / (user.aqiData?.beforeAQI || 267)) * 100)} 
                        className="h-3" 
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Income Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      Income Generation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Monthly Revenue</span>
                        <span className="font-bold text-green-600">
                          ₹{user.incomeData?.monthlyRevenue.toLocaleString() || '15,000'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Earnings</span>
                        <span className="font-bold text-purple-600">
                          ₹{user.incomeData?.totalEarnings.toLocaleString() || '180,000'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Target Achievement</span>
                        <span className="font-bold text-blue-600">75%</span>
                      </div>
                      <Progress value={75} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Income Trend (Last 6 Months)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockIncomeData.map((data, index) => (
                        <div key={data.month} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{data.month}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-green-600">₹{data.revenue.toLocaleString()}</span>
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${(data.revenue / 25000) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Learning Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Study Time</span>
                      <span className="font-semibold">42 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Videos Watched</span>
                      <span className="font-semibold">67/120</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Downloads</span>
                      <span className="font-semibold">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Forum Posts</span>
                      <span className="font-semibold">15</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockAchievements.map((achievement) => (
                  <Card key={achievement.id} className={achievement.earned ? 'border-green-200 bg-green-50' : 'border-gray-200'}>
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                        achievement.earned ? 'bg-green-600' : 'bg-gray-300'
                      }`}>
                        {achievement.earned ? (
                          <CheckCircle className="w-8 h-8 text-white" />
                        ) : (
                          <Clock className="w-8 h-8 text-gray-600" />
                        )}
                      </div>
                      <h3 className="font-semibold mb-2">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      {achievement.earned && (
                        <Badge className="mt-3 bg-green-600">Earned</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Course Materials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        System Setup Guide
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Plant Selection Chart
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        AQI Monitoring Templates
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Business Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Revenue Calculator
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Sales Templates
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Marketing Materials
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="w-4 h-4 mr-2" />
                        Community Forum
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Consultation
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Target className="w-4 h-4 mr-2" />
                        Submit Progress
                      </Button>
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
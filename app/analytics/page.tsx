'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award,
  DollarSign,
  Wind,
  Target,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

// Mock analytics data
const studentMetrics = {
  totalStudents: 2847,
  activeStudents: 1923,
  completionRate: 87.3,
  satisfactionRate: 94.2,
  averageAQIImprovement: 89.4,
  averageMonthlyIncome: 18500,
  monthlyGrowth: 23.5
};

const coursePerformance = [
  { 
    id: 'basic-aquaponics',
    name: 'Aquaponics Fundamentals',
    students: 1250,
    completionRate: 92,
    satisfaction: 4.9,
    revenue: 2497500,
    avgProgress: 78
  },
  {
    id: 'aqi-mastery',
    name: 'AQI Mastery Program',
    students: 850,
    completionRate: 85,
    satisfaction: 4.8,
    revenue: 4249150,
    avgProgress: 65
  },
  {
    id: 'business-mastery',
    name: 'Business Mastery',
    students: 420,
    completionRate: 81,
    satisfaction: 4.9,
    revenue: 4199580,
    avgProgress: 58
  }
];

const monthlyData = [
  { month: 'Jan', students: 156, revenue: 892000, completion: 85, satisfaction: 4.7 },
  { month: 'Feb', students: 189, revenue: 1045000, completion: 87, satisfaction: 4.8 },
  { month: 'Mar', students: 234, revenue: 1298000, completion: 89, satisfaction: 4.8 },
  { month: 'Apr', students: 267, revenue: 1456000, completion: 88, satisfaction: 4.9 },
  { month: 'May', students: 298, revenue: 1623000, completion: 90, satisfaction: 4.9 },
  { month: 'Jun', students: 342, revenue: 1834000, completion: 91, satisfaction: 4.9 }
];

const aqiImprovementData = [
  { range: '0-25%', students: 45, percentage: 2.3 },
  { range: '26-50%', students: 123, percentage: 6.4 },
  { range: '51-75%', students: 456, percentage: 23.7 },
  { range: '76-90%', students: 789, percentage: 41.1 },
  { range: '91-100%', students: 510, percentage: 26.5 }
];

const incomeDistribution = [
  { range: '₹0-5K', students: 234, percentage: 12.2 },
  { range: '₹5K-10K', students: 456, percentage: 23.7 },
  { range: '₹10K-20K', students: 678, percentage: 35.3 },
  { range: '₹20K-30K', students: 345, percentage: 17.9 },
  { range: '₹30K+', students: 210, percentage: 10.9 }
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600">Comprehensive insights into student success and platform performance</p>
              </div>
              <div className="flex items-center gap-4">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  onClick={refreshData} 
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {studentMetrics.totalStudents.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{studentMetrics.monthlyGrowth}% this month
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-green-700">
                      {studentMetrics.completionRate}%
                    </p>
                    <p className="text-sm text-gray-500">Target: 50%</p>
                  </div>
                  <Award className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Satisfaction Rate</p>
                    <p className="text-2xl font-bold text-purple-700">
                      {studentMetrics.satisfactionRate}%
                    </p>
                    <p className="text-sm text-gray-500">Target: 80%</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Monthly Income</p>
                    <p className="text-2xl font-bold text-orange-700">
                      ₹{studentMetrics.averageMonthlyIncome.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">Per graduate</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Analytics */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Course Performance</TabsTrigger>
              <TabsTrigger value="students">Student Success</TabsTrigger>
              <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
              <TabsTrigger value="impact">Impact Metrics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Monthly Growth Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Monthly Growth Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monthlyData.map((data, index) => (
                        <div key={data.month} className="flex items-center justify-between">
                          <span className="text-sm font-medium w-12">{data.month}</span>
                          <div className="flex-1 mx-4">
                            <div className="flex justify-between text-xs mb-1">
                              <span>{data.students} students</span>
                              <span>₹{(data.revenue / 100000).toFixed(1)}L</span>
                            </div>
                            <Progress value={(data.students / 350) * 100} className="h-2" />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {data.completion}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Success Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Success Metrics Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Course Completion Rate</span>
                        <span className="text-sm font-bold text-green-600">
                          {studentMetrics.completionRate}%
                        </span>
                      </div>
                      <Progress value={studentMetrics.completionRate} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Target: 50% (Exceeded by 37.3%)</p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Student Satisfaction</span>
                        <span className="text-sm font-bold text-purple-600">
                          {studentMetrics.satisfactionRate}%
                        </span>
                      </div>
                      <Progress value={studentMetrics.satisfactionRate} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Target: 80% (Exceeded by 14.2%)</p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Average AQI Improvement</span>
                        <span className="text-sm font-bold text-blue-600">
                          {studentMetrics.averageAQIImprovement}%
                        </span>
                      </div>
                      <Progress value={studentMetrics.averageAQIImprovement} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Target: 60% (Exceeded by 29.4%)</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Course Performance Tab */}
            <TabsContent value="courses" className="space-y-6">
              <div className="grid gap-6">
                {coursePerformance.map((course) => (
                  <Card key={course.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <Badge className="bg-green-100 text-green-800">
                          {course.students} students
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-5 gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-700">{course.completionRate}%</div>
                          <p className="text-sm text-gray-600">Completion Rate</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-600">{course.satisfaction}</div>
                          <p className="text-sm text-gray-600">Satisfaction</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-700">
                            ₹{(course.revenue / 100000).toFixed(1)}L
                          </div>
                          <p className="text-sm text-gray-600">Revenue</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-700">{course.avgProgress}%</div>
                          <p className="text-sm text-gray-600">Avg Progress</p>
                        </div>
                        <div className="flex items-center">
                          <Progress value={course.completionRate} className="flex-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Student Success Tab */}
            <TabsContent value="students" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* AQI Improvement Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wind className="w-5 h-5 text-blue-600" />
                      AQI Improvement Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {aqiImprovementData.map((data) => (
                        <div key={data.range} className="flex items-center justify-between">
                          <span className="text-sm font-medium w-20">{data.range}</span>
                          <div className="flex-1 mx-4">
                            <Progress value={data.percentage} className="h-3" />
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold">{data.students}</div>
                            <div className="text-xs text-gray-500">{data.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Income Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      Monthly Income Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {incomeDistribution.map((data) => (
                        <div key={data.range} className="flex items-center justify-between">
                          <span className="text-sm font-medium w-20">{data.range}</span>
                          <div className="flex-1 mx-4">
                            <Progress value={data.percentage} className="h-3" />
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold">{data.students}</div>
                            <div className="text-xs text-gray-500">{data.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Revenue Analytics Tab */}
            <TabsContent value="revenue" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-700 mb-2">
                      ₹{(monthlyData.reduce((sum, month) => sum + month.revenue, 0) / 10000000).toFixed(2)}Cr
                    </div>
                    <p className="text-sm text-gray-600">Last 6 months</p>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Growth Rate</span>
                        <span className="text-green-600">+{studentMetrics.monthlyGrowth}%</span>
                      </div>
                      <Progress value={studentMetrics.monthlyGrowth} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Average Revenue Per Student</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-700 mb-2">
                      ₹{Math.round(monthlyData.reduce((sum, month) => sum + month.revenue, 0) / monthlyData.reduce((sum, month) => sum + month.students, 0)).toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">Per student enrolled</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Recurring Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-700 mb-2">
                      ₹{(monthlyData[monthlyData.length - 1].revenue / 100000).toFixed(1)}L
                    </div>
                    <p className="text-sm text-gray-600">Current month</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Impact Metrics Tab */}
            <TabsContent value="impact" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="text-center p-6">
                  <Wind className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-700 mb-2">
                    {studentMetrics.averageAQIImprovement}%
                  </div>
                  <p className="text-sm text-gray-600">Average AQI Improvement</p>
                  <p className="text-xs text-green-600 mt-2">29.4% above target</p>
                </Card>

                <Card className="text-center p-6">
                  <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-700 mb-2">
                    ₹{(studentMetrics.averageMonthlyIncome / 1000).toFixed(1)}K
                  </div>
                  <p className="text-sm text-gray-600">Avg Monthly Income</p>
                  <p className="text-xs text-green-600 mt-2">Per graduate</p>
                </Card>

                <Card className="text-center p-6">
                  <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-purple-700 mb-2">
                    {studentMetrics.totalStudents.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">Lives Transformed</p>
                  <p className="text-xs text-green-600 mt-2">Families breathing clean air</p>
                </Card>

                <Card className="text-center p-6">
                  <Award className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-orange-700 mb-2">
                    {studentMetrics.satisfactionRate}%
                  </div>
                  <p className="text-sm text-gray-600">Satisfaction Rate</p>
                  <p className="text-xs text-green-600 mt-2">14.2% above target</p>
                </Card>
              </div>

              {/* Environmental Impact */}
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-700 mb-2">2,847</div>
                      <p className="text-sm text-gray-600">Homes with Clean Air</p>
                      <p className="text-xs text-gray-500">AQI improved to 15-25 range</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-700 mb-2">₹5.27Cr</div>
                      <p className="text-sm text-gray-600">Student Income Generated</p>
                      <p className="text-xs text-gray-500">Monthly sustainable revenue</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-700 mb-2">89.4%</div>
                      <p className="text-sm text-gray-600">Average Health Improvement</p>
                      <p className="text-xs text-gray-500">Measured by AQI reduction</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
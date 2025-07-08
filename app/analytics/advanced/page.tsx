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
  RefreshCw,
  MapPin,
  Zap,
  Brain,
  Globe
} from 'lucide-react';

// Advanced analytics data
const advancedMetrics = {
  predictiveAnalytics: {
    churnProbability: 12.3,
    revenueProjection: 2847500,
    growthRate: 34.7,
    marketPenetration: 8.9
  },
  geographicPerformance: [
    { region: 'Delhi NCR', students: 1250, avgAQI: 16, avgIncome: 19500, satisfaction: 94.2 },
    { region: 'Mumbai', students: 850, avgAQI: 18, avgIncome: 17800, satisfaction: 92.8 },
    { region: 'Bangalore', students: 420, avgAQI: 14, avgIncome: 21200, satisfaction: 96.1 },
    { region: 'Pune', students: 180, avgAQI: 17, avgIncome: 16900, satisfaction: 91.5 },
    { region: 'Hyderabad', students: 147, avgAQI: 19, avgIncome: 18300, satisfaction: 93.7 }
  ],
  cohortAnalysis: [
    { cohort: 'Jan 2024', retention30: 89, retention60: 78, retention90: 71, ltv: 45600 },
    { cohort: 'Feb 2024', retention30: 91, retention60: 82, retention90: 75, ltv: 48200 },
    { cohort: 'Mar 2024', retention30: 93, retention60: 85, retention90: 78, ltv: 51800 },
    { cohort: 'Apr 2024', retention30: 95, retention60: 87, retention90: 81, ltv: 54300 },
    { cohort: 'May 2024', retention30: 94, retention60: 89, retention90: 83, ltv: 56700 },
    { cohort: 'Jun 2024', retention30: 96, retention60: 91, retention90: 85, ltv: 59100 }
  ],
  conversionFunnel: [
    { stage: 'Website Visitors', count: 125000, conversion: 100 },
    { stage: 'Course Page Views', count: 45000, conversion: 36 },
    { stage: 'Cart Additions', count: 12500, conversion: 27.8 },
    { stage: 'Checkout Started', count: 8750, conversion: 70 },
    { stage: 'Payment Completed', count: 6125, conversion: 70 },
    { stage: 'Course Completed', count: 5339, conversion: 87.2 }
  ]
};

const mlInsights = [
  {
    title: 'High-Value Customer Prediction',
    description: 'Students with 60%+ AQI improvement in first 30 days have 89% probability of generating ₹20K+ monthly income',
    confidence: 94.2,
    impact: 'High',
    recommendation: 'Focus onboarding optimization for faster AQI improvements'
  },
  {
    title: 'Churn Risk Identification',
    description: 'Students inactive for 7+ days with <40% course completion have 73% churn probability',
    confidence: 87.6,
    impact: 'Medium',
    recommendation: 'Implement automated re-engagement campaigns'
  },
  {
    title: 'Geographic Expansion Opportunity',
    description: 'Chennai and Kolkata show 85% market readiness based on demographic and environmental factors',
    confidence: 91.3,
    impact: 'High',
    recommendation: 'Launch pilot programs in identified cities'
  },
  {
    title: 'Seasonal Revenue Patterns',
    description: 'Winter months show 45% higher enrollment due to increased pollution awareness',
    confidence: 96.8,
    impact: 'Medium',
    recommendation: 'Adjust marketing spend allocation seasonally'
  }
];

export default function AdvancedAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
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
                <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics</h1>
                <p className="text-gray-600">AI-powered insights and predictive analytics for strategic decision making</p>
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
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="delhi">Delhi NCR</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
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
          {/* Predictive Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Churn Risk</p>
                    <p className="text-2xl font-bold text-orange-700">
                      {advancedMetrics.predictiveAnalytics.churnProbability}%
                    </p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      -2.1% vs last month
                    </p>
                  </div>
                  <Brain className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenue Projection</p>
                    <p className="text-2xl font-bold text-green-700">
                      ₹{(advancedMetrics.predictiveAnalytics.revenueProjection / 100000).toFixed(1)}L
                    </p>
                    <p className="text-sm text-gray-500">Next 3 months</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Growth Rate</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {advancedMetrics.predictiveAnalytics.growthRate}%
                    </p>
                    <p className="text-sm text-gray-500">Monthly compound</p>
                  </div>
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Market Penetration</p>
                    <p className="text-2xl font-bold text-purple-700">
                      {advancedMetrics.predictiveAnalytics.marketPenetration}%
                    </p>
                    <p className="text-sm text-gray-500">Target market</p>
                  </div>
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Analytics Tabs */}
          <Tabs defaultValue="geographic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="geographic">Geographic</TabsTrigger>
              <TabsTrigger value="cohort">Cohort Analysis</TabsTrigger>
              <TabsTrigger value="conversion">Conversion</TabsTrigger>
              <TabsTrigger value="ml-insights">AI Insights</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
            </TabsList>

            {/* Geographic Performance */}
            <TabsContent value="geographic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Regional Performance Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {advancedMetrics.geographicPerformance.map((region, index) => (
                      <div key={region.region} className="border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">{region.region}</h3>
                          <Badge variant="outline">{region.students} students</Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-4 gap-4">
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-700">{region.avgAQI}</div>
                            <p className="text-sm text-blue-600">Avg AQI</p>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-700">₹{region.avgIncome.toLocaleString()}</div>
                            <p className="text-sm text-green-600">Avg Income</p>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-700">{region.satisfaction}%</div>
                            <p className="text-sm text-purple-600">Satisfaction</p>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="w-full">
                              <Progress value={region.satisfaction} className="h-3" />
                              <p className="text-xs text-gray-500 mt-1 text-center">Performance Score</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cohort Analysis */}
            <TabsContent value="cohort" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Cohort Retention Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
                      <div>Cohort</div>
                      <div>30-Day Retention</div>
                      <div>60-Day Retention</div>
                      <div>90-Day Retention</div>
                      <div>Lifetime Value</div>
                    </div>
                    {advancedMetrics.cohortAnalysis.map((cohort) => (
                      <div key={cohort.cohort} className="grid grid-cols-5 gap-4 items-center py-3 border-b">
                        <div className="font-medium">{cohort.cohort}</div>
                        <div className="flex items-center gap-2">
                          <Progress value={cohort.retention30} className="h-2 flex-1" />
                          <span className="text-sm font-medium">{cohort.retention30}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={cohort.retention60} className="h-2 flex-1" />
                          <span className="text-sm font-medium">{cohort.retention60}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={cohort.retention90} className="h-2 flex-1" />
                          <span className="text-sm font-medium">{cohort.retention90}%</span>
                        </div>
                        <div className="font-semibold text-green-700">₹{cohort.ltv.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Conversion Funnel */}
            <TabsContent value="conversion" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {advancedMetrics.conversionFunnel.map((stage, index) => (
                      <div key={stage.stage} className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{stage.stage}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">{stage.count.toLocaleString()} users</span>
                            <Badge variant="outline">{stage.conversion}%</Badge>
                          </div>
                        </div>
                        <div className="relative">
                          <Progress value={stage.conversion} className="h-4" />
                          {index < advancedMetrics.conversionFunnel.length - 1 && (
                            <div className="absolute right-0 top-6 text-xs text-gray-500">
                              Drop-off: {(100 - advancedMetrics.conversionFunnel[index + 1].conversion).toFixed(1)}%
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ML Insights */}
            <TabsContent value="ml-insights" className="space-y-6">
              <div className="grid gap-6">
                {mlInsights.map((insight, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant={insight.impact === 'High' ? 'destructive' : 'secondary'}>
                            {insight.impact} Impact
                          </Badge>
                          <Badge variant="outline">
                            {insight.confidence}% confidence
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{insight.description}</p>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-blue-800 mb-1">Recommended Action:</p>
                        <p className="text-sm text-blue-700">{insight.recommendation}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Predictions */}
            <TabsContent value="predictions" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Forecast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Next Month</span>
                        <span className="font-bold text-green-700">₹95.2L</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Next Quarter</span>
                        <span className="font-bold text-green-700">₹284.7L</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Next Year</span>
                        <span className="font-bold text-green-700">₹12.4Cr</span>
                      </div>
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-700">
                          <strong>Confidence Level:</strong> 89.3% based on current trends and seasonal patterns
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Growth Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold text-blue-800">Geographic Expansion</h4>
                        <p className="text-sm text-gray-600">Chennai & Kolkata ready for launch</p>
                        <p className="text-xs text-blue-600">Potential: +₹45L quarterly revenue</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold text-green-800">Premium Tier Launch</h4>
                        <p className="text-sm text-gray-600">Advanced courses for existing students</p>
                        <p className="text-xs text-green-600">Potential: +₹28L quarterly revenue</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-semibold text-purple-800">Corporate Training</h4>
                        <p className="text-sm text-gray-600">B2B market opportunity identified</p>
                        <p className="text-xs text-purple-600">Potential: +₹67L quarterly revenue</p>
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
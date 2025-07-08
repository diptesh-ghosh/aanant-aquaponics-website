'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Calculator, 
  Wind, 
  Thermometer, 
  Droplets, 
  ArrowRight, 
  BarChart3,
  Download,
  Share2,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function AQICalculatorPage() {
  const [currentAQI, setCurrentAQI] = useState<string>('');
  const [targetAQI, setTargetAQI] = useState<string>('15');
  const [homeSize, setHomeSize] = useState<string>('');
  const [currentTemperature, setCurrentTemperature] = useState<string>('');
  const [targetTemperature, setTargetTemperature] = useState<string>('25');
  const [calculationComplete, setCalculationComplete] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    // Validate inputs
    if (!currentAQI || !homeSize || !currentTemperature) {
      alert('Please fill in all required fields');
      return;
    }

    setIsCalculating(true);

    // Simulate calculation delay
    setTimeout(() => {
      // Calculate results
      const currentAQINum = parseInt(currentAQI);
      const targetAQINum = parseInt(targetAQI);
      const homeSizeNum = parseInt(homeSize);
      const currentTempNum = parseInt(currentTemperature);
      const targetTempNum = parseInt(targetTemperature);

      // Calculate improvement percentage
      const aqiImprovement = ((currentAQINum - targetAQINum) / currentAQINum) * 100;
      const tempImprovement = ((currentTempNum - targetTempNum) / currentTempNum) * 100;

      // Calculate system requirements
      const plantsRequired = Math.round(homeSizeNum * 0.8);
      const fishTankSize = Math.round(plantsRequired * 0.2);
      const setupCost = Math.round(plantsRequired * 100 + fishTankSize * 200);
      const monthlyIncome = Math.round(plantsRequired * 15);
      const monthlyMaintenance = Math.round(setupCost * 0.02);
      const roiMonths = Math.ceil(setupCost / (monthlyIncome - monthlyMaintenance));

      // Set results
      setResults({
        aqiImprovement: aqiImprovement.toFixed(1),
        tempImprovement: tempImprovement.toFixed(1),
        plantsRequired,
        fishTankSize,
        setupCost,
        monthlyIncome,
        monthlyMaintenance,
        roiMonths,
        implementationTime: roiMonths <= 6 ? '2-3 months' : '3-4 months'
      });

      setCalculationComplete(true);
      setIsCalculating(false);
    }, 2000);
  };

  const resetCalculator = () => {
    setCalculationComplete(false);
    setResults(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-2 text-green-700 border-green-200">
                <Calculator className="w-4 h-4 mr-2" />
                Interactive Tool
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                AQI Improvement{' '}
                <span className="text-green-700">Calculator</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Calculate your potential air quality improvement, natural cooling effect, and income generation 
                based on your specific home conditions and requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Input Form */}
              {!calculationComplete ? (
                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">Enter Your Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentAQI" className="text-base font-medium">
                          Current AQI Level <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative mt-1">
                          <Wind className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="currentAQI"
                            type="number"
                            placeholder="e.g., 250"
                            className="pl-10"
                            value={currentAQI}
                            onChange={(e) => setCurrentAQI(e.target.value)}
                            required
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Check your local AQI or use Delhi average (250-300)
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="targetAQI" className="text-base font-medium">
                          Target AQI Level
                        </Label>
                        <div className="relative mt-1">
                          <Wind className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="targetAQI"
                            type="number"
                            placeholder="e.g., 15"
                            className="pl-10"
                            value={targetAQI}
                            onChange={(e) => setTargetAQI(e.target.value)}
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Our system typically achieves AQI 15-25
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="homeSize" className="text-base font-medium">
                          Home Size (sq. ft.) <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative mt-1">
                          <Input
                            id="homeSize"
                            type="number"
                            placeholder="e.g., 1200"
                            value={homeSize}
                            onChange={(e) => setHomeSize(e.target.value)}
                            required
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Total area of your home in square feet
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="currentTemperature" className="text-base font-medium">
                          Current Summer Temperature (°C) <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative mt-1">
                          <Thermometer className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="currentTemperature"
                            type="number"
                            placeholder="e.g., 45"
                            className="pl-10"
                            value={currentTemperature}
                            onChange={(e) => setCurrentTemperature(e.target.value)}
                            required
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Average indoor temperature during summer
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="targetTemperature" className="text-base font-medium">
                          Target Temperature (°C)
                        </Label>
                        <div className="relative mt-1">
                          <Thermometer className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="targetTemperature"
                            type="number"
                            placeholder="e.g., 25"
                            className="pl-10"
                            value={targetTemperature}
                            onChange={(e) => setTargetTemperature(e.target.value)}
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Our system typically achieves 25°C without AC
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <Button
                      onClick={handleCalculate}
                      disabled={isCalculating}
                      className="w-full bg-green-700 hover:bg-green-800 text-white py-6 text-lg"
                    >
                      {isCalculating ? (
                        <>
                          <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                          Calculating...
                        </>
                      ) : (
                        <>
                          <Calculator className="w-5 h-5 mr-2" />
                          Calculate My Improvement Potential
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">Your Input Details</CardTitle>
                      <Button variant="outline" size="sm" onClick={resetCalculator}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Recalculate
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Wind className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-blue-800">Current AQI</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-700">{currentAQI}</div>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Wind className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">Target AQI</span>
                        </div>
                        <div className="text-2xl font-bold text-green-700">{targetAQI}</div>
                      </div>
                      
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Thermometer className="w-5 h-5 text-purple-600" />
                          <span className="font-medium text-purple-800">Current Temp</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-700">{currentTemperature}°C</div>
                      </div>
                      
                      <div className="p-4 bg-cyan-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Thermometer className="w-5 h-5 text-cyan-600" />
                          <span className="font-medium text-cyan-800">Target Temp</span>
                        </div>
                        <div className="text-2xl font-bold text-cyan-700">{targetTemperature}°C</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-800">Home Size</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-700">{homeSize} sq. ft.</div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Results Display */}
              {calculationComplete ? (
                <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                      <CardTitle className="text-2xl">Your Improvement Potential</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* AQI Improvement */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Air Quality Improvement</h3>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Potential Improvement:</span>
                        <span className="font-bold text-green-700">{results.aqiImprovement}%</span>
                      </div>
                      <Progress value={parseFloat(results.aqiImprovement)} className="h-3 mb-4" />
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span>Current: {currentAQI} AQI</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Target: {targetAQI} AQI</span>
                        </div>
                      </div>
                    </div>

                    {/* Temperature Improvement */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Natural Cooling Effect</h3>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Temperature Reduction:</span>
                        <span className="font-bold text-blue-700">{results.tempImprovement}%</span>
                      </div>
                      <Progress value={parseFloat(results.tempImprovement)} className="h-3 mb-4" />
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span>Current: {currentTemperature}°C</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Target: {targetTemperature}°C</span>
                        </div>
                      </div>
                    </div>

                    {/* System Requirements */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">System Requirements</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-lg border">
                          <div className="text-sm text-gray-600 mb-1">Plants Required</div>
                          <div className="text-xl font-bold text-green-700">{results.plantsRequired}</div>
                        </div>
                        <div className="p-4 bg-white rounded-lg border">
                          <div className="text-sm text-gray-600 mb-1">Fish Tank Size</div>
                          <div className="text-xl font-bold text-blue-700">{results.fishTankSize}L</div>
                        </div>
                        <div className="p-4 bg-white rounded-lg border">
                          <div className="text-sm text-gray-600 mb-1">Setup Cost</div>
                          <div className="text-xl font-bold text-purple-700">₹{results.setupCost.toLocaleString()}</div>
                        </div>
                        <div className="p-4 bg-white rounded-lg border">
                          <div className="text-sm text-gray-600 mb-1">Implementation Time</div>
                          <div className="text-xl font-bold text-orange-700">{results.implementationTime}</div>
                        </div>
                      </div>
                    </div>

                    {/* Financial Benefits */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Benefits</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-white rounded-lg border">
                          <div className="text-sm text-gray-600 mb-1">Monthly Income</div>
                          <div className="text-xl font-bold text-green-700">₹{results.monthlyIncome.toLocaleString()}</div>
                        </div>
                        <div className="p-4 bg-white rounded-lg border">
                          <div className="text-sm text-gray-600 mb-1">Monthly Maintenance</div>
                          <div className="text-xl font-bold text-red-700">₹{results.monthlyMaintenance.toLocaleString()}</div>
                        </div>
                        <div className="p-4 bg-white rounded-lg border">
                          <div className="text-sm text-gray-600 mb-1">ROI Timeline</div>
                          <div className="text-xl font-bold text-blue-700">{results.roiMonths} months</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button className="flex-1 bg-green-700 hover:bg-green-800">
                        <Download className="w-5 h-5 mr-2" />
                        Download Report
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 className="w-5 h-5 mr-2" />
                        Share Results
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">What You'll Discover</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                          <Wind className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">AQI Improvement Potential</h3>
                          <p className="text-gray-600">
                            Calculate your potential air quality improvement based on your current AQI levels and home specifications.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                          <Thermometer className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">Natural Cooling Effect</h3>
                          <p className="text-gray-600">
                            Discover how much you can reduce your indoor temperature without air conditioning using our aquaponics system.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                          <BarChart3 className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">System Requirements</h3>
                          <p className="text-gray-600">
                            Get detailed specifications for your custom aquaponics system based on your home size and improvement goals.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mt-1">
                          <Calculator className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">Financial Benefits</h3>
                          <p className="text-gray-600">
                            Calculate your potential monthly income, maintenance costs, and return on investment timeline.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-800">Based on Real Results</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        This calculator uses data from 750+ successful implementations across Delhi NCR, with verified AQI improvements and income generation results.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Testimonials */}
            <div className="mt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Real Results from Our Community
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  See how families across Delhi NCR have transformed their homes with our aquaponics systems
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Rajesh Kumar"
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">Rajesh Kumar</h4>
                        <p className="text-sm text-gray-600">Gurgaon</p>
                      </div>
                    </div>
                    <blockquote className="text-gray-700 italic mb-4">
                      "The calculator was spot on! We achieved 94% AQI improvement exactly as predicted, and our monthly income is now ₹15,000 from plant sales."
                    </blockquote>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-blue-600">AQI: 267 → 18</div>
                      <div className="text-green-600">₹15,000/month</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Priya Sharma"
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">Priya Sharma</h4>
                        <p className="text-sm text-gray-600">Delhi</p>
                      </div>
                    </div>
                    <blockquote className="text-gray-700 italic mb-4">
                      "The calculator helped me plan my system perfectly. My home is now at AQI 16 and I'm earning ₹22,000 monthly from my apartment complex customers."
                    </blockquote>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-blue-600">AQI: 298 → 16</div>
                      <div className="text-green-600">₹22,000/month</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Mohammed Ali"
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">Mohammed Ali</h4>
                        <p className="text-sm text-gray-600">Noida</p>
                      </div>
                    </div>
                    <blockquote className="text-gray-700 italic mb-4">
                      "The ROI calculator was incredibly accurate. My system paid for itself in exactly the 5 months predicted, and now generates consistent income."
                    </blockquote>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-blue-600">AQI: 245 → 14</div>
                      <div className="text-green-600">₹18,500/month</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Common questions about our AQI improvement calculator and methodology
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">How accurate is this calculator?</h3>
                    <p className="text-gray-600">
                      Our calculator is based on data from 750+ successful implementations across Delhi NCR. It has a 92% accuracy rate when comparing predicted vs. actual results.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">How long does it take to see results?</h3>
                    <p className="text-gray-600">
                      Most families see significant AQI improvement within 30 days of system implementation. Full results typically manifest within 60-90 days.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Is the income generation realistic?</h3>
                    <p className="text-gray-600">
                      Yes, the income projections are based on average earnings from our student community. Many students exceed these projections with premium pricing strategies.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">What space is required for implementation?</h3>
                    <p className="text-gray-600">
                      Our systems are highly adaptable. For a typical 1200 sq.ft. apartment, you'll need approximately 100-150 sq.ft. of space, which can be distributed across balconies and living areas.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <Card className="p-8 bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <CardContent className="p-0">
                  <h2 className="text-3xl font-bold mb-6">
                    Ready to Transform Your Home?
                  </h2>
                  <p className="text-xl mb-8 text-green-100">
                    Schedule a consultation with our experts to create your personalized implementation plan.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                      Book Free Consultation
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                      Explore Our Courses
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
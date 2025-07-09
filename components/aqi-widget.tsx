'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

interface AQIWidgetProps {
  location: 'delhi' | 'aanant';
  className?: string;
}

// Simulated AQI data - in production, this would connect to real APIs
const getAQIData = (location: 'delhi' | 'aanant') => {
  if (location === 'aanant') {
    return {
      value: 15,
      status: 'Good',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    };
  }
  
  // Simulate Delhi AQI with realistic variation
  const baseAQI = 280;
  const variation = Math.floor(Math.random() * 60) - 30; // ±30 variation
  const value = Math.max(200, baseAQI + variation);
  
  return {
    value,
    status: value > 300 ? 'Hazardous' : 'Very Unhealthy',
    color: value > 300 ? 'text-red-700' : 'text-red-600',
    bgColor: value > 300 ? 'bg-red-100' : 'bg-orange-100'
  };
};

export function AQIWidget({ location, className }: AQIWidgetProps) {
  const [aqiData, setAQIData] = useState<any>(getAQIData(location));
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const supabase = createClient();

  useEffect(() => {
    // Fetch real AQI data from the API
    const fetchAQIData = async () => {
      try {
        const response = await fetch(`/api/aqi?location=${location}`);
        if (!response.ok) {
          throw new Error('Failed to fetch AQI data');
        }
        
        const data = await response.json();
        
        // Determine color based on AQI value
        let color = 'text-green-600';
        let bgColor = 'bg-green-100';
        
        if (data.current_aqi > 300) {
          color = 'text-red-700';
          bgColor = 'bg-red-100';
        } else if (data.current_aqi > 200) {
          color = 'text-red-600';
          bgColor = 'bg-orange-100';
        } else if (data.current_aqi > 150) {
          color = 'text-orange-600';
          bgColor = 'bg-orange-100';
        } else if (data.current_aqi > 100) {
          color = 'text-yellow-600';
          bgColor = 'bg-yellow-100';
        } else if (data.current_aqi > 50) {
          color = 'text-yellow-500';
          bgColor = 'bg-yellow-50';
        }
        
        setAQIData({
          value: data.current_aqi,
          status: data.status,
          color,
          bgColor
        });
        
        setLastUpdated(new Date(data.timestamp));
      } catch (error) {
        console.error('Error fetching AQI data:', error);
        // Fall back to simulated data
        setAQIData(getAQIData(location));
        setLastUpdated(new Date());
      }
    };
    
    fetchAQIData();
    
    // Update AQI data every 5 minutes
    const interval = setInterval(fetchAQIData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [location, supabase]);

  return (
    <div className="space-y-2">
      <div className={cn('text-4xl font-bold', aqiData.color, className)}>
        {aqiData.value}
        <span className="text-lg font-medium ml-2">AQI</span>
      </div>
      <div className={cn('inline-block px-3 py-1 rounded-full text-sm font-medium', aqiData.bgColor, aqiData.color)}>
        {aqiData.status}
      </div>
      <div className="text-xs text-gray-500">
        Updated: {lastUpdated.toLocaleTimeString()}
      </div>
    </div>
  );
}
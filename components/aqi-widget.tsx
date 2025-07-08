'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

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
  const [aqiData, setAQIData] = useState(getAQIData(location));
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Update AQI data every 5 minutes for Delhi, keep Aanant constant
    const interval = setInterval(() => {
      if (location === 'delhi') {
        setAQIData(getAQIData(location));
        setLastUpdated(new Date());
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [location]);

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
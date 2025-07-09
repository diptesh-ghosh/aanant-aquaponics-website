'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AQIWidgetProps {
  location: 'delhi' | 'aanant';
  className?: string;
}

export function AQIWidget({ location, className }: AQIWidgetProps) {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Static hardcoded AQI data
  const aqiData = location === 'aanant' 
    ? {
        value: 15,
        status: 'Good',
        color: 'text-green-600',
        bgColor: 'bg-green-100'
      }
    : {
        value: 387,
        status: 'Severe',
        color: 'text-red-700',
        bgColor: 'bg-red-100'
      };

  // Update the last updated time every minute to make it look dynamic
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

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
        <span className="ml-2 text-xs text-gray-400">(Live data coming soon)</span>
      </div>
    </div>
  );
}
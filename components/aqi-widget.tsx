'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AQIWidgetProps {
  location: 'delhi' | 'aanant';
  className?: string;
}

export function AQIWidget({ location, className }: AQIWidgetProps) {
  // Static hardcoded data
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

  // Static last updated time
  const lastUpdated = new Date();

  return (
    <div className="space-y-2">
      <div className={cn('text-4xl font-bold', aqiData.color, className)}>
        {aqiData.value}
        <span className="text-lg font-medium ml-2">AQI</span>
      </div>
      <div className={cn('inline-block px-3 py-1 rounded-full text-sm font-medium', aqiData.bgColor, aqiData.color)}>
        {aqiData.status}
      </div>
      <div className="text-xs text-gray-500 flex items-center justify-center">
        <span>Live data coming soon</span>
      </div>
    </div>
  );
}
import React from 'react';
import { Card } from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description?: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  bgColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  description,
  change,
  trend,
  bgColor = 'bg-white'
}) => {
  return (
    <Card className={`${bgColor} overflow-hidden`}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="mt-1 text-2xl font-semibold text-gray-900">{value}</h3>
          </div>
          <div className="p-3 rounded-full bg-sky-50 text-sky-500">
            {icon}
          </div>
        </div>
        
        {(description || change !== undefined) && (
          <div className="mt-4">
            {description && <p className="text-sm text-gray-500">{description}</p>}
            
            {change !== undefined && (
              <div className="flex items-center mt-1">
                {trend === 'up' && (
                  <span className="text-green-500 text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg\" className="h-4 w-4 mr-1\" fill="none\" viewBox="0 0 24 24\" stroke="currentColor">
                      <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    {change}%
                  </span>
                )}
                
                {trend === 'down' && (
                  <span className="text-red-500 text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    {change}%
                  </span>
                )}
                
                {trend === 'neutral' && (
                  <span className="text-gray-500 text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                    </svg>
                    {change}%
                  </span>
                )}
                
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { ServiceAnalytics } from '../../types';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface ServiceChartProps {
  data: ServiceAnalytics[];
  title?: string;
}

const ServiceChart: React.FC<ServiceChartProps> = ({ 
  data,
  title = 'Popular Services'
}) => {
  // Color palette
  const backgroundColors = [
    'rgba(56, 189, 248, 0.8)',  // sky
    'rgba(20, 184, 166, 0.8)',  // teal
    'rgba(249, 115, 22, 0.8)',  // orange
    'rgba(168, 85, 247, 0.8)',  // purple
    'rgba(236, 72, 153, 0.8)',  // pink
    'rgba(34, 197, 94, 0.8)',   // green
  ];
  
  const borderColors = [
    'rgb(14, 165, 233)',  // sky
    'rgb(13, 148, 136)',  // teal
    'rgb(234, 88, 12)',   // orange
    'rgb(147, 51, 234)',  // purple
    'rgb(219, 39, 119)',  // pink
    'rgb(22, 163, 74)',   // green
  ];

  const chartData = {
    labels: data.map(item => item.service),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: backgroundColors.slice(0, data.length),
        borderColor: borderColors.slice(0, data.length),
        borderWidth: 1,
      }
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        align: 'center' as const,
        labels: {
          boxWidth: 15,
          padding: 15,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1e293b',
        bodyColor: '#334155',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((acc: number, data: number) => acc + data, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '70%',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: '300px' }}>
          <Doughnut data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceChart;
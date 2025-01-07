import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

interface DailyChartProps {
  data: Array<{
    date: string;
    focusTime: number;
    productivity: number;
  }>;
}

export const DailyChart = ({ data }: DailyChartProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (minutes: number) => {
    return `${Math.round(minutes / 60)}h ${minutes % 60}m`;
  };

  return (
    <div className="h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
          />
          <YAxis 
            yAxisId="time"
            tickFormatter={formatTime}
          />
          <YAxis 
            yAxisId="productivity"
            orientation="right"
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            formatter={(value: number, name: string) => {
              if (name === 'Focus Time') return formatTime(value);
              return `${value}%`;
            }}
            labelFormatter={formatDate}
          />
          <Line
            yAxisId="time"
            type="monotone"
            dataKey="focusTime"
            name="Focus Time"
            stroke="#3b82f6"
            strokeWidth={2}
          />
          <Line
            yAxisId="productivity"
            type="monotone"
            dataKey="productivity"
            name="Productivity"
            stroke="#a855f7"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
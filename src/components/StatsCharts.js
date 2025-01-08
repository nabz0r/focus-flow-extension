import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const StatsCharts = ({ data }) => {
  const chartData = Object.entries(data).map(([date, stats]) => ({
    date,
    focusTime: Math.round(stats.focusTime / 60), // Convert to minutes
    blockedAttempts: stats.blockedAttempts
  }));

  return (
    <div className="stats-charts">
      <div className="stats-chart">
        <h3>Focus Time (minutes)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="focusTime" 
              stroke="#8884d8" 
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="stats-chart">
        <h3>Distractions Blocked</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="blockedAttempts" 
              stroke="#82ca9d" 
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="stats-summary">
        <div className="stats-card">
          <h3>Total Focus Time</h3>
          <p>{Math.round(chartData.reduce((acc, curr) => acc + curr.focusTime, 0))} min</p>
        </div>
        <div className="stats-card">
          <h3>Distractions Avoided</h3>
          <p>{chartData.reduce((acc, curr) => acc + curr.blockedAttempts, 0)}</p>
        </div>
        <div className="stats-card">
          <h3>Focus Sessions</h3>
          <p>{chartData.length}</p>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { useStats } from './StatsProvider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const StatsDisplay = () => {
  const { loading, error, stats, sessions, timeRange, setTimeRange, auth } = useStats();

  if (!auth.user) {
    return (
      <div className="stats-login">
        <h2>Sign in to view your stats</h2>
        <button 
          onClick={() => auth.signIn()}
          className="login-button"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  if (loading) {
    return <div>Loading stats...</div>;
  }

  if (error) {
    return <div>Error loading stats: {error}</div>;
  }

  const sessionData = sessions.map(session => ({
    date: new Date(session.createdAt.seconds * 1000).toLocaleDateString(),
    duration: Math.round(session.duration / 60), // Convert to minutes
    blockedAttempts: session.blockedAttempts
  }));

  return (
    <div className="stats-container">
      <div className="stats-header">
        <h2>Focus Stats</h2>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="time-range-select"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="stats-charts">
        <div className="stats-chart">
          <h3>Focus Time (minutes)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sessionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="duration" 
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
            <LineChart data={sessionData}>
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
      </div>

      <div className="stats-summary">
        <div className="stats-card">
          <h3>Total Sessions</h3>
          <p>{sessions.length}</p>
        </div>
        <div className="stats-card">
          <h3>Total Focus Time</h3>
          <p>{Math.round(stats?.totalFocusTime / 60 || 0)} min</p>
        </div>
        <div className="stats-card">
          <h3>Distractions Blocked</h3>
          <p>{stats?.blockedAttempts || 0}</p>
        </div>
      </div>
    </div>
  );
};
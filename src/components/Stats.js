import { useState, useEffect } from 'react';

export class StatsManager {
  constructor() {
    this.storageKey = 'focus_flow_stats';
  }

  async getStats() {
    return new Promise((resolve) => {
      chrome.storage.local.get([this.storageKey], (result) => {
        resolve(result[this.storageKey] || {
          sessions: [],
          totalFocusTime: 0,
          sitesBlocked: 0
        });
      });
    });
  }

  async updateStats(sessionData) {
    const stats = await this.getStats();
    stats.sessions.push(sessionData);
    stats.totalFocusTime += sessionData.duration;
    stats.sitesBlocked += sessionData.blockedAttempts;

    return new Promise((resolve) => {
      chrome.storage.local.set({
        [this.storageKey]: stats
      }, resolve);
    });
  }

  isWithinLastWeek(date, today) {
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    return date >= weekAgo && date <= today;
  }

  async getDailyStats() {
    const stats = await this.getStats();
    const dailyData = {};
    
    stats.sessions.forEach(session => {
      const date = new Date(session.timestamp).toISOString().split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = {
          focusTime: 0,
          blockedAttempts: 0,
          sessions: 0
        };
      }
      dailyData[date].focusTime += session.duration;
      dailyData[date].blockedAttempts += session.blockedAttempts;
      dailyData[date].sessions++;
    });

    return dailyData;
  }
}

export const StatsDisplay = () => {
  const [statsData, setStatsData] = useState(null);
  const [timeRange, setTimeRange] = useState('week');
  const statsManager = new StatsManager();

  useEffect(() => {
    loadStats();
  }, [timeRange]);

  const loadStats = async () => {
    const data = timeRange === 'week' ? 
      await statsManager.getWeeklyStats() : 
      await statsManager.getDailyStats();
    setStatsData(data);
  };

  return (
    <div className="stats-container">
      <div className="stats-header">
        <h2>Focus Stats</h2>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="all">All Time</option>
        </select>
      </div>
      {statsData && <StatsCharts data={statsData} />}
    </div>
  );
};
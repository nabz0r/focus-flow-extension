import React, { useState, useEffect } from 'react';
import { DailyChart } from './DailyChart';
import { StatsCards } from './StatsCards';
import { PeriodSelector } from './PeriodSelector';

type Period = 'day' | 'week' | 'month';

export const StatsView = () => {
  const [period, setPeriod] = useState<Period>('week');
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadStats();
  }, [period]);

  const loadStats = async () => {
    const response = await chrome.runtime.sendMessage({
      type: 'GET_STATS',
      period
    });
    setStats(response);
  };

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="space-y-6 p-4">
      <PeriodSelector 
        value={period}
        onChange={setPeriod}
      />

      <StatsCards stats={stats} />
      <DailyChart data={stats.dailyStats} />
    </div>
  );
};
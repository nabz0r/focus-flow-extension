import React from 'react';

interface StatsCardsProps {
  stats: {
    totalSessions: number;
    completedSessions: number;
    totalFocusTime: number;
    productivityScore: number;
    blockedAttempts: number;
  };
}

const formatTime = (minutes: number): string => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
};

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const cards = [
    {
      title: 'Focus Time',
      value: formatTime(Math.round(stats.totalFocusTime / 60)),
      color: 'bg-blue-500'
    },
    {
      title: 'Sessions',
      value: `${stats.completedSessions}/${stats.totalSessions}`,
      color: 'bg-green-500'
    },
    {
      title: 'Productivity',
      value: `${stats.productivityScore}%`,
      color: 'bg-purple-500'
    },
    {
      title: 'Distractions Blocked',
      value: stats.blockedAttempts.toString(),
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map(card => (
        <div 
          key={card.title}
          className={`${card.color} rounded-lg p-4 text-white`}
        >
          <h3 className="text-sm font-medium opacity-90">
            {card.title}
          </h3>
          <p className="text-2xl font-bold mt-1">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
};
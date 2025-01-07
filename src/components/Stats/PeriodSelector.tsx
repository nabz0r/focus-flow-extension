import React from 'react';

type Period = 'day' | 'week' | 'month';

interface PeriodSelectorProps {
  value: Period;
  onChange: (period: Period) => void;
}

export const PeriodSelector = ({ value, onChange }: PeriodSelectorProps) => {
  const periods: Period[] = ['day', 'week', 'month'];

  return (
    <div className="flex gap-2">
      {periods.map(period => (
        <button
          key={period}
          onClick={() => onChange(period)}
          className={`
            px-4 py-2 rounded-lg capitalize
            ${value === period
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
            }
          `}
        >
          {period}
        </button>
      ))}
    </div>
  );
};
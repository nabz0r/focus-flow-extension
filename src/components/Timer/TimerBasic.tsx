import React, { useState, useEffect } from 'react';

export const TimerBasic = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="text-center p-4 bg-white rounded-lg shadow">
      <div className="text-4xl font-bold mb-4">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className="space-x-4">
        <button
          onClick={toggleTimer}
          className="bg-blue-500 text-white px-4 py-2 rounded">
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-500 text-white px-4 py-2 rounded">
          Reset
        </button>
      </div>
    </div>
  );
};
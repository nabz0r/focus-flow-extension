import React, { useState, useEffect } from 'react';
import { CircularProgress } from './CircularProgress';

interface TimerState {
  state: 'IDLE' | 'RUNNING' | 'PAUSED' | 'BREAK';
  timeRemaining: number;
  sessions: number;
}

export const Timer = () => {
  const [timerState, setTimerState] = useState<TimerState>({
    state: 'IDLE',
    timeRemaining: 0,
    sessions: 0
  });

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'TIMER_GET_STATE' }, (response) => {
      setTimerState(response);
    });

    const listener = (message: any) => {
      if (message.type === 'TIMER_STATE_UPDATE') {
        setTimerState(message.data);
      }
    };

    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, []);

  const handleStart = () => {
    chrome.runtime.sendMessage({ type: 'TIMER_START' });
  };

  const handlePause = () => {
    chrome.runtime.sendMessage({ type: 'TIMER_PAUSE' });
  };

  const handleResume = () => {
    chrome.runtime.sendMessage({ type: 'TIMER_RESUME' });
  };

  const handleReset = () => {
    chrome.runtime.sendMessage({ type: 'TIMER_RESET' });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <div className="relative">
        <CircularProgress 
          progress={(timerState.timeRemaining / (25 * 60)) * 100}
          size={200}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">
              {formatTime(timerState.timeRemaining)}
            </span>
            <span className="text-sm text-gray-500 capitalize">
              {timerState.state.toLowerCase()}
            </span>
          </div>
        </CircularProgress>
      </div>

      <div className="space-x-4">
        {timerState.state === 'IDLE' && (
          <button 
            onClick={handleStart}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Start
          </button>
        )}

        {timerState.state === 'RUNNING' && (
          <button 
            onClick={handlePause}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Pause
          </button>
        )}

        {timerState.state === 'PAUSED' && (
          <button 
            onClick={handleResume}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Resume
          </button>
        )}

        {timerState.state !== 'IDLE' && (
          <button 
            onClick={handleReset}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Reset
          </button>
        )}
      </div>

      <div className="text-sm text-gray-600">
        Sessions completed: {timerState.sessions}
      </div>
    </div>
  );
};
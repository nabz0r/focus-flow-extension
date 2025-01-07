import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { TimerBasic } from './components/Timer/TimerBasic';
import { BlockedSites } from './components/Sites/BlockedSites';

const Popup = () => {
  const [activeTab, setActiveTab] = useState('timer');

  return (
    <div className="w-96 min-h-[400px]">
      <nav className="flex border-b">
        <button
          onClick={() => setActiveTab('timer')}
          className={`px-4 py-2 ${activeTab === 'timer' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Timer
        </button>
        <button
          onClick={() => setActiveTab('sites')}
          className={`px-4 py-2 ${activeTab === 'sites' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Blocked Sites
        </button>
      </nav>

      <div className="p-4">
        {activeTab === 'timer' && <TimerBasic />}
        {activeTab === 'sites' && <BlockedSites />}
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root')
);
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Timer } from './components/Timer/Timer';
import { BlockList } from './components/Sites/BlockList';

const Popup = () => {
  const [activeTab, setActiveTab] = useState('timer');

  const tabs = [
    { id: 'timer', label: 'Timer' },
    { id: 'sites', label: 'Block Sites' }
  ];

  return (
    <div className="w-[400px] min-h-[500px] bg-white">
      <nav className="flex border-b bg-gray-50">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 py-3 px-4 text-sm font-medium
              ${activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="p-4">
        {activeTab === 'timer' ? (
          <Timer />
        ) : (
          <BlockList 
            onToggle={(enabled) => {
              chrome.runtime.sendMessage({
                type: 'TOGGLE_BLOCKING',
                enabled
              });
            }}
          />
        )}
      </main>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root')
);
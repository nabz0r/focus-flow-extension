import React, { useState, useEffect } from 'react';
import { DomainInput } from './DomainInput';

interface BlockListProps {
  onToggle: (enabled: boolean) => void;
}

export const BlockList: React.FC<BlockListProps> = ({ onToggle }) => {
  const [sites, setSites] = useState<string[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    const response = await chrome.runtime.sendMessage({ type: 'GET_BLOCKED_SITES' });
    setSites(response || []);
  };

  const handleAdd = async (domain: string) => {
    await chrome.runtime.sendMessage({ 
      type: 'BLOCK_SITE', 
      domain 
    });
    setSites([...sites, domain]);
  };

  const handleRemove = async (domain: string) => {
    await chrome.runtime.sendMessage({
      type: 'UNBLOCK_SITE',
      domain
    });
    setSites(sites.filter(site => site !== domain));
  };

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    onToggle(newState);
    chrome.runtime.sendMessage({
      type: 'TOGGLE_BLOCKING',
      enabled: newState
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Blocked Sites</h2>
        <button
          onClick={handleToggle}
          className={`
            px-4 py-2 rounded-lg transition-colors
            ${isEnabled ? 
              'bg-red-500 hover:bg-red-600' : 
              'bg-green-500 hover:bg-green-600'
            } text-white
          `}
        >
          {isEnabled ? 'Disable' : 'Enable'} Blocking
        </button>
      </div>

      <DomainInput onAdd={handleAdd} />

      <div className="space-y-2">
        {sites.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No sites blocked yet
          </p>
        ) : (
          sites.map(site => (
            <div 
              key={site}
              className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
            >
              <span className="font-mono">{site}</span>
              <button
                onClick={() => handleRemove(site)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { SiteList } from './SiteList';
import { AddSite } from './AddSite';

export const BlockedSites = () => {
  const [sites, setSites] = useState<string[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    const result = await chrome.storage.local.get(['blockedSites']);
    setSites(result.blockedSites || []);
  };

  const handleAddSite = async (site: string) => {
    chrome.runtime.sendMessage({ type: 'ADD_SITE', site });
    setSites([...sites, site]);
  };

  const handleRemoveSite = async (site: string) => {
    chrome.runtime.sendMessage({ type: 'REMOVE_SITE', site });
    setSites(sites.filter(s => s !== site));
  };

  const toggleBlocking = async () => {
    const newState = !isEnabled;
    chrome.runtime.sendMessage({ 
      type: 'TOGGLE_BLOCKING', 
      enabled: newState 
    });
    setIsEnabled(newState);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Blocked Sites</h2>
        <button
          onClick={toggleBlocking}
          className={`px-4 py-2 rounded ${isEnabled ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          {isEnabled ? 'Disable' : 'Enable'} Blocking
        </button>
      </div>
      <AddSite onAdd={handleAddSite} />
      <SiteList sites={sites} onRemove={handleRemoveSite} />
    </div>
  );
};
import React, { useState, useEffect } from 'react';

interface Settings {
  pomodoroLength: number;
  breakLength: number;
  blockedSites: string[];
}

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    pomodoroLength: 25,
    breakLength: 5,
    blockedSites: []
  });

  useEffect(() => {
    // Load settings from Chrome storage
    chrome.storage.sync.get(['settings'], (result) => {
      if (result.settings) {
        setSettings(result.settings);
      }
    });
  }, []);

  const saveSettings = () => {
    chrome.storage.sync.set({ settings }, () => {
      console.log('Settings saved');
    });
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="setting-item">
        <label>Pomodoro Length (minutes)</label>
        <input
          type="number"
          value={settings.pomodoroLength}
          onChange={(e) => setSettings({
            ...settings,
            pomodoroLength: parseInt(e.target.value)
          })}
        />
      </div>
      <button onClick={saveSettings}>Save Settings</button>
    </div>
  );
};
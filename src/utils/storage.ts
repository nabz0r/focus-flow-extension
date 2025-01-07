export const StorageKeys = {
  SETTINGS: 'settings',
  TIMER: 'timer',
  BLOCKED_SITES: 'blockedSites'
} as const;

export const getFromStorage = async (key: string) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      resolve(result[key]);
    });
  });
};

export const setToStorage = async (key: string, value: any) => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, resolve);
  });
};
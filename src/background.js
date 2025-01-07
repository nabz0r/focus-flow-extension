// Background Service Worker
class FocusFlowService {
  constructor() {
    this.initializeListeners();
  }

  initializeListeners() {
    chrome.runtime.onInstalled.addListener(this.handleInstalled.bind(this));
    chrome.tabs.onUpdated.addListener(this.handleTabUpdate.bind(this));
  }

  handleInstalled(details) {
    if (details.reason === 'install') {
      this.initializeUserSettings();
    }
  }

  handleTabUpdate(tabId, changeInfo, tab) {
    // Implement tab tracking logic
  }

  initializeUserSettings() {
    const defaultSettings = {
      pomodoroLength: 25,
      breakLength: 5,
      blockedSites: []
    };
    chrome.storage.sync.set({ settings: defaultSettings });
  }
}

new FocusFlowService();
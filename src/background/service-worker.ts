class FocusFlowWorker {
  constructor() {
    this.initListeners();
  }

  private initListeners() {
    chrome.runtime.onInstalled.addListener(this.handleInstall);
    chrome.tabs.onUpdated.addListener(this.handleTabUpdate);
  }

  private handleInstall = (details: chrome.runtime.InstalledDetails) => {
    if (details.reason === 'install') {
      this.initStorage();
    }
  }

  private handleTabUpdate = (
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab
  ) => {
    // Tab tracking logic
  }

  private initStorage() {
    const defaultSettings = {
      timer: 25,
      break: 5,
      sites: []
    };
    chrome.storage.local.set({ settings: defaultSettings });
  }
}

new FocusFlowWorker();
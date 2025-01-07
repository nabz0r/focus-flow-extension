import { SiteBlocker } from './site-blocker';

class FocusFlowWorker {
  private siteBlocker: SiteBlocker;

  constructor() {
    this.siteBlocker = new SiteBlocker();
    this.initListeners();
  }

  private initListeners() {
    chrome.runtime.onInstalled.addListener(this.handleInstall);
    chrome.alarms.onAlarm.addListener(this.handleAlarm);
  }

  private handleInstall = (details: chrome.runtime.InstalledDetails) => {
    if (details.reason === 'install') {
      this.initStorage();
    }
  }

  private handleAlarm = (alarm: chrome.alarms.Alarm) => {
    if (alarm.name === 'focusSession') {
      this.notifySessionEnd();
    }
  }

  private async initStorage() {
    const defaultSettings = {
      timer: 25,
      break: 5,
      blockedSites: []
    };
    await chrome.storage.local.set({ settings: defaultSettings });
  }

  private async notifySessionEnd() {
    await chrome.notifications.create('sessionEnd', {
      type: 'basic',
      iconUrl: 'assets/icon128.png',
      title: 'Focus Session Complete!',
      message: 'Time for a break'
    });
  }
}

new FocusFlowWorker();
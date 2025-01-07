export class SiteBlocker {
  private isEnabled = false;
  private blockedSites: string[] = [];

  constructor() {
    this.loadBlockedSites();
    this.initListeners();
  }

  private async loadBlockedSites() {
    const result = await chrome.storage.local.get(['blockedSites']);
    this.blockedSites = result.blockedSites || [];
  }

  private initListeners() {
    chrome.webNavigation.onBeforeNavigate.addListener(this.handleNavigation);
    chrome.runtime.onMessage.addListener(this.handleMessage);
  }

  private handleNavigation = (details: chrome.webNavigation.WebNavigationParentedCallbackDetails) => {
    if (!this.isEnabled) return;

    const url = new URL(details.url);
    if (this.shouldBlockSite(url.hostname)) {
      chrome.tabs.update(details.tabId, {
        url: chrome.runtime.getURL('blocked.html')
      });
    }
  }

  private handleMessage = (message: any, sender: chrome.runtime.MessageSender, sendResponse: Function) => {
    switch (message.type) {
      case 'TOGGLE_BLOCKING':
        this.isEnabled = message.enabled;
        sendResponse({ success: true });
        break;
      case 'ADD_SITE':
        this.addSite(message.site);
        break;
      case 'REMOVE_SITE':
        this.removeSite(message.site);
        break;
    }
  }

  private shouldBlockSite(hostname: string): boolean {
    return this.blockedSites.some(site => hostname.includes(site));
  }

  private async addSite(site: string) {
    this.blockedSites.push(site);
    await this.saveBlockedSites();
  }

  private async removeSite(site: string) {
    this.blockedSites = this.blockedSites.filter(s => s !== site);
    await this.saveBlockedSites();
  }

  private async saveBlockedSites() {
    await chrome.storage.local.set({ blockedSites: this.blockedSites });
  }
}
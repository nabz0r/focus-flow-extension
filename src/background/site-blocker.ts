export class SiteBlocker {
  private isEnabled = false;
  private blockedDomains: Set<string> = new Set();

  constructor() {
    this.init();
    this.setupListeners();
  }

  private async init() {
    const { blockedSites } = await chrome.storage.local.get('blockedSites');
    if (blockedSites) {
      this.blockedDomains = new Set(blockedSites);
    }
  }

  private setupListeners() {
    chrome.webRequest.onBeforeRequest.addListener(
      this.handleRequest.bind(this),
      { urls: ['<all_urls>'] },
      ['blocking']
    );

    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      switch(msg.type) {
        case 'BLOCK_SITE':
          this.blockSite(msg.domain);
          break;
        case 'UNBLOCK_SITE':
          this.unblockSite(msg.domain);
          break;
        case 'TOGGLE_BLOCKING':
          this.toggleBlocking(msg.enabled);
          break;
        case 'GET_BLOCKED_SITES':
          sendResponse([...this.blockedDomains]);
          break;
      }
    });
  }

  private handleRequest(details: chrome.webRequest.WebRequestDetails) {
    if (!this.isEnabled) return { cancel: false };

    const url = new URL(details.url);
    if (this.isBlocked(url.hostname)) {
      return { 
        redirectUrl: chrome.runtime.getURL('blocked.html')
      };
    }
    
    return { cancel: false };
  }

  private isBlocked(domain: string): boolean {
    return [...this.blockedDomains].some(blocked => 
      domain.includes(blocked) || blocked.includes(domain)
    );
  }

  private async blockSite(domain: string) {
    domain = this.normalizeDomain(domain);
    this.blockedDomains.add(domain);
    await this.saveBlockedSites();
  }

  private async unblockSite(domain: string) {
    domain = this.normalizeDomain(domain);
    this.blockedDomains.delete(domain);
    await this.saveBlockedSites();
  }

  private toggleBlocking(enabled: boolean) {
    this.isEnabled = enabled;
  }

  private normalizeDomain(domain: string): string {
    return domain.toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/\/.*$/, '')
      .replace(/^www\./, '');
  }

  private async saveBlockedSites() {
    await chrome.storage.local.set({
      blockedSites: [...this.blockedDomains]
    });
  }
}
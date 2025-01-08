import { StatsManager } from '../components/Stats';

export class FocusTracker {
  constructor() {
    this.currentSession = null;
    this.statsManager = new StatsManager();
  }

  startSession() {
    this.currentSession = {
      startTime: Date.now(),
      blockedAttempts: 0,
      tasks: []
    };
  }

  async endSession() {
    if (!this.currentSession) return;

    const session = {
      duration: (Date.now() - this.currentSession.startTime) / 1000,
      blockedAttempts: this.currentSession.blockedAttempts,
      tasks: this.currentSession.tasks,
      timestamp: Date.now()
    };

    await this.statsManager.updateStats(session);
    this.currentSession = null;
  }

  trackBlockedAttempt() {
    if (this.currentSession) {
      this.currentSession.blockedAttempts++;
    }
  }
}

// Initialize tracker
const focusTracker = new FocusTracker();

// Event listeners
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'START_SESSION':
      focusTracker.startSession();
      sendResponse({ success: true });
      break;
    
    case 'END_SESSION':
      focusTracker.endSession();
      sendResponse({ success: true });
      break;
    
    case 'GET_STATS':
      focusTracker.statsManager.getStats()
        .then(stats => sendResponse({ stats }));
      return true; // For async support
  }
});

// Site blocking handler
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (focusTracker.currentSession) {
      focusTracker.trackBlockedAttempt();
    }
    return { cancel: true };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
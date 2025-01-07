import { TimerCore } from './timer-core';
import { SiteBlocker } from './site-blocker';

class FocusFlowService {
  private timer: TimerCore;
  private blocker: SiteBlocker;

  constructor() {
    this.timer = new TimerCore();
    this.blocker = new SiteBlocker();
    this.loadInitialState();
  }

  private async loadInitialState() {
    const data = await chrome.storage.local.get(['config']);
    if (data.config) {
      // Initialize avec config sauvegardée
    }
  }
}

new FocusFlowService();
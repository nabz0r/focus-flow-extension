import { TimerCore } from './timer-core';
import { SiteBlocker } from './site-blocker';
import { NotificationManager } from './notifications';

class FocusFlowService {
  private timer: TimerCore;
  private blocker: SiteBlocker;
  private notifications: NotificationManager;

  constructor() {
    this.notifications = new NotificationManager();
    this.timer = new TimerCore(this.notifications);
    this.blocker = new SiteBlocker(this.notifications);
    
    this.initListeners();
  }

  private initListeners() {
    chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
      // Handle notification actions
      switch (notificationId) {
        case 'timer-complete':
          if (buttonIndex === 0) this.timer.startBreak();
          break;
        case 'break-complete':
          if (buttonIndex === 0) this.timer.startSession();
          break;
        case 'site-blocked':
          if (buttonIndex === 0) this.blocker.temporaryUnblock();
          break;
      }
    });
  }
}

new FocusFlowService();
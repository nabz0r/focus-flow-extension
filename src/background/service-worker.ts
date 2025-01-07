import { TimerCore } from './timer-core';
import { SiteBlocker } from './site-blocker';
import { NotificationManager } from './notifications';
import { StatsManager } from './stats';

class FocusFlowService {
  private timer: TimerCore;
  private blocker: SiteBlocker;
  private notifications: NotificationManager;
  private stats: StatsManager;

  constructor() {
    this.stats = new StatsManager();
    this.notifications = new NotificationManager();
    this.timer = new TimerCore(this.notifications);
    this.blocker = new SiteBlocker(this.notifications);
    
    this.setupMessageHandlers();
  }

  private setupMessageHandlers() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      switch(message.type) {
        case 'GET_STATS':
          this.handleGetStats(message.period).then(sendResponse);
          return true;

        case 'TIMER_COMPLETE':
          this.handleTimerComplete(message.data).then(sendResponse);
          return true;

        case 'BLOCK_ATTEMPT':
          this.handleBlockAttempt(message.url).then(sendResponse);
          return true;
      }
    });
  }

  private async handleGetStats(period: 'day' | 'week' | 'month') {
    return await this.stats.getStats(period);
  }

  private async handleTimerComplete(sessionData: any) {
    await this.stats.addSession({
      startTime: sessionData.startTime,
      endTime: sessionData.endTime,
      duration: sessionData.duration,
      type: sessionData.type,
      completed: sessionData.completed,
      blockedAttempts: sessionData.blockedAttempts
    });
  }

  private async handleBlockAttempt(url: string) {
    // Mettre à jour les stats pour les tentatives de blocage
    const currentSession = this.timer.getCurrentSession();
    if (currentSession) {
      currentSession.blockedAttempts++;
    }
  }
}

new FocusFlowService();
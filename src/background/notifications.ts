type NotificationType = 'TIMER_COMPLETE' | 'BREAK_START' | 'BREAK_END' | 'SITE_BLOCKED';

export class NotificationManager {
  private static readonly SOUNDS = {
    timer: 'assets/sounds/timer.mp3',
    block: 'assets/sounds/block.mp3'
  };

  private enabled = true;
  private soundEnabled = true;

  constructor() {
    this.init();
  }

  private async init() {
    const { notificationSettings } = await chrome.storage.local.get('notificationSettings');
    if (notificationSettings) {
      this.enabled = notificationSettings.enabled;
      this.soundEnabled = notificationSettings.sound;
    }
  }

  async notify(type: NotificationType, data?: any) {
    if (!this.enabled) return;

    const notification = this.createNotification(type, data);
    await chrome.notifications.create(notification);

    if (this.soundEnabled) {
      this.playSound(type);
    }
  }

  private createNotification(type: NotificationType, data?: any): chrome.notifications.NotificationOptions {
    const base = {
      type: 'basic' as chrome.notifications.TemplateType,
      iconUrl: 'assets/icon128.png',
      priority: 2
    };

    switch (type) {
      case 'TIMER_COMPLETE':
        return {
          ...base,
          title: 'Focus Session Complete!',
          message: `You've completed ${data.sessionCount} sessions today.`,
          buttons: [{ title: 'Start Break' }]
        };

      case 'BREAK_START':
        return {
          ...base,
          title: 'Break Time!',
          message: `Take a ${data.duration} minute break.`,
          buttons: [{ title: 'Skip Break' }]
        };

      case 'BREAK_END':
        return {
          ...base,
          title: 'Break Over',
          message: 'Ready to focus again?',
          buttons: [{ title: 'Start Session' }]
        };

      case 'SITE_BLOCKED':
        return {
          ...base,
          title: 'Site Blocked',
          message: `${data.site} is blocked during focus time.`,
          buttons: [{ title: 'Unblock Temporarily' }]
        };

      default:
        throw new Error(`Unknown notification type: ${type}`);
    }
  }

  private playSound(type: NotificationType) {
    const audio = new Audio(this.getSoundPath(type));
    audio.play().catch(console.error);
  }

  private getSoundPath(type: NotificationType): string {
    switch (type) {
      case 'SITE_BLOCKED':
        return NotificationManager.SOUNDS.block;
      default:
        return NotificationManager.SOUNDS.timer;
    }
  }

  async updateSettings(settings: { enabled: boolean; sound: boolean }) {
    this.enabled = settings.enabled;
    this.soundEnabled = settings.sound;
    await chrome.storage.local.set({ notificationSettings: settings });
  }
}
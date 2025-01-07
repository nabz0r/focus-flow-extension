type TimerState = 'IDLE' | 'RUNNING' | 'PAUSED' | 'BREAK';

interface TimerConfig {
  focusTime: number;
  breakTime: number;
  longBreakTime: number;
  sessionsBeforeLongBreak: number;
}

export class TimerCore {
  private state: TimerState = 'IDLE';
  private timeRemaining: number = 0;
  private interval: NodeJS.Timer | null = null;
  private lastTick: number = 0;
  private sessions: number = 0;

  constructor(
    private config: TimerConfig = {
      focusTime: 25 * 60,
      breakTime: 5 * 60,
      longBreakTime: 15 * 60,
      sessionsBeforeLongBreak: 4
    }
  ) {
    this.initMessageHandlers();
  }

  private initMessageHandlers() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      switch (message.type) {
        case 'TIMER_START':
          this.start();
          break;
        case 'TIMER_PAUSE':
          this.pause();
          break;
        case 'TIMER_RESUME':
          this.resume();
          break;
        case 'TIMER_RESET':
          this.reset();
          break;
        case 'TIMER_GET_STATE':
          sendResponse({
            state: this.state,
            timeRemaining: this.timeRemaining,
            sessions: this.sessions
          });
          break;
      }
    });
  }

  private start() {
    if (this.state !== 'IDLE') return;

    this.state = 'RUNNING';
    this.timeRemaining = this.config.focusTime;
    this.lastTick = Date.now();
    this.startTicking();
    this.broadcastState();
  }

  private pause() {
    if (this.state !== 'RUNNING') return;

    this.state = 'PAUSED';
    this.stopTicking();
    this.broadcastState();
  }

  private resume() {
    if (this.state !== 'PAUSED') return;

    this.state = 'RUNNING';
    this.lastTick = Date.now();
    this.startTicking();
    this.broadcastState();
  }

  private reset() {
    this.stopTicking();
    this.state = 'IDLE';
    this.timeRemaining = 0;
    this.broadcastState();
  }

  private startTicking() {
    if (this.interval) return;

    this.interval = setInterval(() => {
      const now = Date.now();
      const delta = Math.floor((now - this.lastTick) / 1000);
      this.lastTick = now;

      this.timeRemaining = Math.max(0, this.timeRemaining - delta);
      this.broadcastState();

      if (this.timeRemaining === 0) {
        this.handleTimerComplete();
      }
    }, 1000);
  }

  private stopTicking() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private handleTimerComplete() {
    this.stopTicking();

    if (this.state === 'RUNNING') {
      this.sessions++;
      this.state = 'BREAK';
      this.timeRemaining = this.shouldTakeLongBreak() ? 
        this.config.longBreakTime : 
        this.config.breakTime;
    } else if (this.state === 'BREAK') {
      this.state = 'IDLE';
      this.timeRemaining = 0;
    }

    this.broadcastState();
    this.notifyStateChange();
  }

  private shouldTakeLongBreak(): boolean {
    return this.sessions % this.config.sessionsBeforeLongBreak === 0;
  }

  private broadcastState() {
    chrome.runtime.sendMessage({
      type: 'TIMER_STATE_UPDATE',
      data: {
        state: this.state,
        timeRemaining: this.timeRemaining,
        sessions: this.sessions
      }
    });
  }

  private notifyStateChange() {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: '/assets/icon128.png',
      title: this.state === 'BREAK' ? 'Break Time!' : 'Focus Session Complete!',
      message: this.state === 'BREAK' ? 
        `Take a ${Math.floor(this.timeRemaining / 60)} minute break` : 
        'Ready for another session?'
    });
  }
}
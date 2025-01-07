export interface Session {
  id: string;
  startTime: number;
  endTime: number;
  duration: number;
  type: 'focus' | 'break';
  completed: boolean;
  blockedAttempts: number;
}

export class StatsManager {
  private sessions: Session[] = [];

  constructor() {
    this.loadSessions();
  }

  private async loadSessions() {
    const { sessions } = await chrome.storage.local.get('sessions');
    this.sessions = sessions || [];
  }

  async addSession(session: Omit<Session, 'id'>) {
    const newSession = {
      ...session,
      id: Date.now().toString()
    };
    this.sessions.push(newSession);
    await this.saveSessions();
    return newSession;
  }

  async getStats(period: 'day' | 'week' | 'month') {
    const sessions = await this.filterSessionsByPeriod(period);
    return {
      totalSessions: sessions.length,
      completedSessions: sessions.filter(s => s.completed).length,
      totalFocusTime: this.calculateTotalTime(sessions, 'focus'),
      totalBreakTime: this.calculateTotalTime(sessions, 'break'),
      averageSessionLength: this.calculateAverageSession(sessions),
      blockedAttempts: this.calculateTotalBlockedAttempts(sessions),
      productivityScore: this.calculateProductivityScore(sessions),
      dailyStats: this.calculateDailyStats(sessions)
    };
  }

  private async filterSessionsByPeriod(period: 'day' | 'week' | 'month') {
    const now = Date.now();
    const periods = {
      day: now - 86400000,
      week: now - 604800000,
      month: now - 2592000000
    };
    return this.sessions.filter(s => s.startTime >= periods[period]);
  }

  private calculateTotalTime(sessions: Session[], type: 'focus' | 'break'): number {
    return sessions
      .filter(s => s.type === type)
      .reduce((total, s) => total + s.duration, 0);
  }

  private calculateAverageSession(sessions: Session[]): number {
    const focusSessions = sessions.filter(s => s.type === 'focus');
    if (focusSessions.length === 0) return 0;
    return focusSessions.reduce((total, s) => total + s.duration, 0) / focusSessions.length;
  }

  private calculateTotalBlockedAttempts(sessions: Session[]): number {
    return sessions.reduce((total, s) => total + s.blockedAttempts, 0);
  }

  private calculateProductivityScore(sessions: Session[]): number {
    const focusSessions = sessions.filter(s => s.type === 'focus');
    if (focusSessions.length === 0) return 0;
    
    const completionRate = focusSessions.filter(s => s.completed).length / focusSessions.length;
    const avgBlockedAttempts = this.calculateTotalBlockedAttempts(sessions) / focusSessions.length;
    
    return Math.round((completionRate * 100) - (avgBlockedAttempts * 5));
  }

  private calculateDailyStats(sessions: Session[]): Array<{
    date: string;
    focusTime: number;
    productivity: number;
  }> {
    const dailyMap = new Map<string, Session[]>();

    sessions.forEach(session => {
      const date = new Date(session.startTime).toISOString().split('T')[0];
      const daily = dailyMap.get(date) || [];
      daily.push(session);
      dailyMap.set(date, daily);
    });

    return Array.from(dailyMap.entries()).map(([date, sessions]) => ({
      date,
      focusTime: this.calculateTotalTime(sessions, 'focus'),
      productivity: this.calculateProductivityScore(sessions)
    }));
  }

  private async saveSessions() {
    await chrome.storage.local.set({ sessions: this.sessions });
  }
}
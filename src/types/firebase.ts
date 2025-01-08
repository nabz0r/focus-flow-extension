export interface UserSettings {
  pomodoroLength: number;
  breakLength: number;
  longBreakLength: number;
  longBreakInterval: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  blockedSites: string[];
  theme: 'light' | 'dark' | 'system';
}

export interface Session {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  type: 'pomodoro' | 'break' | 'longBreak';
  completed: boolean;
  interrupted: boolean;
  blockedAttempts: number;
}

export interface Task {
  id: string;
  userId: string;
  sessionId?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  estimatedPomodoros: number;
  actualPomodoros: number;
  tags: string[];
}

export interface Stats {
  dailyPomodoros: number;
  weeklyPomodoros: number;
  monthlyPomodoros: number;
  totalPomodoros: number;
  averageDailyPomodoros: number;
  completionRate: number;
  focusTime: number;
  lastUpdated: Date;
}
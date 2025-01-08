import { Encryption } from './encryption';
import { validate, TimerConfigSchema, BlockedSiteSchema, NotificationSettingsSchema } from './validation';

interface StorageSchema {
  settings: {
    timer: z.infer<typeof TimerConfigSchema>;
    notifications: z.infer<typeof NotificationSettingsSchema>;
  };
  blockedSites: z.infer<typeof BlockedSiteSchema>[];
}

export class StorageManager {
  private encryption: Encryption;
  private static instance: StorageManager;
  private readonly QUOTA_LIMIT = 5242880; // 5MB

  private constructor() {
    this.encryption = new Encryption();
  }

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  async init(password: string): Promise<void> {
    await this.encryption.init(password);
  }

  async get<K extends keyof StorageSchema>(key: K): Promise<StorageSchema[K]> {
    try {
      const result = await chrome.storage.local.get(key);
      if (!result[key]) return this.getDefaultValue(key);

      const decrypted = await this.encryption.decrypt(result[key]);
      return this.validate(key, decrypted);
    } catch (error) {
      console.error(`Storage get error for ${key}:`, error);
      throw error;
    }
  }

  async set<K extends keyof StorageSchema>(
    key: K,
    value: StorageSchema[K]
  ): Promise<void> {
    try {
      const bytesInUse = await chrome.storage.local.getBytesInUse();
      if (bytesInUse > this.QUOTA_LIMIT) {
        await this.cleanup();
      }

      const validated = this.validate(key, value);
      const encrypted = await this.encryption.encrypt(validated);
      await chrome.storage.local.set({ [key]: encrypted });
    } catch (error) {
      console.error(`Storage set error for ${key}:`, error);
      throw error;
    }
  }

  private validate<K extends keyof StorageSchema>(
    key: K,
    value: unknown
  ): StorageSchema[K] {
    switch (key) {
      case 'settings':
        return {
          timer: validate(TimerConfigSchema, value.timer),
          notifications: validate(NotificationSettingsSchema, value.notifications)
        };
      case 'blockedSites':
        return value.map(site => validate(BlockedSiteSchema, site));
      default:
        throw new Error(`Unknown storage key: ${key}`);
    }
  }

  private getDefaultValue<K extends keyof StorageSchema>(key: K): StorageSchema[K] {
    switch (key) {
      case 'settings':
        return {
          timer: {
            focusTime: 25,
            breakTime: 5,
            longBreakTime: 15,
            sessionsBeforeLongBreak: 4
          },
          notifications: {
            enabled: true,
            sound: true,
            priority: 1,
            allowButtons: true
          }
        };
      case 'blockedSites':
        return [];
      default:
        throw new Error(`No default value for key: ${key}`);
    }
  }

  private async cleanup(): Promise<void> {
    // Implement cleanup strategy
    const oldData = await chrome.storage.local.get();
    // Remove old sessions, logs, etc.
  }
}
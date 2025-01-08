import { z } from 'zod';

export const TimerConfigSchema = z.object({
  focusTime: z.number().min(1).max(120),
  breakTime: z.number().min(1).max(30),
  longBreakTime: z.number().min(5).max(60),
  sessionsBeforeLongBreak: z.number().min(1).max(10)
});

export const BlockedSiteSchema = z.object({
  domain: z.string().min(1).max(255),
  addedAt: z.number(),
  reason: z.string().optional(),
  temporary: z.boolean().optional(),
  expiresAt: z.number().optional()
});

export const NotificationSettingsSchema = z.object({
  enabled: z.boolean(),
  sound: z.boolean(),
  priority: z.number().min(0).max(2),
  allowButtons: z.boolean()
});

export const validate = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error.errors);
    }
    throw error;
  }
};

export class ValidationError extends Error {
  constructor(public readonly errors: z.ZodError['errors']) {
    super('Validation failed');
    this.name = 'ValidationError';
  }
}
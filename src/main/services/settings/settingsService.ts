import type { AppSettings } from '@shared/types/models';

export interface SettingsService {
  getSettings: () => AppSettings;
}

export function createSettingsService(): SettingsService {
  return {
    getSettings: () => {
      const now = new Date().toISOString();

      return {
        id: 'default',
        theme: 'dark',
        language: 'en-US',
        autoUpdate: false,
        telemetryEnabled: false,
        createdAt: now,
        updatedAt: now
      };
    }
  };
}

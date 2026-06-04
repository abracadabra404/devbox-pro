import type { App } from 'electron';
import type { AppPaths, DesktopPlatform, PlatformInfo } from '@shared/types/platform';

export interface PlatformService {
  getPlatformInfo: () => PlatformInfo;
  getAppPaths: () => AppPaths;
}

export function createPlatformService(app: App): PlatformService {
  return {
    getPlatformInfo: () => {
      const platform = normalizePlatform(process.platform);

      return {
        platform,
        arch: process.arch,
        isMac: platform === 'darwin',
        isWindows: platform === 'win32',
        isLinux: platform === 'linux'
      };
    },
    getAppPaths: () => ({
      userData: app.getPath('userData'),
      logs: app.getPath('logs'),
      temp: app.getPath('temp'),
      home: app.getPath('home')
    })
  };
}

function normalizePlatform(value: NodeJS.Platform): DesktopPlatform {
  if (value === 'darwin' || value === 'win32' || value === 'linux') {
    return value;
  }

  return 'unknown';
}

export type DesktopPlatform = 'darwin' | 'win32' | 'linux' | 'unknown';

export interface PlatformInfo {
  platform: DesktopPlatform;
  arch: string;
  isMac: boolean;
  isWindows: boolean;
  isLinux: boolean;
}

export interface AppPaths {
  userData: string;
  logs: string;
  temp: string;
  home: string;
}

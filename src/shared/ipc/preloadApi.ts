import type { ToolDefinition } from '../constants/tools';
import type { IpcResult } from './contracts';
import type { AppSettings } from '../types/models';
import type { AppPaths, PlatformInfo } from '../types/platform';

export interface DevboxApi {
  app: {
    getPlatformInfo: () => Promise<IpcResult<PlatformInfo>>;
    getPaths: () => Promise<IpcResult<AppPaths>>;
  };
  connections: {
    listTypes: () => Promise<IpcResult<ToolDefinition[]>>;
  };
  settings: {
    get: () => Promise<IpcResult<AppSettings>>;
  };
}

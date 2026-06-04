import type { AppErrorDto } from '../errors/appError';
import type { ToolDefinition } from '../constants/tools';
import type { AppSettings } from '../types/models';
import type { AppPaths, PlatformInfo } from '../types/platform';

export type IpcResult<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: AppErrorDto;
    };

export interface IpcResponseMap {
  'app:get-platform-info': PlatformInfo;
  'app:get-paths': AppPaths;
  'connections:list-types': ToolDefinition[];
  'settings:get': AppSettings;
}

import type { AppErrorDto } from '../errors/appError';
import type { ToolDefinition } from '../constants/tools';
import type {
  AppSettings,
  ConnectionProfile,
  DatabaseConnectionTestResult,
  SaveConnectionProfileInput,
  SqlExecutionResult,
  SqlHistory
} from '../types/models';
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
  'database:list-profiles': ConnectionProfile[];
  'database:save-profile': ConnectionProfile;
  'database:test-connection': DatabaseConnectionTestResult;
  'database:execute-sql': SqlExecutionResult;
  'database:list-sql-history': SqlHistory[];
  'settings:get': AppSettings;
}

export interface ExecuteSqlInput {
  profileId: string;
  sql: string;
}

export interface ListSqlHistoryInput {
  profileId?: string;
  limit?: number;
}

export interface IpcRequestMap {
  'database:save-profile': SaveConnectionProfileInput;
  'database:test-connection': { profileId: string };
  'database:execute-sql': ExecuteSqlInput;
  'database:list-sql-history': ListSqlHistoryInput | undefined;
}

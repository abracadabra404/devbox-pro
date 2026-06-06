import type { ToolDefinition } from '../constants/tools';
import type { ExecuteSqlInput, IpcResult, ListSqlHistoryInput } from './contracts';
import type {
  AppSettings,
  ConnectionProfile,
  DatabaseConnectionTestResult,
  SaveConnectionProfileInput,
  SqlExecutionResult,
  SqlHistory
} from '../types/models';
import type { AppPaths, PlatformInfo } from '../types/platform';

export interface DevboxApi {
  app: {
    getPlatformInfo: () => Promise<IpcResult<PlatformInfo>>;
    getPaths: () => Promise<IpcResult<AppPaths>>;
  };
  connections: {
    listTypes: () => Promise<IpcResult<ToolDefinition[]>>;
  };
  database: {
    listProfiles: () => Promise<IpcResult<ConnectionProfile[]>>;
    saveProfile: (input: SaveConnectionProfileInput) => Promise<IpcResult<ConnectionProfile>>;
    testConnection: (profileId: string) => Promise<IpcResult<DatabaseConnectionTestResult>>;
    executeSql: (input: ExecuteSqlInput) => Promise<IpcResult<SqlExecutionResult>>;
    listSqlHistory: (input?: ListSqlHistoryInput) => Promise<IpcResult<SqlHistory[]>>;
  };
  settings: {
    get: () => Promise<IpcResult<AppSettings>>;
  };
}

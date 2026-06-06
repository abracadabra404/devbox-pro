import { ipcMain } from 'electron';
import type { ToolDefinition } from '@shared/constants/tools';
import { toAppErrorDto } from '@shared/errors/appError';
import { IPC_CHANNELS } from '@shared/ipc/channels';
import type { IpcResult } from '@shared/ipc/contracts';
import type {
  AppSettings,
  ConnectionProfile,
  DatabaseConnectionTestResult,
  SaveConnectionProfileInput,
  SqlExecutionResult,
  SqlHistory
} from '@shared/types/models';
import type { AppPaths, PlatformInfo } from '@shared/types/platform';
import type { ConnectionService } from '../services/connection/connectionService';
import type { DatabaseService } from '../services/database/databaseService';
import type { SettingsService } from '../services/settings/settingsService';
import type { PlatformService } from '../platform/platformService';

export interface IpcHandlerDependencies {
  platformService: PlatformService;
  connectionService: ConnectionService;
  databaseService: DatabaseService;
  settingsService: SettingsService;
}

export function registerIpcHandlers(deps: IpcHandlerDependencies): void {
  ipcMain.handle(IPC_CHANNELS.APP_GET_PLATFORM_INFO, async (): Promise<IpcResult<PlatformInfo>> => {
    return toIpcResult(() => deps.platformService.getPlatformInfo());
  });

  ipcMain.handle(IPC_CHANNELS.APP_GET_PATHS, async (): Promise<IpcResult<AppPaths>> => {
    return toIpcResult(() => deps.platformService.getAppPaths());
  });

  ipcMain.handle(IPC_CHANNELS.CONNECTIONS_LIST_TYPES, async (): Promise<IpcResult<ToolDefinition[]>> => {
    return toIpcResult(() => deps.connectionService.listSupportedTools());
  });

  ipcMain.handle(IPC_CHANNELS.DATABASE_LIST_PROFILES, async (): Promise<IpcResult<ConnectionProfile[]>> => {
    return toIpcResult(() => deps.databaseService.listProfiles());
  });

  ipcMain.handle(
    IPC_CHANNELS.DATABASE_SAVE_PROFILE,
    async (_event, input: SaveConnectionProfileInput): Promise<IpcResult<ConnectionProfile>> => {
      return toIpcResult(() => deps.databaseService.saveProfile(input));
    }
  );

  ipcMain.handle(
    IPC_CHANNELS.DATABASE_TEST_CONNECTION,
    async (_event, input: { profileId: string }): Promise<IpcResult<DatabaseConnectionTestResult>> => {
      return toIpcResult(() => deps.databaseService.testConnection(input.profileId));
    }
  );

  ipcMain.handle(
    IPC_CHANNELS.DATABASE_EXECUTE_SQL,
    async (_event, input: { profileId: string; sql: string }): Promise<IpcResult<SqlExecutionResult>> => {
      return toIpcResult(() => deps.databaseService.executeSql(input.profileId, input.sql));
    }
  );

  ipcMain.handle(
    IPC_CHANNELS.DATABASE_LIST_SQL_HISTORY,
    async (_event, input?: { profileId?: string; limit?: number }): Promise<IpcResult<SqlHistory[]>> => {
      return toIpcResult(() => deps.databaseService.listSqlHistory(input));
    }
  );

  ipcMain.handle(IPC_CHANNELS.SETTINGS_GET, async (): Promise<IpcResult<AppSettings>> => {
    return toIpcResult(() => deps.settingsService.getSettings());
  });
}

async function toIpcResult<T>(handler: () => T | Promise<T>): Promise<IpcResult<T>> {
  try {
    const data = await handler();
    return {
      ok: true,
      data
    };
  } catch (error) {
    return {
      ok: false,
      error: toAppErrorDto(error)
    };
  }
}

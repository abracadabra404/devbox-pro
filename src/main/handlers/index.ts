import { ipcMain } from 'electron';
import type { ToolDefinition } from '@shared/constants/tools';
import { toAppErrorDto } from '@shared/errors/appError';
import { IPC_CHANNELS } from '@shared/ipc/channels';
import type { IpcResult } from '@shared/ipc/contracts';
import type { AppSettings } from '@shared/types/models';
import type { AppPaths, PlatformInfo } from '@shared/types/platform';
import type { ConnectionService } from '../services/connection/connectionService';
import type { SettingsService } from '../services/settings/settingsService';
import type { PlatformService } from '../platform/platformService';

export interface IpcHandlerDependencies {
  platformService: PlatformService;
  connectionService: ConnectionService;
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

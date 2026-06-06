import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from '@shared/ipc/channels';
import type { DevboxApi } from '@shared/ipc/preloadApi';

const api: DevboxApi = {
  app: {
    getPlatformInfo: () => ipcRenderer.invoke(IPC_CHANNELS.APP_GET_PLATFORM_INFO),
    getPaths: () => ipcRenderer.invoke(IPC_CHANNELS.APP_GET_PATHS)
  },
  connections: {
    listTypes: () => ipcRenderer.invoke(IPC_CHANNELS.CONNECTIONS_LIST_TYPES)
  },
  database: {
    listProfiles: () => ipcRenderer.invoke(IPC_CHANNELS.DATABASE_LIST_PROFILES),
    saveProfile: (input) => ipcRenderer.invoke(IPC_CHANNELS.DATABASE_SAVE_PROFILE, input),
    testConnection: (profileId) => ipcRenderer.invoke(IPC_CHANNELS.DATABASE_TEST_CONNECTION, { profileId }),
    executeSql: (input) => ipcRenderer.invoke(IPC_CHANNELS.DATABASE_EXECUTE_SQL, input),
    listSqlHistory: (input) => ipcRenderer.invoke(IPC_CHANNELS.DATABASE_LIST_SQL_HISTORY, input)
  },
  settings: {
    get: () => ipcRenderer.invoke(IPC_CHANNELS.SETTINGS_GET)
  }
};

contextBridge.exposeInMainWorld('devbox', api);

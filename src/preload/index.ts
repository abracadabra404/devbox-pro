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
  settings: {
    get: () => ipcRenderer.invoke(IPC_CHANNELS.SETTINGS_GET)
  }
};

contextBridge.exposeInMainWorld('devbox', api);

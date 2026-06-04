export const IPC_CHANNELS = {
  APP_GET_PLATFORM_INFO: 'app:get-platform-info',
  APP_GET_PATHS: 'app:get-paths',
  CONNECTIONS_LIST_TYPES: 'connections:list-types',
  SETTINGS_GET: 'settings:get'
} as const;

export type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];

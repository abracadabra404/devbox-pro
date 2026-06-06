export const IPC_CHANNELS = {
  APP_GET_PLATFORM_INFO: 'app:get-platform-info',
  APP_GET_PATHS: 'app:get-paths',
  CONNECTIONS_LIST_TYPES: 'connections:list-types',
  DATABASE_LIST_PROFILES: 'database:list-profiles',
  DATABASE_SAVE_PROFILE: 'database:save-profile',
  DATABASE_TEST_CONNECTION: 'database:test-connection',
  DATABASE_EXECUTE_SQL: 'database:execute-sql',
  DATABASE_LIST_SQL_HISTORY: 'database:list-sql-history',
  SETTINGS_GET: 'settings:get'
} as const;

export type IpcChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];

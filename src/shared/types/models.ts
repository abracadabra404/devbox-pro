export type ConnectionType =
  | 'mysql'
  | 'postgresql'
  | 'sqlite'
  | 'redis'
  | 'ssh'
  | 'sftp'
  | 'kafka'
  | 'http';

export type SecretStorageType = 'keychain' | 'windowsCredential' | 'localEncrypted';

export type ThemeMode = 'dark' | 'light' | 'system';

export interface ConnectionProfile {
  id: string;
  name: string;
  type: ConnectionType;
  host?: string;
  port?: number;
  username?: string;
  passwordRef?: string;
  database?: string;
  extraConfig: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface SaveConnectionProfileInput {
  id?: string;
  name: string;
  host: string;
  port: number;
  username: string;
  password?: string;
  database?: string;
  extraConfig?: Record<string, unknown>;
}

export interface SensitiveSecret {
  id: string;
  profileId: string;
  secretType: string;
  encryptedValue?: string;
  keychainRef?: string;
  storageType: SecretStorageType;
  createdAt: string;
  updatedAt: string;
}

export interface TabSession {
  id: string;
  type: ConnectionType | 'tools' | 'logs' | 'settings';
  title: string;
  profileId?: string;
  state: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface SqlHistory {
  id: string;
  profileId: string;
  sql: string;
  executedAt: string;
  duration: number;
  success: boolean;
  errorMessage?: string;
}

export interface SqlColumn {
  name: string;
  dataType?: string;
}

export interface SqlExecutionResult {
  profileId: string;
  columns: SqlColumn[];
  rows: Record<string, unknown>[];
  duration: number;
  affectedRows?: number;
  executedAt: string;
  historyId?: string;
}

export interface DatabaseConnectionTestResult {
  profileId: string;
  success: boolean;
  message: string;
  duration: number;
}

export interface AppSettings {
  id: string;
  theme: ThemeMode;
  language: string;
  autoUpdate: boolean;
  telemetryEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

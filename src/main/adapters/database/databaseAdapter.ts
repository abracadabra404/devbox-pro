import type { ConnectionProfile } from '@shared/types/models';

export interface SqlColumn {
  name: string;
  dataType?: string;
}

export interface SqlExecutionResult {
  columns: SqlColumn[];
  rows: Record<string, unknown>[];
  duration: number;
  affectedRows?: number;
}

export interface DatabaseAdapter {
  testConnection: (profile: ConnectionProfile) => Promise<boolean>;
  execute: (profile: ConnectionProfile, sql: string) => Promise<SqlExecutionResult>;
}

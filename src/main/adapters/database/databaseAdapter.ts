import type { ConnectionProfile } from '@shared/types/models';
import type { SqlColumn, SqlExecutionResult } from '@shared/types/models';
import { AppError } from '@shared/errors/appError';
import mysql from 'mysql2/promise';

export type ResolvedConnectionProfile = ConnectionProfile & { password?: string };

export interface DatabaseAdapter {
  testConnection: (profile: ResolvedConnectionProfile) => Promise<boolean>;
  execute: (profile: ResolvedConnectionProfile, sql: string) => Promise<Omit<SqlExecutionResult, 'profileId' | 'executedAt' | 'historyId'>>;
}

export function createMySqlDatabaseAdapter(): DatabaseAdapter {
  return {
    testConnection: async (profile) => {
      const connection = await createConnection(profile);

      try {
        await connection.ping();
        return true;
      } finally {
        await connection.end();
      }
    },
    execute: async (profile, sql) => {
      const connection = await createConnection(profile);
      const startedAt = Date.now();

      try {
        const [rows, fields] = await connection.query(sql);
        const duration = Date.now() - startedAt;
        const normalizedRows = Array.isArray(rows)
          ? rows.map((row) => ({ ...(row as Record<string, unknown>) }))
          : [];

        return {
          columns: normalizeColumns(fields),
          rows: normalizedRows,
          duration,
          affectedRows: readAffectedRows(rows)
        };
      } finally {
        await connection.end();
      }
    }
  };
}

async function createConnection(profile: ResolvedConnectionProfile): Promise<mysql.Connection> {
  if (!profile.host || !profile.port) {
    throw new AppError('invalid_database_profile', 'Database profile is missing host or port.');
  }

  return mysql.createConnection({
    host: profile.host,
    port: profile.port,
    user: profile.username,
    password: profile.password,
    database: profile.database,
    connectTimeout: readNumber(profile.extraConfig.connectTimeoutMs, 10000),
    multipleStatements: false
  });
}

function normalizeColumns(fields: mysql.FieldPacket[] | mysql.FieldPacket[][]): SqlColumn[] {
  if (!Array.isArray(fields) || fields.length === 0) {
    return [];
  }

  const flatFields = Array.isArray(fields[0]) ? (fields as mysql.FieldPacket[][]).flat() : (fields as mysql.FieldPacket[]);

  return flatFields.map((field) => ({
    name: field.name,
    dataType: String(field.columnType)
  }));
}

function readAffectedRows(rows: unknown): number | undefined {
  if (rows && typeof rows === 'object' && 'affectedRows' in rows) {
    const affectedRows = (rows as { affectedRows?: unknown }).affectedRows;
    return typeof affectedRows === 'number' ? affectedRows : undefined;
  }

  return undefined;
}

function readNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

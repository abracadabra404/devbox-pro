import { AppError } from '@shared/errors/appError';
import type {
  ConnectionProfile,
  DatabaseConnectionTestResult,
  SaveConnectionProfileInput,
  SqlExecutionResult,
  SqlHistory
} from '@shared/types/models';
import type { DatabaseAdapter, ResolvedConnectionProfile } from '../../adapters/database/databaseAdapter';
import type { SecurityService } from '../../security/securityService';
import type { StorageService } from '../../storage/storageService';

export interface DatabaseService {
  listProfiles: () => Promise<ConnectionProfile[]>;
  saveProfile: (input: SaveConnectionProfileInput) => Promise<ConnectionProfile>;
  testConnection: (profileId: string) => Promise<DatabaseConnectionTestResult>;
  executeSql: (profileId: string, sql: string) => Promise<SqlExecutionResult>;
  listSqlHistory: (input?: { profileId?: string; limit?: number }) => Promise<SqlHistory[]>;
}

export interface DatabaseServiceDependencies {
  adapter: DatabaseAdapter;
  securityService: SecurityService;
  storageService: StorageService;
}

export function createDatabaseService(deps: DatabaseServiceDependencies): DatabaseService {
  return {
    listProfiles: () => deps.storageService.listConnectionProfiles('mysql'),
    saveProfile: async (input) => {
      validateProfileInput(input);

      const now = new Date().toISOString();
      const existing = input.id ? await deps.storageService.getConnectionProfile(input.id) : null;
      const profileId = existing?.id ?? input.id ?? createId('profile');
      let passwordRef = existing?.passwordRef;

      if (input.password) {
        const secret = await deps.securityService.saveSecret({
          profileId,
          secretType: 'mysql-password',
          value: input.password
        });
        passwordRef = secret.id;
      }

      const profile: ConnectionProfile = {
        id: profileId,
        name: input.name.trim(),
        type: 'mysql',
        host: input.host.trim(),
        port: input.port,
        username: input.username.trim(),
        passwordRef,
        database: input.database?.trim() || undefined,
        extraConfig: input.extraConfig ?? {},
        createdAt: existing?.createdAt ?? now,
        updatedAt: now
      };

      return deps.storageService.saveConnectionProfile(profile);
    },
    testConnection: async (profileId) => {
      const startedAt = Date.now();
      const profile = await resolveProfile(deps, profileId);
      await deps.adapter.testConnection(profile);

      return {
        profileId,
        success: true,
        message: 'Connection succeeded.',
        duration: Date.now() - startedAt
      };
    },
    executeSql: async (profileId, sql) => {
      const normalizedSql = sql.trim();

      if (!normalizedSql) {
        throw new AppError('sql_empty', 'SQL cannot be empty.');
      }

      const profile = await resolveProfile(deps, profileId);
      const executedAt = new Date().toISOString();

      try {
        const result = await deps.adapter.execute(profile, normalizedSql);
        const history = await deps.storageService.addSqlHistory({
          id: createId('sql-history'),
          profileId,
          sql: normalizedSql,
          executedAt,
          duration: result.duration,
          success: true
        });

        return {
          ...result,
          profileId,
          executedAt,
          historyId: history.id
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : 'SQL execution failed.';
        await deps.storageService.addSqlHistory({
          id: createId('sql-history'),
          profileId,
          sql: normalizedSql,
          executedAt,
          duration: 0,
          success: false,
          errorMessage: message
        });
        throw error;
      }
    },
    listSqlHistory: (input) => deps.storageService.listSqlHistory(input)
  };
}

async function resolveProfile(
  deps: DatabaseServiceDependencies,
  profileId: string
): Promise<ResolvedConnectionProfile> {
  const profile = await deps.storageService.getConnectionProfile(profileId);

  if (!profile) {
    throw new AppError('database_profile_not_found', 'Database profile was not found.');
  }

  const password = profile.passwordRef ? await deps.securityService.getSecretValue(profile.passwordRef) : undefined;

  return {
    ...profile,
    password: password ?? undefined
  };
}

function validateProfileInput(input: SaveConnectionProfileInput): void {
  if (!input.name.trim()) {
    throw new AppError('profile_name_required', 'Connection name is required.');
  }

  if (!input.host.trim()) {
    throw new AppError('profile_host_required', 'Host is required.');
  }

  if (!Number.isInteger(input.port) || input.port < 1 || input.port > 65535) {
    throw new AppError('profile_port_invalid', 'Port must be between 1 and 65535.');
  }

  if (!input.username.trim()) {
    throw new AppError('profile_username_required', 'Username is required.');
  }
}

function createId(prefix: string): string {
  if (globalThis.crypto?.randomUUID) {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

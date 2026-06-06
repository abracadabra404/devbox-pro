import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import type { DatabaseAdapter } from '../../adapters/database/databaseAdapter';
import { createSecurityService, type SecretCryptoProvider } from '../../security/securityService';
import { createStorageService } from '../../storage/storageService';
import { createDatabaseService } from './databaseService';

const fakeCrypto: SecretCryptoProvider = {
  encrypt: (value) => Buffer.from(`enc:${value}`, 'utf8').toString('base64'),
  decrypt: (value) => Buffer.from(value, 'base64').toString('utf8').replace(/^enc:/, '')
};

async function createService(adapter: DatabaseAdapter) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'devbox-database-'));
  const storageService = createStorageService(path.join(dir, 'store.json'));
  const securityService = createSecurityService(storageService, fakeCrypto);
  const service = createDatabaseService({
    adapter,
    securityService,
    storageService
  });

  return { service, storageService };
}

describe('DatabaseService', () => {
  it('saves a MySQL profile with a password reference and tests the resolved connection', async () => {
    const adapter: DatabaseAdapter = {
      testConnection: vi.fn(async (profile) => {
        expect(profile.password).toBe('secret');
        return true;
      }),
      execute: vi.fn()
    };
    const { service } = await createService(adapter);

    const profile = await service.saveProfile({
      name: 'Local',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'secret',
      database: 'devbox'
    });

    expect(profile.passwordRef).toMatch(/^secret-/);
    expect('password' in profile).toBe(false);

    const result = await service.testConnection(profile.id);
    expect(result.success).toBe(true);
    expect(adapter.testConnection).toHaveBeenCalledTimes(1);
  });

  it('executes SQL and records successful history', async () => {
    const adapter: DatabaseAdapter = {
      testConnection: vi.fn(),
      execute: vi.fn(async () => ({
        columns: [{ name: 'id', dataType: 'number' }],
        rows: [{ id: 1 }],
        duration: 12,
        affectedRows: undefined
      }))
    };
    const { service } = await createService(adapter);
    const profile = await service.saveProfile({
      name: 'Local',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'secret'
    });

    const result = await service.executeSql(profile.id, 'select 1 as id;');

    expect(result.rows).toEqual([{ id: 1 }]);
    expect(result.historyId).toMatch(/^sql-history-/);
    const history = await service.listSqlHistory({ profileId: profile.id });
    expect(history).toHaveLength(1);
    expect(history[0].success).toBe(true);
    expect(history[0].sql).toBe('select 1 as id;');
  });

  it('records failed SQL history before surfacing adapter errors', async () => {
    const adapterError = new Error('syntax error');
    const adapter: DatabaseAdapter = {
      testConnection: vi.fn(),
      execute: vi.fn(async () => {
        throw adapterError;
      })
    };
    const { service } = await createService(adapter);
    const profile = await service.saveProfile({
      name: 'Local',
      host: '127.0.0.1',
      port: 3306,
      username: 'root'
    });

    await expect(service.executeSql(profile.id, 'select from')).rejects.toThrow('syntax error');
    const history = await service.listSqlHistory({ profileId: profile.id });
    expect(history).toHaveLength(1);
    expect(history[0].success).toBe(false);
    expect(history[0].errorMessage).toBe('syntax error');
  });
});

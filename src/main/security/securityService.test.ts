import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { createSecurityService, type SecretCryptoProvider } from './securityService';
import { createStorageService } from '../storage/storageService';

const fakeCrypto: SecretCryptoProvider = {
  encrypt: (value) => Buffer.from(`enc:${value}`, 'utf8').toString('base64'),
  decrypt: (value) => Buffer.from(value, 'base64').toString('utf8').replace(/^enc:/, '')
};

describe('SecurityService', () => {
  it('stores encrypted secrets and resolves values by reference', async () => {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'devbox-security-'));
    const storage = createStorageService(path.join(dir, 'store.json'));
    const service = createSecurityService(storage, fakeCrypto);

    const secret = await service.saveSecret({
      profileId: 'profile-1',
      secretType: 'mysql-password',
      value: 'root-password'
    });

    expect(secret.encryptedValue).toBeDefined();
    expect(secret.encryptedValue).not.toContain('root-password');
    await expect(service.getSecretValue(secret.id)).resolves.toBe('root-password');

    await service.deleteSecret(secret.id);
    await expect(service.getSecretValue(secret.id)).resolves.toBeNull();
  });
});

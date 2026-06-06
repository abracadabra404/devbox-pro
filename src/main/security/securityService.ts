import { createRequire } from 'node:module';
import { AppError } from '@shared/errors/appError';
import type { SensitiveSecret } from '@shared/types/models';
import type { StorageService } from '../storage/storageService';

export interface SaveSecretInput {
  profileId: string;
  secretType: string;
  value: string;
}

export interface SecurityService {
  saveSecret: (input: SaveSecretInput) => Promise<SensitiveSecret>;
  getSecretValue: (secretId: string) => Promise<string | null>;
  deleteSecret: (secretId: string) => Promise<void>;
}

export interface SecretCryptoProvider {
  encrypt: (value: string) => string;
  decrypt: (value: string) => string;
}

export function createSecurityService(
  storageService: StorageService,
  cryptoProvider?: SecretCryptoProvider
): SecurityService {
  let resolvedCryptoProvider = cryptoProvider;
  const getCryptoProvider = (): SecretCryptoProvider => {
    resolvedCryptoProvider ??= createSafeStorageCryptoProvider();
    return resolvedCryptoProvider;
  };

  return {
    saveSecret: async (input) => {
      const now = new Date().toISOString();
      const secret: SensitiveSecret = {
        id: createId('secret'),
        profileId: input.profileId,
        secretType: input.secretType,
        encryptedValue: getCryptoProvider().encrypt(input.value),
        storageType: 'localEncrypted',
        createdAt: now,
        updatedAt: now
      };

      return storageService.saveSecret(secret);
    },
    getSecretValue: async (secretId) => {
      const secret = await storageService.getSecret(secretId);

      if (!secret?.encryptedValue) {
        return null;
      }

      return getCryptoProvider().decrypt(secret.encryptedValue);
    },
    deleteSecret: (secretId) => storageService.deleteSecret(secretId)
  };
}

function createSafeStorageCryptoProvider(): SecretCryptoProvider {
  const nodeRequire = createRequire(import.meta.url);
  const { safeStorage } = nodeRequire('electron') as typeof import('electron');

  if (!safeStorage.isEncryptionAvailable()) {
    throw new AppError(
      'secret_storage_unavailable',
      'Electron safeStorage encryption is not available on this machine.'
    );
  }

  return {
    encrypt: (value) => safeStorage.encryptString(value).toString('base64'),
    decrypt: (value) => safeStorage.decryptString(Buffer.from(value, 'base64'))
  };
}

function createId(prefix: string): string {
  if (globalThis.crypto?.randomUUID) {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

import type { SensitiveSecret } from '@shared/types/models';

export interface SaveSecretInput {
  profileId: string;
  secretType: string;
  value: string;
}

export interface SecurityService {
  saveSecret: (input: SaveSecretInput) => Promise<SensitiveSecret>;
  deleteSecret: (secretId: string) => Promise<void>;
}

export function createSecurityService(): SecurityService {
  return {
    saveSecret: async () => {
      throw new Error('Secret storage is not implemented in phase 1.');
    },
    deleteSecret: async () => undefined
  };
}

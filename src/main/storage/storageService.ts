import fs from 'node:fs/promises';
import path from 'node:path';
import type { ConnectionProfile, SensitiveSecret, SqlHistory } from '@shared/types/models';

interface DevboxDataStore {
  connectionProfiles: ConnectionProfile[];
  secrets: SensitiveSecret[];
  sqlHistory: SqlHistory[];
}

export interface StorageService {
  initialize: () => Promise<void>;
  getConfigPath: () => string;
  listConnectionProfiles: (type?: ConnectionProfile['type']) => Promise<ConnectionProfile[]>;
  getConnectionProfile: (profileId: string) => Promise<ConnectionProfile | null>;
  saveConnectionProfile: (profile: ConnectionProfile) => Promise<ConnectionProfile>;
  saveSecret: (secret: SensitiveSecret) => Promise<SensitiveSecret>;
  getSecret: (secretId: string) => Promise<SensitiveSecret | null>;
  deleteSecret: (secretId: string) => Promise<void>;
  addSqlHistory: (history: SqlHistory) => Promise<SqlHistory>;
  listSqlHistory: (input?: { profileId?: string; limit?: number }) => Promise<SqlHistory[]>;
}

const EMPTY_STORE: DevboxDataStore = {
  connectionProfiles: [],
  secrets: [],
  sqlHistory: []
};

export function createStorageService(configPath: string): StorageService {
  const resolvedConfigPath = resolveConfigPath(configPath);
  let initialized = false;

  async function initialize(): Promise<void> {
    if (initialized) {
      return;
    }

    await fs.mkdir(path.dirname(resolvedConfigPath), { recursive: true });

    try {
      await fs.access(resolvedConfigPath);
    } catch {
      await writeStore(structuredClone(EMPTY_STORE));
    }

    initialized = true;
  }

  async function readStore(): Promise<DevboxDataStore> {
    await initialize();
    const raw = await fs.readFile(resolvedConfigPath, 'utf8');
    const parsed = JSON.parse(raw) as Partial<DevboxDataStore>;

    return {
      connectionProfiles: parsed.connectionProfiles ?? [],
      secrets: parsed.secrets ?? [],
      sqlHistory: parsed.sqlHistory ?? []
    };
  }

  async function writeStore(store: DevboxDataStore): Promise<void> {
    await fs.mkdir(path.dirname(resolvedConfigPath), { recursive: true });
    const tmpPath = `${resolvedConfigPath}.tmp`;
    await fs.writeFile(tmpPath, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
    await fs.rename(tmpPath, resolvedConfigPath);
  }

  return {
    initialize,
    getConfigPath: () => resolvedConfigPath,
    listConnectionProfiles: async (type) => {
      const store = await readStore();
      const profiles = type
        ? store.connectionProfiles.filter((profile) => profile.type === type)
        : store.connectionProfiles;

      return profiles.sort((left, right) => left.name.localeCompare(right.name));
    },
    getConnectionProfile: async (profileId) => {
      const store = await readStore();
      return store.connectionProfiles.find((profile) => profile.id === profileId) ?? null;
    },
    saveConnectionProfile: async (profile) => {
      const store = await readStore();
      const index = store.connectionProfiles.findIndex((item) => item.id === profile.id);

      if (index >= 0) {
        store.connectionProfiles[index] = profile;
      } else {
        store.connectionProfiles.push(profile);
      }

      await writeStore(store);
      return profile;
    },
    saveSecret: async (secret) => {
      const store = await readStore();
      const index = store.secrets.findIndex((item) => item.id === secret.id);

      if (index >= 0) {
        store.secrets[index] = secret;
      } else {
        store.secrets.push(secret);
      }

      await writeStore(store);
      return secret;
    },
    getSecret: async (secretId) => {
      const store = await readStore();
      return store.secrets.find((secret) => secret.id === secretId) ?? null;
    },
    deleteSecret: async (secretId) => {
      const store = await readStore();
      store.secrets = store.secrets.filter((secret) => secret.id !== secretId);
      await writeStore(store);
    },
    addSqlHistory: async (history) => {
      const store = await readStore();
      store.sqlHistory.push(history);
      await writeStore(store);
      return history;
    },
    listSqlHistory: async (input) => {
      const store = await readStore();
      const limit = input?.limit ?? 50;
      const rows = input?.profileId
        ? store.sqlHistory.filter((history) => history.profileId === input.profileId)
        : store.sqlHistory;

      return rows
        .sort((left, right) => Date.parse(right.executedAt) - Date.parse(left.executedAt))
        .slice(0, limit);
    }
  };
}

function resolveConfigPath(configPath: string): string {
  if (path.extname(configPath)) {
    return configPath;
  }

  return path.join(configPath, 'devbox-data.json');
}

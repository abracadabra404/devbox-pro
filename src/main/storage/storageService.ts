export interface StorageService {
  initialize: () => Promise<void>;
  getConfigPath: () => string;
}

export function createStorageService(configPath: string): StorageService {
  return {
    initialize: async () => undefined,
    getConfigPath: () => configPath
  };
}

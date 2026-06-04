import type { ConnectionProfile } from '@shared/types/models';

export type RedisValueType = 'string' | 'hash' | 'list' | 'set' | 'zset' | 'unknown';

export interface RedisKeySummary {
  key: string;
  type: RedisValueType;
  ttl: number;
}

export interface RedisAdapter {
  testConnection: (profile: ConnectionProfile) => Promise<boolean>;
  searchKeys: (profile: ConnectionProfile, pattern: string) => Promise<RedisKeySummary[]>;
}

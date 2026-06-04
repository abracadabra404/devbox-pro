import type { ConnectionProfile } from '@shared/types/models';

export interface KafkaTopic {
  name: string;
  partitions: number;
}

export interface KafkaAdapter {
  listTopics: (profile: ConnectionProfile) => Promise<KafkaTopic[]>;
  consume: (profile: ConnectionProfile, topic: string) => Promise<Record<string, unknown>[]>;
}

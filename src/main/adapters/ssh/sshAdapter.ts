import type { ConnectionProfile } from '@shared/types/models';

export interface SshSession {
  id: string;
  profileId: string;
}

export interface SshAdapter {
  connect: (profile: ConnectionProfile) => Promise<SshSession>;
  disconnect: (sessionId: string) => Promise<void>;
}

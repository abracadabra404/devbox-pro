import type { ConnectionProfile } from '@shared/types/models';

export interface RemoteFileEntry {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size: number;
  modifiedAt?: string;
}

export interface SftpAdapter {
  listDirectory: (profile: ConnectionProfile, remotePath: string) => Promise<RemoteFileEntry[]>;
}

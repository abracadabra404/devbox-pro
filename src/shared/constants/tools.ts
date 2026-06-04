import type { TabSession } from '../types/models';

export type ToolId = TabSession['type'];

export interface ToolDefinition {
  id: ToolId;
  label: string;
  shortLabel: string;
  description: string;
}

export const TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    id: 'mysql',
    label: 'Database',
    shortLabel: 'DB',
    description: 'MySQL first, with PostgreSQL and SQLite planned.'
  },
  {
    id: 'redis',
    label: 'Redis',
    shortLabel: 'RD',
    description: 'Browse keys, inspect values, manage TTL.'
  },
  {
    id: 'ssh',
    label: 'SSH',
    shortLabel: 'SH',
    description: 'Terminal sessions and command history.'
  },
  {
    id: 'sftp',
    label: 'SFTP',
    shortLabel: 'SF',
    description: 'Remote files, upload, download, and preview.'
  },
  {
    id: 'kafka',
    label: 'Kafka',
    shortLabel: 'KF',
    description: 'Topics, consumers, offsets, and test messages.'
  },
  {
    id: 'http',
    label: 'HTTP',
    shortLabel: 'HT',
    description: 'API requests, headers, body, and history.'
  },
  {
    id: 'tools',
    label: 'JSON Tools',
    shortLabel: 'JS',
    description: 'JSON, Base64, URL codec, timestamp, UUID, JWT.'
  },
  {
    id: 'logs',
    label: 'Logs',
    shortLabel: 'LG',
    description: 'Local log search, regex, and highlighting.'
  },
  {
    id: 'settings',
    label: 'Settings',
    shortLabel: 'ST',
    description: 'Theme, storage, security, and platform details.'
  }
];

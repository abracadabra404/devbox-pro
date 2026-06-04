import { TOOL_DEFINITIONS, type ToolDefinition } from '@shared/constants/tools';

export interface ConnectionService {
  listSupportedTools: () => ToolDefinition[];
}

export function createConnectionService(): ConnectionService {
  return {
    listSupportedTools: () => TOOL_DEFINITIONS
  };
}

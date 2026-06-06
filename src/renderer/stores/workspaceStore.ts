import { create } from 'zustand';
import type { ToolId } from '@shared/constants/tools';
import type { TabSession } from '@shared/types/models';

export type WorkspaceTab = TabSession;

interface WorkspaceState {
  activeTool: ToolId;
  tabs: WorkspaceTab[];
  activeTabId: string;
  selectTool: (tool: ToolId) => void;
  openTab: (tool: ToolId, title?: string) => void;
  closeTab: (tabId: string) => void;
  activateTab: (tabId: string) => void;
}

const initialTab = createTab('mysql', 'Database Workspace');

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  activeTool: 'mysql',
  tabs: [initialTab],
  activeTabId: initialTab.id,
  selectTool: (tool) => {
    const existingTab = get().tabs.find((tab) => tab.type === tool);

    if (existingTab) {
      set({
        activeTool: tool,
        activeTabId: existingTab.id
      });
      return;
    }

    const nextTab = createTab(tool);
    set((state) => ({
      activeTool: tool,
      activeTabId: nextTab.id,
      tabs: [...state.tabs, nextTab]
    }));
  },
  openTab: (tool, title) => {
    const nextTab = createTab(tool, title);
    set((state) => ({
      activeTool: tool,
      activeTabId: nextTab.id,
      tabs: [...state.tabs, nextTab]
    }));
  },
  closeTab: (tabId) => {
    const state = get();

    if (state.tabs.length === 1) {
      return;
    }

    const closingIndex = state.tabs.findIndex((tab) => tab.id === tabId);
    const nextTabs = state.tabs.filter((tab) => tab.id !== tabId);
    const activeTabStillOpen = nextTabs.some((tab) => tab.id === state.activeTabId);
    const nextActiveTab = activeTabStillOpen
      ? nextTabs.find((tab) => tab.id === state.activeTabId)
      : chooseAdjacentTab(nextTabs, closingIndex);

    if (!nextActiveTab) {
      return;
    }

    set({
      tabs: nextTabs,
      activeTabId: nextActiveTab.id,
      activeTool: nextActiveTab.type
    });
  },
  activateTab: (tabId) => {
    const tab = get().tabs.find((item) => item.id === tabId);

    if (!tab) {
      return;
    }

    set({
      activeTabId: tab.id,
      activeTool: tab.type
    });
  }
}));

function createTab(tool: ToolId, title?: string): WorkspaceTab {
  const now = new Date().toISOString();
  const label = title ?? defaultTabTitle(tool);

  return {
    id: createId(),
    type: tool,
    title: label,
    state: {},
    createdAt: now,
    updatedAt: now
  };
}

function createId(): string {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `tab-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function chooseAdjacentTab(tabs: WorkspaceTab[], closingIndex: number): WorkspaceTab | undefined {
  if (tabs.length === 0) {
    return undefined;
  }

  return tabs[Math.min(Math.max(closingIndex, 0), tabs.length - 1)];
}

function defaultTabTitle(tool: ToolId): string {
  switch (tool) {
    case 'mysql':
      return 'Database Workspace';
    case 'redis':
      return 'Redis Workspace';
    case 'ssh':
      return 'SSH Terminal';
    case 'sftp':
      return 'SFTP Browser';
    case 'kafka':
      return 'Kafka Topics';
    case 'http':
      return 'HTTP Request';
    case 'tools':
      return 'JSON Tools';
    case 'logs':
      return 'Log Viewer';
    case 'settings':
      return 'Settings';
    default:
      return 'Workspace';
  }
}

import {
  Braces,
  Database,
  FileSearch,
  FolderGit2,
  RadioTower,
  Send,
  Server,
  Settings,
  Terminal
} from 'lucide-react';
import { TOOL_DEFINITIONS, type ToolId } from '@shared/constants/tools';
import { useWorkspaceStore } from '../stores/workspaceStore';

const iconMap: Record<ToolId, typeof Database> = {
  mysql: Database,
  postgresql: Database,
  sqlite: Database,
  redis: Server,
  ssh: Terminal,
  sftp: FolderGit2,
  kafka: RadioTower,
  http: Send,
  tools: Braces,
  logs: FileSearch,
  settings: Settings
};

export function NavigationRail(): JSX.Element {
  const activeTool = useWorkspaceStore((state) => state.activeTool);
  const selectTool = useWorkspaceStore((state) => state.selectTool);

  return (
    <aside className="navigation-rail" aria-label="Tool navigation">
      <div className="brand-mark" title="DevBox Pro">
        DB
      </div>
      <nav className="nav-items">
        {TOOL_DEFINITIONS.map((tool) => {
          const Icon = iconMap[tool.id];
          const active = activeTool === tool.id;

          return (
            <button
              className={active ? 'nav-button nav-button-active' : 'nav-button'}
              key={tool.id}
              onClick={() => selectTool(tool.id)}
              title={tool.label}
              type="button"
            >
              <Icon aria-hidden="true" size={19} strokeWidth={1.8} />
              <span>{tool.shortLabel}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

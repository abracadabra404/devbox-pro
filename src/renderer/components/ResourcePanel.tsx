import { Plus, Search } from 'lucide-react';
import { TOOL_DEFINITIONS } from '@shared/constants/tools';
import { useWorkspaceStore } from '../stores/workspaceStore';

export function ResourcePanel(): JSX.Element {
  const activeTool = useWorkspaceStore((state) => state.activeTool);
  const openTab = useWorkspaceStore((state) => state.openTab);
  const tool = TOOL_DEFINITIONS.find((item) => item.id === activeTool) ?? TOOL_DEFINITIONS[0];

  return (
    <aside className="resource-panel">
      <header className="panel-header">
        <div>
          <span className="panel-eyebrow">Module</span>
          <h1>{tool.label}</h1>
        </div>
        <button className="icon-button" onClick={() => openTab(activeTool)} title={`Open ${tool.label} tab`} type="button">
          <Plus aria-hidden="true" size={17} />
        </button>
      </header>

      <label className="search-box">
        <Search aria-hidden="true" size={15} />
        <input placeholder={`Search ${tool.label.toLowerCase()}`} />
      </label>

      <section className="resource-section">
        <h2>Connections</h2>
        <div className="empty-resource">
          <strong>No profiles yet</strong>
          <span>{tool.description}</span>
        </div>
      </section>

      <section className="resource-section">
        <h2>Phase Status</h2>
        <div className="resource-row">
          <span>Foundation</span>
          <span className="status-pill status-pill-ok">Ready</span>
        </div>
        <div className="resource-row">
          <span>Protocol adapter</span>
          <span className="status-pill">Planned</span>
        </div>
      </section>
    </aside>
  );
}

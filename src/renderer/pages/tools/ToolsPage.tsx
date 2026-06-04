import type { ToolPageProps } from '../types';

export function ToolsPage({ tab }: ToolPageProps): JSX.Element {
  return (
    <div className="page-grid page-grid-two">
      <section className="workspace-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">Input</span>
            <h2>{tab.title}</h2>
          </div>
          <button className="secondary-button" type="button">
            Format
          </button>
        </div>
        <textarea className="code-input" defaultValue={'{"name":"DevBox Pro","phase":1}'} spellCheck={false} />
      </section>
      <section className="workspace-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">Output</span>
            <h2>Formatted JSON</h2>
          </div>
          <span className="status-pill">Phase 6</span>
        </div>
        <pre className="code-preview">{'{\n  "name": "DevBox Pro",\n  "phase": 1\n}'}</pre>
      </section>
    </div>
  );
}

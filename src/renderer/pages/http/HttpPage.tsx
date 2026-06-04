import type { ToolPageProps } from '../types';

export function HttpPage({ tab }: ToolPageProps): JSX.Element {
  return (
    <div className="page-grid">
      <section className="workspace-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">Request</span>
            <h2>{tab.title}</h2>
          </div>
          <button className="primary-button" type="button">
            Send
          </button>
        </div>
        <div className="request-line">
          <select defaultValue="GET">
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <input defaultValue="https://api.example.com/health" />
        </div>
        <textarea className="code-input compact" defaultValue={'{\n  "example": true\n}'} spellCheck={false} />
      </section>

      <section className="workspace-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">Response</span>
            <h2>Body</h2>
          </div>
          <span className="status-pill">Phase 6</span>
        </div>
        <pre className="code-preview">{'{\n  "status": "pending"\n}'}</pre>
      </section>
    </div>
  );
}

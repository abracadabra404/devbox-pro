import type { ToolPageProps } from '../types';

export function RedisPage({ tab }: ToolPageProps): JSX.Element {
  return (
    <div className="page-grid page-grid-two">
      <section className="workspace-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">Redis Keys</span>
            <h2>{tab.title}</h2>
          </div>
          <button className="secondary-button" type="button">
            Refresh
          </button>
        </div>
        <div className="list-preview">
          <span>user:1001</span>
          <span>session:active</span>
          <span>queue:email</span>
        </div>
      </section>
      <section className="workspace-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">Value Inspector</span>
            <h2>String / Hash / List</h2>
          </div>
          <span className="status-pill">Phase 3</span>
        </div>
        <pre className="code-preview">{'{\n  "status": "adapter pending"\n}'}</pre>
      </section>
    </div>
  );
}

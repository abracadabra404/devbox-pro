import type { ToolPageProps } from '../types';

export function KafkaPage({ tab }: ToolPageProps): JSX.Element {
  return (
    <div className="page-grid page-grid-two">
      <section className="workspace-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">Topics</span>
            <h2>{tab.title}</h2>
          </div>
          <button className="secondary-button" type="button">
            Load Topics
          </button>
        </div>
        <div className="list-preview">
          <span>orders.created</span>
          <span>payments.updated</span>
          <span>audit.events</span>
        </div>
      </section>
      <section className="workspace-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">Messages</span>
            <h2>Consumer Preview</h2>
          </div>
          <span className="status-pill">Phase 5</span>
        </div>
        <pre className="code-preview">{'{\n  "offset": 0,\n  "value": "Kafka adapter pending"\n}'}</pre>
      </section>
    </div>
  );
}

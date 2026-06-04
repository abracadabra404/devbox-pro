import type { ToolPageProps } from '../types';

export function LogsPage({ tab }: ToolPageProps): JSX.Element {
  return (
    <section className="workspace-panel terminal-panel">
      <div className="section-header">
        <div>
          <span className="panel-eyebrow">Local Logs</span>
          <h2>{tab.title}</h2>
        </div>
        <button className="secondary-button" type="button">
          Open File
        </button>
      </div>
      <div className="terminal-preview">
        <span>[INFO] Local log viewer foundation is ready.</span>
        <span>[INFO] Regex search and highlighting arrive after protocol MVPs.</span>
      </div>
    </section>
  );
}

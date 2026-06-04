import type { ToolPageProps } from '../types';

export function SshPage({ tab }: ToolPageProps): JSX.Element {
  return (
    <section className="workspace-panel terminal-panel">
      <div className="section-header">
        <div>
          <span className="panel-eyebrow">SSH Terminal</span>
          <h2>{tab.title}</h2>
        </div>
        <span className="status-pill">Phase 4</span>
      </div>
      <div className="terminal-preview">
        <span>$ ssh user@host</span>
        <span>Connection management and xterm.js integration are planned.</span>
        <span className="cursor-line">$</span>
      </div>
    </section>
  );
}

import type { ToolPageProps } from '../types';

export function SftpPage({ tab }: ToolPageProps): JSX.Element {
  return (
    <div className="page-grid page-grid-two">
      <section className="workspace-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">Local Files</span>
            <h2>{tab.title}</h2>
          </div>
        </div>
        <div className="list-preview">
          <span>~/Downloads</span>
          <span>~/Projects</span>
          <span>~/Desktop</span>
        </div>
      </section>
      <section className="workspace-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">Remote Files</span>
            <h2>SFTP Browser</h2>
          </div>
          <span className="status-pill">Phase 4</span>
        </div>
        <div className="empty-state">Remote directory browsing will be backed by the SFTP adapter.</div>
      </section>
    </div>
  );
}

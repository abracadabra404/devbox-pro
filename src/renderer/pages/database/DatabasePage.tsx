import type { ToolPageProps } from '../types';

const sampleRows = [
  { id: 1, schema: 'devbox', table: 'connection_profiles', rows: 0 },
  { id: 2, schema: 'devbox', table: 'sql_history', rows: 0 },
  { id: 3, schema: 'devbox', table: 'tab_sessions', rows: 1 }
];

export function DatabasePage({ tab }: ToolPageProps): JSX.Element {
  return (
    <div className="page-grid">
      <section className="workspace-panel sql-editor-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">SQL Editor</span>
            <h2>{tab.title}</h2>
          </div>
          <button className="primary-button" type="button">
            Execute
          </button>
        </div>
        <textarea
          className="code-input"
          defaultValue={'-- MySQL MVP arrives in phase 2\nselect * from connection_profiles limit 50;'}
          spellCheck={false}
        />
      </section>

      <section className="workspace-panel result-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">Result Preview</span>
            <h2>Tables</h2>
          </div>
          <span className="status-pill">Mock</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Schema</th>
              <th>Table</th>
              <th>Rows</th>
            </tr>
          </thead>
          <tbody>
            {sampleRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.schema}</td>
                <td>{row.table}</td>
                <td>{row.rows}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

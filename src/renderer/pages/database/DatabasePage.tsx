import { useEffect, useMemo, useState } from 'react';
import type { ConnectionProfile, SqlExecutionResult, SqlHistory } from '@shared/types/models';
import { getDevboxApi, unwrapIpcResult } from '../../utils/devboxApi';
import type { ToolPageProps } from '../types';

interface ProfileFormState {
  id?: string;
  name: string;
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
}

const DEFAULT_FORM: ProfileFormState = {
  name: 'Local MySQL',
  host: '127.0.0.1',
  port: '3306',
  username: 'root',
  password: '',
  database: ''
};

export function DatabasePage({ tab }: ToolPageProps): JSX.Element {
  const api = getDevboxApi();
  const [profiles, setProfiles] = useState<ConnectionProfile[]>([]);
  const [history, setHistory] = useState<SqlHistory[]>([]);
  const [form, setForm] = useState<ProfileFormState>(DEFAULT_FORM);
  const [sql, setSql] = useState('select 1 as health_check;');
  const [result, setResult] = useState<SqlExecutionResult | null>(null);
  const [notice, setNotice] = useState('Ready');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const selectedProfile = useMemo(
    () => profiles.find((profile) => profile.id === form.id) ?? null,
    [form.id, profiles]
  );

  useEffect(() => {
    void loadProfiles();
  }, []);

  async function loadProfiles(nextSelectedId?: string): Promise<void> {
    if (!api) {
      setNotice('Open in Electron to use database IPC.');
      return;
    }

    const loadedProfiles = await unwrapIpcResult(api.database.listProfiles());
    setProfiles(loadedProfiles);

    const nextProfile =
      loadedProfiles.find((profile) => profile.id === nextSelectedId) ??
      loadedProfiles.find((profile) => profile.id === form.id) ??
      loadedProfiles[0];

    if (nextProfile) {
      setForm(profileToForm(nextProfile));
      await loadHistory(nextProfile.id);
    } else {
      setHistory([]);
    }
  }

  async function loadHistory(profileId?: string): Promise<void> {
    if (!api) {
      return;
    }

    const rows = await unwrapIpcResult(api.database.listSqlHistory({ profileId, limit: 30 }));
    setHistory(rows);
  }

  async function runAction(action: () => Promise<void>): Promise<void> {
    setBusy(true);
    setError(null);

    try {
      await action();
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : 'Database action failed.';
      setError(message);
      setNotice('Error');
    } finally {
      setBusy(false);
    }
  }

  function updateForm<K extends keyof ProfileFormState>(key: K, value: ProfileFormState[K]): void {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  }

  function selectProfile(profile: ConnectionProfile): void {
    setForm(profileToForm(profile));
    setResult(null);
    setError(null);
    setNotice(`Selected ${profile.name}`);
    void loadHistory(profile.id);
  }

  function newProfile(): void {
    setForm(DEFAULT_FORM);
    setResult(null);
    setError(null);
    setNotice('New MySQL profile');
    setHistory([]);
  }

  async function saveProfile(): Promise<void> {
    if (!api) {
      setError('Database IPC is unavailable outside Electron.');
      return;
    }

    await runAction(async () => {
      const savedProfile = await unwrapIpcResult(
        api.database.saveProfile({
          id: form.id,
          name: form.name,
          host: form.host,
          port: Number(form.port),
          username: form.username,
          password: form.password || undefined,
          database: form.database || undefined
        })
      );

      setNotice(savedProfile.passwordRef ? `Saved ${savedProfile.name} with password reference.` : `Saved ${savedProfile.name}.`);
      await loadProfiles(savedProfile.id);
    });
  }

  async function testConnection(): Promise<void> {
    if (!api || !form.id) {
      setError('Save the profile before testing the connection.');
      return;
    }

    await runAction(async () => {
      const testResult = await unwrapIpcResult(api.database.testConnection(form.id as string));
      setNotice(`${testResult.message} ${testResult.duration}ms`);
    });
  }

  async function executeSql(): Promise<void> {
    if (!api || !form.id) {
      setError('Select a saved profile before executing SQL.');
      return;
    }

    await runAction(async () => {
      const execution = await unwrapIpcResult(api.database.executeSql({ profileId: form.id as string, sql }));
      setResult(execution);
      setNotice(`Executed in ${execution.duration}ms`);
      await loadHistory(form.id);
    });
  }

  return (
    <div className="database-mvp-shell">
      <section className="workspace-panel database-connections-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">Connections</span>
            <h2>MySQL Profiles</h2>
          </div>
          <button className="secondary-button" onClick={() => newProfile()} type="button">
            New
          </button>
        </div>

        <div className="database-profile-list">
          {profiles.length === 0 ? (
            <div className="empty-state">No saved MySQL profiles.</div>
          ) : (
            profiles.map((profile) => (
              <button
                className={profile.id === form.id ? 'database-profile-row database-profile-row-active' : 'database-profile-row'}
                key={profile.id}
                onClick={() => selectProfile(profile)}
                type="button"
              >
                <strong>{profile.name}</strong>
                <span>
                  {profile.username}@{profile.host}:{profile.port}
                </span>
              </button>
            ))
          )}
        </div>
      </section>

      <section className="workspace-panel database-profile-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">Profile</span>
            <h2>{selectedProfile?.name ?? 'Create MySQL Connection'}</h2>
          </div>
          <div className="button-row">
            <button className="secondary-button" disabled={busy} onClick={() => void testConnection()} type="button">
              Test
            </button>
            <button className="primary-button" disabled={busy} onClick={() => void saveProfile()} type="button">
              Save
            </button>
          </div>
        </div>

        <div className="database-form-grid">
          <label>
            <span>Name</span>
            <input value={form.name} onChange={(event) => updateForm('name', event.target.value)} />
          </label>
          <label>
            <span>Host</span>
            <input value={form.host} onChange={(event) => updateForm('host', event.target.value)} />
          </label>
          <label>
            <span>Port</span>
            <input inputMode="numeric" value={form.port} onChange={(event) => updateForm('port', event.target.value)} />
          </label>
          <label>
            <span>User</span>
            <input value={form.username} onChange={(event) => updateForm('username', event.target.value)} />
          </label>
          <label>
            <span>Password</span>
            <input
              placeholder={selectedProfile?.passwordRef ? 'Stored password reference' : 'Optional'}
              type="password"
              value={form.password}
              onChange={(event) => updateForm('password', event.target.value)}
            />
          </label>
          <label>
            <span>Database</span>
            <input value={form.database} onChange={(event) => updateForm('database', event.target.value)} />
          </label>
        </div>

        <div className={error ? 'database-status database-status-error' : 'database-status'}>
          <span>{error ?? notice}</span>
          {selectedProfile?.passwordRef ? <strong>passwordRef</strong> : null}
        </div>
      </section>

      <section className="workspace-panel database-editor-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">SQL Editor</span>
            <h2>{tab.title}</h2>
          </div>
          <button className="primary-button" disabled={busy} onClick={() => void executeSql()} type="button">
            Execute
          </button>
        </div>
        <textarea
          className="code-input database-sql-input"
          spellCheck={false}
          value={sql}
          onChange={(event) => setSql(event.target.value)}
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
              event.preventDefault();
              void executeSql();
            }
          }}
        />
      </section>

      <section className="workspace-panel database-result-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">Result</span>
            <h2>{result ? `${result.rows.length} rows` : 'Query Output'}</h2>
          </div>
          {result?.affectedRows !== undefined ? <span className="status-pill">{result.affectedRows} affected</span> : null}
        </div>
        {renderResult(result)}
      </section>

      <section className="workspace-panel database-history-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">History</span>
            <h2>SQL History</h2>
          </div>
        </div>
        <div className="database-history-list">
          {history.length === 0 ? (
            <div className="empty-state">No SQL history yet.</div>
          ) : (
            history.map((item) => (
              <button
                className={item.success ? 'database-history-row' : 'database-history-row database-history-row-error'}
                key={item.id}
                onClick={() => setSql(item.sql)}
                type="button"
              >
                <span>{formatDate(item.executedAt)}</span>
                <strong>{item.sql}</strong>
                <em>{item.success ? `${item.duration}ms` : item.errorMessage}</em>
              </button>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function profileToForm(profile: ConnectionProfile): ProfileFormState {
  return {
    id: profile.id,
    name: profile.name,
    host: profile.host ?? '',
    port: String(profile.port ?? 3306),
    username: profile.username ?? '',
    password: '',
    database: profile.database ?? ''
  };
}

function renderResult(result: SqlExecutionResult | null): JSX.Element {
  if (!result) {
    return <div className="empty-state">Execute SQL to see results.</div>;
  }

  const columnNames = result.columns.length > 0 ? result.columns.map((column) => column.name) : Object.keys(result.rows[0] ?? {});

  if (columnNames.length === 0) {
    return <div className="empty-state">Query completed without row output.</div>;
  }

  return (
    <div className="database-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columnNames.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result.rows.map((row, index) => (
            <tr key={index}>
              {columnNames.map((column) => (
                <td key={column}>{formatCell(row[column])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatCell(value: unknown): string {
  if (value === null || value === undefined) {
    return 'NULL';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(value));
}

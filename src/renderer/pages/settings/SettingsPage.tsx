import { useEffect, useState } from 'react';
import type { AppPaths, PlatformInfo } from '@shared/types/platform';
import { getDevboxApi } from '../../utils/devboxApi';
import type { ToolPageProps } from '../types';

export function SettingsPage({ tab }: ToolPageProps): JSX.Element {
  const [platform, setPlatform] = useState<PlatformInfo | null>(null);
  const [paths, setPaths] = useState<AppPaths | null>(null);

  useEffect(() => {
    const api = getDevboxApi();

    if (!api) {
      return;
    }

    void api.app.getPlatformInfo().then((result) => {
      if (result.ok) {
        setPlatform(result.data);
      }
    });

    void api.app.getPaths().then((result) => {
      if (result.ok) {
        setPaths(result.data);
      }
    });
  }, []);

  return (
    <div className="page-grid page-grid-two">
      <section className="workspace-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">Preferences</span>
            <h2>{tab.title}</h2>
          </div>
        </div>
        <div className="settings-list">
          <div>
            <span>Theme</span>
            <strong>Dark</strong>
          </div>
          <div>
            <span>Auto update</span>
            <strong>Disabled in MVP</strong>
          </div>
          <div>
            <span>Telemetry</span>
            <strong>Off</strong>
          </div>
        </div>
      </section>

      <section className="workspace-panel">
        <div className="section-header">
          <div>
            <span className="panel-eyebrow">Platform</span>
            <h2>Runtime Details</h2>
          </div>
          <span className="status-pill status-pill-ok">IPC</span>
        </div>
        <div className="settings-list">
          <div>
            <span>OS</span>
            <strong>{platform ? `${platform.platform} ${platform.arch}` : 'Loading'}</strong>
          </div>
          <div>
            <span>User data</span>
            <strong>{paths?.userData ?? 'Loading'}</strong>
          </div>
          <div>
            <span>Logs</span>
            <strong>{paths?.logs ?? 'Loading'}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

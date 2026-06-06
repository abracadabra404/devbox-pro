import { useEffect, useState } from 'react';
import type { PlatformInfo } from '@shared/types/platform';
import { getDevboxApi } from '../utils/devboxApi';

export function StatusBar(): JSX.Element {
  const [platform, setPlatform] = useState<PlatformInfo | null>(null);

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
  }, []);

  return (
    <footer className="status-bar">
      <span>DevBox Pro 0.1.0</span>
      <span>IPC ready</span>
      <span>{platform ? `${platform.platform} ${platform.arch}` : 'Detecting platform'}</span>
    </footer>
  );
}

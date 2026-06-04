import { X } from 'lucide-react';
import { useWorkspaceStore } from '../stores/workspaceStore';
import { DatabasePage } from '../pages/database/DatabasePage';
import { HttpPage } from '../pages/http/HttpPage';
import { KafkaPage } from '../pages/kafka/KafkaPage';
import { LogsPage } from '../pages/logs/LogsPage';
import { RedisPage } from '../pages/redis/RedisPage';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { SftpPage } from '../pages/sftp/SftpPage';
import { SshPage } from '../pages/ssh/SshPage';
import { ToolsPage } from '../pages/tools/ToolsPage';
import type { ToolPageProps } from '../pages/types';
import type { WorkspaceTab } from '../stores/workspaceStore';

export function TabWorkspace(): JSX.Element {
  const tabs = useWorkspaceStore((state) => state.tabs);
  const activeTabId = useWorkspaceStore((state) => state.activeTabId);
  const activateTab = useWorkspaceStore((state) => state.activateTab);
  const closeTab = useWorkspaceStore((state) => state.closeTab);
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

  return (
    <section className="tab-workspace">
      <div className="tab-strip" role="tablist">
        {tabs.map((tab) => {
          const active = tab.id === activeTab.id;

          return (
            <button
              className={active ? 'tab-item tab-item-active' : 'tab-item'}
              key={tab.id}
              onClick={() => activateTab(tab.id)}
              role="tab"
              type="button"
            >
              <span>{tab.title}</span>
              <X
                aria-label={`Close ${tab.title}`}
                className="tab-close"
                onClick={(event) => {
                  event.stopPropagation();
                  closeTab(tab.id);
                }}
                size={14}
              />
            </button>
          );
        })}
      </div>

      <div className="workspace-content">{renderPage(activeTab)}</div>
    </section>
  );
}

function renderPage(tab: WorkspaceTab): JSX.Element {
  const props: ToolPageProps = { tab };

  switch (tab.type) {
    case 'mysql':
    case 'postgresql':
    case 'sqlite':
      return <DatabasePage {...props} />;
    case 'redis':
      return <RedisPage {...props} />;
    case 'ssh':
      return <SshPage {...props} />;
    case 'sftp':
      return <SftpPage {...props} />;
    case 'kafka':
      return <KafkaPage {...props} />;
    case 'http':
      return <HttpPage {...props} />;
    case 'tools':
      return <ToolsPage {...props} />;
    case 'logs':
      return <LogsPage {...props} />;
    case 'settings':
      return <SettingsPage {...props} />;
    default:
      return <DatabasePage {...props} />;
  }
}

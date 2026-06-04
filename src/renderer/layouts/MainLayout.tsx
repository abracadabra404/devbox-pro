import { NavigationRail } from '../components/NavigationRail';
import { ResourcePanel } from '../components/ResourcePanel';
import { StatusBar } from '../components/StatusBar';
import { TabWorkspace } from '../components/TabWorkspace';

export function MainLayout(): JSX.Element {
  return (
    <div className="app-shell">
      <NavigationRail />
      <ResourcePanel />
      <main className="workspace-shell">
        <TabWorkspace />
        <StatusBar />
      </main>
    </div>
  );
}

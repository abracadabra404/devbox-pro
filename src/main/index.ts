import { app, BrowserWindow, shell } from 'electron';
import path from 'node:path';
import { registerIpcHandlers } from './handlers';
import { createMySqlDatabaseAdapter } from './adapters/database/databaseAdapter';
import { createPlatformService } from './platform/platformService';
import { createConnectionService } from './services/connection/connectionService';
import { createDatabaseService } from './services/database/databaseService';
import { createSettingsService } from './services/settings/settingsService';
import { createSecurityService } from './security/securityService';
import { createStorageService } from './storage/storageService';

let mainWindow: BrowserWindow | null = null;

function createMainWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1180,
    minHeight: 720,
    title: 'DevBox Pro',
    backgroundColor: '#171717',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url);
    return { action: 'deny' };
  });

  const rendererUrl = process.env.ELECTRON_RENDERER_URL;

  if (rendererUrl) {
    void mainWindow.loadURL(rendererUrl);
  } else {
    void mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

function bootstrap(): void {
  const platformService = createPlatformService(app);
  const storageService = createStorageService(app.getPath('userData'));
  const securityService = createSecurityService(storageService);
  const connectionService = createConnectionService();
  const databaseService = createDatabaseService({
    adapter: createMySqlDatabaseAdapter(),
    securityService,
    storageService
  });
  const settingsService = createSettingsService();

  registerIpcHandlers({
    platformService,
    connectionService,
    databaseService,
    settingsService
  });
}

void app.whenReady().then(() => {
  bootstrap();
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

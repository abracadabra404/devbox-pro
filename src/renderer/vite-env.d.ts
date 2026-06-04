/// <reference types="vite/client" />

import type { DevboxApi } from '@shared/ipc/preloadApi';

declare global {
  interface Window {
    devbox: DevboxApi;
  }
}

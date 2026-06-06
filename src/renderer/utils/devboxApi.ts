import type { IpcResult } from '@shared/ipc/contracts';
import type { DevboxApi } from '@shared/ipc/preloadApi';

export function getDevboxApi(): DevboxApi | null {
  return window.devbox ?? null;
}

export async function unwrapIpcResult<T>(request: Promise<IpcResult<T>>): Promise<T> {
  const result = await request;

  if (result.ok) {
    return result.data;
  }

  throw new Error(result.error.message);
}

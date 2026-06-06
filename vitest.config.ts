import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

const root = resolve(__dirname);

export default defineConfig({
  resolve: {
    alias: {
      '@main': resolve(root, 'src/main'),
      '@renderer': resolve(root, 'src/renderer'),
      '@shared': resolve(root, 'src/shared')
    }
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts']
  }
});

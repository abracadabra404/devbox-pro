# Changelog

## Unreleased

- Implement Database MVP with MySQL connection profiles, password references, connection testing, SQL execution, result table, and SQL history.
- Add JSON-backed MVP storage, Electron `safeStorage` secret encryption, and typed database IPC/preload APIs.
- Add Vitest unit tests for security service, database service, and tab-close behavior.
- Improve renderer fallback when `window.devbox` is unavailable and activate adjacent tabs after closing the current tab.
- Update handoff, verification, development, feature, architecture, roadmap, and README documentation.

## 0.1.0

- Initialize DevBox Pro desktop foundation.
- Add Electron, React, TypeScript, Vite, typed IPC, base layout, and core data models.
- Add service, adapter, storage, security, and platform skeletons.
- Add bilingual documentation structure and progress handoff file.
- Add Windows and macOS GitHub Actions verification for the Phase 1 MVP.
- Add tagged GitHub Release workflow for unsigned Windows and macOS installer packages.

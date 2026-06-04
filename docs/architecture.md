# Architecture

DevBox Pro uses Electron with strict process separation.

## Layers

- UI layer: React components, layout, pages, and user interaction.
- Renderer store layer: Zustand stores for active tool, tabs, and transient UI state.
- Preload layer: typed bridge exposed through `window.devbox`.
- IPC layer: shared channel constants and typed request/response contracts.
- Main process layer: window lifecycle, system capabilities, service orchestration.
- Service layer: business workflows such as connection management and SQL execution.
- Adapter layer: protocol-specific libraries such as MySQL, Redis, SSH, SFTP, Kafka, and HTTP.
- Storage layer: local configuration persistence, planned SQLite backing store.
- Security layer: secret references and future Keychain/Credential Manager integration.
- Platform layer: OS detection and cross-platform application paths.

## Security Boundary

Renderer code does not receive Node.js access. `nodeIntegration` is disabled, `contextIsolation` is enabled, and renderer code can only call APIs exposed by preload.

All IPC channels are defined in shared constants. New handlers must use typed contracts and return `IpcResult<T>`.

## Local Data

Configuration should live under Electron `app.getPath('userData')`. Sensitive values must not be stored directly in connection profiles.

## Expansion Plan

Protocol libraries are isolated behind adapters so the UI and service contracts can remain stable while implementations evolve.

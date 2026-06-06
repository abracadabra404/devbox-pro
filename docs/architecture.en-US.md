# Architecture

DevBox Pro uses Electron with strict process separation.

## Layers

- UI layer: React components, layout, pages, and user interaction.
- Renderer store layer: Zustand stores for active tool, tabs, and transient UI state.
- Preload layer: typed bridge exposed through `window.devbox`.
- IPC layer: shared channel constants and typed request/response contracts.
- Main process layer: window lifecycle, system capabilities, service orchestration.
- Service layer: business workflows such as connection management, secret references, SQL execution, and SQL history.
- Adapter layer: protocol-specific libraries such as MySQL, Redis, SSH, SFTP, Kafka, and HTTP.
- Storage layer: JSON-backed local MVP persistence under Electron `userData`; SQLite remains a later option.
- Security layer: secret references backed by Electron `safeStorage` encrypted values for the MVP, with future Keychain/Credential Manager refinement planned.
- Platform layer: OS detection and cross-platform application paths.

## Security Boundary

Renderer code does not receive Node.js access. `nodeIntegration` is disabled, `contextIsolation` is enabled, and renderer code can only call APIs exposed by preload.

All IPC channels are defined in shared constants. New handlers must use typed contracts and return `IpcResult<T>`.

## Local Data

Configuration should live under Electron `app.getPath('userData')`. Sensitive values must not be stored directly in connection profiles.

The Database MVP stores connection profiles and SQL history in `devbox-data.json`. Passwords are stored separately as encrypted secret records and referenced from profiles by `passwordRef`.

## Expansion Plan

Protocol libraries are isolated behind adapters so the UI and service contracts can remain stable while implementations evolve.

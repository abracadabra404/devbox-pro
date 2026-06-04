# DevBox Pro Progress

Last updated: 2026-06-04

## Current State

- Phase 1 foundation is implemented and committed.
- Current branch: `main`.
- Phase 1 foundation commit: `11b59b5 chore: initialize desktop app foundation`.
- Remote: `origin` is configured as `https://github.com/abracadabra404/devbox-pro.git`.
- GitHub repository: public repo at `https://github.com/abracadabra404/devbox-pro`.
- GitHub CLI: not installed in the current Windows environment.
- GitHub plugin: available for GitHub profile/repository workflows. Repository creation was completed through GitHub API using the existing Git Credential Manager HTTPS credential.

## Verified Commands

```bash
corepack pnpm lint
corepack pnpm build
corepack pnpm dev
```

Results:

- TypeScript strict check passed.
- Production build passed.
- Dev server started at `http://localhost:5173/` and Electron launch reached `start electron app`.
- Cross-platform CI has been added at `.github/workflows/desktop-ci.yml` for `windows-latest` and `macos-latest`.
- GitHub Actions run `26936095992` passed for both `windows-latest` and `macos-latest`: `https://github.com/abracadabra404/devbox-pro/actions/runs/26936095992`.
- Tagged release packaging workflow has been added at `.github/workflows/release.yml`.
- Release `v0.1.0-alpha.1` has been published: `https://github.com/abracadabra404/devbox-pro/releases/tag/v0.1.0-alpha.1`.
- Release assets include `DevBox.Pro.Setup.0.1.0.exe`, `DevBox.Pro-0.1.0-universal.dmg`, and `DevBox.Pro-0.1.0-universal-mac.zip`.

## Important Setup Notes

- `pnpm-lock.yaml` is committed.
- `packageManager` is pinned to `pnpm@9.15.4`.
- Electron postinstall needed the mirror below on this machine:

```powershell
$env:ELECTRON_MIRROR='https://npmmirror.com/mirrors/electron/'
corepack pnpm rebuild electron
```

Use it only if Electron runtime is missing after `pnpm install`.

## Files Added In Phase 1

- App foundation: `package.json`, `electron.vite.config.ts`, `electron-builder.yml`, `tsconfig.json`.
- Git hygiene: `.gitignore`, `.gitattributes`, `.env.example`.
- Main process: `src/main/index.ts`, IPC handlers, service skeletons, adapter interfaces, platform service.
- Preload: `src/preload/index.ts`.
- Renderer: `src/renderer/App.tsx`, layout, navigation, resource panel, tab workspace, pages, store, styles.
- Shared contracts: `src/shared/types`, `src/shared/ipc`, `src/shared/constants`, `src/shared/errors`.
- Docs: `README.md`, `CHANGELOG.md`, `docs/architecture.md`, `docs/development.md`, `docs/roadmap.md`.

## This Update

- Added this handoff file: `progress.md`.
- Added bilingual documentation structure:
  - English: `*.en-US.md`
  - Chinese: `*.zh-CN.md`
  - Language index files remain at the original names.
- Added functional specification documents under `docs/features.*.md`.
- Added GitHub setup documents under `docs/github-setup.*.md`.
- Added verification documents under `docs/verification.*.md`.
- Added GitHub Actions workflow for Windows and macOS Phase 1 MVP checks.
- Added GitHub Actions workflow for tagged installer packages and GitHub Releases.
- Created and published tag `v0.1.0-alpha.1`.

## Next Recommended Task

Phase 2: Database MVP.

Suggested branch:

```bash
git pull --rebase
git checkout -b feature/database-mvp
```

Implementation focus:

- Add MySQL connection profile UI.
- Add secure password reference flow through `SecurityService`.
- Add MySQL adapter using `mysql2`.
- Add typed IPC for connection test and SQL execution.
- Add SQL history persistence model.
- Add result table and error display.

## Known Blockers

- `gh` is not installed, so future CLI-based GitHub workflows need GitHub CLI installation or the existing HTTPS Git Credential Manager flow.
- SSH push is not configured on this machine. `ssh -o BatchMode=yes -T git@github.com` returned `Permission denied (publickey)`.
- Sensitive secret storage is still an interface only. Do not store real passwords in local JSON or committed files.

# DevBox Pro

DevBox Pro is an all-in-one cross-platform desktop developer tool for Java backend engineers, DevOps engineers, data engineers, and QA engineers.

It is planned as a lightweight combination of database client, Redis client, SSH terminal, SFTP browser, Kafka UI, HTTP debugger, JSON utilities, and log viewer.

## Current Status

Phase 1 is complete:

- Electron + React + TypeScript + Vite desktop foundation
- Main/preload/renderer separation
- Typed IPC foundation
- Dark developer-tool layout
- Navigation rail, resource panel, and tab workspace
- Shared data models
- Protocol adapter interfaces
- Cross-platform platform service skeleton
- Documentation foundation

## Tech Stack

- Electron for macOS and Windows desktop runtime
- React and TypeScript for renderer UI
- Node.js in the main process for protocol adapters
- electron-vite for development and builds
- electron-builder for packaging
- Zustand for renderer state
- pnpm for dependency management

## Prerequisites

- Node.js 20 or newer
- pnpm 9.x
- Git
- Optional: GitHub CLI (`gh`) for repository creation and push workflows

Enable pnpm with Corepack:

```bash
corepack enable
corepack prepare pnpm@9.15.4 --activate
```

## macOS Development

```bash
git clone git@github.com:<your-name>/devbox-pro.git
cd devbox-pro
pnpm install
pnpm dev
```

## Windows Development

```powershell
git clone git@github.com:<your-name>/devbox-pro.git
cd devbox-pro
pnpm install
pnpm dev
```

If Electron runtime download fails on Windows, retry with a mirror:

```powershell
$env:ELECTRON_MIRROR='https://npmmirror.com/mirrors/electron/'
pnpm rebuild electron
```

## Validate

```bash
pnpm lint
pnpm build
```

## Git Sync Workflow

Before starting work:

```bash
git pull --rebase
git status
```

After each phase:

```bash
git add .
git commit -m "clear commit message"
git push
```

## Repository Setup

If GitHub CLI is installed and authenticated:

```bash
gh repo create devbox-pro --private --source=. --remote=origin --push
```

If GitHub CLI is unavailable:

1. Create a private repository named `devbox-pro` on GitHub.
2. Connect the local repository:

```bash
git remote add origin git@github.com:<your-name>/devbox-pro.git
git push -u origin main
```

## Security Rules

- Never commit passwords, private keys, access keys, database URLs, or tokens.
- Commit `.env.example`; do not commit `.env`.
- Sensitive values must be represented by `passwordRef` or security service references.
- Future credential storage should use macOS Keychain and Windows Credential Manager.

## Documentation

- [Progress](progress.md)
- [Functional Specification](docs/features.en-US.md)
- [Architecture](docs/architecture.en-US.md)
- [Development](docs/development.en-US.md)
- [Verification](docs/verification.en-US.md)
- [Roadmap](docs/roadmap.en-US.md)
- [GitHub Setup](docs/github-setup.en-US.md)
- [Changelog](CHANGELOG.en-US.md)

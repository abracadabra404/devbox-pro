# DevBox Pro

DevBox Pro is an all-in-one desktop developer tool for database, Redis, SSH, SFTP, Kafka, HTTP debugging, JSON utilities, and log workflows.

The first phase contains the desktop shell, typed IPC foundation, shared data models, and a developer-focused dark layout. Protocol-specific MVPs will be implemented in later phases.

## Tech Stack

- Electron for macOS and Windows desktop runtime
- React and TypeScript for renderer UI
- Node.js in the main process for protocol adapters
- electron-vite for development and builds
- electron-builder for packaging
- Zustand for renderer state

## Prerequisites

- Node.js 20 or newer
- pnpm 9.x
- Git
- GitHub CLI (`gh`) is optional, but recommended for repository creation and push workflows

Enable pnpm with Corepack when pnpm is not installed:

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

If GitHub CLI is authenticated:

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

- Never commit real passwords, private keys, access keys, database URLs, or tokens.
- Commit `.env.example`; do not commit `.env`.
- Sensitive values are represented by `passwordRef` or security service references.
- Future credential storage should use macOS Keychain and Windows Credential Manager.

## Common Troubleshooting

- `pnpm` is not recognized: run the Corepack commands above.
- Electron install is blocked: confirm network access and retry `pnpm install`.
- App opens blank: run `pnpm build` to catch TypeScript or renderer errors.
- Git push fails: check `git remote -v` and GitHub authentication.

## Packaging

Packaging will be completed in phase 7. The initial commands are already reserved:

```bash
pnpm dist
```

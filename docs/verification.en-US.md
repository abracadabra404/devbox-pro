# Verification

## Current Verification Scope

Phase 1 MVP verification covers:

- Dependency installation with the committed `pnpm-lock.yaml`.
- TypeScript strict mode validation.
- Production build for main, preload, and renderer bundles.
- Electron runtime availability check.

## Local Windows Result

Verified on the current Windows development machine:

```bash
corepack pnpm lint
corepack pnpm build
corepack pnpm dev
```

Results:

- TypeScript strict check passed.
- Production build passed.
- Dev mode started the renderer dev server and reached Electron app startup.

## Cross-Platform CI

GitHub Actions workflow:

```text
.github/workflows/desktop-ci.yml
```

The workflow runs on:

- `windows-latest`
- `macos-latest`

Each runner executes:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm build
pnpm exec electron --version
```

This validates the Phase 1 foundation on both Windows and macOS.

## Limits

The CI does not yet perform full visual UI automation or package signing. Those checks belong to later packaging and end-to-end verification phases.

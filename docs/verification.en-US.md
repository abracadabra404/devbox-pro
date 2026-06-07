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

## Local macOS Handoff Verification

On 2026-06-06, a handoff smoke verification pass was completed on macOS arm64. No source code changes were made.

Commands executed:

```bash
ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/ corepack pnpm install --frozen-lockfile
corepack pnpm lint
corepack pnpm build
corepack pnpm exec electron --version
corepack pnpm dev
```

Results:

- Dependency installation passed. A plain `corepack pnpm install --frozen-lockfile` stalled at Electron postinstall; retrying with `ELECTRON_MIRROR` succeeded.
- TypeScript strict check passed.
- Production build passed, producing main, preload, and renderer output under `out/`.
- Electron runtime check passed outside the restricted command sandbox: `v33.4.11`. The same check produced `SIGABRT` inside the restricted command sandbox, so that should not be treated as a product failure by itself.
- Dev mode started the renderer dev server and launched the Electron app.
- Electron window smoke check passed: Settings loaded `darwin arm64`, userData, and logs paths through preload IPC. Database, Redis, SSH, SFTP, Kafka, HTTP, JSON Tools, Logs, and Settings pages all opened successfully.

Findings from this handoff pass:

- Opening `http://localhost:5173/` directly in a browser crashed the renderer because `window.devbox` was missing. This was fixed during Database MVP by adding a renderer fallback.
- Closing the active tab activated the first remaining tab instead of an adjacent tab. This was fixed during Database MVP by choosing the adjacent tab.

## Database MVP Verification

On 2026-06-06, Database MVP development, testing, and acceptance were completed on branch `codex/database-mvp`.

Commands executed:

```bash
corepack pnpm lint
corepack pnpm test
corepack pnpm build
corepack pnpm exec electron --version
corepack pnpm dev
```

Results:

- TypeScript strict check passed.
- Unit tests passed: 3 files, 7 tests covering security service, database service, and tab-close behavior.
- Production build passed for main, preload, and renderer bundles.
- Electron runtime smoke check passed outside the restricted command sandbox: `v33.4.11`.
- Electron UI acceptance passed for Database MVP loading, MySQL profile save, encrypted password reference display, and connection-test error handling.
- The local data file stored `passwordRef` and `encryptedValue`; the test password was not found in plaintext.
- SQL execution failure against invalid local MySQL credentials was recorded in SQL history.

Residual acceptance note:

- A successful live SQL execution in the UI requires valid MySQL credentials. The successful execution path is covered by unit tests with a fake adapter.
- Browser-only renderer validation could not be repeated after the fix because Browser Use rejected `localhost:5173` by policy. The renderer now has a `window.devbox` fallback in code.

## Windows Codex Handoff Verification Plan

When the company Windows Codex session resumes on 2026-06-08, pull and stay on branch `codex/database-mvp` first. Do not start the next MVP phase before validating the Database MVP on Windows.

Recommended commands:

```bash
git fetch origin
git checkout codex/database-mvp
git pull --rebase
corepack pnpm install --frozen-lockfile
corepack pnpm lint
corepack pnpm test
corepack pnpm build
corepack pnpm exec electron --version
corepack pnpm dev
```

Manual acceptance focus:

- The Database page opens and the layout has no obvious breakage.
- A MySQL profile can be saved; after save, the password field clears and the UI only shows `passwordRef`.
- Invalid MySQL credentials show a connection or SQL error without crashing the app.
- If valid MySQL credentials are available, run `select 1 as health_check;` and confirm the result table and SQL history both work.
- After restarting the app, confirm profiles and SQL history are still loaded.

Any Windows-specific installation, runtime, UI, database connection, or SQL history finding must be reflected in `progress.md`, this file, and `docs/verification.zh-CN.md`.

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

## Tagged Installer Builds

GitHub Actions workflow:

```text
.github/workflows/release.yml
```

Push a tag to build unsigned installer packages and publish them to GitHub Releases:

```bash
git tag v0.1.0-alpha.1
git push origin v0.1.0-alpha.1
```

Release assets:

- Windows x64: NSIS `.exe` installer.
- macOS universal: `.dmg` and `.zip` packages.

These packages are for internal validation only because code signing and notarization are not configured yet.

## Limits

The CI does not yet perform full visual UI automation or package signing. Those checks belong to later packaging and end-to-end verification phases.

Every future validation finding or behavior change must be reflected in `progress.md` and in both language variants of this verification document so other Codex sessions can resume quickly.

# DevBox Pro Progress

Last updated: 2026-06-07

## Current State

- Phase 1 foundation is implemented and committed.
- Phase 2 Database MVP is implemented and committed on branch `codex/database-mvp`.
- Current branch: `codex/database-mvp`.
- Phase 1 foundation commit: `11b59b5 chore: initialize desktop app foundation`.
- Remote: `origin` is configured as `https://github.com/abracadabra404/devbox-pro.git`.
- GitHub repository: public repo at `https://github.com/abracadabra404/devbox-pro`.
- GitHub CLI: not installed in the current Windows environment.
- GitHub plugin: available for GitHub profile/repository workflows. Repository creation was completed through GitHub API using the existing Git Credential Manager HTTPS credential.
- Latest local handoff verification was completed on macOS arm64 on 2026-06-06.
- Database MVP development, testing, and acceptance were completed on macOS arm64 on 2026-06-06.
- Next handoff target: Windows Codex on 2026-06-08 should pull branch `codex/database-mvp`, re-run validation, and update the progress documents with any Windows-specific findings before starting the next MVP stage.

## Handoff Documentation Rule

- Every future Codex handoff must update this file when it discovers validation results, environment issues, bugs, behavior changes, or follow-up tasks.
- If the finding belongs to a specific topic, also update the matching document under `docs/` in both English and Chinese variants.
- Keep command results concrete: include exact commands, pass/fail status, and any workaround needed to reproduce the verified state.

## Verified Commands

```bash
ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/ corepack pnpm install --frozen-lockfile
corepack pnpm lint
corepack pnpm test
corepack pnpm build
corepack pnpm exec electron --version
corepack pnpm dev
```

Results:

- Dependency installation passed with the Electron mirror above. A plain `corepack pnpm install --frozen-lockfile` stalled at Electron postinstall on this macOS machine and was stopped.
- TypeScript strict check passed.
- Unit tests passed: 3 files, 7 tests covering Security Service, Database Service, and tab-close behavior.
- Production build passed.
- Electron runtime smoke check passed outside the command sandbox: `v33.4.11`.
- Dev server started at `http://localhost:5173/` and Electron launch reached `start electron app`.
- Electron app UI smoke check passed: Settings IPC loaded `darwin arm64`, user data path, and logs path. Database, Redis, SSH, SFTP, Kafka, HTTP, JSON Tools, Logs, and Settings pages all opened without blank screens or app crashes.
- Database MVP Electron UI acceptance passed: MySQL profile save, encrypted password reference display, connection-test error handling, and SQL failure history recording worked.
- Local data inspection found only `passwordRef` and `encryptedValue`; the test password was not stored in plaintext.
- Direct browser fallback for missing `window.devbox` was implemented after the earlier handoff finding. Browser Use later rejected `localhost:5173` by policy, so the post-fix browser-only check could not be repeated with that tool.
- Closing the active tab now activates an adjacent tab instead of falling back to the first remaining tab.
- Cross-platform CI has been added at `.github/workflows/desktop-ci.yml` for `windows-latest` and `macos-latest`.
- GitHub Actions run `26936095992` passed for both `windows-latest` and `macos-latest`: `https://github.com/abracadabra404/devbox-pro/actions/runs/26936095992`.
- Tagged release packaging workflow has been added at `.github/workflows/release.yml`.
- Release `v0.1.0-alpha.1` has been published: `https://github.com/abracadabra404/devbox-pro/releases/tag/v0.1.0-alpha.1`.
- Release assets include `DevBox.Pro.Setup.0.1.0.exe`, `DevBox.Pro-0.1.0-universal.dmg`, and `DevBox.Pro-0.1.0-universal-mac.zip`.

## Important Setup Notes

- `pnpm-lock.yaml` is committed.
- `packageManager` is pinned to `pnpm@9.15.4`.
- Electron postinstall may need the mirror below when the default Electron download stalls or fails:

```bash
ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/ corepack pnpm install --frozen-lockfile
```

Windows PowerShell equivalent:

```powershell
$env:ELECTRON_MIRROR='https://npmmirror.com/mirrors/electron/'
corepack pnpm rebuild electron
```

Use the rebuild command only if Electron runtime is missing after dependency installation.

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

## Windows Codex Handoff

For the 2026-06-08 Windows Codex session, start from the Database MVP branch:

```bash
git fetch origin
git checkout codex/database-mvp
git pull --rebase
```

If the branch is not available locally yet:

```bash
git checkout -b codex/database-mvp origin/codex/database-mvp
```

First validation pass on Windows should run:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm lint
corepack pnpm test
corepack pnpm build
corepack pnpm exec electron --version
corepack pnpm dev
```

Then manually verify the Database MVP flow:

- Create or edit a MySQL profile.
- Confirm the password field clears after save and only `passwordRef` is shown in the UI.
- Test invalid credentials and confirm the error is displayed without crashing.
- Test valid MySQL credentials if available and run `select 1 as health_check;`.
- Confirm SQL result rendering and SQL history persistence after app restart.

Any Windows-specific install issue, Electron runtime behavior, UI bug, or database validation result must be added to this file and to both `docs/verification.en-US.md` and `docs/verification.zh-CN.md`.

## Next Recommended Task

Phase 2 Database MVP is complete. Recommended follow-ups before Phase 3:

- Re-run UI acceptance against a real MySQL profile with valid credentials to confirm the live successful SQL path in Electron.
- Add profile deletion/edit-confirmation UX before users accumulate test profiles.
- Consider schema browsing and pagination before expanding beyond basic SQL execution.
- Keep this file and the relevant `docs/*.en-US.md` / `docs/*.zh-CN.md` documents updated after every validation or implementation turn.

After those follow-ups, proceed to Phase 3: Redis MVP.

Suggested branch:

```bash
git pull --rebase
git checkout -b feature/redis-mvp
```

Phase 3 implementation focus:

- Redis connection management.
- Key search.
- String, Hash, and List viewing.
- Delete key and set TTL.

## Known Blockers

- `gh` is not installed, so future CLI-based GitHub workflows need GitHub CLI installation or the existing HTTPS Git Credential Manager flow.
- SSH push is not configured on this machine. `ssh -o BatchMode=yes -T git@github.com` returned `Permission denied (publickey)`.
- Sensitive secret storage is implemented with Electron `safeStorage` for the local MVP. Continue avoiding real secrets in committed files and logs.
- Electron GUI runtime checks may fail inside a restricted command sandbox with `SIGABRT`; rerun Electron runtime checks outside the sandbox before treating that as a product failure.
- Successful live MySQL SQL execution was not accepted with real credentials on this machine because the local root credential test returned `Access denied`. Unit tests cover the successful adapter path.

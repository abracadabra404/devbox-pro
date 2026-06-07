# Development

## Start

```bash
pnpm install
pnpm dev
```

## Validate

```bash
pnpm lint
pnpm test
pnpm build
```

## Workflow

Always synchronize before editing:

```bash
git pull --rebase
git status
```

Commit each completed phase:

```bash
git add .
git commit -m "phase message"
git push
```

## Cross-Machine Handoff

For the 2026-06-08 Windows Codex Database MVP verification pass, start from the current phase branch:

```bash
git fetch origin
git checkout codex/database-mvp
git pull --rebase
```

If the branch does not exist locally yet:

```bash
git checkout -b codex/database-mvp origin/codex/database-mvp
```

After checkout, run `pnpm lint`, `pnpm test`, `pnpm build`, and Electron startup validation before deciding whether to start the next development phase.

## Handoff Documentation Rule

After every handoff, validation pass, or development change, update the docs whenever you discover environment issues, verification results, bugs, behavior changes, completed modifications, or follow-up tasks.

Update:

- `progress.md`
- the relevant `docs/*.zh-CN.md`
- the relevant `docs/*.en-US.md`

Record the concrete date, commands, pass/fail status, workaround, and the next tasks for the following Codex session.

## Adding IPC

1. Add a channel to `src/shared/ipc/channels.ts`.
2. Add request and response types to `src/shared/ipc/contracts.ts`.
3. Register the handler in `src/main/handlers/index.ts`.
4. Expose a typed method from `src/preload/index.ts`.
5. Consume the method from renderer code through `window.devbox`.

## Adding Protocol Support

Protocol code belongs in the main process only:

- Adapter: third-party library integration.
- Service: business logic, validation, timeout handling, and errors.
- IPC handler: typed boundary between renderer and main.
- Renderer page: UI only.

Do not log secrets.

## GitHub Repository Setup

See [GitHub Setup](github-setup.en-US.md).

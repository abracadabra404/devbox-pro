# Development

## Start

```bash
pnpm install
pnpm dev
```

## Validate

```bash
pnpm lint
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

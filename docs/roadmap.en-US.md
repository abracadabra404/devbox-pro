# Roadmap

## Phase 1: Foundation - Completed

- Desktop app shell
- Typed IPC
- Main/preload/renderer structure
- Core data models
- Dark developer layout
- Documentation and repository hygiene

## Phase 2: Database MVP - Completed

- MySQL connection management
- Connection testing
- SQL execution
- Result grid
- SQL history

Verification status:

- Unit tests, TypeScript strict check, production build, Electron runtime smoke check, and Electron UI acceptance passed on macOS arm64 on 2026-06-06.
- A real successful MySQL query still requires valid local MySQL credentials; the success path is covered by unit tests with a fake adapter.

## Phase 3: Redis MVP - Next

- Redis connection management
- Key search
- String, Hash, and List viewing
- Delete key and set TTL

## Phase 4: SSH and SFTP MVP

- SSH connection
- Basic terminal
- SFTP directory browsing
- Upload and download

## Phase 5: Kafka MVP

- Kafka connection
- Topic list
- Message consumption
- Test message publishing

## Phase 6: HTTP and JSON Tools

- HTTP request builder
- Response viewer
- Request history
- JSON formatting and validation
- Base64, URL codec, timestamp, UUID, and JWT utilities

## Phase 7: Packaging

- macOS package
- Windows package
- Signing and update plan

# Functional Specification

## Product Positioning

DevBox Pro is a cross-platform desktop developer tool for daily backend, DevOps, data, and QA workflows. It reduces context switching by combining common protocol clients and text utilities in one application.

## Target Platforms

- macOS arm64
- macOS x64
- Windows x64
- Linux is reserved for future support

## Main Workspace

The UI uses a compact developer-tool layout:

- Left navigation rail: Database, Redis, SSH, SFTP, Kafka, HTTP, JSON Tools, Logs, Settings.
- Middle resource panel: connection lists, resource trees, search, and module-specific actions.
- Right workspace: SQL editor, terminal, file browser, request editor, result grid, message viewer, or utility output.
- Multi-tab workspace: multiple SQL editors, Redis keys, SSH terminals, HTTP requests, and other work sessions.
- Dark mode first, with light and system themes planned.

## Database Tool

Initial support:

- MySQL connection profiles
- Connection test
- SQL execution
- Result table
- Query error display
- SQL history

Planned support:

- PostgreSQL
- SQLite
- Oracle
- SQL Server
- ClickHouse
- CSV export
- Favorite SQL snippets
- Pagination and schema browsing

## Redis Tool

Initial support:

- Redis standalone connection profiles
- Key search
- String, Hash, and List value viewing
- Delete key
- Set TTL
- Refresh data

Planned support:

- Sentinel
- Cluster
- Set and ZSet value viewing
- Batch key operations

## SSH Tool

Initial support:

- Host connection profiles
- Username/password login
- Private key login
- Basic terminal

Planned support:

- Command history
- Favorite commands
- Session recovery
- Multiple terminal tabs

## SFTP Tool

Initial support:

- SFTP connection over SSH profiles
- Remote directory browsing
- Local directory browsing
- Upload
- Download

Planned support:

- FTP
- Delete
- Rename
- File preview
- Drag-and-drop transfer

## Kafka Tool

Initial support:

- Kafka cluster connection profiles
- Topic list
- Message consumption
- Send test message

Planned support:

- Consumer groups
- Consume by offset
- Consume by time
- Partition selection
- Message headers and key display

## HTTP Tool

Initial support:

- GET, POST, PUT, DELETE
- Headers
- Query parameters
- JSON request body
- Response body
- Request history

Planned support:

- Environments
- Variable substitution
- Auth helpers
- Import/export collections

## JSON And Text Tools

Planned tools:

- JSON format
- JSON minify
- JSON validation
- Base64 encode/decode
- URL encode/decode
- Timestamp conversion
- UUID generation
- JWT decode

## Logs And Configuration Helpers

Initial local log support:

- Open local log files
- Keyword search
- Regex search
- Highlighted display

Future extensions:

- Kubernetes Pod logs
- Aliyun SLS query
- Nacos configuration viewer

## Storage And Security

- Non-sensitive configuration should be stored in the app user data directory.
- Sensitive values must not be saved in plaintext.
- Connection profiles store only secret references such as `passwordRef`.
- macOS should use Keychain.
- Windows should use Credential Manager.
- A local encrypted fallback can be implemented after the security service boundary is stable.

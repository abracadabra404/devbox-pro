# 架构说明

DevBox Pro 使用 Electron，并保持严格的进程隔离。

## 分层

- UI 层：React 组件、布局、页面和用户交互。
- Renderer Store 层：使用 Zustand 管理当前工具、Tab 和临时 UI 状态。
- Preload 层：通过 `window.devbox` 暴露受控的类型化桥接 API。
- IPC 层：共享 channel 常量和类型化请求/响应契约。
- Main Process 层：窗口生命周期、系统能力和服务编排。
- Service 层：连接管理、SQL 执行等业务流程。
- Adapter 层：MySQL、Redis、SSH、SFTP、Kafka、HTTP 等协议库封装。
- Storage 层：本地配置持久化，计划使用 SQLite。
- Security 层：密钥引用，以及后续 Keychain / Credential Manager 集成。
- Platform 层：系统识别和跨平台应用路径。

## 安全边界

Renderer 不直接获得 Node.js 能力。`nodeIntegration` 关闭，`contextIsolation` 开启，Renderer 只能调用 Preload 暴露的 API。

所有 IPC channel 都定义在共享常量中。新增 handler 必须使用类型化契约，并返回 `IpcResult<T>`。

## 本地数据

配置数据应存放在 Electron `app.getPath('userData')` 对应目录。敏感值不能直接存入连接配置。

## 扩展方案

协议库隔离在 Adapter 后面，这样 UI 和 Service 契约可以保持稳定，具体实现可以逐步演进。

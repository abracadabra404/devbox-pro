# 更新日志

## Unreleased

- 实现 Database MVP：MySQL 连接配置、密码引用、连接测试、SQL 执行、结果表格和 SQL 历史。
- 添加 MVP 阶段 JSON 本地存储、Electron `safeStorage` 密钥加密，以及类型化 database IPC/preload API。
- 添加 Security Service、Database Service 和关闭 Tab 行为的 Vitest 单元测试。
- 改进 `window.devbox` 缺失时的 renderer 兜底，并在关闭当前 Tab 后激活相邻 Tab。
- 更新交接、验证、开发、功能、架构、路线图和 README 文档。

## 0.1.0

- 初始化 DevBox Pro 桌面应用工程基础。
- 添加 Electron、React、TypeScript、Vite、typed IPC、基础布局和核心数据模型。
- 添加 service、adapter、storage、security、platform 骨架。
- 添加中英文文档结构和进度交接文件。
- 添加 Windows 和 macOS GitHub Actions，用于验证第一阶段 MVP。
- 添加 tag 触发的 GitHub Release workflow，用于生成未签名 Windows 和 macOS 安装测试包。

# DevBox Pro

DevBox Pro 是一个跨平台 All-in-One 桌面开发者工具，面向 Java 后端、运维、数据开发和测试人员。

它的目标是把数据库客户端、Redis 客户端、SSH 终端、SFTP 文件浏览器、Kafka UI、HTTP 调试器、JSON 工具和日志查看器整合到一个桌面应用里。

## 当前状态

第一阶段已完成：

- Electron + React + TypeScript + Vite 桌面工程基础
- Main / Preload / Renderer 分层
- 类型明确的 IPC 基础
- 深色开发者工具布局
- 左侧导航栏、中间资源面板、右侧 Tab 工作区
- 共享数据模型
- 协议 Adapter 接口骨架
- 跨平台 Platform Service 骨架
- 文档基础

## 技术栈

- Electron：macOS 和 Windows 桌面运行时
- React + TypeScript：Renderer UI
- Node.js Main Process：协议 Adapter 和系统能力
- electron-vite：开发和构建
- electron-builder：打包
- Zustand：前端状态管理
- pnpm：依赖管理

## 环境要求

- Node.js 20 或更高版本
- pnpm 9.x
- Git
- 可选：GitHub CLI (`gh`)，用于创建 GitHub 仓库和推送

使用 Corepack 启用 pnpm：

```bash
corepack enable
corepack prepare pnpm@9.15.4 --activate
```

## macOS 开发

```bash
git clone git@github.com:<your-name>/devbox-pro.git
cd devbox-pro
pnpm install
pnpm dev
```

## Windows 开发

```powershell
git clone git@github.com:<your-name>/devbox-pro.git
cd devbox-pro
pnpm install
pnpm dev
```

如果 Windows 下 Electron 运行时下载失败，可以使用镜像重试：

```powershell
$env:ELECTRON_MIRROR='https://npmmirror.com/mirrors/electron/'
pnpm rebuild electron
```

## 验证

```bash
pnpm lint
pnpm build
```

## Git 同步流程

每次开始开发前：

```bash
git pull --rebase
git status
```

每个阶段完成后：

```bash
git add .
git commit -m "清晰的提交说明"
git push
```

## 仓库初始化

如果已经安装并登录 GitHub CLI：

```bash
gh repo create devbox-pro --private --source=. --remote=origin --push
```

如果没有 GitHub CLI：

1. 在 GitHub 手动创建 private 仓库 `devbox-pro`。
2. 连接本地仓库：

```bash
git remote add origin git@github.com:<your-name>/devbox-pro.git
git push -u origin main
```

## 安全规则

- 不允许提交真实密码、私钥、AccessKey、数据库 URL 或 Token。
- 只提交 `.env.example`，不提交 `.env`。
- 敏感字段必须使用 `passwordRef` 或 Security Service 引用。
- 后续凭据存储优先使用 macOS Keychain 和 Windows Credential Manager。

## 文档

- [进度交接](progress.md)
- [功能说明](docs/features.zh-CN.md)
- [架构说明](docs/architecture.zh-CN.md)
- [开发说明](docs/development.zh-CN.md)
- [验证说明](docs/verification.zh-CN.md)
- [路线图](docs/roadmap.zh-CN.md)
- [GitHub 设置](docs/github-setup.zh-CN.md)
- [更新日志](CHANGELOG.zh-CN.md)

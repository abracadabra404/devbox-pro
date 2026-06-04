# 验证说明

## 当前验证范围

第一阶段 MVP 验证覆盖：

- 使用已提交的 `pnpm-lock.yaml` 安装依赖。
- TypeScript strict mode 校验。
- Main、Preload、Renderer 的生产构建。
- Electron 运行时可用性检查。

## 本地 Windows 结果

已在当前 Windows 开发机器上验证：

```bash
corepack pnpm lint
corepack pnpm build
corepack pnpm dev
```

结果：

- TypeScript strict 校验通过。
- 生产构建通过。
- Dev 模式成功启动 renderer dev server，并进入 Electron app 启动阶段。

## 跨平台 CI

GitHub Actions 工作流：

```text
.github/workflows/desktop-ci.yml
```

该工作流运行在：

- `windows-latest`
- `macos-latest`

每个 runner 执行：

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm build
pnpm exec electron --version
```

这用于验证第一阶段基础工程在 Windows 和 macOS 上都能安装、校验和构建。

## 限制

当前 CI 还没有做完整 UI 自动化和安装包签名验证。这些检查属于后续打包和端到端验证阶段。

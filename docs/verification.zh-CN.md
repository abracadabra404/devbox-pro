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

## 本地 macOS 交接验证

2026-06-06 在 macOS arm64 环境完成了一轮接手冒烟验证，未修改源码。

执行命令：

```bash
ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/ corepack pnpm install --frozen-lockfile
corepack pnpm lint
corepack pnpm build
corepack pnpm exec electron --version
corepack pnpm dev
```

结果：

- 依赖安装通过。普通 `corepack pnpm install --frozen-lockfile` 曾卡在 Electron postinstall，使用 `ELECTRON_MIRROR` 后成功。
- TypeScript strict 校验通过。
- 生产构建通过，Main、Preload、Renderer 均产出到 `out/`。
- Electron runtime 在沙箱外检查通过，版本为 `v33.4.11`。受限命令沙箱内运行同一命令会出现 `SIGABRT`，不应直接视为产品缺陷。
- Dev 模式成功启动 renderer dev server，并进入 Electron app。
- Electron 窗口冒烟通过：Settings 页能通过 preload IPC 读取 `darwin arm64`、userData 和 logs 路径；Database、Redis、SSH、SFTP、Kafka、HTTP、JSON Tools、Logs、Settings 页面均可打开。

本轮交接发现：

- 直接在浏览器打开 `http://localhost:5173/` 曾因为缺少 `window.devbox` 导致 renderer 崩溃。Database MVP 阶段已添加 renderer 兜底。
- 关闭当前激活 Tab 后曾跳到第一个剩余 Tab，而不是相邻 Tab。Database MVP 阶段已改为选择相邻 Tab。

## Database MVP 验证

2026-06-06 在 `codex/database-mvp` 分支完成 Database MVP 的开发、测试和验收。

执行命令：

```bash
corepack pnpm lint
corepack pnpm test
corepack pnpm build
corepack pnpm exec electron --version
corepack pnpm dev
```

结果：

- TypeScript strict 校验通过。
- 单元测试通过：3 个测试文件、7 条测试，覆盖 Security Service、Database Service 和关闭 Tab 行为。
- 生产构建通过，Main、Preload、Renderer 均成功构建。
- Electron runtime 在沙箱外检查通过，版本为 `v33.4.11`。
- Electron UI 验收通过：Database MVP 页面加载、MySQL profile 保存、加密密码引用展示、连接测试错误展示均正常。
- 本地数据文件只保存 `passwordRef` 和 `encryptedValue`，未发现测试密码明文。
- 使用无效本机 MySQL 凭据触发 SQL 执行失败后，失败记录已写入 SQL 历史。

剩余验收说明：

- UI 中真实 SQL 执行成功路径需要有效 MySQL 凭据；成功路径已通过 fake adapter 单元测试覆盖。
- 修复后本轮 Browser Use 因策略拒绝访问 `localhost:5173`，无法重复浏览器直开验证；代码中已加入 `window.devbox` 缺失兜底。

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

## Tag 安装包构建

GitHub Actions 工作流：

```text
.github/workflows/release.yml
```

推送 tag 后会构建未签名安装包，并发布到 GitHub Releases：

```bash
git tag v0.1.0-alpha.1
git push origin v0.1.0-alpha.1
```

Release 资产：

- Windows x64：NSIS `.exe` 安装包。
- macOS universal：`.dmg` 和 `.zip` 包。

当前安装包仅用于内部验证，因为还没有配置代码签名和 macOS notarization。

## 限制

当前 CI 还没有做完整 UI 自动化和安装包签名验证。这些检查属于后续打包和端到端验证阶段。

后续每次验证发现或行为变化，都必须同步更新 `progress.md` 以及本验证文档的中英文版本，方便其它 Codex 接手。

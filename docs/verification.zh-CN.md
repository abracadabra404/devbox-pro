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

## Windows Codex 接手验证计划

2026-06-08 公司 Windows 版 Codex 接手时，先拉取并停留在 `codex/database-mvp` 分支，不要直接进入下一阶段 MVP。

建议执行：

```bash
git fetch origin
git checkout codex/database-mvp
git pull --rebase
corepack pnpm install --frozen-lockfile
corepack pnpm lint
corepack pnpm test
corepack pnpm build
corepack pnpm exec electron --version
corepack pnpm dev
```

手工验收重点：

- Database 页面可打开，布局无明显错位。
- MySQL profile 可保存，保存后密码输入框清空，UI 只展示 `passwordRef`。
- 无效 MySQL 凭据应展示连接或 SQL 错误，应用不能崩溃。
- 如果有有效 MySQL 凭据，执行 `select 1 as health_check;`，确认结果表格和 SQL 历史都正常。
- 重启应用后确认 profile 和 SQL 历史仍能读取。

Windows 下发现的安装、运行、UI、数据库连接或 SQL 历史问题，必须同步更新 `progress.md`、本文件和 `docs/verification.en-US.md`。

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

## Windows Database MVP 本地安装包

已于 2026-06-08 在 Windows 上基于 `codex/database-mvp` 分支验证：

```powershell
corepack pnpm install --frozen-lockfile
corepack pnpm lint
corepack pnpm test
corepack pnpm build
corepack pnpm exec electron-builder --win nsis --x64 --publish never --config.win.signAndEditExecutable=false
```

结果：

- 依赖安装通过。
- TypeScript strict 校验通过。
- 单元测试通过：3 个文件，7 个测试。
- 生产构建通过。
- 本地安装包输出：`release/DevBox Pro Setup 0.1.0.exe`。
- SHA256：`24789AD52B78BF8E77F885515FFA1B9C7803AF3B1CEDAAD36A54879CE5D7F574`。

该本地包禁用了 Windows 可执行文件资源编辑，因为当前机器在解压 electron-builder 的 `winCodeSign` 符号链接时缺少 Windows 符号链接权限。该安装包适合功能验收，不适合作为最终签名发布验收。

## 限制

当前 CI 还没有做完整 UI 自动化和安装包签名验证。这些检查属于后续打包和端到端验证阶段。

后续每次验证发现或行为变化，都必须同步更新 `progress.md` 以及本验证文档的中英文版本，方便其它 Codex 接手。

# 开发说明

## 启动

```bash
pnpm install
pnpm dev
```

## 验证

```bash
pnpm lint
pnpm test
pnpm build
```

## 工作流

每次修改前先同步：

```bash
git pull --rebase
git status
```

每个阶段完成后提交：

```bash
git add .
git commit -m "阶段说明"
git push
```

## 交接文档规则

每次接手、验证或开发后，如果发现了环境问题、验证结果、bug、行为变化、已完成修改或后续任务，必须同步更新：

- `progress.md`
- 与主题相关的 `docs/*.zh-CN.md`
- 与主题相关的 `docs/*.en-US.md`

记录时要写清楚具体日期、命令、通过或失败状态、临时 workaround，以及建议下一位 Codex 继续处理的事项。

## 新增 IPC

1. 在 `src/shared/ipc/channels.ts` 添加 channel。
2. 在 `src/shared/ipc/contracts.ts` 添加请求和响应类型。
3. 在 `src/main/handlers/index.ts` 注册 handler。
4. 在 `src/preload/index.ts` 暴露类型化方法。
5. Renderer 通过 `window.devbox` 调用。

## 新增协议支持

协议相关代码只能放在 Main Process：

- Adapter：第三方库集成。
- Service：业务逻辑、校验、超时处理和错误处理。
- IPC handler：Renderer 和 Main 的类型边界。
- Renderer page：只负责 UI。

不要打印密钥或密码。

## GitHub 仓库设置

见 [GitHub 设置](github-setup.zh-CN.md)。

# GitHub 设置

## GitHub 插件能做什么

Codex 的 GitHub 插件可以帮助 Codex 查看 GitHub 仓库、Issue、Pull Request、评论、检查状态和 PR 元数据。对于本地代码发布，本地 `git push` 仍然依赖本机 Git/gh 认证状态。

2026-06-07 的 macOS 会话中，GitHub 插件显示对 `abracadabra404/devbox-pro` 有 push/admin 权限，但本地 HTTPS Git 凭据仍然可能独立失败。本机已安装 `gh 2.87.3`，但 `gh auth status` 显示未登录任何 GitHub hosts。

## 绑定你的 GitHub 个人账号

使用以下任一方式：

1. 在 Codex 的插件或集成设置中打开 GitHub 授权，并按提示登录你的 GitHub 个人账号。
2. 安装 GitHub CLI，然后在本机登录：

```bash
gh auth login
gh auth status
```

选择 GitHub.com，根据你的本地习惯选择 HTTPS 或 SSH，并完成浏览器授权。

如果需要让 Git 使用 gh 登录后的凭据：

```bash
gh auth setup-git
```

## 当前发布阻塞记录

2026-06-07 在 macOS 上执行：

```bash
git push -u origin codex/database-mvp
```

失败结果：

```text
remote: Permission to abracadabra404/devbox-pro.git denied to abracadabra404.
fatal: unable to access 'https://github.com/abracadabra404/devbox-pro.git/': The requested URL returned error: 403
```

处理方式：

- 先运行 `gh auth login` 和 `gh auth setup-git`，再重试推送。
- 或刷新 Git Credential Manager / macOS Keychain 中 `github.com` 的 HTTPS 凭据。
- 如果改用 SSH，需要先配置可写 GitHub SSH key。

## 使用 GitHub CLI 创建并推送

当 `gh auth status` 成功后执行：

```bash
gh repo create devbox-pro --private --source=. --remote=origin --push
git status
git remote -v
```

这会创建 private 仓库，添加 `origin`，并把 `main` 推送到 GitHub。

## 不使用 GitHub CLI 的手动方式

1. 在浏览器打开 GitHub。
2. 创建 private 仓库 `devbox-pro`。
3. 在本地添加远端：

```bash
git remote add origin git@github.com:<your-name>/devbox-pro.git
git push -u origin main
```

如果你使用 HTTPS：

```bash
git remote add origin https://github.com/<your-name>/devbox-pro.git
git push -u origin main
```

## 远端配置完成后的固定流程

后续每次开发前：

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

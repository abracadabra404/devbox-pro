# GitHub 设置

## GitHub 插件能做什么

Codex 的 GitHub 插件可以帮助 Codex 查看 GitHub 仓库、Issue、Pull Request、评论、检查状态和 PR 元数据。对于本地代码发布，插件流程仍然依赖本地 Git 状态和已经认证的 GitHub 远端。

当前环境没有暴露可直接创建仓库的 GitHub 工具，并且本机没有安装 `gh`。因此，首次创建仓库和推送需要通过 GitHub CLI 或在 GitHub 页面手动完成。

## 绑定你的 GitHub 个人账号

使用以下任一方式：

1. 在 Codex 的插件或集成设置中打开 GitHub 授权，并按提示登录你的 GitHub 个人账号。
2. 安装 GitHub CLI，然后在本机登录：

```bash
gh auth login
gh auth status
```

选择 GitHub.com，根据你的本地习惯选择 HTTPS 或 SSH，并完成浏览器授权。

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

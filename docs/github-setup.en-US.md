# GitHub Setup

## What The GitHub Plugin Does

The Codex GitHub plugin helps Codex inspect GitHub repositories, issues, pull requests, comments, checks, and PR metadata. For local publishing, the plugin workflow still depends on local Git state and an authenticated GitHub remote.

In this environment, no callable repository-creation tool is exposed, and `gh` is not installed. That means repository creation and initial push must be completed with GitHub CLI or manually in GitHub.

## Bind Your Personal GitHub Account

Use one of these options:

1. In Codex, open plugin/settings integration for GitHub and authorize your personal GitHub account when prompted.
2. Install GitHub CLI and authenticate locally:

```bash
gh auth login
gh auth status
```

Choose GitHub.com, HTTPS or SSH according to your local setup, and complete browser authorization.

## Create And Push With GitHub CLI

After `gh auth status` succeeds:

```bash
gh repo create devbox-pro --private --source=. --remote=origin --push
git status
git remote -v
```

This creates a private repository, adds `origin`, and pushes `main`.

## Manual Creation Without GitHub CLI

1. Open GitHub in a browser.
2. Create a private repository named `devbox-pro`.
3. Add the remote locally:

```bash
git remote add origin git@github.com:<your-name>/devbox-pro.git
git push -u origin main
```

If you use HTTPS:

```bash
git remote add origin https://github.com/<your-name>/devbox-pro.git
git push -u origin main
```

## After Remote Is Configured

Every future development session should start with:

```bash
git pull --rebase
git status
```

Every completed phase should end with:

```bash
git add .
git commit -m "clear commit message"
git push
```

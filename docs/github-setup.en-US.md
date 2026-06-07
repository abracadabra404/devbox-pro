# GitHub Setup

## What The GitHub Plugin Does

The Codex GitHub plugin helps Codex inspect GitHub repositories, issues, pull requests, comments, checks, and PR metadata. For local publishing, local `git push` still depends on this machine's Git/gh authentication state.

In the 2026-06-07 macOS session, the GitHub plugin reports push/admin permissions for `abracadabra404/devbox-pro`, but local HTTPS Git credentials can still fail independently. This machine has `gh 2.87.3` installed, and `gh auth login` has authenticated as `abracadabra404`.

## Bind Your Personal GitHub Account

Use one of these options:

1. In Codex, open plugin/settings integration for GitHub and authorize your personal GitHub account when prompted.
2. Install GitHub CLI and authenticate locally:

```bash
gh auth login
gh auth status
```

Choose GitHub.com, HTTPS or SSH according to your local setup, and complete browser authorization.

If Git should use the credential from gh:

```bash
gh auth setup-git
```

## Resolved Publish Blocker

On 2026-06-07, macOS ran:

```bash
git push -u origin codex/database-mvp
```

Failure:

```text
remote: Permission to abracadabra404/devbox-pro.git denied to abracadabra404.
fatal: unable to access 'https://github.com/abracadabra404/devbox-pro.git/': The requested URL returned error: 403
```

Resolution executed:

```bash
gh auth login
gh auth setup-git
git push -u origin codex/database-mvp
```

Result: `codex/database-mvp` was pushed to `origin` successfully, and the local branch now tracks the remote branch.

If a similar issue returns:

- Run `gh auth status` first.
- Re-run `gh auth login` and `gh auth setup-git` if needed.
- Or refresh the Git Credential Manager / macOS Keychain HTTPS credential for `github.com`.
- If using SSH, configure a writable GitHub SSH key first.

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

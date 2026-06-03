# Agents Instructions

## Personality & boundaries
- {One or two lines: tone, how to act, and hard limits — replaces a separate SOUL.md.}

## Conventions
- Replace `{placeholders}` when using templates.
- `{slug}`: short (≤20 chars) readable id from a title (e.g. `login-page`).

### Environment
- **Git**: {remote URL} — {default branch `main` | `master`}
- **Starting mode**: `{greenfield}` | `{brownfield}`
- **Tiers** — logical code groups that run separately: `[back, front, fullstack, cli, e2e, db, ...]`
- **OS** `{Windows | Linux | MacOS}` — **Shell** `{cmd | PowerShell | bash | zsh}`

### Paths
- **{Product_Folder}** — `docs/` | `.product/` | {user chosen}
- **{Rules_Folder}** — `{Product_Folder}/rules/` | {user chosen}
- **{Source_Folders}** — [`src/`] | [`back/`, `front/`] | {user chosen}

---

## Product

### Problem
{Short description of the problem the product solves.}

### Solution
{Short description of the technology stack.}

> Containers live in `{Product_Folder}/arch/system.arch.md`.

### Verification
{Short description of the e2e testing approach + start/test commands.}

```bash
{commands to run the app and the e2e tests}
```

---

> last updated: {Date}

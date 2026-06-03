# Agents Instructions

## Personality & boundaries
- {One or two lines: tone, how to act, and hard limits — replaces a separate SOUL.md.}

## Conventions
- Replace `{placeholders}` when using templates.
- `{slug}`: short (≤20 chars) readable id from a title (e.g. `login-page`).

### Environment
- **Git**: {remote URL} — {default branch `main` | `master`}
- **Starting mode**: `{greenfield | brownfield}`
- **OS** `{Windows | Linux | MacOS}` — **Shell** `{cmd | PowerShell | bash | zsh}`

### Paths
- **{Product_Folder}** — `docs/` | {user chosen} — holds `arch.md` and specs.
- **{Source_Folders}** — [`src/`] | [`back/`, `front/`] | {user chosen}

---

## Product

### Problem
{Short description of the problem the product solves.}

### Solution
{Short description of the technology stack.}

> Architecture lives in `{Product_Folder}/arch.md`.

### Verification
{How to run the app and the e2e tests.}

```bash
{commands to run the app and the e2e tests}
```

---

## Code rules
> Only the few rules that genuinely change how code is written here. Skip generic advice.

- **Naming**: {casing for files, types, functions — one line, e.g. `kebab-case files, PascalCase types`.}
- **Structure**: {dominant pattern — layer-based | feature-based; one line.}
- **Errors**: {dominant error-handling rule.}
- **Testing**: {placement + naming, e.g. colocated `*.spec.ts`.}
- **Avoid**: {1–3 concrete anti-patterns, each with a one-clause reason.}

---

> last updated: {Date}

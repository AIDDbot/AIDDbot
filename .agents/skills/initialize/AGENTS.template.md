# Agents Instructions

### Behavior
- Replace `{placeholders}` when using templates.
- `{slug}`: a short (≤20 chars), unique identifier for an artifact.
- Chat: user language. Code/docs: `{Business_Domain_Language}` (`English` | `Spanish` | …).
- Concise; closed questions one at a time when unclear.

### Environment
- **{Agents_Folder}** — {Folder for agent-related files such as skills, prompts, and specs.}
- **{Product_Folder}** — {Folder for product-related files such as specs, plans, and documentation.}
- **{Source_Folders}** — {Comma-separated source roots, e.g. `back/`, `front/` — see **Technology**.}
- **OS** `Windows` | `Linux` | `MacOS` 
- **Shell** `cmd` | `PowerShell` | `bash` | `zsh`
- **Git** {Remote URL for the git repository, e.g., `https://github.com/user/repo.git`}
- **Git Branch** default `main` | `master`

**Layout:**
```txt
{Project_Root}
├── `AGENTS.md`
├── `{Agents_Folder}/
│   ├── `skills/`
│   ├── `prompts/`
│   └── `agents/`
├── `{Product_Folder}/
│   ├── `specs/`
│   ├── `plans/`
│   ├── `arch/`
│   ├── `rules/`
│   ├── `design/`
│   └── `reports/`
├── `{Source_Folders}`
├── `e2e/`
├── `README.md`
├── `CHANGELOG.md`
```

###  Git
- Conventional commits; branches `feat/{slug}` | `fix/{slug}` | `chore/{slug}`.
- Create a new branch before coding. The branch name is `feat/{slug}`.
- Commit at the end of any skill execution.

### AIDD product artifacts
Under `{Product_Folder}/`:

| Artifact | Path |
|---|---|
| Spec | `specs/{slug}.spec.md` |
| Plan | `plans/{slug}.{source?}.{tier?}.plan.md` |
| Report | `reports/{slug}.{type}.report.md` |

- `{source?}`: `spec` | `report` | omit.
- `{tier?}`: `back` | `front` | `db` | `fullstack` | omit.
- `{type}`: `quality` | `compliance` | `accessibility` | `verify`

### Implementation context (brownfield)

When `{Product_Folder}/arch/` or `rules/` exist (from `/explore` and `/extract`), `/planify`, `/codify`, and `/verify` read the files below in order. Skip missing files. Do not duplicate arch content into rules files.

| # | File | Skills |
|---|------|--------|
| 1 | `arch/system.arch.md` | `/planify` |
| 2 | `arch/{tier}.arch.md` | `/planify`, `/codify` |
| 3 | `arch/ADR.md` | `/planify` |
| 4 | `rules/{tier}.rules.md` | `/codify` |
| 5 | `rules/naming.rules.md` | `/codify` |
| 6 | `rules/testing.rules.md` | `/codify`, `/verify` |

**Apply:** Plans and code respect ADRs and arch constraints; match naming, roles, and errors from tier rules; tests follow `testing.rules.md` when present.

### Spec status
```yaml
---
spec-slug: {slug}
status: draft | planned | in-progress | verified | released | cancelled
released-version:
released-at:
---
```
#### Spec status state machine

| Status | Action | New Status |
|--------|--------|------------|
| - | `/specify` | `draft` |
| `draft` | `/planify` | `planned` |
| `planned` | `/codify` | `in-progress` |
| `draft` or `planned` | `/codify` (user skips `/planify`) | `in-progress` |
| `in-progress` | `/verify` | `verified` |
| `verified` | `/release` | `released` |
| `released` | No action. | `released` |
| `cancelled` | No action. | `cancelled` |

## Technology

{short description of the technology stack, e.g. "The technology stack is a combination of React, Node.js, and PostgreSQL."}

| Tier | Folder | Language | Framework | Build | Run | Test |
|------|--------|----------|-----------|-------|-----|------|
| {Tier_Name_1} | `{folder_1}/` | {language_1} | {framework_1} | `{build_1}` | `{run_1}` | `{test_1}` |
| {Tier_Name_2} | `{folder_2}/` | {language_2} | {framework_2} | `{build_2}` | `{run_2}` | `{test_2}` |

## Product

{short description of the product, e.g. "The product is a web application that allows users to manage their tasks."}

- {key feature 1}
- {key feature 2}
- {key feature 3}

## Principles
1. **Think** — surface tradeoffs; don't assume or hide confusion.
2. **Simplicity** — minimum code; nothing speculative.
3. **Surgical** — touch only what's needed; clean only your mess.
4. **Goal-driven** — loop until success criteria are verified.

> last updated: {Date of last update, e.g., June 2027}

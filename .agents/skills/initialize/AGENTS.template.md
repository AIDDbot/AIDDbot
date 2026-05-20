# Agents Instructions

### Behavior Guidelines

- When using templates, replace {placeholders} with actual values.
- {Business_Domain_Language}: `English` | `Spanish` | {Other_Language}
- Chat responses should be in the user's language.
- Code and documentation should be in {Business_Domain_Language}.
- Be concise and clear in communication. Sacrifice grammar for concision.
- When in doubt, ask questions one by one with closed answers.

### Environment

- **{Agents_Folder}**: {Folder for agent-related files such as skills, prompts, and specs.}
- **{Product_Folder}**: {Folder for product-related files such as specs, plans, and documentation.}
- **{Source_Folders}**: {Comma-separated source roots, e.g. `back/`, `front/` — see **Technology** below.}
- **OS dev**: `Windows` | `Linux` | `MacOS`
- **Terminal**: `cmd` | `PowerShell` | `bash` | `zsh`
- **Git remote**: {Remote URL for the git repository, e.g., `https://github.com/user/repo.git`}
- **Default branch**: `main` | `master`

### Folder structure
````text
.                         # Project root
├── AGENTS.md             # Workflow index (this file)
├── {Agents_Folder}/      # Skills, prompts, commands
│   ├── agents/
│   ├── prompts/
│   └── skills/
├── {Product_Folder}/     # Specs, plans, arch, rules, reports, design
│   ├── specs/
│   ├── plans/
│   ├── arch/             # system + tier architecture (/explore)
│   ├── rules/            # Coding conventions (/extract)
│   ├── design/
│   └── reports/
├── CHANGELOG.md
├── README.md
├── {Source_Folders}/     # Tier source roots (see Technology)
├── tests/                # E2E tests
└── other_files/
````

### Naming Conventions

— Use conventional commit messaging
— Code branches prefixes must be: `feat/` | `fix/` | `chore/`
— Generate short slugs for artifacts and names (less-than-20-chars when possible)
— Derive `{slug}` from artifact filename, then `feat/{slug}` branch, then requirement title (confirm if ambiguous)

**Slug derivation**

| Source | `{slug}` |
|--------|----------|
| Spec/plan/report filename | segment before first `.` (e.g. `checkout.spec.md` → `checkout`) |
| Branch `feat/checkout` or `fix/checkout` | `checkout` |
| Folder `src/checkout/` | `checkout` (confirm if unclear) |

### Git (producing skills)

Any skill that writes artifacts must finish by applying the repository workflow. Do not improvise branch or commit steps.

1. **Caller** — The active skill is whichever the user invoked (e.g. `/codify`, `/specify`). `/repository` uses that skill's row in `{Agents_Folder}/skills/repository/skill-integrations.md`.
2. **Workflow** — Read and follow `{Agents_Folder}/skills/repository/SKILL.md`. `/repository` is not auto-invoked; run it as the last step of the producing skill.
3. **`/codify` only** — Run repository **Step 2: Start a feature branch** before writing implementation code. Feature-cycle branch rules stay in the repository skill only.

Per-skill branches, commit types, and paths: `{Agents_Folder}/skills/repository/skill-integrations.md`.

### AIDD product artifacts

Paths are under `{Product_Folder}`:

| Artifact | Pattern |
|----------|---------|
| Spec | `specs/{slug}.spec.md` |
| Plan (tiered) | `plans/{slug}.{source}.{tier}.plan.md` |
| Plan (fullstack) | `plans/{slug}.{source}.plan.md` |
| Report | `reports/{slug}.{type}.report.md` |
| Arch | `arch/{name}.md` or `arch/{tier}.arch.md` |
| Rules | `rules/{name}.rules.md` |
| Design | `design/{slug}/DESIGN.md` |

`{source}`: `spec` | `report` | omit for simple requirements. `{type}` (reports): `quality` | `compliance` | `accessibility` | `verify`. Consumed by `/repair`.

### Implementation context (brownfield)

When `{Product_Folder}/arch/` or `rules/` exist (from `/explore` and `/extract`), **`/planify`**, **`/codify`**, and **`/verify`** read them before changing plans, code, or tests. Skip missing files. Do not duplicate arch content into rules files.

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

YAML frontmatter on each spec: `spec-slug`, `status`, `released-version`, `released-at` (last two empty until release).

**Chain:** `draft` → `planned` → `in-progress` → `verified` → `released` (also `cancelled` when scope is dropped). Per-skill transitions, edge cases, and diagram: `{Agents_Folder}/skills/specify/spec-status.md`.

## Project

**{Product_Name}** — {One-line summary. Full product context, containers, and features: `{Product_Folder}/arch/system.arch.md` (create with `/explore system` if missing).}

## Technology

Quick reference for `/codify` and `/verify` — one row per tier (`back`, `front`, …). Add **E2E** and **DB** rows when those tiers exist. Use `—` when a script does not apply (e.g. DB run). No storage, security, lint, deploy, or source-tree detail here; `/explore` writes `arch/{tier}.arch.md`.

| Tier | Folder | Language | Framework | Build | Run | Test |
|------|--------|----------|-----------|-------|-----|------|
| {Tier_Name_1} | `{folder_1}/` | {language_1} | {framework_1} | `{build_1}` | `{run_1}` | `{test_1}` |
| {Tier_Name_2} | `{folder_2}/` | {language_2} | {framework_2} | `{build_2}` | `{run_2}` | `{test_2}` |

Arch files (optional until `/explore`): `arch/{tier_slug}.arch.md` per row. On brownfield, run `/explore` before `/planify` if `arch/` is incomplete.

## Principles

1. Think Before Coding
Don't assume. Don't hide confusion. Surface tradeoffs.
2. Simplicity First
Minimum code that solves the problem. Nothing speculative.
3. Surgical Changes
Touch only what you must. Clean up only your own mess.
4. Goal-Driven Execution
Keep working until all success criteria are met. Loop until verified.

> last updated: {Date of last update, e.g., June 2027}

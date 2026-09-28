# Project instructions

You are **AIDDbot**, an experienced assistant for **AI-Driven Development (AIDD)** workflows.

- When a request is ambiguous or incomplete, ask one closed question at a time (yes/no or pick-one).
- Be direct and concise, and match the user's language level; no lecturing, no filler.
- Prefer actionable steps and checklists over essays, unless depth is needed.

## Environment

- **Git**: {remote URL | local path} — {default branch `main` | `master`}
- **OS** `{Windows | Linux | MacOS}` — **Shell** `{cmd | PowerShell | bash | zsh | git bash}`
- **Time** {use ISO 8601 for DateTime timestamps}

## Paths

- **{Agents_File}** — `AGENTS.md` — this file
- **{Agents_Folder}** — `.agents/` — agent configuration and project rules
- **{Product_Folder}** — `.product/` — requirements, specs, model, and quality files; `aiddbot init` creates it here
- **{Source_Folders}** — [`src/`, `e2e/`] | [`back/`, `front/`] | {chosen} — code files
- **AIDDbot** — `/.aiddbot/` — the AIDDbot configuration folder

## Product

### Problem

{What the product solves.}

### Solution

{How the product addresses its problem.}

### Verification

{How to determine whether the product solution addresses its problem.}

## System

A system comprises projects, such as a frontend, backend, CLI, or test suite. Each project has its own source folder, configuration, and tooling. Modules organize code within a project.

| Project | Source path | Responsibility | Rules |
| --- | --- | --- | --- |
| {project} | `{source_root}/` | {one-line responsibility} | `.agents/rules/{project}.rules.md` |

{Only necessary cross-project facts and important paths. Do not list skills or commands.}

## Delivery documents

- **Specs** — `{Product_Folder}/specs/S{nnnn}-{slug}/` holds `spec.md`, its `control.json`, and only non-green `verification.md` or `qualification.md` reports. `control.json` holds the spec state and evaluations; only `node .agents/aidd/aidd.mjs` writes it, and `aidd spec show` summarizes it. Each spec owns its requirements, `R01` locally and `S0042-R03` globally. `specs/README.md` lists every shipped spec by domain; only `aidd release` writes it.
- **Counters** — `.aiddbot/counters.yaml` stores the last reserved S and D numbers; requirement IDs are local to each spec.
- **Journals** — `.aiddbot/journals/YYYY-MM-DD.log` files at the repository root, never inside a project folder, are local, untracked, plain-text narrative of process events by date: the core writes every state change, the model adds only `verdict`, `select`, and `blocked` (outside a spec) with `node .agents/aidd/aidd.mjs log`, and nothing reads them.
- **Quality** — `{Product_Folder}/quality/debt.json` holds the open technical debt, and `TDR.md` beside it is its view; only `node .agents/aidd/aidd.mjs debt` writes either. Each item carries its evidence and source, a state (`confirmed`, or `not-revalidated` when its check could not run), and a priority: `high` when it breaks behavior, security, or data; `medium` when it slows or complicates change; `low` otherwise. A resolved item is removed.
- **Keys** — use stable lowercase kebab-case slugs. IDs are never reused.
- **Spec state** — `draft`, `in-progress`, `verified`, `qualified`, or `shipped`, changed only by the core, which rejects illegal transitions; only `qualified` ships. A blocked spec keeps its state and changes none until `aidd spec resume`.

## Git

- MANDATORY: Preserve work; no secrets; no destructive commands.
- Group related changes; keep commits small and focused.
- Conventional commit: `{feat|refactor|fix|chore|docs|test}(scope): {description}`
- Branch naming: `{feat|fix|refactor|chore}/S{nnnn}-{slug}`

## Project decisions

- Model: `{Product_Folder}/model/model.schema.md`
- Database: `{Product_Folder}/model/{project}.db.schema.md` for each project that owns relational persistence
- API: `{Product_Folder}/model/{project}.api.schema.md` for each project that exposes endpoints
- {Project-specific decision needed to work safely.}

---

> last updated: {DateTime}

# Project instructions

## Environment

- **Git**: {remote URL | local path} — {default branch `main` | `master`}
- **OS** `{Windows | Linux | MacOS}` — **Shell** `{cmd | PowerShell | bash | zsh | git bash}`
- **Time** {use ISO 8601 for DateTime timestamps}

## Paths

- **{Agents_File}** — `AGENTS.md` — this file
- **{Agents_Folder}** — `.agents/` — agent configuration and project rules
- **Delegation policy** — `.aiddbot/efforts.yaml` — portable effort-to-harness mapping, when present
- **{Product_Folder}** — `.product/` | `docs/` | {chosen} — architecture and specs files
- **{Source_Folders}** — [`src/`, `e2e/`] | [`back/`, `front/`] | {chosen} — code files
- **AIDDbot** — `/.aiddbot/` — the AIDDbot configuration folder
- **Model Efforts** — `/.aiddbot/efforts.yaml`

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

- **Specs** — `{Product_Folder}/specs/S{nnnn}-{slug}/` holds `spec.md`, `verification.md`, and `qualification.md`. `specs/PRD.md` lists current requirements.
- **Counters** — `.aiddbot/counters.yaml` stores the last reserved S, F, T, and D numbers.
- **Journals** — `.aiddbot/journals/YYYY-MM-DD.log` files at the repository root, never inside a project folder, are the local, untracked, append-only logs of process events by date.
- **Quality** — `{Product_Folder}/quality/TDR.md` indexes open technical debt. `{Product_Folder}/quality/review.md` records detailed system-review evidence.
- **Keys** — use stable lowercase kebab-case slugs. IDs are never reused.
- **Spec state** — `draft`, `in-progress`, `verified`, `qualified`, or `shipped`.

## Git

- MANDATORY: Preserve work; no secrets; no destructive commands.
- Group related changes; keep commits small and focused.
- Conventional commit: `{feat|refactor|fix|chore|docs|test}(scope): {description}`
- Branch naming: `{feat|fix|refactor|chore}/S{nnnn}-{slug}`

## Delegation

- Before spawning, read `.aiddbot/efforts.yaml` and pass this harness's native controls for the requested effort (`low`, `medium`, or `high`; `medium` when unstated); never leave the default model when a mapping applies. Inherit the parent's settings only when the harness, model, or control is unavailable.
- One orchestrator run keeps at most one agent per role — **Architect**, **Builder**, **Craftsman** — and continues it with messages instead of spawning it again. Spawn a replacement only when the harness cannot continue an agent or its context is exhausted. A nested orchestrator uses the agents its caller already has.
- Journal each spawn as `spawn` with its role, requested effort, and resolved model, amber when a setting was inherited; journal an agent taken over from a caller as `reuse`. Every agent journals under its own role.
- Sub-agents never ask the human: they return questions and proposals to the main agent, which asks and passes the answer back.
- Before returning, stop the agents and processes you started, never your caller's.

## Project decisions

- Model: `{Product_Folder}/model/model.schema.md`
- Database: `{Product_Folder}/model/{project}.db.schema.md` for each project that owns relational persistence
- API: `{Product_Folder}/model/{project}.api.schema.md` for each project that exposes endpoints
- {Project-specific decision needed to work safely.}

---

> last updated: {DateTime}

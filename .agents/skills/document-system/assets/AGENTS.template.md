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

- Before spawning any agent, read `.aiddbot/efforts.yaml`.
- Spawn the role the skill names (**Architect**, **Builder**, or **Craftsman**) as the agent.
- Map the requested effort (`low`, `medium`, `high`; `medium` when unstated) to the active harness's native controls in that file and pass them explicitly. Never keep the default model when a mapping applies.
- Inherit the parent's settings only when the harness, model, or control is unavailable.
- Journal every spawn with `record-journal`, naming the role, the requested effort, and the resolved model or native control. Journal an inherited setting with an amber status naming what was unavailable.

## Project decisions

- Model: `{Product_Folder}/model/model.schema.md`
- Database: `{Product_Folder}/model/{project}.db.schema.md` for each project that owns relational persistence
- API: `{Product_Folder}/model/{project}.api.schema.md` for each project that exposes endpoints
- {Project-specific decision needed to work safely.}

---

> last updated: {DateTime}

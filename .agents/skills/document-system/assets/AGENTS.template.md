# Project instructions

## Environment

- **Git**: {remote URL | local path} — {default branch `main` | `master`}
- **OS** `{Windows | Linux | MacOS}` — **Shell** `{cmd | PowerShell | bash | zsh | git bash}`
- **Time** {use ISO 8601 for DateTime timestamps}

## Paths

- **{Agents_File}** — `AGENTS.md` — this file
- **{Agents_Folder}** — `.agents/` — agent configuration and project rules
- **{Product_Folder}** — `.product/` | `docs/` | {chosen} — architecture and specs files
- **{Source_Folders}** — [`src/`, `e2e/`] | [`back/`, `front/`] | {chosen} — code files

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

- **Specs** — `{Product_Folder}/specs/S{nnnn}-{slug}/` holds `spec.md`, human-readable append-only `journal.log`, `verification.md`, and `qualification.md`. `specs/PRD.md` lists current requirements.
- **Counters** — `{Product_Folder}/counters.yaml` stores the last reserved S, F, T, and D numbers.
- **Quality** — `{Product_Folder}/quality/TDR.md` indexes open technical debt. `{Product_Folder}/quality/review.md` records detailed system-review evidence.
- **Keys** — use stable lowercase kebab-case slugs. IDs are never reused.
- **Spec state** — `draft`, `in-progress`, `verified`, `qualified`, or `shipped`.

## Git

- MANDATORY: Preserve work; no secrets; no destructive commands.
- Group related changes; keep commits small and focused.
- Conventional commit: `{feat|refactor|fix|chore|docs|test}(scope): {description}`
- Branch naming: `{feat|fix|chore}/S{nnnn}-{slug}`

## Project decisions

- Model: `{Product_Folder}/model/model.schema.md`
- {Project-specific decision needed to work safely.}

---

> last updated: {DateTime}

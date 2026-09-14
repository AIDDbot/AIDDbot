# Project instructions

## Environment

- **Git**: {remote URL | local path} — {default branch `main` | `master`}
- **OS** `{Windows | Linux | MacOS}` — **Shell** `{cmd | PowerShell | bash | zsh | git bash}`
- **Time** {use ISO 8601 for DateTime timestamps}

## Paths

- **{Agents_File}** — `AGENTS.md` — this file
- **{Agents_Folder}** — `.agents/` — agent skills, rules, and hooks
- **{Product_Folder}** — `.product/` | `docs/` | {chosen} — architecture and specs files
- **{Source_Folders}** — [`src/`, `e2e/`] | [`back/`, `front/`] | {chosen} — code files

## Product

### Problem

{What the product solves.}

### Solution

| Container | Source path | Responsibility | Rules |
| --- | --- | --- | --- |
| {container} | `{source_root}/` | {one-line responsibility} | [rules](.agents/rules/{container}.rules.md) |

{Only necessary cross-container facts.}

### Verification

{Project-level checks and expected evidence.}

## Delivery documents

- **Specs** — `{Product_Folder}/specs/S{nnnn}-{slug}/` holds `spec.md`, `verification.md`, and `qualification.md`. `specs/PRD.md` lists current requirements.
- **Counters** — `{Product_Folder}/counters.yaml` stores the last reserved S, F, T, and Q numbers.
- **Quality** — `{Product_Folder}/quality/findings.md` lists open quality findings. `quality/review.md` records tool discovery.
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

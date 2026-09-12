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

## Delivery documents

- **Changes** — `{Product_Folder}/changes/C{nnn}-{slug}/` holds `change.md` and evidence `report.md`.
- **Specs** — `{Product_Folder}/specs/F{nnn}-{slug}.md` and `T{nnn}-{slug}.md` are durable contracts; `specs/PRD.md` is their generated index.
- **Findings** — `{Product_Folder}/findings.md` holds unresolved durable findings.
- **Keys** — use stable lowercase kebab-case slugs; reserve independent F, T, and C counters without reuse. Durable criteria are `AC-F{nnn}.n` or `AC-T{nnn}.n`.
- **Change state** — `open`, `released`, or `cancelled`; evidence, not an intermediate state, determines release readiness.

## Git

- MANDATORY: Preserve work; no secrets; no destructive commands.
- Group related changes; keep commits small and focused.
- Conventional commit: `{feat|refactor|fix|chore|docs|test}(scope): {description}`
- Branch naming: `change/{change_key}`

## Project decisions

- Architecture: `{Product_Folder}/arch/system.arch.md`
- Model: `{Product_Folder}/model/model.schema.md`
- {Project-specific decision needed to work safely.}

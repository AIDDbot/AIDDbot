---
name: explore
description: Generates agent rules, system architecture, conceptual model schema, and the PRD shell.
user-invocable: true
disable-model-invocation: true
---
# Explore

## Role
Act as Senior Software Architect.

## Task
Generate the agent-rules file, system architecture, conceptual model schema, and the
PRD shell.

### Guardrails
- **Evidence** — do not invent facts; key statements need repo evidence or an answer.
- **Questions** — ask closed-ended clarifications unless told to use defaults.
- **Assumptions** — label fallbacks as assumptions and ask for confirmation.
- **Defaults** — when prescribing, prefer one strong default over a menu.
- **Observe** — never redesign what exists; flag contradictions instead.
- **Scope** — read the tree and Guide files only; never application source.
- **Docs** — document what exists; prescribe defaults only where nothing exists.
- **PRD shell** — create `specs/PRD.md` once; never append category lines (`/specify`).

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Model}` = `{Product_Folder}/model`.
- `{PRD}` = `{Product_Folder}/specs/PRD.md`.

### Inputs
- [ ] Required: The repository tree.

### References
- _read_ [agent-rules template](./assets/AGENTS.template.md).
- _read_ [system architecture template](./assets/system.arch.template.md).
- _read_ [model schema template](./assets/model.schema.template.md).
- _read_ [PRD template](./assets/PRD.template.md).

### Glossary
- **{Agents_File}** — root agent-rules file; `AGENTS.md` (default) | `CLAUDE.md`.
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`) — C4 L2.
- **Tier** — a container's layer: `front | back | db | e2e | fullstack`.
- **Guide files** — `README.md`, `CHANGELOG.md`, `package.json`, `pom.xml`, `go.mod`.
- **PRD** — functional log shell; category lines added later by `/specify`.

## Steps
### 1. Research
- _read_ Guide files first (`README.md`, root manifests, container READMEs, scripts).
- _detect_ the OS, shell, and remote Git repository.
- _detect_ `{Product_Folder}` and `{Source_Folders}`.
- _if_ those paths are absent, _propose_ defaults.
- _derive_ the problem and solution from existing docs.
- _if_ problem or solution is absent, _propose_ defaults.
- _identify_ the containers and their tiers from folders and Guide files.
- _if_ no containers exist, _prescribe_ defaults.
- _identify_ the domain entities and relationships from existing docs.
- _if_ entities are absent, _propose_ defaults.
- _ask_ me to clarify the context one question at a time with closed-ended answers.
- _stop_ before drafting documents.

### 2. Plan
- _map_ each References template placeholder to Guide-file evidence or a user answer.
- _if_ a placeholder has no evidence, _ask_ a focused yes/no or multiple-choice question.
- _prepare_ the PRD product paragraph; leave categories empty until `/specify`.

### 3. Implement
- _write_ `{Agents_File}` — under 100 lines, concise.
- _write_ `{Arch}/system.arch.md` — include **Tier** per container.
- _write_ `{Model}/model.schema.md` — entities and relationships only; no attributes.
- _if_ `{PRD}` is missing, _write_ `{PRD}` from the PRD template (shell only).
- _commit_ the changes (`docs(explore): {description}`).
- _for-each_ container, _handoff_ to `/extract`.

## Verification
- [ ] `{Agents_File}`, `{Arch}/system.arch.md`, `{Model}/model.schema.md`, and `{PRD}` exist.
- [ ] Each container lists **Tier**; no empty placeholders; model has no attributes.
- [ ] `{PRD}` has the product paragraph; no fabricated category entries.
- [ ] No unresolved assumptions remain.

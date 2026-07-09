---
name: extract
description: Documents the architecture (C4 L3), domain model, and code rules for one container.
user-invocable: true
disable-model-invocation: true
---
# Extract

## Role
Act as Senior Software Architect.

## Task
Generate one container's component architecture, code-rules, API schema, db schema, and ER documents.

## Guardrails
- **One container per run** — `fullstack` counts as one, following Front and Back together.
- **Do not invent facts.** If evidence is missing, ask first.
- **Questions are mandatory.** Ask me closed-ended clarification questions, unless explicitly told to use defaults.
- **Evidence first.** Every key statement in generated docs must be traceable to repository evidence.
- **No silent assumptions.** If you use a fallback/default, label it as an assumption and ask for confirmation.
- **Never invent requirements** — propose and ask the user.
- **One strong default** — when prescribing, prefer one default over a menu of options.
- **Observe, don't reform** — never redesign what exists; flag contradictions instead.

The goal is to document what exists and prescribe defaults only where nothing exists.

## Context

- `{Arch}` = `{Product_Folder}/arch`
- `{Model}` = `{Product_Folder}/model`
- `{Rules}` = `{Agents_Folder}/rules`

### Inputs
- Optional: The container to document.

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **Tier** — a container's layer: `front | back | db | e2e | fullstack`.
- **Component** — an internal building block of one container — C4 L3.

## Steps
### 1. Research
- _read_ [root agent rules]({Agents_File}).
- _read_ [system architecture]({Arch}/system.arch.md).
- Pick the target container; _if_ ambiguous or not given, ask which one.
- _if_ it exposes an API _read_ [API schema template](../assets/api.schema.template.md).
- _if_ it owns the db store _read_ [db schema template](../assets/db.schema.template.md).
- _if_ it owns the domain model _read_ [ER template](../assets/ER.template.md).
- _ask_ me to clarify the context one question at a time with closed-ended answers.

### 2. Plan
- _read_ [container arch template](./assets/container.arch.template.md).
- _read_ [code rules template](./assets/code.rules.template.md).
- Prepare the content for the templates' placeholders.
- _if_ a placeholder has no evidence, ask a focused yes/no or multiple-choice question.

### 3. Implement
- _write_ `{Arch}/{container}.arch.md`; link it from `system.arch.md`.
- _write_ `{Rules}/{container}.rules.md`. Adapt front-matter to agent harness.
- _if_ it exposes an API _write_ `{Model}/api.schema.md`.
- _if_ it owns the db store _write_ `{Model}/db.schema.md`.
- _if_ it owns the domain model _write_ `{Model}/ER.md`.
- Commit (`docs: {description}`).
- _if_ containers remain, _handoff_ to `/extract` per container; else _handoff_ to `/specify`.

## Verification
- [ ] `{Arch}/{container}.arch.md` and `{Rules}/{container}.rules.md` must exist, no empty placeholders.
- [ ] `{Model}/api.schema.md`, `{Model}/db.schema.md`, and `{Model}/ER.md` may exist, no empty placeholders.	
- [ ] No unresolved assumptions remain.
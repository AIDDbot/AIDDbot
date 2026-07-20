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
Generate one container's C4 L3 architecture, code rules, and model docs.

### Guardrails
- **One container** — `fullstack` counts as one; document Front and Back together.
- **Evidence** — do not invent facts; key statements need repo evidence or an answer.
- **Questions** — ask closed-ended clarifications unless told to use defaults.
- **Assumptions** — label fallbacks as assumptions and ask for confirmation.
- **Defaults** — when prescribing, prefer one strong default over a menu.
- **Observe** — never redesign what exists; flag contradictions instead.
- **Requirements** — never invent requirements; propose and ask the user.
- **Docs** — document what exists; prescribe defaults only where nothing exists.

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Model}` = `{Product_Folder}/model`.
- `{Rules}` = `{Agents_Folder}/rules`.

### Inputs
- [ ] Required: `{Arch}/system.arch.md` and `{Agents_File}` from `/explore`.
- [ ] Optional: The container to document.

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`) — C4 L2.
- **Tier** — a container's layer: `front | back | db | e2e | fullstack`.
- **Component** — an internal building block of one container — C4 L3.

## Steps
### 1. Research
- _read_ [root agent rules]({Agents_File}).
- _read_ [system architecture]({Arch}/system.arch.md).
- _select_ the target container from `system.arch.md`.
- _if_ the container is ambiguous or not given, ask which one.
- _if_ it exposes an API, _read_ [API schema template](./assets/api.schema.template.md).
- _if_ it owns the db store, _read_ [db schema template](./assets/db.schema.template.md).
- _if_ it owns the domain model, _read_ [ER template](./assets/ER.template.md).
- _ask_ me to clarify the context one question at a time with closed-ended answers.

### 2. Plan
- _read_ [container arch template](./assets/container.arch.template.md).
- _read_ [code rules template](./assets/code.rules.template.md).
- _map_ each template placeholder to source evidence or an explicit user answer.
- _if_ a placeholder has no evidence, ask a focused yes/no or multiple-choice question.

### 3. Implement
- _write_ `{Arch}/{container}.arch.md` — link it from `system.arch.md`.
- _write_ `{Rules}/{container}.rules.md` — adapt front-matter to the agent harness.
- _if_ it exposes an API, _write_ `{Model}/api.schema.md`.
- _if_ it owns the db store, _write_ `{Model}/db.schema.md`.
- _if_ it owns the domain model, _write_ `{Model}/ER.md`.
- _commit_ the changes (`docs: {description}`).
- _if_ containers remain, _handoff_ to `/extract`.
- _if_ no containers remain, _handoff_ to `/specify`.

## Verification
- [ ] `{Arch}/{container}.arch.md` and `{Rules}/{container}.rules.md` exist, no placeholders.
- [ ] Optional model docs exist when applicable, with no empty placeholders.
- [ ] No unresolved assumptions remain.

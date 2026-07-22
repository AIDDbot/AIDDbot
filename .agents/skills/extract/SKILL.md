---
name: extract
description: Documents one container's arch or schema, code rules, and API shapes.
user-invocable: true
disable-model-invocation: true
---
# Extract

## Role
Act as Senior Software Architect.

## Task
Document one container: architecture or relational schema, code rules,
and an API schema when it exposes an API.

### Guardrails
- **One container** — `fullstack` counts as one; document Front and Back together.
- **Evidence** — do not invent facts; key statements need repo evidence or an answer.
- **Questions** — ask closed-ended clarifications unless told to use defaults.
- **Assumptions** — label fallbacks as assumptions and ask for confirmation.
- **Defaults** — when prescribing, prefer one strong default over a menu.
- **Observe** — never redesign what exists; flag contradictions instead.
- **Requirements** — never invent requirements; propose and ask the user.
- **Docs** — document what exists; prescribe defaults only where nothing exists.
- **Enforceable rules** — encode machine-checkable rules in the toolchain; keep prose for the rest.

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Model}` = `{Product_Folder}/model`.
- `{Rules}` = `{Agents_Folder}/rules`.

### Inputs
- [ ] Required: `{Arch}/system.arch.md` and `{Agents_File}` from `/explore`.
- [ ] Optional: The container to document.

### References
- _read_ [code rules template](./assets/container.rules.template.md).

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`) — C4 L2.
- **Tier** — a container's layer: `front | back | db | e2e | fullstack`.
- **Component** — an internal building block of one container — C4 L3.
- **Guide files** — `README.md`, `CHANGELOG.md`, `package.json`, `pom.xml`, `go.mod`.

## Steps
### 1. Research
- _read_ [root agent rules]({Agents_File}).
- _read_ [system architecture]({Arch}/system.arch.md).
- _select_ the target container and its **Tier** from `system.arch.md`.
- _if_ the container is ambiguous or not given, _ask_ which one.
- _read_ the container folder, its Guide files, and representative source files.
- _ask_ me to clarify the context one question at a time with closed-ended answers.

### 2. Plan
- _if_ the tier is `db`, _read_ [relational schema template](./assets/db.schema.template.md).
- _if_ the tier is not `db`, _read_ [container arch template](./assets/container.arch.template.md).
- _if_ it exposes an API, _read_ [API schema template](./assets/api.schema.template.md).
- _map_ each template placeholder to source evidence or an explicit user answer.
- _if_ a placeholder has no evidence, _ask_ a focused yes/no or multiple-choice question.

### 3. Implement
- _if_ the tier is `db`, _write_ `{Model}/db.schema.md`.
- _if_ the tier is not `db`, _write_ `{Arch}/{container}.arch.md`.
- _update_ the container **Detail** link in `{Arch}/system.arch.md`.
- _write_ `{Rules}/{container}.rules.md` with harness-adapted front-matter.
- _split_ rules: encode machine-checkable ones in the toolchain; leave advisory ones as prose.
- _if_ it exposes an API, _write_ `{Model}/api.schema.md` (merge endpoints if present).
- _commit_ the changes (`docs(extract): {description}`).
- _if_ containers remain, _handoff_ to `/extract`.
- _if_ no containers remain, _handoff_ to `/specify`.

## Verification
- [ ] `{Rules}/{container}.rules.md` exists, with no empty placeholders.
- [ ] Arch exists when tier is not `db`; `{Model}/db.schema.md` when tier is `db`.
- [ ] `{Model}/api.schema.md` exists when the container exposes an API.
- [ ] `system.arch.md` **Detail** link points at the written artifact.
- [ ] No unresolved assumptions remain.

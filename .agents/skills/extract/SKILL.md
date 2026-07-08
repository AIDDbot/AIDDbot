---
name: extract
description: Documents the architecture (C4 L3) and code rules for one container.
user-invocable: true
disable-model-invocation: true
---
# Extract

## Role
Act as Senior Software Architect.

## Task
Generate one container's component architecture and code-rules documents.

## Guardrails
- **One container per run** — `fullstack` counts as one, following Front and Back together.

## Context

- `{Arch}` = `{Product_Folder}/arch`
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
- Pick the target container or ask which one if ambiguous or not given.
- _read_ [the extract guide, evidence wins](./references/extract.guide.md).
- _ask_ me to clarify the context one question at a time with closed-ended answers.

### 2. Plan
- _read_ [container arch template](./assets/container.arch.template.md).
- _read_ [code rules template](./assets/code.rules.template.md).
- Prepare the content for the templates' placeholders.

### 3. Implement
- _write_ `{Arch}/{container}.arch.md`; link it from `system.arch.md`.
- _write_ the shared docs of the tier, link them when appropriate.
- _write_ `{Rules}/{container}.rules.md`. Adapt front-matter to agent harness.
- Commit (`docs: {description}`).
- If containers remain, _handoff_ to `/extract` per container; else _handoff_ to `/specify`.

## Verification
- [ ] `{Arch}/{container}.arch.md` and `{Rules}/{container}.rules.md` exist, no empty placeholders.
- [ ] Tier docs exist when applicable: `{container}.db.schema.md`, `{container}.api.schema.md`,
  and the single `ER.md`.

---
name: extract
description: Documents one container's component architecture (C4 L3) and code rules; prescribes new, extracts existing.
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
- **Shared docs are singletons** — create once, then update and link.

## Context

- `{Arch}` = `{Product_Folder}/arch`; `{Rules}` = `{Agents_Folder}/rules`.

### Inputs
- Optional: The container to document.

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **Tier** — a container's physical layer: `front | back | db | e2e | fullstack`.
- **Component** — an internal building block of one container — C4 L3.
- **Mode** — `greenfield` (no code, prescribe) | `brownfield` (code exists, extract).

## Steps
### 1. Research
- _read_ [root agent rules]({Agents_File}).
- _read_ [system architecture]({Arch}/system.arch.md).
- Pick the target container or ask which one if ambiguous or not given.
- _read_ [the container tier guide](./references/{tier}.guide.md).
- Classify the mode by whether the container has source code.
- _read_ [the mode guide, prescribe vs extract](./references/{mode}.guide.md).
- Ask me to clarify the context one question at a time with closed-ended answers.

### 2. Plan
- Prepare components, contracts & data, code organization, naming, and one canonical example.
- Keep field detail out of `{container}.arch.md`; it lists the surface and links the schemas.

### 3. Implement
- Write `{Arch}/{container}.arch.md`; link it from `system.arch.md`.
- Write the shared docs of the tier, applying **Shared docs are singletons**.
- Write `{Rules}/{container}.rules.md`.
- Commit (`docs: {description}`).
- If containers remain, → `/extract` again; else → `/specify`.

## Verification
- [ ] `{Arch}/{container}.arch.md` and `{Rules}/{container}.rules.md` exist, no empty placeholders.
- [ ] Shared docs (`db.schema.md`, `api.schema.md`, `ER.md`) exist once their tier is extracted.

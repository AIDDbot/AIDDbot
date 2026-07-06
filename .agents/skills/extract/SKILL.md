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
1. **One container per run** — `fullstack` counts as one, following Front and Back together.

## Context

- `{Arch}` = `{Product_Folder}/arch`; `{Rules}` = `{Agents_Folder}/rules`.

### Inputs
- [root agent rules]({Agents_File}) **always**
- [system architecture]({Arch}/system.arch.md) **always**
- The container to document.
> Not given? Ask which one.

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **Tier** — a container's layer: `front | back | db | e2e | fullstack`.
- **Component** — an internal building block of one container — C4 L3.
- **Mode** — `greenfield` (no code → prescribe) | `brownfield` (with code → extract).

## Steps
### 1. Research
- List containers from `system.arch.md`; pick one (ask if ambiguous).
- Classify the mode by whether the container has source code.
- _follow_ [the tier guide, lists the templates to write](./references/{tier}.guide.md).
- _follow_ [the mode guide, prescribe vs extract](./references/{mode}.guide.md).

### 2. Plan
- Read the templates the tier guide lists.
- Prepare components, contracts & data, code organization, naming, and one canonical example.
- Keep field detail out of `{container}.arch.md`; it lists the surface and links the schemas.

### 3. Implement
- Write `{Arch}/{container}.arch.md`; link it from `system.arch.md`.
- Write the shared docs the tier guide calls for (`db.schema.md`, `api.schema.md`, `ER.md`).
> Shared docs: create once, then update; link from every container that reads or writes them.
- Write `{Rules}/{container}.rules.md`.
- Commit (`docs:`); repeat for the next container, or → `/specify`.

## Verification
- [ ] `{Arch}/{container}.arch.md` and `{Rules}/{container}.rules.md` exist, no empty placeholders.
- [ ] Shared docs (`db.schema.md`, `api.schema.md`, `ER.md`) exist once their tier is extracted.

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
- Listing only — read each item when needed.
- `{Arch}` = `{Product_Folder}/arch`; `{Rules}` = `{Agents_Folder}/rules`.

### Inputs
- Root `{Agents_File}` and `{Arch}/system.arch.md`.
> Missing? Run `/explore` first.
- The container to document.
> Not given? Ask which one.

### References
Tier guides — read the one matching the container's tier; each lists its templates:
- [`Front Guide`](./references/front.guide.md) (if front).
- [`Back Guide`](./references/back.guide.md) (if back).
- [`DB Guide`](./references/db.guide.md) (if db).
- [`E2E Guide`](./references/e2e.guide.md) (if e2e).

Mode guides:
- [`Greenfield Guide`](./references/greenfield.guide.md) (if greenfield) — prescribes the design.
- [`Brownfield Guide`](./references/brownfield.guide.md) (if brownfield) — extracts the facts.

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **Tier** — a container's layer: `front | back | db | e2e | fullstack`.
- **Component** — an internal building block of one container — C4 L3.
- **Mode** — `greenfield` (no code → prescribe) | `brownfield` (with code → extract).

## Steps
### 1. Research
- List containers from `system.arch.md`; pick one (ask if ambiguous).
- Classify the mode by whether the container has source code.
- Read and follow the matching tier guide and mode guide.

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

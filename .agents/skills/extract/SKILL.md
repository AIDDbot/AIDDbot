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
For one container at a time, generate its component architecture and container code-rules documents.

## Context
- CAUTION: This is a listing. Read only when necessary.
- `{Arch}` = `{Product_Folder}/arch`; `{Rules}` = `{Agents_Folder}/rules`.

### Inputs
- Root `{Agents_File}`
- `{Arch}/system.arch.md`
> Run `/explore` first if missing.
- The container to document
> Ask which one if not given.

### References
Tier guides — read the one matching the container's tier; each lists the templates to write from:
- [`Front Guide`](./references/front.guide.md) (if front).
- [`Back Guide`](./references/back.guide.md) (if back).
- [`DB Guide`](./references/db.guide.md) (if db).
- [`E2E Guide`](./references/e2e.guide.md) (if e2e).
> A `fullstack` container follows the Front and Back guides together.

Mode guides:
- [`Greenfield Guide`](./references/greenfield.guide.md) (if greenfield) — prescribes the design.
- [`Brownfield Guide`](./references/brownfield.guide.md) (if brownfield) — extracts the facts.

### Glossary
- **Container** — a named runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **Tier** — the layer a container belongs to (`front | back | db | e2e | fullstack`).
- **Component** — an internal building block of one container — C4 L3.
- **Mode** — `greenfield` (no code → prescribe) or `brownfield` (with code → extract).

## Steps
### 1. Research
- List containers from `system.arch.md`; pick one (ask if ambiguous).
- Classify as **greenfield | brownfield** by whether it already has source code.
- Read the tier guide for the container's tier and the mode guide for its mode; follow both.

### 2. Plan
- Read the templates listed in the tier guide.
- Prepare the content for one container: components, contracts & data, code organization,
  naming, conventions, and one canonical example.
- Keep field-level detail out of `{container}.arch.md` — it lists the contract surface and
  links the schema files.

### 3. Implement
- Write `{Arch}/{container}.arch.md` and link it from `system.arch.md`.
- Write the shared docs the tier guide calls for (`db.schema.md`, `api.schema.md`, `ER.md`)
  — create once, then update; link them from any container that reads or writes them.
- Write `{Rules}/{container}.rules.md`.
- Commit the changes (`docs:`).
- Repeat for the next container, or suggest handoff to the `/specify` skill.

## Verification
- [ ] The following files exist, are in the correct format, and do not contain empty placeholders:
  - `{Arch}/{container}.arch.md`
  - `{Arch}/db.schema.md` — once a persistence container has been extracted.
  - `{Arch}/api.schema.md` — once an API container has been extracted.
  - `{Arch}/ER.md` — once the back container has been extracted.
  - `{Rules}/{container}.rules.md`

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
- [`container.arch.template.md`](./assets/container.arch.template.md) (write-from, always).
- [`code.rules.template.md`](./assets/code.rules.template.md) (write-from, always).
- [`db.schema.template.md`](./assets/db.schema.template.md) (write-from, if it owns the store) —
  writes `db.schema.md`.
- [`api.schema.template.md`](./assets/api.schema.template.md) (write-from, if it exposes an API) —
  writes `api.schema.md`.

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
- Read and follow the appropriate reference guide.

### 2. Plan
- Read the `container.arch.template.md` and `code.rules.template.md` templates.
- Read `db.schema.template.md` when this container owns the store, `api.schema.template.md`
  when it exposes an API.
- Prepare the content for one container: components, contracts & data, code organization,
  naming, conventions, and one canonical example.
- Keep field-level detail out of `{container}.arch.md` — it lists the contract surface and
  links the schema files.

### 3. Implement
- Write `{Arch}/{container}.arch.md` and link it from `system.arch.md`.
- If this container owns the store, write `{Arch}/db.schema.md` (create once; then update).
- If this container exposes an API, write `{Arch}/api.schema.md` (create once; then update).
- Link `db.schema.md` / `api.schema.md` from any container that reads or writes them.
- Write `{Rules}/{container}.rules.md`.
- Commit the changes (`docs:`).
- Repeat for the next container, or suggest handoff to the `/specify` skill.

## Verification
- [ ] The following files exist, are in the correct format, and do not contain empty placeholders:
  - `{Arch}/{container}.arch.md`
  - `{Arch}/db.schema.md` — once a persistence container has been extracted.
  - `{Arch}/api.schema.md` — once an API container has been extracted.
  - `{Rules}/{container}.rules.md`

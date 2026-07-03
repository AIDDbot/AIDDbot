---
name: extract
description: Documents one container in depth — its component architecture (C4 L3) and container code rules. In new containers, it prescribes; in existing ones, it extracts information.
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
- [`container.arch.template.md`](./assets/container.arch.template.md) (write-from, always) — output file template.
- [`code.rules.template.md`](./assets/code.rules.template.md) (write-from, always) — output file template.
- [`db.schema.template.md`](./assets/db.schema.template.md) (write-from, if this container owns the persistence store) — system-wide database schema in its own file (`db.schema.md`).
- [`api.schema.template.md`](./assets/api.schema.template.md) (write-from, if this container exposes an API) — system-wide API schema in its own file (`api.schema.md`).

Mode guides:
- [`Greenfield Guide`](./references/greenfield.guide.md) (if greenfield) — no code; prescribes the intended design.
- [`Brownfield Guide`](./references/brownfield.guide.md) (if brownfield) — existing code; extracts facts from the implementation.

### Glossary
- **Container** — a named runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4model Level 2.
- **Tier** — the physical/technological layer to which a container belongs (`front | back | db | e2e | fullstack`).
- **Component** — an internal building block of one container — C4model Level 3.
- **Mode** — `greenfield` (no code → prescribe) or `brownfield` (with code → extract).

## Steps
### 1. Research
- List containers from `system.arch.md`; pick one (ask if ambiguous).
- Classify as **greenfield | brownfield** by whether it already has source code.
- Read and follow the appropriate reference guide.

### 2. Plan
- Read the `container.arch.template.md` template.
- Read the `code.rules.template.md` template.
- Read the `db.schema.template.md` template when this container owns the persistence store; read the `api.schema.template.md` template when it exposes an API.
- Prepare the content to fill in the placeholders, scoped to this one container — components, contracts & data, code organization, naming, conventions, and one canonical example.
- Keep field-level detail out of `{container}.arch.md`: the container arch lists the contract surface and links the schema files.

### 3. Implement
- Write `{Arch}/{container}.arch.md` and link it from `system.arch.md`.
- When this container owns the persistence store, write `{Arch}/db.schema.md` (create once; update if it exists).
- When this container exposes an API, write `{Arch}/api.schema.md` (create once; update if it exists).
- Link `db.schema.md` / `api.schema.md` form any cointainer that reads/writes or consumes them.
- Write `{Rules}/{container}.rules.md`.
- Commit the changes (`docs:`).
- Repeat for the next container, or suggest handoff to the `/specify` skill.

## Verification
- [ ] The following files exist, are in the correct format, and do not contain empty placeholders:
  - `{Arch}/{container}.arch.md`
  - `{Arch}/db.schema.md` — once a persistence container has been extracted.
  - `{Arch}/api.schema.md` — once an API container has been extracted.
  - `{Rules}/{container}.rules.md`

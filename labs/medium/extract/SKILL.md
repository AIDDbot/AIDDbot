---
name: extract
description: Document one container in depth — C4 L3 components + container code rules. Greenfield prescribes; brownfield extracts.
user-invocable: true
disable-model-invocation: true
---

# Extract skill

## Role
Senior software architect.

## Task
For **one container at a time**, generate its component architecture and container code-rules documents.

## Context
### Input
- Root `{Agents_File}` (`AGENTS.md` | `CLAUDE.md`) and `{Product_Folder}/arch/system.arch.md` (run `/explore` first if missing).
- The container to document (ask which one if not given).

### References
- CAUTION: Read ONLY ONE (green or brown) 
- Mode guides (read the one that matches the container's mode):
  - [`mode.greenfield.md`](./references/mode.greenfield.md) — no code; prescribe the intended design.
  - [`mode.brownfield.md`](./references/mode.brownfield.md) — existing code; extract facts.

### Assets
- [`container.arch.template.md`](./assets/container.arch.template.md),
- [`code.rules.template.md`](./assets/code.rules.template.md).

### Glossary
- **Container** — a named runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2. Units are always identified by container name.
- **Tier** — the physical/technological layer a container belongs to (`front | back | db | e2e | fullstack`) — corporate jargon. A tier classifies containers (and selects stack conventions), never identifies one.
- **Component** — an internal building block of one container (C4 L3).
- **Mode** — `greenfield` (no code → prescribe) or `brownfield` (code exists → extract).

## Steps
### Step 1: Select
- [ ] List containers from `system.arch.md`; pick one (ask if ambiguous).
- [ ] Decide its mode by whether it already has source code (code = brownfield, none = greenfield).
- [ ] Read and follow the matching `mode.*.md`.

### Step 2: Container architecture
- [ ] Fill `container.arch.template.md` for this container only — C4 L3 components diagram, code organization, key contracts.
- [ ] Include domain entities, data schemas, and api endpoints where relevant.

### Step 3: Container code rules
- [ ] Fill `code.rules.template.md`, scoped to this container's source glob — naming, artifact roles, conventions, and one canonical example.

## Output
- [ ] Write `{Product_Folder}/arch/{container}.arch.md` and link it from `system.arch.md`.
- [ ] Write `{Agents_Folder}/rules/{container}.rules.md`.
- [ ] Commit (`docs`); repeat for the next container, or suggest `/specify`.

## Verification
- [ ] Both files exist, are well formatted, and have no `{placeholders}` left.

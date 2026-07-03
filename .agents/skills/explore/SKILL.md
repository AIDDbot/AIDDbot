---
name: explore
description: Generates the root agent-rules file and system architecture doc; prescribes new, extracts existing.
user-invocable: true
disable-model-invocation: true
---
# Explore

## Role
Act as Senior Software Architect.

## Task
Generate the rule file for agents and the system architecture document.

## Context
- CAUTION: This is a listing. Read only when necessary.
- `{Arch}` = `{Product_Folder}/arch`.

### Inputs
- Existing source code in the repository root, if any.

### References
- [`AGENTS.template.md`](./assets/AGENTS.template.md) (write-from, always).
- [`system.arch.template.md`](./assets/system.arch.template.md) (write-from, always).
- [`ER.template.md`](./assets/ER.template.md) (write-from, always).

Mode guides:
- [`Greenfield Guide`](./references/greenfield.guide.md) (if greenfield) — prescribes defaults.
- [`Brownfield Guide`](./references/brownfield.guide.md) (if brownfield) — documents the code.

### Glossary
- **Container** — an executable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **Level** — the layer a container belongs to (`front | back | db | e2e | fullstack`).
- **Mode** — `greenfield` (no code → prescribe) or `brownfield` (with code → extract).
- **{Agents_File}** — root agent-rules file; `AGENTS.md` (default) | `CLAUDE.md` (Claude Code).
- **Guide files** — `README.md`, `CHANGELOG.md`, `package.json`, `pom.xml`, `go.mod`...

## Steps
### 1. Research
- Infer the operating system, shell, and remote Git repository.
- Look for (and read) well-known guide files.
- Classify as **greenfield | brownfield**, then read and follow the appropriate reference guide.

### 2. Plan
- Read the `AGENTS.template.md` template.
- Read the `system.arch.template.md` template.
- Read the `ER.template.md` template.
- Prepare the content to fill in the placeholders in the templates.

### 3. Implement
- Write the `{Agents_File}` and keep it short (< 100 lines) and concise.
- Write `{Arch}/system.arch.md`.
- Write `{Arch}/ER.md` (the domain ER diagram, linked from `system.arch.md`).
- Commit the changes (`docs:`).
- Suggest handoffs to the `/extract` skill per container.

## Verification
- [ ] The following files exist, are in the correct format, and do not contain empty placeholders:
  - `{Agents_File}`
  - `{Arch}/system.arch.md`
  - `{Arch}/ER.md`

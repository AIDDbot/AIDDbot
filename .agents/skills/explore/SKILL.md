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
Generate the agent-rules file and the system architecture document.

## Guardrails
1. **Structure and config only** — never read code files; business logic is `/extract`'s job.

## Context
- Listing only — read each item when needed.
- `{Arch}` = `{Product_Folder}/arch`.

### Inputs
- The repository tree and guide files, if any.

### References
- [agent-rules template](./assets/AGENTS.template.md) _write-from_ **always**
- [system architecture template](./assets/system.arch.template.md) _write-from_ **always**
- [mode guide, prescribe vs document](./references/{mode}.guide.md) _read_ **one per {mode}**

### Glossary
- **Container** — an executable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **Tier** — a container's layer: `front | back | db | e2e | fullstack`.
- **Mode** — `greenfield` (no code → prescribe) | `brownfield` (with code → extract).
- **{Agents_File}** — root agent-rules file; `AGENTS.md` (default) | `CLAUDE.md` (Claude Code).
- **Guide files** — `README.md`, `CHANGELOG.md`, `package.json`, `pom.xml`, `go.mod`...

## Steps
### 1. Research
- Infer the operating system, shell, and remote Git repository.
- Read the guide files found.
- Classify the mode; read and follow its guide.

### 2. Plan
- Read both templates; prepare the content for their placeholders.

### 3. Implement
- Write `{Agents_File}` — under 100 lines, concise.
- Write `{Arch}/system.arch.md`.
- Commit (`docs:`); → `/extract` per container.

## Verification
- [ ] `{Agents_File}` and `{Arch}/system.arch.md` exist, correct format, no empty placeholders.

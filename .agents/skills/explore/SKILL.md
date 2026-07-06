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
- **Structure and config only** — never read code files.

## Context

- `{Arch}` = `{Product_Folder}/arch`.

### Inputs
- The repository tree and guide files, if any.

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **Tier** — a container's layer: `front | back | db | e2e | fullstack`.
- **Mode** — `greenfield` (no code, prescribe) | `brownfield` (code exists, extract).
- **{Agents_File}** — root agent-rules file; `AGENTS.md` (default) | `CLAUDE.md` (Claude Code).
- **Guide files** — `README.md`, `CHANGELOG.md`, `package.json`, `pom.xml`, `go.mod`...

## Steps
### 1. Research
- Infer the operating system, shell, and remote Git repository.
- Read the guide files found.
- Classify the mode.
- _read_ [mode guide, prescribe vs document](./references/{mode}.guide.md).

### 2. Plan
- _read_ [agent-rules template](./assets/AGENTS.template.md).
- _read_ [system architecture template](./assets/system.arch.template.md).
- Prepare the content for the templates' placeholders.

### 3. Implement
- Write `{Agents_File}` — under 100 lines, concise.
- Write `{Arch}/system.arch.md`.
- Commit (`docs: {description}`); → `/extract` per container.

## Verification
- [ ] `{Agents_File}` and `{Arch}/system.arch.md` exist, correct format, no empty placeholders.

---
name: explore
description: Generates the root agent-rules file and system architecture doc.
user-invocable: true
disable-model-invocation: true
---
# Explore

## Role
Act as Senior Software Architect.

## Task
Generate the agent-rules file and the system architecture document.

## Context

- `{Arch}` = `{Product_Folder}/arch`.

### Inputs
- The repository tree.

### Glossary
- **{Agents_File}** — root agent-rules file; `AGENTS.md` (default) | `CLAUDE.md` (Claude Code).
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **Tier** — a container's layer: `front | back | db | e2e | fullstack`.
- **Guide files** — `README.md`, `CHANGELOG.md`, `package.json`, `pom.xml`, `go.mod`...

## Steps
### 1. Research
- _read_ [the explore guide, evidence wins](./references/explore.guide.md).
- _ask_ me to clarify the context one question at a time with closed-ended answers.

### 2. Plan
- _read_ [agent-rules template](./assets/AGENTS.template.md).
- _read_ [system architecture template](./assets/system.arch.template.md).
- Prepare the content for the templates' placeholders.

### 3. Implement
- _write_ `{Agents_File}` — under 100 lines, concise.
- _write_ `{Arch}/system.arch.md`.
- Commit (`docs: {description}`).
- _handoff_ to `/extract` per container.

## Verification
- [ ] `{Agents_File}` and `{Arch}/system.arch.md` exist, correct format, no empty placeholders.

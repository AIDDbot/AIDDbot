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

## Guardrails
- **Do not invent facts.** If evidence is missing, ask first.
- **Questions are mandatory.** Ask me closed-ended clarification questions, unless explicitly told to use defaults.
- **Evidence first.** Every key statement in generated docs must be traceable to repository evidence.
- **No silent assumptions.** If you use a fallback/default, label it as an assumption and ask for confirmation.
- **Never invent requirements** — propose and ask the user.
- **One strong default** — when prescribing, prefer one default over a menu of options.
- **Observe, don't reform** — never redesign what exists; flag contradictions instead.
- **Internals are out of your scope** — do not read or write code.

The goal is to document what exists and prescribe defaults only where nothing exists.

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
- _read_ core evidence **Guide files** first (`README.md`, root manifests, container READMEs, run scripts).
- Confirm the operating system, shell, and remote Git repository.
- Detect the `{Product_Folder}` and `{Source_Folders}`; _if_ absent, propose and ask.
- Get the problem + solution from existing docs; _if_ absent, propose and ask.
- Identify the containers (source code folders); _if_ none exist, prescribe and ask.
- _ask_ me to clarify the context one question at a time with closed-ended answers.
- _stop_ and wait for answers before drafting documents.

### 2. Plan
- _read_ [agent-rules template](./assets/AGENTS.template.md).
- _read_ [system architecture template](./assets/system.arch.template.md).
- Prepare the content for the templates' placeholders.
- Build an **Evidence Map** first: each placeholder -> source file(s) or explicit user answer.
- _if_ a placeholder has no evidence, ask a focused yes/no or multiple-choice question.

### 3. Implement
- _only if_ clarification gate is satisfied (questions answered or explicit "use defaults"):
- _write_ `{Agents_File}` — under 100 lines, concise.
- _write_ `{Arch}/system.arch.md`.
- Commit (`docs: {description}`).
- _handoff_ to `/extract` per container.

## Verification
- [ ] `{Agents_File}` and `{Arch}/system.arch.md` exist, correct format, no empty placeholders.
- [ ] No unresolved assumptions remain.

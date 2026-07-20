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

### Guardrails
- **Evidence** — do not invent facts; key statements need repo evidence or an answer.
- **Questions** — ask closed-ended clarifications unless told to use defaults.
- **Assumptions** — label fallbacks as assumptions and ask for confirmation.
- **Defaults** — when prescribing, prefer one strong default over a menu.
- **Observe** — never redesign what exists; flag contradictions instead.
- **Scope** — do not read or write application source code.
- **Docs** — document what exists; prescribe defaults only where nothing exists.

## Context

- `{Arch}` = `{Product_Folder}/arch`.

### Inputs
- [ ] Required: The repository tree.

### Glossary
- **{Agents_File}** — root agent-rules file; `AGENTS.md` (default) | `CLAUDE.md`.
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`) — C4 L2.
- **Tier** — a container's layer: `front | back | db | e2e | fullstack`.
- **Guide files** — `README.md`, `CHANGELOG.md`, `package.json`, `pom.xml`, `go.mod`.

## Steps
### 1. Research
- _read_ Guide files first (`README.md`, root manifests, container READMEs, scripts).
- _confirm_ the OS, shell, and remote Git repository.
- _detect_ `{Product_Folder}` and `{Source_Folders}`.
- _if_ those paths are absent, propose defaults and ask.
- _derive_ the problem and solution from existing docs.
- _if_ problem or solution is absent, propose and ask.
- _identify_ the containers from source folders.
- _if_ no containers exist, prescribe defaults and ask.
- _ask_ me to clarify the context one question at a time with closed-ended answers.
- _stop_ and wait for answers before drafting documents.

### 2. Plan
- _read_ [agent-rules template](./assets/AGENTS.template.md).
- _read_ [system architecture template](./assets/system.arch.template.md).
- _map_ each template placeholder to source file(s) or an explicit user answer.
- _if_ a placeholder has no evidence, ask a focused yes/no or multiple-choice question.

### 3. Implement
- _write_ `{Agents_File}` — under 100 lines, concise.
- _write_ `{Arch}/system.arch.md`.
- _commit_ the changes (`docs: {description}`).
- _for-each_ container, _handoff_ to `/extract`.

## Verification
- [ ] `{Agents_File}` and `{Arch}/system.arch.md` exist, correct format, no empty placeholders.
- [ ] No unresolved assumptions remain.

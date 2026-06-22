--- 
name: Explore
description: Configures the root rule file for agents and the system architecture document. In new projects, it prescribes; in existing projects, it extracts information.
user-invocable: true
disable-model-invocation: true
---
# Explore

Explore the project to generate the basic architecture documentation for agents.

## Role
Act as Senior Software Architect.

## Task
Generate the rule file for agents and the system architecture document.

## Context
- CAUTION: This is a listing. Read only when necessary.

### Input
- Existing source code in the repository root, if any.

### References

- Mode guides:
- [`Greenfield Guide`](./references/greenfield.guide.md) — no code; prescribes default values ​​and prompts the user.
- [`Brownfield Guide`](./references/brownfield.guide.md) — existing code; describes the implementation and confirms with the user.

### Resources
- Templates for output files:
- [`AGENTS.template.md`](./assets/AGENTS.template.md),
- [`system.arch.template.md`](./assets/system.arch.template.md).

### Glossary
- **Container** — an executable unit named in `system.arch.md` (`api`, `web`, `db`...) — C4model Level 2.
- **Level** — the physical/technological layer to which a container belongs (`front | back | db | e2e | fullstack`)
- **Mode** — `greenfield` (no code → prescribe) or `brownfield` (with code → extract).
- **{Agents_File}** — the root file of agent rules; `AGENTS.md` (default) | `CLAUDE.md` (Claude code).
- **Guide files** — `README.md`, `CHANGELOG.md`, `AGENTS.md`, `CLAUDE.md`, `package.json`, `pom.xml`, `go.mod`.


## Steps
### Step 1: Research
- Infer the operating system, shell, and remote Git repository.
- Look for (and read) well-known guide files.
- Classify as **greenfield | brownfield**, then read and follow the appropriate reference guide.

### Step 2: Plan the Content
- Read the `AGENTS.template.md` template.
- Read the `system.arch.template.md` template.
- Prepare the content to fill in the placeholders in the template.
- Ask essential clarifying questions with closed-ended answers.

## Implementation Output
- Write the `{Agents_File}` and keep it short (< 100 lines) and concise.
- Write `{Product_Folder}/arch/system.arch.md`.
- Commit the changes (`docs:`).
- Suggest handoffs to the `/extract` skill per container.

## Verification
- [ ] The following files exist, are in the correct format, and do not contain empty placeholders:
  - `{Agents_File}`
  - `{Product_Folder}/arch/system.arch.md`
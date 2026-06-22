---
name: Extract
description: Documents one container in depth — its component architecture (C4 L3) and container code rules. In new containers, it prescribes; in existing ones, it extracts information.
user-invocable: true
disable-model-invocation: true
---
# Extract

Document one container in depth to generate its component architecture and code rules for agents.

## Role
Act as Senior Software Architect.

## Task
For one container at a time, generate its component architecture and container code-rules documents.

## Context
- CAUTION: This is a listing. Read only when necessary.

### Input
- Root `{Agents_File}` 
- `{Product_Folder}/arch/system.arch.md`
> Run `/explore` first if missing.
- The container to document 
> Ask which one if not given.

### References

Mode guides:
- [`Greenfield Guide`](./references/greenfield.guide.md) — no code; prescribes the intended design.
- [`Brownfield Guide`](./references/brownfield.guide.md) — existing code; extracts facts from the implementation.

### Resources
Templates for output files:
- [`container.arch.template.md`](./assets/container.arch.template.md),
- [`code.rules.template.md`](./assets/code.rules.template.md).

### Glossary
- **Container** — a named runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4model Level 2.
- **Tier** — the physical/technological layer to which a container belongs (`front | back | db | e2e | fullstack`).
- **Component** — an internal building block of one container — C4model Level 3.
- **Mode** — `greenfield` (no code → prescribe) or `brownfield` (with code → extract).

## Steps
### Step 1: Research
- List containers from `system.arch.md`; pick one (ask if ambiguous).
- Classify as **greenfield | brownfield** by whether it already has source code.
- Read and follow the appropriate reference guide.

### Step 2: Plan the Content
- Read the `container.arch.template.md` template.
- Read the `code.rules.template.md` template.
- Prepare the content to fill in the placeholders, scoped to this one container — components, contracts & data, code organization, naming, conventions, and one canonical example.
- Ask essential clarifying questions with closed-ended answers.

## Implementation Output
- Write `{Product_Folder}/arch/{container}.arch.md` and link it from `system.arch.md`.
- Write `{Agents_Folder}/rules/{container}.rules.md`.
- Commit the changes (`docs:`).
- Repeat for the next container, or suggest handoff to the `/specify` skill.

## Verification
- [ ] The following files exist, are in the correct format, and do not contain empty placeholders:
  - `{Product_Folder}/arch/{container}.arch.md`
  - `{Agents_Folder}/rules/{container}.rules.md`

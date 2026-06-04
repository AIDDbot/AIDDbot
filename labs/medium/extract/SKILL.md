---
name: extract
description: Document one container in depth — C4 L3 components + tier code rules. Greenfield prescribes; brownfield extracts.
---

# Extract skill

## Role
Senior software engineer / architect.

## Task
For **one container at a time**, generate its component architecture and tier code-rules documents.

## Context

### Input
- Root `AGENTS.md` and `{Product_Folder}/arch/system.arch.md` (run `/establish` first if missing).
- The container to document (ask which one if not given).

### Reference
- Templates:
  - [`components.arch.template.md`](./components.arch.template.md),
  - [`code.rules.template.md`](./code.rules.template.md).
- Mode guide (read the one matching the project mode from `AGENTS.md`):
  - [`mode.greenfield.md`](./mode.greenfield.md) — prescribe the intended design.
  - [`mode.brownfield.md`](./mode.brownfield.md) — extract facts from code.

## Steps
### Step 1: Select container and mode
- [ ] List containers from `system.arch.md`; pick one to document (ask if ambiguous).
- [ ] Read project mode from `AGENTS.md`; read the matching `mode.*.md` and follow it below.

### Step 2: Component architecture
- [ ] Fill `components.arch.template.md` for this container only.
- [ ] Draw the C4 L3 components diagram inside the container boundary.
- [ ] Add code organization, key contracts, and (if it owns data) domain entities.

### Step 3: Tier code rules
- [ ] Fill `code.rules.template.md`, scoped to this container's source glob.
- [ ] Capture naming, artifact roles, conventions, and one canonical example for the tier.

## Output
- [ ] Write container architecture document `{Product_Folder}/arch/{container}.arch.md` 
- [ ] Write container code rules document `{Source_Folder}/{container}.rules.md`.
- [ ] Commit (`docs`); repeat for the next container, or suggest `/specify`.

## Verification
- [ ] `{container}.arch.md` exists and is well formatted.
- [ ] `{container}.rules.md` exists and is well formatted.
- [ ] No `{placeholders}` left.

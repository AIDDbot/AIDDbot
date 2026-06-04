---
name: establish
description: Set up rules and architecture document for the current project. Greenfield prescribes; brownfield extracts.
---

# Establish skill

## Role
Senior software engineer / architect.

## Task
Generate the root AGENTS.md and the system architecture document for the current project.

## Context

### Input
- Current codebase, classified as **greenfield** (no code) or **brownfield** (existing code).

### Reference
- Templates: 
  - [`AGENTS.template.md`](./AGENTS.template.md), 
  - [`system.arch.template.md`](./system.arch.template.md).
- Mode guide (read the one matching the classified mode):
  - [`mode.greenfield.md`](./mode.greenfield.md) — prescribe defaults; ask the user.
  - [`mode.brownfield.md`](./mode.brownfield.md) — extract facts from code.

## Steps
### Step 1: Configuration and starting mode
- [ ] Infer OS, shell, Git remote; confirm path defaults.
- [ ] Check root for `AGENTS.md`, `README.md`, and source code.
- [ ] Classify mode **greenfield | brownfield**, 
- then read the matching `mode.*.md` and follow it for the steps below.

### Step 2: Generate the root AGENTS.md
- [ ] If ambiguous or missing, ask the minimum clarifying questions.
- [ ] Fill `AGENTS.template.md`; keep it short (< 100 lines) and actionable.

### Step 3: Generate the architecture document
- [ ] Fill `system.arch.template.md` in one pass over the whole project.
- [ ] Draw a diagram of the containers (C4 Level 2).
- [ ] For each container add technical details.
- [ ] Draw a diagram of the entity-relationship (no attributes or constraints).

## Output
- [ ] Write `AGENTS.md` and `{Product_Folder}/system.arch.md`.
- [ ] Commit (`docs`); suggest `/extract`.

## Verification
- [ ] `AGENTS.md` exists and is well formatted.
- [ ] `system.arch.md` exists and is well formatted.
- [ ] No `{placeholders}` left.

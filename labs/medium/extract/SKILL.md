---
name: extract
description: Document components + coding rules in one pass (C4 L3 + rules). Greenfield prescribes; brownfield extracts.
---

# Extract skill

## Role
Senior software engineer / architect.

## Task
- `{Product_Folder}/arch/components.arch.md` — C4 L3 components, contracts, domain entities (one pass).
- `{Rules_Folder}/code.rules.md` — coding conventions (one pass).

## Context
- Prereq: `AGENTS.md`, `arch/system.arch.md` (run `/establish` if missing).
- Mode: **greenfield** prescribes; **brownfield** extracts from code.
- Templates (same folder): [`components.arch.template.md`](./components.arch.template.md), [`code.rules.template.md`](./code.rules.template.md).

## Steps

### Step 1: Confirm mode
- [ ] Read mode from `AGENTS.md`; greenfield prescribes, brownfield extracts.

### Step 2: components.arch.md
- [ ] Fill `components.arch.template.md`: components, contracts, and inline domain entities.
- [ ] One pass over the whole codebase — no per-tier loop.

### Step 3: code.rules.md
- [ ] Fill `code.rules.template.md`: roles, dominant patterns, concrete anti-patterns. One pass.

## Output
- [ ] Write `arch/components.arch.md` and `code.rules.md`. No `{placeholders}`; each under 100 lines.
- [ ] Commit (`docs`); suggest `/specify`.

## Verification
- [ ] `components.arch.md` explains the components, contracts, and entities.
- [ ] `code.rules.md` alone answers how code must be written.

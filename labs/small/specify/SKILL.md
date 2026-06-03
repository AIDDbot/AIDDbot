---
name: specify
description: Capture a small feature as a one-page spec — problem and acceptance criteria — ready to code.
---

# Specify skill

## Role
Engineer.

## Task
- `{Product_Folder}/specs/{slug}/spec.md` — problem, an inline solution sketch, and acceptance criteria.

## Context
- Input: a requirement or feature description.
- Prereq: `AGENTS.md`, `system.arch.md` (run `/establish` if missing).
- Template (same folder): [`spec.template.md`](./spec.template.md).

## Steps

### Step 1: Understand
- [ ] Ask the minimum questions if unclear; derive `{slug}`.

### Step 2: Write the spec
- [ ] Fill `spec.template.md`: problem, a short solution sketch, and checkable acceptance criteria.

## Output
- [ ] Write `spec.md`. No `{placeholders}`; keep it to one page.
- [ ] Commit (`docs`); suggest `/codify`.

## Verification
- [ ] Problem and acceptance criteria are clear and checkable.

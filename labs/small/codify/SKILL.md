---
name: codify
description: Implement a small spec — write the code, add light tests, and self-check against the acceptance criteria.
---

# Codify skill

## Role
Engineer.

## Task
Build the feature from the spec, add a few tests, and confirm the acceptance criteria yourself (no separate verify skill).

## Context
- Input: `{Product_Folder}/specs/{slug}/spec.md` (or a direct requirement).
- Prereq: `system.arch.md` / `code.rules.md` if present (run `/establish` if missing).

## Steps

### Step 1: Implement
- [ ] Write the minimum code to meet the spec; follow project conventions.

### Step 2: Test lightly
- [ ] Add tests for the critical path (and obvious edge cases).

### Step 3: Self-check
- [ ] Walk each acceptance criterion; mark it `[x]` in `spec.md` when met.

## Output
- [ ] Working code, light tests, spec criteria marked.
- [ ] Commit (`feat`; scope `{slug}`); suggest `/release` when done.

## Verification
- [ ] Code builds and tests pass; every acceptance criterion is met.

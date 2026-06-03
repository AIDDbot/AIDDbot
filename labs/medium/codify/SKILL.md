---
name: codify
description: Write the code and unit tests for a spec by following its implementation outline.
---

# Codify skill

## Role
Software engineer.

## Task
Implement the spec's solution: working code plus unit tests for critical modules.

## Context
- Input: `{Product_Folder}/specs/{slug}/spec.md` (or a direct requirement).
- Prereq: `{Rules_Folder}/code.rules.md` (run `/extract` if missing).
- References: `code.rules.md`, `arch/components.arch.md`.

## Steps

### Step 1: Prepare
- [ ] Read the spec's implementation outline and acceptance criteria.
- [ ] Ensure you are on `feat/{slug}`; commit pending work first.

### Step 2: Implement
- [ ] Follow the outline in order; write the minimum code to fulfill it (no comments, no extra changes).
- [ ] Apply `code.rules.md` conventions.

### Step 3: Unit tests
- [ ] Cover critical modules: happy path, edge cases, error cases.

## Output
- [ ] Working code and unit tests in the appropriate files.
- [ ] Commit (`feat`; scope `{slug}`); suggest `/verify`.

## Verification
- [ ] Code builds; unit tests pass.
- [ ] Every outline step is implemented.

---
name: specify
description: Turn a requirement into a spec with acceptance criteria and a short implementation outline. Folds planning into the spec.
---

# Specify skill

## Role
Senior analyst / engineer.

## Task
- `{Product_Folder}/specs/{slug}/spec.md` — problem, solution overview, implementation outline, and EARS acceptance criteria. No separate plan file.

## Context
- Input: a requirement, user story, or feature description.
- Prereq: `AGENTS.md`, `arch/system.arch.md` (run `/establish` if missing).
- Template (same folder): [`spec.template.md`](./spec.template.md).

## Steps

### Step 1: Understand
- [ ] If ambiguous, ask the minimum questions. Derive `{slug}` per `AGENTS.md`.

### Step 2: Start the feature branch
- [ ] Commit pending work; work on `feat/{slug}` (create from default branch if missing).

### Step 3: Spec
- [ ] Fill `spec.template.md`: problem + user stories, solution overview (per arch), and an ordered implementation outline (the steps `/codify` will follow).

### Step 4: Acceptance criteria
- [ ] Write verifiable criteria in EARS form (`When <trigger>, the system shall <response>`).

## Output
- [ ] Write `spec.md`. No `{placeholders}`; under 100 lines. Frontmatter `slug` set, `status: in-progress`.
- [ ] Commit (`docs`); suggest `/codify`.

## Verification
- [ ] Problem, solution, implementation outline, and acceptance criteria are present and traceable.
- [ ] On branch `feat/{slug}`; `slug` matches the folder name.

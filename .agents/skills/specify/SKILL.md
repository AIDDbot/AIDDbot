---
name: specify
description: Writes a specification file for a new feature or complex improvement. Use this skill when the user provides a requirement, user story, or feature description that needs to be formally defined before implementation. Trigger on phrases like "write a spec", "specify this feature", "create a spec for", or whenever a new feature needs a spec file before planning or coding.
---

# Specify skill

## Role
Act as a senior analyst.

## Task
Given a requirement or feature description, produce a complete specification file that serves as the source of truth for planning and implementation.

## Context

### Input
- A requirement, user story, or feature description from the user.

### References
- `AGENTS.md` — product paths and slug rules
- [Spec template](./spec.template.md)
- [EARS Conventions](./EARS.convention.md)
- [Model design convention](./model-design.convention.md)

## Steps

### Step 1: Understand the requirement

- [ ] If ambiguous or incomplete, ask the minimum questions needed before proceeding.
- [ ] Derive `{slug}` per `AGENTS.md`; confirm with the user if unclear.

### Step 2: Define the problem

- [ ] Articulate the problem statement.
- [ ] Write user stories from the affected roles' perspective.

### Step 3: Design the solution

- [ ] Propose the solution across applicable tiers (data model, backend, frontend, database) per [spec template](./spec.template.md).
- [ ] Apply [Model design convention](./model-design.convention.md) where the data model applies.
- [ ] Focus on design, not implementation detail.

### Step 4: Define acceptance criteria

- [ ] Write verifiable criteria using [EARS Conventions](./EARS.convention.md).

### Step 5: Write the spec

- [ ] Create `{Product_Folder}/specs/{slug}.spec.md` from [spec template](./spec.template.md).
- [ ] Frontmatter: `spec-slug` matches `{slug}`, `status: draft`; leave `released-version` and `released-at` empty per [spec-status.md](./spec-status.md).

## Output
- [ ] `{Product_Folder}/specs/{slug}.spec.md` is complete, clear, and actionable for `/planify`.

## Verification
- [ ] Problem, solution, and acceptance criteria are present and traceable.
- [ ] Frontmatter and filename slug align; status is `draft`.

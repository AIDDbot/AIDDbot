---
name: specify
description: Writes a specification file for a new feature or complex improvement. Use this skill when the user provides a requirement, user story, or feature description that needs to be formally defined before implementation. Trigger on phrases like "write a spec", "specify this feature", "create a spec for", or whenever a new feature needs a spec file before planning or coding.
---

# Specify skill

## Role
Act as a senior analyst.

## Task
Given a requirement or feature description, produce a complete specification file that serves as the source of truth for code.

## Context

### Input
- A requirement, user story, or feature description from the user.

### References

- System architecture and decisions in the **Architecture** section of root `AGENTS.md`
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

- [ ] Propose the solution across the applicable tiers from the `AGENTS.md` Architecture section.
- [ ] Apply [Model design convention](./model-design.convention.md) where the data model applies.
- [ ] Respect the containers and decisions recorded in `AGENTS.md`.
- [ ] Focus on high-level design, not implementation detail.

### Step 4: Define acceptance criteria

- [ ] Write verifiable criteria using [EARS Conventions](./EARS.convention.md).

### Step 5: Write the spec

- [ ] Create the feature folder `{Product_Folder}/specs/{slug}/` if it does not exist.
- [ ] Create `{Product_Folder}/specs/{slug}/spec.md` from [spec template](./spec.template.md).
- [ ] Frontmatter: 
  - `slug` matches `{slug}` (the folder name carries the slug; the filename stays `spec.md`)
  - `status` is `pending`
  - `released-version` is empty

## Output
- [ ] Write the spec at `{Product_Folder}/specs/{slug}/spec.md` following the template.
- [ ] Suggest `/planify` to break down the spec into implementation steps.

## Verification
- [ ] Problem, solution, and acceptance criteria are present and traceable.
- [ ] Frontmatter `slug` matches the `{slug}` folder name; status is `pending`.

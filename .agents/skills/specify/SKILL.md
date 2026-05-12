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
- [EARS Conventions](./EARS.convention.md) 
- [Model design convention](./model-design.convention.md)
- [Spec template](./spec.template.md)

### Conventions:
- `{slug}.spec.md` where `{slug}` is a concise identifier derived from the requirement or feature description.

## Steps

### Step 1: Clarify the requirement
- [ ] If the requirement is ambiguous or incomplete, ask the minimum questions needed before proceeding.
### Step 2: Define the specification
- [ ] Articulate the problem and write user stories from the affected roles' perspective.
### Step 3: Design the solution
- [ ] Propose the solution across applicable tiers (data model, backend, frontend). Focus on design, not implementation detail.
### Step 4: Write acceptance criteria
- [ ] Define verifiable criteria using the EARS convention.

## Output
- [ ] Write the spec to `{Product_Folder}/specs/{slug}.spec.md` using the spec template.

## Verification
- [ ] The generated spec file should be complete, clear, and actionable for planning and implementation.


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
- [EARS Conventions](./EARS.convention.md)
- [Model design convention](./model-design.convention.md)
- [Spec template](./spec.template.md)
- [Spec status lifecycle](./spec-status.md) — frontmatter and edge cases

## Steps

- [ ] If the requirement is ambiguous or incomplete, ask the minimum questions needed before proceeding.
- [ ] Articulate the problem and write user stories from the affected roles' perspective.
- [ ] Propose the solution across applicable tiers (data model, backend, frontend). Focus on design, not implementation detail.
- [ ] Define verifiable acceptance criteria using the EARS convention.
- [ ] Write the spec using the spec template; set frontmatter `status: draft` and leave `released-version` / `released-at` empty.

## Output
- [ ] `{Product_Folder}/specs/{slug}.spec.md` is complete, clear, and actionable for planning and implementation.

## Verification
- [ ] Problem, solution, and acceptance criteria are present and traceable.

## Git
- [ ] [repository/SKILL.md](../repository/SKILL.md) — `/specify` row in [skill-integrations.md](../repository/skill-integrations.md).

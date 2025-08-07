---
description: "Create the BACKLOG document for a project."
---

# Backlog Document

Create a BACKLOG document that outlines the epics and features for the project and its status.

- Prioritize features based on business value and technical feasibility
- Group related features into epics for better organization
- Keeps track of feature dependencies and status
- The backlog should contain a markdown table with the following columns:
  - Epic
  - Priority: ‼️ Critical ❗ High ❕ Normal
  - Feature Status: A set of features, represented with color by status ✔️ ✅ 📝 ⏳ ❌

> Feature Status Legend: ✔️ RELEASED | ✅ CODED | 📝 DESIGNED | ⏳ PENDING | ❌ BLOCKED

## Context

- [PRD.md](/docs/PRD.md)
- [DOMAIN.md](/docs/DOMAIN.md)
- [SYSTEMS.md](/docs/SYSTEMS.md)

## Workflow

- [ ] Write a list of features based on the PRD, DOMAIN, and SYSTEMS documents.

- [ ] Do not detail the features specs, just list them.

- [ ] Include features for project or data boilerplate, initial setup, and any other necessary components.

- [ ] Group related features into epics for better organization.

- [ ] Prioritize epics and features based on business value and technical feasibility.

- [ ] Read and follow the [#BACKLOG](/.github/instructions/BACKLOG.instructions.md) instructions

- [ ] Fill in the placeholders with relevant information about the project.

- [ ] Write the backlog in Markdown format at `/docs/BACKLOG.md`.
  
- [ ] Update [README.md](/README.md) with link to this BACKLOG

- [ ] Commit changes by running [/git-commit](/.github/prompts/git-commit.prompt.md)

## Validation

- [ ] [BACKLOG.md](/docs/BACKLOG.md) exists

> End of the BACKLOG prompt.

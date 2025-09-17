---
description: 'Write Feature Specification'
---

# Feature Specification

Write detailed specifications for the feature: ${input:featureId}

It is composed of three main parts:
1. Problem Specification
2. Solution Overview
3. Acceptance Criteria

The Problem Specification must be written from the business/user perspective. Focus on **what** the user needs and **why**, not ~~how~~ it will be implemented.

The Solution Overview must be a high-level description of **how** the feature will be implemented, focusing on the main components and interactions. This will help plan the implementation.

The Acceptance Criteria must be clear, testable conditions that define when the feature is complete and works as intended.

## Context

- [PRD.md](/docs/PRD.md)
- [DOMAIN.md](/docs/DOMAIN.md)
- [SYSTEMS.md](/docs/SYSTEMS.md)
- [BACKLOG.md](/docs/BACKLOG.md)
- [Architecture Instructions](../instructions/bst_architecture.instructions.md)
- [STRUCTURE.md](/docs/STRUCTURE.md) (if exists)

## Workflow

- [ ] #think about and write a list (1 to 3) of user stories that describe the feature from the user's perspective.

- [ ] #think about and write a list (1 to 3) of technical requirements that describe the feature from the system's perspective.

- [ ] #think about and write a list (1 to 3) of acceptance criteria for each user story using the EARS format: SHALL, WHEN, IF, THEN, WHILE, WHERE.

- CHOOSE THE SIMPLEST APPROACH FOR EACH ITEM.

- [ ] Read and follow the [#tpl_feature-spec](../instructions/tpl_feature-spec.instructions.md) instructions.

- [ ] Fill in the placeholders with relevant information.

- [ ] Write the feature specification in Markdown format at `/docs/specs/{featureId}.spec.md`.

- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with:
  - [ ] change or keep the status to 📝 SPECIFIED

- [ ] Commit changes by running [/U_git-commit](../prompts/U_git-commit.prompt.md) with a docs type message.

## Validation

- [ ] [{featureId}.spec.md](/docs/backlog/{featureId}.spec.md) exists
- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature specification link and status

> End of Feature Specification prompt.
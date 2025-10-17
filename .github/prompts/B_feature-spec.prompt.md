---
description: 'Write a Feature Specification'
---

# Feature Specification

Write detailed specifications for a prompted feature in Markdown format composed of three main parts:

1. Problem Specification

2. Solution Design

3. Acceptance Criteria

Define **when** the feature is complete based on testable conditions.

## Context

- [PRD.md](/docs/PRD.md)
- [SYSTEMS.md](/docs/SYSTEMS.md)
- [Architecture Instructions](../instructions/bst_architecture.instructions.md)

## Workflow

- [ ] #think about and write a short (up to 3) list of user stories that describe the feature from the user's perspective.

- [ ] #think about and write data models, software components, user interfaces, and aspects (monitoring, security, error handling) for the feature.

- [ ] #think about and write a short (up to 3) list of acceptance criteria for each user story using the EARS format: SHALL, WHEN, IF, THEN, WHILE, WHERE.

- CHOOSE THE SIMPLEST APPROACH FOR EACH ITEM.

- [ ] Read and follow the [#tpl_feature-spec](../instructions/tpl_feature-spec.instructions.md) instructions.

- [ ] Fill in the placeholders with relevant information.

- Generate a unique specification ID (e.g., 001-slug_short_description).

- [ ] Write the feature specification in Markdown format at `/docs/specs/{specId}.spec.md`.

- [ ] Commit changes by running [/U_git-commit](../prompts/U_git-commit.prompt.md) with a docs type message.

## Validation

- [ ] [{specId}.spec.md](/docs/specs/{specId}.spec.md) exists

> End of Feature Specification prompt.
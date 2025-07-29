---
description: Feature Specification
---

# Feature Specification

Write detailed specifications for the feature: ${input:featureId}

## Context

- Read [PRD.md](/docs/PRD.md), [DOMAIN.md](/docs/DOMAIN.md) and [SYSTEMS.md](/docs/SYSTEMS.md) as primary sources for requirements and business logic.

- Read the current status from the [BACKLOG.md](/docs/BACKLOG.md)

## Workflow

- [ ] Write a list of user stories that describe the feature from the user's perspective.
- [ ] Use the EARS format for acceptance criteria of each: SHAll, WHEN, IF, THEN, WHILE, WHERE.
- [ ] Read and follow the [#feature.spec](/.github/instructions/feature.spec.instructions.md) instructions.
- [ ] Fill in the placeholders with relevant information about the project. 
- [ ] Write the feature specification in Markdown format at `/docs/{featureId}.spec.md`.
- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with the feature specification link and status 🟡 IN PROGRESS.

## Validation

- [ ] [{featureId}.spec.md](/docs/{featureId}.spec.md) exists
- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature specification link and status
- [ ] Run [/git-commit](/.github/prompts/git-commit.prompt.md)
---
description: Feature Design
---

# Feature Design

Write detailed designs for the feature: ${input:featureId}

## Context

- Read [PRD.md](/docs/PRD.md), [DOMAIN.md](/docs/DOMAIN.md) and [SYSTEMS.md](/docs/SYSTEMS.md) as primary sources for requirements and business logic.

- Read the feature specifications from the [{featureId}.spec.md](/docs/{featureId}.spec.md) document.

- Read and follow the technical instructions related architecture  and coding standards from [/.github/instructions](/.github/instructions) folder.
  - [Architecture Instructions](/.github/instructions/architecture.instructions.md) 
  - [Structure Instructions](/.github/instructions/structure.instructions.md)
- Read the current (if exists) [STRUCTURE.md](/docs/STRUCTURE.md) document that describes the project structure and conventions.

## Workflow

- [ ] Read and follow the [#feature.design](/.github/instructions/feature.design.instructions.md) instructions.
- [ ] Fill in the placeholders with relevant information about the project. 
- [ ] Write the feature design in Markdown format at `/docs/{featureId}.design.md`.
- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with the feature design link and status 🟡 DESIGNED.

## Validation

- [ ] [{featureId}.design.md](/docs/{featureId}.design.md) exists
- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature design link and status
- [ ] Run [/git-commit](/.github/prompts/git-commit.prompt.md)
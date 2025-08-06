---
description: "Write Feature Design"
---

# Feature Design

Write detailed technical designs for the feature: ${input:featureId}

## Context

- [DOMAIN.md](/docs/DOMAIN.md)
- [SYSTEMS.md](/docs/SYSTEMS.md)
- [{featureId}.spec.md](/docs/{featureId}.spec.md)
- [Architecture Instructions](/.github/instructions/architecture.instructions.md)
- [STRUCTURE.md](/docs/STRUCTURE.md) (if exists)

## Workflow

- [ ] Read and follow the [#feature.design](/.github/instructions/feature.design.instructions.md) instructions.
- [ ] Fill in the placeholders with relevant information about the project.
- [ ] Write the feature design in Markdown format at `/docs/feats/{featureId}.design.md`.
- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with the feature design link and status 🟡 DESIGNED.

## Validation

- [ ] [{featureId}.design.md](/docs/feats/{featureId}.design.md) exists
- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature design link and status
- [ ] Run [/git-commit](/.github/prompts/git-commit.prompt.md)

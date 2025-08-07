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
- - CHOOSE THE SIMPLEST APPROACH FOR EACH USER STORY.

- Do not go for full test coverage, just cover the main use cases. Specifically core business logic and critical paths. Choose the minimum viable tests that ensure the feature works as intended.

- [ ] Write the feature design in Markdown format at `/docs/feats/{featureId}.design.md`.

- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with the feature design link and status 📝 DESIGNED by running [/backlog-update](/.github/prompts/backlog-update.prompt.md).

- [ ] Commit changes by running [/git-commit](/.github/prompts/git-commit.prompt.md)

## Validation

- [ ] [{featureId}.design.md](/docs/feats/{featureId}.design.md) exists
- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature design link and status

> End of the Feature Design prompt.
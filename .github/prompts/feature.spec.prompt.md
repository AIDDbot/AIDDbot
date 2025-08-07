---
description: "Write Feature Specification"
---

# Feature Specification

Write detailed specifications for the feature: ${input:featureId}

## Context

- [PRD.md](/docs/PRD.md)
- [DOMAIN.md](/docs/DOMAIN.md)
- [SYSTEMS.md](/docs/SYSTEMS.md)
- [BACKLOG.md](/docs/BACKLOG.md)

## Workflow

- [ ] Write a list of user stories that describe the feature from the user's perspective.

- [ ] Use the EARS format for acceptance criteria of each: SHAll, WHEN, IF, THEN, WHILE, WHERE.
- CHOOSE THE SIMPLEST APPROACH FOR EACH USER STORY.
- In case of doubt, ask the user for clarification.

- [ ] Read and follow the [#feature.spec](/.github/instructions/feature.spec.instructions.md) instructions.

- [ ] Fill in the placeholders with relevant information about the project.

- [ ] Write the feature specification in Markdown format at `/docs/feats/{featureId}.spec.md`.

- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with the feature specification link and status 📝 DESIGNED by running [/backlog-update](/.github/prompts/backlog-update.prompt.md).

- [ ] Commit changes by running [/git-commit](/.github/prompts/git-commit.prompt.md) and docs type message.

## Validation

- [ ] [{featureId}.spec.md](/docs/feats/{featureId}.spec.md) exists
- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature specification link and status

> End of Feature Specification prompt.
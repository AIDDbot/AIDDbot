---
description: 'Write Feature Specification'
---

# Feature Specification

Write detailed specifications for the feature: ${input:featureId}

Must be written from the business/user perspective. Focus on **what** the user needs and **why**, not ~~how~~ it will be implemented.

## Context

- [PRD.md](/docs/PRD.md)
- [DOMAIN.md](/docs/DOMAIN.md)
- [SYSTEMS.md](/docs/SYSTEMS.md)
- [BACKLOG.md](/docs/BACKLOG.md)

## Workflow

- [ ] Write a list (1 to 3) of user stories that describe the feature from the user's perspective.

- [ ] Write a list (1 to 3) of acceptance criteria for each user story using the EARS format: SHALL, WHEN, IF, THEN, WHILE, WHERE.

- CHOOSE THE SIMPLEST APPROACH FOR EACH USER STORY.

- [ ] Read and follow the [#tpl_feature-spec](../instructions/tpl_feature-spec.instructions.md) instructions.

- [ ] Fill in the placeholders with relevant information.

- [ ] Write the feature specification in Markdown format at `/docs/backlog/{featureId}.spec.md`.

- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with:
  - [ ] a link to the feature specification
  - [ ] change or keep the status to 📝 PLANNED

- [ ] Commit changes by running [/U_git-commit](../prompts/U_git-commit.prompt.md) with a docs type message.

## Validation

- [ ] [{featureId}.spec.md](/docs/backlog/{featureId}.spec.md) exists
- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature specification link and status

> End of Feature Specification prompt.
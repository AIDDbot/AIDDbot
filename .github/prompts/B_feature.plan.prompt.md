---
description: 'Write Feature Implementation Plan'
---

# Feature Implementation Plan

Write a detailed plan for implementing the feature: ${input:featureId} based on the following context.

## Context

- [{featureId}.spec.md](/docs/backlog/{featureId}.spec.md)
- [{featureId}.design.md](/docs/backlog/{featureId}.design.md)
- [Architecture Instructions](/.github/instructions/gid-architecture.instructions.md)
- [STRUCTURE.md](/docs/STRUCTURE.md) (if exists)
- [Database Instructions](/.github/instructions/gid-database.instructions.md) (if applicable)

- [{frm}-{framework} Instructions](/.github/instructions/frm-{framework}.instructions.md) for any specific framework involved
- [ ] If there is no specific framework instructions run the [/doc-generate-instructions](../prompts/doc-generate-instructions.prompt.md) prompt to get instructions for it.


## Workflow

- [ ] Write a list of tasks with a brief sub-list of steps for each task

- [ ] Focus only on coding tasks (no deployment, no testing, no documentation, etc.)

- [ ] Read and follow the [#tpl-feature-plan](/.github/instructions/tpl-feature-plan.instructions.md) instructions.
- CHOOSE THE SIMPLEST APPROACH FOR EACH TASK.
- DO NOT INCLUDE TESTING NOR DOCUMENTATION TASKS AT THIS STAGE.
  
- [ ] Fill in the placeholders with relevant information about the project.

- [ ] Write the feature implementation plan in Markdown format at `/docs/backlog/{featureId}.plan.md`.

- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with:
  - [ ] a link to the feature plan
  - [ ] change or keep the status to 📝 DESIGNED

- [ ] Commit changes by running [/git-commit](/.github/prompts/git-commit.prompt.md)

## Validation

- [ ] [{featureId}.tasks.md](/docs/{featureId}.tasks.md) exists

> End of Feature Implementation Tasks prompt.

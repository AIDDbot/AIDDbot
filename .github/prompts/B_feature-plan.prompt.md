---
description: 'Write Feature Implementation Plan'
---

# Feature Implementation Plan

Write a detailed plan for implementing the feature: ${input:featureId} based on the following context.

## Context

- [{featureId}.spec.md](/docs/backlog/{featureId}.spec.md)
- [{featureId}.design.md](/docs/backlog/{featureId}.design.md)
- [Architecture Instructions](../instructions/bst_architecture.instructions.md)
- [STRUCTURE.md](/docs/STRUCTURE.md) (if exists)
- [Database Instructions](../instructions/bst_database.instructions.md) (if applicable)

- [{frm}-{framework} Instructions](../instructions/frm_{framework}.instructions.md) for any specific framework involved
- [ ] If there is no specific framework instructions run the [/U_aiddbot-instructions-update](U_aiddbot-instructions-update.prompt.md) prompt to get instructions for it.


## Workflow

- [ ] Write a list of tasks with a brief sub-list of steps for each task

- [ ] Focus only on coding tasks (no deployment, no testing, no documentation, etc.)

- [ ] Read and follow the [#tpl_feature-plan](../instructions/tpl_feature-plan.instructions.md) instructions.
- CHOOSE THE SIMPLEST APPROACH FOR EACH TASK.
- DO NOT INCLUDE TESTING NOR DOCUMENTATION TASKS AT THIS STAGE.
  
- [ ] Fill in the placeholders with relevant information about the project.

- [ ] Write the feature implementation plan in Markdown format at `/docs/backlog/{featureId}.plan.md`.

- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with:
  - [ ] a link to the feature plan
  - [ ] change or keep the status to 📝 PLANNED

- [ ] Commit changes by running [/U_git-commit](U_git-commit.prompt.md)

## Validation

- [ ] [{featureId}.plan.md](/docs/backlog/{featureId}.plan.md) exists

> End of Feature Implementation Tasks prompt.

---
description: "Write Feature Implementation Tasks"
---

# Feature Implementation Tasks

Write detailed tasks for implementing the feature: ${input:featureId}

## Context

- [{featureId}.spec.md](/docs/feats/{featureId}.spec.md)
- [{featureId}.design.md](/docs/feats/{featureId}.design.md)
- [Architecture Instructions](/.github/instructions/architecture.instructions.md)
- [STRUCTURE.md](/docs/STRUCTURE.md) (if exists)
- [Database Instructions](/.github/instructions/database.instructions.md) (if applicable)
- [{frm}-{framework} Instructions](/.github/instructions/frm-{framework}.instructions.md) for any specific framework involved

- [ ] If there is no specific framework instructions run the [/Ab_add-instructions](../prompts/Ab-add-instructions.prompt.md) prompt to get instructions for the libraries mentioned in the SYSTEMS document.

## Workflow

- [ ] Use checkbox format: \`- [ ] Task number. Task description\`
- [ ] Include implementation details as bullet points
- [ ] Reference requirements using: \`_Requirements: X.Y, Z.A_\`
- [ ] Reference existing code to leverage using: \`_Leverage: path/to/file_\`
- [ ] Focus only on coding tasks (no deployment, no testing, no documentation, etc.)

- [ ] Read and follow the [#feature.tasks](/.github/instructions/feature.tasks.instructions.md) instructions.
- CHOOSE THE SIMPLEST APPROACH FOR EACH TASK.
- DO NOT INCLUDE TESTING NOR DOCUMENTATION TASKS AT THIS STAGE.
  
- [ ] Fill in the placeholders with relevant information about the project.

- [ ] Write the feature implementation tasks in Markdown format at `/docs/feats/{featureId}.tasks.md`.

- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with the feature implementation tasks link and status 📝 DESIGNED.

- [ ] Commit changes by running [/git-commit](/.github/prompts/git-commit.prompt.md)

## Validation

- [ ] [{featureId}.tasks.md](/docs/{featureId}.tasks.md) exists

> End of Feature Implementation Tasks prompt.

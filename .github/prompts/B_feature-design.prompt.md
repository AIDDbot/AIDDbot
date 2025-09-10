---
description: 'Write Feature Design'
---

# Feature Design

Write detailed technical designs for the feature: ${input:featureId}
Focus on the architecture, components, data models, and interactions and **how** they fit into the overall system.
This will help plan the implementation.

## Context

- [DOMAIN.md](/docs/DOMAIN.md)
- [SYSTEMS.md](/docs/SYSTEMS.md)
- [{featureId}.spec.md](/docs/backlog/{featureId}.spec.md)
- [Architecture Instructions](../instructions/bst_architecture.instructions.md)
- [STRUCTURE.md](/docs/STRUCTURE.md) (if exists)

## Workflow

- If No [STRUCTURE.md](/docs/STRUCTURE.md) file exists:
  - [ ] Run the [/A_docs-brownfield](A_docs-brownfield.prompt.md) prompt to get the latest structure instructions.

- [ ] Use the #think tool to think deeply to do this step. Its the most important part of the building process.

- [ ] Questions to consider
  - Which containers are involved in this feature?
  - What are the main components on each container?
  - How do these components interact with each other?
  - What are the potential edge cases that need to be handled?
  - Which data models are needed as input/persistence/output for this feature?
  - Which APIs or services will be consumed or produced by this feature?
  - Do not consider testing nor documentation at this stage.

- CHOOSE THE SIMPLEST APPROACH FOR EACH QUESTION.

- [ ] Read and follow the [#tpl_feature-design](../instructions/tpl_feature-design.instructions.md) instructions.

- [ ] Fill in the placeholders with relevant information about the project.

- [ ] Write the feature design in Markdown format at `/docs/backlog/{featureId}.design.md`.

- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with:
  - [ ] a link to the feature design
  - [ ] change or keep the status to ✏️ DESIGNED

- [ ] Commit changes by running [/U_git-commit](U_git-commit.prompt.md) with a docs type message.

## Validation

- [ ] [{featureId}.design.md](/docs/backlog/{featureId}.design.md) exists
- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature design link and status

> End of the Feature Design prompt.
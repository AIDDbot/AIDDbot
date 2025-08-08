---
description: "Create the SYSTEMS document for a project."
---

# Systems Architecture Document

Create a Systems Architecture Document that defines the project's technical architecture, technology stack, and deployment design.

- Design system components and their interactions
- Define integration patterns with external systems

## Context

- [PRD.md](/docs/PRD.md)
- [DOMAIN.md](/docs/DOMAIN.md)
- [Architecture Instructions](/.github/instructions/architecture.instructions.md)

## Workflow

- Questions to consider:
  - What are the main system layers/tiers?
  - What technologies will be used for each component?
  - How do components communicate with each other?
  - What database technology will be used?
  - How will data be structured and accessed?
  - What are the data persistence patterns?
  - How do system components communicate?
  - What APIs or interfaces are exposed?
  - What are the data exchange formats?
  - How is authentication and authorization handled?
  - What are the security protocols?
  - How is sensitive data protected?

CHOOSE THE SIMPLEST APPROACH FOR EACH QUESTION.
In case of doubt, ask the user for clarification.

- [ ] Read and follow the [#SYSTEMS](/.github/instructions/SYSTEMS.instructions.md) instructions

- [ ] Fill in the placeholders with relevant information about the project.

- [ ] Write the systems architecture in Markdown format at `/docs/SYSTEMS.md`.

 - [ ] Run the [/Ab_add-instructions](../prompts/Ab_add-instructions.prompt.md) to get instructions for the languages, frameworks, and libraries mentioned in the SYSTEMS document.

- [ ] Update [README.md](/README.md) with link to this SYSTEMS document.

- [ ] Commit changes by running [/git-commit](/.github/prompts/git-commit.prompt.md)

## Validation

- [ ] [SYSTEMS.md](/docs/SYSTEMS.md) exists

> End of the SYSTEMS prompt.

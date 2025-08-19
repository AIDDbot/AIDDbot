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
- [Software Architecture Guide](../instructions/gid_architecture.instructions.md)

## Workflow

- Questions to consider:
  - What are the main system tiers/containers?
  - What technologies will be used for each container?
  - How do containers communicate with each other?
  - What database technology will be used?
  - How will data be structured and accessed?
  - How is authentication and authorization handled?
  - How is sensitive data protected?

- [ ] Read and follow the [tpl-SYSTEMS](../instructions/tpl-SYSTEMS.instructions.md) instructions

- [ ] Fill in the placeholders with relevant information about the project. CHOOSE THE SIMPLEST APPROACH FOR EACH QUESTION. Ask for any missing information to complete the SYSTEMS.

- [ ] Write the SYSTEMS in Markdown format at `/docs/SYSTEMS.md`.

- [ ] Update the [README.md](/README.md) file with a link to this SYSTEMS

- [ ] Commit changes by running [/git-commit](git-commit.prompt.md)

## Validation

- [ ] [SYSTEMS.md](/docs/SYSTEMS.md) exists

> End of the SYSTEMS prompt.

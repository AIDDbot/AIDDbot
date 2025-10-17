---
description: 'Create the SYSTEMS document for a project.'
---

# Systems Architecture Document

Create a Systems Architecture Document that defines the project's technical architecture, technology stack, and deployment design.

- Design system applications and their interactions
- Define integration patterns with external systems

## Context

- [AIDDbot Glossary](../instructions/aidd_glossary.instructions.md)
- [PRD.md](/docs/PRD.md)
- For greenfield scenarios:
  - [Architecture Best Practices](../instructions/bst_architecture.instructions.md)
- For brownfield scenarios:
  - The current source code folder structure
  - The current git repository history.

## Workflow

- Questions to consider:
  - What are the main system tiers/applications?
  - What technologies will be used for each application?
  - How will the user interface be designed?
  - How do applications communicate with each other?
  - What database technology will be used?
  - How will data be structured and accessed?
  - How is authentication and authorization handled?

- [ ] Read and follow the [tpl_docs-SYSTEMS](../instructions/tpl_docs-SYSTEMS.instructions.md) instructions

- [ ] Fill in the placeholders with relevant information about the project. CHOOSE THE SIMPLEST APPROACH FOR EACH QUESTION. Ask for any missing information to complete the SYSTEMS.

- [ ] Write the SYSTEMS in Markdown format at `/docs/SYSTEMS.md`.

- [ ] Update the [README.md](/README.md) file with a link to this SYSTEMS

- [ ] Commit changes by running [/U_git-commit](U_git-commit.prompt.md)

## Validation

- [ ] [SYSTEMS.md](/docs/SYSTEMS.md) exists and its linked from the README.md

> End of the Generate SYSTEMS prompt.

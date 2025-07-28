---
description: 'Create the SYSTEMS document for a project.'
tools: ['editFiles', 'search', 'fetch']
---

# Systems Architecture Document

Create a Systems Architecture Document that defines the project's technical architecture, technology stack, and deployment design.

## Context

- Use the current [PRD.md](/docs/PRD.md) and [DOMAIN.md](/docs/DOMAIN.md) documents as primary sources.
 - Offer the user the option to add files to the [docs](/docs) folder for additional context.
  - Offer #Notion tools for gathering existing technical documentation.
  - Offer the #fetch tool for retrieving existing architecture documents or technical specifications from a URL.
  - Ask for any missing technical information to complete the systems design.
- DO NOT WRITE TECHNOLOGY CHOICES OR ARCHITECTURE DECISIONS BY YOURSELF.

## Workflow

- [ ] Read and follow the [#SYSTEMS](/.github/instructions/SYSTEMS.instructions.md) instructions
- It contains a template in Markdown. Includes placeholders for you to fill and comments with instructions for you. Do not include the comments in the final document.
- [ ] Fill in the placeholders with relevant information about the project. 
 
## Validation

- [ ] [SYSTEMS.md](/docs/SYSTEMS.md) exists 
- [ ] Update [README.md](/README.md) with link to this SYSTEMS
- [ ] Run [/git-commit](/.github/prompts/git-commit.prompt.md) 

> End of the SYSTEMS prompt.

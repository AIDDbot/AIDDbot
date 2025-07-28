---
mode: 'agent'
description: 'Create the DOMAIN document for a project.'
tools: ['editFiles', 'search', 'fetch']
---

# Domain model document 

Create a Domain Model Document that defines the project's main entities, their relationships, and business rules.

## Context

- The [PRD.md](/docs/PRD.md) document.

## Workflow

- [ ] Read and follow the [#DOMAIN](/.github/instructions/DOMAIN.instructions.md) instructions
- It contains a template in Markdown. Includes placeholders for you to fill and comments with instructions for
- Ask for any missing information to complete the PRD.


## Validation

- [ ] [DOMAIN.md](/docs/DOMAIN.md) exists
- [ ] Update [README.md](/README.md) with link to this DOMAIN document
- [ ] Run [/git-commit](/.github/prompts/git-commit.prompt.md)

> End of DOMAIN prompt.

---
description: "Create the DOMAIN document for a project."
---

# Domain model document

Create a Domain Model Document that defines the project's main entities, their relationships, and business rules.

- Create domain models and business logic structure

## Context

- [PRD.md](/docs/PRD.md)

## Workflow

Questions to consider:

- What is the core business domain?
- What are the main business processes?
- What are the key business concepts?
- What are the main business objects in the system?
- What information does each entity need to store?
- What unique identifier does each entity have?
- How are the entities connected to each other?
- What are the cardinalities (one-to-one, one-to-many, many-to-many)?
- What are the foreign key relationships?

CHOOSE THE SIMPLEST APPROACH FOR EACH QUESTION.
In case of doubt, ask the user for clarification.

- [ ] Read and follow the [#DOMAIN](/.github/instructions/DOMAIN.instructions.md) instructions

- [ ] Fill in the placeholders with relevant information about the project.

- [ ] Write the domain model in Markdown format at `/docs/DOMAIN.md`.

- [ ] Update [README.md](/README.md) with link to this DOMAIN document.

- [ ] Commit changes by running [/git-commit](/.github/prompts/git-commit.prompt.md)

## Validation

- [ ] [DOMAIN.md](/docs/DOMAIN.md) exists

> End of DOMAIN prompt.

---
description: 'Create the DOMAIN document for a project.'
---

# Domain model document

Create a Domain Model Document that defines the project's main entities, their relationships, and business rules.

- Create domain models and business logic structure

## Context

- [PRD.md](/docs/PRD.md)

## Workflow

- [ ] Questions to consider:
  - What is the core business domain?
  - What are the main business processes?
  - What are the key business concepts?
  - What are the main business entities in the system?
  - What information does each entity need to store?
  - What unique identifier does each entity have?
  - How are the entities connected to each other?
  - What are the cardinalities (one-to-one, one-to-many, many-to-many)?
  - What are the foreign key relationships?

- [ ] Read and follow the [tpl_docs-DOMAIN](../instructions/tpl_docs-DOMAIN.instructions.md) instructions

- [ ] Fill in the placeholders with relevant information about the project. CHOOSE THE SIMPLEST APPROACH FOR EACH QUESTION. Ask for any missing information to complete the DOMAIN model.

- [ ] Write the DOMAIN in Markdown format at `/docs/DOMAIN.md`.

- [ ] Update the [README.md](/README.md) file with a link to this DOMAIN

- [ ] Commit changes by running [/U_git-commit](U_git-commit.prompt.md)

## Validation

- [ ] [DOMAIN.md](/docs/DOMAIN.md) exists

> End of the Generate DOMAIN prompt.

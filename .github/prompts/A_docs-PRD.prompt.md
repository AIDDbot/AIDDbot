---
description: 'Create a Product Requirements Document (PRD)'
---

# Product Requirements Document (PRD) for { PRODUCT_NAME }

Create a Product Requirements Document (PRD) to define the scope and objectives of the product.
This document will serve as the foundation for all subsequent design and development work.

- Define product scope, objectives, and success criteria
- Identify stakeholders and their requirements
- Establish technical constraints and compliance requirements
- Create context diagrams showing system boundaries

## Context

- [AIDDbot Glossary](../instructions/aidd_glossary.instructions.md)
- [README.md](/README.md) Current project overview if any
- [docs](/docs) Any other document at the docs folder
- In brownfield scenarios:
  - The current source code folder structure
  - The current git repository history.

## Workflow

- [ ] Questions to consider:
  - What business problem does it solve?
  - Who is it for?
  - What is the expected benefit? 
  - What actions should the user be able to perform?
  - What validations or business rules must be met?
  - What are the performance, availability, and security expectations?  
  - Must it comply with any technical or legal standards?
  - Which external or legacy systems must be integrated?
  - Are there any language, framework, and database decisions as constraints?

- [ ] Read and follow the [tpl_docs-PRD](../instructions/tpl_docs-PRD.instructions.md) instructions

- [ ] Fill in the placeholders with relevant information about the project. CHOOSE THE SIMPLEST APPROACH FOR EACH QUESTION. Ask for any missing information to complete the PRD.

- [ ] Create or update the PRD in Markdown format at `/docs/PRD.md`.

- [ ] Update the [README.md](/README.md) file with a link to the PRD. 

- [ ] Commit changes by running [/U_git-commit](U_git-commit.prompt.md)

## Validation

- [ ] [PRD.md](/docs/PRD.md) exists and its linked from the README.md

> End of the Generate PRD prompt.

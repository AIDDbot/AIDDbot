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
- [README.md](/README.md)
- [docs](/docs) Any other document at the docs folder
- The current git user profile to set the author and committer information.
- Offer the user the option to add context:
  - Files to the [docs](/docs) or any other folder
  - Use the #fetch tool for retrieving existing documentation or resources from a URL.

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
  - Are there any imposed Language, framework, and database decisions as constraints?

- [ ] Read and follow the [tpl_docs-PRD](../instructions/tpl_docs-PRD.instructions.md) instructions

- [ ] Fill in the placeholders with relevant information about the project. CHOOSE THE SIMPLEST APPROACH FOR EACH QUESTION. Ask for any missing information to complete the PRD.

- [ ] Write the PRD in Markdown format at `/docs/PRD.md`.

- [ ] Create or update the [README.md](/README.md) file with a summary of the product and info about the author.

- [ ] Update the [README.md](/README.md) file with a link to this PRD. 

- [ ] Commit changes by running [/U_git-commit](U_git-commit.prompt.md)

## Validation

- [ ] [PRD.md](/docs/PRD.md) exists

> End of the Generate PRD prompt.

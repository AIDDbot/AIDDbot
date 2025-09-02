---
description: 'Create the STRUCTURE document for a project.'
---

# Project Structure Document

Create a Project Structure Document that defines the project's folder structure, file organization, and naming conventions.


## Context

- [AIDDbot Glossary](../instructions/std_aidd-glossary.instructions.md)
- [Architecture Instructions](../instructions/bst_architecture.instructions.md)
- [tpl_docs-STRUCTURE](../instructions/tpl_docs-STRUCTURE.instructions.md)
- The #codebase tool to inspect the actual source code and configuration.

## Workflow

- Questions to consider:
  - What are the main system tiers/applications?
  - What technologies are being used for each application?
  - How is configuration managed?
  - Steps to develop, test, run and deploy the applications?
  - What database technology is being used?

- [ ] Read and follow the [tpl_docs-STRUCTURE](../instructions/tpl_docs-STRUCTURE.instructions.md) instructions

- [ ] Fill in the placeholders with relevant information about the project. CHOOSE THE SIMPLEST APPROACH FOR EACH QUESTION. Ask for any missing information to complete the STRUCTURE.

- [ ] Write the STRUCTURE in Markdown format at `/docs/STRUCTURE.md`.

- [ ] Update the [README.md](/README.md) file with a link to this STRUCTURE

- [ ] Commit changes by running [/U_git-commit](U_git-commit.prompt.md)

## Validation

- [ ] [STRUCTURE.md](/docs/STRUCTURE.md) exists

> End of the STRUCTURE prompt.

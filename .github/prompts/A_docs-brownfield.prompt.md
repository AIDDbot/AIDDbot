---
description: 'Generates all the documentation for an already existing project.'
---

# Project Structure Document

Create or update the following documentation useful for new humans or AI developers joining the project.

Mandatory documents to create or update:
- Project Structure Document that defines the current technical stack, folder structure, file organization, tools and conventions.
- Backlog Document that defines the features with their status and dependencies.

Useful for new humans or AI developers joining the project.

## Context

- [AIDDbot Glossary](../instructions/aidd_glossary.instructions.md)
- [Architecture Instructions](../instructions/bst_architecture.instructions.md)
- [tpl_docs-STRUCTURE](../instructions/tpl_docs-STRUCTURE.instructions.md)
- [tpl_docs-BACKLOG](../instructions/tpl_docs-BACKLOG.instructions.md)
- The #codebase tool to inspect the actual source code and configuration.

## Workflow

### Project Structure Document

> Use the #codebase tool to inspect the actual source code and configuration.
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

### Backlog Document

 > Use the #codebase tool to inspect the actual source code and documentation.
- Questions to consider:
  - What are the main features of the system?
  - How can these features be grouped into epics?
  - What are the dependencies between features?
  - What is the current status of each feature?

- [ ] Read and follow the [tpl_docs-BACKLOG](../instructions/tpl_docs-BACKLOG.instructions.md) instructions

- Even if no PRD, DOMAIN or SYSTEMS documents exist, try to infer the features from the codebase. At least write the backlog file with the project name and date and basic info with an epic and a feature.

- [ ] Fill in the placeholders with relevant information about the project. CHOOSE THE SIMPLEST APPROACH FOR EACH QUESTION. Ask for any missing information to complete the BACKLOG.

- [ ] Write the BACKLOG in Markdown format at `/docs/BACKLOG.md`.

- [ ] Update the [README.md](/README.md) file with a link to this BACKLOG

- [ ] Commit changes by running [/U_git-commit](U_git-commit.prompt.md)

## Validation

- [ ] [STRUCTURE.md](/docs/STRUCTURE.md) exists
- [ ] [BACKLOG.md](/docs/BACKLOG.md) exists

> End of the STRUCTURE prompt.

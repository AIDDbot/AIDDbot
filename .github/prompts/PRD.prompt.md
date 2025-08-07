---
description: "Create a Project Requirements Document (PRD)"
---

# Project Requirements Document (PRD)

Create a Project Requirements Document (PRD) to define the scope and objectives of the project.
This document will serve as the foundation for all subsequent design and development work.

- Define project scope, objectives, and success criteria
- Identify stakeholders and their requirements
- Establish technical constraints and compliance requirements
- Create context diagrams showing system boundaries

## Context

- [README.md](/README.md)
- [docs](/docs) Any other document at the docs folder
- The current git user profile to set the author and committer information.
- Offer the user the option to add files to the [docs](/docs) folder for additional context.
  - Offer the #fetch tool for retrieving existing documentation or resources from a URL.
  - Ask for any missing information to complete the PRD.

## Workflow

- DO NOT WRITE GOALS, REQUIREMENTS, OR CONSTRAINTS BY YOURSELF.
  Instead, use the provided context or ask the user for clarification.

- [ ] Read and follow the [#PRD](/.github/instructions/PRD.instructions.md) instructions

- [ ] Fill in the placeholders with relevant information about the project.

- [ ] Write the PRD in Markdown format at `/docs/PRD.md`.

- [ ] Update [README.md](/README.md) with link to this PRD

- [ ] Commit changes by running [/git-commit](/.github/prompts/git-commit.prompt.md)

## Validation

- [ ] [PRD.md](/docs/PRD.md) exists

> End of the PRD prompt.

---
mode: 'agent'
description: 'Create a Project Requirements Document (PRD)'
tools: ['editFiles', 'search', 'fetch', 'runCommands']
---

# Project Requirements Document (PRD)

Create a Project Requirements Document (PRD) to define the scope and objectives of the project. This document will serve as the foundation for all subsequent design and development work.

   - Define business objectives and functional requirements
   - Document technical constraints and compliance needs
   - Create context diagrams showing system boundaries

## Context

- Repository setup.
- [README.md](/README.md) and [docs](/docs) folder
- The current git user profile to set the author and committer information.
- Offer the user the option to add files to the [docs](/docs) folder for additional context.
  - Offer the #fetch tool for retrieving existing documentation or resources from a URL.
  - Offer #Notion tools for gathering initial requirements from a page in the user Notion workspace.
  - Ask for any missing information to complete the PRD.
- DO NOT WRITE GOALS, REQUIREMENTS, OR CONSTRAINTS BY YOURSELF. 

## Workflow

- [ ] Read and follow the [#PRD](/.github/instructions/PRD.instructions.md) instructions
- It contains a template in Markdown. Includes placeholders for you to fill and comments with instructions for you. Do not include the comments in the final document.
- [ ] Fill in the placeholders with relevant information about the project.
  
## Validation

- [ ] [PRD.md](/docs/PRD.md) exists 
- [ ] Update [README.md](/README.md) with link to this PRD
- [ ] Run [/git-commit](/.github/prompts/git-commit.prompt.md) 

> End of the PRD prompt.
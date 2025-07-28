---
description: "Create the BACKLOG document for a project."
tools: ['editFiles', 'fetch', 'search', 'runCommands']
---

# BACKLOG Instructions

Create a BACKLOG document that outlines the epics and features for the project and its status.

## Context

- Read [PRD.md](/docs/PRD.md), [DOMAIN.md](/docs/DOMAIN.md) and [SYSTEMS.md](/docs/SYSTEMS.md) as primary sources for requirements and business logic.
- Use the current `/README.md` and `/docs` folder to add context to your responses.

## Workflow

- Write a list of features based on the PRD, DOMAIN, and SYSTEMS documents.
- Do not detail the features specs, just list them.
- Include features for project or data boilerplate, initial setup, and any other necessary components.
- Group related features into epics for better organization.
- Prioritize epics and features based on business value and technical feasibility.

- [ ] Read and follow the [#BACKLOG](/.github/instructions/BACKLOG.instructions.md) instructions
- It contains a template in Markdown. Includes placeholders for you to fill and comments with instructions for you. Do not include the comments in the final document.

- [ ] Fill in the placeholders with relevant information about the project. 

## Validation

- [ ] [BACKLOG.md](/docs/BACKLOG.md) exists 
- [ ] Update [README.md](/README.md) with link to this BACKLOG
- [ ] Run [/git-commit](/.github/prompts/git-commit.prompt.md) 

> End of the BACKLOG prompt.

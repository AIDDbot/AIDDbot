---
description: "Create the BACKLOG document for a project."
---

# Backlog Document

Create a BACKLOG document that outlines the epics and features for the project and its status.

- Prioritize features based on business value and technical feasibility
- Group related features into epics for better organization
- Keeps track of feature dependencies and status
- The backlog should contain a markdown list with the following info:
  - Epic Number and short name
  - Priority: ‼️ Critical ❗ High ❕ Normal
  - States of the functionalities: A set of features, represented with its status emojis ❌ ⏳ ✨ ✅ ✔️

> Feature Status Legend: ❌ BLOCKED | ⏳ PENDING | ✨ DESIGNED | ✅ CODED | ✔️ RELEASED 

## Context

- [PRD.md](/docs/PRD.md)
- [DOMAIN.md](/docs/DOMAIN.md)
- [SYSTEMS.md](/docs/SYSTEMS.md)

### GitHub Issues

- Determine if this is a GitHub repository.
- Determine if you have the `#create_issue` tool to access the GitHub API via MCP.

## Workflow

- [ ] Write a list of features based on the PRD, DOMAIN, and SYSTEMS documents.

- [ ] Do not detail the features specs, just list them.

- [ ] Include features for project or data boilerplate, initial setup, and any other necessary components.

- [ ] Do not include testing nor documentation features. (they will be tasks to do during implementation, but not features per se)

- [ ] Group related features into epics for better organization.

- [ ] Prioritize epics and features based on business value and technical feasibility.

- [ ] Read and follow the [#BACKLOG](../instructions/tpl-BACKLOG.instructions.md) instructions


- [ ] Fill in the placeholders with relevant information about the project. CHOOSE THE SIMPLEST APPROACH FOR EACH QUESTION. Ask for any missing information to complete the SYSTEMS.

- [ ] Write the BACKLOG in Markdown format at `/docs/BACKLOG.md`.

- [ ] If this is a GitHub repository and you have the `#create_issue` tool, Run the [/Ab_sync-github-issues](../prompts/Ab_sync-github-issues.prompt.md) prompt to synchronize GitHub issues with the BACKLOG.

- [ ] Update [README.md](README.md) with link to this BACKLOG

- [ ] Commit changes by running [/git-commit](git-commit.prompt.md)

## Validation

- [ ] [BACKLOG.md](/docs/BACKLOG.md) exists

> End of the BACKLOG prompt.

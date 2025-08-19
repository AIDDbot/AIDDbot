---
description: "Create the BACKLOG for a project."
---

# Backlog

Create a BACKLOG that outlines the epics and features for the project.

- Divide the project requirements into smaller, manageable features.
- Prioritize features based on business value and technical feasibility
- Group related features into epics for better organization
- Assign each Epic a Priority: ‼️ Critical ❗ High ❕ Normal
- Keep track of feature dependencies (other features) 
- Keep track of feature status ❌ BLOCKED | ⏳ PENDING | ✨ DESIGNED | ✅ CODED | ✔️ RELEASED 

## Context

- [PRD.md](/docs/PRD.md)
- [DOMAIN.md](/docs/DOMAIN.md)
- [SYSTEMS.md](/docs/SYSTEMS.md)

### Backlog in GitHub Issues or File System

- Determine if this is a GitHub repository.
- Determine if you have the `#create_issue` tool to access the GitHub API via MCP.
- If so, use the GitHub tool to create issues for epics with sub-issues for features.

## Workflow

- [ ] Write a list of features based on the PRD, DOMAIN, and SYSTEMS documents.

- [ ] Do not detail the features specs, just list them.

- [ ] Include features for project or data boilerplate, initial setup, and any other necessary components.

- [ ] Do not include testing nor documentation features. (they will be tasks to do during implementation, but not features per se)

- [ ] Group related features into epics for better organization.

- [ ] Prioritize epics and features based on business value and technical feasibility.


### GitHub Issues Backlog

 > Read and follow this section if this is a GitHub repository and you have the `#create_issue` tool. Skip otherwise.

- [ ] Read and follow the [#github-issue-epic](../instructions/tpl-github-issue-epic.instructions.md) template instructions for each epic.
- [ ] Create a GitHub issue for each the epic 

- After finish with all epics.

- [ ] Read and follow the [#github-sub-issue-feature](../instructions/tpl-github-sub-issue-feature.instructions.md) template instructions for each issue.

-  [ ] Use the #add_sub_issue to add a sub-issue for each feature at its epic issue:

- After finish with all features.

- [ ] Update [README.md](README.md) with a link to the GitHub issues page.

- [ ] Commit changes by running [/git-commit](git-commit.prompt.md)


### Files System Backlog

 > Read and follow this section if no other backlog is applicable. Skip otherwise.

- [ ] Read and follow the [#BACKLOG](../instructions/tpl-BACKLOG.instructions.md) instructions

- [ ] Fill in the placeholders with relevant information about the project. CHOOSE THE SIMPLEST APPROACH FOR EACH QUESTION. Ask for any missing information to complete the BACKLOG.

- [ ] Write the BACKLOG in Markdown format at `/docs/BACKLOG.md`.

- [ ] Update [README.md](README.md) with link to this BACKLOG

- [ ] Commit changes by running [/git-commit](git-commit.prompt.md)


## Validation

- [ ] Issues were created for each feature or the [BACKLOG.md](/docs/BACKLOG.md) exists

> End of the BACKLOG prompt.

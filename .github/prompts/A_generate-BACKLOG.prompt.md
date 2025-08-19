---
description: "Create the BACKLOG for a project."
---

# Backlog

Create a BACKLOG that outlines the epics and features for the project and its status.

- Prioritize features based on business value and technical feasibility
- Group related features into epics for better organization
- Assign each Epic a Priority: ‼️ Critical ❗ High ❕ Normal
- Keep track of feature dependencies (other features) 
- Keep track of feature status ❌ BLOCKED | ⏳ PENDING | ✨ DESIGNED | ✅ CODED | ✔️ RELEASED 

## Context

- [PRD.md](/docs/PRD.md)
- [DOMAIN.md](/docs/DOMAIN.md)
- [SYSTEMS.md](/docs/SYSTEMS.md)

### GitHub Issues

- Determine if this is a GitHub repository.
- Determine if you have the `#create_issue` tool to access the GitHub API via MCP.
- If so, DO NOT create any document in the file system. Use the GitHub tool to create issues.

## Workflow

- [ ] Write a list of features based on the PRD, DOMAIN, and SYSTEMS documents.

- [ ] Do not detail the features specs, just list them.

- [ ] Include features for project or data boilerplate, initial setup, and any other necessary components.

- [ ] Do not include testing nor documentation features. (they will be tasks to do during implementation, but not features per se)

- [ ] Group related features into epics for better organization.

- [ ] Prioritize epics and features based on business value and technical feasibility.


### GitHub Issues Backlog

 > Use this section if this is a GitHub repository and you have the `#create_issue` tool.

-  For each epic do:

  - [ ] Create a GitHub issues for the epic with:
    - Title : `{ E1 } { Epic 1 Short Name } `
    - Labels: 
      - `priority: ‼️ Critical`
      - `priority: ❗ High`
      - `priority: ❕ Normal`
    - Description: { Epic 1 Short Description }

- After finish with all features.

- [ ] Read and follow the [#github-issue](../instructions/tpl-github-issue.instructions.md) template instructions for each issue.

-  [ ] Add a sub-issue for each feature of the epic issue:

  - [ ] Fill in the placeholders with relevant information about the feature. CHOOSE THE SIMPLEST APPROACH FOR EACH QUESTION. Ask for any missing information to complete.

  - [ ] Create GitHub sub issues for the epic with the feature in the BACKLOG with Title, Description, and any relevant labels.

- After finish with all features.

- [ ] Update [README.md](README.md) with a link to the GitHub issues page.

- [ ] Commit changes by running [/git-commit](git-commit.prompt.md)


### Files System Backlog

 > Use this section if no other backlog is applicable.

- [ ] Read and follow the [#BACKLOG](../instructions/tpl-BACKLOG.instructions.md) instructions

- [ ] Fill in the placeholders with relevant information about the project. CHOOSE THE SIMPLEST APPROACH FOR EACH QUESTION. Ask for any missing information to complete the BACKLOG.

- [ ] Write the BACKLOG in Markdown format at `/docs/BACKLOG.md`.

- [ ] Update [README.md](README.md) with link to this BACKLOG

- [ ] Commit changes by running [/git-commit](git-commit.prompt.md)


## Validation

- [ ] Issues were created for each feature or the [BACKLOG.md](/docs/BACKLOG.md) exists

> End of the BACKLOG prompt.

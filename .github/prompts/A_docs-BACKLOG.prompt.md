---
description: 'Create the BACKLOG for a project.'
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

## Workflow

- [ ] Write a list of features based on the PRD, DOMAIN, and SYSTEMS documents.

- [ ] Do not detail the features specs, just list them.

- [ ] Include features for project or data boilerplate, initial setup, and any other necessary components.

- [ ] Do not include testing nor documentation features. (they will be tasks to do during implementation, but not features per se)

- [ ] Group related features into epics for better organization.

- [ ] Identify feature dependencies.

- [ ] Feature status triage: If has dependencies, set status to ❌ BLOCKED. If not, set to ⏳ PENDING.

- [ ] Epic prioritization triage: If has blocking features, set priority to ‼️ Critical. If not, set to ❗ High or ❕ Normal based on business value and technical feasibility.

- [ ] Sort epics by priority, and features within each epic by technical feasibility.

### File System Backlog

 > Read and follow this section if no other backlog is applicable. Skip otherwise.

- [ ] Read and follow the [#BACKLOG](../instructions/tpl-BACKLOG.instructions.md) instructions

- [ ] Fill in the placeholders with relevant information about the project. CHOOSE THE SIMPLEST APPROACH FOR EACH QUESTION. Ask for any missing information to complete the BACKLOG.

- [ ] Write the BACKLOG in Markdown format at `/docs/BACKLOG.md`.

- [ ] Update [README.md](README.md) with link to this BACKLOG

- [ ] Commit changes by running [/git-commit](git-commit.prompt.md)


## Validation

- [ ] Issues were created for each feature or the [BACKLOG.md](/docs/BACKLOG.md) exists

> End of the BACKLOG prompt.

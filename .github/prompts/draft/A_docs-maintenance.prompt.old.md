---
description: 'Adds a feature or bug to the backlog for an existing project.'
---

# Maintenance Backlog

Add a feature or bug to the BACKLOG of an existing project.
- Identify the new feature or bug to be added.
- Determine the appropriate epic for the feature or bug.
- Assess dependencies with existing features.
- Set the status of the feature based on dependencies.
- Update the BACKLOG document accordingly.

## Context

- [BACKLOG.md](/docs/BACKLOG.md)
- [tpl_docs-BACKLOG](../instructions/tpl_docs-BACKLOG.instructions.md)

## Workflow

- [ ] Identify the new feature or bug to be added.

### For a new feature
- [ ] Determine the appropriate epic for the feature, creating a new epic if necessary.
- [ ] Assess dependencies with existing features.
- [ ] Feature status triage: If has dependencies, set status to ❌ BLOCKED. If not, set to ⏳ PENDING.

### For a bug
- [ ] Bug must go to the fixing epic, creating it if necessary with ‼️ Critical priority.
- [ ] Bug status triage: Always set status to ⏳ PENDING.

### Commit Changes
- [ ] Update the BACKLOG document accordingly.
- [ ] Write the updated BACKLOG in Markdown format at `/docs/BACKLOG.md`.
- [ ] Commit changes by running [/U_git-commit](U_git-commit.prompt.md)

## Validation

- [ ] Issues were created for each feature or the [BACKLOG.md](/docs/BACKLOG.md) exists
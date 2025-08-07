---
description: 'Update the BACKLOG document when a feature is implemented or its status changes.'
---

# Backlog Update Document

Update the BACKLOG document to reflect the current status of features and epics in the project.

## Context

- [BACKLOG.md](/docs/BACKLOG.md)
- [BACKLOG instructions](/.github/instructions/BACKLOG.instructions.md)

## Workflow

### Adding a new feature or epic

- [ ] If a new feature or epic is added, ensure it is documented in the BACKLOG.
- [ ] Use the format specified in the BACKLOG instructions to maintain consistency.

### Updating existing features or epics

- [ ] If the status of an existing feature or epic changes, update the BACKLOG to reflect the new status.
- [ ] Use the color codes for feature status:
  - 🔵 RELEASED
  - 🟢 CODED
  - 🟡 DESIGNED
  - 🟠 PENDING
  - 🔴 BLOCKED
- [ ] Ensure the epics table is updated with the correct feature status.

### When a feature is implemented

- [ ] When a feature status is set to 🟢 CODED or 🔵 RELEASED
 - [ ] Change any dependant features statuses if they are affected by the change. 
 - [ ] If a dependant feature is 🔴 BLOCKED, change its status to 🟠 PENDING.

### After updating the BACKLOG

- If the project uses GitHub Issues:
  - [ ] Run the [/github-issues](../prompts/github-issues.prompt.md) prompt to synchronize GitHub issues with the BACKLOG.
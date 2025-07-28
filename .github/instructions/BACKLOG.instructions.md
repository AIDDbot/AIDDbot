---
description: 'Template for BACKLOG document for a project.'
---

# Backlog for { PROJECT_NAME }

<!-- 
Legend:
- Priority: ‼️ Critical ❗ High  ❕ Normal 
- Status: 🟢 DONE 🟡 IN PROGRESS 🔵 TODO 🔴 BLOCKED 
-->

<!-- 
  Write between 1 and 9 (ideally 3 to 5) epics that represent the main areas of work.
  Use the format E1, E2, etc. to name each epic.
-->

<!-- 
After complete, write a table for the epics with their priority and status 
Write the table before the list, just at the beginning of the document.
Add internal links to the epics, 
Example:
| Epic                                      | Priority   | Status |
| ----------------------------------------- | ---------- | ------ |
| [E1](#e1-user-management--authentication) | ‼️ Critical | 🔵 TODO |
-->

## { E1 } { Epic 1 Short Name }
- **Priority**: { ‼️ Critical ❗ High  ❕ Normal  }, **Status**: { 🟢 DONE 🟡 IN PROGRESS 🔵 TODO 🔴 BLOCKED  }

- { Epic 1 Short Description }

<!-- 
  Write between 1 and 9 (ideally 3 to 5) features that belong to the epic.
  Use the format F1.1, F1.2, etc. to name each feature.
--> 

### { F1.1 } { Feature 1 Short Name }
- **Priority**: { ‼️ Critical ❗ High  ❕ Normal }, **Status**: { 🟢 DONE 🟡 IN PROGRESS 🔵 TODO 🔴 BLOCKED  }
- **Project Requirements:** { R1 Short Description from PRD.md }
- **Dependencies:** { list of dependencies, e.g., F1.2 or none if no dependencies with internal links }
- **Links:** { Links to specs docs and/or issues in a project management tool }

- { Feature 1 Short Description }
---

## Additional Information

<!-- Add any additional information that is relevant to the domain -->

- [Git repository]({ GIT_REPO_URL })
- [PRD Document](./PRD.md)
- [DOMAIN Models](./DOMAIN.md)
- [SYSTEMS Architecture](./SYSTEMS.md)

> End of BACKLOG for { Project Name }, last updated { DATE }.

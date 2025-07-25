---
description: "How to create the BACKLOG document for a project."
---

# BACKLOG Instructions

Create a BACKLOG document that outlines the epics and features for the project and its status.

## Context

- Use the current `PRD.md` , `DOMAIN.md` and `SYSTEMS.md` as primary sources for requirements and business logic.
- Use the current `/README.md` and `/docs` folder to add context to your responses.


## Template

```markdown
# Backlog for { PROJECT_NAME }

## Epics

| Epic                                          | Feat # | Dependencies | Priority | Effort | Status |
| ----------------------------------------------| ------ | ------------ | -------- | ------ | ------ |
| E1 { Epic 1 Short Name }                      | 2      |              |    0️⃣    |   ❗  |    🟢  |
| E2 { Epic 2 Short Name }                      | 3      | { E1 }       |    1️⃣    |   ❕  |    🔵  |

**Legend:** 

- Priority: 0️⃣ Critical 1️⃣ High  2️⃣ Medium 3️⃣ Low
- Effort: ❕ Small ❗ Medium ‼️ Large
- Status: 🟢 DONE 🟡 IN PROGRESS 🔵 TODO 🔴 BLOCKED

---

## Features

### { F1.1 } { Feature 1 Short Name }
**Epic:** { E1 }
**Status**: { Feature Status }
**Dependencies:** none
**Links:** { Links to relevant documents or issues }
- [ ] { Brief list (1-3) of the feature requirements in EARS format. }

### { F1.2 } { Feature 2 Short Name }
**Epic:** { E1 }
**Status**: { Feature Status }
**Dependencies:** { F1.1 }
**Links:** { Links to relevant documents or issues }
- [ ] { Brief list (1-3) of the feature requirements in EARS format. }

---

> End of BACKLOG for { Project Name }, last updated { DATE }.

```

> End of BACKLOG instructions.
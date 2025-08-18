---
description: 'Template for BACKLOG document for a project.'
applyTo: '/docs/BACKLOG.md'
---

# Backlog for { PROJECT_NAME }

## Overview

> Epic Priority Legend: ‼️ Critical ❗ High ❕ Normal
> Feature Status Legend: ❌ BLOCKED | ⏳ PENDING | ✨ DESIGNED | ✅ CODED | ✔️ RELEASED 

- [{ E1 } { Epic 1 Short Name } { Epic 1 Priority }]({#local-link-to-epic-e1}) : { List of status icons for the epic 1 features }
- [{ E2 } { Epic 2 Short Name } { Epic 2 Priority }]({#local-link-to-epic-e2}) : { List of status icons for the epic 2 features }

## { E1 } { Epic 1 Short Name } { Epic Priority }

- { Epic 1 Short Description }

### { F1.1 } { Feature 1 Short Name } {[ghI:#1](Remote link to github issue if exists)} { ✔️ RELEASED | ✅ CODED | 📝 DESIGNED | ⏳ PENDING | ❌ BLOCKED }

- **Dependencies:** { none or a list of dependencies, e.g., F1.2 with internal links }
- **Project Requirements:** 
  - { R1 Requirement 1 short title from PRD.md }

{ Feature 1 Short Description }

---

## Additional Information

- [Git repository]({ GIT_REPO_URL })
- [PRD Document](./PRD.md)
- [DOMAIN Models](./DOMAIN.md)
- [SYSTEMS Architecture](./SYSTEMS.md)

> End of BACKLOG for { Project Name }, last updated { DATE }.

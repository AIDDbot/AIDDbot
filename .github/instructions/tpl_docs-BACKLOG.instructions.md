---
description: 'Template for the BACKLOG document for a project.'
applyTo: '/docs/BACKLOG.md'
---

# Backlog for { PROJECT_NAME }

> Epic Priority Legend: ‼️ Critical | ❗ High  |❕ Normal

> Feature Status Legend: ⛔ BLOCKED | ⏳ PENDING | ⛪ SPECIFIED | ✏️ DESIGNED | 📝 PLANNED | ✨ CODED | ✅ TESTED | ⛲ CLEANED | ✔️ RELEASED 

## { E1 } { Epic 1 Short Name } { Epic Priority }

- { Epic 1 Short Description }
  
### { F1.1 } { Feature 1 Short Name } { Feature Status }

- **Dependencies:** 
  <!-- May be empty -->
  - { F1.2 Feature 2 Short Name with a local link to the feature }
- **Project Requirements:** 
  - { R1 Requirement 1 short title from PRD.md }

{ Feature 1 Short Description }

- **Links:**
  - [Feature Specification](./feats/{featureId}.spec.md)
  - [Design Document](./feats/{featureId}.design.md)
  - [Implementation Plan](./feats/{featureId}.plan.md)

## Additional Information

- [Git repository]({ GIT_REPO_URL })
- [PRD Document](./PRD.md)
- [DOMAIN Models](./DOMAIN.md)
- [SYSTEMS Architecture](./SYSTEMS.md)

> End of BACKLOG for { Project Name }, last updated { DATE }.

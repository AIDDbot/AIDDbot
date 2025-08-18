---
description: "Template for an Issue in GitHub"
---

## Issue Title

{ F1.1 } { Feature 1 Short Name }

## Issue Description

```markdown
# { F1.1 } { Feature 1 Short Name }

- **Dependencies:** { none or a list of dependencies, e.g., F1.2 with issue links }
- **Project Requirements:** 
  - { R1 Requirement 1 short title from PRD.md }

{ Feature 1 Short Description }

## Specification
{ Content from Feature specs file, if exists }

## Design
{ Content from Feature design file, if exists }
```

## Issue labeling

- [ ] Label issues based on their type:
  - `feature` (default)
  - `bug`
  - `task`

- [ ] Label issues based on their epic:
  - `epic: {E1 Epic 1 Short Name}`
  - `epic: {E2 Epic 2 Short Name}`

- [ ] Label issues based on their status (remove and add ensuring only one status label is present):
  - `status: ❌ BLOCKED`
  - `status: ⏳ PENDING`
  - `status: ✨ DESIGNED`
  - `status: ✅ CODED`
  - `status: ✔️ RELEASED`

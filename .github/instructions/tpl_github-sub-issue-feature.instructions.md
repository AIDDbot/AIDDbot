---
description: 'Template for a SubIssue in GitHub for a Feature'
---

## Issue Title

{ F1.1 } { Feature 1 Short Name }

## Issue Description

````markdown
# { F1.1 } { Feature 1 Short Name }

- **Dependencies:** 
  <!-- May be empty -->
  - { F1.2 Feature 2 Short Name with a link to the issue }
- **Project Requirements:** 
  - { R1 Requirement 1 short title from PRD.md }

{ Feature 1 Short Description }

## Specification
<!-- Not to be filled at creation time -->
{ Problem specification }

## Design
<!-- Not to be filled at creation time -->
{ Technical solution }
````

## Sub-Issue type

- [ ] Set the GitHub Issue Type (do not add a type label):
  - Feature (default)
  - Bug

## Sub-Issue labeling

- [ ] Label issues based on their status (remove and add ensuring only one status label is present):
  - `status: ❌ BLOCKED` (if it depends upon other features)
  - `status: ⏳ PENDING` (if no dependencies exist)

<!-- Notes
- Treat "depends upon other features" as: the Dependencies list contains at least one real issue reference (e.g., `#123` or a full issue URL). If empty or explicitly "none", use PENDING.
- Link dependencies using GitHub issue references so they’re clickable.
- Do not add a `feature` label; use the Issue Type instead. -->

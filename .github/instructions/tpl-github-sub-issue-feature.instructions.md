---
description: "Template for a SubIssue in GitHub for a Feature"
---

## Issue Title

{ F1.1 } { Feature 1 Short Name }

## Issue Description

````markdown
# { F1.1 } { Feature 1 Short Name }

- **Dependencies:** 
  <!-- May be empty -->
  - { F1.2 Feature 2 Short Name }
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

## Issue labeling

- [ ] Label issues based on their type:
  - `feature` (default)
  - `bug`

- [ ] Label issues based on their status (remove and add ensuring only one status label is present):
  - `status: ❌ BLOCKED`
  - `status: ⏳ PENDING`
  - `status: ✨ DESIGNED`
  - `status: ✅ CODED`
  - `status: ✔️ RELEASED`

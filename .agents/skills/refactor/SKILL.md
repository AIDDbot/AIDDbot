---
name: refactor
description: >-
  *(WIP — not ready for routine use.)* Improves existing code without changing
  observable behavior. For defects, use /repair on review or verify reports.
---

# Refactor skill (WIP)

## Status

This skill is on the roadmap and not yet implemented. **Do not invoke** unless the user explicitly asks for a behavior-preserving refactor experiment.

## Intended scope (future)

- Rename, extract, or simplify code while keeping tests and acceptance criteria green.
- Defer defect fixes to `/repair` (from `/review` or `/verify` reports).

## Until implemented

| Goal | Use instead |
|------|-------------|
| Fix defects or standard violations | `/review` → `/repair` |
| Implement a spec or improvement | `/specify` → `/planify` → `/codify` |
| UI from a design file | `/design` |

Do not commit under `/refactor` until this skill defines outputs and [skill-integrations](../repository/skill-integrations.md) entries.

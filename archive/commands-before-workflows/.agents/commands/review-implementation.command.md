---
name: review-implementation
description: Review the implementation of a specification
---
# review-implementation

The goal of this command is to verify, qualify and ship the code from a specification.

- Spawn a new **Craftsman** sub-agent to run the [`/verify`](/.agents/skills/verify/SKILL.md) skill to run the e2e and acceptance tests and generate a report from that.
- _Triage_:
  - _IF_ there are defects, run the [`/fix-defects`](./fix-defects.command.md) command with the report in hand, then start this command again from `/verify`.
  - _IF_ there are no defects, spawn a new **Craftsman** sub-agent to run the [`/qualify`](/.agents/skills/qualify/SKILL.md) skill to grade the quality of the code and generate a report from that.
  - _Triage_:
    - _IF_ there are defects, run the [`/fix-defects`](./fix-defects.command.md) command with the report in hand, then start this command again from `/verify`.
    - _IF_ there are no defects, spawn a new **Craftsman** sub-agent to run the [`/shipify`](/.agents/skills/shipify/SKILL.md) skill to ship the code and document the changes.

Return a short report of the implementation reviewed.
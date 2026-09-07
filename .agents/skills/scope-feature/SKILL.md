---
name: scope-feature
description: Decide whether a requirement needs one specification or several coordinated specifications.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# scope-feature

Your goal is to **determine the requirement's specification scope** before delivery writes begin.

- Spawn Architect and execute [scope-change](../scope-change/SKILL.md) in read-only triage mode.
- _FOR-EACH_ affected specification:
  - Resolve and reserve stable `key`, `kind`, and `action`.
- _IF_ several specifications are involved:
  - Resolve and reserve the change key.
- Do not create a manifest during triage.

_RETURN_ scope report with delivery base and one specification or coordinated set; every entry includes `key`, `kind`, and `action`.

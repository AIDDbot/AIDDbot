---
name: scope-feature
description: Decide whether a requirement needs one specification or several coordinated specifications.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# scope-feature

_GOAL_: determine the requirement's specification scope before delivery writes begin.

_SPAWN_ Architect => _FOLLOW_ [scope-change](../scope-change/SKILL.md) in read-only triage mode.
_FOR-EACH_ affected specification:
  _RESOLVE_ and _RESERVE_ stable `key`, `kind`, and `action`.
_IF_ several specifications are involved:
  _RESOLVE_ and _RESERVE_ change key.
_DO-NOT_ create a manifest during triage.
_RETURN_ scope report with delivery base and one specification or coordinated set; every entry includes `key`, `kind`, and `action`.

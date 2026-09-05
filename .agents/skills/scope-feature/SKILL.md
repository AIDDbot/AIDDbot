---
name: scope-feature
description: Decide whether a requirement needs one specification or several coordinated specifications.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# scope-feature

GOAL: determine the requirement's specification scope before delivery writes begin.

SPAWN Architect => FOLLOW [scope-change](../scope-change/SKILL.md) in read-only triage mode.
FOR EACH affected specification:
  RESOLVE and RESERVE stable `key`, `kind`, and `action`.
IF several specifications are involved:
  RESOLVE and RESERVE change key.
DO NOT create a manifest during triage.
RETURN scope report with delivery base and one specification or coordinated set; every entry includes `key`, `kind`, and `action`.

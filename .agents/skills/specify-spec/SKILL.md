---
name: specify-spec
description: Produce and validate a specification for one part of a requirement.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# specify-spec

_GOAL_: produce a validated specification from identity settled by triage.

_PASS_ requirement and scope entry's exact `key`, `kind`, and `action` to Architect => _FOLLOW_ [specify](../specify/SKILL.md).
_KEEP_ delivery owner's active branch.
_IF_ NOT YOLO:
  _PRESENT_ resulting specification.
  _STOP_ for human approval.
_RETURN_ validated specification with reserved identity unchanged.

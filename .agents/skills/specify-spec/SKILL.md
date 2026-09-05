---
name: specify-spec
description: Produce and validate a specification for one part of a requirement.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# specify-spec

GOAL: produce a validated specification from identity settled by triage.

PASS requirement and scope entry's exact `key`, `kind`, and `action` to Architect => FOLLOW [specify](../specify/SKILL.md).
KEEP delivery owner's active branch.
IF NOT YOLO:
  PRESENT resulting specification.
  STOP for human approval.
RETURN validated specification with reserved identity unchanged.

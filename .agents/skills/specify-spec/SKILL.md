---
name: specify-spec
description: Produce and validate a specification for one part of a requirement.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# specify-spec

Your goal is to produce a validated specification from identity already settled by triage.

Pass the requirement and the scope entry's exact `key`, `kind`, and `action` to an Architect following [specify](../specify/SKILL.md). Keep the delivery owner's active branch. Without YOLO, present the resulting specification and stop for human approval.

The result is the validated specification with the reserved identity unchanged.

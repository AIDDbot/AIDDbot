---
name: specify-spec
description: Produce and validate a specification for one part of a change.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# specify-spec

Your goal is to produce a validated durable specification from identity settled by classification.

- Pass the exact `key`, `kind`, and `action` to Architect and execute [specify](../specify/SKILL.md) on the owner's branch.
- _IF_ YOLO does not apply:
  - Present the resulting specification and return it awaiting human approval.
- _IF_ the specification is approved or YOLO applies:
  - Set its contract status to `active`.

_RETURN_ the specification with its reserved identity unchanged and its validation state explicit.

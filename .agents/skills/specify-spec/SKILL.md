---
name: specify-spec
description: Produce and approve one spec.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# specify-spec

Your goal is to produce an approved spec.

- Execute [specify](../specify/SKILL.md) with the reserved identity.
- _IF_ YOLO does not apply:
  - Present the spec and proposed PRD edits for human approval.
- _IF_ approval or YOLO applies:
  - Set the spec to `in-progress` and record authorization in Git.

_RETURN_ the approved spec.

---
name: specify-spec
description: Produce one created or amended contract and obtain its approval.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# specify-spec

Your goal is to produce an approved contract for one change.

- Execute [specify](../specify/SKILL.md) with the resolved key and operation.
- _IF_ YOLO does not apply:
  - Present all created and amended contract content in the change for human approval.
- _IF_ approval or YOLO applies:
  - Record the reviewed revision and authorization once in the change Approval section.

_RETURN_ the approved contract without a separate spec state.

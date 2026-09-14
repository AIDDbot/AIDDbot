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

- Execute [specify](../specify/SKILL.md) with the original request, repository evidence, and reserved identities.
- _IF_ material product questions remain or the proposal does not satisfy its templates:
    - _RETURN_ the draft and concrete unresolved decisions; do not authorize implementation.
- _IF_ existing approval does not cover the current proposal and YOLO does not apply:
    - Present the complete spec and PRD diff, including solution design and acceptance-test changes, for human approval.
    - _IF_ the human requests changes:
        - Revise the proposal through [specify](../specify/SKILL.md) and obtain approval of the revised contents.
    - _IF_ approval is pending or denied:
        - _RETURN_ the draft and approval state.
- Set the spec to `in-progress` and record the authorization covering this proposal in Git.

_RETURN_ the approved spec.

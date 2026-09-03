---
name: specify-spec
description: Produce and validate a specification for one part of a requirement.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# specify-spec

Your goal is to produce a validated specification.

- Spawn a new **Architect** sub-agent to run the [specify skill](../specify/SKILL.md) with the requirement, scope report, and affected specification in hand.
- _IF_ YOLO is not present in the prompt, present the resulting specification and stop for human approval.

Return the resulting specification.

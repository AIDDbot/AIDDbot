---
name: architect-solution-foundation
description: Architect a brownfield or greenfield solution foundation ready for delivery.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# architect-solution-foundation

Your goal is to architect a solution foundation from repository evidence.

Treat substantive application code as brownfield and an empty or documentation-only repository as greenfield. _IF_ partial generated files make either route materially unsafe, report the evidence and ask one closed question before changing files.

- _IF_ brownfield, read and execute [map-solution](../map-solution/SKILL.md).
- _IF_ greenfield, read and execute [design-solution](../design-solution/SKILL.md). _IF_ the validated design requires catalogued archetypes, read and execute [scaffold-workshop](../scaffold-workshop/SKILL.md) on the design branch, then read and execute [map-solution](../map-solution/SKILL.md) to reconcile the materialized containers with the design.

Never scaffold over substantive files, unresolved conflicts, or unrelated changes. The result is an architected solution foundation ready for delivery.

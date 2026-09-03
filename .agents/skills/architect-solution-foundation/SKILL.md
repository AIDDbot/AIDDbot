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

- _IF_ the repository contains enough application code to identify an existing solution, treat it as brownfield and read and execute [map-solution](../map-solution/SKILL.md).
- _IF_ the repository is empty or documentation-only, treat it as greenfield and read and execute [design-solution](../design-solution/SKILL.md). _IF_ the validated design requires materialization, read and execute [scaffoldify](../scaffoldify/SKILL.md), then read and execute [map-solution](../map-solution/SKILL.md) to reconcile the materialized containers with the design.
- _IF_ files exist but there is not enough application code to classify the repository safely, show the conflicting evidence and ask the user whether to preserve it as brownfield or continue as greenfield before changing files. Then follow the selected route.

Never scaffold over existing application files, unresolved conflicts, or unrelated changes. The result is an architected solution foundation ready for delivery.

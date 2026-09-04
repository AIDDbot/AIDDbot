---
name: architect-solution-foundation
description: Architect a brownfield or greenfield solution foundation ready for delivery.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# architect-solution-foundation

Your goal is to **architect a solution foundation** from repository evidence.

- _IF_ the repository contains enough application code to identify an existing solution, 
  - _THEN_ treat it as brownfield and execute [map-solution](../map-solution/SKILL.md) command.
- _IF_ the repository is empty or documentation-only, 
  - _THEN_ treat it as greenfield and execute [design-solution](../design-solution/SKILL.md) command. 
  - _IF_ the validated design requires materialization, 
    - _THEN_ execute [scaffoldify](../scaffoldify/SKILL.md), 
    - _THEN_ execute [map-solution](../map-solution/SKILL.md) command to reconcile the materialized containers with the design.
- _IF_ files exist but there is not enough application code to classify the repository safely, 
  - _THEN_ show the conflicting evidence and ask the user whether to preserve it as brownfield or continue as greenfield before changing files. 
  - _THEN_ follow the selected route.
  - Never scaffold over existing application files, unresolved conflicts, or unrelated changes. 

- _RETURN_ an architected solution foundation ready for delivery.

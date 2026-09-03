---
name: deliver-requirement
description: Deliver a requirement as one specification or a coordinated multi-spec change.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# deliver-requirement

Your goal is to take a requirement from initial analysis through delivery.

- Read and execute the internal [scope-feature worker](../scope-feature/SKILL.md) with the requirement in hand.
- _TRIAGE_:
  - _IF_ the requirement affects one specification, read and execute the internal [deliver-spec worker](../deliver-spec/SKILL.md) with the scope report.
  - _IF_ the requirement affects several coordinated specifications, read and execute the internal [deliver-change worker](../deliver-change/SKILL.md) with the scope report.

Return a short report of the delivered specification or coordinated change.

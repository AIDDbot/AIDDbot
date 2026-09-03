---
name: clean-drift
description: Find durable drift and code-decay findings.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# clean-drift

Your goal is to find orphaned decay and code drift across the whole codebase.

- Spawn a new **Craftsman** sub-agent to inspect qualification reports for every specification represented in the codebase and produce a defect report for orphaned decay and code drift.
- Write durable, evidence-backed findings for every defect. Do not fix code, alter qualification reports, or create a branch.

Return a short report of the findings discovered.

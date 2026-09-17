---
name: curate-quality
description: Review quality evidence and maintain durable quality records.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# curate-quality

Review shipped quality and maintain its technical debt register.

Do not edit code nor write tests. Do not execute e2e tests. Just run the strictest configured lint, complexity, and coverage, and other quality checks. 

For each tool, record every check in `quality/review.md` following `review.template.md`, including passes, unavailable tools, unconfigured checks, and runs without new findings. Use configured thresholds only and confirm concrete impact before recording debt.

Update `{Product_Folder}/quality/TDR.md` following `TDR.template.md` and `debt.contract.md`. If the initialized register or counters are missing, return the need to execute `explore`; do not create replacements. Reserve new D IDs from `counters.yaml`; consolidate or remove entries only when the evidence supports it.

The result is current, traceable quality records.

Commit as `docs(quality): curate debt`.

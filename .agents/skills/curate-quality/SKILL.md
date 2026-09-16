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

Against a known shipped revision, run the strictest configured lint, complexity, coverage, and other quality checks. Record every check in `quality/review.md` following `review.template.md`, including passes, unavailable tools, unconfigured checks, and runs without new findings. Use configured thresholds only and confirm concrete impact before recording debt.

Update `TDR.md` following `TDR.template.md` and `debt.contract.md`. Reserve new D IDs from `counters.yaml`; consolidate or remove entries only when the evidence supports it.

The result is current, traceable quality records.

Commit as `docs(quality): curate debt`.

---
name: inspect-quality
description: Inspect quality evidence and maintain durable quality records.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# inspect-quality

Review shipped quality and maintain its technical debt register.

Do not edit code nor write tests. Do not execute e2e tests. Just run the strictest configured lint, complexity, and coverage, and other quality checks. 

Read the current TDR and review before running the strictest configured checks. Use configured thresholds only and confirm concrete impact before recording debt.

Build a complete replacement for `quality/review.md` following `review.template.md`. Include passes, failures, unavailable or unconfigured checks, and every open system-review finding. Reconfirm each existing review-backed D entry; when its check is unavailable, retain it as not revalidated with its last confirmation. Do not append previous reviews or replace the current file before all checks have a recorded result.

Reconcile `{Product_Folder}/quality/TDR.md` with the replacement review following `TDR.template.md` and `debt.contract.md`, then rewrite the review in one edit. If the initialized register or counters are missing, return the need to execute `document-system`; do not create replacements. Reserve new D IDs from `counters.yaml`; consolidate or remove entries only when the evidence supports it.

The result is current, traceable quality records.

Commit as `docs(quality): audit system`.

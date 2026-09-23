---
name: inspect-quality
description: Inspect quality evidence and maintain durable quality records.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# inspect-quality

Review shipped quality and maintain its technical debt register.

Do not edit code or write tests. Do not execute E2E tests or commands classified as `Build` or `Acceptance`. Run the configured commands classified as `Quality`, including warning denial, complexity, coverage, strict analysis, full-repository checks, and other hardening.

Read the current TDR and review before running the quality commands. Confirm their effective flags and referenced configuration rather than trusting script names. Prefer one configured aggregate quality command when it subsumes the individual checks; otherwise run each independent check once. Use configured commands and thresholds exactly as declared; never construct a stricter invocation or substitute the build lint for a missing quality check. Record unavailable or unconfigured checks as such and confirm concrete impact before recording debt.

Build a complete replacement for `quality/review.md` following `review.template.md`. Include passes, failures, unavailable or unconfigured checks, and every open system-review finding. Reconfirm each existing review-backed D entry; when its check is unavailable, retain it as not revalidated with its last confirmation. Do not append previous reviews or replace the current file before all checks have a recorded result.

Reconcile `{Product_Folder}/quality/TDR.md` with the replacement review following `TDR.template.md` and `debt.contract.md`, then rewrite the review in one edit. If the initialized register or counters are missing, return the need to run `aiddbot init`; do not create replacements. Reserve new D IDs from `.aiddbot/counters.yaml`; consolidate or remove entries only when the evidence supports it.

Journal the review result once.

The result is current, traceable quality records.

Commit as `docs(quality): audit system`.

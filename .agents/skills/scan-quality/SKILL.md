---
name: scan-quality
description: Inspect quality evidence and maintain durable quality records.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# scan-quality

Your goal is to review shipped quality and keep the technical debt register current.

Run only the configured commands classified as `Quality`: warning denial, complexity, coverage, strict analysis, full-repository checks, and other hardening. Never edit code, write tests, or run `Build` or `Acceptance` commands. Confirm each command's effective flags and configuration instead of trusting its name, prefer one aggregate command when it subsumes the rest, and use every command and threshold exactly as configured. A missing check is unavailable or unconfigured, never replaced with a stricter invocation or with the build lint.

After evaluating every configured check, replace `{Product_Folder}/quality/review.md` from `assets/review.template.md` with only unresolved system-review issues. Omit passing checks, resolved issues, and standalone unavailable checks. Keep an existing issue as `not revalidated` when its relevant check is unavailable; unavailable evidence does not resolve it. Record a new issue only when current evidence confirms concrete impact. Then reconcile `{Product_Folder}/quality/TDR.md` with the report following `references/debt.contract.md`. If the register or the counters are missing, return the need to run `aiddbot init`.

Journal the review result.

The result is current, traceable quality records.

Commit as `docs(quality): audit system`.

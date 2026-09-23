---
name: scan-quality
description: Inspect quality evidence and maintain durable quality records.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# scan-quality

Your goal is to review shipped quality and keep the technical debt register current.

Run only the configured commands classified as `Quality`: warning denial, complexity, coverage, strict analysis, full-repository checks, and other hardening. Never edit code, write tests, or run `Build` or `Acceptance` commands. Confirm each command's effective flags and configuration instead of trusting its name, prefer one aggregate command when it subsumes the rest, and use every command and threshold exactly as configured. A missing check is recorded as unavailable or unconfigured, never replaced with a stricter invocation or with the build lint.

Write a complete replacement for `{Product_Folder}/quality/review.md` from `review.template.md`, and only once every check has a recorded result. Then reconcile `{Product_Folder}/quality/TDR.md` with it following `debt.contract.md`. Record debt only with confirmed concrete impact. If the register or the counters are missing, return the need to run `aiddbot init`.

Journal the review result.

The result is current, traceable quality records.

Commit as `docs(quality): audit system`.

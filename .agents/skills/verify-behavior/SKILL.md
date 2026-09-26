---
name: verify-behavior
description: Execute acceptance tests for one spec and record only functional failures.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# verify-behavior

Your goal is to evaluate one spec against its acceptance criteria and record any failures.

Run only the commands classified as `Acceptance` in the system or project instructions. Never edit code, tests, or contracts, and never run unit tests, lint, or quality checks.

Let the E2E suite start its own targets so each run gets a fresh database; never reuse an already running server, because it keeps development data. Free a port with `free-port.ps1` on Windows or `free-port.sh` elsewhere only for a listener whose PID and start identity this run captured.

For `amber` or `red`, write `{Product_Folder}/specs/{spec_key}/verification.md` from `assets/verification.template.md` with only failing or blocked acceptance checks and their evidence; omit passing checks and general execution notes. Then run `scripts/finalize.mjs <spec-directory> <status> "<summary>"`. The finalizer selects the next revision, synchronizes report metadata, records the latest verification status, revision, time, and commit in the spec frontmatter, removes any report on `green`, updates the spec state, and journals the evaluation. Do not increment revisions or journal this evaluation separately.

The result is a journaled green evaluation or a finding-only acceptance report.

Commit as `docs(verification): record acceptance`.

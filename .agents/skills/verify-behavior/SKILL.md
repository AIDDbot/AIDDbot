---
name: verify-behavior
description: Execute acceptance tests for one spec and record only functional failures.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# verify-behavior

Your goal is to evaluate one spec against its acceptance criteria and record any failures.

Run `node .agents/aidd/aidd.mjs run acceptance [--project {project}]`. Never edit code, tests, or contracts, and never run `lint`, `unit`, or `quality` yourself. Check that every requirement of the spec has at least one acceptance test that proves it; a requirement without one is a failure like a failing test.

A failure that an open item of `node .agents/aidd/aidd.mjs debt list` already describes is pre-existing: name it in your result, but it never counts against the spec. Every other failure counts, including shipped behavior the spec does not replace. When only a product decision can tell whether a failure is expected, return that question without recording the evaluation, so no revision is spent.

For `amber` or `red`, write `{Product_Folder}/specs/{spec_key}/verification.md` from `assets/verification.template.md` with only failing or blocked acceptance checks and their evidence; on `green`, delete any earlier `verification.md`. Then run `node .agents/aidd/aidd.mjs eval verification <status> "<summary>"` from the spec branch; it records the next revision at the current commit. Never edit `control.json`, `debt.json`, or anything under `.aiddbot/` by hand: when a command refuses, fix what its error names and run it again.

The result is a recorded green evaluation or a finding-only acceptance report.

Commit as `docs(verification): record acceptance`.

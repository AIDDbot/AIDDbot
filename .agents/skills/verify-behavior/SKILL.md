---
name: verify-behavior
description: Execute acceptance tests for one spec and record only functional failures.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# verify-behavior

Your goal is to evaluate one spec against its unit and acceptance tests, and to record each failure.

Run `node .agents/aidd/aidd.mjs run unit`, then `node .agents/aidd/aidd.mjs run acceptance`, from the spec branch, one at a time. Never edit code, tests, or contracts. Never run `lint`, `quality`, or a test tool yourself.

- A failing unit test blocks the delivery like a failing acceptance test. The core refuses a green verification without a passing unit run at the current commit.
- A requirement without an acceptance test that has its global ID, as a tag or in its title, is a failure.
- A failure is pre-existing only when an open item of `node .agents/aidd/aidd.mjs debt list`, recorded before this spec, describes it. When such items explain all failures, record green with `--preexisting <D IDs>`.
- Each other failure counts, also in shipped behavior that the spec does not replace. New debt never excuses a failure.
- When only a product decision can tell if a failure is expected, return that question and record nothing, so that no revision is spent.

For `amber` or `red`, write `{Product_Folder}/specs/{spec_key}/verification.md` from `assets/verification.template.md`, with only the failing or blocked checks and their evidence. Mark each failing test tagged with another spec as a regression.

Then run `node .agents/aidd/aidd.mjs eval verification <status> "<summary>"` from the spec branch. It records the next revision at the current commit, deletes the report when green, and commits the record.

The result is a recorded green evaluation, or a report of the failures only.

The core commits as `docs(verification): record acceptance`.

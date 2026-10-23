---
name: verify-behavior
description: Execute acceptance tests for one spec and record only functional failures.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# verify-behavior

Your goal is to evaluate one spec against its own acceptance tests, and to record each failure.

Run `node .agents/aidd/aidd.mjs run test --spec` from the spec branch. It runs only the acceptance tests that have the tag of this spec, and it lists each requirement without a test as `untested`. Only a `feat` or a `fix` has a verification: the core refuses it for a `refactor` or a `chore`.

Never edit code, tests, or contracts. Never run the full `test`, a `debt:*` check, or a test tool yourself: the regression belongs to `ship-spec`.

- A requirement without an acceptance test that has its global ID, as a tag or in its title, is a failure.
- A spec without requirements, such as a `fix` from high debt, has no tagged test, and the scoped run is not applicable: its review and the regression of `ship-spec` prove it.
- Each failure counts. Debt never excuses a failure of the tests of this spec.
- When only a product decision can tell if a failure is expected, return that question and record nothing, so that no revision is spent.

For `amber` or `red`, write `.aiddbot/logs/{spec_key}.verification.md` from `assets/verification.template.md`, with only the failing or blocked checks and their evidence.

Then run `node .agents/aidd/aidd.mjs eval verification <status> "<summary>"` from the spec branch. It records the next revision at the current commit and deletes the report when green.

The result is a recorded green evaluation, or a report of the failures only.

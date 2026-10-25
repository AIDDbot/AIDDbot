---
name: verify-behavior
description: Execute acceptance tests for one spec and record only functional failures.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# verify-behavior

Your goal is to evaluate one spec against its own acceptance tests. Record each failure.

Run `node .agents/aidd/aidd.mjs run test --spec` from the spec branch. It runs only the acceptance tests that have the tag of this spec. It lists each requirement without a test as `untested`. Only a `feat` or a `fix` has a verification: the core refuses it for a `refactor` or a `chore`.

Never edit code, tests, or contracts. Never run the full `test`, the `layers` or `crap` checks, or a test tool yourself. The regression belongs to `ship-spec`.

- Each requirement needs an acceptance test with its global ID, as a tag or in its title. A requirement without that test is a failure.
- A spec without requirements, such as a `fix` from high debt, runs the tests that it cites, such as `@S0042-R03`. A spec that has no requirements and cites no tests has no scoped run. Its review and the regression of `ship-spec` prove it.
- Each failure counts. Debt never excuses a failure of the tests of this spec.
- Sometimes only a product decision can tell if a failure is expected. Then return that question and record nothing. Thus no revision is spent.

For `amber` or `red`, write `.aiddbot/logs/{spec_key}.verification.md` from `assets/verification.template.md`. Write only the failing or blocked checks and their evidence.

Then run `node .agents/aidd/aidd.mjs eval verification <status> "<summary>"` from the spec branch. It records the next revision at the current commit. When the status is green, it deletes the report.

The result is a recorded green evaluation, or a report of the failures only.

---
name: verify-behavior
description: Execute acceptance tests for one spec and record only functional failures.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# verify-behavior

Your goal is to evaluate one spec against its own acceptance tests and against the full system, and to record each failure.

1. Run `node .agents/aidd/aidd.mjs run test --spec` from the spec branch. It runs only the acceptance tests that have the tag of this spec, and it lists each requirement without a test as `untested`.
2. Run `node .agents/aidd/aidd.mjs run test`: all the unit tests, then the full acceptance suite. It is the regression, and a green verification needs it at the current code.

Never edit code, tests, or contracts. Never run `lint`, `quality`, or a test tool yourself.

- A requirement without an acceptance test that has its global ID, as a tag or in its title, is a failure.
- A spec without requirements has no tagged test, and the scoped run is not applicable: the full run proves it.
- Each failure counts. Debt never excuses a failure of the tests of this spec.
- A failure of the full run that open debt from `debt list`, recorded before this spec, explains is no failure: name its D IDs in the summary. `ship-spec` gives them to `release --preexisting`.
- When only a product decision can tell if a failure is expected, return that question and record nothing, so that no revision is spent.

Give each failure of the full run, a test of another spec, one cause and one owner:

| Cause | Owner | Proposed repair |
| --- | --- | --- |
| The code of the spec breaks shipped behavior | **Builder** | the production code |
| The test is wrong, not the behavior | **Builder** | the test, with no weaker assertion |
| A requirement of this spec contradicts the test of a shipped one | human | `Replaces: {global ID}` in the spec, if the human agrees |
| Only a product decision can tell | human | the question |

For `amber` or `red`, write `.aiddbot/logs/{spec_key}.verification.md` from `assets/verification.template.md`, with only the failing or blocked checks and their evidence.

Then run `node .agents/aidd/aidd.mjs eval verification <status> "<summary>"` from the spec branch. It records the next revision at the current commit and deletes the report when green.

The result is a recorded green evaluation, or a report of the failures only.

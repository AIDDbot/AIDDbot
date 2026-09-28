---
name: verify-behavior
description: Execute acceptance tests for one spec and record only functional failures.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# verify-behavior

Your goal is to evaluate one spec against its acceptance criteria and record any failures.

Run `node .agents/aidd/aidd.mjs run acceptance [--project {project}]`; it starts the suite fresh, freeing any port the project declares first so a leftover server never masks a real result. Then run `node .agents/aidd/aidd.mjs trace`: each problem it reports, such as a requirement without a tagged test, is a verification failure like a failing test, and verification cannot be recorded green while the trace is red. Never edit code, tests, or contracts, and never run `lint`, `unit`, or `quality` yourself.

Each failure in the run's report comes with its requirements, owner specs, whether its test changed on this branch, the debt that cites it, and a proposed `disposition`; keep every proposed one, and choose among its `choices` only where none is proposed. A `pre-existing` failure is already recorded debt and never counts against the spec, and a `flaky` test passed on retry: name it in your result, but it fails nothing. Among the choices, `regression` breaks shipped behavior the spec does not replace, `compatibility` is shipped behavior the spec must keep working, and `ambiguous` means only a product decision can tell; on `ambiguous`, stop and return the question for the human instead of recording the evaluation.

For `amber` or `red`, write `{Product_Folder}/specs/{spec_key}/verification.md` from `assets/verification.template.md` with only failing or blocked acceptance checks, each with its disposition and evidence; omit passing checks and general execution notes. Then run `node .agents/aidd/aidd.mjs eval record verification <spec-directory> <status> "<summary>"`. It selects the next revision, records the evaluation and whether it requires its report in `control.json`, updates the spec state, removes any report on `green`, and journals the evaluation. Never increment revisions yourself.

The result is a recorded green evaluation or a finding-only acceptance report.

Commit as `docs(verification): record acceptance`.

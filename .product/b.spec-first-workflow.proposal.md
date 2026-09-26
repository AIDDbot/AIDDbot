# Spec-first workflow without a cumulative PRD

Status: discussion to resume; no implementation decision approved.

## Direction discussed

- Treat each spec as the working contract for one change: it defines the intended behavior and acceptance requirements for that delivery.
- A spec is essential while the change is being defined, implemented, verified, and qualified. After completion, it may be archived; it does not have to remain the permanent, authoritative history of product requirements.
- Consider removing the cumulative history of requirement statements from the PRD. The current system behavior and durable product constraints would need a clear home; the code, tests, schemas, project rules, and other current documentation are possible evidence sources.
- Keep verification and qualification distinct: verification checks the spec's requirements; qualification reviews the changed code on the spec branch.
- Give each spec a unique ID and each requirement a local ID within that spec. Use the combined reference as a stable identifier, for example `S0042-R03`.
- Tag E2E tests with the combined spec/requirement identifiers they cover, using the test framework's native tagging mechanism. A test may carry multiple tags when it covers multiple requirements.

## Test-suite triage

Running the full test suite can surface failures whose relationship to the change is unclear. Triage should decide what the failing test says about the changed behavior and choose one disposition:

| Disposition | Decision | Action |
| --- | --- | --- |
| Regression | The spec does not justify changing the tested behavior. | Correct the implementation. |
| Intentional change | The spec explicitly replaces the old behavior. | Update or remove the old test and add or update coverage for the new behavior. |
| Compatibility required | The old behavior must continue alongside the new behavior. | Adapt the implementation to preserve compatibility. |
| Ambiguous | It is unclear whether the old behavior is still required. | Stop and escalate the product decision; do not guess in code or tests. |

The spec can state which affected behaviors it preserves, replaces, or leaves undecided. Archiving the completed spec would preserve the rationale for changed expectations without maintaining a cumulative PRD requirement history.

Requirement tags provide traceability during test triage: they identify which spec requirements a failing test covers and can help select acceptance tests. A tag is evidence of intended coverage, not proof that a failure was caused by the tagged change or that the behavior should be preserved. Triage still compares the spec's intent, the test's behavior, and the baseline branch. Existing tests without tags require manual investigation until they are classified.

## Current repository context

- `/define-spec` currently allocates requirement IDs, writes proposed changes to the PRD, and validates those changes.
- `/verify-behavior` evaluates acceptance criteria and runs commands classified as Acceptance.
- `/review-implementation` qualifies the complete code diff by inspection and does not run tests or quality tools.
- `/ship-spec` currently applies PRD edits and marks the spec as shipped as part of release integration.

## Open questions

- Should completed specs remain in the product repository as an archive, or be removed after shipping?
- What durable product context, if any, should replace the PRD's cumulative requirement list?
- How should tests be selected and grouped for spec verification versus full-suite regression checks?
- What evidence should triage use to distinguish a pre-existing failure from a regression introduced on the spec branch?
- Should each spec explicitly classify affected existing behaviors as preserve, replace, or undecided?
- What local requirement-ID format should specs use, and how should test tags map to one or more requirements?
- How should existing untagged E2E tests be classified and tagged over time?
- How should the workflow record an escalated decision and resume once the human resolves it?
- How should requirement IDs, counters, validation scripts, PRD edits, and shipping records change under this model?

## Resume point

Decide the lifecycle and contents of a spec first. Then define how acceptance tests and full-suite triage relate to that spec, and identify which current product records remain authoritative after shipping.

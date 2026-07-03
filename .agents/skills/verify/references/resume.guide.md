# Verify a spec end-to-end — resume

The goal is to triage an existing e2e report and fix defects in a loop until the suite
is green or a blocker is escalated.

- Read the e2e report; triage — order defects by severity and mark the `structural`
  ones for escalation.
- For each non-structural defect, read the affected `{container}.arch.md` /
  `{container}.rules.md` and apply a minimal, targeted fix.
- Re-run the failing test(s), then widen to the full suite.
- Update the report and the spec's acceptance criteria.
- Repeat until green or no further progress, then document remaining blockers.
- Annotate any fix that deviates from the plan.

## Guardrails
- **Never weaken a test to make it pass** — if a test is wrong, flag it as a test bug
  and fix it for correctness, not for green.
- **Surgical fixes** — minimal, targeted changes grounded in the container's arch/rules.
- **Escalate structural defects** — stop, document in the report, and hand off to
  `/planify`; never fix them yourself.

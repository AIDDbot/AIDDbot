# Verify a spec end-to-end — first run

The goal is to derive e2e tests from the acceptance criteria and e2e plan, run them, and
report defects.

- Read the spec's acceptance criteria and the e2e plan.
- Ground the test code in `e2e.arch.md` / `e2e.rules.md` when they exist.
- Map each plan scenario to one acceptance criterion and to one e2e test.
- Identify the fixtures and the start/test commands (from the root `{Agents_File}`).
- Write one e2e test per scenario, mapped to an acceptance criterion: Arrange-Act-Assert,
  descriptive names, grouped by feature/flow, using the planned fixtures.
- Start the system and run the e2e suite; capture pass/fail per scenario.
- Tear down servers/apps after the run.
- Write `{Specs}/e2e.report.md`: one entry per failing scenario — expected vs actual,
  affected container, severity, and kind.
- In `spec.md`, mark each acceptance criterion `[x]` when its tests pass, `[ ]` otherwise.
- Continue into the fix loop (see the [Resume Guide](./resume.guide.md)) for any defects.

## Guardrails
- **Distrust the implementation, trust the spec** — success is measured by the defects
  you find, not by tests passing.
- **Independence** — derive tests from the spec's criteria and the e2e plan; do not
  mirror the implementation.

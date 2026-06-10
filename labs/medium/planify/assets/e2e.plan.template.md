---
plan-type: e2e
slug: {slug}
---
# e2e - {slug}

## Scope

{The user-facing flows under test, spanning containers per `system.arch.md`.}

**Context**: [link to the source spec for traceability]()

### Acceptance criteria under test
- [ ] {criterion copied from the spec}
- [ ] {criterion}

## Test Steps

### Step 1: {Scenario Title}
{Flow being verified, end-to-end across containers.}
- Paths:
    - {path/to/e2e/test}
- [ ] Arrange: {preconditions / fixtures}
- [ ] Act: {user actions}
- [ ] Assert: {expected outcome mapped to a criterion}

## Execution

- [ ] Run the e2e suite (start/test commands from the root `{Agents_File}`).
- [ ] Tear down servers/apps after the run.

## Defects report

- [ ] Write `{Product_Folder}/specs/{slug}/e2e.report.md` listing each defect found: scenario, expected vs actual, affected container, severity.
- [ ] Mark each acceptance criterion `[x]` in the spec when its tests pass, `[ ]` otherwise.

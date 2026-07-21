---
plan-type: {spec | report | requirement}
container: e2e
---
# {plan-type} - {slug} - e2e

## Specification

{The user-facing flows under test, spanning containers per `system.arch.md`.}

- **Context**: {link to the source spec, report, or requirement for traceability[]()}
- **Architecture**: [E2E container architecture]({Arch}/e2e.arch.md)

### Acceptance criteria under test

- [ ] **AC-{spec_id}.1** — {criterion copied from the spec}
- [ ] **AC-{spec_id}.2** — {criterion}

> Include the AC id in each test title so a criterion's tests are easy to find, run, and fix.

## Checkpoints

> On amend/replan only. Classify every scenario from the prior e2e plan, then rewrite
> Implementation Steps. First plan: write `none — first plan`.

| Prior scenario | Action | Note |
|----------------|--------|------|
| {AC-{spec_id}.n — title or `none — first plan`} | {keep \| redo \| drop} | {one line} |

## Implementation Steps

### Step 1: AC-{spec_id}.1 — {Scenario Title}
{Flow being verified, end-to-end across containers; verifies exactly one AC id,
which the test title must carry.}
- Paths:
    - `{path/to/file1}`
    - `{path/to/folder2/}`
- [ ] Arrange: {preconditions / fixtures}
- [ ] Act: {user actions}
- [ ] Assert: {expected outcome mapped to AC-{spec_id}.1}

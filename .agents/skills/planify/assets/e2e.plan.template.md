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

- [ ] **AC-{NNN}.1** — {criterion copied from the spec}
- [ ] **AC-{NNN}.2** — {criterion}

## Implementation Steps

### Step 1: AC-{NNN}.1 — {Scenario Title}
{Flow being verified, end-to-end across containers; verifies exactly one AC id,
which the test title must carry.}
- Paths:
    - `{path/to/file1}`
    - `{path/to/folder2/}`
- [ ] Arrange: {preconditions / fixtures}
- [ ] Act: {user actions}
- [ ] Assert: {expected outcome mapped to AC-{NNN}.1}

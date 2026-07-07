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

- [ ] {criterion copied from the spec}
- [ ] {criterion}

## Implementation Steps

### Step 1: {Scenario Title}
{Flow being verified, end-to-end across containers; maps to one acceptance criterion.}
- Paths:
    - `{path/to/file1}`
    - `{path/to/folder2/}`
- [ ] Arrange: {preconditions / fixtures}
- [ ] Act: {user actions}
- [ ] Assert: {expected outcome mapped to the criterion}

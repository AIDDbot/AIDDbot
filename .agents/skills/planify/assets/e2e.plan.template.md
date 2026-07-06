---
plan-type: {spec | report | requirement}
container: e2e
---
# {plan-type} - {slug} - e2e

## Specification

{The user-facing flows under test, spanning containers per `system.arch.md`.}

**Context**: [link to the source spec for traceability]()
**Architecture**: [link to `e2e.arch.md`]()

### Acceptance criteria under test
> One scenario step per criterion. Derive from the spec and the shared contracts — never
> from sibling implementations.

- [ ] {criterion copied from the spec}
- [ ] {criterion}

### Replaces
> Only when changing released behavior: the existing e2e scenarios this plan retires.
> Their failures during this build are expected; `/codify` removes them when
> implementing the replacement steps. Omit the section otherwise.

- {governing spec slug}: {scenario title}

### Contracts
> Consumed only: the routes, endpoints, and fixtures agreed with the sibling plans. Must
> match them verbatim; `/codify` may not change them without going back to `/planify`.

- Consumes: {route or endpoint, with its exact shape}

## Implementation Steps

### Step 1: {Scenario Title}
{Flow being verified, end-to-end across containers; maps to one acceptance criterion.}
- Paths:
    - {path/to/e2e/test}
- [ ] Arrange: {preconditions / fixtures}
- [ ] Act: {user actions}
- [ ] Assert: {expected outcome mapped to the criterion}

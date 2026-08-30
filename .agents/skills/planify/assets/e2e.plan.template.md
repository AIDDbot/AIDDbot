---
spec-kind: functional
container: e2e
---
# {spec_key} - e2e

## Specification

{The user-facing flows under test, spanning containers per `system.arch.md`.}

> Write this file for a functional spec only — one scenario per AC id below. A technical spec has
> no functional e2e and does not get this plan.

- **Context**: [Source spec](./spec.md)
- **Architecture**: [E2E container architecture]({Arch}/e2e.arch.md)

### Acceptance criteria under test

- [ ] **AC-{spec_id}.1** — {criterion copied from the spec}
- [ ] **AC-{spec_id}.2** — {criterion}

> Include the AC id in each test title so a criterion's tests are easy to find, run, and fix.

## Checkpoints

> On amend/replan only. Classify every scenario from the prior e2e plan, then rewrite
> Implementation Steps. First plan: write `first`.

| Prior scenario | Action | Note |
|----------------|--------|------|
| {AC-{spec_id}.n — title or `first`} | {keep \| redo \| drop} | {one line} |

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

---

> last updated: {DateTime}
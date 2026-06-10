---
plan-type: {spec | report | requirement}
container: {container name from system.arch.md, e.g. api, web, db}
---
# {plan-type} - {slug} - {container}

## Specification

{What this container must deliver, drawn from the spec's expected results.}

**Context**: [link to the source spec, report, or requirement for traceability]()
**Architecture**: [link to `{container}.arch.md`]()

### Data model
{Data model changes scoped to this container, if applicable.}

### Contracts
> Shared API shapes / schemas this container provides or consumes. Must match the sibling plans verbatim; `/codify` may not change them without going back to `/planify`.

- {Provides | Consumes}: {endpoint or schema, with its exact shape}

## Implementation Steps

### Step 1: {Step Title}
{short description of the step}
- Paths:
    - {path/to/file1}
    - {path/to/folder2/}
- [ ] {Task 1 description in one line}

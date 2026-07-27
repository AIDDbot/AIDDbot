---
spec-kind: {functional | non-functional}
container: {container name from system.arch.md, e.g. api, web, db}
---
# {spec_key} - {container}

## Specification

{What this container must deliver, drawn from the spec's solution overview. On a
non-functional spec, behavior is preserved: what changes is the shape of the code.}

- **Context**: [Source spec](./spec.md)
- **Architecture**: [Container architecture]({Arch}/{container}.arch.md)

### Data model
{Detailed data model changes scoped to this container, if applicable.}

## Checkpoints

> On amend/replan only. Classify every step from the prior plan, then rewrite
> Implementation Steps. First plan: write `first`.

| Prior step | Action | Note |
|------------|--------|------|
| {Step title or `first`} | {keep \| redo \| drop} | {one line} |

## Implementation Steps

### Step 1: {Step Title}
{short description of the step}
- Paths:
    - `{path/to/file1}`
    - `{path/to/folder2/}`
- [ ] {Task 1 description in one line}

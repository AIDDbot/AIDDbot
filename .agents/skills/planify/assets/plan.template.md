---
spec-kind: {functional | technical}
container: {container name from system.arch.md, e.g. api, web, db}
---
# {spec_key} - {container}

## Specification

{What this container must deliver, drawn from the spec's solution overview. On a
technical spec, describe the destination, not user-facing behavior.}

- **Context**: [Source spec](./spec.md)
- **Architecture**: [Container architecture]({Arch}/{container}.arch.md)

### Data model
{Detailed data model changes scoped to this container, if applicable.}

## Checkpoints

{On amend/replan, classify every step from the prior plan, then rewrite the implementation steps. The first plan: write `first`.}

| Prior step | Action | Note |
|------------|--------|------|
| {Step title or `first`} | {keep \| redo \| drop} | {short sentence} |

## Implementation Steps

### Step 1: {Step Title}
{short description of the step}
- Paths:
    - `{path/to/file1}`
    - `{path/to/folder2/}`
- [ ] {Task 1 description in one line}

---

> last updated: {DateTime}
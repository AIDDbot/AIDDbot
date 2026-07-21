---
plan-type: {spec | report | requirement | refactor}
container: {container name from system.arch.md, e.g. api, web, db}
---
# {plan-type} - {slug} - {container}

## Specification

{What this container must deliver, drawn from the spec's solution overview.}

- **Context**: {link to the source spec, report, or requirement for traceability[]()}
- **Architecture**: [Container architecture]({Arch}/{container}.arch.md)

### Data model
{Detailed data model changes scoped to this container, if applicable.}

## Checkpoints

> On amend/replan only. Classify every step from the prior plan, then rewrite
> Implementation Steps. First plan: write `none — first plan`.

| Prior step | Action | Note |
|------------|--------|------|
| {Step title or `none — first plan`} | {keep \| redo \| drop} | {one line} |

## Implementation Steps

### Step 1: {Step Title}
{short description of the step}
- Paths:
    - `{path/to/file1}`
    - `{path/to/folder2/}`
- [ ] {Task 1 description in one line}

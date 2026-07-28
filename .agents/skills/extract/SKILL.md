---
name: extract
description: Document one container in depth — architecture or schema, code rules, and API shapes.
user-invocable: true
disable-model-invocation: true
---
# Extract — document one container in depth

Act as Senior Software Architect. Starting from the system map, you take one runnable unit — one
container — and detail its architecture and its coding rules. You also write the data schemas
when it exposes an API or works against the database.

Here you do read source code: not all of it, only what looks decisive. The documents need detail
and you are the one who supplies it, because this is the layer that plans and development lean on
afterwards.

## Rules

- **One container per run** — `front`, `back`, `db`, `e2e`, or `fullstack`; never all at once.
- **Evidence over invention** — trace every key statement to the repository or to an answer from
  you or the human; never invent in silence. Label and confirm every assumption.
- **Ask, do not assume** — raise closed clarifications, yes/no or multiple choice, one at a time,
  until you are told to fall back on defaults.
- **Observe, never redesign** — document what exists and flag its contradictions instead of
  correcting them.
- **Do go into the source** — read the files and artifacts you judge to be key or archetypal.
- **Coding rules are guidance** — prefer configuring the linter to enforce a rule over writing
  that rule into the documentation.

## Context

- **Required input** — `arch/system.arch.md` and the root agent-rules file.
- **Optional input** — which container to document; if it is missing or ambiguous, ask which one.
- **References** — the templates you fill as the case requires: [container
  architecture](./assets/container.arch.template.md), [relational
  schema](./assets/db.schema.template.md), [API schema](./assets/api.schema.template.md), and
  [code rules](./assets/container.rules.template.md).

## Research

Read the root agent rules and the system architecture, then select the target container — a
runnable unit from `system.arch.md`, the C4 Level 2 view — along with its Tier. If you were not
given one, or the choice is ambiguous, ask which.

Then read the container's folder, its Guide files, and a few representative source files to
understand it from the inside. Ask the human to clear up any gap, one closed question at a time.

## Plan

Pick the right templates for the case. If the tier is `db`, the relational schema; otherwise the
container architecture; and, when the container exposes an API, the API schema as well.

Map every placeholder to concrete evidence from the source or to an explicit answer from the
human. Where a placeholder has nothing behind it, make a proposal and label the assumption.

## Implement

Write the container's documents: the relational schema or the architecture document, whichever
the tier calls for; that container's **Detail** link in `system.arch.md`, pointing at what you
wrote; `rules/{container}.rules.md`, with its front-matter adapted to the harness and its
enforceable rules encoded in the toolchain; and, if it exposes an API, `model/api.schema.md`,
merging endpoints rather than duplicating them.

Commit as `docs(extract): …`. Then hand over so another session continues with the remaining
containers until none are left.

## Verification

- [ ] `rules/{container}.rules.md` exists with no placeholder left blank.
- [ ] The architecture document exists for a code container.
- [ ] `model/api.schema.md` or `model/db.schema.md` exists for a container that exposes or stores data.
- [ ] The **Detail** link in `system.arch.md` points at the artifact you wrote.
- [ ] No assumption is left unconfirmed.

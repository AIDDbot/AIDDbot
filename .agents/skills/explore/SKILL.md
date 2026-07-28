---
name: explore
description: Generate the agent rules, system architecture, conceptual model schema, and the PRD shell.
user-invocable: true
disable-model-invocation: true
---
# Explore — set the project up and map what exists

Act as Senior Software Architect. You generate the project's first layer of documentation: the
agent-rules file, the system architecture, the conceptual model schema, and a shell for the
Product Requirements Document (PRD).

Describe what is already there and prescribe sensible defaults only where nothing exists; never
redesign software that already works. When you are done, hand over to the extraction step for the
deep documentation.

## Rules

- **Evidence over invention** — trace every key statement to the repository or to an answer from
  you or the human; never invent in silence. Label and confirm every assumption.
- **Ask, do not assume** — raise closed clarifications, yes/no or multiple choice, one at a time,
  until you are told to fall back on defaults.
- **Observe, never redesign** — document what exists and flag its contradictions instead of
  correcting them.
- **Stay out of the source** — read only the repository tree and the Guide files: `README.md`,
  `CHANGELOG.md`, and manifests such as `package.json`, `pom.xml`, or `go.mod`.
- **The PRD is a shell** — create it once with its categories empty; the specification step is
  what appends lines to it.

## Context

- **Required input** — the repository tree, from which you derive everything else.
- **References** — the four templates you fill: [agent rules](./assets/AGENTS.template.md),
  [system architecture](./assets/system.arch.template.md), [conceptual model
  schema](./assets/model.schema.template.md), and [PRD](./assets/PRD.template.md).

## Research

Read the Guide files first — root README, manifests, per-container READMEs, build scripts. They
are your evidence, never application code. From them derive the environment (OS, shell, build
tools, framework, remote repository), the product folder and the source folders, the containers —
independently runnable units — each with its tier (`front`, `back`, `db`, `e2e`, `fullstack`), the
problem and the solution, and the domain entities with their relationships.

Where evidence is missing, propose a default and confirm it with a closed question. Stop there,
before drafting a single document.

## Plan

Map every template placeholder to a piece of Guide-file evidence or to an answer from the human.
Where a placeholder has nothing behind it, make a proposal and label the assumption.

Prepare the PRD's product paragraph and leave its categories empty.

## Implement

Write, in order: the agent-rules file — `AGENTS.md` by default, or `CLAUDE.md` — at the repository
root, under 100 lines; `arch/system.arch.md`, the C4 Level 2 view listing the containers with a
**Tier** each; `model/model.schema.md`, entities and relationships only, no attributes; and
`specs/PRD.md` from its template if it does not exist yet.

Commit it all as `docs(explore): …`. Then hand over to the extraction step, one run per container,
to document each in depth.

## Verification

- [ ] The agent-rules file, `arch/system.arch.md`, `model/model.schema.md`, and `specs/PRD.md` exist.
- [ ] Every container carries a Tier, no placeholder is left blank, and the model has no attributes.
- [ ] The PRD has its product paragraph and not one invented category.
- [ ] No assumption is left unconfirmed.

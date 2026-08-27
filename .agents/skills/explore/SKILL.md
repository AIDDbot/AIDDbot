---
name: explore
description: Generate the agent rules, system architecture, conceptual model schema, and the PRD shell.
user-invocable: true
disable-model-invocation: true
---
# Explore — set the project up and map what exists

Act as Senior Software Architect. You generate the project's first layer of documentation: the
agent-rules file, the system architecture, the conceptual model schema, and a shell for the
Product Requirements Document. You describe what is already there and prescribe defaults only
where nothing exists.

## Rules

- **Stay out of the source** — read the repository tree and the Guide files only: `README.md`,
  `CHANGELOG.md`, and manifests such as `package.json`, `pom.xml`, or `go.mod`. The deep pass
  belongs to `/extract`.
- **Evidence wins** — trace every key statement to the repository or to an answer from the human.
  Where evidence is missing, propose a default and confirm it with a closed question, one at a
  time, until you are told to stop asking.
- **Observe, never redesign** — document what exists and flag its contradictions instead of
  correcting them.
- **You settle the product paths** — `{Product_Folder}` and `{Source_Folders}` are chosen here
  and recorded in `AGENTS.md`. `{Agents_File}` is always `AGENTS.md`; `{Agents_Folder}` is always
  `.agents/`. Never assume the repository root: propose what the repo suggests, confirm it, and
  write your own artifacts under what was agreed.
- **The PRD is a shell** — create it once with its categories empty; `/specify` is what appends
  lines to it.
- **The agent-rules file stays under 100 lines** — it is loaded into every session.

## Context

- **Input** — the repository tree, from which you derive everything else.
- **References** — the four templates you fill: [agent rules](./assets/AGENTS.template.md),
  [system architecture](./assets/system.arch.template.md), [conceptual model
  schema](./assets/model.schema.template.md), and [PRD](./assets/PRD.template.md).

## Method

Read the Guide files and derive from them the environment, the product and source folders, the containers —
independently runnable units, each with its tier — the problem and the solution, and the domain
entities with their relationships. An existing layout is evidence: a repo already holding `docs/`
or `.product/` has answered the product folder for you. Settle every gap with the human before
drafting a single document.

Then write, in order: `AGENTS.md` at the repository root; `{Product_Folder}/arch/system.arch.md` as the C4 Level 2
view; the entities and relationships of `{Product_Folder}/model/model.schema.md`; and
`{Product_Folder}/specs/PRD.md` if it does not exist yet. Commit as `docs(explore): …`.

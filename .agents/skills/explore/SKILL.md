---
name: explore
description: Generate the agent rules, system architecture, conceptual model schema, and the PRD shell.
user-invocable: true
disable-model-invocation: true
---
# Explore — set the project up and map what exists

Act as Senior Software Architect. 
You generate the project's first layer of documentation: 
  - the agent-rules file (`AGENTS.md` and `CLAUDE.md` with a link to it ), 
  - the system architecture (`{Product_Folder}/arch/system.arch.md`), 
  - the conceptual model schema (`{Product_Folder}/model/model.schema.md`), and 
  - a shell for the Product Requirements Document (`{Product_Folder}/specs/PRD.md`). 

You describe what is already there and prescribe defaults only where nothing exists.

## Rules

- **Stay out of the source** — read the repository tree and the _Guide files_ only: 
  - `README.md`,
  - `CHANGELOG.md`, 
  - and manifests such as `package.json`, `pom.xml`, or `go.mod`. 
  - The deep pass through the source code belongs to `/extract`.
- **Evidence wins** — trace every key statement to the repository or to an answer from the human.
  Where evidence is missing, propose a default and confirm it with a closed question, one at a
  time, until you are told to stop asking.
- **Observe, never redesign** — document what exists and flag its contradictions instead of correcting them.
- **You settle the product paths** 
  - `{Product_Folder}` and `{Source_Folders}` are chosen here and recorded in `AGENTS.md`. 
  - `{Agents_File}` is always `AGENTS.md` and a `CLAUDE.md` with a link to it `@AGENTS.md`.
  - `{Agents_Folder}` is always `.agents/` .
  - Never assume the repository root: propose what the repo suggests, confirm it, and write your own artifacts under what was agreed.
- **The PRD is a shell** — create it once with its categories empty; Do not add any features or requirements yet.
- **The agent-rules file is short** — stays under 100 lines.
- **Use the ISO 8601 format for DateTime timestamps** — At the end of every generated file, add a `> last updated: {DateTime}` (`YYYY-MM-DDTHH:MM:SSZ`).

## Method

Read the Guide files and derive from them the 
  - environment, 
  - the product and source folders, 
  - the containers — independently runnable units, each with its tier — 
  - the problem and the solution, and 
  - the domain entities with their relationships. 
An existing layout is evidence: a repo already holding `docs/` or `.product/` has answered the product folder for you. 
Settle every gap with the human before drafting a single document.

Then write (following the templates), in order: 
  - `AGENTS.md` at the repository root and a `CLAUDE.md` with a link to it `@AGENTS.md`;
  - `{Product_Folder}/arch/system.arch.md` as the C4 Level 2 view; 
  - the entities and relationships of `{Product_Folder}/model/model.schema.md`; 
  - `{Product_Folder}/specs/PRD.md` if it does not exist yet. 
Commit as `docs(explore): …`.

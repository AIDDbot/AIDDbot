---
name: extract
description: Document one project's rules or a shared schema from repository evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# extract

Your goal is to document one project or shared schema.

Read only decisive source files and `AGENTS.md`.
Identify the project by its source folder, responsibility, and configuration. 

Write `{Agents_Folder}/rules/{project}.rules.md` from the [project rules template](./assets/project.rules.template.md). Example: `./agents/rules/front.rules.md`
Add its source path, responsibility, and link to the root project map. Record project-specific rules only when evidence or an explicit decision supports them; tooling owns mechanically enforced rules.

Write a database or API schema from its existing template only when the project exposes that shared contract. 
Do not create system architecture or separate project architecture files other than the templates from assets.

The result is current project rules or a shared schema.

Link or reference those documents in the AGENTS.md file to ease finding them.

Commit as `docs(extract): {project}`.

---
name: document-project
description: Document one project or subdomain folder.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# document-project

Document one project or subdomain folder generating archotecture, detailed diagramas and coding rules.

Read only decisive source files, tree folders, manifests, and referenced tool configuration.

Identify the project/domain by its source folder, responsibility, and configuration. 

Classify each discovered command by its effective flags and configuration, not its script name. Put error-level lint, ordinary build checks, and affected unit tests in `Build`. Put E2E requirement checks in `Acceptance`. Put warning denial, complexity, coverage, strict analysis, full-repository checks, and hardening in `Quality`. A command that chains multiple phases belongs to the strictest phase it executes. Record unavailable commands explicitly and never invent a safer or stricter substitute.

Write one rules file named `{Agents_Folder}/rules/{project}.rules.md` following the `project.rules.template.md`. Example: `./agents/rules/front.rules.md` or `./agents/rules/invoicing.rules.md`

Write a database or API schema from its existing template only when the project exposes that shared contract. Use the templates `db.schema.template.md` and `api.schema.template.md` from assets. Write them at `{Product_Folder}/model/` folder.

Do not create system architecture or separate project architecture files other than the templates from assets.

The result is current project/domain rules or a shared schema.

Link or reference those documents in the AGENTS.md file to ease finding them.

Commit as `docs(project): document {project}`.

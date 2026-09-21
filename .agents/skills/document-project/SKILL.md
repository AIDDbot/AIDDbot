---
name: document-project
description: Document one project or subdomain folder.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# document-project

Document one project or subdomain folder with its boundary, structure, dependencies, and coding rules.

Read only decisive source files, folder trees, manifests, and referenced configuration.

Identify the project/domain by its source folder, responsibility, and configuration. 

Document important project paths and files. Do not inventory skills, commands, or the model actions that execute them; the orchestrator skills own that routing.

Write one rules file named `{Agents_Folder}/rules/{project}.rules.md` following the `project.rules.template.md`. Example: `./agents/rules/front.rules.md` or `./agents/rules/invoicing.rules.md`

Write a database or API schema from its existing template only when the project exposes that shared contract. Use the templates `db.schema.template.md` and `api.schema.template.md` from assets. Write them at `{Product_Folder}/model/` folder.

Do not create system architecture or separate project architecture files other than the templates from assets.

Execute `record-journal` for the documentation result with `stage: document` and the project name.

The result is current project/domain rules or a shared schema.

Link or reference those documents in the AGENTS.md file to ease finding them.

Commit as `docs(project): document {project}`.

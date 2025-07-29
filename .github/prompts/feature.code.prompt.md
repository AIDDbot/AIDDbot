---
description: Feature Code Generation
---

# Feature Code Generation

Write code for the feature: ${input:featureId}

## Context

- Read the feature specifications from the [{featureId}.spec.md](/docs/{featureId}.spec.md) document.

- Read the feature design from the [{featureId}.design.md](/docs/{featureId}.design.md) document.

- Read the feature implementation tasks from the [{featureId}.tasks.md](/docs/{featureId}.tasks.md) document.

- Read and follow the technical instructions related architecture  and coding standards from [/.github/instructions](/.github/instructions) folder.
  - [Architecture Instructions](/.github/instructions/architecture.instructions.md) 
  - [Structure Instructions](/.github/instructions/structure.instructions.md)
  - [Clean Code Instructions](/.github/instructions/clean-code.instructions.md)
  - [{framework} Instructions](/.github/instructions/{framework}.instructions.md) for any specific framework involved
  - [{language} Instructions](/.github/instructions/{language}.instructions.md) for any specific language involved

- Run the [/fetch-instructions](/.github/prompts/fetch-instructions.prompt.md) prompt to check for any specific coding instructions not provided in the current context.

- Read the current (if exists) [STRUCTURE.md](/docs/STRUCTURE.md) document that describes the project structure and conventions.

## Workflow

- [ ] Read the tasks in the [{featureId}.tasks.md](/docs/{featureId}.tasks.md) document.
- [ ] Execute the tasks in the order they are listed.
- [ ] Mark each task as complete by updating the status in the [{featureId}.tasks.md](/docs/{featureId}.tasks.md) document.
- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with the status 🟢 CODED.

## Validation

- [ ] [{featureId}.tasks.md](/docs/{featureId}.tasks.md) exists
- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature implementation tasks link and status
- [ ] Run [/git-commit](/.github/prompts/git-commit.prompt.md)
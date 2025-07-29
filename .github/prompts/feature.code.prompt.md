---
description: Feature Code Generation
---

# Feature Code Generation

Write code for the feature: ${input:featureId}

## Context

- Read the feature specifications from the [{featureId}.spec.md](/docs/{featureId}.spec.md) document.

- Read the feature design from the [{featureId}.design.md](/docs/{featureId}.design.md) document.

- Read the feature implementation tasks from the [{featureId}.tasks.md](/docs/{featureId}.tasks.md) document.

- Run the [/fetch-instructions](/.github/prompts/fetch-instructions.prompt.md) prompt to check for any specific coding instructions.

- Read instructions related to language, framework, and coding standards from [/.github/instructions](/.github/instructions) folder.

## Workflow

- [ ] Read the tasks in the [{featureId}.tasks.md](/docs/{featureId}.tasks.md) document.
- [ ] Execute the tasks in the order they are listed.
- [ ] Mark each task as complete by updating the status in the [{featureId}.tasks.md](/docs/{featureId}.tasks.md) document.
- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with the status 🟢 DONE.

## Validation

- [ ] [{featureId}.tasks.md](/docs/{featureId}.tasks.md) exists
- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature implementation tasks link and status
- [ ] Run [/git-commit](/.github/prompts/git-commit.prompt.md)
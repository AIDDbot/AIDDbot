---
description: 'Write clean plan for a feature implementation'
---

# Feature Clean Plan

Write clean plan for the feature: ${input:featureId}

## Context

- [{featureId}.design.md](/docs/feats/{featureId}.design.md)
- [Architecture Instructions](/.github/instructions/architecture.instructions.md)
- [STRUCTURE.md](/docs/STRUCTURE.md) (if exists)
- [frm-{framework} Instructions](/.github/instructions/frm-{framework}.instructions.md) for any specific framework involved
- [lng-{language} Instructions](/.github/instructions/lng-{language}.instructions.md) for any specific language involved
- [Clean Code Instructions](/.github/instructions/gid-clean-code.instructions.md) for best practices in writing clean code
- Follow the [Object Calisthenics standard](/.github/instructions/std-object-calisthenics.instructions.md)


## Workflow

- [ ] Use the #runCommands tool run any linter or formatter to clean the code.

- [ ] Use the #getTerminalOutput tool to check the output of the linter or formatter and fix any issues.

- [ ] Read the code related to the feature in the [{featureId}.design.md](/docs/feats/{featureId}.design.md) document.

- [ ] Look for any code smells or anti-patterns in the code and fix them.

- [ ] Look for duplicated or easy to abstract code and refactor it.

- [ ] Look for any code that can be simplified or made more readable and refactor it

- [ ] **Run the Test**: Run the tests to ensure they pass.

- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with:
  - [ ] change or keep the status to ⛲ CLEANED

- [ ] Commit changes by running [/git-commit](/.github/prompts/git-commit.prompt.md) with refactor type message

## Validation

- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature test link and status

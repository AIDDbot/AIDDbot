---
description: 'Clean a feature implementation'
---

# Feature Clean 

Refactor latest changes for the feature spec: ${input:featureId} in order to make the code more maintainable and easier to understand.

## Context

Specification document:
- [{specId}.spec.md](/docs/specs/{specId}.spec.md)

Best practice instructions:
- [Architecture Instructions](../instructions/bst_architecture.instructions.md)
- [Clean Code Instructions](../instructions/bst_clean-code.instructions.md) for best practices in writing clean code
- If OOP, then ensure to follow the [Object Calisthenics standard](../instructions/std_object-calisthenics.instructions.md)


## Workflow

- [ ] Use the #runCommands tool run any linter or formatter to clean the code.

- [ ] Use the #runCommands/getTerminalOutput tool to check the output of the linter or formatter and fix any issues.

- [ ] Read the code changed in this spec branch carefully.

- [ ] Look for any code smells or anti-patterns in the code and fix them.

- [ ] Look for duplicated or easy to abstract code and refactor it.

- [ ] Look for any code that can be simplified or made more readable and refactor it

- [ ] Add documentation comments to any public or exported functions, classes, or modules in the feature codebase.

## Validation

- [ ] Commit changes by running [/U_git-commit](U_git-commit.prompt.md) with docs type message and closing the feature.

- [ ] Merge the branch named `dev/{specId}` to `main` and switch to it.

> End of Feature Clean prompt.
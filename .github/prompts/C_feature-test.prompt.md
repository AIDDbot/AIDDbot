---
description: 'Write a test suite for a feature implementation'
---

# Feature Test Suite

Write a test suite for the feature: ${input:featureId}

## Context

Specification document:
- [{specId}.spec.md](/docs/specs/{specId}.spec.md)

Best practice instructions:
- [Architecture Instructions](../instructions/bst_architecture.instructions.md)
- [Testing Instructions](../instructions/bst_unit-test.instructions.md) for best practices in writing tests

Technical instructions:
- [frm-{framework} Instructions](../instructions/frm_{framework}.instructions.md) for any specific framework involved
- [frm-{testing} Instructions](../instructions/frm_{testing}.instructions.md) for Testing framework involved

## Workflow

- [ ] Determine if the feature really needs a test. Only business features do. If the feature is not business related, skip this step.

- [ ] Use the acceptance criteria in the [{specId}.spec.md](/docs/specs/{specId}.spec.md) document to identify the key functionalities that need to be tested.

- [ ] Write a list of the tasks for a test suite that may include:
  - Unit tests (For complex logic, utility functions, data transformations, etc.)
  - Integration tests (For interactions between modules, services, databases, etc.)
  - End-to-end tests (For web and /or api applications)

- [ ] implement the test suite in order.

## Validation

- [ ] **Run the Test**: Run the tests to ensure they pass.
  - [ ] If it fails, fix and try again ONE more time.
  - [ ] If the test still fails, write a report at `/docs/specs/{specId}.test.fail.md`.

- [ ] Commit changes by running [/U_git-commit](U_git-commit.prompt.md) and type test message.

> End of Feature Test Plan prompt.
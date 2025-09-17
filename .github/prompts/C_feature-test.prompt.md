---
description: 'Write a test suite for a feature implementation'
---

# Feature Test Suite

Write a test suite for the feature: ${input:featureId}

## Context

- [{featureId}.spec.md](/docs/specs/{featureId}.spec.md)
- [Architecture Instructions](../instructions/bst_architecture.instructions.md)
- [STRUCTURE.md](/docs/STRUCTURE.md) 
- [frm-{framework} Instructions](../instructions/frm_{framework}.instructions.md) for any specific framework involved
- [lng-{language} Instructions](../instructions/lng_{language}.instructions.md) for any specific language involved
- [frm-playwright Instructions](../instructions/frm_playwright.instructions.md) for Playwright tests

- If there is no specific language instructions use the #fetch tool to search for recent instructions and best practices at https://github.com/github/awesome-copilot

## Workflow

- [ ] Determine if the feature really needs a test. Only business features do. If the feature is not business related, skip this step and mark the feature as tested in the Backlog.

- [ ] Write a test suite that may include:
  - Unit tests
  - Integration tests
  - End-to-end tests (using Playwright for web and api applications)

- [ ] implement the test suite in order.

- [ ] **Run the Test**: Run the tests to ensure they pass.
  - [ ] Fix and try again one more time.
  - [ ] If the test still fails, write a report at `/docs/specs/{featureId}.fail.test.md`.

- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with:
  - [ ] If tests pass, change or keep the status to ✅ TESTED, if not, change the status to ❌ FAILED.

- [ ] Commit changes by running [/U_git-commit](U_git-commit.prompt.md) and type test message.

## Validation

- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature test link and status

> End of Feature Test Plan prompt.
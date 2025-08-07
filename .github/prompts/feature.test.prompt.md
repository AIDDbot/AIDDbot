---
description: "Write test plan for a feature implementation"
---

# Feature Test Plan

Write test plan for the feature: ${input:featureId}

## Context

- [{featureId}.spec.md](/docs/feats/{featureId}.spec.md)
- [{featureId}.design.md](/docs/feats/{featureId}.design.md)
- [{featureId}.tasks.md](/docs/feats/{featureId}.tasks.md)
- [Architecture Instructions](/.github/instructions/architecture.instructions.md)
- [STRUCTURE.md](/docs/STRUCTURE.md) (if exists)
- [frm-{framework} Instructions](/.github/instructions/frm-{framework}.instructions.md) for any specific framework involved
- [lng-{language} Instructions](/.github/instructions/lng-{language}.instructions.md) for any specific language involved
- [frm-playwright Instructions](/.github/instructions/frm-playwright.instructions.md) for Playwright tests

- If there is no specific language instructions use the #fetch tool to search for recent instructions and best practices at https://github.com/github/awesome-copilot

## Workflow

- [ ] Determine if the feature really needs a test. Only business features do. If the feature is not business related, skip this step and mark the feature as tested in the Backlog.

- [ ] Write a test plan [{featureId}.test.md](/docs/feats/{featureId}.test.md) document that may include:
  - Unit tests
  - Integration tests
  - End-to-end tests (using Playwright for web and api applications)

- [ ] Execute the tasks in the order they are listed.

- [ ] Mark each task as complete by updating the status in the [{featureId}.test.md](/docs/feats/{featureId}.test.md) document.

- [ ] **Run the Test**: Run the tests to ensure they pass.

- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with the feature specification link and status ✔️ CODED by running [/backlog-update](/.github/prompts/backlog-update.prompt.md) .

- [ ] Commit changes by running [/git-commit](/.github/prompts/git-commit.prompt.md) and type test message.

## Validation

- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature test link and status

> End of Feature Test Plan prompt.
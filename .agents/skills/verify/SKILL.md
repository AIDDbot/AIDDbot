---
name: verify
description: Writes and runs E2E tests to verify that implemented code meets the defined acceptance criteria. Use this skill after implementing a feature or bug fix to ensure it fulfills the requirements and is ready for deployment. Trigger on phrases like "verify this", "write E2E tests", "check acceptance criteria", or whenever a spec or implementation is ready for end-to-end verification.
---

# Verify skill

## Role
Act as a quality assurance engineer.

## Task
Given a specification file, write and run E2E tests that cover all acceptance criteria and confirm the implementation is correct.

## Context

### Input
- A specification file `{slug}.spec.md` with acceptance criteria.

### References
- `AGENTS.md` — product paths, spec status chain, E2E framework, test commands, project layout
- `{Product_Folder}/rules/testing.rules.md` when present — test folder and conventions
- Load the guide for the E2E framework in use:
  - Playwright → [Playwright guidelines](./playwright.md)
  - *(add further framework guides here as needed)*
- [Verify report template](../review/verify.report.template.md) — failure findings table

## Steps

### Step 1: Clarify the input
- [ ] Read `AGENTS.md` and `{Product_Folder}/rules/testing.rules.md` (if present) to choose the E2E framework and test directory.
- [ ] If the spec or framework is unclear, ask the minimum questions needed before proceeding.

### Step 2: Review acceptance criteria
- [ ] Read the specification and identify all acceptance criteria to be verified.

### Step 3: Write E2E tests
- [ ] Write tests covering all acceptance criteria, including edge cases.
- [ ] Follow the Arrange-Act-Assert pattern where applicable.
- [ ] Prioritize tests that run in isolation with no external dependencies.

### Step 4: Run and verify
- [ ] Ensure the application is running and in a testable state.
- [ ] Execute all E2E tests and verify they pass.
- [ ] On full pass, set `{Product_Folder}/specs/{slug}.spec.md` frontmatter `status: verified`.
- [ ] On failure, leave `status: in-progress` (do not set `verified`).
- [ ] If any tests fail, document each failure with: file/location, issue, severity, **acceptance criterion** (quote or ID from spec), description, recommendation.
- [ ] If failures persist, write the report (Step 5) and suggest `/repair` — do not force-pass.
- [ ] Shut down any services started for testing.

### Step 5: Report failures for repair
- [ ] When tests fail, write findings to `{Product_Folder}/reports/{slug}.verify.report.md` using [verify.report.template.md](../review/verify.report.template.md).
- [ ] Suggest running `/repair` on that report before re-running `/verify`.

## Output
- [ ] A passing E2E test suite covering all acceptance criteria, or a verify report ready for `/repair`.

## Verification
- [ ] All tests pass, or failures are captured in `{Product_Folder}/reports/{slug}.verify.report.md` for `/repair`.

## Git (required)
- [ ] Read and follow [repository skill](../repository/SKILL.md) per [skill integrations](../repository/skill-integrations.md).
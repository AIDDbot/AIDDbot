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
- `{Product_Folder}/specs/{slug}.spec.md` with acceptance criteria (`status: in-progress`, or `verified` only when re-running)

### References
- `AGENTS.md` — E2E framework, test commands, layout
- `{Product_Folder}/rules/testing.rules.md` when present
- Framework guide (e.g. [Playwright](./playwright.md))
- [Verify report template](../review/verify.report.template.md)

## Steps

### Step 1: Clarify the input
- [ ] Read `AGENTS.md` and `testing.rules.md` (if present) for framework and test directory.
- [ ] If spec or framework is unclear, ask the minimum questions needed.

### Step 2: Review acceptance criteria
- [ ] List all criteria to verify from the spec.

### Step 3: Write E2E tests
- [ ] Cover all criteria and edge cases; Arrange-Act-Assert where applicable; prefer isolated tests.

### Step 4: Run and verify
- [ ] Application testable; run all E2E tests.
- [ ] Mark the acceptance criteria as verified in the spec file.
- [ ] Pass → set spec `status: verified`. Fail → keep `in-progress`; do not set `verified`.
- [ ] On failure: document per [verify.report.template.md](../review/verify.report.template.md); suggest `/repair`; shut down test services.

### Step 5: Report failures
- [ ] Write `{Product_Folder}/reports/{slug}.verify.report.md` when tests fail.

## Output
- [ ] Passing E2E suite, or verify report ready for `/repair`.

## Verification
- [ ] All tests pass, or failures captured in the verify report.
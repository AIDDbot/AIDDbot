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

- Spec: `{Product_Folder}/specs/{slug}.spec.md`

### References
- Rules with E2E codification instructions in docs under `{Rules_Folder}`.
- Framework guide (e.g. [Playwright](./playwright.md))
- [testing.guidelines.md](./testing.guidelines.md) — coverage expectations when strengthening a suite

## Steps

### Step 1: Clarify the input
- [ ] Read `AGENTS.md` for framework, test directory, and brownfield rules when present.
- [ ] If spec or framework is unclear, ask the minimum questions needed.

### Step 2: Review acceptance criteria
- [ ] List all criteria to verify from the spec.
- [ ] Cross-check against [testing.guidelines.md](./testing.guidelines.md) when adding or extending tests.

### Step 3: Write E2E tests
- [ ] Cover all criteria and edge cases; 
- [ ] Arrange-Act-Assert where applicable; 
- [ ] Prefer isolated tests.

### Step 4: Run and verify
- [ ] Application testable; run all E2E tests.
- [ ] Fix any error caused by bad test implementation.
- [ ] Never change the application code to make tests pass.

### Step 5: Report
- [ ] Write `{Product_Folder}/reports/{slug}.verify.report.md`
- [ ] Mark each criterion in the spec as `[x]` when tests pass.

## Output
- [ ] E2E test suite executed.
- [ ] Verify report at `{Product_Folder}/reports/{slug}.verify.report.md`.
- [ ] If there are no errors suggest `/review` for a11y, security, and performance defects, and optionally `/refactor` for clean-code hygiene.
- [ ] Ask the user to keep running the same test commands after follow-up edits (or re-run in-session when possible).
- [ ] If there are errors suggest `/rectify` to fix the report.

## Verification
- [ ] All tests are executed.
- [ ] Verify report is written.
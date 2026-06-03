---
name: verify
description: Write and run E2E tests for a spec, fix failures in a loop, and mark acceptance criteria in the spec.
---

# Verify skill

## Role
QA engineer who also fixes failures.

## Task
Cover every acceptance criterion with E2E tests, run them, fix what fails, and record the result in the spec. No separate report file.

## Context
- Input: `{Product_Folder}/specs/{slug}/spec.md`.
- Prereq: E2E framework installed (see `arch/system.arch.md`); framework guide, e.g. Playwright.

## Steps

### Step 1: Plan coverage
- [ ] List acceptance criteria from the spec.

### Step 2: Write tests
- [ ] One test per criterion plus key edge/error cases. Arrange-Act-Assert; descriptive names; group by feature.

### Step 3: Run and fix (loop)
- [ ] Run the suite. For each failure, decide test bug vs code bug and fix it (minimal, targeted).
- [ ] Re-run until green or no further progress; then stop and report blockers.
- [ ] Tear down servers/apps.

### Step 4: Record
- [ ] In `spec.md`, mark each criterion `[x]` when its tests pass, `[ ]` otherwise.
- [ ] Summarize pass/fail in chat.

## Output
- [ ] E2E suite written and executed; spec criteria marked `[x]/[ ]`.
- [ ] Commit (`test`; scope `e2e` or `{slug}`); suggest `/review` when green.

## Verification
- [ ] All criteria have tests; servers/apps are stopped.

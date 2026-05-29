---
name: refactor
description: >-
  Improves implementation quality (clean code, DRY, readability, structure) without changing observable behavior. Applies edits directly. After edits, creates one detailed conventional commit via `/repository` and instructs the user to run tests (or `/verify`). For a11y, security, or performance defects, use `/review`. Trigger on "refactor this", "clean up this code", "apply clean code", "DRY this", or for behavior-preserving hygiene after `/codify`.
---

# Refactor skill

## Role

Act as a senior engineer doing **behavior-preserving** refactors.

## Task

Improve structure, naming, and duplication in the agreed scope. Do **not** fold accessibility, security, or performance remediation into this pass unless the user explicitly asks — use `/review` for those.

## Context

### Input

- Feature branch: changed files
- Plan file: files listed in plan
- Explicit paths or globs from the user

### References

- [clean-code.guidelines.md](./clean-code.guidelines.md)

## Steps

### Step 1: Confirm scope

- [ ] List files to modify; if ambiguous, ask the minimum clarifying questions.

### Step 2: Guardrails

- [ ] Treat existing tests and acceptance criteria as the contract; preserve public APIs and observable behavior unless the user says otherwise.

### Step 3: Refactor

- [ ] Apply [clean-code.guidelines.md](./clean-code.guidelines.md) file by file; keep diffs focused on the scope.

### Step 4: Commit (required)

- [ ] Invoke **`/repository`** once work is complete and produce **one** conventional commit.
- [ ] Commit **subject**: concise imperative (e.g. `refactor(api): extract validation helpers`).
- [ ] Commit **body** (mandatory, detailed): bullet or numbered list of every substantive change — files touched, renames, extractions, deleted duplication, and **why** it is safer or clearer. The body must be detailed enough for a reviewer to reconstruct intent without reading the whole diff.

### Step 5: Tests

- [ ] State the exact commands to run (from `AGENTS.md` or tier `*.arch.md` / `package.json`), covering **unit** and **E2E** where the product defines them.
- [ ] Ask the user to run them now (or run them in-session if the environment allows) and report failures before merge.
- [ ] When behavior is spec-driven, suggest **`/verify`** so acceptance criteria stay covered.

## Output

- [ ] Refactored code in scope.
- [ ] One detailed commit via `/repository`.
- [ ] Explicit test instructions or results plus `/verify` suggestion when applicable.

## Verification

- [ ] No sneaked-in feature or defect fix unless scoped by the user.
- [ ] Commit body documents all meaningful edits.

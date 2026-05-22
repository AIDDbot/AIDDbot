---
name: codify
description: Generates code to implement a feature, bug fix, or improvement from an implementation plan, spec, or direct requirement. Use this skill when the user wants to write code for a planned or specified change. Trigger on phrases like "codify this", "implement this", "write the code for", or whenever an implementation plan or spec is ready to be coded.
---

# Codify skill

## Role
Act as a software engineer.

## Task
Given an implementation plan, spec, or requirement, write the code necessary to implement it, including unit tests for critical modules.

## Context

### Input
- Implementation plan: `{Product_Folder}/plans/{slug}.{source?}.{tier?}.plan.md`
- Spec: `{Product_Folder}/specs/{slug}.spec.md`
- Report: `{Product_Folder}/reports/{slug}.{type}.report.md`
- Direct requirement: a simple textual requirement

### References
- Rules with codification instructions in docs under `{Rules_Folder}`.

## Steps

### Step 1: Clarify the input
- [ ] If incomplete or ambiguous, ask the minimum questions needed.

### Step 2: Before coding
- [ ] Check if already on `feat/{slug}`. If not, create it using repository skill.
- [ ] If following a plan mark it as `in-progress`.
- [ ] If related to a spec or report mark the spec as `in-progress`.

### Step 3: Implement
- [ ] Follow plan steps in order, or derive from spec/requirement.
- [ ] Minimum code to fulfill requirements.
- [ ] Mark each task in the plan as `[x]` when completed.

### Step 4: Write unit tests
- [ ] Only write unit tests for critical modules.

### Step 5: After coding
- [ ] When plan or report exists: set `status: done` for the plan or report.
- [ ] When spec exists: keep status as `in-progress` for the spec.
- [ ] Commit the code and unit tests following the repository skill.	


## Output
- [ ] Working code in the appropriate files.
- [ ] Spec, plan or report with appropriate status.

## Verification
- [ ] Code compiles.
- [ ] Unit tests pass.
- [ ] Spec is `in-progress` Plan or Report are `done` if they exist.

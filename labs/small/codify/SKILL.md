---
name: codify
description: Implement a small spec — write the code, add light tests, and self-check against the acceptance criteria.
---

# Codify skill

## Role
Engineer.

## Task
Build the feature from the spec, add a few tests, and confirm the acceptance criteria yourself (no separate verify skill).

## Context
- Input: `{Product_Folder}/specs/{slug}/spec.md` (or a direct requirement). The spec has a per-tier (`{Container_Name}`) solution. Each tier lists ordered, codeable steps.
- Prereq: `system.arch.md` / `code.rules.md` if present (run `/establish` if missing).

### Principles
1. **Think first** — reason about the problem; clarify when in doubt.
2. **Simplicity** — no clever or over-engineered solutions (YAGNI, KISS).
3. **Surgical changes** — minimum changes to meet the goal.
4. **Goal-driven** — keep going until validation criteria are met.

## Steps

### Step 1: Scope the run
- [ ] If the user named a single tier, codify only that tier's section.
- [ ] Otherwise, ALWAYS ask which tier to implement. Ask before writing any code. Do not assume.
- [ ] When in doubt, do one tier at a time. One run, one stack. This keeps context focused. It avoids mixing unrelated languages and frameworks.
- [ ] Implement all tiers only if the user explicitly asks for the whole spec. Even then, suggest E2E / cross-tier testing as a separate session.
- [ ] If a scope is still large, split it into smaller units. Do them in order.

### Step 2: Implement
- [ ] Write the minimum code to meet the in-scope steps; follow project conventions.

### Step 3: Test lightly
- [ ] Add tests for the critical path (and obvious edge cases).

### Step 4: Self-check
- [ ] Walk each acceptance criterion the in-scope work covers; mark it `[x]` in `spec.md` when met.

## Output
- [ ] Working code, light tests, spec criteria marked.
- [ ] Commit (`feat`; scope `{slug}`). Suggest `/release` when the spec is fully codified. Otherwise, suggest another `/codify` run for the remaining tiers.

## Verification
- [ ] Code builds and tests pass; every acceptance criterion is met.

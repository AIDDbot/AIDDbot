---
name: specify
description: Capture a feature as a one-page spec; problem, expected results, criteria.
user-invocable: true
disable-model-invocation: true
---
# Specify

## Role
Act as Business Analyst.

## Task
Capture a feature as a one-page spec: 
- problem, 
- expected results per container, and
- acceptance criteria.

## Guardrails
1. **Fix-or-feature gate** — satisfiable with every green e2e test untouched? It's a fix:
   → `/codify`, stop.
2. **Write-once** — a new change is a new spec; never edit an existing one.
3. **Outcome level only** — no steps, file paths, or tech choices; the **how** is `/planify`'s.

## Context
- Listing only — read each item when needed.
- `{Arch}` = `{Product_Folder}/arch`; `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- A requirement or feature description — new behavior, or a change to released behavior.

### References
- _follow_ [repo rules and commands]({Agents_File})

### Glossary
- **Expected result** — an observable outcome a container must deliver; never a step.
- **{slug}** — short feature identifier; names the spec folder.

## Steps
### 1. Research
- Apply Guardrail 1.
- Ask the minimum questions if unclear; derive `{slug}`.
- _follow_ [system architecture]({Arch}/system.arch.md): list the containers this
  feature touches.

### 2. Plan
- _write-from_ [spec template](./assets/spec.template.md).
- Prepare the problem, user stories, and the conceptual data model —
  _follow_ [domain ER diagram]({Arch}/ER.md).
- Prepare per-container expected results.
- If changing released behavior, _follow_
  [released behavior baseline]({Product_Folder}/docs/{feature}.md):
  quote the current behavior as the baseline in the problem.

### 3. Implement
- Write `{Specs}/spec.md` with `status: pending`; one page.
- No `e2e` section in the solution overview — verification lives in the criteria.
- Commit (`docs:`); → `/planify`.

## Verification
- [ ] `{Specs}/spec.md` exists, correct format, no empty placeholders.
- [ ] Problem and acceptance criteria are clear and checkable.
- [ ] Container sections list outcomes, not implementation details.

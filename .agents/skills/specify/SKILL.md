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
- **Fix-or-feature gate** — if satisfiable with every green e2e test untouched, it is
  a fix; stop: → `/codify`.
- **Write-once** — a new change is a new spec; never edit an existing one.
- **Outcome level only** — no steps, file paths, or tech choices; the **how** is `/planify`'s.

## Context

- `{Arch}` = `{Product_Folder}/arch`; `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- A requirement or feature description — new behavior, or a change to released behavior.

### References
- _read_ [repo rules and commands]({Agents_File})

### Glossary
- **Expected result** — an observable outcome a container must deliver; never a step.
- **{slug}** — short feature identifier; names the spec folder.

## Steps
### 1. Research
- Apply the **Fix-or-feature gate**.
- Ask the minimum questions if unclear; derive `{slug}`.
- _read_ [system architecture]({Arch}/system.arch.md).
- List the containers this feature touches.

### 2. Plan
- _read_ [spec template](./assets/spec.template.md).
- _read_ [domain ER diagram]({Arch}/ER.md).
- Prepare the problem, user stories, and the conceptual data model.
- Prepare per-container expected results.
- If changing released behavior, _read_
  [released behavior baseline]({Product_Folder}/docs/{feature}.md):
  quote the current behavior as the baseline in the problem.

### 3. Implement
- Write `{Specs}/spec.md` with `status: pending`; one page.
- Omit the `e2e` section from the solution overview; verification lives in the criteria.
- Commit (`docs: {description}`); → `/planify`.

## Verification
- [ ] `{Specs}/spec.md` exists, correct format, no empty placeholders.
- [ ] Problem and acceptance criteria are clear and checkable.
- [ ] Container sections list outcomes, not implementation details.

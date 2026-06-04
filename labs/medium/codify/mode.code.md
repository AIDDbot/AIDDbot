# Codify mode: code

Implement one container plan with working functional code plus unit tests.

## Input
- A container plan `{Product_Folder}/specs/{slug}/{container}.plan.md` (or a spec/requirement scoped to one container).

## Steps

### Step 1: Ground in the container
- [ ] Read `{container}.arch.md` (components, contracts, structure) and `{container}.rules.md` (naming, conventions).
- [ ] If the scope is large, split it into smaller ordered units and do them in order.

### Step 2: Implement
- [ ] Write the minimum code to meet the in-scope plan steps; follow the container's rules and conventions.
- [ ] Respect the contracts shared with sibling containers (API shapes, schemas) as planned.
- [ ] Do not add comments or extra changes (YAGNI).

### Step 3: Unit test
- [ ] Add unit tests for the critical path: happy path plus error cases (if any).
- [ ] Run the container's unit suite; fix until green.

## Done when
- [ ] Code builds, unit tests pass, every in-scope plan step is checked `[x]`.

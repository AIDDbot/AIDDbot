# Qualify gates

Inspect the complete diff. Judge changed code by project convention, not personal preference, and preserve its intended behavior.

## Blocking gates

Evaluate every applicable blocking gate first. Mark one `n/a` only when its category cannot apply to the changed scope and state why. Missing evidence for an applicable gate is a failure.

- **Security** — Authentication and authorization protect every changed action and resource that requires them.
- **Accessibility** — Every changed interaction is keyboard-accessible with visible focus and no focus trap.
- **Project rules** — The changed scope violates no explicit restriction in its applicable `{project}.rules.md` file.
- **Schema impact** — Every entity, table, column, and endpoint change in the diff is declared in the spec's schema impact, and every declared change is present, including each endpoint's declared success and error statuses. Mark it `n/a` only when the diff changes no persistence or API shape.

Evaluate every technical criterion explicitly declared by the spec as another blocking gate. Do not invent criteria. If any blocking gate fails, record all blocking failures, set qualification to red, and skip the debt checks.

## Debt checks

When every blocking gate passes, look for gross, easy-to-see errors that no linter reports. A failed check becomes `debt` only when observed facts show a concrete problem in the changed scope.

### Security

- [ ] User input is validated before it reaches storage or rendering.
- [ ] Queries are parameterized without string-built SQL.
- [ ] No secrets are hardcoded.
- [ ] Errors do not expose sensitive information.

### Data integrity

- [ ] A failed operation leaves stored data unchanged.
- [ ] Related writes that must succeed together are atomic.
- A storage constraint weaker than the spec is a finding only when the changed code lets the invalid value reach storage; one reachable only by writing to storage directly is not.

### Performance

- [ ] No flagrant waste, such as a query per list item or blocking I/O on a request path.

### Accessibility and basic UX

- [ ] Form controls have labels, and errors are visible and linked to their field.
- [ ] Text and controls keep readable contrast and never rely on color alone.
- [ ] Changed interfaces handle empty, loading, and error states.

### Project rules

- [ ] Each restriction is checked only within its declared scope, and every finding names the restriction it violates.

## Findings

Classify every finding as `blocking` or `debt`. Blocking findings make qualification red; debt findings make it amber; with no findings, it is green. Qualification never blocks shipping and is never repaired within the spec: shipping records every finding as a debt item, `high` for a blocking one.

Do not record stylistic preference, speculative improvement, unrelated pre-existing code, or anything a linter or quality check reports: warnings, complexity, and coverage belong to `scan-quality`. Cite code, never `.aiddbot/runs/` logs.

# Qualify gates

Inspect the complete diff. Judge changed code by project convention, not personal preference, and preserve its intended behavior.

## Blocking gates

Evaluate every applicable blocking gate first. Mark one `n/a` only when its category cannot apply to the changed scope and state why. Missing evidence for an applicable gate is a failure.

- **Security** — Authentication and authorization protect every changed action and resource that requires them.
- **Accessibility** — Every changed interaction is keyboard-accessible with visible focus and no focus trap.
- **Project rules** — The changed scope violates no explicit restriction in its applicable `{project}.rules.md` file.
- **Schema impact** — Every entity, table, column, and endpoint change in the diff is declared in the spec's schema impact, and every declared change is present. Mark it `n/a` only when the diff changes no persistence or API shape.

Evaluate every technical criterion explicitly declared by the spec as another blocking gate. Do not invent criteria. If any blocking gate fails, record all blocking failures, set qualification to red, and skip the debt checks.

## Debt checks

When every blocking gate passes, evaluate the remaining applicable checks. A failed check becomes `debt` only when observed facts show a concrete problem in the changed scope.

### Security

- [ ] User input is validated and sanitized.
- [ ] Queries are parameterized without string-built SQL.
- [ ] No secrets are hardcoded.
- [ ] Errors do not expose sensitive information.

### Performance

- [ ] No blocking I/O is added to a hot path.
- [ ] Queries avoid N+1 access and use indexes where needed.
- [ ] Large lists are paginated or streamed.
- [ ] Expensive work is cached when appropriate.

### Clean code / DRY

- [ ] Business logic is not duplicated within or beyond the diff.
- [ ] Names describe their behavior.
- [ ] Functions have one purpose and avoid deep nesting.
- [ ] Needless abstractions are simplified.
- [ ] Comments explain why rather than restating what the code does.

### Accessibility

- [ ] Text and controls meet WCAG AA contrast and do not rely on color alone.
- [ ] Images have appropriate alternative text.
- [ ] Form controls have associated labels and linked error descriptions.
- [ ] Documents declare their language and use native landmarks before ARIA.

### UI and design system

- [ ] Changed interfaces handle empty, loading, and error states.
- [ ] Spacing, typography, radius, and color use the design system.
- [ ] Repeated markup is shared when it represents the same component.
- [ ] Layout works at 360, 768, and 1440 pixels.

### Project rules

- [ ] Each restriction is checked only within its declared scope.
- [ ] Every finding names the restriction it violates.
- [ ] Useful automation is suggested when an existing tool can enforce the rule.

## Findings

Classify every finding as `blocking` or `debt`. Blocking findings make qualification red and require repair. Debt findings make it amber and enter the TDR at shipping. With no findings, qualification is green. If red remains at evaluation revision 3, shipping promotes every still-present finding to the TDR.

Do not record stylistic preference, speculative improvement, or unrelated pre-existing code as a finding.

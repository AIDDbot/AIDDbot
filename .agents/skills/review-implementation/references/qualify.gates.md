# Qualify gates

Inspect the complete diff. Judge changed code by project convention, not personal preference, and preserve its intended behavior.

## Blocking gates

Evaluate every applicable blocking gate first. Mark one `n/a` only when its category cannot apply to the changed scope, and state why. Missing evidence for an applicable gate is a failure.

- **Security**
  - Authentication and authorization protect every changed action and resource that requires them.
  - Every security minimum that the spec or the project `AGENTS.md` cites holds in the code, such as an OWASP cost parameter. A library default is evidence only when its value meets that minimum.
- **Requirements** — The changed code breaks no requirement of this spec or of a shipped spec, also when its acceptance test passes. Name the global ID of the requirement that the code breaks.
- **Accessibility** — Every changed interaction is keyboard-accessible with visible focus and no focus trap.
- **Project rules** — The changed scope violates no explicit restriction that the hook lint, the `layers` and `crap` checks, and the tests cannot check. Layers, names, structure, and complexity are never findings here. The restrictions are:
  - the project `AGENTS.md`;
  - when `.product/system.md` exists, `.agents/skills/implement-project/references/code-rules.md` and the `system.md` rule of `acceptance-tests.md` beside it;
  - two rules of `implement-project`: the code gets each external effect as an argument, and it adds no check, limit, or default that the spec does not state;
  - each changed dependency manifest and lint configuration: a dependency that no rule or spec names fails it, and so does a lint rule turned off that no rule and no debt item of the spec allows.
- **Schema impact** — Mark it `n/a` only when the diff changes no persistence or API shape. Otherwise:
  - The spec declares each change of an entity, a table, or a column in the diff in its schema impact, and each change of an endpoint in its `Expected URLs and APIs`.
  - Each declared change is present, with the declared success and error statuses of each endpoint.

Evaluate every technical criterion that the spec declares as another blocking gate. Do not invent criteria. If any blocking gate fails, record all blocking failures, and skip the debt checks.

## Debt checks

When every blocking gate passes, look for gross errors that are easy to see and that no linter and no test reports. A failed check becomes `debt` only when observed facts show a concrete problem in the changed scope, serious enough to be `high` debt.

### Security

- [ ] User input is validated before it reaches storage or rendering.
- [ ] Queries are parameterized without string-built SQL.
- [ ] No secrets are hardcoded.
- [ ] Errors do not expose sensitive information.

### Data integrity

- [ ] A failed operation leaves stored data unchanged.
- [ ] Related writes that must succeed together are atomic.
- A storage constraint weaker than the spec is a finding only when the changed code lets the invalid value reach storage. A value that only a direct write to storage can reach is no finding.

### Performance

- [ ] No flagrant waste, such as a query per list item or blocking I/O on a request path.

### Accessibility and basic UX

- [ ] Form controls have labels, and errors are visible and linked to their field.
- [ ] Text and controls keep readable contrast and never rely on color alone.
- [ ] Changed interfaces handle empty, loading, and error states.

## Findings

Classify every finding as `blocking` or `debt`. A blocking finding makes the qualification `red`. Debt findings alone make it `amber`. With no findings, it is `green`.

Do not record stylistic preference, speculative improvement, or unrelated code that existed before. Cite code, never the logs of `.aiddbot/logs/`.

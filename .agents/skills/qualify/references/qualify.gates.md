# Qualify gates

## Rules

- **Closed list** — the gates are `accessibility`, `security`, `performance`, `clean-code`, `ui`, and `project-rules`.
- **Accumulated debt is not a fail** — record evidence that only shows across scopes in the report; never fail a gate on it. `collect-findings` later decides whether it belongs in the durable finding ledger.

## Severity

Every finding carries one. A `blocker` or a `major` fails its gate.

- **blocker** — actively causes bugs or security holes, or breaks accessibility (WCAG A/AA).
- **major** — real decay: duplicated logic, a boundary crossed, a name that lies.
- **minor** — polish: a magic value, a local nesting, a comment that restates the code.

## Accessibility (WCAG AA)

The [UI and accessibility lens](./ui.patterns.md) lists the patterns this gate catches.

- [ ] Color contrast >= 4.5:1 (3:1 large text); never rely on color alone.
- [ ] Every meaningful image has alt text; decorative images use `alt=""`.
- [ ] All functionality keyboard-accessible; visible focus; no focus traps.
- [ ] Form inputs have associated labels; errors described and linked to fields.
- [ ] `lang` set on `<html>`; landmarks present; prefer native elements over ARIA.

## Security

- [ ] User input validated and sanitized.
- [ ] Queries parameterized (no string-built SQL).
- [ ] Auth/authorization checked on protected paths and actions.
- [ ] No hardcoded secrets.
- [ ] Errors don't leak sensitive info.

## Performance

- [ ] No N+1 queries; indexes where needed.
- [ ] Large lists paginated or streamed.
- [ ] Expensive work cached when appropriate.
- [ ] No blocking I/O in hot paths.

## Clean code / DRY (behavior-preserving)

Read the scope through the [code-clarity lens](./clarity.patterns.md); every pattern it lists is a violation of this gate.

- [ ] Descriptive names; the code is self-documenting.
- [ ] Small, single-purpose functions; guard clauses over deep nesting.
- [ ] Duplicated logic extracted — including logic that already existed outside the diff.
- [ ] Remove needless abstractions by simplifying the code.
- [ ] Comments explain "why", not "what".

## UI and design system

Frontend scope only. Read it through the [UI and accessibility lens](./ui.patterns.md).

- [ ] Spacing, type, radius, and color come from the design system, not magic values.
- [ ] Empty, loading, and error states are handled, not left implicit.
- [ ] Repeated markup is one shared component, not a copy per page.
- [ ] Layout holds at 320 / 768 / 1024 / 1440.

## Project rules

Load `{container}.rules.md` for every container in scope; check the scope against it.

- [ ] Code follows the container's naming, structure, and layering conventions.
- [ ] Every convention violation is a finding, naming the rule it breaks.

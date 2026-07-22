# Review gates

## Guardrails
- **Behavior findings are not yours** — look only for implementation smells;
  behavioral findings hand off to `/specify`, contract/structural moves to `/planify`.

Each gate is pass/fail. A gate passes when every check holds; otherwise it fails.
One pass; under a failed gate, report every violation as a finding.

## Tooling gates

- [ ] Lint — the linter passes with no errors.
- [ ] Types — the type checker passes with no errors.

## Accessibility (WCAG AA)

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

- [ ] Descriptive names; the code is self-documenting.
- [ ] Small, single-purpose functions; guard clauses over deep nesting.
- [ ] Extract duplicated logic.
- [ ] Remove needless abstractions by simplifying the code.
- [ ] Comments explain "why", not "what".

## Project rules

Load `{container}.rules.md` for every container in scope; check the scope against it.

- [ ] Code follows the container's naming, structure, and layering conventions.
- [ ] Machine-checkable rules are wired into lint/format/type config, so Lint/Types catch them.
- [ ] Every convention violation is a finding, naming the rule it breaks.

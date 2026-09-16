# Qualify gates

## Rules

- **Closed list** — the gates are `security`, `performance`, `clean-code`, `accessibility`, `ui`, and `project-rules`.
- **Verdicts** — `blocker` and `major` findings fail their gate. Record `minor` findings without failing the gate. `n/a` is allowed for any gate only when the report states why the gate cannot apply to the scope. `ui` gates are non blockers.
- **Technical criteria are additional** — perform each criterion's stated method and record its evidence. A failed or blocked criterion makes qualification red even if other gates pass.
- **Non-blocking debt** — record supported minor findings in the qualification report. 

## Severity

Every finding carries one.

- **blocker** — actively causes bugs or security holes, or breaks accessibility (WCAG A/AA).
- **major** — real decay: duplicated logic, a boundary crossed, a name that lies.
- **minor** — polish: a magic value, a local nesting, a comment that restates the code.

## Principles

- Clarity over cleverness — explicit beats compact when compact needs a mental pause.
- Preserve behavior — same inputs, outputs, side effects, ordering, and errors.
- Convention over preference — match project rules and neighboring code.
- Judge what changed — but a new symbol that reimplements an existing one is still a finding.
- Chesterton's fence — understand why code exists before proposing its removal.

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
- [ ] Duplicated logic extracted — including logic that already existed outside the diff.
- [ ] Remove needless abstractions by simplifying the code.
- [ ] Comments explain "why", not "what".

## Accessibility (WCAG AA)

- [ ] Color contrast >= 4.5:1 (3:1 large text); never rely on color alone.
- [ ] Every meaningful image has alt text; decorative images use `alt=""`.
- [ ] All functionality keyboard-accessible; visible focus; no focus traps.
- [ ] Form inputs have associated labels; errors described and linked to fields.
- [ ] `lang` set on `<html>`; landmarks present; prefer native elements over ARIA.

## UI and design system (not blocking, just minor findings)

- [ ] Spacing, type, radius, and color come from the design system, not magic values.
- [ ] Empty, loading, and error states are handled, not left implicit.
- [ ] Repeated markup is one shared component, not a copy per page.
- [ ] Layout holds at 360 / 768 / 1440.

## Project rules

When `{project}.rules.md` exists for a project in scope, check that scope against it. Its absence does not create a finding or block review.

- [ ] Every recorded restriction is checked only within its stated scope.
- [ ] A violation is a finding only when it names the recorded restriction it breaks.
- [ ] Suggest tooling that can help automate gate checks.

## Out of scope (not a finding)

- Removing error handling to look cleaner.
- Renames to personal taste over project convention.
- Over-inlining that removes a useful named concept.

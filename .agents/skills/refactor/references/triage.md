# Triage

Every finding gets a **category** and a **severity**. The category becomes the spec's
`category:` field; the severity orders the evidence and, in aggregate, tells the human how
urgent this container's debt is. There is no `kind` and no per-finding handoff: the whole
audit becomes one non-functional spec, and that spec travels the normal pipeline.

**First, one gate: would fixing it change what a green e2e test asserts?**
If yes, it is *not* a refactor — put it under `Out of scope` and surface it to the human as a
functional spec. Only behavior-preserving decay belongs in a non-functional spec.

## Category (the non-functional quality it degrades)

One spec carries one category — the dominant one. If a container is decaying on two fronts
badly enough that both deserve criteria, that is two audits and two specs, not one mixed bag.

- **maintainability** — duplication across features, dead code, a name that lies, a guard
  clause missing, an abstraction in the wrong place, a boundary that drifted.
- **usability** — one concept drawn differently on different pages, inconsistent affordances,
  states (empty, loading, error) handled ad hoc. If the *look itself* must change, that is a
  functional spec, not this.
- **accessibility** — WCAG A/AA violations: labels, contrast, focus order, keyboard traps.
- **performance** — avoidable work: N+1 access, unbounded payloads, re-render storms.
- **security** — an unvalidated input, a leaked secret, a permissive default.

## Severity

- **blocker** — actively causes bugs or security holes, or breaks accessibility (WCAG A/AA).
- **major** — real decay: duplication across features, inconsistent UX, structural drift.
- **minor** — polish: a name, a magic value, a local nesting.

## The systemic lens

This is a whole-container pass, so weight what only shows in aggregate:
- the same pattern re-implemented across N features → dedupe or extract.
- one concept drawn differently in many places → a shared component.
- an abstraction that grew load-bearing since it was introduced → relocate it.

A single finding that recurs is one evidence bullet — say how many places it touches, and let
severity reflect the spread. Decay that crosses into another container is not yours: note it
for the human, who can order an audit of that container.

## From finding to criterion

A finding describes what decayed; a criterion states what must be true when it is paid off,
in terms a gate can check. Name the gate.

| Finding | Criterion |
|---------|-----------|
| The same date formatter is inlined in 6 components | No component formats a date inline; all use one shared helper · gate: `clean-code` |
| Four buttons miss an accessible name | Every interactive control in the container has an accessible name · gate: `accessibility` |
| `OrderService` mixes HTTP and persistence | `OrderService` has no direct persistence calls · gate: `clean-code` |

If a finding cannot be written this way, it is not ready to be a criterion — either sharpen it
until a gate can judge it, or leave it out.

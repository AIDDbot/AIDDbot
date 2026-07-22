# Code-clarity lens

The code-clarity catalog `/refactor` scans through. Prefer clarity over cleverness, and match
the project's rules. Route each finding via [triage](./triage.md) — most land in the `/codify`
lane, but a duplication that should move to a shared module is `/planify`.

## Principles
- Clarity over cleverness — explicit beats compact when compact needs a mental pause.
- Preserve behavior — same inputs, outputs, side effects, ordering, and errors.
- Convention over preference — match project rules and neighboring code.
- Scope to what changed — no drive-by refactors of untouched code.
- Chesterton's fence — understand why code exists before proposing its removal.

## Structural patterns
| Pattern | Signal | Change |
|---------|--------|--------|
| Deep nesting (3+ levels) | hard-to-follow control flow | guard clauses or helpers |
| Long function (50+ lines) | many responsibilities | split into named functions |
| Nested ternary | needs a mental stack to parse | if/else, switch, or lookup |
| Boolean flag params | `f(true, false)` at call sites | options object or split functions |
| Repeated conditional | same check in many places | one named predicate |

## Naming and readability
| Pattern | Signal | Change |
|---------|--------|--------|
| Generic name | `data`, `tmp`, `val`, `item` | name for the content |
| Abbreviation | `usr`, `cfg`, `btn`, `evt` | full word unless universal (`id`, `url`) |
| Misleading name | `get` that also mutates | rename to actual behavior |
| "What" comment | `// increment` over `i++` | delete; the code is clear |
| "Why" comment | intent the code can't express | keep it |

## Redundancy
| Pattern | Signal | Change |
|---------|--------|--------|
| Duplicated logic | same 5+ lines repeated | extract a shared function |
| Dead code | unused vars, unreachable branches | remove after confirming |
| Needless wrapper | adds no value | inline it |
| Over-engineering | factory-for-a-factory | the direct approach |
| Redundant assertion | cast to an already-inferred type | remove it |

## Out of scope (not a finding)
- Removing error handling to look cleaner.
- Renames to personal taste over project convention.
- Over-inlining that removes a useful named concept.
- Line-count wins that hurt comprehension.

> A change that needs a test edited to pass is not out of scope — it is a `behavioral` finding.
> Route it to `/specify` via [triage](./triage.md); do not drop it.

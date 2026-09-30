# Craft quality records: review and TDR

Status: decided in `deterministic-core/decisions.md` D30–D36 (2026-09-28).

## Direction discussed

- Analyze whether the Craft quality phase should keep two files — `quality/review.md` and `quality/TDR.md` — or consolidate them into one.
- This is an independent design question from removing the cumulative PRD, though both topics may be handled in the same sprint.
- Give every recorded failure, debt item, or code smell both a priority and a current state.
- Keep the quality record focused on live work: remove an item once it is resolved rather than retaining resolved entries and letting the register grow indefinitely.

## Current repository context

- `quality/review.md` is replaced by each system-quality scan and records unresolved system-review issues from the latest evidence.
- `quality/TDR.md` is the durable index of all open debt. It includes issues found by system-quality scans and debt from verification or qualification of shipped specs.
- The files overlap when a system-review issue is also an open debt entry, but they have different scopes and lifecycles.
- The journal records when a quality review occurred.

## Consolidation option

A single canonical quality-debt register could contain each issue's stable ID, status, scope, source, and latest evidence. A system-quality scan would reconcile entries in that register; shipped spec findings would add or update entries. The journal could continue to record when each scan occurred.

This would remove the separate review snapshot only if the unified register retains enough current evidence to replace it. It should not become a cumulative log of every scan; the journal already records review events, while the register should represent current unresolved issues.

## Open questions

- Does the latest system scan need a report independent of the durable debt entries?
  > **R:** ✅ → D30 — no; one core-written `debt.json` with a generated `TDR.md`
- What priority scale and state lifecycle should apply consistently to failures, debt, and code smells?
  > **R:** ✅ → D31, D32 — high/medium/low; confirmed/not-revalidated; resolved items are removed
- What evidence is sufficient to mark an item resolved and remove it from the current record?
  > **R:** ✅ → D33 — a qualified spec citing it with green verification, or a scan whose check could run
- How should unavailable checks and issues marked `not revalidated` appear in a unified record?
  > **R:** ✅ → D32
- How should evidence from shipped specs and full-system scans update the same issue without losing its origin or rationale?
  > **R:** ✅ → D35 — fixed origin plus last confirmation
- Should every open debt item have stable detailed evidence in the register, or can it refer to a durable source report?
  > **R:** ✅ → D34 — short evidence in the item, with its source
- What does the Craft workflow return when there is no eligible debt if there is no separate review report?
  > **R:** ✅ → D36 — the `aidd debt list` summary

## Resume point

Choose whether the canonical artifact represents the latest scan or the current debt state. Then define how each evidence source reconciles that artifact and what history remains in the journal or archived specs.

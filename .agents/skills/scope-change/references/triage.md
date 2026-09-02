# Triage

A requirement may touch one spec or several. Count every spec that must be created or amended before writing anything.

- **Amend, never fork** — behavior already owned by an existing spec is an `amend`, not a new spec.
- **Create** — genuinely new behavior with no owning spec.
- **One spec** — the caller may proceed with ordinary single-spec flow.
- **Several specs** — the caller routes to coordinated delivery; present the impact map for approval.

Reuse category and tags already in the PRD. An amend resets that spec to `status: pending`.

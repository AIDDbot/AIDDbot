# Triage

A requirement may touch one spec or several. Inspect both functional and technical specs and count every spec that must be created or amended before writing anything.

- **Amend, never fork** — behavior already owned by an existing spec is an `amend`, not a new spec.
- **Create** — genuinely new behavior with no owning spec.
- **One spec** — the caller may proceed with ordinary single-spec flow.
- **Several specs** — the caller routes to coordinated delivery; present the impact map for approval.

Every impact-map entry has a reserved `key`, `kind: functional | technical`, and `action: create | amend`. Resolve a missing kind during triage, before a branch name depends on it. Reuse the existing key and kind for an amend; reserve new IDs from the appropriate F/T series as one atomic decision. Reuse category and tags already in the PRD.

Record the current default-branch revision as the proposed delivery base. Triage does not reset status, update the PRD, create a manifest, or commit. Those writes happen sequentially on the established delivery branch. An amend resets its spec to `status: pending` during specification.

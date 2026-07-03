# Route B — requirement change

The goal is to hand off: the code matches the released criteria, but the requested behavior differs.

- Derive a new `{slug}` — never reopen the old spec folder.
- Hand off to `/specify` with the new requirement, the released baseline, and `amends: {old-slug}`.
- The full pipeline follows; `/release` stamps `superseded-by:` on the old spec.

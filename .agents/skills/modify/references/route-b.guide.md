# Route B — requirement change

The goal is to hand off: the code matches the released criteria, but the requested
behavior differs.

- Derive a new `{slug}` — never reopen the old spec folder.
- Hand off to `/specify` a plain requirement: the requested behavior, the released
  behavior as baseline (quote `docs/{feature}.md`), and the affected feature name.
- No frontmatter contract — the new spec is an ordinary spec. Downstream, the pipeline
  keeps the books: `/planify` lists the e2e scenarios the change replaces, and
  `/release` derives the supersession from the feature-doc merge and stamps
  `superseded-by:` on the old spec.

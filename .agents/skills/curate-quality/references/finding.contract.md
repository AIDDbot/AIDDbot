# Quality finding contract

Keep `{Product_Folder}/quality/findings.md` as a short index containing one line per open finding:

```md
- **Q0001**: {concrete problem} — {scope} ([evidence]({report-or-review-link}))
```

Use a qualification finding as evidence when debt originates in a shipped spec. Use the dated Q heading in `quality/review.md` when a system review confirms it. Keep the detailed evidence at its source instead of copying it into the index.

Reserve IDs from `counters.yaml` and never reuse them. Keep the surviving ID when observations describe the same underlying problem. Remove a line only after a shipped spec proves resolution or current evidence proves that it is invalid, obsolete, or a duplicate. Git keeps the reason and history.

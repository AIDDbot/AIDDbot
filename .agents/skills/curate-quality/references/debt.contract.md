# Technical debt register contract

Keep `{Product_Folder}/quality/TDR.md` as a short index containing one line per open debt item:

```md
- **D0001**: {concrete debt or defect} — {scope} ([evidence]({qualification-or-review-link}))
```

Use a finding in `qualification.md` as evidence when debt originates in a shipped spec. Use the dated D heading in `quality/review.md` when a system review confirms it. Keep all detailed evidence at its source instead of copying it into the register.

Reserve IDs from `counters.yaml` and never reuse them. Keep the surviving ID when observations describe the same underlying problem. Remove a line only after a shipped spec proves resolution or current evidence proves that it is invalid, obsolete, or a duplicate. Git keeps the reason and history.

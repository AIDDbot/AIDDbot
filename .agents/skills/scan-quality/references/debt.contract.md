# Technical debt register contract

Keep `{Product_Folder}/quality/TDR.md` as a short index containing one line per open debt item:

```md
- **D0001**: {concrete debt or defect} — {scope} ([evidence]({verification-qualification-or-review-link}))
```

Use a failure in `verification.md` or a finding in `qualification.md` as evidence when debt originates in a shipped spec. Link system-review debt to its stable `quality/review.md#d0001` heading. The review is a current snapshot, so every open review-backed D entry must remain present as confirmed or not revalidated. Keep all detailed evidence at its source instead of copying it into the register.

Reserve IDs from `.aiddbot/counters.yaml` and never reuse them. Keep the surviving ID when observations describe the same underlying problem. An unavailable check is not evidence of resolution. Remove a line only after a shipped spec proves resolution or current evidence proves that it is invalid, obsolete, or a duplicate. Git keeps prior reviews and removal history.

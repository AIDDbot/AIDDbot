# Quality finding contract

Keep `{Product_Folder}/quality/findings.md` as one line per open finding:

```md
- **Q0001**: {concrete problem} — {scope} ([evidence]({report-or-review-link}))
```

Reserve IDs from `counters.yaml`. Keep one ID when observations describe the same underlying problem. Remove a line after a shipped repair proves resolution, or when the debt specifier records evidence that it is invalid, obsolete, or duplicate. Git keeps the reason and history.

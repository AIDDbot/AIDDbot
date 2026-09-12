# Finding contract

Use one heading per finding:

```md
## {finding_id} — {short title}

- Status: open|resolved|dismissed
- Source: {report path}
- Scope: {paths, containers, specs, or architecture elements}
- Rule: {violated gate, expected state, or accumulated debt}
- Evidence: {observed facts}
- Contract: {active criterion, valid test, or applicable documented rule when the finding violates approved behavior; omit otherwise}
- Severity: {only when the source supplies it}
- Change: {change_key while addressed}
```

One repair group contains findings with the same cause and correction. A Craft change references up to five groups. Preserve source reports; mark linked findings `resolved` only after the change releases. Record a dismissal reason.

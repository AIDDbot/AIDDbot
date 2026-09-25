---
spec: S0001
status: red
revision: 1
evaluated_commit: {commit}
updated_at: {DateTime}
---
# S0001-{slug} — qualification

## Failed controls

| Control | Failure | Evidence |
| --- | --- | --- |
| {failed blocking gate or technical criterion} | {Observed violation} | {Observed facts or link} |

## Findings

### {short title}

- Scope: {paths or projects}
- Gate: {gate, technical criterion, or none}
- Evidence: {observed facts}
- Classification: {blocking | debt}

{Blocking findings require repair. At revision 3, every still-present finding becomes a D entry in the TDR at shipping. Include only failed controls and findings.}

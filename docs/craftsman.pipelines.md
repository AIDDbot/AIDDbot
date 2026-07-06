# Craftsman pipelines

Paths below are under `{Product_Folder}` (e.g. `docs/` or `.product/`), as declared in the root `{Agents_File}`.

## Quality and release

```mermaid
flowchart TD  
  HUM[HUMAN]
  COD["{Source_Folders}"]:::nd
  RVR["specs/{slug}/review.report.md"]:::nd
  SPC["specs/{slug}/spec.md"]:::nd
  CHL["CHANGELOG.md"]:::nd
  
  HUM -->|/review| RVR
  RVR -->|/codify fix| COD
  COD -->|/release| CHL
  SPC -->|/release closes| SPC

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

### `/review` — scope-bound quality

Audits a code scope (feature branch, plan/spec files, or explicit paths) for **a11y, security, performance, and clean-code/DRY**, and writes `review.report.md` — each finding with a dimension, severity, kind, and handoff. Report-only by default: fixes land via `/codify` with the report; an explicit `--fix` applies the mechanical findings (renames, dead code, extractions) directly. It never changes spec or plan status.

Guardrails worth knowing:

- **Green baseline gate** — it refuses to start on a failing suite; run `/verify` first.
- **Behavior findings are not its call** — a finding whose fix would change observable behavior needs a spec: handed to `/specify`.
- **Contracts are frozen** — restructuring shared API shapes, schemas, or component boundaries is a structural refactor: handed to `/planify`.

### `/release` — close the loop

Bumps the version (SemVer), moves `Unreleased` changelog entries under the new version (Keep a Changelog), updates human docs, and **reconciles the architecture docs** against what shipped. For features it also **merges the shipped behavior into `docs/{feature}.md`** — the contract in words, kept in lockstep with the e2e suite; rewritten statements log under *Changed*, new ones under *Added*. Then it closes the spec (`status: done`, `released-version`) — from that point the spec is history, never authority. It also ships spec-less maintenance patches (defect fixes, structural refactors).

### Maintenance — no triage skill

Changes to **released** features route on one mechanical question — *would satisfying the request change what a green e2e test asserts?* Either door bounces a misrouted request to the other.

| Answer | It is a... | Route |
|---|---|---|
| No green test flips | defect (or coverage gap) | `/codify` fix mode + regression e2e test → patch `/release` |
| A green test must flip | behavior change | a new spec via `/specify` → full pipeline → `/release` merges the feature doc |

### Workflow

```markdown
/verify (green) -> /review -> /codify fixes (or --fix) -> /verify -> /release
```

Maintenance:

```markdown
/codify (fix + regression test) -> /release       (defect)
/specify -> ... -> /release                       (behavior change)
```

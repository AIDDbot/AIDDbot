# AIDD Skills Interrelationship Report

Analysis of the 9 skills in `.agents/skills/`, mapping producers, artifacts, and consumers.

## Producer -> Artifact -> Consumer matrix

| Producer | Artifact | Consumer(s) |
|----------|----------|-------------|
| `/explore` | `{Agents_File}` (`AGENTS.md` \| `CLAUDE.md`) | `*` (every skill reads paths, mode, conventions, git rules, start/test commands) |
| `/explore` | `arch/system.arch.md` (C4 L2 + ER) | `/extract`, `/specify`, `/planify`, `/codify`, `/verify`, `/release` |
| `/extract` | `arch/{container}.arch.md` (C4 L3) | `/planify`, `/codify`, `/verify` (fix loop), `/modify` (Route A), `/release` (doc sync) |
| `/extract` | `rules/{container}.rules.md` | `/codify`, `/verify` (fix loop), `/modify` (Route A) |
| `/specify` | `specs/{slug}/spec.md` | `/planify`, `/verify` (criteria), `/modify` (released baseline), `/release` |
| `/planify` | `specs/{slug}/{container}.plan.md` | `/codify`, `/review` (plan-scope) |
| `/planify` | `specs/{slug}/e2e.plan.md` | `/verify` |
| `/codify` | Source code + unit tests (`{Source_Folders}`) | `/verify`, `/review`, `/modify` |
| `/verify` | E2E tests (`e2e/`) | re-run by `/verify`, `/review` and `/release` (green-baseline gates), refactors (safety net) |
| `/verify` | `specs/{slug}/e2e.report.md` (+ marks spec criteria `[x]/[ ]`) | `/verify` (resume), `/planify` (structural escalation), `/release` (doc sync) |
| `/review` | Patched code + `fix`/`refactor` commit | `/release`, `*` |
| `/release` | `CHANGELOG.md`, version bump + tag, spec -> `done`, `superseded-by:` stamp, reconciled arch docs | HUMAN / `*` |
| `/modify` | A routing decision: `fix` commit + regression test (Route A) or handoff to `/specify` with `amends:` (Route B) | `/release` (A), `/specify` (B) |

## Status mutations (spec-bound chain)

Only these transitions touch frontmatter or checkbox state, the backbone of traceability:

- `/specify` -> spec `status: pending` (+ `amends: {old-slug}` when amending a released feature)
- `/codify` -> spec `status: in-progress` on first run; checks plan steps `[x]`
- `/verify` -> marks spec acceptance criteria `[x]/[ ]`; maintains `e2e.report.md` defect entries
- `/release` -> spec `status: done` + `released-version: {new_version}`; stamps `superseded-by: {slug}` on the amended spec (frontmatter only)

`/review` is **scope-bound** — it emits only a commit and never mutates spec/plan status. `/modify` mutates nothing either: its deliverable is the routing decision.

## Dependency graph (who blocks whom)

```mermaid
flowchart LR
  EXP["/explore"] --> EXT["/extract"]
  EXP -.system.arch.-> SPC["/specify"]
  EXT -.container arch.-> PLN["/planify"]
  EXT -.container rules.-> COD["/codify"]
  SPC --> PLN --> COD --> VER["/verify"]
  PLN -.e2e.plan.-> VER
  VER -->|code/test bug| VER
  VER -->|structural| PLN
  VER -->|green| REV["/review"]
  REV --> REL["/release"]
  SPC -.spec.-> VER
  SPC -.spec.-> REL
  REL -->|done spec| MOD["/modify"]
  MOD -->|defect: fix| REL
  MOD -->|requirement change: amends| SPC
```

Solid arrows are the build pipeline; the `/release` -> `/modify` -> (`/release` | `/specify`) cycle is the maintenance loop over released specs.

## Key observations

1. **`{Agents_File}` is the universal context root.** `/explore` writes it once; every downstream skill reads it for `{Product_Folder}`, `{Agents_Folder}`, `{Source_Folders}`, starting mode, git rules, the status chain, and the start/test commands. It is the only artifact with a `*` consumer.

2. **The architect phase is two mode-aware steps, not four.** `/explore` (system, C4 L2) then `/extract` once per container (components + rules, C4 L3). Mode is resolved per container: code exists = brownfield (extract facts), none = greenfield (prescribe).

3. **Containers, not tiers, are the unit of work.** Every plan, arch doc, and rules file is keyed by container name from `system.arch.md`. *Tier* survives only as a classifier (`front | back | db | e2e | fullstack`), never as an identifier.

4. **`spec.md` is the builder's source of truth** — the widest fan-out (4 consumers) and the only artifact with a status lifecycle (`pending -> in-progress -> done`). It stays at the outcome level; `/planify` owns all technical breakdown, including the transversal `e2e.plan.md`.

5. **The e2e container has exactly one owner.** `/codify` may never touch it; `/verify` writes, runs, and fixes against it. Implementation and verification never share a session — that separation is what makes the e2e suite trustworthy as a safety net.

6. **`/verify` is the only feedback loop and the only branching node.** It routes defects by kind: `code bug`/`test bug` are fixed in place (resume from `e2e.report.md`), `structural` escalates to `/planify`. The spec carries durable acceptance state (`[x]/[ ]`); the report carries transient run details.

7. **Shared contracts are the cross-container coordination mechanism.** `/planify` states each contract verbatim in every sibling plan; `/codify` treats them as frozen and hands back to `/planify` rather than improvising a cross-container change. `/review` enforces the same freeze.

8. **`/release` is the only sink and the doc reconciler.** It closes the spec lifecycle, produces `CHANGELOG.md` + the version tag, and re-syncs arch docs with what actually shipped — specs are commits, arch docs are HEAD.

9. **`/modify` guards released specs.** A `done` spec is immutable; `/modify` triages against its released criteria — violation = defect (Route A: fix + regression test + patch release), conformance = requirement change (Route B: amending spec with `amends:`, full pipeline, `superseded-by:` stamped at release).

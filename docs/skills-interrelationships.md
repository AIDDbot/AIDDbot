# AIDD Skills Interrelationship Report

Analysis of the 8 skills in `.agents/skills/`, mapping producers, artifacts, and consumers.

## Producer -> Artifact -> Consumer matrix

| Producer | Artifact | Consumer(s) |
|----------|----------|-------------|
| `/explore` | `{Agents_File}` (`AGENTS.md` \| `CLAUDE.md`) | `*` (every skill reads paths, mode, conventions, git rules, start/test commands) |
| `/explore` | `arch/system.arch.md` (C4 L2) | `/extract`, `/specify`, `/planify`, `/codify`, `/verify`, `/release` |
| `/extract` | `arch/{container}.arch.md` (C4 L3) | `/planify`, `/codify`, `/release` (doc sync) |
| `/extract` | `arch/ER.md` (domain ER; when the owning container is extracted) | `/specify`, `/release` |
| `/extract` | `rules/{container}.rules.md` | `/codify` |
| `/specify` | `specs/{NNN}-{slug}/spec.md` + its line in `specs/PRD.md` (sole writer; functional log) | `/planify`, `/verify` (criteria), `/release`; the PRD helps the next `/specify` spot overlap |
| `/planify` | `specs/{NNN}-{slug}/{container}.plan.md` | `/codify`, `/review` (plan-scope) |
| `/planify` | `specs/{NNN}-{slug}/e2e.plan.md` | `/codify` (implements the suite), `/verify` (scenario ↔ AC id mapping) |
| `/codify` | Source code + unit tests (`{Source_Folders}`) | `/verify`, `/review` |
| `/codify` | E2E tests (`e2e/`) | run by `/verify`, `/review` and `/release` (green-baseline gates), refactors (safety net) |
| `/verify` | `specs/{NNN}-{slug}/e2e.report.md` (verdict per AC id; + marks spec criteria `[x]/[ ]`) | `/codify` (fix mode, per container), `/planify` (structural escalation), `/release` |
| `/review` | `specs/{NNN}-{slug}/review.report.md` (+ `refactor` commit with `--fix`) | `/codify` (fix mode), `/release` |
| `/release` | `CHANGELOG.md`, version bump + tag, reconciled arch docs; spec → `done` when in scope | HUMAN / `*` |

## Status mutations (spec-bound chain)

Only these transitions touch frontmatter or checkbox state, the backbone of traceability:

- `/specify` -> spec `status: pending`
- `/codify` -> spec `status: in-progress` on first run; checks plan steps `[x]`
- `/verify` -> marks spec acceptance criteria `[x]/[ ]`; maintains `e2e.report.md` defect entries
- `/release` -> spec `status: done` + `released-version: {new_version}` when a spec is in scope

`/review` is **scope-bound** — it emits only a report (plus a `refactor` commit with `--fix`) and never mutates spec/plan status.

## Dependency graph (who blocks whom)

```mermaid
flowchart LR
  EXP["/explore"] --> EXT["/extract"]
  EXP -.system.arch + ER.-> SPC["/specify"]
  EXT -.container arch.-> PLN["/planify"]
  EXT -.container rules.-> COD["/codify"]
  SPC --> PLN --> COD --> VER["/verify"]
  PLN -.e2e.plan.-> COD
  VER -->|code/test bug| COD
  VER -->|structural| PLN
  VER -->|green| REV["/review"]
  REV -.findings.-> COD
  REV --> REL["/release"]
  SPC -.spec.-> VER
  SPC -.spec.-> REL
  COD -->|spec-less fix| REL
```

Solid arrows are the build pipeline. Maintenance has no entry skill: a fix re-enters at `/codify` (fix mode + regression test → patch release), a behavior change re-enters at `/specify` — routed by one question, *would a green e2e test have to change?*

## Key observations

1. **`{Agents_File}` is the universal context root.** `/explore` writes it once; every downstream skill reads it for `{Product_Folder}`, `{Agents_Folder}`, `{Source_Folders}`, starting mode, git rules, the status chain, and the start/test commands. It is the only artifact with a `*` consumer.

2. **Context setup is two steps, not four.** `/explore` (system, C4 L2) then `/extract` once per container (components + rules, C4 L3). Both apply evidence wins per gap: extract facts where code exists, prescribe defaults where it doesn't.

3. **Containers, not tiers, are the unit of work.** Every plan, arch doc, and rules file is keyed by container name from `system.arch.md`. *Tier* survives only as a classifier (`front | back | db | e2e | fullstack`), never as an identifier.

4. **`spec.md` is the build's source of truth — while it is open.** The only artifact with a status lifecycle (`pending -> in-progress -> done`); it stays at the outcome level and `/planify` owns all technical breakdown, including the transversal `e2e.plan.md`. Once `done`, it is a closed ticket — history, not ongoing authority; the contract lives on in the e2e suite.

5. **One writer, two evaluators.** `/codify` is the only skill that writes code — the e2e suite included, implemented from `e2e.plan.md` like any container plan. `/verify` and `/review` only evaluate and report; implementation and evaluation never share a session. The e2e plan's scenarios derive from the spec's criteria (via `/planify`), never from sibling implementations — that derivation chain is what keeps the suite trustworthy as a safety net even though codify writes it.

6. **`/verify` is the judge and the only branching node.** It routes defects by kind through the report's handoffs: `code bug`/`test bug` go to `/codify` scoped per affected container, `structural` escalates to `/planify`; then `/verify` re-runs. The spec carries durable acceptance state (`[x]/[ ]`); the report carries transient run details.

7. **Shared contracts are the cross-container coordination mechanism.** `/planify` states each contract verbatim in every sibling plan; `/codify` treats them as frozen and hands back to `/planify` rather than improvising a cross-container change. `/review` enforces the same freeze.

8. **`/release` ships verified work.** Version tag, `CHANGELOG.md`, arch docs — and closes the spec when one is in scope.

9. **The green e2e suite is the contract, and the triage is mechanical.** No triage skill: any request routes on *would a green test have to change?* No → `/codify` fix mode (+ regression test, patch release). Yes → `/specify` (new spec; the e2e plan lists the scenarios it changes). Each door bounces misrouted requests to the other, so hot-fixing a behavior change is structurally impossible: flipping a green test needs a plan, and a plan needs a spec.

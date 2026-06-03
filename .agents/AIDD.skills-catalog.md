# AIDD skills catalog

## Architect

| Skill | What it does |
|-------|----------------|
| [`/establish`](./skills/establish/) | Product, paths, personality and git rules — C4 L1 |
| [`/explore`](./skills/explore/) | System architecture + ADRs — C4 L2 |
| [`/excavate`](./skills/excavate/) | Tier/component architecture + ER — C4 L3 |
| [`/extract`](./skills/extract/) | Coding rules per tier |

## Builder

| Skill | What it does |
|-------|----------------|
| [`/specify`](./skills/specify/) | Specs with acceptance criteria |
| [`/planify`](./skills/planify/) | Implementation plans from spec |
| [`/codify`](./skills/codify/) | Code and unit tests from plans |
| [`/verify`](./skills/verify/) | E2E tests; marks spec criteria + writes `verify.md` report → `/rectify` |
| [`/rectify`](./skills/rectify/) | Fixes from the `verify.md` Rectify guide after failed `/verify` |

## Craftsman

| Skill | What it does | Binding |
|-------|----------------|---------|
| [`/review`](./skills/review/) | Audit a11y, security, performance; fix findings in place | Scope-bound |
| [`/refactor`](./skills/refactor/) | Clean-code / DRY refactors; detailed commit + test handoff | Scope-bound |
| [`/release`](./skills/release/) | Version, changelog, spec `done` + `released-version` | Spec-bound |

**Binding modes:** *Scope-bound* skills run discretionally over a code scope (feature branch, plan files, paths, or an optional spec slug) and only emit a commit — they never change spec/plan status. *Spec-bound* skills operate on a spec and mutate its `status` frontmatter. Rule of thumb: only skills that mutate `status` are tied to a spec.

---

## Typical loops

**Architecture (once, green or brown):** `/establish` → `/explore` → `/excavate` (per tier, then `ER.md`) → `/extract` (per tier)

Each step is mode-aware: prescriptive on greenfield, descriptive on brownfield.

**Feature:** /specify → /planify → /codify → /verify → /review? → /refactor? → /release

**Failed verification:**  `/verify` → `/rectify` 

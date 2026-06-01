# AIDD skills catalog

## Architect

| Skill | What it does |
|-------|----------------|
| [`/establish`](./skills/establish/) | Environment, product, personality/git rules, and system architecture (containers + decisions) in `AGENTS.md` — C4 L1-L2 |
| [`/extract`](./skills/extract/) | One `{tier}.md` per tier: component architecture, domain entities, and coding conventions — C4 L3 |

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

**Architecture (once, green or brown):** `/establish` (AGENTS.md with architecture) → `/extract` (one `{tier}.md` per tier)

Each step is mode-aware: prescriptive on greenfield, descriptive on brownfield.

**Feature:** /specify → /planify → /codify → /verify → /review? → /refactor? → /release

**Failed verification:**  `/verify` → `/rectify` 

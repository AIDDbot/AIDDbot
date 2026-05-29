---
name: extract
description: Produces coding conventions (one rules file per tier) that agents must follow. Greenfield extracts conventions from the ecosystem (official style guides, framework docs, public rule/skill directories); brownfield extracts the dominant patterns from existing code. Use after /elaborate. Trigger on "extract conventions", "generate coding rules", "define coding rules", "I need coding patterns before codifying".
---

# Extract skill

## Role

Act as a senior software engineer defining coding conventions.

## Task

Produce one `{tier}.rules.md` per tier under `{Rules_Folder}` (from `AGENTS.md`).

> Mode-aware: on greenfield, extract conventions from the ecosystem (style guides, framework docs, public rule/skill directories) and align them with the stack and ADRs; on brownfield, extract the dominant patterns from existing code.

## Context

- A tier is a logical group of code that can be run separately; the project's tiers are listed in `AGENTS.md`.

### Prerequisites

- Root `AGENTS.md` exists.
- `{Product_Folder}/arch/{tier}.arch.md` exists — run `/elaborate` first if missing.

### References

- `AGENTS.md` — **Starting point**, `{Rules_Folder}`, `{Source_Folders}`, **Technology**
- `{Product_Folder}/arch/{tier}.arch.md` for the target tier
- Template in this folder: `tier.rules.template.md`
- **Greenfield only** — external convention sources for the tier's stack:
  - Official/community style guides (e.g. Google/Airbnb style guides, PEP 8, Effective Go, framework docs).
  - Public rule and skill directories (e.g. [skills.sh](https://www.skills.sh/), [awesome-copilot](https://awesome-copilot.github.com/)).
  - Prefer authoritative, stack-matching sources; adapt — do not copy verbatim.

## Steps

### Step 1: Confirm mode

- [ ] Default to the **Starting point** from `AGENTS.md`. Override per tier: a tier with no functional source code is **greenfield** (extract from the ecosystem); a tier with existing code is **brownfield** (extract from code).
- [ ] Note existing files under `{Rules_Folder}` — skip tiers already documented unless refresh requested.

### Step 2: Pick tier

- [ ] Process one tier per invocation.
- [ ] Use user argument if provided; otherwise pick the first undocumented tier.
- [ ] `all` → queue every missing tier; still one file per tier, one summary at the end.

### Step 3: Generate `{tier}.rules.md`

- [ ] Read `tier.rules.template.md`.
- [ ] Derive `{source_glob}` from the tier's source folder (e.g. `api/src/**/*.java`, `web/src/**/*.ts`).
- [ ] **Greenfield**: extract naming, artifact roles, wiring, error handling, and testing conventions from the ecosystem sources above; reconcile any conflicts with ADRs + stack choices (ADRs win). Write **illustrative** canonical examples that embody the chosen pattern, and cite the source guide when one drove the rule. Under **Known Deviations**, state: no deviations yet — greenfield baseline.
- [ ] **Brownfield**: glob file names in the tier's folder → classify by artifact role using naming + content heuristics. Read 1-2 representative files per role and extract the dominant pattern. Detect deviations by skimming structurally different files. Use real (trimmed) snippets as canonical examples.
- [ ] Omit sections that don't apply to this tier (e.g. Testing for db, Wiring for e2e).

## Output

- [ ] Summarize artifact roles covered and the dominant (brownfield) or ecosystem-sourced (greenfield) patterns; list the external sources used on greenfield.
- [ ] Do not add sections or columns beyond the template. Try to keep them under 100 lines.
- [ ] Write `{tier}.rules.md` file under `{Rules_Folder}`.
- [ ] Commit with conventional message (`docs`; scope tier or `product`).
- [ ] If tiers remain: suggest `/extract {next-tier}`.
- [ ] If all done: suggest `/specify` for the first feature.

## Verification

- [ ] `{tier}.rules.md` alone answers: how code in this tier must be written.
- [ ] Canonical examples embody the pattern; anti-patterns are concrete.
- [ ] No leftover `{placeholders}`.

---
name: extract
description: Produces coding conventions (one rules file per tier) that agents must follow, plus a UI design spec (DESIGN.md) for presentation tiers. Greenfield extracts conventions from the ecosystem (official style guides, framework docs, public rule/skill directories) and prescribes design tokens from the brand; brownfield extracts the dominant patterns and tokens from existing code. Use after /excavate. Trigger on "extract conventions", "generate coding rules", "define coding rules", "define the design system", "create a DESIGN.md", "I need coding patterns before codifying".
---

# Extract skill

## Role

Act as a senior software engineer defining coding conventions.

## Task

Produce one `{tier}.rules.md` per tier under `{Rules_Folder}` (from `AGENTS.md`). For presentation tiers, also produce the product UI design spec at `{Product_Folder}/design/DESIGN.md` (design tokens + component behavior).

## Context

### Prerequisites

- Root `AGENTS.md` exists.
- `{Product_Folder}/arch/{tier}.arch.md` exists — run `/excavate` first if missing.

### References

- `AGENTS.md` — **Starting point**, `{Rules_Folder}`, `{Source_Folders}`, **Technology**
- `{Product_Folder}/arch/{tier}.arch.md` (its archetype tells whether the tier is presentation/front)
- Templates in this folder: `tier.rules.template.md`; `design.template.md` (DESIGN.md token frontmatter + prose — presentation tiers only)
- **Greenfield only** — external convention sources for the stack:
  - Official/community style guides (Google/Airbnb, PEP 8, Effective Go, framework docs).
  - Public rule/skill directories ([skills.sh](https://www.skills.sh/), [awesome-copilot](https://awesome-copilot.github.com/)).
  - Prefer authoritative, stack-matching sources; adapt, don't copy verbatim.

## Steps

### Step 1: Confirm mode

- [ ] Read the **Starting point** from `AGENTS.md`. Override per tier: no functional code → **greenfield** (prescribe from the ecosystem); existing code → **brownfield** (describe from code).
- [ ] Note existing files under `{Rules_Folder}` — skip tiers already documented unless refresh requested.

### Step 2: Pick tier

- [ ] Use user argument if provided; otherwise process the first undocumented tier.
- [ ] `all` → queue every missing tier, one file per tier.

### Step 3: Generate `{tier}.rules.md`

- [ ] Read `tier.rules.template.md`.
- [ ] Derive `{source_glob}` from the tier's source folder (e.g. `api/src/**/*.java`, `web/src/**/*.ts`).
- [ ] **Greenfield**: extract naming, artifact roles, wiring, error handling, and testing conventions from the sources above; reconcile conflicts with ADRs + stack choices (ADRs win). Capture per-role rules in the roles table and write **one** illustrative canonical example for the tier; cite the source guides that drove the rules. Under **Known Deviations**: no deviations yet — greenfield baseline.
- [ ] **Brownfield**: glob file names → classify by artifact role (naming + content heuristics). Read 1-2 representative files per role for the dominant pattern. Detect deviations by skimming structurally different files; flag low-confidence inferences. Use one real (trimmed) snippet as the canonical example.
- [ ] Omit sections that don't apply to this tier (e.g. Testing for db, Wiring for e2e).

### Step 4: Generate `DESIGN.md` (presentation tiers only)

- [ ] Skip unless this is a presentation/front tier (per its `{tier}.arch.md` archetype). One product-level spec at `{Product_Folder}/design/DESIGN.md`: create from the primary front tier, or refresh if it exists.
- [ ] Read `design.template.md`.
- [ ] **Greenfield**: prescribe a coherent token set (color, typography, spacing, radius, elevation) and component behavior from the brief and brand; keep states (default/hover/focus/active) and breakpoints consistent.
- [ ] **Brownfield**: infer tokens and component patterns from existing theme/CSS/component code; keep template defaults where nothing is inferable.

## Output

- [ ] Summarize artifact roles covered and the dominant (brownfield) or ecosystem-sourced (greenfield) patterns; list greenfield sources used.
- [ ] No sections/columns beyond the template; keep rules files concise (target under 60 lines).
- [ ] Write `{tier}.rules.md` under `{Rules_Folder}`.
- [ ] For presentation tiers, also write `{Product_Folder}/design/DESIGN.md` from `design.template.md`.
- [ ] Commit (`docs`; scope tier or `product`).
- [ ] If tiers remain: suggest `/extract {next-tier}`.
- [ ] If all done: suggest `/specify` for the first feature.

## Verification

- [ ] `{tier}.rules.md` alone answers: how code in this tier must be written.
- [ ] The roles table and canonical example embody the dominant pattern; anti-patterns are concrete.
- [ ] If written, `DESIGN.md` specifies color, typography, spacing, radius, elevation and component behavior; tokens are self-consistent.
- [ ] No leftover `{placeholders}`.

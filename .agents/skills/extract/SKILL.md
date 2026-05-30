---
name: extract
description: Produces coding conventions (one rules file per tier) that agents must follow, plus a UI design spec (DESIGN.md) for presentation tiers. Greenfield extracts conventions from the ecosystem (official style guides, framework docs, public rule/skill directories) and prescribes design tokens from the brand; brownfield extracts the dominant patterns and tokens from existing code. Use after /excavate. Trigger on "extract conventions", "generate coding rules", "define coding rules", "define the design system", "create a DESIGN.md", "I need coding patterns before codifying".
---

# Extract skill

## Role

Act as a senior software engineer defining coding conventions.

## Task

Produce one `{tier}.rules.md` per tier under `{Rules_Folder}` (from `AGENTS.md`). For presentation tiers, also produce the product UI design spec at `{Product_Folder}/design/DESIGN.md` (design tokens + component behavior).

> Mode-aware: greenfield prescribes rules grounded in the ecosystem (style guides, framework docs, public rule/skill directories) and tokens from the brand — naming the sources and aligning with the stack and ADRs; brownfield describes the dominant patterns and tokens from existing code.

## Context

- A tier is a logical group of code that can be run separately (e.g. back, front, fullstack, cli, db, e2e); the project's tiers are listed in `AGENTS.md`.

### Prerequisites

- Root `AGENTS.md` exists.
- `{Product_Folder}/arch/{tier}.arch.md` exists — run `/excavate` first if missing.

### References

- `AGENTS.md` — **Starting point**, `{Rules_Folder}`, `{Source_Folders}`, **Technology**
- `{Product_Folder}/arch/{tier}.arch.md` for the target tier (use its archetype to tell whether the tier is a presentation/front tier)
- Templates in this folder: `tier.rules.template.md`; `design.template.md` (DESIGN.md token frontmatter + prose — presentation tiers only)
- **Greenfield only** — external convention sources for the tier's stack:
  - Official/community style guides (e.g. Google/Airbnb style guides, PEP 8, Effective Go, framework docs).
  - Public rule and skill directories (e.g. [skills.sh](https://www.skills.sh/), [awesome-copilot](https://awesome-copilot.github.com/)).
  - Prefer authoritative, stack-matching sources; adapt — do not copy verbatim.

## Steps

### Step 1: Confirm mode

- [ ] Read the **Starting point** from `AGENTS.md` — set by `/establish`, the source of truth. Override per tier: a tier with no functional source code is **greenfield** (prescribe from the ecosystem); a tier with existing code is **brownfield** (describe from code).
- [ ] Note existing files under `{Rules_Folder}` — skip tiers already documented unless refresh requested.

### Step 2: Pick tier

- [ ] Process one tier per invocation.
- [ ] Use user argument if provided; otherwise pick the first undocumented tier.
- [ ] `all` → queue every missing tier; still one file per tier, one summary at the end.

### Step 3: Generate `{tier}.rules.md`

- [ ] Read `tier.rules.template.md`.
- [ ] Derive `{source_glob}` from the tier's source folder (e.g. `api/src/**/*.java`, `web/src/**/*.ts`).
- [ ] **Greenfield**: extract naming, artifact roles, wiring, error handling, and testing conventions from the ecosystem sources above; reconcile any conflicts with ADRs + stack choices (ADRs win). Write **illustrative** canonical examples that embody the chosen pattern, and cite the source guide when one drove the rule. Under **Known Deviations**, state: no deviations yet — greenfield baseline.
- [ ] **Brownfield**: glob file names in the tier's folder → classify by artifact role using naming + content heuristics. Read 1-2 representative files per role and extract the dominant pattern. Detect deviations by skimming structurally different files; flag low-confidence inferences. Use real (trimmed) snippets as canonical examples.
- [ ] Omit sections that don't apply to this tier (e.g. Testing for db, Wiring for e2e).

### Step 4: Generate `DESIGN.md` (presentation tiers only)

- [ ] Skip unless this tier is a presentation/front tier (per its `{tier}.arch.md` archetype). One product-level spec at `{Product_Folder}/design/DESIGN.md`: create it from the primary front tier; refresh it if it already exists.
- [ ] Read `design.template.md`.
- [ ] **Greenfield**: prescribe a coherent token set (color, typography, spacing, radius, elevation) and component behavior from the product brief and brand; keep component states (default/hover/focus/active) and breakpoints consistent.
- [ ] **Brownfield**: infer tokens and component patterns from existing theme/CSS/component code; keep the template's defaults where nothing is inferable.

## Output

- [ ] Summarize artifact roles covered and the dominant (brownfield) or ecosystem-sourced (greenfield) patterns; list the external sources used on greenfield.
- [ ] Do not add sections or columns beyond the template. Try to keep rules files under 100 lines.
- [ ] Write `{tier}.rules.md` file under `{Rules_Folder}`.
- [ ] For presentation tiers, also write `{Product_Folder}/design/DESIGN.md` from `design.template.md`.
- [ ] Commit with conventional message (`docs`; scope tier or `product`).
- [ ] If tiers remain: suggest `/extract {next-tier}`.
- [ ] If all done: suggest `/specify` for the first feature.

## Verification

- [ ] `{tier}.rules.md` alone answers: how code in this tier must be written.
- [ ] Canonical examples embody the pattern; anti-patterns are concrete.
- [ ] If written, `DESIGN.md` specifies color, typography, spacing, radius, elevation and component behavior; tokens are self-consistent.
- [ ] No leftover `{placeholders}`.

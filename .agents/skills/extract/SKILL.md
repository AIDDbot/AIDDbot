---
name: extract
description: Produces one combined file per tier — architecture, domain entities, and coding conventions — that agents follow when planning and coding. Greenfield prescribes structure, contracts, and conventions from the ecosystem (official style guides, framework docs, reference architectures); brownfield excavates the dominant patterns from existing code. Use after /establish. Trigger on "extract this tier", "define tier architecture", "generate coding rules", "document the components and domain", "I need conventions before codifying".
---

# Extract skill

## Role

Act as a senior software architect and engineer defining how a tier is built.

## Task

Produce one `{tier}.md` per tier under `{Rules_Folder}` (from `AGENTS.md`). Each file is the single source of truth for that tier: its **architecture** (C4 L3 components, code organization, contracts), its **domain entities**, and its **coding conventions**.

## Context

### Prerequisites

- Root `AGENTS.md` exists, including the **Architecture** section — run `/establish` first if missing.

### References

- `AGENTS.md` — **Starting point**, tier list, `{Rules_Folder}`, `{Source_Folders}`, **Technology**, **Product**, and the **Architecture** section (containers, stack, decisions)
- [Tier template](./tier.template.md)
- **Greenfield only** — external convention sources for the stack:
  - Official/community style guides (Google/Airbnb, PEP 8, Effective Go, framework docs).
  - Public rule/skill directories ([skills.sh](https://www.skills.sh/), [awesome-copilot](https://awesome-copilot.github.com/)).
  - Stack scaffolding defaults and a reference architecture. Prefer authoritative, stack-matching sources; adapt, don't copy verbatim.

## Steps

### Step 1: Confirm mode

- [ ] Read the **Starting point** from `AGENTS.md`. Override per tier: no functional code → **greenfield** (prescribe from the ecosystem); existing code → **brownfield** (describe from code).
- [ ] Note existing files under `{Rules_Folder}` — skip tiers already documented unless refresh requested.

### Step 2: Pick tier

- [ ] Use the user argument if provided; otherwise process the first undocumented tier.
- [ ] `all` → queue every missing tier, one file per tier.
- [ ] Derive `{source_glob}` from the tier's source folder (e.g. `api/src/**/*.java`, `web/src/**/*.ts`).
- [ ] Align with the matching container in the `AGENTS.md` Architecture section (folder, archetype, responsibilities).

### Step 3: Architecture & domain

- [ ] **Greenfield**: prescribe code organization (layer/feature/hybrid), components, key contracts, storage, and dev commands — consistent with the decisions in `AGENTS.md`. Ground it in the stack's conventions and **name the source**. Model the entities this tier owns/persists from the product brief.
- [ ] **Brownfield**: read the source files in the tier's folder **and existing docs (README, comments)**; detect the code organization pattern; document components, contracts, storage, and the domain entities as they exist (include implicit constraints validated in service code, not just schema). Flag low-confidence inferences.
- [ ] Capture relationship integrity and cross-entity business rules agents must enforce during `/codify`. Omit the domain section for tiers with no domain responsibility (e.g. e2e).

### Step 4: Conventions

- [ ] **Greenfield**: prescribe naming, artifact roles, wiring, error handling, and testing conventions from the sources above; reconcile conflicts with the decisions in `AGENTS.md` (decisions win). Write **one** illustrative canonical example; cite the source guides. Under **Known deviations**: greenfield baseline.
- [ ] **Brownfield**: glob file names → classify by artifact role; read 1-2 representative files per role for the dominant pattern. Detect deviations by skimming structurally different files. Use one real (trimmed) snippet as the canonical example.
- [ ] Omit sections that don't apply to this tier (e.g. Testing for db, Wiring for e2e).

## Output

- [ ] Summarize the tier's structure, domain, and dominant (brownfield) or ecosystem-sourced (greenfield) patterns; list greenfield sources used.
- [ ] No sections/columns beyond the template; keep each `{tier}.md` concise (target under 150 lines); Mermaid renders.
- [ ] Write `{tier}.md` under `{Rules_Folder}` with `globs` frontmatter so it auto-applies to the tier's sources.
- [ ] Commit (`docs`; scope tier or `product`).
- [ ] If tiers remain: suggest `/extract {next-tier}`.
- [ ] If all done: suggest `/specify` for the first feature.

## Verification

- [ ] `{tier}.md` alone answers: how this tier is structured, what it exposes, what domain it owns, and how code in it must be written.
- [ ] The roles table and canonical example embody the dominant pattern; anti-patterns are concrete.
- [ ] No leftover `{placeholders}`.

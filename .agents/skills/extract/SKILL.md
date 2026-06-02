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
- [Greenfield mode guide](./greenfield.mode.md)
- [Brownfield mode guide](./brownfield.mode.md)

## Steps

### Step 1: Confirm mode

- [ ] Read the **Starting point** from `AGENTS.md`. Determine mode per tier: no functional code → **greenfield**; existing functional code → **brownfield**.
- [ ] Note existing files under `{Rules_Folder}` — skip tiers already documented unless refresh requested.

### Step 2: Pick tier

- [ ] Use the user argument if provided; otherwise process the first undocumented tier.
- [ ] `all` → queue every missing tier, one file per tier.
- [ ] Derive `{source_glob}` from the tier's source folder (e.g. `api/src/**/*.java`, `web/src/**/*.ts`).
- [ ] Align with the matching container in the `AGENTS.md` Architecture section (folder, archetype, responsibilities).

### Step 3: Architecture & domain

- [ ] Read and follow only the selected mode guide for the current tier:
  - `greenfield.mode.md` when mode is greenfield.
  - `brownfield.mode.md` when mode is brownfield.
- [ ] Omit the domain section for tiers with no domain responsibility (e.g. e2e).

### Step 4: Conventions

- [ ] Ensure conventions are produced through the selected mode guide and reconciled with `AGENTS.md` decisions (decisions win).
- [ ] Omit sections that don't apply to this tier (e.g. Testing for db, Wiring for e2e).

## Output

- [ ] Summarize the tier's structure, domain, and dominant (brownfield) or ecosystem-sourced (greenfield) patterns.
- [ ] No sections/columns beyond the template; keep each `{tier}.md` concise (target under 150 lines); Mermaid renders.
- [ ] Write `{tier}.md` under `{Rules_Folder}` with `globs` frontmatter so it auto-applies to the tier's sources.
- [ ] If tiers remain: suggest `/extract {next-tier}`.
- [ ] If all done: suggest `/specify` for the first feature.

## Verification

- [ ] `{tier}.md` alone answers: how this tier is structured, what it exposes, what domain it owns, and how code in it must be written.
- [ ] The roles table and canonical example embody the dominant pattern; anti-patterns are concrete.
- [ ] No leftover `{placeholders}`.

# Mode: adr

**Output**: `{Product_Folder}/arch/ADR.md`
**Template**: `adr.template.md` (in this skill's folder)

## 1. Gather context
- [ ] Read `AGENTS.md` → extract tiers, tech stack.
- [ ] Read `system.arch.md` if it exists (for cross-tier context).
- [ ] Detect cross-cutting patterns: auth strategy, error handling, logging, API contracts.
- [ ] Identify decisions expensive to reverse: ORM choice, DB engine, API style (REST/GraphQL), monorepo vs polyrepo, SSR vs SPA.
- [ ] Detect code organization pattern per tier (layer-based / feature-based / hybrid).

## 2. Generate ADR.md
- [ ] Read `adr.template.md` from this skill's folder.
- [ ] Repeat the ADR block for each significant decision found, replacing `{placeholders}`.
- [ ] Focus on decisions that constrain planning: framework choices, architectural patterns, API styles, auth mechanisms, data access strategies, code organization pattern.
- [ ] Do NOT document trivial or easily reversible choices.

## 3. Confirm
- [ ] Present summary of what was generated.
- [ ] Flag ambiguities or low-confidence inferences.
- [ ] Suggest next step: `/reversify {first-detected-tier}`.

# Mode: tier

**Output**: `{Product_Folder}/arch/{tier}.arch.md`
**Template**: `tier.arch.template.md` (in this skill's folder)

## 1. Gather context
- [ ] Read `AGENTS.md` → extract tier folder, tech stack for this tier.
- [ ] Read `system.arch.md` if it exists (for system-level context).
- [ ] Read ALL source files in the tier's folder.
- [ ] Detect code organization pattern:
  - **Layer-based**: folders by technical role (`controllers/`, `services/`, `repositories/`)
  - **Feature-based**: folders by domain concept (`users/`, `orders/`)
  - **Hybrid**: feature folders containing internal layers
- [ ] Locate shared artifact zones: `shared/`, `common/`, `utils/`, `lib/`, `core/`. Record paths only — do not catalogue contents.
- [ ] Map internal component relationships and dependencies.

## 2. Generate {tier}.arch.md
- [ ] Read `tier.arch.template.md` from this skill's folder.
- [ ] Fill the template replacing all `{placeholders}` with actual values from the codebase.
- [ ] Limit C4 diagrams to architecturally significant components. Prefer readability over completeness.
- [ ] For `db.arch.md`: include the storage infrastructure, naming conventions, and migration strategy sections from the template. Omit them for other tiers.

## 3. Confirm
- [ ] Present summary of what was generated.
- [ ] Flag ambiguities or low-confidence inferences.
- [ ] Suggest next missing tier, or "Architecture is complete" if all done.

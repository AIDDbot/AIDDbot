# Mode: naming

**Output**: `{Product_Folder}/rules/naming.rules.md`
**Template**: `naming.rules.template.md` (in this skill's folder)

## 1. Gather context
- [ ] Read `AGENTS.md` → extract `{Source_Folders}`, tiers, and any naming conventions already documented.
- [ ] For each tier, scan file names and folder names (no need to read file contents for folders/files patterns).
- [ ] Extract patterns for:
  - **Folders**: feature-based vs layer-based, singular vs plural, casing (kebab, camel, snake).
  - **Files**: suffix conventions per artifact role (e.g. `.controller.ts`, `*Service.java`), casing.
  - **Language elements**: read at most **2 files per tier** (one model + one service) to extract class/interface/type/function naming, constant casing, enum member casing.
  - **Domain language**: which human language is used for domain terms (variables, classes, routes, comments).
- [ ] Identify cross-tier consistency or intentional divergence (e.g. Spanish domain names in both tiers, English suffixes).

## 2. Generate naming.rules.md
- [ ] Read `naming.rules.template.md` from this skill's folder.
- [ ] Fill the template replacing all `{placeholders}` with actual values.
- [ ] For each naming dimension, show the pattern with 2-3 real examples from the codebase.
- [ ] Flag any inconsistencies found across tiers.

## 3. Self-check
- [ ] Re-read the generated file. Verify:
  - (a) No `{placeholder}` text remains.
  - (b) Every example references a real file or folder that exists in the codebase.
  - (c) File is concise (under 80 lines).

## 4. Confirm
- [ ] Present summary of naming conventions found.
- [ ] Flag ambiguities or single-sample patterns.
- [ ] Suggest next step: `/rulify {first-detected-tier}`.

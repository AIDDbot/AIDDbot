# Mode: tier

**Output**: `{Product_Folder}/rules/{tier}.rules.md`
**Template**: `tier.rules.template.md` (in this skill's folder)

## 1. Gather context
- [ ] Read `AGENTS.md` → extract tier folder, tech stack for this tier.
- [ ] Read `{Product_Folder}/arch/{tier}.arch.md` if it exists (for code organization, shared artifacts, constraints).
- [ ] Note which constraints are **already documented in arch** (e.g. wiring, error handling, restrictions). These will be referenced, not re-documented.
- [ ] Glob file names in the tier's folder to get a full listing (no need to read contents yet).
- [ ] Classify files by **artifact role** using naming + content heuristics:
  - Backend examples: model, DTO, controller, service, repository, exception, enum, config
  - Frontend examples: component, service, model/interface, form, route, directive, pipe, guard, utility
  - Identify roles specific to this tier's framework if they don't fit the examples above.
- [ ] For each artifact role, read only **1-2 representative files** (pick the cleanest — this will be the canonical example). Identify the **dominant pattern**:
  - Class/record/interface shape (fields, methods, decorators/annotations)
  - Constructor vs factory method vs inject()
  - Import ordering and grouping
  - Error handling approach
  - Dependency wiring (DI, inject, manual)
- [ ] Detect **deviations** by scanning file names and skimming only files that look structurally different from the representative. Record file name + what differs.

## 2. Generate {tier}.rules.md
- [ ] Read `tier.rules.template.md` from this skill's folder.
- [ ] Fill the template replacing all `{placeholders}` with actual values.
- [ ] For each artifact role section:
  - Write a concise **pattern description** (what, not why — the ADR covers why).
  - Include one **canonical example** — a real code snippet from the codebase (pick the cleanest file).
  - Include one **anti-pattern** — a concrete "don't do this" with reason.
- [ ] For Wiring, Error Handling, and Constraints sections: only document patterns **not already covered** in `{tier}.arch.md`. If arch covers a topic fully, write a one-line reference: "See `{tier}.arch.md` — {section name}".
- [ ] In the Deviations section, list known inconsistencies honestly.
- [ ] Keep the file under 200 lines. Prefer density over completeness.

## 3. Self-check
- [ ] Re-read the generated file. Verify:
  - (a) No `{placeholder}` text remains.
  - (b) Every code example references a file that exists in the codebase.
  - (c) File is under 200 lines.

## 4. Confirm
- [ ] Present summary of artifact roles covered and dominant patterns found.
- [ ] Flag low-confidence patterns (e.g. only one file of that role exists — pattern is a sample of 1).
- [ ] Suggest next missing file, or "Conventions are complete" if all done.

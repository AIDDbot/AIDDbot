# Mode: er

**Output**: `{Product_Folder}/arch/ER.md`
**Template**: `er.template.md` (in this skill's folder)

## 1. Gather context
- [ ] Read `AGENTS.md` → extract `{Product_Folder}`, `{Source_Folders}`, tier definitions.
- [ ] Read `system.arch.md` if it exists (for cross-tier context).
- [ ] Scan domain models across all tiers: Java records/classes, TypeScript interfaces/types, DB schemas, ORM entities, migrations.
- [ ] For each entity: extract fields, types, constraints (PK, FK, unique, required, enums, ranges).
- [ ] Infer relationships from foreign key fields, nested references, or service-level validations.
- [ ] Identify cross-entity business rules (e.g. capacity limits, state-dependent constraints, cascading behavior).

## 2. Generate ER.md
- [ ] Read `er.template.md` from this skill's folder.
- [ ] Fill the template replacing all `{placeholders}` with actual values from the codebase.
- [ ] Include every domain entity — this is a complete domain model reference.
- [ ] Document implicit constraints not visible in the schema (e.g. validated in service code).

## 3. Confirm
- [ ] Present summary of what was generated.
- [ ] Flag ambiguities or low-confidence inferences (e.g. inferred relationships without explicit FK).
- [ ] Suggest next step.

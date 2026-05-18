# Mode: system

**Output**: `{Product_Folder}/arch/system.arch.md`
**Template**: `system.arch.template.md` (in this skill's folder)

## 1. Gather context
- [ ] Read `AGENTS.md` → extract `{Product_Folder}`, `{Source_Folders}`, tier definitions.
- [ ] Read entry points, configuration files, and dependency manifests per tier.
- [ ] Map top-level folder structure per tier — do NOT read individual source files.
- [ ] Identify external integrations: databases, third-party APIs, auth providers, message queues.

## 2. Generate system.arch.md
- [ ] Read `system.arch.template.md` from this skill's folder.
- [ ] Fill the template replacing all `{placeholders}` with actual values from the codebase.
- [ ] Keep it tier-agnostic — no implementation detail.

## 3. Confirm
- [ ] Present summary of what was generated.
- [ ] Flag ambiguities or low-confidence inferences.
- [ ] Suggest next step: `/explore adr`.

---
name: extract
description: Per-tier coding rules. Greenfield extracts from the ecosystem; brownfield from existing code.
---

# Extract skill

## Role
Senior software engineer.

## Task
- `{Rules_Folder}/{tier}.rules.md` — coding conventions (per tier).

## Context
- Prereq: `AGENTS.md`, `arch/{tier}.arch.md` (run `/excavate` if missing).
- `AGENTS.md` — **Starting mode**, `{Rules_Folder}`, `{Source_Folders}`, **Technology**.
- Templates: `tier.rules.template.md`.
- Mode files (read the one for **Starting mode**): [greenfield](./greenfield.mode.md) | [brownfield](./brownfield.mode.md).

## Steps

### Step 1: Confirm mode
- [ ] Read **Starting mode**; override per tier: no code → greenfield; existing code → brownfield.
- [ ] Read the matching mode file. Skip tiers already documented unless refresh requested.

### Step 2: Pick tier
- [ ] Use the user argument; else first undocumented tier. `all` → every missing tier, one per pass.

### Step 3: `{tier}.rules.md`
- [ ] Read `tier.rules.template.md`; derive `{source_glob}` from the tier source folder.
- [ ] Follow the mode file's `{tier}.rules.md` guidance.
- [ ] Omit sections that don't apply (e.g. Testing for db, Wiring for e2e).

## Output
- [ ] Write `{tier}.rules.md` under `{Rules_Folder}`.
- [ ] No sections/columns beyond template; no `{placeholders}`; keep files under 60 lines.
- [ ] Summarize roles + patterns (list greenfield sources). Commit (`docs`; scope tier/`product`).
- [ ] Tiers remain → suggest `/extract {next-tier}`; all done → suggest `/specify`.

## Verification
- [ ] `{tier}.rules.md` alone answers how code in the tier must be written.
- [ ] Roles table + canonical example embody the dominant pattern; anti-patterns concrete.

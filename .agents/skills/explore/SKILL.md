---
name: explore
description: Document system architecture (C4 L2): containers + ADRs. Greenfield prescribes; brownfield extracts.
---

# Explore skill

## Role
Senior software architect.

## Task
- `{Product_Folder}/arch/system.arch.md` — C4 L2 containers + inter-container communication.
- `{Product_Folder}/arch/ADR.md` — architectural decisions.

## Context
- Prereq: root `AGENTS.md` (run `/establish` if missing).
- `AGENTS.md` — `{Product_Folder}`, **Starting mode**, **Tiers**, **Technology**, **Product**.
- Templates: `system.arch.template.md`, `adr.template.md`.
- Mode files (read the one for **Starting mode**): [greenfield](./greenfield.mode.md) | [brownfield](./brownfield.mode.md).

## Steps

### Step 1: Confirm mode
- [ ] Read **Starting mode** from `AGENTS.md`; read the matching mode file and apply it below.

### Step 2: `system.arch.md`
- [ ] Read `system.arch.template.md`; follow the mode file's `system.arch.md` guidance.

### Step 3: `ADR.md`
- [ ] Read `adr.template.md`; follow the mode file's `ADR.md` guidance.

## Output
- [ ] Write `system.arch.md` and `ADR.md` under `{Product_Folder}/arch/`.
- [ ] No sections/columns beyond template; no `{placeholders}`; keep files under 100 lines.
- [ ] Summarize; flag ambiguities. Commit (`docs`; scope `product`).
- [ ] Suggest `/excavate` → `/extract`.

## Verification
- [ ] Mermaid renders.
- [ ] Each ADR has decision, rationale, consequences.
- [ ] `system.arch.md` alone answers what the system does and how containers are arranged.

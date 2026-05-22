---
name: extract
description: Extracts coding conventions and patterns from an existing codebase into agent-consumable rule files. Use this skill after explore to capture how code should be written, not just what exists. Trigger on phrases like "extract conventions", "generate coding rules", or "I need coding patterns before codifying".
---

# Extract skill

## Role

Act as a senior software engineer performing a code convention audit.

## Task

- Analyze source code per tier.
- Write coding rules under `{Rules_Folder}` (from `AGENTS.md`) .
- One output file per invocation — follow the matching `*.mode.md` in this folder.
- Argument `all` — run every missing mode in **mode order**; one summary at the end.

## Context

### Prerequisites

- Root `AGENTS.md` exists.
- `{Product_Folder}/arch/` exists — run `/explore` first if missing.

### References

- `AGENTS.md` — `{Rules_Folder}`, `{Source_Folders}`, **Technology**, git rules
- `{Product_Folder}/arch/{tier}.arch.md` when present
- Mode files in this folder

### Modes

| Argument | Output | Mode file |
|---|---|---|
| `naming` | `naming.rules.md` | [naming.mode.md](./naming.mode.md) |
| `{tier}` | `{tier}.rules.md` | [tier.mode.md](./tier.mode.md) |
| `testing` | `testing.rules.md` | [testing.mode.md](./testing.mode.md) |

### Mode order

`naming` → tier rules (`back`, `front`, `db`, … per **Technology**) → `testing`.

## Steps

### Step 1: Read context

- [ ] Read `AGENTS.md` — `{Rules_Folder}`, `{Source_Folders}`, **Technology** rows.
- [ ] Read relevant `arch/{tier}.arch.md` files when present.
- [ ] Note existing files under `{Rules_Folder}`.

### Step 2: Pick mode

- [ ] Use user argument, `all`, or the first missing file in **mode order**.
- [ ] Skip files that already exist unless the user asks to refresh.
- [ ] For `all` — queue every missing mode; still one file per mode.

### Step 3: Generate

- [ ] Open the matching `{mode}.mode.md` and its template.
- [ ] Derive patterns from the codebase — no leftover `{placeholders}`.
- [ ] Write one file under `{Rules_Folder}` per mode executed.

### Step 4: Finish

- [ ] Summarize what was written and what remains (one summary when `all`).
- [ ] Commit via `/repository` skill.

## Output

- [ ] One file under `{Rules_Folder}` per mode executed (see **Modes**).

## Verification

- [ ] No placeholders; each pattern has a concrete do/don't from the codebase.
- [ ] Deviations from the dominant pattern are flagged.
- [ ] `rules/` alone is enough to match existing style and structure.

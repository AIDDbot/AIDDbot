# Architect small size

## Role

Act as a prompt engineer.

## Task

Create the small size version of the architect skills by concentrating the two medium skills
(`establish` + `extract`) at @labs/medium/ into a single small skill.

## Context

The medium size architect phase has two skills under @labs/medium/, each a real skill folder
(`SKILL.md` + templates):

- `establish` — high-level: sets up `AGENTS.md` and a simple `system.arch.md` (C4 L1–L2).
- `extract` — deep: documents `components.arch.md` (components + inline domain entities) and
  `code.rules.md` (coding rules), in one pass (C4 L3 + rules).

These were already simplified from the four large skills (`/establish`, `/explore`, `/excavate`,
`/extract`). Your job is to go one step further: collapse the two into one.

## Steps

### Step 1: Merge the two skills into one.
Combine `establish` + `extract` into a single skill (suggested name: `architect`). The goal is one
skill that takes a project from nothing to "ready to build" in a single, linear run.

### Step 2: Concentrate the produced artifacts.
Decide which artifacts survive and which get folded in or dropped. Aim for the minimum that still
guides `/specify` and `/codify`. Prefer one combined architecture document over several files;
keep only the coding rules that genuinely change how code is written. Assume tiny projects.

### Step 3: Compact the content and templates.
Summarize the `SKILL.md` and merge the four medium templates into as few as possible (ideally one
architecture template). Keep greenfield/brownfield as a one-line inline note. Sentences short.

## Output

- [ ] Create the small size architect skill as a real skill folder at @labs/small/ (`SKILL.md` + template[s]).
- [ ] One skill only; fewer artifacts and templates than the medium version.
- [ ] Keep files short and sentences clear and concise; no `{placeholders}` left unexplained in the skill.

## Verification

- [ ] The small size architect skill exists at @labs/small/ as a single skill folder.
- [ ] It produces a coherent set of architecture docs in one run, ready for `/specify`.
- [ ] It is meaningfully smaller and simpler than the medium version.

# Incremental artifact pattern

> Keep in sync with [extract/incremental-artifact.md](../extract/incremental-artifact.md).

Used by `/explore` (this skill).

## Flow

1. **Read environment** — `AGENTS.md` for `{Product_Folder}`, `{Source_Folders}`, tiers.
2. **Pick next mode** — argument, or first missing file in recommended order below.
3. **Execute mode file** — follow steps in `{mode}.mode.md`; write **one** output file.
4. **Summarize** — what was created; what remains.
5. **Commit** — read `{Agents_Folder}/skills/repository/SKILL.md` and follow [skill integrations](../repository/skill-integrations.md) with `docs` commit type.

## Rules

- One output file per invocation.
- Do not regenerate an existing file unless the user asks to refresh it.
- When the set is complete, suggest `/extract`.

## Recommended order

`system` → `adr` → `er` → tier arch files (`back`, `front`, `db` as detected)

# Incremental artifact pattern

> Keep in sync with [explore/incremental-artifact.md](../explore/incremental-artifact.md).

Used by `/extract` (this skill).

## Flow

1. **Read environment** — `AGENTS.md` for `{Product_Folder}`, `{Source_Folders}`, tiers.
2. **Pick next mode** — `all`, a named argument, or first missing file in recommended order below.
3. **Execute mode file** — follow steps in `{mode}.mode.md`; write **one** output file (repeat per mode when `all`).
4. **Summarize** — what was created; what remains (one combined summary when `all`).
5. **Commit** — read `{Agents_Folder}/skills/repository/SKILL.md` and follow [skill integrations](../repository/skill-integrations.md) with `docs` commit type.

## Rules

- One output file per invocation unless `all` mode is explicitly requested.
- Do not regenerate an existing file unless the user asks to refresh it.
- When the set is complete, suggest `/specify`.

## Recommended order

`naming` → tier rules (`back`, `front`, `db` as detected) → `testing`

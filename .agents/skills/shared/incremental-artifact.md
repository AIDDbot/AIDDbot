# Incremental artifact pattern

Used by `/explore` and `/extract`: one output file per invocation, then commit with `docs` per [skill-integrations](../repository/skill-integrations.md).

## Flow

1. **Read environment** — `AGENTS.md` for `{Product_Folder}`, `{Source_Folders}`, tiers.
2. **Pick next mode** — named argument, or first missing file in the skill’s recommended order (see below).
3. **Execute mode file** — follow `{mode}.mode.md` in the skill folder; write **one** output file.
4. **Summarize** — what was created; what remains (one combined summary when `/extract` runs `all`).
5. **Commit** — [repository/SKILL.md](../repository/SKILL.md) for the calling skill’s row.

## Rules

- One output file per invocation unless `/extract` `all` is explicitly requested.
- Do not regenerate an existing file unless the user asks to refresh it.
- When the set is complete, suggest the next skill (see table).

## Per skill

| Skill | Output folder | `all` mode | When complete, suggest |
|-------|---------------|------------|-------------------------|
| `/explore` | `{Product_Folder}/arch/` | — | `/extract` |
| `/extract` | `{Product_Folder}/rules/` | run every missing mode in order | `/specify` |

### `/explore` order

`system` → `adr` → `er` → tier arch files (`back`, `front`, `db` as detected)

### `/extract` order

`naming` → tier rules (`back`, `front`, `db` as detected) → `testing`

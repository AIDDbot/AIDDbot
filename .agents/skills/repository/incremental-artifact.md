# Incremental artifact pattern

Used by `/explore` and `/extract` (and similar batch documentation skills).

## Flow

1. **Read environment** — `AGENTS.md` for `{Product_Folder}`, `{Source_Folders}`, tiers.
2. **Pick next mode** — argument, first missing file in recommended order, or `all` (extract only).
3. **Execute mode file** — follow steps in `{mode}.mode.md`; write **one** output file.
4. **Summarize** — what was created; what remains.
5. **Commit** — [repository SKILL](./SKILL.md) with `docs` commit type.

## Rules

- One output file per invocation unless `all` mode is explicitly requested (extract).
- Do not regenerate an existing file unless the user asks to refresh it.
- When the set is complete, suggest the **next pipeline skill** (`/extract` after explore; `/specify` after extract).

## Recommended orders

**Explore:** `system` → `adr` → `er` → tier arch files (`back`, `front`, `db` as detected)

**Extract:** `naming` → tier rules → `testing`

# Harness map

Origin that never changes:

- Commands — `.agents/commands/{name}.command.md`
- Agent rules — `AGENTS.md` at the repository root

Adapters are thin files. They carry only the harness header, then a pointer at the origin.

Write adapters only for harnesses the human confirmed. Infer from this session and from folders
already in the repo; ask when more than one is equally plausible.

## Cursor

**Infer** — this session is Cursor, or `.cursor/` is present.

**Commands** — `.cursor/commands/{name}.md`

Frontmatter: `description` from the origin. The filename is the slash name.

**Rules** — none. Cursor already loads `AGENTS.md`.

**Skills** — none. Cursor already loads `.agents/skills/`.

## Claude Code

**Infer** — this session is Claude Code, or `CLAUDE.md` / `.claude/` is present.

**Commands** — `.claude/commands/{name}.md`

Frontmatter: `description` from the origin. Claude ignores `name` in a command file; the
filename is the slash name.

**Rules** — `CLAUDE.md` at the repository root. Native import, loaded at session start:

```md
@AGENTS.md
```

If `CLAUDE.md` already has Claude-specific lines below an import, keep them and ensure
`@AGENTS.md` is the first line. Never paste `AGENTS.md` into `CLAUDE.md`.

**Skills** — none. Commands tell the agent which skill to call; those live under
`.agents/skills/`. `AGENTS.md` already names that folder.

## GitHub Copilot

**Infer** — this session is Copilot, or `.github/prompts/` /
`.github/copilot-instructions.md` is present.

**Commands** (prompts) — `.github/prompts/{name}.prompt.md`

Frontmatter: `name` and `description` from the origin, plus `agent: agent`.

**Rules** — none. Copilot already loads `AGENTS.md`. Do not add
`.github/copilot-instructions.md` as a second loader of the same file.

**Skills** — none. Copilot already loads `.agents/skills/`.

## Missing origin

No files under `.agents/commands/` — stop; there is nothing to adapt.

No `AGENTS.md` — still write command adapters; skip the rules adapter and say so. Creating the
agent-rules file is `/explore`, not this skill.

---
name: adapt
description: Generate and keep in sync per-harness adapter files (agents, commands, rules) for Claude Code, Cursor, and GitHub Copilot, from a single source of truth in `.agents/`. Idempotent — safe to re-run any time the sources change; deletes adapters whose source was removed.
user-invocable: true
usage: /adapt [--check]
example: /adapt
---

# /adapt

## Role

You are an Adapter Forger. You keep three AI coding harnesses (Claude Code,
Cursor, GitHub Copilot) in sync with a single set of source files, so the
human edits agents/commands/rules exactly once and every harness picks up
the change automatically.

## Task

Read every source file under `.agents/agents/`, `.agents/commands/`, and
`.agents/rules/`, and for each one generate or update the corresponding
adapter file in each harness's own folder, using the mapping tables below.
Then delete any adapter this skill previously generated whose source no
longer exists. Finish with a report.

`--check`: do everything except write or delete — just report what would
change. Use this before a first run on an unfamiliar repo.

## Context

### Idempotency contract (read this before touching any file)

This skill must be safe to run every time, including with zero changes.
Two mechanisms make that possible:

1. **Content comparison, not blind overwrite.** Before writing a generated
   adapter, compare it byte-for-byte against the existing file (if any).
   Write only on an actual difference. Never touch mtimes or re-save
   identical content — a no-op run must leave the filesystem untouched.
2. **A managed-file marker.** Every generated adapter starts with this
   exact HTML comment as its first line (adjust only the source path):

   ```
   <!-- managed by /adapt — do not edit here, edit {source path} instead -->
   ```

   This marker is what makes orphan cleanup safe: this skill only ever
   deletes files that carry it. A hand-written command, agent, or rule
   that a human placed directly in a harness folder — without the marker —
   is never touched, never overwritten, never deleted.

Generation must also be deterministic: process sources in a fixed
alphabetical order, never embed timestamps or run-specific data in the
adapter body, so the same source state always produces byte-identical
output.

### Source schemas

**Agents** — `.agents/agents/{name}.agent.md`
- `name` (required), `description` (required — must state clearly WHEN to invoke, harnesses use this text for auto-selection), `allowed-tools` (optional list), `model` (optional: `default` | `fast` | `capable`)
- Body: the agent's system prompt / persona.

**Commands** — `.agents/commands/{name}.command.md`
- `name` (required), `description` (required), `argument-hint` (optional), `allowed-tools` (optional list), `model` (optional: `default` | `fast` | `capable`)
- Body: the command's prompt template. May reference `$ARGUMENTS`.

**Rules** — `.agents/rules/{container}.rules.md`
- `container` (required — the folder/domain this rule scopes to), `paths` (glob pattern(s) the rule applies to)
- Body: the actual rule content (standing guidance, not an invocable prompt).

Rules are structurally different from agents/commands: they're passive
context a harness attaches automatically to matching files, not something
a human or the model explicitly invokes. Because of that, **rule adapters
embed the full rule content** (regenerated verbatim from source) instead
of pointing to it — some harnesses inject rule files as raw context
without ever giving the model a chance to go fetch a referenced path, so
an indirection there could silently produce an empty rule. Agents and
commands, by contrast, are always reached through an active turn (the
model is asked to run them), so pointing at the source is safe and keeps
duplication to zero.

If a source file is missing a required field, skip it and list it in the
report — never guess a value.

### Mapping — Agents

| Harness | Folder | File | Frontmatter | Body |
| --- | --- | --- | --- | --- |
| Claude Code | `.claude/agents/` | `{name}.md` | `name`, `description` (verbatim — Claude uses this text to decide auto-delegation), `tools` (from `allowed-tools`, comma-separated, not a YAML list), `model` (default→sonnet, fast→haiku, capable→opus, absent→`inherit`) | `<marker>`<br>`Adopt the role, expertise, and instructions defined in @.agents/agents/{name}.agent.md and follow them for this task.` |
| Cursor | `.cursor/agents/` | `{name}.md` | `name`, `description` (verbatim — Cursor's Agent reads this to decide delegation, same role as Claude Code's), `model: inherit` always | `<marker>`<br>`Adopt the role, expertise, and instructions defined in `.agents/agents/{name}.agent.md` and follow them for this task.` |
| GitHub Copilot | `.github/agents/` | `{name}.md` | `name`, `description` (verbatim), `tools` (from `allowed-tools`, as a YAML list) | `<marker>`<br>`Adopt the role and instructions defined in [.agents/agents/{name}.agent.md](../../.agents/agents/{name}.agent.md) for this task.` |

> **Model tiers don't map cleanly onto Cursor.** Cursor subagents take
> `inherit` or a concrete, vendor-specific model ID (`composer-2`,
> `claude-opus-5`, `gpt-5.6-sol`...) — there's no stable alias for
> "fast" or "capable" the way Claude Code has `haiku`/`opus`. Always
> emit `model: inherit` for Cursor regardless of the source's `model`
> tier, and note in the report whenever a source specifies a non-default
> tier, so the human knows Cursor didn't get it and can hardcode a
> concrete ID by hand if they want one (that manual edit will then be
> preserved by the collision rule in step 3, since it has no marker —
> or will be overwritten on the next run if it does have one; tell the
> human this trade-off in the report the first time it comes up).
>
> **GitHub's custom-agent format has no `model` field.** Unlike its
> older, VS Code-only `.github/chatmodes/*.chatmode.md` format (which
> did support `model` and still works, but is scoped to one IDE),
> the cross-surface `.github/agents/*.md` format used above has no
> per-agent model selector — model choice for Copilot CLI / cloud agent
> happens elsewhere. If a source specifies a `model` tier, note in the
> report that it couldn't be applied to the Copilot adapter.
>
> Both Cursor and Claude Code additionally cross-read each other's
> `agents/` folders for compatibility (Cursor also scans `.claude/agents/`
> and `.codex/agents/`). This skill still generates an explicit,
> correctly-schema'd file per harness rather than relying on that
> cross-compatibility, since it isn't guaranteed to interpret
> harness-specific fields like Claude's comma-separated `tools`.

### Mapping — Commands

| Harness | Folder | File | Frontmatter | Body |
| --- | --- | --- | --- | --- |
| Claude Code | `.claude/commands/` | `{name}.md` | `description`, `argument-hint`, `allowed-tools`, `model` (mapped as above) | `<marker>`<br>`Read and execute the instructions in @.agents/commands/{name}.command.md`<br><br>`Arguments: $ARGUMENTS` |
| Cursor | `.cursor/commands/` | `{name}.md` | none (Cursor commands carry no frontmatter) | `<marker>`<br>`**{description}**`<br><br>`Read and follow the instructions in `.agents/commands/{name}.command.md`.` |
| GitHub Copilot | `.github/prompts/` | `{name}.prompt.md` | `description`, `mode: agent`, `model` (mapped id if present, else omitted), `tools` (from `allowed-tools`) | `<marker>`<br>`Read and follow the instructions in [.agents/commands/{name}.command.md](../../.agents/commands/{name}.command.md).` |

### Mapping — Rules

| Harness | Folder | File | Frontmatter | Body |
| --- | --- | --- | --- | --- |
| Claude Code | `.claude/rules/` | `{container}.rules.md` | `paths: "{paths}"` | `<marker>` + full rule body, copied verbatim from source |
| Cursor | `.cursor/rules/` | `{container}.rules.mdc` | `globs: {paths}` (no brackets/quotes — Cursor's mdc frontmatter is not strict YAML), `alwaysApply: false` | `<marker>` + full rule body, copied verbatim from source |
| GitHub Copilot | `.github/instructions/` | `{container}.instructions.md` | `applyTo: "{paths}"` | `<marker>` + full rule body, copied verbatim from source |

> Glob syntax is assumed compatible across the three. If a `paths` pattern
> uses syntax specific to one harness, flag it in the report instead of
> silently translating it.

## Steps

### 1. Inventory

List every file under `.agents/agents/`, `.agents/commands/`, `.agents/rules/`.
List every existing adapter file in the nine target locations above.

### 2. Validate sources

For each source, check required frontmatter fields are present. Valid
sources move to step 3; invalid ones go straight to the report as skipped.

### 3. Diff and generate

For each valid source, in alphabetical order, and for each of its harness
targets:

- Render the adapter (frontmatter + marker + body) per the tables above.
- If a file already exists at that path:
  - Same content → skip (no write).
  - Different content, marker present → overwrite.
  - Different content, marker absent → **do not touch it**; report it as
    a naming collision with a human-authored file and let the human
    resolve it.
- If no file exists → create it (creating parent folders as needed).

### 4. Clean up orphans

For each existing adapter that carries the marker: if its referenced
source path no longer exists, delete the adapter.

### 5. Report

Summarize in chat (no need for a separate report file unless the human
asks):

- Sources found, by family (agents/commands/rules), and how many were skipped (with reason)
- Adapters created / updated / left unchanged / deleted, by harness
- Any naming collisions with non-managed files
- Any source with a non-default `model` tier that couldn't be applied to a Cursor or GitHub Copilot agent adapter (see the notes under the Agents mapping table)
- Confirmation that a second immediate run would report "nothing to do"

## Verification

- [ ] Every generated adapter starts with the managed-file marker
- [ ] No adapter body duplicates a command/agent prompt — only rules embed content, and only verbatim from source
- [ ] Re-running immediately with no source changes writes and deletes nothing
- [ ] No file lacking the marker was ever overwritten or deleted
- [ ] Every orphaned managed adapter (dangling source) was removed
- [ ] `--check` produced a report with zero filesystem writes
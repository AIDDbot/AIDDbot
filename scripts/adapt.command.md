---
name: adapt
description: Generate and synchronize harness adapters from canonical AIDDbot skills.
user-invocable: true
usage: /adapt [--check]
example: /adapt
---
# /adapt

Keep Claude Code, Cursor, GitHub Copilot in VS Code, and Codex synchronized with `.agents/`. Canonical executable sources are only `.agents/skills/{name}/SKILL.md`; agents, passive rules, and the audit hook remain under their existing `.agents/` folders.

`--check` performs inventory, validation, rendering comparison, and orphan analysis without writing or deleting. Process every source in fixed alphabetical order. Never embed timestamps or run-specific values.

## Source contract

Read every `.agents/skills/*/SKILL.md`, `.agents/agents/*.md`, `.agents/rules/*.rules.md`, and `.agents/hooks/index.mjs` when present. Ignore nested documentation and assets except when a skill links to them.

A skill requires `name`, `description`, `metadata.aiddbot-kind`, `user-invocable`, and `disable-model-invocation`. `name` matches its directory; `aiddbot-kind` is exactly `orchestrator`, `worker`, or `primitive`; the metadata map is flat and all its keys and values are strings.

- `orchestrator` and `primitive` require `user-invocable: true`.
- `worker` requires `user-invocable: false`.
- Every kind requires `disable-model-invocation: true`.
- Every composition link targets another canonical `SKILL.md`, never a command or workflow file.

Skip invalid sources and report each violation; never guess. Report counts by skill kind and public/private exposure.

## Managed ownership

Every generated Markdown file begins with exactly:

```html
<!-- managed by /adapt — do not edit here, edit {source path} instead -->
```

The Codex TOML agent equivalent is the first line:

```toml
# managed by /adapt — do not edit here, edit {source path} instead
```

Harness hook JSON cannot carry comments. Treat it as managed only when its top-level `description` is exactly `managed by /adapt — do not edit here, edit .agents/hooks/index.mjs instead`.

Overwrite or delete only files carrying the applicable marker. Preserve and report all unmarked collisions. Compare rendered content byte-for-byte before writing so identical files and mtimes remain untouched.

## Harness mappings

### Skills

Codex, Cursor, and GitHub Copilot in VS Code consume `.agents/skills/` directly. Generate no Codex workflow wrapper, Cursor command or skill adapter, Copilot prompt file, or `.vscode/settings.json` for skill discovery.

Claude Code loads project skills from `.claude/skills/`, so generate a thin pointer for every valid skill at `.claude/skills/{name}/SKILL.md`. Preserve the canonical `name`, `description`, `metadata`, `user-invocable`, `disable-model-invocation`, and optional `argument-hint` and `allowed-tools`. After its frontmatter render the marker, then:

```md
Read and follow [the canonical {name} skill](../../../.agents/skills/{name}/SKILL.md).
```

This directory name preserves the public slash name for orchestrators and primitives; workers remain non-invocable. Never create a Claude command adapter for a skill. Do not create adapters for unsupported or retired Copilot surfaces.

Cursor directly discovers `.agents/skills/` and honors `disable-model-invocation`; it documents no `user-invocable` frontmatter control. Retain the canonical field, generate no duplicate adapter, and report that a runtime Cursor check must confirm worker visibility for the installed release. A pointer adapter cannot hide a source Cursor already discovers.

### Agents

For each valid agent, render thin native adapters in `.claude/agents/`, `.cursor/agents/`, `.github/agents/`, and `.codex/agents/`. Preserve the existing agent mappings: body-only Markdown pointers for Claude, Cursor, and Copilot; a valid TOML agent for Codex. Do not pin a model unless the source explicitly requires one.

### Rules

For each valid `.agents/rules/{container}.rules.md`, render the verbatim rule body with the marker in `.claude/rules/{container}.rules.md`, `.cursor/rules/{container}.rules.mdc`, and `.github/instructions/{container}.instructions.md`. Preserve each harness's native glob syntax and report it. Codex receives no rule adapter because it loads the repository `AGENTS.md`.

### Audit hook

When `.agents/hooks/index.mjs` exists, render the managed `.codex/hooks.json` with synchronous command hooks for `SessionStart`, `SessionEnd`, `SubagentStart`, `SubagentStop`, `UserPromptSubmit`, and `Stop`; each runs `node .agents/hooks/index.mjs ingest codex {event}` with matcher `*`.

Do not synthesize hooks for the other harnesses. Validate their existing configuration and report whether it invokes the shared audit source. Remind the user that Codex project hooks require review and trust through `/hooks`.

## Reconcile and verify

Inventory every existing target under `.claude/skills`, `.claude/commands`, `.cursor/skills`, `.cursor/commands`, `.github/prompts`, `.codex/agents`, and the agent, rule, and hook target folders.

Delete a managed target when its source disappeared, was renamed, no longer matches the schema, or belongs to the retired command/workflow/prompt contract. This includes marked `.claude/commands/*.md`, `.cursor/commands/*.md`, and `.github/prompts/*.prompt.md`. Do not delete unmarked files. Do not treat a canonical `.agents/skills/{name}/SKILL.md` as an adapter or orphan.

Confirm and report:

- each skill has valid classification and links only to canonical skills;
- public orchestrators and primitives have no generated Codex, Cursor, or Copilot copies, while Claude has one thin pointer per canonical skill;
- no worker has a command or prompt adapter;
- no managed Copilot prompt remains and no `.vscode/settings.json` was made;
- agent, rule, and hook adapters retain their mappings;
- no unmarked file was overwritten or deleted; and
- a second immediate run would do nothing.

Report source counts by kind; created, updated, unchanged, deleted, and collision counts by harness; skipped sources; hook status; the Cursor worker visibility caveat; and the Codex hook trust reminder.

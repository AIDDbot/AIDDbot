---
name: adapt
description: Generate and synchronize Claude Code, Cursor, GitHub Copilot, and Codex adapters from `.agents/`.
user-invocable: true
usage: /adapt [--check]
example: /adapt
---

# /adapt

## Role

You are an Adapter Forger. Keep Claude Code, Cursor, GitHub Copilot, and Codex synchronized with the sources in `.agents/`.

## Task

Read agents from `.agents/agents/*.md`, public workflows from the root `.agents/commands/*.workflow.md`, internal commands from the root `.agents/commands/*.command.md`, rules from `.agents/rules/*.rules.md`, and the audit hook from `.agents/hooks/index.mjs`.

Generate adapters for valid agents, public workflows, and rules, plus harness hook configuration when the audit hook exists. Validate and reference internal commands, but never generate adapters for them and never describe them as slash-callable. Delete managed adapters whose source was removed or renamed. Finish with a short report.

`--check` performs the complete inventory, validation, rendering comparison, and orphan analysis without writing or deleting.

## Idempotency contract

Process sources in fixed alphabetical order and never embed timestamps or run-specific values.

- Compare rendered content byte-for-byte before writing. Leave identical files and mtimes untouched.
- Every generated Markdown adapter starts with this exact first-line marker, changing only the source path, except a Codex workflow skill where required YAML frontmatter comes first and the marker is the first body line:

  ```html
  <!-- managed by /adapt — do not edit here, edit {source path} instead -->
  ```

- Codex TOML agents use the equivalent valid TOML marker as their first line:

  ```toml
  # managed by /adapt — do not edit here, edit {source path} instead
  ```

- Harness hook JSON cannot carry comments. Treat a hook file as managed only when its top-level `description` is exactly `managed by /adapt — do not edit here, edit .agents/hooks/index.mjs instead`. Preserve and report every other hook file as a collision.

- Overwrite or delete only files carrying that marker. Preserve every unmarked human-authored file and report any naming collision.

## Source schemas

### Agents

Path: `.agents/agents/{name}.md`

Required frontmatter: `name`, `description`. Optional: `allowed-tools`, `model` (`default`, `fast`, or `capable`). The body is the agent prompt.

### Public workflows

Path: `.agents/commands/{name}.workflow.md`

Required frontmatter: `name`, `description`. Optional: `argument-hint`, `allowed-tools`. The body is the public human entrypoint prompt. Ignore and report any `agent` or `model` field.

### Internal commands

Path: `.agents/commands/{name}.command.md`

Required frontmatter: `name`, `description`. Optional: `argument-hint`, `allowed-tools`. The body is a reusable orchestrator referenced by workflows or other commands. Validate links and frontmatter, but do not adapt it to any harness. Ignore and report any `agent` or `model` field.

### Rules

Path: `.agents/rules/{container}.rules.md`

Required frontmatter: `container`, `paths`. The body is passive context and is embedded verbatim in rule adapters.

Skip invalid sources and report their missing required fields. Do not guess.

## Adapter mappings

### Agents

| Harness | Target | Frontmatter | Body |
| --- | --- | --- | --- |
| Claude Code | `.claude/agents/{name}.md` | `name`, `description`, comma-separated `tools`, mapped `model` | Marker, then `Adopt the role, expertise, and instructions defined in @.agents/agents/{name}.md and follow them for this task.` |
| Cursor | `.cursor/agents/{name}.md` | `name`, `description`, `model: inherit` | Marker, optional model comment, then `Adopt the role, expertise, and instructions defined in \`.agents/agents/{name}.md\` and follow them for this task.` |
| GitHub Copilot | `.github/agents/{name}.md` | `name`, `description`, YAML-list `tools` | Marker, optional model comment, then `Adopt the role and instructions defined in [.agents/agents/{name}.md](../../.agents/agents/{name}.md) for this task.` |
| Codex | `.codex/agents/{name}.toml` | TOML `name`, `description`, optional mapped `model`, `developer_instructions` | TOML marker, then metadata and `developer_instructions = """Adopt the role, expertise, and instructions defined in .agents/agents/{name}.md and follow them for this task."""` |

Map Claude model tiers as `default` or absent to `inherit`, `fast` to `haiku`, and `capable` to `opus`. For Codex, omit `model` for `default` or absent, map `fast` to `gpt-5.6-luna`, and map `capable` to `gpt-5.6-sol`. For Cursor and Copilot, add this comment only for `fast` or `capable`:

```html
<!-- model: pick a {Cursor model ID | Copilot model} if this agent should not inherit (source tier: {tier}) -->
```

### Public workflows

Every valid `.workflow.md` source receives one adapter in every harness. Adapters are public entrypoints, point to the workflow source, and pin neither agent nor model. Codex custom prompts are local and deprecated; use repository skills so the entrypoints travel with the project and appear in Codex's skill and slash menus.

| Harness | Target | Frontmatter | Body |
| --- | --- | --- | --- |
| Claude Code | `.claude/commands/{name}.md` | `description`, optional `argument-hint`, optional `allowed-tools` | Marker, then `Read and execute the instructions in @.agents/commands/{name}.workflow.md`, blank line, `Arguments: $ARGUMENTS` |
| Cursor | `.cursor/commands/{name}.md` | none | Marker, bold description, then `Read and follow the instructions in \`.agents/commands/{name}.workflow.md\`.` |
| GitHub Copilot | `.github/prompts/{name}.prompt.md` | `description`, optional `argument-hint`, optional `tools` from `allowed-tools` | Marker, then `Read and follow the instructions in [.agents/commands/{name}.workflow.md](../../.agents/commands/{name}.workflow.md).` |
| Codex | `.agents/skills/{name}/SKILL.md` | `name`, `description`, `user-invocable: true`, `disable-model-invocation: true` | Marker after frontmatter, then `Read and execute the instructions in [the {name} workflow](../../commands/{name}.workflow.md).` |

Do not generate a harness file for any `.command.md` source. Adapter filenames remain `{name}.md` for Claude and Cursor and `{name}.prompt.md` for Copilot.

### Rules

| Harness | Target | Frontmatter | Body |
| --- | --- | --- | --- |
| Claude Code | `.claude/rules/{container}.rules.md` | `paths: "{paths}"` | Marker plus verbatim rule body |
| Cursor | `.cursor/rules/{container}.rules.mdc` | `globs: {paths}`, `alwaysApply: false` | Marker plus verbatim rule body |
| GitHub Copilot | `.github/instructions/{container}.instructions.md` | `applyTo: "{paths}"` | Marker plus verbatim rule body |

Codex receives no rule adapter. It natively loads the repository `AGENTS.md`; `/explore` generates the consumer's container paths and coding rules there. Never map passive context into `.codex/rules/`, which is an execution-policy format rather than a context format.

### Audit hooks

When `.agents/hooks/index.mjs` exists, generate `.codex/hooks.json` with the managed `description` and command hooks for `SessionStart`, `SessionEnd`, `SubagentStart`, `SubagentStop`, `UserPromptSubmit`, and `Stop`. Each event runs `node .agents/hooks/index.mjs ingest codex {event}`. Use the native Codex `hooks.json` nesting (`hooks` event → matcher object → command hook) and set `matcher` to `*`. Keep audit hooks synchronous so session shutdown cannot cancel pending audit writes.

Do not synthesize hook adapters for the other harnesses: validate their existing configuration and report whether it invokes the same audit source. Codex project hooks require user trust; report that `/hooks` must be used to review new or changed hooks.

Report harness-specific glob syntax instead of silently translating it.

## Steps

### 1. Inventory

List:

- `.agents/agents/*.md`
- root `.agents/commands/*.workflow.md`
- root `.agents/commands/*.command.md`
- `.agents/rules/*.rules.md`
- every existing adapter in the Claude, Cursor, Copilot, and Codex target folders, including `.agents/skills/{workflow}/SKILL.md` candidates and `.codex/hooks.json`

Do not treat nested command experiments or documentation as active sources.

### 2. Validate

Validate required frontmatter for all source families. Validate links from active workflow and internal command files. A public workflow may reference an internal command by explicit markdown link; an internal command is composition, not a human entrypoint.

### 3. Render and generate

For every valid agent, public workflow, and rule, in alphabetical order:

- Render all four adapters for agents and public workflows, and the three applicable rule adapters.
- Leave byte-identical targets unchanged.
- Overwrite differing managed targets.
- Create missing targets.
- Preserve and report differing unmarked targets.

Never render an adapter for an internal command.

### 4. Clean managed orphans

Inspect every managed adapter in the target folders. Delete it when its source no longer exists, was renamed, changed from public `.workflow.md` to internal `.command.md`, or is no longer an adaptable source. Limit Codex workflow cleanup to skill directories whose `SKILL.md` carries the managed marker; never inspect or delete canonical primitive skills as orphans.

This cleanup removes managed adapters for old public names and for internal command names left by an earlier contract. Never delete an unmarked adapter.

### 5. Verify and report

Confirm:

- Every adapter carries the exact managed marker in the format and position defined above and points to its active source.
- Every valid public workflow has exactly four adapters.
- No internal command has a harness adapter.
- Adapter bodies do not duplicate workflow or agent prompts; only rules embed content.
- Codex has one native TOML agent per valid agent, one repository skill per valid public workflow, no context files under `.codex/rules/`, and a managed audit hook configuration when the audit source exists.
- No unmarked file was overwritten or deleted.
- A second immediate run would do nothing.

Report source counts and skipped reasons, adapters created/updated/unchanged/deleted by harness, collisions, ignored fields, model mappings or comments, hook status and Codex trust reminder, and the final workflow/internal-command adapter policy.

# Customize agent profiles

AIDDbot installs agent profiles for Claude Code, Codex, GitHub Copilot, and Cursor. You can edit these files in the format your preferred harness supports, choose models and reasoning effort available to your account, or remove the profiles for harnesses you do not use.

> [!WARNING]
> Some harnesses also scan directories used by other harnesses or shared by the Agent Skills standard. For example, GitHub Copilot CLI discovers project agents in both `.github/agents/` and `.claude/agents/`; when IDs match at the same level, `.github/agents/` takes precedence. It also discovers project skills from `.github/skills/`, `.agents/skills/`, and `.claude/skills/`, with the first matching skill location taking precedence. So an agent or skill may come from a directory you did not expect. Check every directory your harness scans before adding another copy. See the [Copilot CLI locations and precedence](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#custom-agents-reference).

## Choose models and effort

Use models released in 2026 or later: earlier ones are not supported.

Each harness defines three tiers once (`deep`, `standard`, `light`), and each agent uses one: the Architect is `deep`, the Craftsman `standard`, the Builder `light`. To change what AIDDbot installs, create `.aiddbot/agents.local.yaml` in your project. It has the same shape as AIDDbot's own `agents.yaml`, and whatever you write wins over the defaults.

```yaml
# Run the Builder on the standard tier in every harness
agents:
  builder:
    tier: standard

# Redefine what a tier means in one harness (keys you omit keep their default)
harnesses:
  claude-code:
    tiers:
      standard:
        model: claude-sonnet-5-5
```

A single agent can also override one harness: `agents.builder.codex.effort: high`. Efforts are `low`, `medium`, `high`, `xhigh`, or `max`; use only models and levels your account offers. Run `npx --allow-git=all github:AIDDbot/AIDDbot update` to apply the file. `update` regenerates the profiles from your overrides, so nothing conflicts and the file itself is never touched. Delete it to go back to the defaults. An unknown tier or invalid effort stops the update with a message before anything is written.

## Agent profiles

You can still edit the native agent profile files directly:

| Harness | Agent profile location |
| --- | --- |
| Claude Code | `.claude/agents/*.md` |
| Codex | `.codex/agents/*.toml` |
| GitHub Copilot | `.github/agents/*.agent.md` |
| Cursor | `.cursor/agents/*.md` |

Prefer `agents.local.yaml` for models and effort: `aiddbot update` preserves a locally edited managed profile and reports a conflict unless you pass `--force`, and it restores any managed profile that you deleted, so remove unused profiles after the last update; a later update will recreate them.

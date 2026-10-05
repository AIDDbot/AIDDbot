# Customize agent profiles

AIDDbot installs agent profiles for Claude Code, Codex, GitHub Copilot and Cursor. You can edit these files in the format of your harness. You can select the models and the reasoning effort that your account gives. You can remove the profiles of the harnesses that you do not use.

> [!WARNING]
> Some harnesses also read the folders of other harnesses, or the folders of the Agent Skills standard. For example, GitHub Copilot CLI finds project agents in `.github/agents/` and in `.claude/agents/`. When two agents have the same ID at the same level, `.github/agents/` has priority. It also finds project skills in `.github/skills/`, `.agents/skills/` and `.claude/skills/`, and the first location that has the skill has priority. Thus an agent or a skill can come from a folder that you do not expect. Before you add one more copy, examine each folder that your harness reads. See the [Copilot CLI locations and precedence](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#custom-agents-reference).

## Select models and effort

Use models from 2026 or later. AIDDbot does not support older models.

Each harness defines three tiers one time: `deep`, `standard` and `light`. Each agent uses one tier: the Architect uses `deep`, the Craftsman uses `standard` and the Builder uses `light`. To change what AIDDbot installs, make `.aiddbot/agents.local.yaml` in your project. It has the same shape as the `agents.yaml` of AIDDbot. Each value in it has priority over the default.

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

One agent can also change one harness: `agents.builder.codex.effort: high`. The effort levels are `low`, `medium`, `high`, `xhigh` and `max`. Use only the models and the levels that your account gives.

To apply the file, run `npx --allow-git=all github:AIDDbot/AIDDbot update`. `update` makes the profiles again from your values. Thus no conflict occurs, and `update` never changes your file. To go back to the defaults, delete the file. An unknown tier or an incorrect effort stops the update with a message, before it writes a file.

If your account does not give a default model of a harness, set its tiers to a model that you have. In Cursor, `model: inherit` uses the model of the main session.

## Agent profiles

You can also edit the native agent profile files:

| Harness | Agent profile location |
| --- | --- |
| Claude Code | `.claude/agents/*.md` |
| Codex | `.codex/agents/*.toml` |
| GitHub Copilot | `.github/agents/*.agent.md` |
| Cursor | `.cursor/agents/*.md` |

For models and effort, use `agents.local.yaml`:

- `aiddbot update` keeps a managed profile that you edited, and reports a conflict, unless you use `--force`.
- `aiddbot update` makes a managed profile again if you deleted it. Thus remove the profiles that you do not use after the last update. A later update makes them again.

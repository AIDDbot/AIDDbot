# Customize agent profiles

AIDDbot installs agent profiles for Claude Code, Codex, GitHub Copilot, and Cursor. You can edit these files in the format your preferred harness supports, choose models and reasoning effort available to your account, or remove the profiles for harnesses you do not use.

> [!WARNING]
> Some harnesses also scan directories used by other harnesses or shared by the Agent Skills standard. For example, GitHub Copilot CLI discovers project agents in both `.github/agents/` and `.claude/agents/`; when IDs match at the same level, `.github/agents/` takes precedence. It also discovers project skills from `.github/skills/`, `.agents/skills/`, and `.claude/skills/`, with the first matching skill location taking precedence. So an agent or skill may come from a directory you did not expect. Check every directory your harness scans before adding another copy. See the [Copilot CLI locations and precedence](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#custom-agents-reference).

## Agent profiles

Edit the native agent profile files directly:

| Harness | Agent profile location |
| --- | --- |
| Claude Code | `.claude/agents/*.md` |
| Codex | `.codex/agents/*.toml` |
| GitHub Copilot | `.github/agents/*.agent.md` |
| Cursor | `.cursor/agents/*.md` |

Set the model and reasoning effort using that harness's supported fields and syntax. The available model names and effort levels can vary by harness, model, and account. AIDDbot's installed profiles are starting points; your local harness files are where you customize them.

`aiddbot update` preserves a locally edited managed profile and reports a conflict unless you pass `--force`. It restores any managed profile that you deleted, so remove unused profiles after the last update; a later update will recreate them.

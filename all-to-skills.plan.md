# All to skills migration plan

Status: ready for execution.

## Context

AIDDbot currently distinguishes three executable concepts:

```text
public workflow → internal command → agent skill
```

- Public workflows live in `.agents/commands/*.workflow.md` and are adapted into each harness's public command or prompt format.
- Internal commands live in `.agents/commands/*.command.md` and compose reusable orchestration without becoming public entrypoints.
- Skills live in `.agents/skills/{name}/SKILL.md` and implement the SDLC primitives executed by agents.

This separation is explicit, but it creates several document formats for artifacts that are all, fundamentally, reusable agent instructions. Codex makes the overlap especially visible because its repository-native, shareable executable abstraction is the Agent Skill under `.agents/skills/`; it has no documented project-local equivalent to the command or prompt directories used by the other harnesses.

The migration makes every executable AIDDbot capability a real Agent Skill while preserving its architectural purpose through AIDDbot metadata.

## Settled decisions

- Every executable AIDDbot artifact becomes a canonical Agent Skill under `.agents/skills/{name}/SKILL.md`.
- `metadata.aiddbot-kind` has exactly three string values: `orchestrator`, `worker`, and `primitive`.
- Orchestrators and primitives are human-invocable; workers are internal.
- All three kinds disable implicit model invocation. Orchestrators and primitives are selected explicitly; workers are reached only through linked composition.
- Existing public workflow names remain stable as slash-entrypoint names.
- Codex and GitHub Copilot in VS Code consume `.agents/skills/` directly and receive no workflow or prompt adapters.
- No `.vscode/settings.json` is generated because `.agents/skills/` is a default Copilot project-skill location.
- Claude Code and Cursor consume the canonical skills directly when supported by their documented minimum versions; otherwise `/adapt` generates the thinnest supported pointer adapters.
- GitHub Copilot CLI, the GitHub.com coding agent, and other Copilot surfaces are outside the compatibility scope.
- The migration is atomic: canonical conversions, link rewrites, adapter cleanup, documentation, and distribution changes land together.
- Cleanup deletes only files carrying the `/adapt` ownership marker and preserves every unmarked file as a reported collision.

## Target conceptual model

Replace the file-type distinction with one executable format and three levels of abstraction:

```text
orchestrator skill → worker skill → primitive skill
```

| `metadata.aiddbot-kind` | Purpose | Human entrypoint | May compose other skills |
| --- | --- | --- | --- |
| `orchestrator` | Owns a complete end-to-end outcome | Yes | Yes |
| `worker` | Performs an internal composite stage | No | Yes |
| `primitive` | Performs one focused AIDD capability | Yes | Only when its contract requires it |

`metadata.aiddbot-kind` describes abstraction and composition, not visibility. It uses the Agent Skills standard `metadata` map, whose keys and values are strings, and gives the custom property an AIDDbot-specific name to avoid collisions. `user-invocable` independently controls whether a human may invoke a skill. Orchestrators and primitives are public; workers are internal.

A worker is an internal composite skill, not an agent role. Architect, Builder, and Craftsman remain the agents spawned to execute skills.

Representative composition:

```text
deliver-requirement          orchestrator
├── scope-feature            worker
│   └── scope-change         primitive
├── deliver-spec             worker
│   ├── specify-spec         worker
│   │   └── specify          primitive
│   ├── implement-spec       worker
│   │   ├── planify          primitive
│   │   └── codify           primitive
│   └── ship-implementation  worker
│       ├── verify           primitive
│       ├── qualify          primitive
│       └── shipify          primitive
└── deliver-change           worker
```

Example public skill:

```yaml
---
name: deliver-requirement
description: Deliver a requirement as one specification or a coordinated multi-spec change.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
```

Example internal skill:

```yaml
---
name: deliver-spec
description: Deliver one validated specification on its feature branch.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
```

Example primitive skill:

```yaml
---
name: codify
description: Implement a container or e2e plan, or fix a report, with tests.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
```

`metadata.aiddbot-kind` is standard-conforming extension metadata. Harnesses are not expected to interpret its value; `/adapt` uses it together with `user-invocable` to decide which public adapters to render. Keep this map flat: both `aiddbot-kind` and its value are strings.

## Target source layout

```text
.agents/
  agents/
    architect.md
    builder.md
    craftsman.md
  hooks/
    index.mjs
  rules/
    *.rules.md
  skills/
    deliver-requirement/
      SKILL.md
    deliver-spec/
      SKILL.md
    implement-spec/
      SKILL.md
    codify/
      SKILL.md
    verify/
      SKILL.md
    ...
    skills.catalog.md
```

The `.agents/commands/` directory disappears after migration. `.agents/` remains the harness-neutral source of truth: it contains Agent Skills, agent definitions, passive rules, and the shared audit hook.

## Harness impact

### Codex

Codex consumes the canonical `.agents/skills/` tree directly. No workflow skill wrapper is generated and no workflow content is duplicated under `.codex/`.

Codex-specific artifacts remain:

- `.codex/agents/*.toml` for native custom agents;
- `.codex/hooks.json` for audit lifecycle hooks;
- optional per-skill `agents/openai.yaml` metadata when Codex invocation policy or presentation requires it.

Public `orchestrator` and `primitive` skills are explicitly invocable. `worker` skills must be neither human-invocable nor implicitly selected. Validate the shared `SKILL.md` frontmatter in supported Codex surfaces; generate per-skill `agents/openai.yaml` only where required to enforce the settled invocation policy.

### Claude Code

Use direct canonical-skill discovery when the documented minimum Claude Code version supports `.agents/skills/` with the settled invocation policy. Otherwise, `/adapt` generates thin pointer adapters for orchestrators, workers, and primitives in the native Claude skill location, plus public command adapters only if native skills cannot preserve the existing slash names.

Claude-specific agent adapters and rule adapters remain. Validate whether Claude can consume `.agents/skills/` directly; if it requires `.claude/skills/`, generate thin skill adapters or another non-duplicating reference form.

### Cursor

Use direct canonical-skill discovery when the documented minimum Cursor version supports `.agents/skills/` with the settled invocation policy. Otherwise, generate thin `.cursor/skills/` pointer adapters for all three kinds and `.cursor/commands/` adapters only if native skills cannot preserve the existing public slash names.

Cursor-specific agent, rule, and hook adapters remain.

### GitHub Copilot

The supported Copilot surface is GitHub Copilot in VS Code. It discovers project skills directly from `.agents/skills/`, and user-invocable skills appear as slash commands alongside prompt files. The canonical skills therefore replace `.github/prompts/*.prompt.md`; `/adapt` must remove obsolete marked prompt adapters and must not generate replacements.

Do not generate `.vscode/settings.json`. VS Code already treats `.agents/skills/` as a default project-skill location. `chat.agentSkillsLocations` is only needed for additional non-standard locations, and writing workspace settings would create avoidable ownership and collision concerns.

Copilot recognizes `argument-hint`, `user-invocable`, and `disable-model-invocation` in `SKILL.md` frontmatter. Use those fields directly instead of translating them into prompt-file frontmatter.

Copilot-specific agent, instruction, and hook adapters remain.

No compatibility claim is made by this plan for Copilot CLI, the GitHub.com coding agent, or other Copilot surfaces.

## Expected benefits

- One authoring format for every executable AIDDbot capability.
- No Codex workflow wrappers mixed with primitive skills: the canonical orchestrator is itself the skill.
- Less routing prose and fewer concepts for agents and maintainers to distinguish.
- Composition links always target `SKILL.md`.
- `/adapt` becomes a translation layer driven by semantic metadata instead of filename suffixes.
- Codex and Copilot in VS Code consume the same canonical `.agents/skills/` tree without workflow or prompt adapters.
- Remaining harness adapters stay thin and contain no workflow or agent prompt duplication.

## Risks and mitigations

### Public versus internal discovery

All artifacts becoming skills may make internal workers visible in harness selectors or eligible for implicit invocation. Treat exposure of any worker as a failed compatibility check. Generate harness-specific invocation-policy metadata or thin adapters when direct discovery cannot enforce the settled policy.

### Metadata portability

The Agent Skills specification explicitly permits arbitrary string-to-string properties under `metadata`, so `metadata.aiddbot-kind` does not introduce an unknown top-level field. Validate that every supported harness preserves or safely ignores the standard `metadata` map. Fail validation rather than moving classification outside the canonical skill. Do not nest AIDDbot objects inside it or use non-string values.

### Minimum harness versions

Native Agent Skill support varies by harness and release. During implementation, determine, test, and document the minimum supported version of Claude Code, Cursor, Codex, and the GitHub Copilot extension for VS Code. Where native support is insufficient, retain the fallback adapter already defined in this plan.

### Skill graph semantics

A skill referencing another skill does not necessarily guarantee that every harness performs a formal nested invocation. Skill prose must explicitly require reading the linked `SKILL.md`, and orchestration skills must retain their spawn, sequencing, approval, retry, and handoff contracts.

### Catalog size and context budget

Moving every internal command into the skill inventory increases the discovered skill count. Descriptions must remain short, distinctive, and correctly scoped so orchestrators and primitives are not omitted or selected accidentally.

### Migration compatibility

Existing consumers may still have managed command adapters from previous AIDDbot versions. `/adapt` must remove only marked obsolete adapters and preserve unmarked user-authored files.

## Migration plan

### Phase 0 — Validate the settled contract

1. Validate `metadata.aiddbot-kind` as a flat string-to-string metadata entry accepted or safely ignored by every supported harness.
2. Validate orchestrators and primitives as explicit public entries and workers as internal, non-implicit skills.
3. Determine and document minimum supported versions for Claude Code, Cursor, Codex, and GitHub Copilot in VS Code; other Copilot surfaces remain out of scope.
4. Verify native skill discovery paths and invocation metadata against those versions.
5. Select the predefined Claude Code and Cursor fallback adapters only when direct canonical-skill consumption fails validation. Codex and Copilot in VS Code never receive workflow adapters.

### Phase 1 — Specify and characterize current behavior

1. Inventory all active `.workflow.md`, `.command.md`, and `SKILL.md` artifacts.
2. Record the current public entrypoints and internal composition graph.
3. Characterize branch ownership, approval stops, parallelism, defect loops, and agent handoffs.
4. Add structural checks proving that internal commands have no public adapters and public workflows have the expected adapters.
5. Capture current `/adapt --check` output as the compatibility baseline.

### Phase 2 — Define the unified skill schema

1. Update the skill template with the chosen AIDDbot classification mechanism.
2. Define required and optional frontmatter by `metadata.aiddbot-kind`, keeping every metadata key and value a string.
3. Define rules for links between orchestrator, worker, and primitive skills.
4. Define public invocation and implicit-invocation policy per harness.
5. Update `/skillify` so it can create and maintain all three kinds without adding routing prose to individual skills.
6. Update `skills.catalog.md` as the authoritative inventory and routing view.

### Phase 3 — Convert internal commands

For every `.agents/commands/{name}.command.md`:

1. Create `.agents/skills/{name}/SKILL.md` with `metadata.aiddbot-kind: worker`.
2. Preserve its orchestration contract, inputs, sequencing, parallelism, stops, retries, and outputs.
3. Rewrite links to referenced commands and skills so they point to canonical `SKILL.md` files.
4. Remove command-only frontmatter that no longer applies.
5. Verify that no public adapter is generated for the new worker skill.

Convert one internal command first as a vertical slice before migrating the rest.

### Phase 4 — Convert public workflows

For every `.agents/commands/{name}.workflow.md`:

1. Create `.agents/skills/{name}/SKILL.md` with `metadata.aiddbot-kind: orchestrator`.
2. Move the complete workflow body into the skill; do not leave a wrapper pointing to the old file.
3. Preserve arguments, human approval checkpoints, YOLO behavior, and final reporting.
4. Rewrite internal composition links to worker skills.
5. Generate only the harness adapters still required by the Phase 0 compatibility decision.
6. Confirm the public name and invocation remain stable.

### Phase 5 — Rewrite `/adapt`

1. Inventory `.agents/skills/*/SKILL.md` instead of `.agents/commands/*`.
2. Validate the common skill schema and `metadata.aiddbot-kind` as a string with one of the three allowed values.
3. Render public command adapters for orchestrators and primitives only where the Claude Code or Cursor compatibility fallback requires them.
4. Render no public command adapter for workers; generate a native skill pointer only when a harness requires one for internal composition.
5. Generate no Codex workflow wrappers, Copilot prompt files, or `.vscode/settings.json`; both harnesses consume `.agents/skills/` directly.
6. Continue adapting agents, rules, and hooks by harness.
7. Remove marked adapters belonging to deleted workflow and command sources, including obsolete `.github/prompts/*.prompt.md` files.
8. Preserve byte-for-byte idempotency, collision handling, and `--check` behavior.
9. Report counts by skill kind and adapters by harness.

### Phase 6 — Remove the old command tree

1. Confirm every workflow and internal command has a validated skill replacement.
2. Confirm no active file links to `.agents/commands/`.
3. Delete the migrated `.workflow.md` and `.command.md` files.
4. Remove `.agents/commands/` when empty.
5. Delete only managed obsolete harness adapters; preserve unmarked files.

### Phase 7 — Align documentation and distribution

1. Update root `AGENTS.md` to describe the unified skill graph.
2. Update `README.md`, `docs/AIDD.workflow.md`, and `docs/getting-started.md`.
3. Update design decisions with the adopted rationale and rejected alternatives.
4. Update the overlay installer so it copies the new canonical tree and only the remaining harness adapters.
5. Remove references to agents executing skills while the current session executes commands.
6. Document GitHub Copilot in VS Code as the supported Copilot surface and remove instructions that require `.github/prompts/`.

### Phase 8 — Verify all harnesses

For each supported harness:

1. Install AIDDbot into a clean external fixture.
2. Confirm every orchestrator skill is visible through the intended public interaction.
3. Confirm worker skills are not exposed as public entrypoints and only approved primitives are directly invocable.
4. Invoke one complete delivery workflow and verify subagent role selection and skill loading.
5. Confirm audit hooks record session, prompt, subagent, and stop events.
6. Run `/adapt --check` twice and confirm the second run reports no changes.
7. Confirm removed or renamed managed sources clean their adapters without touching human-authored files.

## Acceptance criteria

- `.agents/commands/` no longer exists.
- Every former workflow is a canonical skill with `metadata.aiddbot-kind: orchestrator` containing its complete instructions.
- Every former internal command is a canonical skill with `metadata.aiddbot-kind: worker` containing its complete instructions.
- Every existing SDLC skill declares `metadata.aiddbot-kind: primitive`.
- The `metadata` map remains a flat string-to-string map conforming to the Agent Skills specification.
- Existing SDLC primitives are classified consistently without duplicating routing prose.
- The skills catalog is the single inventory and routing authority.
- Public workflow names and behavior remain stable in every supported harness.
- Worker skills are not presented as public commands or prompts.
- Codex and GitHub Copilot in VS Code consume canonical orchestrator skills without generated copies.
- `.github/prompts/` contains no managed AIDDbot workflow adapters after migration.
- No `.vscode/settings.json` is generated for skill discovery.
- Remaining harness adapters are thin pointers and are generated only when native skill discovery is insufficient.
- Agent, rule, and hook behavior remains equivalent to the pre-migration baseline.
- `/adapt` remains collision-safe, cleanup-safe, deterministic, and idempotent.
- The installer copies the complete canonical model and every required harness adapter.

## Recommended execution strategy

Treat this as an atomic architectural migration rather than a mechanical file move. Characterize the current behavior first, implement every conversion on one migration branch, and use temporary clean fixtures for harness validation. Do not merge an intermediate state containing both canonical commands and their replacement skills. Remove the old command tree and obsolete managed adapters only after all replacements pass within the same branch, then land the complete migration together.

## Execution trigger

This plan is ready to run. Start implementation only when the user explicitly invokes or requests execution of `all-to-skills.plan.md`.

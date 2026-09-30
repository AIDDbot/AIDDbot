# Deterministic core: medium-term rebuild plan

Status: questions answered; decisions in `deterministic-core/decisions.md`, plan in `deterministic-core/plan.md`. Complements proposals A (greenfield bootstrap), B (spec-first workflow), and C (craft quality records), and sequences them with the refactoring below.

## Thesis

**Models judge; scripts keep state.** Frontier models are good at reading code, writing specs, and deciding whether a finding matters. They are not a reliable store for counters, revisions, statuses, IDs, file formats, or git choreography, and every such rule written in a `SKILL.md` is paid for in tokens on every run and still executed with some variance.

The target is a small deterministic core that owns every record's lifecycle, with skills reduced to the judgment calls that remain. A skill should read as: goal, the decisions only a model can make, and the core commands that record those decisions.

## Diagnosis of the current implementation

### Journaling does two incompatible jobs

The journal is simultaneously a human-readable narrative and the machine state that gates shipping. Each job damages the other:

- **Parsed by column offset.** `verify-behavior/scripts/evaluation/journal.mjs` and `ship-spec/scripts/preflight/journal.mjs` each re-parse the fixed-width line with `line.slice(9, 15)`, `slice(23, 29)`, and so on. The two parsers differ: one compares `Info`/`Error`, the other maps them back to `green`/`red`. Any change to a column width in `append.mjs` silently breaks the shipping gate.
- **Lossy by design.** Fields are padded and truncated to 6–8 characters (`Craftsman` → `Craft`, events cut at 8 characters, summaries at 128), and `append.mjs` warns about truncation on stderr. The narrative loses information to keep a layout a machine then has to undo.
- **Gate evidence is untracked.** Revisions and evaluation statuses live only in `.aiddbot/journals/*.log`, which Git ignores. A fresh clone, another machine, or a cleaned folder cannot ship a spec: missing evidence blocks by design. The rule is correct; the storage is wrong.
- **Triple bookkeeping.** One evaluation is written to the journal line, to the report frontmatter (`spec`, `status`, `revision`, `evaluated_commit`), and to the spec frontmatter (`status`, `last_process`). Most of `preflight` exists to police that these three copies agree.
- **Fragile parsing.** One malformed evaluation line in any day's journal makes `readEvaluations` throw, blocking every spec.
- **Model ceremony.** Skills contain 37 journal instructions: `start`, `done`, `spawn` per role, `verdict`, `select`, `blocked`, `debt`, per-project `select` and install results, and "each coding, testing, linting, and failure milestone". Many are either observable (subagent start and stop, session start) or already emitted by a script (evaluations).
- **Two parallel traces.** The vendored hook bundle (`.agents/hooks/index.mjs`, 975 generated lines) writes per-session JSONL and Markdown transcripts under `temp/audit/`, while the model writes the journal by hand. Subagent spawns are recorded in both, in different formats, and neither references the other.
- **Coupling.** Every journaling skill must be registered in `STAGE_BY_SKILL` inside `append.mjs`; times are local in the journal and UTC ISO in reports.

### Scripts are deterministic individually but not as a system

- Five `git()` helpers, five repository-root finders with three different markers (`.git`; `.aiddbot` + `.git`; `.aiddbot` + `.product`), three copies of default-branch inference, and three frontmatter readers or writers.
- The product folder is a `--product` flag in `define-spec`, hard-coded `.product` in `ship-spec/preflight`, and prose in `AGENTS.md` for everything else. There is no machine-readable configuration.
- Scripts reach across skills (`review-implementation` imports `verify-behavior`'s evaluation module; `architect-system-foundation` runs `scaffold-system`'s `git-integrate.mjs`), which contradicts the skill template's own "only inside its own folder" rule and shows that a shared core already exists implicitly.
- Every script invents its own argument parser, error style, and output (JSON in some, prose in others; exit codes 1 or 2).

### Spec state has several writers

The status chain `draft → in-progress → verified → qualified → shipped` is written by the model in `define-spec` (approval) and `ship-spec`, and by scripts in verification and qualification. Anything a model writes by hand can drift; transitions are exactly the kind of rule a script should enforce.

### Judgment is re-derived on every run

- **Command classification.** `implement-project`, `verify-behavior`, and `scan-quality` each ask the model to classify commands as Build, Acceptance, or Quality "from effective flags, not script names". That judgment is made again every run, by different roles, with possibly different answers. The scaffold already writes each project's package scripts to `.aiddbot/aiddbot.system.json`; the classification is a fact that should be recorded once.
- **Release versioning.** `release-versioning.md` asks the model to find and classify every version declaration. For the greenfield archetypes AIDDbot itself scaffolds, the files are known.
- **Port hygiene.** `free-port.ps1`/`.sh` and the "only a listener whose PID this run captured" rule are execution mechanics a runner should own.

### Prompt weight in the wrong places

- The same ~90-word delegation paragraph is repeated in the three orchestrators; the rules aimed at sub-agents ("never ask the human") are addressed to the orchestrator instead of living in the sub-agents' own prompts.
- The three agent prompts (`.agents/agents/*.md`) are three generic lines each and state role boundaries ("never write code") that skills then repeat. Those boundaries could be enforced by the harness (tool lists and pre-tool hooks generated by `adapt.js`) instead of requested in prose.
- `define-spec/scripts/prepare.mjs` commits all pending work as `chore: checkpoint before spec` on whatever branch is checked out, possibly the default branch — a hidden side effect no skill text mentions.
- `skills.catalog.md` and `docs/AIDD.workflow.md` describe the same routing twice (P11 was deferred).

## Target architecture

### One core CLI: `aidd`

A single zero-dependency Node module shipped in the overlay (for example `.agents/aidd/`), with one config loader, one git layer, one frontmatter layer, one record layer, one argument parser, JSON output, and documented exit codes. Skills stop owning scripts except where a capability is genuinely private to them (the scaffold materializer, if it survives A).

Indicative command groups, to be settled per phase:

| Group | Owns | Replaces |
| --- | --- | --- |
| `aidd config` | Product folder, source folders, default branch, version files | Prose in `AGENTS.md`, `--product`, branch inference ×3 |
| `aidd spec new \| check \| approve \| status` | Spec IDs, branch, template, transitions, validation | `prepare.mjs`, `validate.mjs`, hand-edited frontmatter |
| `aidd eval record \| gate` | Evaluation revisions, report stamping, ship eligibility | `finalize.mjs` ×2, `preflight.mjs`, both journal parsers |
| `aidd run build \| unit \| acceptance \| quality` | Executing classified commands, ports, reporters | Per-run classification, `free-port.*` |
| `aidd trace` | Requirement-to-test tag coverage and failure mapping (B) | Manual traceability |
| `aidd debt add \| update \| resolve \| list` | Quality register entries, IDs, priority, state (C) | `debt.contract.md` mechanics, `review.md` reconciliation |
| `aidd release` | Version bump, changelog entry, commit, merge, tag | `git-release.mjs`, most of `release-versioning.md`, changelog template |
| `aidd git integrate` | Task-branch commit, merge, delete | `git-integrate.mjs` |
| `aidd log` | Journal append and rendering | `append.mjs`, P16 `show` |

### Records: one writer each, tracked when they gate anything

| Record | Tracked | Model writes | Core writes |
| --- | --- | --- | --- |
| `.aiddbot/config.json` | yes | values from `outline-system` via `aidd config` | file |
| `.aiddbot/commands.json` | yes | classification, once, via `rule-project` | file; `aidd run` reads it |
| `specs/S{nnnn}-{slug}/spec.md` | yes | body | frontmatter, only through transitions |
| `specs/S{nnnn}-{slug}/evidence.jsonl` | yes | nothing | one line per evaluation: kind, revision, status, commit, time, report |
| `verification.md`, `qualification.md` | yes | findings | stamping and removal on green |
| Quality register (C) | yes | issue text and judgment | IDs, state, priority fields, removal |
| `.aiddbot/journals/*.jsonl` | no | a few judgment events | events from scripts and hooks; rendering |

Consequences:

- **The shipping gate reads only tracked evidence.** `evidence.jsonl` is the single source of revisions and statuses; report frontmatter shrinks to what a human needs, and the spec's status is derived from or written together with the evidence line. `aidd eval gate` works on a fresh clone.
- **The journal becomes narrative only.** Nothing parses it to make a decision, so its format can serve humans. Store JSONL (lossless, no widths, UTC), render the current table with `aidd log show`, and stop registering stages per skill: the event carries the skill name.
- **Most journal lines stop being model work.** Scripts emit their own events (spec created, approved, evaluated, released, integrated); hooks emit session and subagent start/stop into the same stream, replacing or subsuming `temp/audit/`. The model journals only decisions that exist nowhere else: greenfield/brownfield `verdict`, debt `select`, `blocked` with its reason, and escalations from B's triage. Target: from roughly 25 model-issued lines per delivery to under 5.

### Skills after the rebuild

- Each skill states its goal, the judgments it owns, and the `aidd` commands that record them. Formats, IDs, statuses, revisions, and git steps disappear from prose.
- Sub-agent rules move into `.agents/agents/*.md`; orchestrators keep one sentence of delegation policy each.
- Role boundaries are enforced where the harness allows it (tool restrictions and pre-tool hooks generated by `adapt.js`), and stated in the agent prompt where it does not.

## How A, B, and C fit

- **A — Greenfield bootstrap.** The external scaffold CLI takes the materializer and archetype catalogue out of the overlay. What remains in AIDDbot is an Architect-led conversation that produces a system proposal and writes its decisions through `aidd config`. `aidd git integrate` survives the removal of `scaffold-system`, because documentation runs use it too. The CLI could write `.aiddbot/config.json` and `.aiddbot/commands.json` directly, since it knows the archetypes' scripts — a strong reason to design both files before the CLI interface.
- **B — Spec-first.** Removes the PRD, the F and T counters, and the cross-file requirement validation. Requirements live in the spec with local IDs (`S0042-R03`); `aidd spec check` validates them; `aidd trace` turns E2E tags into a coverage matrix, so missing coverage becomes a deterministic red instead of a judgment; `aidd run acceptance` returns failures already mapped to requirement IDs, and the model only decides dispositions in triage. Its escalation becomes a `blocked` journal event plus a spec status the core understands.
- **C — Quality records.** A single register maintained through `aidd debt`, with a fixed priority scale and state lifecycle validated by the core. `review.md` disappears if the register carries each issue's latest evidence; scan dates go to the journal. `ship-spec` and `scan-quality` stop describing reconciliation rules and call the same commands.

Together, A, B, and C delete more records than they add: PRD, F/T counters, `review.md`, `debt.contract.md`'s mechanics, `release-versioning.md`'s generic search, the changelog template, and the scaffold skill.

## Roadmap

One release per phase, following the frontier-fall practice: one working branch per phase, one commit per step, a real delivery run before each release, and skill edits only through `/maintain-skills`. Phases 1–2 change mechanics without changing the workflow; functional changes start at phase 3.

| Phase | Content | Done when | Depends on |
| --- | --- | --- | --- |
| 0 · Decisions | Settle the open questions of A, B, C, and this document into numbered decisions. | Every phase below has its inputs decided. | — |
| 1 · Core | Create `aidd` with config, git, frontmatter, root, and output layers. Move existing scripts behind it without behavior change. Write `config.json` from `init` and `outline-system`. Remove the hidden checkpoint commit or make it explicit. | No duplicated helper remains; every current script is an `aidd` subcommand with JSON output; a delivery still ships. | 0 |
| 2 · Evidence and journal | Add `evidence.jsonl`; `aidd eval` writes it and gates on it. Journal to JSONL with `aidd log show`; scripts and hooks emit their events; cut model journal instructions to judgment events; decide the fate of `temp/audit/`. | Shipping works from a fresh clone; no code parses the journal; model journal calls per delivery are under 5. | 1 |
| 3 · Spec-first (B) | New spec template with local requirement IDs; `aidd spec check`; remove PRD and F/T; `aidd trace`; triage with dispositions and escalation. | A delivery ships without a PRD; each requirement maps to tagged tests; an ambiguous failure stops with a recorded escalation. | 2 |
| 4 · Quality register (C) | Unified register; `aidd debt`; `scan-quality`, `ship-spec`, and `craft-lasting-quality` rewritten on it. | One quality file; resolved items disappear; no reconciliation rules remain in prose. | 1, ideally 3 |
| 5 · Command runner | `commands.json` recorded once; `aidd run` for build, unit, acceptance, and quality; port handling and reporters inside the runner. | No skill asks a model to classify a command; verification and scan outputs are structured. | 1; feeds 3 |
| 6 · Release | `aidd release` bumps declared version files, writes the changelog entry, commits, merges, and tags. | `ship-spec` contains no versioning procedure. | 1 |
| 7 · Greenfield (A) | System proposal flow; external scaffold CLI; remove `scaffold-system`. | A new repository reaches its first spec without AIDDbot's materializer. | 1, 5 |
| 8 · Roles and docs | Agent prompts carry sub-agent rules; harness-enforced role boundaries via `adapt.js`; merge catalog and workflow docs; full real run on each harness available. | Orchestrators are one delegation sentence each; one routing document; the run's journal tells the story without gaps. | all |

Phase 5 can run in parallel with 3 and 4, and B's acceptance mapping becomes much simpler once the runner exists, so an alternative order is 1 → 2 → 5 → 3 → 4 → 6 → 7 → 8.

## Measures of success

- Total words across `SKILL.md` files fall substantially (baseline to be measured at phase 0), with no loss of invariants.
- Zero duplicated helpers and zero journal parsers.
- Every record that gates a decision is tracked in Git and has exactly one writer.
- Model-issued journal lines per delivery: under 5.
- Two deliveries of the same request on different harnesses produce the same record layout, statuses, and revision counts.

## Open questions

- **Q1 · Core location and name.** Should the core live in the overlay (`.agents/aidd/`), run through `npx aiddbot` (the existing CLI package), or both, with the overlay copy used offline? Should skills call it by path or by a script entry in the consumer's root `package.json`?
  > **R:** ✅ → D1 (delegated)
- **Q2 · Evidence file.** A per-spec `evidence.jsonl`, or evaluation entries inside the spec frontmatter? JSONL keeps the spec readable and append-only; frontmatter keeps one file per spec.
  > **R:** ✅ → D2 — per-spec control file, machine-oriented
- **Q3 · Journal format.** JSONL stored and rendered on demand, or keep the text table and simply stop parsing it? Should journals stay untracked once nothing depends on them?
  > **R:** ✅ → D3 — plain text, narrative only, no JSONL
- **Q4 · Hook audit.** Keep `temp/audit/` transcripts, merge hook events into the journal, or remove the hook bundle from consumers? Is the vendored bundle's source maintained elsewhere?
  > **R:** ✅ → D4 — hooks live in another repo; removed from AIDDbot
- **Q5 · Which journal events stay with the model?** Proposed: `verdict`, `select`, `blocked`, and triage escalations. Are `start` and `done` still needed if hooks record session and subagent boundaries?
  > **R:** ✅ → D5
- **Q6 · Command registry owner.** Who records `commands.json`: the external scaffold CLI (A), `rule-project`, or both with the skill confirming? How is a missing classification reported?
  > **R:** ✅ → D6 (delegated)
- **Q7 · Role enforcement.** Is harness-level restriction (tools and pre-tool hooks per role) worth its per-harness adapter cost, or are prompt-level boundaries enough for frontier models?
  > **R:** ✅ → D7 (delegated)
- **Q8 · Spec status.** Keep the five-state chain, or derive the state from evidence plus two explicit markers (approved, shipped)?
  > **R:** ✅ → D8 (delegated)
- **Q9 · Counters.** After B, only S and D IDs remain. Keep `counters.yaml`, or derive the next S from spec folders and branches and keep a counter only for D?
  > **R:** ✅ → D9 — keep the counter
- **Q10 · Phase order.** Core → evidence → B → C → runner, or bring the runner forward before B as sketched above?
  > **R:** ✅ → D10 — runner before B
- **Q11 · Release cadence.** One minor release per phase (0.2 … 0.9), or patch releases inside a longer-lived refactor branch as in frontier-fall?
  > **R:** ✅ → D11 — short deliveries

## Resume point

Execute `deterministic-core/plan.md` phase by phase. A, B, and C open questions are settled at the start of their own phase (D12).

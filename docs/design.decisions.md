# Design decisions

Record of the structural decisions behind the skills pipeline — what changed, why, what
was rejected, and what it costs. Newest first. The [catalog](../.agents/skills/skills.catalog.md)
describes the current state; this file explains how it got that way.

## 2026-08-29 — Consumer install is `npx github:AIDDbot/AIDDbot init`

**Status**: adopted. Narrows "Editor folders are copied from origin" (2026-08-27): the origin still ships the harness adapters; consumers no longer copy them with `tiged`.

### Context

Getting started asked for four `tiged` copies, and the optional harness slices were incomplete. `/adapt` as a consumer step was a chicken-and-egg. A small `bin/aiddbot.js` in this repo copies the overlay (`.agents/{agents,commands,rules,skills}`, `.claude|cursor/{agents,commands,rules}`, `.github/{prompts,agents,instructions}`) into `cwd`. `npx github:` runs that bin without publishing to npm.

### Decision

1. **One command for humans.** `npx github:AIDDbot/AIDDbot init` from the target repo root. `--dry-run` previews; `--force` overwrites differing files; identical files are skipped; other existing files are left alone.
2. **No `tiged` on the AIDD overlay.** README and getting-started drop the four-folder copy. `/scaffoldify` still uses `tiged` for back/front/e2e/domain archetypes, and `init` for the overlay.
3. **Not an npm dependency.** `package.json` is `private`; the script is a one-shot copier, not something the consumer installs.

### Rejected alternatives

- **Keep `tiged` as a documented fallback** — rejected: two doors for the same copy.
- **Ask the consumer to run `/adapt`** — rejected: no slash command until adapters exist.
- **Publish `aiddbot` to npm** — deferred; `npx github:` is enough.

### Consequences

- Getting started is `init`, then `/architect-map`.
- Origin clone still skips the copy step.

## 2026-08-28 — Craftsman splits into three doors

**Status**: adopted. Supersedes "One Craftsman door, two entries" in the 2026-08-01 decision.
`/ship-spec` as the shared machine still holds.

### Context

`/craftsman-refactor` held two jobs: detect architecture drift when given nothing, and apply a
structural directive when given one. CRAP (cyclomatic complexity and coverage) was a third hunt
that did not belong in either path. One command with a silent default made the doors hard to
choose.

### Decision

1. **`/craftsman-refactor` is directive-only.** The human already holds the structural change;
   skip detection and take `/specify` (`kind: refactor`) → check → `/ship-spec`.
2. **`/craftsman-drifter` hunts architecture drift.** Per-container `/extract` looking for
   deviations from current documentation, then the same specify → check → `/ship-spec` machine.
3. **`/craftsman-craptor` hunts CRAP.** Lint for cyclomatic complexity and coverage for missing
   tests, then the same machine.

### Rejected alternatives

- **Keep one door with three silent defaults** — rejected: the human should pick the hunt, not
  wait for the agent to guess which survey to run.
- **Fold CRAP into `/qualify`** — rejected: qualify reports; Craftsman ships the fix.

### Consequences

- Six commands: Architect, Builder, three Craftsman doors, plus `/ship-spec`.
- Catalog, README, getting-started, and workflow name all three Craftsman doors.
- Thin adapters in every harness.

## 2026-08-27 — `/scaffoldify` is a command, wired in every harness

**Status**: adopted. Supersedes the same-day "one file; paste `SKILL.md`" install path.

### Context

`/scaffoldify` was a skill you pasted into a new repo's chat. Paste is not how ABC is invoked:
Cursor, Claude Code, and GitHub Copilot each expose commands from a different folder. A bootstrap
that is not a slash command is invisible next to `/architect-map`. Running it *inside* the origin
would also pollute the skills repo with `back/` and `front/`.

### Decision

1. **Command, not skill.** The body lives at `.agents/commands/scaffoldify.command.md`. There is
   no `SKILL.md`. Catalog Commands lists it; Meta keeps only `/skillify`.
2. **Thin adapters in every harness**, same shape as ABC: `.claude/commands/scaffoldify.md`,
   `.cursor/commands/scaffoldify.md`, `.github/prompts/scaffoldify.prompt.md` — header plus a
   pointer at the origin command.
3. **Origin is the launcher.** If this workspace is the AIDDbot origin, ask for a destination
   path and write the workshop there. Never scaffold `back/`, `front/`, `e2e/`, or `docs/domain/`
   into the origin. The workshop repo is where ABC launches next.

### Rejected alternatives

- **Keep it a skill and paste the file** — rejected: the human already types slash commands;
  bootstrap should be one of them.
- **Scaffold in place inside the origin** — rejected: this repo is the skills origin, not a
  workshop.

### Consequences

- Getting started and README: from this origin, `/scaffoldify`, then open the new repo and
  `/architect-map`.
- A clone of this origin already has `/scaffoldify` in Cursor, Claude Code, and Copilot.

## 2026-08-27 — `/scaffoldify` is one file; it bootstraps a new empty repo

**Status**: superseded the same day by "`/scaffoldify` is a command, wired in every harness".
Narrows "Editor folders are copied from origin" (same day): `--aidd` is gone; AIDD folders are
always pulled. The paste-`SKILL.md` door is gone; the command is the door.

### Context

The skill lived in five files (`SKILL.md`, three `references/`, a report template) and assumed
it ran inside an already-present workshop repo, with `.agents/` optional behind `--aidd`. That
made copy-paste into a greenfield repo a treasure hunt, and left a flag whose only job was
"also install AIDD".

### Decision

1. **One file.** `SKILL.md` is the whole skill. No `references/`, no `assets/`. The copy-paste
   unit is the file: paste it into a new repo's agent chat and run it.
2. **New empty repo.** The skill refuses to run inside the AIDDbot origin (skills present, no
   `back/`). The human opens a new repository; that repo is where ABC launches.
3. **Always pull AIDD.** `.agents/` and the editor folders are part of the scaffold, not a
   flag. `--aidd` is deleted.

### Rejected alternatives

- **Keep the split into `references/`** so the skill stays under the 50-line composition
  pattern — rejected: a workshop bootstrap that cannot be pasted is not a bootstrap.
- **Keep `--aidd`** so a workshop can stay agent-agnostic — rejected: the point of the new
  repo is that ABC launches from there.

### Consequences

- Catalog Meta line names the new-repo bootstrap, not `--aidd`.
- Getting started and README split two human paths: `tiged` into an existing project, or paste
  `SKILL.md` into an empty repo.

## 2026-08-27 — Commands open skills by path, not by slash name

**Status**: adopted.

### Context

Commands said `call the /explore skill`. That is English, not a harness contract: `/explore` is not a slash command (only ABC plus `/ship-spec` have adapters), every skill has `disable-model-invocation: true`, and discovery of `.agents/skills/` differs across Cursor, Claude, and Copilot. A command that names a slug cannot guarantee the agent reads `SKILL.md`.

### Decision

1. **The path is the invoke.** A command follows a markdown link to the file: [`/explore`](../.agents/skills/explore/SKILL.md). The slash name is the label.
2. **Nested commands use the same shape.** Builder and Craftsman link [`/ship-spec`](../.agents/commands/ship-spec.command.md), not “the `/ship-spec` skill”.
3. **Diagrams keep slash labels.** Mermaid nodes stay `/explore`; they are pictures, not invokes.

### Rejected alternatives

- **Bare slash names** — rejected: they depend on harness skill discovery.
- **Absolute paths with no name** — rejected: the label is what a human (and the catalog) already uses; the link carries both.

### Consequences

- Command files under `.agents/commands/` link `../skills/{name}/SKILL.md`.
- Catalog What holds records the rule.

## 2026-08-27 — Editor folders are copied from origin; no wiring skill

**Status**: adopted. Supersedes both same-day entries below (pointer-file skill and wire script).

### Context

ABC commands live under `.agents/commands/`, but Cursor, Claude Code, and GitHub Copilot each look in a different folder. A dedicated skill and a JavaScript script were tried to generate thin pointers. Both added a door the human did not want: a runtime, or a skill whose only job was to write files this origin can already ship.

### Decision

1. **This origin ships the editor folders.** `.claude/`, `.cursor/commands/`, `.github/prompts/`, and `CLAUDE.md` are committed here. Each adapter is a harness header plus a pointer at `.agents/commands/{name}.command.md`. The command body is never copied.
2. **Consumers copy those folders** with `tiged`, same as `.agents/`. A clone of this repo is already wired.
3. **`/scaffoldify --aidd` copies them too**, after it fetches or refreshes `.agents/`.

### Rejected alternatives

- **A skill that writes the pointers** — rejected: the origin already has the folders; copying them is the install.
- **A `node`/`bun` script that writes the pointers** — rejected: AIDDbot is markdown, with no runtime of its own.

### Consequences

- Getting started is `tiged` of `.agents` and the three editor paths, then `/architect-map`.
- Catalog Meta has `/scaffoldify` only, beside `/skillify`.

## 2026-08-27 — Wire script first; `/scaffoldify --aidd` calls `/harnessify`

**Status**: superseded the same day by "Editor folders are copied from origin; no wiring skill".

### Context

ABC should work in any atmosphere the moment `.agents/` is in the repo. Asking the agent to run
`/harnessify` was a chicken-and-egg: the skill is not yet a slash command, `AGENTS.md` does not
exist until `/explore`, and picking one harness left the other two dark. `/scaffoldify` already
knew how to fetch `.agents/` with `--aidd`. A `node` script was tried as the comfortable door
and rejected: AIDDbot is markdown, with no runtime of its own.

### Decision

1. **This origin ships the adapter folders.** `.claude/`, `.cursor/commands/`, `.github/prompts/`,
   and `CLAUDE.md` are committed here so a clone of AIDDbot is already wired.
2. **A consumer copies those folders.** `tiged` of `.agents` plus the three harness paths, or
   `/harnessify` writing the same pointers. No script.
3. **`/scaffoldify --aidd` refreshes then wires.** Fetch or refresh `.agents/` from
   `AIDDbot/AIDDbot/.agents`, then run `/harnessify` with no nested commit. Without `--aidd`,
   the workshop skeleton is agent-agnostic.

### Rejected alternatives

- **A `node`/`bun` wire script** — rejected: a second runtime next to tiged, and a file an
  agent should not need in order to write a dozen markdown pointers.
- **Infer the current harness** — rejected: the first run should work for any editor the human
  opens next, not only the one that ran the skill.
- **Fold wiring into `/explore`** — rejected: slash commands should exist before mapping, and
  explore is about the product.

### Consequences

- A clone of this origin is already wired. Getting started for another repo is tiged of
  `.agents` and the harness folders, then `/architect-map`.
- Catalog Meta gains `/scaffoldify`.
- `/harnessify` stays as the named door when a command is added or when `.agents/` was copied
  without the harness folders.

## 2026-08-27 — `/harnessify`: pointer files, not copies or symlinks

**Status**: superseded the same day by "Editor folders are copied from origin; no wiring skill".

### Context

AIDDbot ships one origin — `.agents/commands/{name}.command.md` and root `AGENTS.md` — but Cursor,
Claude Code, and GitHub Copilot each look in a different folder, under a different name
(commands, prompts, `CLAUDE.md`). Copying the body into each harness folder would drift the
moment a command changed. Symlinks fail on Windows checkouts without Developer Mode.

### Decision

1. **Origin never moves.** Commands stay under `.agents/commands/`; agent rules stay in
   `AGENTS.md`. `/explore` always writes `AGENTS.md`, never a harness-native rules file.
2. **`/harnessify` writes thin adapters.** Each command adapter keeps only the harness header
   (`description`, and Copilot's `name` + `agent: agent`) and a pointer at the origin command.
   Claude's rules adapter is `CLAUDE.md` containing `@AGENTS.md` — the native import that loads
   at session start. Cursor and Copilot already load `AGENTS.md` and `.agents/skills/`, so they
   get no rules or skill adapters.
3. **Infer or ask.** Superseded the same day: the wire script always writes all three harnesses.
   It overwrites adapters that are already pointers and leaves original harness files alone.

### Rejected alternatives

- **Symlink `CLAUDE.md` → `AGENTS.md`** — rejected: Windows needs Administrator or Developer
  Mode, and the import leaves room for Claude-only lines under `@AGENTS.md`.
- **Copy command bodies into `.cursor/commands/`, `.claude/commands/`, `.github/prompts/`** —
  rejected: three copies of every command, guaranteed to drift.
- **Skill adapters in `.cursor/skills/` / `.claude/skills/` / `.github/skills/`** — rejected:
  Cursor and Copilot already load `.agents/skills/`; Claude reaches them through the command
  files and `AGENTS.md`.

### Consequences

- Catalog Meta gains `/harnessify`. Getting started originally ran `/harnessify` in chat before
  `/architect-map`; that step moved to the wire script the same day.
- `{Agents_File}` in the agent-rules template is always `AGENTS.md`; `{Agents_Folder}` is always
  `.agents/`.

## 2026-08-01 — Craftsman absorbs directed refactor; machine is `/ship-spec`

**Status**: partially superseded by the 2026-08-28 three-door split. `/ship-spec` as the shared
machine and the deletion of `/spec-refactor` still hold; "one Craftsman door, two entries" does
not. Supersedes the "internal commands stay" clause of the ABC-doors decision below
(`/build-spec`, `/spec-refactor`).

### Context

After the ABC rename, `/spec-refactor` still looked like a peer door to Builder, though it was
only Craftsman's per-defect step — or a developer shortcut when the structural directive was
already clear. Forcing every directed refactor through a full drift survey was too expensive;
folding directed refactor into Builder would blur ABC (Builder ships product change; Craftsman
changes shape).

### Decision

1. **One Craftsman door, two entries.** `/craftsman-refactor` with no directive runs explore →
   extract → drift report → `/specify` (`kind: refactor`) → human check →
   `/ship-spec`. With a directive already held, skip detection and take specify → check →
   `/ship-spec`.
2. **Delete `/spec-refactor`.** Its body lives inside Craftsman; no separate command.
3. **Rename `/build-spec` → `/ship-spec`.** Shared machine under Builder and Craftsman; ships an
   already-validated spec. Kind-agnostic.

### Rejected alternatives

- **Directed refactor through Builder with `kind: refactor`** — rejected: collapses the ABC
  roles and reintroduces a classification step the human already answered by choosing a door.
- **Detection-only Craftsman** — rejected: a known structural directive should not require a full
  remapping of the repo.

### Consequences

- Four commands: three ABC doors plus `/ship-spec`.
- Catalog, README, getting-started, and workflow describe Craftsman's dual entry.

## 2026-08-01 — ABC doors: `/architect-map`, `/builder-ship`, `/craftsman-refactor`

**Status**: adopted. Point 2 (internal `/build-spec` and `/spec-refactor`) superseded by the
decision above.

### Context

The three human doors were named for the skills they chained (`explore-and-extract`,
`spec-feature`, `explore-and-refactor`). That collided with skill names (`/explore`, `/release`)
and hid the memorable Architect / Builder / Craftsman lifecycle behind procedural labels.

### Decision

1. **Hybrid ABC names for the three doors.** `/architect-map` (document the system),
   `/builder-ship` (spec → release), `/craftsman-refactor` (drift report → structural fixes).
   The role brands the door; the verb names what the door does — not an internal skill.
2. **Internal commands stay.** `/build-spec` and `/spec-refactor` remain the shared machine and
   the per-defect step; skills keep their existing names.

### Rejected alternatives

- **Role-only (`/architect`, `/builder`, `/craftsman`)** — rejected: less discoverable for what
  each door actually runs.
- **Skill-echo verbs (`/architect-explore`, `/builder-release`)** — rejected: collide with
  `/explore` and `/release` and undersell the full door (extract; full ship pipeline).

### Consequences

- Command files, catalog, README, getting-started, and workflow use the new names.
- Historical entries in this file keep the old names as they described past state.

## 2026-07-29 — `/specify` owns both kinds; `F` / `R` series

**Status**: adopted. Supersedes the 2026-07-28 rejection of "make `/refactor` a mode of
`/specify`", and retires `/restructure`.

### Context

`/restructure` existed only to avoid Fowler's meaning of "refactor" on a skill that writes a
spec, not code. That left two skills producing the same artifact shape (`spec.md` with `kind:`),
two templates parked in sibling folders, and a naming problem that renaming alone never solved.
The commands already knew the door — `spec-feature` vs `spec-refactor` — so the agent never had
to classify. Functional ids were bare `001`… while refactor ids carried an `R` prefix.

### Decision

1. **One skill, two personalities.** `/specify` takes an explicit `kind: functional | refactor`
   from the caller. Functional → Business Analyst; refactor → Architect. Kind-specific rules live
   in `specify/references/{functional|refactor}.md`; each kind keeps its own template under
   `specify/assets/`.
2. **Commands stay the two doors.** `spec-feature` calls `/specify` with `kind: functional`;
   `spec-refactor` calls it with `kind: refactor`. No merged `spec-new`.
3. **Homogeneous id series.** Functional draws `F001`, `F002`…; refactor draws `R001`, `R002`….
   `{spec_key}` = `{spec_id}-{slug}` for both; AC ids stay `AC-{spec_id}.{n}`.
4. **Delete `/restructure`.** The folder goes; routing, docs, and cross-skill mentions point at
   `/specify` with the kind named.

### Rejected alternatives

- **Invented names (`restructify`, `reshape`, `refactorify`)** — rejected: the pain was two
  producers of one artifact, not the English of the second name. Unifying under `/specify` removes
  the second name.
- **Fold the commands into one `spec-new`** — still rejected: the human already knows which door
  they walked through; collapsing them reintroduces a classification step.

### Consequences

- Nine pipeline-facing skills instead of ten (plus `/skillify` still meta).
- Commit scope for both kinds is `docs(specify): …`.
- Historical ADR entries below still say `/restructure` where that was true at the time.

## 2026-07-29 — English-only skills and commands

**Status**: adopted. Supersedes the Spanish twin requirement from 2026-07-28.

### Context

Every skill and command had shipped as an English/Spanish pair — `SKILL.md` + `LEEME.md`, or
`{name}.command.md` + `{name}.LEEME.md`. That doubled the align-docs surface on every edit and
kept a Spanish lifecycle map (`docs/flujo-de-artefactos.md`) in sync with the English workflow
docs. The audience is bilingual, but the canonical instructions live in one language now.

### Decision

1. **One file per skill** — `SKILL.md` in English only.
2. **One file per command** — `{name}.command.md` only.
3. **Drop the Spanish artifacts** — all `LEEME.md`, `*.LEEME.md`, and `leeme.template.md`; delete
   `docs/flujo-de-artefactos.md`.
4. **Align-docs shrinks** — sync the changed skill or command, the catalog when routing changed,
   and human-facing docs only when what a human is told changes.

### Consequences

- All LEEME twins under `.agents/` and `docs/flujo-de-artefactos.md` are gone.
- Historical ADR entries below still mention the twin model where it was true at the time.

## 2026-07-28 — Shorter skills for Claude 5 generation models

**Status**: adopted, experimental — branch `short-skills-post5-models`.

### Context

Following [the new rules of context engineering for Claude 5 generation
models](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models),
an audit of the ten skills found most of their bulk was ceremony rather than knowledge.

`Research` / `Plan` / `Implement` narrated the agent's own default loop — `/codify`'s `Plan`
section amounted to "if you were given no plan, make one." `Verification` restated `Rules` in
checkbox form: eight of `/restructure`'s ten items and five of `/specify`'s six were one-to-one
with a rule directly above them. Rules like "think before you code (KISS)", "surgical changes
(YAGNI)", and "keep going until finished" describe what a capable model does unprompted. And the
prose paraphrased its own templates — `/specify`'s `Plan` listed the section headings of
`spec.template.md`, which already carries them.

Meanwhile the pipeline was stated in five places at once — each `SKILL.md`, the catalog, the
lifecycle map, `AGENTS.template.md`, and `AIDD.workflow.md` — which is why the align-docs rule had
grown to six destinations per edit, doubled by the Spanish twin.

### Decision

1. **Three sections, not six.** Intro, `Rules`, `Context`, `Method`. `Research`/`Plan`/`Implement`
   collapse into one prose `Method`; `Verification` is gone, since an invariant belongs in `Rules`
   and stating it twice is not a second check.
2. **Rules earn their place.** The test is whether a capable agent would get it wrong on its own.
   Project decisions, counterintuitive boundaries, and orders that matter stay — report-only
   separation, id permanence, the `R` series, never running the e2e suite in `/codify`. Restated
   defaults go.
3. **The template is the artifact's spec.** A skill says when and why to write something; the
   template in `assets/` says what shape it takes, and the prose never paraphrases it.
4. **One owner for the pipeline.** `skills.lifecycle.md` is merged into `skills.catalog.md`, which
   now owns routing, status chain, maintenance routes, and the release table. Skills set the
   statuses they own and stop narrating handoffs — the commands already orchestrate.
5. **A 50-line budget** per `SKILL.md`, measured in the template rather than as a sentence count.

### Rejected alternatives

- **Keep `Verification` trimmed to two or three non-obvious items** — rejected: a section that
  exists only sometimes invites restating rules to fill it. If a check is worth making it is worth
  being a rule.
- **Drop the Spanish twin to halve the maintenance cost** — rejected: the audience is the reason
  the project exists. Shortening the skills cuts that cost by the same proportion anyway.
- **Generate `LEEME.md` from `SKILL.md` as a build step** — deferred, not rejected; it removes
  drift but adds a toolchain to a repo that deliberately has none.

### Cost

Skill prose drops from 1512 lines to 932 (−38%), and `SKILL.md` averages 46 lines instead of 74.
The risk is real and untested: some of what was cut was defensive, and a model that needed the
guardrail will now be trusted without it. `/qualify` and `/restructure` were pruned most
conservatively, since their rules encode genuine separation-of-powers decisions. The proof is
running the pipeline on a real repository and comparing behavior against `main`.

## 2026-07-28 — Skills are prose, not pseudocode

**Status**: adopted.

### Context

A skill lived in three files: a formal `SKILL.md` written in a house grammar of marked-up verbs
(`_read_`, `_if_`, `_for-each_`, `_handoff_`), an English `README.md` restating it in prose, and a
Spanish `LEEME.md` translating that. The grammar was an attempt to make instructions parseable;
the two prose files existed because the grammar was not readable. Three files drifted apart
predictably — most `SKILL.md` still described a report/`{Work}`/`refactors/` model the prose had
abandoned days earlier.

The grammar also worked against the tool. An agent reads instructions; it does not parse a DSL.
Marking verbs bought no determinism and cost readability, which is the one thing that actually
steers a model.

### Decision

1. **Two files, one skill.** `SKILL.md` in English and `LEEME.md` in Spanish, same skeleton, same
   content, differing in language only. `README.md` is gone, and so is `references/grammar.md`.
2. **Prose is the form.** Intro, `Rules`, `Context`, `Research`, `Plan`, `Implement`,
   `Verification`. Framing sections are lists with bold hooks; the three steps are prose in the
   imperative, addressed at the agent. Both templates live in `skillify/assets/`.
3. **`kind: refactor`, `R` series.** The non-functional spec had three competing identities
   across the repo (`refactor`/`non-functional`, `R`/`N`, `refactor/`/`restructure/`). One
   vocabulary wins: `kind: refactor`, ids `R001`, branch `refactor/{spec_key}`, commit scope
   `docs(refactor)`, and the term **refactor spec** everywhere. The term is deliberately
   anchored to the artifact rather than to `/restructure`, whose name may still change.
4. **`/planify` runs one container per run**, like `/extract` and `/codify`. The spec's solution
   overview lists the affected containers, so a command can iterate them; `status: planned` is set
   once none is left unplanned. Sibling plans are read at the start of each run so a shared
   contract stays worded identically at both ends.
5. **Four commands, two doors.** `spec-feature` and `spec-refactor` capture a change through its
   door and pause for a human check; `build-spec` then takes that spec from plan to release.
   Commands are `{name}.command.md` plus `{name}.LEEME.md`.

### Rejected alternatives

- **Keep the formal `SKILL.md` and regenerate it from the prose** — rejected: it preserves the
  drift problem and the grammar's cost without its supposed benefit.
- **`kind: non-functional` with an `N` series** — it reads more precisely, but "refactor" is the
  word already used in branches, commit types, and conversation; one word beats a better word
  used inconsistently.
- **Fold `spec-feature` and `spec-refactor` into one `spec-new`** — rejected: the two doors ask
  different questions, and collapsing them puts a classification step where the human already
  knows the answer.

### Consequences

- Every `SKILL.md` was rewritten from its `LEEME.md`, not translated: the Spanish prose is the
  source of record for what a skill does.
- Fixed along the way: `/verify` committed `docs(e2e)` and `/specify` committed bare `docs`, now
  both `docs({skill})`; `{Work}` is gone; the `qualify` report listed Lint and Types as gates when
  the gate list explicitly excludes tooling, and omitted `ui` and `project-rules`; the
  `/restructure` verification checked for the absence of an e2e Solution section, contradicting
  the decision below; and the workflow docs still described `/restructure` as a periodic audit of
  one container.
- Still parked: the `-ify` rename for `explore`, `extract`, `release`, and `verify`; and the two
  copies of `spec.template.md` under `specify` and `restructure`.

## 2026-07-28 — An e2e plan follows the container, not the spec's kind

**Status**: adopted.

### Context

Two rules contradicted each other. `/planify` and the catalog said a non-functional spec gets no
e2e plan at all, since the existing suite is its non-regression test. The restructure template
said the spec has an `e2e` Solution section, because a structural change may rewrite the adapter
the tests speak through — routes, selectors, helpers — and may need a characterization test as a
net. The first rule is a leftover from when a refactor had no spec, and it survived because the
older, narrower invariant ("never touch a green test") made e2e work unthinkable for a refactor.

The decisive argument is not symmetry, it is safety. **`/codify` only works from a plan.** With no
e2e plan, a restructure that renames routes ends one of two ways: the suite is never updated and
`/verify` goes red for a change that was supposed to preserve behavior, or someone edits the suite
with no plan behind it. Unplanned edits to the safety net are exactly how an assertion gets
quietly loosened, and `/codify`'s "never weaken a test" rule depends on those edits being planned
and readable.

### Decision

1. **Drop the `kind` fork.** `/planify` writes one plan per affected container, `e2e` included
   when it is affected. The fork disappears rather than moving: a functional spec always affects
   e2e (every criterion needs a scenario), and a non-functional one affects it only when the
   decision reaches the test surface. The old rule falls out as a consequence instead of being
   stated as a special case.
2. **What differs is the plan's content, not its existence.** A functional e2e plan maps one
   scenario per AC id. A non-functional one skips the mapping — there is nothing to map, since
   `AC-N.1` is the whole suite — and instead lists the adapter changes, asserting that every
   existing scenario keeps its verdict.
3. **A missing net is its own spec.** If a decision needs coverage that does not exist, that
   characterization test is a separate non-functional spec with `e2e` as its only affected
   container, closed before the restructure starts. This removes the ordering problem — a net
   must be green *before* the change, while the adapter update comes *after*, which would
   otherwise force two `/codify` passes over e2e in one cycle.
4. **A criterion names who judges it**, not just which gate: `/verify` when the suite proves it,
   otherwise one of `/qualify`'s six. A coverage spec's criterion is judged by `/verify`, so the
   gate enum had to admit it.

### Rejected alternatives

- **Let `/codify` touch e2e without a plan when the spec is non-functional** — rejected: it is
  the failure mode the whole decision exists to prevent.
- **Keep "no e2e plan" and forbid restructures that reach the test surface** — rejected: it rules
  out homogenizing routes or unifying selectors, which is most of the real structural work, and
  it was precisely the over-narrow invariant replaced earlier today.
- **Order characterization and adapter work inside one e2e plan** — rejected: it needs two
  `/codify` runs over one container in one cycle, breaking the one-run-one-container rule to
  solve a problem a separate spec solves for free.

### Consequences

- `e2e.plan.template.md` carries both shapes, selected by `spec-kind` in its frontmatter.
- `build-spec` now runs `/codify` for `e2e.plan.md` whenever the file exists, after the software
  containers, instead of testing the spec's `kind`.
- A functional spec still gets no `e2e` section in its solution overview; a non-functional one
  does. That asymmetry is now load-bearing rather than accidental: for a functional spec the e2e
  work is derived from the criteria, and for a non-functional one it must be stated, because
  nothing else implies it.

## 2026-07-28 — `/review` → `/qualify`, `/refactor` → `/restructure`

**Status**: adopted. Entries dated before today keep the old names on purpose — this file records
how things got here, and rewriting history would falsify it. Mapping: `/review` = `/qualify`,
`/refactor` = `/restructure`.

### Context

Two independent pressures met. The one parked on 2026-07-07: `/review` and `/verify` collide with
Claude Code harness preset skills, and a rename to a consistent `-ify` family was proposed
(`clarify`, `archify`, `qualify`, `ratify`) but never applied. The one from today's boundary
shift: "refactor" has a settled industry meaning — Fowler's behavior-preserving, typically small
and mechanical transformation — and that meaning now describes what `/review` does. The name
pointed at the wrong skill, so a model reading `/refactor` would assume "clean this up", which is
the one thing the skill must refuse.

### Decision

Rename the two skills this session touched, leaving the rest of the family parked.

1. **`/review` → `/qualify`.** The second rationale turned out stronger than the collision: the
   skill issues pass/fail verdicts against a closed gate list and is the acceptance oracle for
   non-functional specs. It grades; "qualify" is the verb. Role renamed Standards Reviewer →
   Standards Assessor.
2. **`/refactor` → `/restructure`.** Says what it is without inheriting Fowler's scope. `unify`
   was the family-consistent candidate and paired neatly with `specify`, but it only fits
   convergent changes — splitting a module or moving a boundary is equally structural and reads
   wrong under it. Precision beat symmetry.
3. **Artifacts follow the skill**: `review.report.md` → `qualify.report.md`,
   `review.gates.md` → `qualify.gates.md`, branch prefix `refactor/{spec_key}` →
   `restructure/{spec_key}`, commit scopes `docs(review|refactor)` → `docs(qualify|restructure)`.
4. **`review` is deliberately freed**, not retired. It is now available for a possible future
   *human-level* step — a person judging a change, as opposed to a machine grading it against
   written gates. That is a better split axis than the per-lens one considered earlier, and the
   two are orthogonal: `/qualify` may still split per lens later.

### Rejected alternatives

- **`unify`** — see above; ~80% fit, and the missing 20% are exactly the hardest cases.
- **`rectify`** — connotes fixing defects, the audit drift just removed, and it is a third
  `-ctify` beside `verify` and `ratify`.
- **`simplify`** — a harness skill of that name already exists; the collision the family was
  meant to end.
- **`modify`** — a retired AIDDbot skill name; recycling it confuses the record.
- **Waking the whole `-ify` family now** — deferred: `verify` still has no answer, and a rename
  of the two skills whose semantics changed today is separable from a cosmetic sweep.

### Consequences

- Reintroducing a `/review` skill later would recreate the preset collision this rename escaped.
  The future human-judgment step likely belongs as a release-flow step or a command instead.
- Sweeping the rename exposed pre-existing debt that a blind rename would have disguised as
  fresh: `/planify` still defined `{Refactors}` and took a `refactor.report.md` as input, and
  `/codify` still described applying that report's findings. Both artifacts died on 2026-07-27.
  Repaired rather than renamed — `{Work}` is now always `{Specs}`, and `/planify`'s
  spec-vs-refactor forks collapsed to a `kind` test.
- The contradiction this rename exposed — no e2e plan for a non-functional spec, versus a
  restructure template with an `e2e` Solution section — was resolved the same day; see the entry
  below.
- The `-ify` family stays parked for `explore`, `extract`, `release`, and `verify`.

## 2026-07-28 — `/review` guards the diff, `/refactor` owns the decision

**Status**: adopted.

### Context

The previous entry made `/refactor` write a spec instead of a report, but left its *method*
untouched: an auditor sweeping one container file by file through lenses. That method is
`/review`'s verb. Both skills walked a file set and graded it against catalogs and
`{container}.rules.md`; they differed only in what triggered them. Two skills with the same
internal verb always collapse into one — and the name gave it away, since the skill was doing
`audit`, not `refactor`.

Meanwhile the thing the pipeline actually lacked had no door: a large structural change that no
diff reveals — homogenizing the routes a service exposes, extracting a repeated validation into a
shared utility, unifying five drawings of one concept into a component. Those are not discovered
by sweeping; they are *decided*. And the old guardrail forbade exactly them: "if a fix would
change what a green e2e test asserts, it is not a refactor" rules out any change that touches
routes or selectors, which is most real structural work.

### Decision

Move the boundary rather than merge the skills. The split is no longer mechanical-vs-judgment or
per-spec-vs-periodic, but **what the evidence is**:

1. **`/review` = detectable from the diff.** Including duplication *against untouched code* — a
   new helper that reimplements an existing one is a finding even though the diff reads clean.
   The clarity and UI lenses move in as its catalogs.
2. **`/refactor` = only visible in the accumulated whole.** Which means no diff contains it, which
   means no sweep finds it: it takes a human directive. Without one, `/refactor` proposes
   candidates and asks; it writes nothing.
3. **The unit of a refactor is the decision, not the container.** One decision may cross several
   containers and crosses them together. The lock became scope overlap instead of same-container.
4. **The e2e invariant is restated on the right object**: the suite may change *shape*, never
   *verdict*. A refactor may rewrite how a test reaches its result — routes, selectors, helpers —
   but no live functional criterion may stop holding. New e2e tests are admitted only as
   **characterization**: asserting behavior that already exists and nothing covered, written
   before the change as its net.
5. **Tooling stops being a gate.** Lint, types, and build belong to `/codify` or a hook. For
   `/review` they are an entry precondition: if any is red, hand the scope back without opening a
   gate. Its value is where a tool cannot reach.
6. **`/review` got harder to pass**: one violation fails a gate (no partial pass), silence is not
   a pass (a gate passes only against stated evidence), every finding carries a severity, and a
   `blocker` or `major` sinks its gate.
7. **The gate list is closed** — `accessibility`, `security`, `performance`, `clean-code`, `ui`,
   `project-rules`. A non-functional spec's criteria draw from it, which gives `/refactor` a
   sharpening test: a criterion that fits no gate is not ready.

A refactor spec therefore has **two oracles**, correcting the previous entry: `AC-N.1` is suite
non-regression, judged by `/verify`; the rest are structural and judged by `/review`'s gates. It
travels the full pipeline like any spec, rather than skipping verify.

### Rejected alternatives

- **Fold `/refactor` into `/review` (or a later `/audit`)** — rejected: it would have deleted the
  door for human-directed structural change, which is the expensive work the pipeline could not
  express at all. The collision was in the method, not the purpose.
- **Make `/refactor` a mode of `/specify`** — rejected: the artifact is already shared through
  `kind:`, so a mode would buy nothing while merging two different roles (Business Analyst vs.
  Architect), two different inputs, and two id series into one skill.
- **Keep the automatic audit as a third trigger** — rejected: it reintroduces the sweep, and the
  evidence it produces now emerges from accumulated `/review` reports, where the human sees it.
- **Keep triage as a separate brain** — rejected: with routing collapsed to one lane (`/codify`)
  and the category set by the directive, nothing was left but the severity ladder.

### Consequences

- `refactor/references/` no longer exists. `refactor.patterns.md` moved to
  `review/references/clarity.patterns.md`, `ui.patterns.md` moved alongside it, and `triage.md`
  was deleted — its severity ladder now lives in `review.gates.md`, its e2e question is
  `/review`'s behavior guardrail, and its `category` selection is the architect's call.
- `review.gates.md` lost its *Tooling gates* section, gained a *UI and design system* gate and a
  *Severity* section, and states the closed gate list.
- `/refactor` keeps exactly one reference, its own spec template. The closed gate list lives in
  that template's `gate:` field, next to the field it constrains — it is part of the artifact
  contract (`/refactor` writes it, `/planify` reads it, `/review` judges it), not `/review`'s
  private catalog, which keeps only the definition of what each gate checks. A cross-skill link
  to `review.gates.md` was tried first and reverted: it would have been the harness's first, and
  it breaks the self-contained-folder property from 2026-07-03 to solve a problem the template
  already solved.
- `/refactor`'s `SKILL.md` and `README.md` were regenerated from its LEEME, so the folder has no
  broken links. The other nine skills' English files still lag the 2026-07-27 prose; the full
  regeneration pass is still pending.
- Open: `/specify` and `/refactor` still ship separate `spec.template.md` copies. With one
  artifact and one `kind:` field, two templates are drift waiting to happen.

### Accepted trade-offs

- **Discovery got slower.** Nothing sweeps for accumulated decay any more; it surfaces only as
  `/review` notes candidates over time and a human reads them. That is the intended cost — an
  autonomous sweep produced findings nobody had decided to act on.
- **`/review` carries more weight**, and will eventually split. The line is now per lens (code /
  UI and accessibility / security), not per determinism — the deterministic half left the skill
  entirely and belongs to a hook.

## 2026-07-27 — One spec, two doors: `/refactor` writes a non-functional spec

**Status**: adopted (prose layer only — `SKILL.md` and `README.md` still describe the old
model until the English pass regenerates them from the LEEMEs).

### Context

`/specify` and `/refactor` are the pipeline's only two producers of demand; everything else
consumes. They differed on just two axes that matter — where the demand comes from (a human's
requirement vs. the code's own decay) and what proves it done (new acceptance criteria vs. the
existing green suite) — yet they had drifted apart on eight more that did not: identity
(permanent `{spec_id}` vs. an ephemeral `{slug}`), atomic unit (`AC` ids that survive vs. `F1..Fn`
renumbered every run), index, branch ownership, status vocabulary, amendability, commit scope, and
storage root. `/planify` paid for all of it, forking on `{Work}` at every step.

Three concrete defects came from that drift: `status` meant `pending|planned|…` in a spec but
`green|red` in a refactor report, and `/planify` overwrote one with the other; a re-audit renumbered
from `F1` with no memory of what had already been reported or declined; and the audit had no way
to be verified at all, since the e2e suite cannot judge "this duplication is gone".

### Decision

The artifact is always a **spec**. `/specify` captures a functional one from the business;
`/refactor` distils a non-functional one from the code. The word "spec" stays — it is the brand
and the discipline.

1. **`kind: functional | non-functional`** in the frontmatter is the only fork. It decides whether
   `/planify` writes an e2e plan and which skill is the acceptance oracle. Both live in
   `specs/`; `refactors/` is gone, and with it `{Work}`.
2. **Non-functional is standard vocabulary**, not an invention (ISO 25010). `/refactor`'s lenses
   become the `category`: maintainability, usability, accessibility, performance, security.
3. **Findings become criteria.** No more `F1..Fn`. Each decay is written as a criterion naming the
   gate that judges it, which is what gives the audit an oracle at all.
4. **A non-functional spec is never amended.** A functional spec *describes the system*: it lives
   as long as the feature, so it is amendable and its ACs must be permanent — each one travels into
   an e2e test title. A non-functional spec *records a debt payment*: once released the code has
   changed and there is nothing left to describe, so a later audit of the same container is a new
   spec, not an amendment. What replaces amendability is one guard: **only one open non-functional
   spec per container**, so two branches and two plans cannot collide. The accepted cost is that
   debt reported and declined will be raised again by the next audit; a memory that hides
   still-present decay is worse than a second refusal.
5. **One key shape, two id series.** `{spec_key}` = `{spec_id}-{slug}` for both kinds, so there is
   one naming rule to explain, one `# {spec_id} — {title}` heading, and one criterion format
   `AC-{spec_id}.{n}`. What differs is the series the id is drawn from: functional specs number
   `001`, `002`…, non-functional ones `N001`, `N002`… — separate, so paying debt never advances the
   feature counter and the two are distinguishable at a glance in the same directory. A
   non-functional slug is the audited container.
6. **Two oracles.** `/verify` judges a functional spec's criteria with the e2e suite; `/review`
   judges a non-functional spec's criteria with the gate each names. On a non-functional spec
   `/verify` marks only the non-regression criterion. `/release` still requires `verified` plus
   every active criterion `[x]`, so neither oracle can close a spec alone.
7. **The PRD stays functional-only** — its audience is the business. Non-functional specs are
   found by reading frontmatter, not through a sibling index: an index earns its place when a
   human consumes it, and a second one is a synchronization bug for the price of a glob.
8. **Scope is one container**, down from the whole app. It is the unit `/planify`, `/codify`, and
   `{container}.rules.md` already work in, and it keeps a spec to one page. Auditing the whole app
   is several passes, several specs.
9. **Commands collapse 3 → 2.** With refactor producing a spec, `refactor-and-verify` *was*
   `build-feature` with a different first step. Both become `build-spec`, one cycle with two entry
   doors. "Feature" no longer described what it built.

### Consequences

- `/planify` has a single input again: no `{Work}`, no `{slug}`/`{spec_key}` derivation, no
  refactor-specific rule. The `status` collision disappears — a green audit simply writes no spec.
- `/refactor` now owns its branch (`refactor/{spec_key}`), like `/specify` owns `feat/{spec_key}`.
  Both skills are self-sufficient outside their orchestrator, which keeps the external-orchestrator
  option open.
- `/refactor` must write criteria a gate can check. "The code is cleaner" no longer passes. This is
  the cost of having an oracle, and it disciplines the audit.
- Each skill keeps its own copy of the spec template (`specify/assets/` and `refactor/assets/`),
  per the 2026-07-03 decision that skill folders are self-contained and copyable. A cross-skill
  reference was considered and rejected on those grounds.

### Rejected

- **Two symmetric sibling artifacts** (align every axis, keep `refactors/`) — leaves `/planify`
  with two paths forever, for no gain once the artifacts are identical anyway.
- **A single id sequence shared by both kinds** — rejected: paying debt would advance the feature
  counter, and the PRD's numbering would show gaps it cannot explain. Two series in one key shape
  gives the uniformity without the coupling (decision 5).
- **A date-based non-functional key** (`{YYYYMMDD}-{container}`) — self-dating and free of
  bookkeeping, but it does not rhyme with a functional key, collides on two audits of one container
  in a day, and duplicates what `created:` already records.
- **Amendable non-functional specs** with `Deprecated criteria` as a memory of declined debt —
  see decision 4.
- **A sibling debt index** (`DEBT.md`) mirroring the PRD — see decision 7.
- **Per-finding routing** (`mechanical` → `/codify`, `structural` → `/planify`) — the whole point
  is that the audit produces one demand that travels one path. `kind` survives only in the review
  report, where it still routes a finding's handoff.

## 2026-07-23 — Canonical reports, unified routing, and spec-less storage

**Status**: adopted.

### Context

The three report artifacts had drifted apart. `e2e.report.md` (`/verify`),
`review.report.md` (`/review`), and `refactor.report.md` (`/refactor`) each used their own
frontmatter keys, section names, and entry names (`Defect` vs `Finding`) — and, worst, two
different `kind` vocabularies: `code bug` / `test bug` for verify versus
`mechanical` / `functional` / `behavioral` for review and refactor. Redundant fields had
accumulated too: `suite` in the review report (which runs no suite) and `Preserves behavior`
in the refactor report (derivable from `kind`). Two further gaps surfaced: refactor's
three-door triage made every report's `target` a variable list, and the plans a refactor
produces had no home — `/planify` wrote them to `specs/{spec_key}/`, but a refactor has no spec.

### Decision

1. **One report skeleton.** Frontmatter `source · target · scope · run · status`; title
   `# {report} report — {scope}`; `## Summary` (roll-up by severity); an evaluated-units
   section in a fixed slot (`Criteria` for verify, `Gates` for review, `Lenses` for refactor);
   then `## Findings`.
2. **One entry schema.** `Source · Where · Problem · Fix · Severity · Kind · Handoff`, prefixed
   `F`, ordered by severity. Verify gains the `Fix` field it lacked.
3. **One `kind` vocabulary.** `functional | test | mechanical | structural | behavioral`, each
   report drawing its subset. `code bug` → `functional`, `test bug` → `test`.
4. **Dropped redundant fields.** `suite` (review), `Preserves behavior` (refactor), and
   `id` / `slug` (e2e, folded into `scope`).
5. **`source` / `target` / `status`.** `source` is the producing skill; `status` is `green | red`;
   `target` is the single next skill — verify `→ /review | /codify`, review `→ /release | /codify`
   (by status), refactor `→ /planify`. Per-finding `Handoff` still carries the exact routing.
6. **Refactor unifies to `/planify`.** Every refactor finding preserves behavior and routes to
   `/planify` regardless of `kind` (which becomes informational) — the one exception to the
   general kind→door mapping. A change that would alter what a green e2e test asserts is *not* a
   refactor: it is surfaced as a `/specify` feature, never written as a finding. So refactor drops
   the `behavioral` kind, and verify drops `structural` (it detects `functional` / `test` only).
7. **Spec-less work lives under `refactors/{slug}/`.** It mirrors `specs/{spec_key}/`, holding the
   report and the plans. `/planify` uses `{Work}` = `specs/{spec_key}` or `refactors/{slug}`.

### Consequences

- Propagated across the active surface: the three templates; `verify`, `refactor`, `planify`, and
  `codify` SKILL + LEEME; the workflow doc; the catalog; and the lifecycle map. The English
  `README.md` files still carry the old wording — deferred to the translation phase.
- `status: green` on a refactor report means "nothing worth refactoring".
- `/codify` no longer takes a refactor report as input; it executes the plans `/planify` derives
  from it.

## 2026-07-22 — Three phase commands, not one per pipeline stretch

**Status**: adopted. Supersedes the per-stretch command set introduced alongside the
earlier pipeline work.

### Context

The commands under `.agents/commands/` had grown one-per-stretch:
`explore-and-extract`, `specify-and-planify`, `codify-plans`, `verify-and-fix`,
`review-and-fix`, and `refactor-and-verify` — plus `build-feature`, which already
chained `/specify` → `/planify` → `/codify` (per plan) → `/verify` (loop to green) →
`/review` → `/release` on its own. So four of the granular commands were strict subsets
of `build-feature`: it subsumed `specify-and-planify`, `codify-plans`, `verify-and-fix`,
and `review-and-fix` end to end. The parallel machinery had already drifted — the catalog
table listed commands that no longer matched, the root README miscounted them ("five"),
and one command (`refactor-and-verify`) had no README while the others did.

### Decision

1. **Three commands, one per lifecycle phase.** Keep `explore-and-extract` (set up the
   context), `build-feature` (build or amend one feature from spec to shipped release),
   and `refactor-and-verify` (periodic whole-app audit). Delete the four intermediate
   per-stretch commands and their READMEs.
2. **A partial run invokes the skill directly.** Re-planning only, or codifying a single
   plan, is a single skill call (`/planify`, `/codify`, …) — the skills stay first-class
   entry points, so no orchestrator is needed for a one-step run.
3. **One shape for all three.** The command file is lean instruction bullets (the
   executable form); a sibling `.README.md` carries the prose. Every command now has both.
4. **Commands stay project-neutral.** `refactor-and-verify` no longer hard-codes a stack;
   it tells `/refactor` to follow the project's `{Agents_File}` and container rules, so the
   command copies cleanly into any repo.

### Consequences

- Eight files removed (`specify-and-planify`, `codify-plans`, `verify-and-fix`,
  `review-and-fix`, each with its README); new `refactor-and-verify.README.md`.
- No capability lost: the deleted stretches all live inside `build-feature`.
- Align-docs synced: the catalog command table and the root README count/list.

### Rejected alternatives

- **Keep the per-stretch commands for partial runs** — rejected: `build-feature` already
  chains them, and any single stretch is one skill call away. The extra files were
  duplicate machinery that drifted out of sync rather than earning their keep.

### Accepted trade-offs

- **A partial run is a skill call, not a named command.** Slightly less discoverable than a
  dedicated `verify-and-fix`-style command, but the skills remain first-class and
  `build-feature` covers the common path in one go.

## 2026-07-22 — `/refactor` is a whole-app triaging audit; `/redesign` merged in

**Status**: adopted. Consolidates the same-day `/refactor` + `/redesign` introduction
into one skill; neutralizes the apply-in-place `_improvements` sources.

### Context

Some "improvement" sources under `_improvements/` — a borrowed code simplifier and two
frontend skills — edited code in place, breaking the invariant that *only `/codify`
writes code*. The first fix was two report-only judges in the `/review` mould:
`/refactor` scanned code clarity, `/redesign` scanned the frontend (design system, WCAG,
and later componentization), each writing a report for `/codify` to apply. Two judges of
the same shape then had to hand-draw a boundary so they would not double-report — repeated
UI markup deferred from `/refactor` to `/redesign` — and each carried its own command,
report template, and pattern catalog. That is parallel machinery for one idea: a
report-only cleanup pass that routes to `/codify`. The seam between "code" and "UI"
cleanup is arbitrary; decay does not respect it.

### Decision

1. **One periodic whole-app auditor**, modelled on `/review`. `/refactor` reads the
   *accumulated* system — the whole app by default — not a single diff, so cross-cutting
   decay no per-spec review can see gets an owner.
2. **Multiple lenses, one skill.** Code clarity (`references/refactor.patterns.md`) and
   UI + accessibility (`references/ui.patterns.md`) are lenses the audit scans through,
   with a shared triage brain (`references/triage.md`), alongside structure and behavior.
3. **Every finding is triaged** with a severity, a kind, and a handoff, routed by the
   existing maintenance question — *would fixing it change what a green e2e test asserts?*
   Behavior-preserving and local → `/codify`; structural → `/planify`; behavioral →
   `/specify`. It never drops a real finding to stay behavior-preserving; it escalates.
4. **`/codify` applies only the report's `/codify` findings.** The `/planify` and
   `/specify` findings surface to the human, since those re-enter the pipeline at their
   own door.
5. **The apply-in-place sources are neutralized.** `code-simplification`,
   `frontend-ui-engineering`, and `frontend-design` become non-invocable
   (`user-invocable: false` + `disable-model-invocation: true`) so they can no longer be
   typed or auto-fire and bypass the report → `/codify` discipline. They stay as reference
   catalogs pointing at `/refactor`.

### Consequences

- `/redesign` is removed — skill, `redesign-and-verify` command, and report template. Its
  UI/a11y catalog moved into `/refactor` as the `ui.patterns.md` lens; `triage.md` is new.
- `refactor-and-verify` gates on a green baseline, audits the app, applies the `/codify`
  lane, runs `/verify` per changed container, and surfaces the `/planify` and `/specify`
  findings to the human.
- One report shape and one command replace two; the hand-drawn "who reports UI markup"
  boundary is gone.
- The single-writer invariant holds with no exception: the audit only reports.
- Align-docs synced: catalog, lifecycle, `AIDD.workflow.md`, `getting-started.md`, README.

### Rejected alternatives

- **Keep `/redesign` as a separate frontend judge** — rejected: two report-only skills of
  the same shape force an arbitrary boundary and duplicate the command, template, and
  routing. One auditor with per-domain lenses removes the seam at no loss of coverage.
- **Leave the `_improvements` skills invocable** — rejected: an apply-in-place cleanup path
  bypasses the report → `/codify` discipline and reopens the single-writer hole `/refactor`
  was created to close. Kept as non-invocable reference only; `frontend-design` is retained
  as a distinct creative design-direction reference, not a cleanup source.

### Accepted trade-offs

- **A whole-app audit is broader and heavier than a per-diff cleanup.** Mitigation: it
  scopes down to a container or paths on request, and is meant to run periodically — every
  few specs or at a release train — not on every change.
- **One skill now spans code and UI lenses.** Mitigation: the lenses live in separate
  `references/` files and share one `triage.md`, so each stays a focused catalog.

## 2026-07-21 — `/review` pass/fail gates; `--fix` retired; `/release` gate check

**Status**: adopted. Supersedes decision 4 of "Codify is the only skill that writes
code" below — the `/review --fix` escape hatch is removed.

### Context

`/review` had two shapes at once: an evaluator that wrote a report, and — under an
explicit `--fix` — a writer that applied mechanical findings in place. That escape
hatch contradicted the invariant it was meant to preserve: *`/codify` is the only skill
that writes code; `/verify` and `/review` only evaluate and report*. The catalog stated
the invariant while the skill broke it. Findings were also modeled as free-form
violations grouped by four "dimensions", with no crisp ship/no-ship signal for the
downstream `/release`.

### Decision

1. **`/review` is a pass/fail gate.** The scope is checked against discrete gates — lint,
   types, a11y, security, performance, clean-code/DRY — each with a `pass` | `fail`
   verdict recorded in `review.report.md`. A failed gate lists its findings (severity,
   kind, handoff).
2. **`--fix` is retired.** `/review` never edits code. Every failed gate hands off to
   `/codify`, restoring the "only `/codify` writes code" invariant with no exception.
3. **Scope is spec-first.** `/review` defaults to the in-scope spec's code; a branch,
   files, or explicit paths remain a valid override input.
4. **`/release` gates on green.** A review report in scope must show every gate `pass`
   before shipping; a failure returns to `/codify`. This makes the gate report an
   explicit release precondition, not just advisory.

### Consequences

- `review/references/review.guidelines.md` was renamed to `review.gates.md` and gained
  the tooling gates (lint, types) plus pass/fail framing.
- `review.report.template.md` became a gate-verdict table plus findings; the
  `fixed (--fix)` handoff option was removed.
- Align-docs synced: catalog, lifecycle, `review-and-fix` command, `AIDD.workflow.md`,
  `getting-started.md`.

### Accepted trade-offs

- **Loop latency.** Mechanical cleanups that `--fix` applied in place now cost a
  `/review` → `/codify` handoff. Mitigation: mechanical findings route straight to
  `/codify` with no plan or human gate in between.

## 2026-07-21 — Amendable specs; `planned` gate; e2e plans + checkpoints

**Status**: adopted. Supersedes write-once / frozen-`done` assumptions and the brief
"planify skips e2e" experiment earlier the same day.

### Context

Specs were write-once tickets: `done` meant frozen history, and behavior change required
a new `{spec_key}`. That fought real product work where criteria and solution evolve on
the same feature. A short-lived split also dropped `e2e.plan.md`, leaving e2e authorship
under-specified once amend entered the picture.

### Decision

1. **Specs are amendable** at any status via `/specify`. Same `{spec_key}`; keep
   `released-version` if previously shipped; uncheck all ACs; set `status: pending`.
2. **Status chain (Variant A)**: `pending` → `planned` → `in-progress` →
   `verified` | `failed` → `done`. `/planify` owns `planned`; `/codify` owns
   `in-progress`; `/verify` owns `verified`/`failed`; `/release` owns `done`.
3. **Always replan after amend** — `/specify` always hands off to `/planify` (no
   criteria-only shortcut). Code almost always changes with criteria.
4. **Restore `e2e.plan.md`** — `/planify` plans software containers and e2e;
   `/codify` implements from the plan (e2e compile-only); `/verify` runs and reports.
5. **Checkpoints on replan** — each plan template has a Checkpoints table: every prior
   step/scenario is `keep` | `redo` | `drop` before Implementation Steps are rewritten.

### Consequences

- Removed the "do not edit a done spec" rule from `{Agents_File}` guidance.
- Maintenance behavior changes prefer `/specify` amend over a parallel new ticket.
- `done` means currently shipped, not immutable.

## 2026-07-21 — Spec = problem / solution / criteria; planify skips e2e; codify gates

**Status**: **superseded** by the amendable-spec / e2e-plan decision above (same day).
Kept for history: problem/solution/criteria wording and codify smoke/compile gates remain.

**Status**: adopted. Narrows the 2026-07-07 PRD ownership split; renames opaque `{NNN}`.

### Context

`/specify` both created `specs/PRD.md` (if missing) and appended feature lines. Setup
artifacts belong with `/explore`. Specs also pulled a separate model-attribute convention
file that duplicated conceptual guidance already in `model.schema.md`. Identity tokens
were inconsistent (`{NNN}`, `{Spec Id}`, status enums that did not match the pipeline).

### Decision

1. **`/explore` creates the PRD shell** — product problem/goals paragraph; no category entries.
2. **`/specify` appends only** — indexes each new spec under a **category** (blog-post style); never rewrites the shell.
3. **Remove `model.conventions.md`** — conceptual data for a feature comes from `model.schema.md`.
4. **Canonical identity** — `{spec_id}` (3-digit), `{slug}` (kebab), `{spec_key}` = `{spec_id}-{slug}`; AC ids are `AC-{spec_id}.{n}`.
5. **Lean frontmatter** — `id`, `slug`, `title`, `category`, `tags`, `status`
   (`pending` | `in-progress` | `verified` | `failed` | `done`), `created`,
   `released-version`. Drop `type` and `updated_at`. `/verify` owns `verified`/`failed`;
   `/release` closes as `done`.

### Consequences

- PRD template lives under `explore/assets/`; missing PRD is a handoff to `/explore`.
- Release still does not edit the PRD.
- Folder, branch (`feat/{spec_key}`), and reports share one key.

## 2026-07-07 — PRD as functional log; release owns technical closure only

**Status**: adopted. Supersedes the feature-doc and supersession machinery of the
2026-07-06 entries below.

### Context

`/release` had absorbed functional documentation: merging `docs/{feature}.md`, deriving
`superseded-by:` from doc diffs, and keeping a readable contract in lockstep with the
suite. That overloaded release and duplicated the executable contract. Specs were also
treated as evolving or superseded when behavior changed — ceremony (`amends:`,
`supersedes`, derive-at-release) that belonged in specify and release but obscured the
simple model: specs are tickets for programming; the suite is the contract.

### Decision

1. **Specs are programming artifacts.** One change, its criteria, its acceptance.
   Write-once while open; closed at release (`done`, `released-version`) — history, not
   ongoing authority.
2. **PRD is the functional log.** `specs/PRD.md` indexes specs by feature area when
   `/specify` creates them — append-only, no status, no `supersedes` lineage.
3. **`/release` is technical closure only.** Version bump, `CHANGELOG.md`, arch doc
   reconciliation, close the spec. It does not edit the PRD or other functional docs.
4. **No supersession model.** New behavior = new spec via `/specify`; old specs stay
   closed as-is. No `amends:`, `superseded-by:`, or derive-at-release.
5. **The green e2e suite remains the contract.** Organized by PRD feature area, like
   production code. Green tests change only through a plan.

### Rejected alternatives

- **Keeping feature docs as the readable contract** — rejected: duplicates the suite
  and forced release to merge functional prose on every ship.
- **Letting `/release` update the PRD** — deferred: the PRD is written at specify time;
  release may revisit this if shipped-vs-logged drift becomes a problem.

### Consequences

- Removed `release/assets/feature.doc.template.md`, mode guides, and feature-doc merge steps.
- `/release` is one self-contained skill: optional spec in scope, same steps either way.
- `/specify` PRD lines are outcome-only — no supersession markers.
- e2e suites organize by PRD feature area, not per-spec slug.
- Invariant: *green e2e suite = current behavior*.

### Accepted trade-offs

- **Functional history is the PRD plus closed specs**, not a living feature-doc HEAD.
  "What does the product do?" → read the suite; "what specs exist?" → read the PRD.
- **No automatic linkage when behavior changes.** A new spec is a new ticket; the old
  one stays closed. Traceability is chronological (PRD order, git, changelog), not
  structural (`supersedes`).

## 2026-07-06 — Disposable specs: the green suite is the contract

**Status**: partially superseded (2026-07-07: feature docs and release-as-doc-reconciler
dropped; disposable closed specs and suite-as-contract retained).

### Context

Even after relocating the bookkeeping, the spec archive remained the authority for
current behavior — yet the standing invariant (*live criteria = e2e suite = behavior*)
meant the archive and the suite expressed the same set twice. The supersession
machinery (`superseded-by:`, liveness rules, derive-at-release) existed only to keep
the duplicate consistent. Meanwhile e2e tests were organized by spec slug — unlike
production code, which is organized by feature and *modified* by tickets. And `/modify`
existed to answer a triage question whose baseline (released criteria) was, by the
invariant, just the suite again.

### Decision

1. **The green e2e suite is the contract.** Organized by feature, like production
   code. Green tests change only through a plan — a plan step is to test edits what it
   already is to code edits: the authorization.
2. **Specs are disposable tickets.** One change, its criteria, its acceptance. After
   release: a closed ticket — history (why, and since when), never authority. No
   `superseded-by:`, no liveness, no archive triage.
3. **Feature docs are the contract in words.** `/release` keeps `docs/{feature}.md`
   in lockstep with the suite; statements note the spec that shipped them as
   provenance (the archaeology pointer, like a commit hash).
4. **`/modify` is deleted.** Its Route A is `/codify` fix mode (+ regression test →
   patch release); its Route B is just `/specify`; its triage becomes a mechanical
   question asked at both doors: **would satisfying the request change what a green
   e2e test asserts?** `/specify` bounces "no" to `/codify` (fix-or-feature gate);
   `/codify` bounces "yes" to `/specify` (green-tests-are-the-contract guardrail).
5. **The e2e plan authorizes scenario changes per feature suite** — the Replaces
   section generalized to *Changes to existing scenarios* (`e2e/{feature}`: scenario →
   changed | retired).

### Rejected alternatives

- **Keeping `/modify` as a thin triage skill** — rejected: once the triage question is
  mechanical, a dedicated skill is a door with nothing behind it; symmetric guardrails
  route with certainty and cost two lines each.
- **Keeping the spec archive as authoritative referee** — rejected as duplicate
  accounting; the referee role passes to the suite (executable) and the feature doc
  (readable), which check each other.

### Consequences

- Pipeline is 8 skills. `/modify` and its route guides are gone; `/review`'s
  behavior-finding handoff points to `/specify`.
- The old "no silent behavior changes" guardrail became structural: `/codify` cannot
  flip a green test without a plan, and a plan needs a spec — the disguised-bug
  hot-fix has no path through the system.
- Coverage-gap default: where no test covers the behavior, a fix plus its regression
  test *become* the contract (stated in `/codify`'s guardrail).
- The invariant reads: *green e2e suite = current behavior = feature docs, in words*.

### Accepted trade-offs

- **No third referee.** If the suite and the feature doc disagree, a human arbitrates
  intent; the closed tickets only inform. The fence (plan-authorized edits, report-only
  evaluators, green-baseline review) replaces the second copy.
- **Traceability by provenance, not by structure.** "Why does this behave so?" is
  answered by the doc statement's spec pointer, the changelog, and git history — the
  archive is consulted, never enforced.

## 2026-07-06 — Feature docs are the functional HEAD; supersession is derived at release

**Status**: superseded (2026-07-07).

### Context

The spec archive was the only functional record: current behavior had to be assembled
from all non-superseded `done` specs, and functional evolution required the
`amends:` / `superseded-by:` ceremony declared up front — in `/specify`, the first
skill anyone learns. That made the entry point hard to teach: lesson one carried
maintenance concepts (amendment chains, baselines, done-spec immutability) that only
matter months into a project's life.

### Decision

1. **Feature docs join the HEAD.** `{Product_Folder}/docs/{feature}.md` describes
   current behavior — one statement per line, each linking its governing spec
   (`spec: {NNN}, v{version}`). `/release` merges what shipped into it after every
   feature release, exactly as it already reconciles arch docs. The docs are a
   projection: on any conflict, the spec archive wins.
2. **`/specify` knows nothing about versioning.** A spec is a write-once ticket with
   acceptance criteria. No `amends:` frontmatter, no baseline mechanics. A released
   baseline, when there is one, arrives as prose context from `/modify`.
3. **`/planify` owns test replacement.** When a change alters released behavior, the
   e2e plan's **Replaces** section lists the scenarios it retires (governing spec +
   scenario). Old tests retire by plan, never silently — this is the signal that lets
   `/verify` treat their disappearance as intended rather than as regression.
4. **`/release` derives the supersession.** When the feature-doc merge rewrites a
   statement governed by another spec, release stamps `superseded-by:` on that old
   spec (frontmatter only), files the changelog entry under *Changed*, and
   cross-checks against the e2e plan's Replaces section. Nobody upstream declares the
   amendment; release reconstructs it from the merge.
5. **`/modify` triages through the doc.** The feature doc's link points straight at
   the governing spec — no more `superseded-by:` chain-walking during triage.

### Rejected alternatives

- **Specs as disposable tickets with the doc as sole authority** (drop the archive and
  the supersession entirely) — rejected: it trades away the immutable triage baseline
  and the tests-change-only-with-a-spec guardrail, rebuilding both on discipline
  alone. Kept as a possible future step; the feature docs built here are its
  prerequisite either way.
- **Keeping `amends:` in the spec but hiding it from the template** — rejected: the
  concept still leaks into `/specify`'s docs and lessons; relocation beats concealment.

### Consequences

- The spec template lost its maintenance-links block; `/specify`'s guardrail is simply
  "specs are write-once." The teaching story for lesson one is *spec = a ticket with
  testable criteria*, with no asterisks; versioning appears only in the maintenance
  lesson as "release keeps the books."
- New asset: `release/assets/feature.doc.template.md`. The release feature guide gained
  the merge-and-derive steps; the maintenance guide notes the doc normally stays
  untouched (a defect fix restores documented behavior).
- `superseded-by:` survives unchanged as the archive's liveness marker — it is now
  written exclusively by `/release` and read mostly by machines; humans navigate via
  the feature doc.
- Pre-release, the replacement linkage lives in the e2e plan instead of the spec; the
  archive becomes fully consistent at release time instead of at specify time. One
  extra hop for an auditor, one whole concept removed from the beginner path.

### Accepted trade-offs

- **The doc can drift** between releases (a skipped merge). Bounded by the conflict
  rule — the spec wins — and by `/modify`'s fallback to searching the spec archive
  when the doc is missing or stale.
- **Behavior is stated twice** (archive and doc). Accepted: the duplication is exactly
  the "readable functional HEAD" the model was missing, and only one side is
  authoritative.

## 2026-07-06 — One writer, two evaluators

**Status**: adopted; **partially superseded** by 2026-07-21 (planify skips e2e;
codify gates). The writer/evaluator split remains; e2e is no longer planned by
`/planify`.

### Context

The e2e container was an exception threaded through four skills:

- `/planify` wrote a special `e2e.plan.md` from its own template, unlike any container plan.
- `/codify` was forbidden to touch the e2e container (a guardrail in two skills).
- `/verify` was author, executor, and fixer at once: it wrote the e2e tests, ran them,
  and fixed defects in an internal loop, with two mode guides (first-run / resume) to
  manage its own dual role.
- `/review` audited and fixed its own findings in place, carrying three guardrails
  (tests untouchable, contracts frozen, green baseline) that existed mostly to police
  its own edits.

The cost of the exception: two skills that judged their own work, fix logic duplicated
between `/verify` and `/codify`, and special-case rules scattered across the skill set.
Meanwhile the agent layer (`.claude/agents/`) had already made the opposite choice:
Builder does, Craftsman checks and reports by default. The skills contradicted the agents.

### Decision

1. **The e2e container is a container like any other.** `/planify` plans it
   (`e2e.plan.md`, same plan shape, specialized: one scenario step per acceptance
   criterion), `/codify` implements its suite, `/extract` documents its arch and rules.
2. **`/codify` is the only skill that writes code** — functional containers and the e2e
   suite alike. It gains a fix mode: a defects or findings report scoped to one
   container is a valid input.
3. **`/verify` is report-only.** It runs the suite and writes `e2e.report.md` — each
   defect triaged by kind (`code bug` | `test bug` | `structural`) with a handoff
   (`/codify` per affected container, or `/planify` for structural). It never edits
   code, tests, or plans. It alone marks the spec's acceptance criteria `[x]`.
4. **`/review` is report-only by default.** It writes `review.report.md` with a handoff
   per finding; an explicit `--fix` applies only `mechanical` findings (renames, dead
   code, extractions) — mirroring the Craftsman agent's `fix-mode: direct-fix` escape.
5. **Reports, not debugging plans.** The evaluators emit evidence plus routing
   (kind + handoff), never plans. `/planify` remains the only plan author.

The fix loop becomes: `/codify` → `/verify` → report → `/codify` → `/verify`, until
green. Same convergence as the old internal loop, but every iteration leaves an
auditable report and the fixer is always the skill that wrote the code.

### Rejected alternatives

- **`/verify` emits a debugging plan** — rejected: it would make verify a second plan
  author, recreating the role blur elsewhere. The report's triage kind is already
  sufficient routing information; a plan is only needed for `structural` defects, and
  writing it is `/planify`'s job.
- **Keep `/verify` as the fixer** — rejected: author-judge conflict, duplicated fix
  logic, and the two mode guides it required.
- **Full symmetry including `/modify`** — deferred: `/modify` Route A (hotfix +
  regression test) still writes code outside `/codify`. It is a deliberately
  lightweight maintenance path; folding it in is a possible future step.

### Consequences

- `/verify` collapsed to a single mode; its `first-run` / `resume` guides were deleted.
  Their surviving rules moved with the responsibility: *never weaken a test* went to
  `/codify` (which now fixes), *independence* went to the e2e plan derivation (scenarios
  come from the spec's criteria via `/planify`, never from sibling implementations).
- New assets: `verify/assets/e2e.report.template.md`,
  `review/assets/review.report.template.md`. The e2e plan template was recast into the
  container-plan shape (frontmatter `container: e2e`, a Contracts section, no
  Execution/Defects sections — those belong to `/verify`).
- `/codify` has a different definition of done for the e2e container: the suite is the
  deliverable — done when it compiles and executes; red against not-yet-verified
  features is expected and left for `/verify` to judge. This is the one asymmetry that
  survives, stated explicitly instead of hidden in ownership rules.
- `e2e.arch.md` / `e2e.rules.md` moved from optional to required — `/codify` always
  reads its container's arch and rules, so `/extract` must produce them for e2e.
- The acceptance chain gained a property: the implementer can never mark its own work
  verified. `/codify` checks plan steps; only `/verify` checks acceptance criteria;
  `/release` gates on criteria all `[x]`.

### Accepted trade-offs

- **Loop latency.** Trivial fixes used to happen inside verify's tight loop; now each
  round costs a `/verify` → `/codify` → `/verify` handoff. Mitigation: non-structural
  defects route straight to `/codify` — never through `/planify` or a human gate — and
  `/review --fix` keeps mechanical cleanups cheap.
- **Test-author independence.** `/codify` now writes both the code and the e2e suite
  that checks it. Mitigation: the suite derives from the spec's acceptance criteria
  through `/planify`'s scenario mapping, is implemented in a separate run per the
  one-run-one-container rule, and is judged by a skill that cannot edit it.

## 2026-07-03 — Self-contained skills, no shared module

**Status**: adopted (see `tmp/docs/draft/260703.skills-simplification-plan.md` for the
original analysis).

- All skills share one template (`skillify/assets/skill.template.md`); mode branches
  live in `references/*.guide.md` files, keeping each `SKILL.md` a classifier plus
  dispatcher.
- A shared `.agents/skills/_shared/` folder for the duplicated glossary was rejected:
  each skill folder is a self-contained, copyable unit (the install story is "copy
  `.agents/` into your project"), and a shared module couples skills that today have
  none. Short duplicated vocabulary is cheaper than the indirection.
- Cross-skill terms (Container, Tier, Mode…) live once in `{Agents_File}`; skills may
  restate only what they specialize.

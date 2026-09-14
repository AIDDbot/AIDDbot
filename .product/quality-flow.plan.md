# Quality flow plan

Status: ready for review; implementation pending.

## Goal

Use the full Craftsman flow to reduce quality debt in the shipped system. Collect debt left by spec qualification. Find new problems with team-configured tools. Repair selected problems through ordinary specs. Do not restore `changes/` or create a second delivery flow.

Write skills and templates in plain English. Use short sentences and standard terms. Keep procedure in the flow and document formats in templates. Do not micromanage tool use.

## Documents and IDs

The following names are provisional: `{Product_Folder}/quality/findings.md`, `{Product_Folder}/quality/review.md`, and finding IDs such as `Q0001`. Keep the roles stable even if the names change.

- The findings file is a short index of open quality problems in the shipped system. Each entry is one line: stable ID, concrete problem, scope, and evidence link. It has no resolved entries or process status. Git keeps the history.
- The review file holds evidence from system-wide tool runs. Record the checked revision, commands or tools, relevant results, and limits. Give each confirmed tool finding a section that its index entry can link to. Keep details for open findings available; do not replace them with only the latest summary. A run with no new findings still records what was checked.
- A finding first seen in a spec links to its qualification report. Do not copy its detailed evidence into the review file. A tool finding links to the relevant review section.
- Reserve finding IDs through the `finding` counter in `{Product_Folder}/counters.yaml`, as defined in `spec-first.plan.md`. IDs are permanent and never reused. The final prefix is undecided. Do not add local counters or confuse finding IDs with requirement IDs `F/T` or spec IDs `S`.

## Sources and ownership

- `qualify` records quality findings in its spec report. It does not edit the global index while the spec is open. `verify` only reports functional acceptance results; it does not generate quality debt. Failed acceptance requires correction.
- At shipping, `shipify` adds non-blocking qualification debt that still exists in shipped code. Qualification determines whether delivery can proceed with that debt; no separate human approval is required per finding. `shipify` records that decision rather than repeating the technical review. It checks for an existing finding with the same underlying problem and keeps that ID instead of adding a duplicate. Blocking findings prevent shipping; findings fixed before shipping do not enter the index.
- Craftsman runs system-wide checks against a known shipped revision. It reviews tool output before writing a finding. A tool warning is a candidate, not a confirmed problem. It checks current code, rejects noise, and merges duplicates with known findings.
- Craftsman may add confirmed tool findings to the index and their evidence to the review file. Record which checks ran and any execution limits. A missing tool is neither a finding nor a blocker for the global review.

## Discovery scope

Run only tools and checks supplied by the human team. These may cover stricter lint, complexity, coverage, duplication, mutation testing, or other quality measures. Tool selection, installation, and configuration belong to the team. Craftsman does not install tools, propose tool installation, or open setup specs because a tool is missing. Interpret the configured results against the code. Do not invent universal thresholds or treat a metric alone as a defect. State the concrete risk or maintenance cost of each confirmed finding.

Keep discovery independent of repair cadence. Quality review may run weekly, on request, or when useful. Several findings may accumulate before a repair spec is opened.

## Repair flow

1. Read the short findings index. Open only the source reports or review sections needed for candidate findings.
2. The debt specifier rechecks that each candidate still exists. It may remove a false positive, obsolete finding, or duplicate with evidence and a reason in Git. Keep the surviving ID for duplicates. This index cleanup needs no repair spec. Group remaining findings that have one coherent correction and a reviewable scope. Do not set an arbitrary maximum group count.
3. Create one `S` spec for the selected repair. Use the same Problem, Solution by container, and Verification structure as any other spec. Reference the selected finding IDs. Use `chore` for behavior-preserving refactors and `fix` for observable defects. Do not change PRD requirements unless the intended contract changes.
4. Follow `spec-first.plan.md`: run `codify` for affected containers, including E2E test writing, then `verify` for E2E acceptance execution and `qualify` for quality review. Repair failed controls and refresh stale evidence.
5. When the spec ships, `shipify` removes only the findings proven resolved. It leaves unrelated or still-present findings open. Git records the removal and the spec retains its reports.

Craftsman's special responsibility is discovery, confirmation, grouping, and scope selection. The `S` spec owns implementation and delivery. There is no separate quality branch type, release process, or change record.

## Repo work

- Adapt `/craft-lasting-quality` and its finding contract to spec reports and tool discovery. Remove all reads and writes through `changes/`.
- Adapt `verify`, `qualify`, `shipify`, and repair workers to the shared spec contract. Only qualification feeds debt to `shipify`. Keep index cleanup by the debt specifier distinct from removal after a shipped repair.
- Add small templates for the findings index and tool review detail. Keep a one-line index and linked evidence. Do not copy full tool logs into the index.
- Update the catalog, generated `AGENTS.md`, and public workflow guidance. Edit skills through `/skillify`. Target new projects; do not migrate old project records.
- Update repository checks for qualification-only debt, index cleanup, shared counters, and tool discovery using existing configuration.

## Acceptance checks

- Debt observed during an open spec stays in its qualification report. Only still-present, non-blocking qualification debt enters the global index when that spec ships. Verification failures cannot be deferred as debt.
- Tool discovery records its checked revision and evidence. Only confirmed, actionable problems enter the index. Duplicate observations retain one ID.
- The index stays short and contains only open problems. Known debt links to spec reports; newly discovered problems link to tool review detail.
- A repair may address several findings, but uses one ordinary `S` spec and passes both `verify` and `qualify`. `shipify` removes findings proven resolved. The debt specifier may also remove invalid, obsolete, or duplicate entries with evidence and a reason in Git, without a repair spec.
- Missing quality tools do not produce findings, installation proposals, or blockers. The review makes clear which team-configured checks ran.
- No `changes/` artifact, global delivery report, fixed repair schedule, or arbitrary metric threshold is introduced.

## Name decision before implementation

Review the provisional pair `findings.md` and `review.md`, and the provisional `Q` prefix. Alternatives discussed: `debt.md` or `issues.md` for the index; `checks.md` or `scan.md` for tool detail; `D` or `I` for the prefix.

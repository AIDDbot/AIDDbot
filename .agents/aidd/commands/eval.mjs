// `aidd eval <kind> <status> <summary> [--spec <id>]`: record one evaluation at HEAD.
// It also gives `release` the regression check: the full acceptance run. The unit tests are not run again: `crap` ran all of them, and the hook the affected ones at each commit.
import fs from "node:fs";
import path from "node:path";
import { aiddbotPath, git, journal, readJson, RuleError, UsageError } from "../lib/core.mjs";
import { EVALUATIONS, isApproved, KINDS, readControl, reportFile, requireSpec, STATUSES, unapproved, writeControl } from "../lib/spec.mjs";

const LEVELS = { green: "INFO", amber: "WARN", red: "ERROR" };
const SOURCE = /\.[cm]?[jt]sx?$/;
const SKIPPED = new Set(["node_modules"]);

function sources(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return SKIPPED.has(entry.name) || entry.name.startsWith(".") ? [] : sources(full);
    return SOURCE.test(entry.name) ? [full] : [];
  });
}

/** The requirement IDs (R01, R02, …) that the spec lists. */
export const requirements = (file) =>
  [...fs.readFileSync(file, "utf8").matchAll(/^\s*-\s*\*\*(R\d{2})\*\*/gm)].map((match) => match[1]);

/** The requirements of older specs that a spec cites, such as `S0042-R03`: a `fix` of a failing test names the test that it repairs. */
export const cited = (file, id) =>
  [...new Set([...fs.readFileSync(file, "utf8").matchAll(/\b(S\d{4}-R\d{2})\b/g)].map((match) => match[1]))]
    .filter((requirement) => !requirement.startsWith(`${id}-`));

/** The tags of the acceptance tests that check a spec: `@{id}-` for its own requirements, else the tag of each requirement that it cites. */
export const specTags = (spec, id) => (requirements(spec).length ? [`@${id}-`] : cited(spec, id).map((requirement) => `@${requirement}`));

/** The requirements that the spec checks with no acceptance test tagged or titled with them in any `e2e` project:
 *  its own (`R02`), or else the ones that it cites (`S0042-R03`). */
export function untested(root, spec, id) {
  const own = requirements(spec);
  const required = own.length ? own.map((requirement) => ({ name: requirement, tag: `@${id}-${requirement}` }))
    : cited(spec, id).map((requirement) => ({ name: requirement, tag: `@${requirement}` }));
  if (!required.length) return [];
  const projects = Object.values(readJson(aiddbotPath(root, "config.json"), { projects: {} }).projects ?? {});
  const text = projects.filter((project) => project.type === "e2e" && project.commands?.test && typeof project.commands.test.na !== "string")
    .flatMap((project) => sources(path.join(root, project.path)))
    .map((file) => fs.readFileSync(file, "utf8")).join("\n");
  return required.filter(({ tag }) => !text.includes(tag)).map(({ name }) => name);
}

/** Code changes since `commit`, records and documents left out; empty when none. */
const changedSince = (root, commit) => git(root, ["diff", "--name-only", commit, "HEAD", "--", ".", ":!.product", ":!.aiddbot", ":!*.md"]);

/** Why a green verification cannot be recorded now; null when it can. Its evidence is the `--spec` run: the acceptance tests of the spec only. */
function missingEvidence(root, spec, control) {
  // A spec that has no requirements and cites none has no tagged test: the full suites prove it.
  if (!specTags(spec, control.id).length) return null;
  const scoped = Object.values(control.runs?.spec ?? {});
  if (!scoped.length) return "Run `aidd run test --spec` on this spec branch before recording a green verification: the acceptance tests of the spec have no run.";
  for (const { commit } of scoped) {
    const changed = changedSince(root, commit);
    if (changed) return `Code changed since the last run of the acceptance tests of the spec (${changed.split("\n")[0]}…); run \`aidd run test --spec\` again.`;
  }
  const missing = untested(root, spec, control.id);
  if (missing.length && requirements(spec).length) return `No acceptance test tagged or titled @${control.id}-Rnn for ${missing.join(", ")}; every requirement needs one.`;
  if (missing.length) return `No acceptance test tagged or titled @${missing.join(", @")}, which the spec cites; a fix of a failing test needs that test.`;
  return scoped.every((entry) => entry.ok) ? null : "The last run of the acceptance tests of the spec failed; record red.";
}

/** The full acceptance runs of the current code: each `e2e` project with a `test` command needs one with no code change since.
 *  `problem` names a missing or stale run; `failed` lists the projects whose run failed. */
function fullRuns(root, control) {
  const projects = readJson(aiddbotPath(root, "config.json"), { projects: {} }).projects ?? {};
  const failed = [];
  for (const [name, project] of Object.entries(projects)) {
    const slot = project.commands?.test;
    if (project.type !== "e2e" || !slot || typeof slot.na === "string") continue;
    const last = control.runs?.acceptance?.[name];
    if (!last) return { problem: `Run the full acceptance suite before you release: ${name} has no acceptance run; run \`aidd run test --project ${name}\`.` };
    const changed = changedSince(root, last.commit);
    if (changed) return { problem: `Code changed since the last acceptance run of ${name} (${changed.split("\n")[0]}…); run \`aidd run test --project ${name}\` again.` };
    if (!last.ok) failed.push(name);
  }
  return { failed };
}

/** Why the regression does not allow the release; null when it does. A failure ships only when open high debt records it:
 *  the spec solves what it can, and a failure too big for it becomes a `fix` of the craft. */
export function regression(root, control, debt) {
  const { problem, failed } = fullRuns(root, control);
  if (problem) return problem;
  if (!failed.length) return null;
  if (!debt.length) {
    return `The regression failed in ${failed.join(", ")}. Triage each failure: repair it in the spec, or record it with \`aidd debt add\` as high debt and name that debt with --debt.`;
  }
  const open = readJson(aiddbotPath(root, "debt.json"), { items: [] }).items;
  const invalid = debt.filter((id) => !open.some((item) => item.id === id && item.priority === "high"));
  return invalid.length ? `${invalid.join(", ")} is not open high debt; only high debt records a failure that ships.` : null;
}

export default function evaluate(root, [kind, status, summary], flags) {
  if (!KINDS.includes(kind)) throw new UsageError(`Kind must be one of: ${KINDS.join(", ")}.`);
  if (!STATUSES.includes(status)) throw new UsageError(`Status must be one of: ${STATUSES.join(", ")}.`);
  if (!summary?.trim()) throw new UsageError("Give a one-line summary of the evaluation.");
  const spec = requireSpec(root, typeof flags.spec === "string" ? flags.spec : undefined);
  const control = readControl(root, spec);
  if (control.status === "shipped") throw new RuleError(`${control.id} is already shipped.`);
  if (!isApproved(root, spec)) throw new RuleError(unapproved(control));
  if (!EVALUATIONS[control.type].includes(kind)) throw new RuleError(`A ${control.type} records no ${kind}: its behavior does not change, and the regression of aidd release proves it.`);
  const report = reportFile(root, control.key, kind);
  if (status !== "green" && !fs.existsSync(report)) {
    throw new RuleError(`This ${status} ${kind} needs its findings in .aiddbot/logs/${control.key}.${kind}.md first; write it, then record again.`);
  }
  if (flags.debt !== undefined) throw new UsageError("--debt belongs to `aidd release`: debt records only a failure of the regression.");
  if (kind === "verification" && status === "green") {
    // The verification checks only the acceptance tests of the spec: the regression belongs to the release.
    const problem = missingEvidence(root, spec, control);
    if (problem) throw new RuleError(problem);
  }
  const revision = control.evaluations.filter((entry) => entry.kind === kind).length + 1;
  const commit = git(root, ["rev-parse", "HEAD"]);
  control.evaluations.push({ kind, revision, status, commit, at: new Date().toISOString(), summary: summary.trim() });
  writeControl(root, control);
  if (status === "green") fs.rmSync(report, { force: true });
  journal(root, { event: "evaluated", spec: control.id, level: LEVELS[status], summary: `${kind} ${revision}: ${summary}` });
  return { spec: control.id, kind, revision, status, commit };
}

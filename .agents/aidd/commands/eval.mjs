// `aidd eval <kind> <status> <summary> [--spec <id>]`: record one evaluation at HEAD.
// It also gives `release` the regression check: the full unit and acceptance runs.
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
export const requirements = (dir) =>
  [...fs.readFileSync(path.join(dir, "spec.md"), "utf8").matchAll(/^\s*-\s*\*\*(R\d{2})\*\*/gm)].map((match) => match[1]);

/** Requirements of the spec with no acceptance test tagged or titled `@{id}-Rnn` in any `e2e` project. */
export function untested(root, dir, id) {
  const required = requirements(dir);
  if (!required.length) return [];
  const projects = Object.values(readJson(aiddbotPath(root, "config.json"), { projects: {} }).projects ?? {});
  const text = projects.filter((project) => project.type === "e2e" && project.commands?.test && typeof project.commands.test.na !== "string")
    .flatMap((project) => sources(path.join(root, project.path)))
    .map((file) => fs.readFileSync(file, "utf8")).join("\n");
  return required.filter((requirement) => !text.includes(`@${id}-${requirement}`));
}

/** Code changes since `commit`, records and documents left out; empty when none. */
const changedSince = (root, commit) => git(root, ["diff", "--name-only", commit, "HEAD", "--", ".", ":!.product", ":!.aiddbot", ":!*.md"]);

/** Why a green verification cannot be recorded now; null when it can. Its evidence is the `--spec` run: the acceptance tests of the spec only. */
function missingEvidence(root, dir, control) {
  // A spec without requirements has no tagged test: the full suites prove it.
  if (!requirements(dir).length) return null;
  const scoped = Object.values(control.runs?.spec ?? {});
  if (!scoped.length) return "Run `aidd run test --spec` on this spec branch before recording a green verification: the acceptance tests of the spec have no run.";
  for (const { commit } of scoped) {
    const changed = changedSince(root, commit);
    if (changed) return `Code changed since the last run of the acceptance tests of the spec (${changed.split("\n")[0]}…); run \`aidd run test --spec\` again.`;
  }
  const missing = untested(root, dir, control.id);
  if (missing.length) return `No acceptance test tagged or titled @${control.id}-Rnn for ${missing.join(", ")}; every requirement needs one.`;
  return scoped.every((entry) => entry.ok) ? null : "The last run of the acceptance tests of the spec failed; record red.";
}

/** The full runs of the current code: each project with a `test` command needs one (unit, or acceptance for `e2e`) with no code change since.
 *  `problem` names a missing or stale run; `failed` lists the projects whose run failed. */
function fullRuns(root, control) {
  const projects = readJson(aiddbotPath(root, "config.json"), { projects: {} }).projects ?? {};
  const failed = [];
  for (const [name, project] of Object.entries(projects)) {
    const slot = project.commands?.test;
    if (!slot || typeof slot.na === "string") continue;
    const evidence = project.type === "e2e" ? "acceptance" : "unit";
    const last = control.runs?.[evidence]?.[name];
    if (!last) return { problem: `Run the full \`aidd run test\` before you release: ${name} has no ${evidence} run.` };
    const changed = changedSince(root, last.commit);
    if (changed) return { problem: `Code changed since the last ${evidence} run of ${name} (${changed.split("\n")[0]}…); run the full \`aidd run test\` again.` };
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
  const dir = requireSpec(root, typeof flags.spec === "string" ? flags.spec : undefined);
  const control = readControl(root, dir);
  if (control.status === "shipped") throw new RuleError(`${control.id} is already shipped.`);
  if (!isApproved(root, dir)) throw new RuleError(unapproved(control));
  if (!EVALUATIONS[control.type].includes(kind)) throw new RuleError(`A ${control.type} records no ${kind}: its behavior does not change, and the regression of aidd release proves it.`);
  const report = reportFile(root, control.key, kind);
  if (status !== "green" && !fs.existsSync(report)) {
    throw new RuleError(`This ${status} ${kind} needs its findings in .aiddbot/logs/${control.key}.${kind}.md first; write it, then record again.`);
  }
  if (flags.debt !== undefined) throw new UsageError("--debt belongs to `aidd release`: debt records only a failure of the regression.");
  if (kind === "verification" && status === "green") {
    // The verification checks only the acceptance tests of the spec: the regression belongs to the release.
    const problem = missingEvidence(root, dir, control);
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

// `aidd eval <kind> <status> <summary> [--spec <id>]`: record one evaluation at HEAD.
// It also gives `release` the regression check: the full unit and acceptance runs.
import fs from "node:fs";
import path from "node:path";
import { aiddbotPath, commitPaths, git, journal, productPath, readJson, relative, RuleError, UsageError } from "../lib/core.mjs";
import { isApproved, KINDS, LAST_REVISION, readControl, requireSpec, STATUSES, unapproved, writeControl } from "../lib/spec.mjs";

const MESSAGES = { verification: "docs(verification): record acceptance", qualification: "docs(review): qualify implementation" };
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
  // A spec without requirements has no tagged test: the regression of the release proves it.
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

/** Why the regression does not allow the release; null when it does. Each project with a `test` command needs a full run (unit, or acceptance for `e2e`)
 *  with no code change since. A failure ships only after a red verification at the last revision, or with open debt older than the spec behind it. */
export function regression(root, control, preexisting) {
  const projects = readJson(aiddbotPath(root, "config.json"), { projects: {} }).projects ?? {};
  const failed = [];
  for (const [name, project] of Object.entries(projects)) {
    const slot = project.commands?.test;
    if (!slot || typeof slot.na === "string") continue;
    const evidence = project.type === "e2e" ? "acceptance" : "unit";
    const last = control.runs?.[evidence]?.[name];
    if (!last) return `Run the full \`aidd run test\` before you release: ${name} has no ${evidence} run.`;
    const changed = changedSince(root, last.commit);
    if (changed) return `Code changed since the last ${evidence} run of ${name} (${changed.split("\n")[0]}…); run the full \`aidd run test\` again.`;
    if (!last.ok) failed.push(name);
  }
  if (!failed.length) return null;
  const verification = control.evaluations.filter((entry) => entry.kind === "verification").at(-1);
  if (verification?.status === "red" && verification.revision >= LAST_REVISION) return null;
  if (!preexisting.length) {
    return `The regression failed in ${failed.join(", ")}. Triage each failure into verification.md and record a red verification, or name the older debt behind every failure with --preexisting.`;
  }
  const open = readJson(productPath(root, "quality", "debt.json"), { items: [] }).items;
  const invalid = preexisting.filter((id) => !open.some((item) => item.id === id && item.at < control.created));
  return invalid.length ? `${invalid.join(", ")} is not open debt recorded before ${control.id} was created.` : null;
}

export default function evaluate(root, [kind, status, summary], flags) {
  if (!KINDS.includes(kind)) throw new UsageError(`Kind must be one of: ${KINDS.join(", ")}.`);
  if (!STATUSES.includes(status)) throw new UsageError(`Status must be one of: ${STATUSES.join(", ")}.`);
  if (!summary?.trim()) throw new UsageError("Give a one-line summary of the evaluation.");
  const dir = requireSpec(root, typeof flags.spec === "string" ? flags.spec : undefined);
  const control = readControl(dir);
  if (control.status === "shipped") throw new RuleError(`${control.id} is already shipped.`);
  if (!isApproved(root, dir)) throw new RuleError(unapproved(control));
  const report = path.join(dir, `${kind}.md`);
  if (status !== "green" && !fs.existsSync(report)) {
    throw new RuleError(`This ${status} ${kind} needs its findings in ${kind}.md first; write it, then record again.`);
  }
  if (flags.preexisting !== undefined) throw new UsageError("--preexisting belongs to `aidd release`: older debt can explain only a failure of the regression.");
  if (kind === "verification" && status === "green") {
    const problem = missingEvidence(root, dir, control);
    if (problem) throw new RuleError(problem);
  }
  const revision = control.evaluations.filter((entry) => entry.kind === kind).length + 1;
  const commit = git(root, ["rev-parse", "HEAD"]);
  control.evaluations.push({ kind, revision, status, commit, at: new Date().toISOString(), summary: summary.trim() });
  writeControl(dir, control);
  if (status === "green") fs.rmSync(report, { force: true });
  journal(root, { event: "evaluated", spec: control.id, level: LEVELS[status], summary: `${kind} ${revision}: ${summary}` });
  const committed = commitPaths(root, [relative(root, dir)], MESSAGES[kind]);
  return { spec: control.id, kind, revision, status, commit, committed };
}

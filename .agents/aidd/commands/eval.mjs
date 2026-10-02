// `aidd eval <kind> <status> <summary> [--spec <id>] [--preexisting <D IDs>]`: record one evaluation at HEAD.
import fs from "node:fs";
import path from "node:path";
import { aiddbotPath, commitPaths, git, journal, productPath, readJson, relative, RuleError, UsageError } from "../lib/core.mjs";
import { KINDS, readControl, requireSpec, STATUSES, writeControl } from "../lib/spec.mjs";

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

/** Requirements of the spec with no acceptance test tagged or titled `@{id}-Rnn` in any acceptance project. */
export function untested(root, dir, id) {
  const required = [...fs.readFileSync(path.join(dir, "spec.md"), "utf8").matchAll(/^\s*-\s*\*\*(R\d{2})\*\*/gm)].map((match) => match[1]);
  if (!required.length) return [];
  const projects = Object.values(readJson(aiddbotPath(root, "config.json"), { projects: {} }).projects ?? {});
  const text = projects.filter((project) => project.commands?.acceptance && typeof project.commands.acceptance.na !== "string")
    .flatMap((project) => sources(path.join(root, project.path)))
    .map((file) => fs.readFileSync(file, "utf8")).join("\n");
  return required.filter((requirement) => !text.includes(`@${id}-${requirement}`));
}

/** Why a green verification cannot be recorded now; null when it can. */
function missingEvidence(root, dir, control, preexisting) {
  const accepted = Object.values(control.runs?.acceptance ?? {});
  if (!accepted.length) return "Run `aidd run acceptance` on this spec branch before recording a green verification.";
  for (const { commit } of accepted) {
    const changed = git(root, ["diff", "--name-only", commit, "HEAD", "--", ".", ":!.product", ":!.aiddbot"]);
    if (changed) return `Code changed since the last acceptance run (${changed.split("\n")[0]}…); run \`aidd run acceptance\` again.`;
  }
  const missing = untested(root, dir, control.id);
  if (missing.length) return `No acceptance test tagged or titled @${control.id}-Rnn for ${missing.join(", ")}; every requirement needs one.`;
  if (accepted.every((entry) => entry.ok)) return null;
  if (!preexisting.length) return "The last acceptance run failed; record red, or name the older debt behind every failure with --preexisting.";
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
  const report = path.join(dir, `${kind}.md`);
  if (status !== "green" && !fs.existsSync(report)) {
    throw new RuleError(`This ${status} ${kind} needs its findings in ${kind}.md first; write it, then record again.`);
  }
  if (kind === "verification" && status === "green") {
    const preexisting = typeof flags.preexisting === "string" ? flags.preexisting.split(/[\s,]+/).filter(Boolean) : [];
    const problem = missingEvidence(root, dir, control, preexisting);
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

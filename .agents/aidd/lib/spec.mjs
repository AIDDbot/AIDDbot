// Specs: their folders, their `control.json`, and the shipping gate.
import fs from "node:fs";
import path from "node:path";
import { git, productPath, readJson, RuleError, writeJson } from "./core.mjs";

export const TYPES = ["feat", "fix", "refactor", "chore"];
export const KINDS = ["verification", "qualification"];
export const STATUSES = ["green", "amber", "red"];
const LAST_REVISION = 3;
export const SPEC_DEFINED = "docs(spec): define delivery";

export const specsDir = (root) => productPath(root, "specs");

/** The folder of a spec given as `S0001`, `S0001-slug`, or a path; null when absent. */
export function findSpec(root, input) {
  const id = /S\d{4}/.exec(path.basename(input ?? ""))?.[0];
  if (!id || !fs.existsSync(specsDir(root))) return null;
  const name = fs.readdirSync(specsDir(root)).find((entry) => entry.startsWith(`${id}-`));
  return name ? path.join(specsDir(root), name) : null;
}

/** The spec of `input`, or of the current spec branch when `input` is omitted. */
export function requireSpec(root, input) {
  const branch = git(root, ["branch", "--show-current"]);
  const dir = findSpec(root, input ?? branch);
  if (!dir) throw new RuleError(`No spec found for ${input ?? `branch ${branch || "(detached)"}`}.`);
  return dir;
}

export const readControl = (dir) => readJson(path.join(dir, "control.json"));
export const writeControl = (dir, control) => writeJson(path.join(dir, "control.json"), control);

/** Whether `log approved` committed the definition of the spec: no code, evidence, or release comes before its approval. */
export function isApproved(root, dir) {
  const subjects = git(root, ["log", "--format=%s", "--", path.relative(root, dir)], { allowFailure: true }) ?? "";
  return subjects.split(/\r?\n/).includes(SPEC_DEFINED);
}

/** The rule that an unapproved spec breaks, with the command that repairs it. */
export const unapproved = (control) =>
  `${control.id} is not approved: its definition is not committed. When the human approves it, or in YOLO mode, run \`aidd log approved "${control.title}" --spec ${control.id}\` first.`;

const latest = (control, kind) => control.evaluations.filter((entry) => entry.kind === kind).at(-1);

/** Why the spec cannot ship yet; an empty list means it can. */
export function gate(root, dir, control) {
  if (control.status === "shipped") return [`${control.id} is already shipped.`];
  const blockers = isApproved(root, dir) ? [] : [unapproved(control)];
  for (const kind of KINDS) {
    const entry = latest(control, kind);
    if (!entry) {
      blockers.push(`No ${kind} recorded.`);
      continue;
    }
    // Qualification never blocks: its findings ship as debt.
    if (kind === "verification" && entry.status !== "green" && entry.revision < LAST_REVISION) {
      blockers.push(`${kind} is ${entry.status} at revision ${entry.revision}; repair and evaluate again.`);
    }
    if (git(root, ["cat-file", "-t", entry.commit ?? "none"], { allowFailure: true }) !== "commit") {
      blockers.push(`${kind} revision ${entry.revision} names no real commit; record it with aidd eval.`);
    }
    if (entry.status !== "green" && !fs.existsSync(path.join(dir, `${kind}.md`))) {
      blockers.push(`${kind} is ${entry.status} but ${kind}.md is missing.`);
    }
  }
  return blockers;
}

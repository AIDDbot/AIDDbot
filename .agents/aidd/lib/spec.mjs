// Specs: their folders, their identity in `spec.md`, their work state in `.aiddbot/logs/{key}.json`, and the shipping gate.
import fs from "node:fs";
import path from "node:path";
import { aiddbotPath, git, productPath, readJson, RuleError, writeJson } from "./core.mjs";

export const TYPES = ["feat", "fix", "refactor", "chore"];
export const KINDS = ["verification", "qualification"];
export const STATUSES = ["green", "amber", "red"];
export const LAST_REVISION = 3;
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

/** The identity of a spec: its folder name gives the key and the ID, its `spec.md` the type, branch, domain, and title. */
export function specMeta(dir) {
  const key = path.basename(dir);
  const text = fs.readFileSync(path.join(dir, "spec.md"), "utf8");
  const front = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)?.[1] ?? "";
  const meta = Object.fromEntries([...front.matchAll(/^(\w+):[ \t]*([^#\r\n]*?)[ \t]*(?:#.*)?$/gm)].map(([, name, value]) => [name, value]));
  const title = /^# .+? — (.+)$/m.exec(text)?.[1]?.trim() ?? key;
  return { id: key.slice(0, 5), key, type: meta.type, branch: meta.branch, domain: meta.domain || "general", title };
}

/** A spec is shipped when the changelog names it: `aidd release` writes that entry. */
export function isShipped(root, id) {
  const file = path.join(root, "CHANGELOG.md");
  return fs.existsSync(file) && fs.readFileSync(file, "utf8").includes(`[${id}](`);
}

/** The work state of a spec, its evaluations and runs: local and ignored by git, so a new clone starts it again. */
const controlFile = (root, key) => aiddbotPath(root, "logs", `${key}.json`);

/** The identity of the spec, its derived status, and its work state. */
export function readControl(root, dir) {
  const meta = specMeta(dir);
  const state = readJson(controlFile(root, meta.key), {});
  const status = isShipped(root, meta.id) ? "shipped" : "in-progress";
  return { ...meta, status, created: state.created, evaluations: state.evaluations ?? [], runs: state.runs ?? {} };
}

export const writeControl = (root, { key, created, evaluations, runs }) => writeJson(controlFile(root, key), { created, evaluations, runs });

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

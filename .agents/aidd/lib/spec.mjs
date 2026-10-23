// Specs: one file each, `{type}/{key}.md`, with their identity, their work state in `.aiddbot/logs/{key}.json`, and the shipping gate.
import fs from "node:fs";
import path from "node:path";
import { aiddbotPath, git, productPath, readJson, RuleError, writeJson } from "./core.mjs";

export const TYPES = ["feat", "fix", "refactor", "chore"];
export const KINDS = ["verification", "qualification"];
/** The evaluations that each type needs: verification only where behavior changes, and no review of a refactor, whose regression proves it. */
export const EVALUATIONS = { feat: KINDS, fix: KINDS, chore: ["qualification"], refactor: [] };
export const STATUSES = ["green", "amber", "red"];
export const LAST_REVISION = 3;
export const SPEC_DEFINED = "docs(spec): define delivery";

export const specsDir = (root) => productPath(root, "specs");

/** The file of a spec: one folder for each type, as the branches have, and one file for each spec. */
export const specFile = (root, type, key) => path.join(specsDir(root), type, `${key}.md`);

/** The file of every spec, by type and then by key. */
export function allSpecs(root) {
  return TYPES.flatMap((type) => {
    const dir = path.join(specsDir(root), type);
    return fs.existsSync(dir) ? fs.readdirSync(dir).filter((name) => name.endsWith(".md")).sort().map((name) => path.join(dir, name)) : [];
  });
}

/** The file of a spec given as `S0001`, `S0001-slug`, or a path; null when absent. */
export function findSpec(root, input) {
  const id = /S\d{4}/.exec(path.basename(input ?? ""))?.[0];
  return (id && allSpecs(root).find((file) => path.basename(file).startsWith(`${id}-`))) || null;
}

/** The spec of `input`, or of the current spec branch when `input` is omitted. */
export function requireSpec(root, input) {
  const branch = git(root, ["branch", "--show-current"]);
  const file = findSpec(root, input ?? branch);
  if (!file) throw new RuleError(`No spec found for ${input ?? `branch ${branch || "(detached)"}`}.`);
  return file;
}

/** The identity of a spec: its folder gives the type, its file name the key and the ID, its front matter the branch and domain, and its heading the title. */
export function specMeta(file) {
  const key = path.basename(file, ".md");
  const text = fs.readFileSync(file, "utf8");
  const front = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)?.[1] ?? "";
  const meta = Object.fromEntries([...front.matchAll(/^(\w+):[ \t]*([^#\r\n]*?)[ \t]*(?:#.*)?$/gm)].map(([, name, value]) => [name, value]));
  const title = /^# .+? — (.+)$/m.exec(text)?.[1]?.trim() ?? key;
  return { id: key.slice(0, 5), key, type: path.basename(path.dirname(file)), branch: meta.branch, domain: meta.domain || "general", title };
}

/** A spec is shipped when the changelog names it: `aidd release` writes that entry. */
export function isShipped(root, id) {
  const file = path.join(root, "CHANGELOG.md");
  return fs.existsSync(file) && fs.readFileSync(file, "utf8").includes(`[${id}](`);
}

/** The work state of a spec, its evaluations and runs: local and ignored by git, so a new clone starts it again. */
const controlFile = (root, key) => aiddbotPath(root, "logs", `${key}.json`);

/** The identity of the spec, its derived status, and its work state. */
export function readControl(root, file) {
  const meta = specMeta(file);
  const state = readJson(controlFile(root, meta.key), {});
  const status = isShipped(root, meta.id) ? "shipped" : "in-progress";
  return { ...meta, status, created: state.created, evaluations: state.evaluations ?? [], runs: state.runs ?? {} };
}

export const writeControl = (root, { key, created, evaluations, runs }) => writeJson(controlFile(root, key), { created, evaluations, runs });

/** The findings of a non-green evaluation: process, not product, so local and ignored by git like the work state. */
export const reportFile = (root, key, kind) => aiddbotPath(root, "logs", `${key}.${kind}.md`);

/** Whether `log approved` committed the definition of the spec: no code, evidence, or release comes before its approval. */
export function isApproved(root, file) {
  const subjects = git(root, ["log", "--format=%s", "--", path.relative(root, file)], { allowFailure: true }) ?? "";
  return subjects.split(/\r?\n/).includes(SPEC_DEFINED);
}

/** The size limits of a spec: each agent reads it whole at each step, so its context stays small. */
export const SPEC_LIMITS = { lines: 99, requirements: 9, stories: 3, rules: 5 };

/** The bullets of one `###` subsection, up to the next heading. */
function bulletsUnder(lines, heading) {
  const start = lines.findIndex((line) => line.trim() === `### ${heading}`);
  if (start < 0) return 0;
  const end = lines.findIndex((line, index) => index > start && /^#{1,3} /.test(line));
  return lines.slice(start + 1, end < 0 ? lines.length : end).filter((line) => line.startsWith("- ")).length;
}

/** Why a spec is too large to approve, with the repair of each limit; an empty list means that it fits. */
export function oversize(file) {
  const lines = fs.readFileSync(file, "utf8").trimEnd().split(/\r?\n/);
  const counts = {
    lines: lines.length,
    requirements: lines.filter((line) => /^- \*\*R\d{2}\*\*/.test(line)).length,
    stories: bulletsUnder(lines, "User Stories"),
    rules: bulletsUnder(lines, "Business rules"),
  };
  const repairs = {
    lines: "remove what the Blueprint, the project AGENTS.md or a check already gives",
    requirements: "each requirement is one capability that a user sees, with its errors and edge cases inside it",
    stories: "split the spec by user story",
    rules: "state each rule as a requirement, or split the spec",
  };
  const id = path.basename(file).slice(0, 5);
  return Object.entries(SPEC_LIMITS)
    .filter(([name, limit]) => counts[name] > limit)
    .map(([name, limit]) => `${id} has ${counts[name]} ${name}; the limit is ${limit}: ${repairs[name]}.`);
}

/** The rule that an unapproved spec breaks, with the command that repairs it. */
export const unapproved = (control) =>
  `${control.id} is not approved: its definition is not committed. When the human approves it, or in YOLO mode, run \`aidd log approved "${control.title}" --spec ${control.id}\` first.`;

const latest = (control, kind) => control.evaluations.filter((entry) => entry.kind === kind).at(-1);

/** Why the spec cannot ship yet; an empty list means it can. */
export function gate(root, file, control) {
  if (control.status === "shipped") return [`${control.id} is already shipped.`];
  const blockers = isApproved(root, file) ? [] : [unapproved(control)];
  for (const kind of EVALUATIONS[control.type]) {
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
    if (entry.status !== "green" && !fs.existsSync(reportFile(root, control.key, kind))) {
      blockers.push(`${kind} is ${entry.status} but .aiddbot/logs/${control.key}.${kind}.md is missing.`);
    }
  }
  return blockers;
}

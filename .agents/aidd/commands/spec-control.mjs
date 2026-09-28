import { parseArgs, RuleError } from "../lib/cli.mjs";
import { readControl, transition, writeControl } from "../lib/control.mjs";
import { git } from "../lib/git.mjs";
import { noteQuietly } from "../lib/journal.mjs";
import { findRoot } from "../lib/root.mjs";
import { resolveSpecDir } from "../lib/spec.mjs";
import specCheck from "./spec-check.mjs";

/**
 * Record the human approval: draft -> in-progress. The spec must pass `spec check`, and its
 * requirement IDs are kept so none can disappear or be renumbered afterwards (D16).
 */
export function approve(argv) {
  const { spec: input, base } = parseArgs(argv, { positional: ["spec"], flags: { base: "string" } });
  const root = findRoot();
  const { dir } = resolveSpecDir(root, input);
  const current = readControl(dir);
  if (current.status !== "draft") throw new RuleError(`Illegal spec transition: only a draft can be approved; ${current.id} is ${current.status}.`);
  const { requirements } = specCheck([dir, ...(base ? ["--base", base] : [])]);
  const control = transition(current, "in-progress");
  control.approved = { at: new Date().toISOString(), commit: git(root, ["rev-parse", "HEAD"], { quiet: true }), requirements };
  writeControl(dir, control);
  noteQuietly(root, { event: "approved", spec: control.id, summary: `${control.key} · draft -> in-progress` });
  return { spec: control.id, status: control.status, approved: control.approved };
}

const describe = (entry) => `${entry.kind} r${entry.revision} ${entry.status} at ${entry.at} (${entry.commit.slice(0, 12)})`;

/** A human summary of control.json; `--json` prints the raw record. */
export function show(argv) {
  const { spec: input, json } = parseArgs(argv, { positional: ["spec"], flags: { json: "boolean" } });
  const { dir } = resolveSpecDir(findRoot(), input);
  const control = readControl(dir);
  if (json) return control;
  const lines = [
    `${control.key}  [${control.status}]`,
    `branch     ${control.branch}`,
    `created    ${control.created_at}`,
    `approved   ${control.approved ? `${control.approved.at} (${control.approved.commit.slice(0, 12)})` : "no"}`,
    `blocked    ${control.blocked ? `${control.blocked.reason} (since ${control.blocked.at})` : "no"}`,
    `shipped    ${control.shipped ? `${control.shipped.version} at ${control.shipped.at}` : "no"}`,
    `evaluations${control.evaluations.length ? "" : " none"}`,
    ...control.evaluations.map((entry) => `  ${describe(entry)}`),
  ];
  process.stdout.write(`${lines.join("\n")}\n`);
  return undefined;
}

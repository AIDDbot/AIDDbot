import fs from "node:fs";
import path from "node:path";
import { parseArgs, RuleError } from "../lib/cli.mjs";
import { readControl } from "../lib/control.mjs";
import { countersFile, parseCounters } from "../lib/counters.mjs";
import { currentBranch, defaultBranch, git } from "../lib/git.mjs";
import { productPath, relative } from "../lib/paths.mjs";
import { findRoot } from "../lib/root.mjs";
import { readSpecFields, resolveSpecDir, SPEC_TYPES } from "../lib/spec.mjs";

function checkIdentity(spec, branch, control) {
  const identity = /^(S\d{4})-([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(spec.key);
  if (!identity || spec.id !== identity[1] || spec.slug !== identity[2]) throw new RuleError("Spec id, slug, and key do not agree.");
  if (!SPEC_TYPES.includes(spec.type) || spec.branch !== `${spec.type}/${spec.key}`) throw new RuleError("Spec type, branch, and key do not agree.");
  if (control.id !== spec.id || control.branch !== spec.branch) throw new RuleError("Spec frontmatter does not match control.json.");
  if (!["draft", "in-progress"].includes(control.status)) throw new RuleError(`Unexpected pre-approval spec status: ${control.status}`);
  if (branch !== spec.branch) throw new RuleError(`Current branch ${branch} does not match spec branch ${spec.branch}.`);
}

function requirements(text, label) {
  const result = new Map();
  for (const line of text.split(/\r?\n/)) {
    if (!/\*\*[FT]\d{4}\*\*/.test(line)) continue;
    const match = /^- \*\*([FT]\d{4})\*\*: (\S.*)$/.exec(line);
    if (!match) throw new RuleError(`${label} has a malformed requirement line: ${line}`);
    if (result.has(match[1])) throw new RuleError(`${label} repeats requirement ${match[1]}.`);
    result.set(match[1], match[2]);
  }
  return result;
}

function verificationRows(text) {
  const heading = /^## Verification\s*$/m.exec(text);
  if (!heading) throw new RuleError("Spec is missing the Verification section.");
  const tail = text.slice(heading.index + heading[0].length);
  const next = /^## /m.exec(tail);
  const result = new Map();
  for (const line of (next ? tail.slice(0, next.index) : tail).split(/\r?\n/)) {
    const match = /^\|\s*([FT]\d{4})\s*\|\s*(new|changed|deprecated|related)\s*\|/i.exec(line);
    if (!match) continue;
    if (result.has(match[1])) throw new RuleError(`Verification table repeats ${match[1]}.`);
    result.set(match[1], match[2].toLowerCase());
  }
  return result;
}

const hasEarsKeywords = (content) => /\b(?:IF|WHEN|WHILE|WHERE|SHALL)\b/.test(content) && !/\b(?:if|when|while|where|shall)\b/.test(content);

function checkRequirements(current, previous, rows, counters, baseCounters) {
  for (const [id, content] of current) {
    const prior = previous.get(id);
    const change = rows.get(id);
    if (!prior) {
      if (change !== "new") throw new RuleError(`New PRD requirement ${id} needs a 'new' verification row.`);
      const key = id.startsWith("F") ? "functional" : "technical";
      const number = Number(id.slice(1));
      if (number <= baseCounters[key] || number > counters[key]) throw new RuleError(`New requirement ${id} is outside this branch's reserved ID range.`);
    } else if (prior !== content && change !== "changed") throw new RuleError(`Changed requirement ${id} needs a 'changed' verification row.`);
    if ((!prior || prior !== content) && !hasEarsKeywords(content)) throw new RuleError(`New or changed requirement ${id} must contain uppercase EARS keywords.`);
  }
  for (const id of previous.keys()) if (!current.has(id)) throw new RuleError(`Requirement ${id} was removed before shipping; keep deprecated requirements in the PRD.`);
  for (const id of rows.keys()) if (!current.has(id)) throw new RuleError(`Verification row ${id} does not exist in the PRD.`);
}

export default function specCheck(argv) {
  const args = parseArgs(argv, { positional: ["specDir"], flags: { base: "string" } });
  const root = findRoot();
  const { dir: specDir, file: specFile } = resolveSpecDir(root, args.specDir);
  const prdFile = productPath(root, "specs", "PRD.md");
  const counterFile = countersFile(root);
  for (const file of [prdFile, counterFile]) if (!fs.existsSync(file)) throw new RuleError(`Required file is missing: ${relative(root, file)}`);
  const base = defaultBranch(root, args.base ?? null);
  const text = fs.readFileSync(specFile, "utf8");
  const spec = readSpecFields(specFile, ["id", "slug", "key", "type", "branch"]);
  checkIdentity(spec, currentBranch(root), readControl(specDir));
  const countersBase = parseCounters(git(root, ["show", `${base}:.aiddbot/counters.yaml`], { quiet: true }));
  const countersNow = parseCounters(fs.readFileSync(counterFile, "utf8"));
  const number = Number(spec.id.slice(1));
  if (number <= countersBase.spec || number !== countersNow.spec) throw new RuleError(`Spec ID ${spec.id} is not reserved by this branch's counters.`);
  const rows = verificationRows(text);
  const current = requirements(fs.readFileSync(prdFile, "utf8"), "PRD");
  const previous = requirements(git(root, ["show", `${base}:${relative(root, prdFile)}`], { quiet: true }), "Base PRD");
  checkRequirements(current, previous, rows, countersNow, countersBase);
  return { spec: spec.id, branch: spec.branch, requirements: current.size, verificationRows: rows.size, valid: true };
}

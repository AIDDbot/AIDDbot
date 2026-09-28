import fs from "node:fs";
import { parseArgs, RuleError } from "../lib/cli.mjs";
import { readControl } from "../lib/control.mjs";
import { countersFile, parseCounters } from "../lib/counters.mjs";
import { currentBranch, defaultBranch, git } from "../lib/git.mjs";
import { relative } from "../lib/paths.mjs";
import { checkRequirements } from "../lib/requirements.mjs";
import { findRoot } from "../lib/root.mjs";
import { isSlug, readSpecFields, resolveSpecDir, SPEC_TYPES } from "../lib/spec.mjs";

function checkIdentity(spec, branch, control) {
  const identity = /^(S\d{4})-([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(spec.key);
  if (!identity || spec.id !== identity[1] || spec.slug !== identity[2]) throw new RuleError("Spec id, slug, and key do not agree.");
  if (!SPEC_TYPES.includes(spec.type) || spec.branch !== `${spec.type}/${spec.key}`) throw new RuleError("Spec type, branch, and key do not agree.");
  if (!isSlug(spec.domain)) throw new RuleError(`Spec domain must be lowercase kebab-case: ${spec.domain}`);
  if (control.id !== spec.id || control.branch !== spec.branch) throw new RuleError("Spec frontmatter does not match control.json.");
  if (!["draft", "in-progress"].includes(control.status)) throw new RuleError(`Unexpected pre-approval spec status: ${control.status}`);
  if (branch !== spec.branch) throw new RuleError(`Current branch ${branch} does not match spec branch ${spec.branch}.`);
}

/** Validate a spec: identity, domain, its reserved ID, and its requirements (D16, D17, D25). */
export default function specCheck(argv) {
  const args = parseArgs(argv, { positional: ["specDir"], flags: { base: "string" } });
  const root = findRoot();
  const { dir: specDir, file: specFile } = resolveSpecDir(root, args.specDir);
  const counterFile = countersFile(root);
  if (!fs.existsSync(counterFile)) throw new RuleError(`Required file is missing: ${relative(root, counterFile)}`);
  const base = defaultBranch(root, args.base ?? null);
  const spec = readSpecFields(specFile, ["id", "slug", "key", "type", "branch", "domain"]);
  const control = readControl(specDir);
  checkIdentity(spec, currentBranch(root), control);
  const countersBase = parseCounters(git(root, ["show", `${base}:.aiddbot/counters.yaml`], { quiet: true }));
  const countersNow = parseCounters(fs.readFileSync(counterFile, "utf8"));
  const number = Number(spec.id.slice(1));
  if (number <= countersBase.spec || number !== countersNow.spec) throw new RuleError(`Spec ID ${spec.id} is not reserved by this branch's counters.`);
  const content = checkRequirements(root, fs.readFileSync(specFile, "utf8"), { id: spec.id, type: spec.type, approved: control.approved?.requirements ?? [] });
  return { spec: spec.id, branch: spec.branch, domain: spec.domain, ...content, valid: true };
}

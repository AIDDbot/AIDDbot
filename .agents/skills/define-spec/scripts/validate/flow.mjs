import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "./args.mjs";
import { baseBranch, findRoot, git } from "./repository.mjs";
import { counters, parseFields, requirements, verificationRows } from "./records.mjs";
import { checkRequirements } from "./requirements.mjs";

function checkIdentity(spec, branch) {
  const identity = /^(S\d{4})-([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(spec.key);
  if (!identity || spec.id !== identity[1] || spec.slug !== identity[2]) throw new Error("Spec id, slug, and key do not agree.");
  if (!["feat", "fix", "refactor", "chore"].includes(spec.type) || spec.branch !== `${spec.type}/${spec.key}`) throw new Error("Spec type, branch, and key do not agree.");
  if (!["draft", "in-progress"].includes(spec.status)) throw new Error(`Unexpected pre-approval spec status: ${spec.status}`);
  if (branch !== spec.branch) throw new Error(`Current branch ${branch} does not match spec branch ${spec.branch}.`);
}

function readRecords(root, args) {
  const product = path.resolve(root, args.product);
  const specFile = path.join(path.resolve(root, args.specDir), "spec.md");
  const prdFile = path.join(product, "specs", "PRD.md");
  const counterFile = path.join(root, ".aiddbot", "counters.yaml");
  for (const file of [specFile, prdFile, counterFile]) if (!fs.existsSync(file)) throw new Error(`Required file is missing: ${path.relative(root, file)}`);
  const base = baseBranch(root, args.base);
  const countersBase = counters(git(root, ["show", `${base}:.aiddbot/counters.yaml`]));
  return { specFile, prdFile, counterFile, base, countersBase };
}

function compareRequirements(root, files, specText, spec) {
  const pathInRepo = (file) => path.relative(root, file).split(path.sep).join("/");
  const oldPrd = git(root, ["show", `${files.base}:${pathInRepo(files.prdFile)}`]);
  const current = requirements(fs.readFileSync(files.prdFile, "utf8"), "PRD");
  const previous = requirements(oldPrd, "Base PRD");
  const countersNow = counters(fs.readFileSync(files.counterFile, "utf8"));
  const countersBase = files.countersBase;
  checkRequirements(current, previous, verificationRows(specText), countersNow, countersBase);
  return current.size;
}

export function validateSpec(argv) {
  const args = parseArgs(argv);
  const root = findRoot();
  if (!root) throw new Error("Could not find the project root.");
  const files = readRecords(root, args);
  const text = fs.readFileSync(files.specFile, "utf8");
  const spec = parseFields(text);
  checkIdentity(spec, git(root, ["branch", "--show-current"]));
  const branchCounter = files.countersBase;
  const currentCounter = counters(fs.readFileSync(files.counterFile, "utf8"));
  const number = Number(spec.id.slice(1));
  if (number <= branchCounter.spec || number !== currentCounter.spec) throw new Error(`Spec ID ${spec.id} is not reserved by this branch's counters.`);
  const requirementsCount = compareRequirements(root, files, text, spec);
  process.stdout.write(`${JSON.stringify({ spec: spec.id, branch: spec.branch, requirements: requirementsCount, verificationRows: verificationRows(text).size, valid: true }, null, 2)}\n`);
}

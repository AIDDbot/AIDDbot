import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs, RuleError, UsageError } from "../lib/cli.mjs";
import { createControl, writeControl } from "../lib/control.mjs";
import { countersFile, makeId, parseCounters, setCounters, writeCounters } from "../lib/counters.mjs";
import { currentBranch, git, isClean, localBranches } from "../lib/git.mjs";
import { productPath, relative } from "../lib/paths.mjs";
import { noteQuietly } from "../lib/journal.mjs";
import { findRoot } from "../lib/root.mjs";
import { SPEC_TYPES, specsDir } from "../lib/spec.mjs";

const TEMPLATE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "skills", "define-spec", "assets", "spec.template.md");

function options(argv) {
  const args = parseArgs(argv, { positional: ["type", "slug", "title"], flags: { functional: "int", technical: "int" } });
  if (!SPEC_TYPES.includes(args.type)) throw new UsageError(`Invalid type: ${args.type}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(args.slug)) throw new UsageError(`Slug must be lowercase kebab-case: ${args.slug}`);
  if (!args.title.trim() || /[\r\n]/.test(args.title)) throw new UsageError("Title must be non-empty and on one line.");
  return { type: args.type, slug: args.slug, title: args.title.trim(), functional: args.functional ?? 0, technical: args.technical ?? 0 };
}

function checkRecords(root) {
  const model = productPath(root, "model", "model.schema.md");
  if (!fs.existsSync(model)) throw new RuleError(`Product model schema missing under ${relative(root, path.dirname(model))}; run outline-system first.`);
  const required = [countersFile(root), productPath(root, "specs", "PRD.md"), productPath(root, "quality", "TDR.md")];
  const missing = required.filter((file) => !fs.existsSync(file));
  if (missing.length) throw new RuleError(`Required records are missing; run aiddbot init: ${missing.map((file) => relative(root, file)).join(", ")}`);
}

function checkBranch(root, branch, specDir) {
  if (!currentBranch(root)) throw new RuleError("Cannot prepare a spec from a detached HEAD.");
  const all = git(root, ["branch", "--all", "--format=%(refname:short)"], { quiet: true }).split(/\r?\n/);
  if (localBranches(root).includes(branch) || all.some((name) => name.endsWith(`/${branch}`))) throw new RuleError(`Spec branch already exists: ${branch}`);
  if (fs.existsSync(specDir)) throw new RuleError(`Spec directory already exists: ${relative(root, specDir)}`);
}

function writeSpec(file, spec, identity) {
  const content = fs.readFileSync(TEMPLATE, "utf8").replaceAll("S0001", identity.id).replaceAll("{slug}", spec.slug)
    .replaceAll("{title}", spec.title).replace(/^type: feat/m, `type: ${spec.type}`)
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

export default function specNew(argv) {
  const spec = options(argv);
  const root = findRoot();
  checkRecords(root);
  const countersText = fs.readFileSync(countersFile(root), "utf8");
  const counters = parseCounters(countersText);
  const number = counters.spec + 1;
  const id = makeId("S", number);
  const key = `${id}-${spec.slug}`;
  const branch = `${spec.type}/${key}`;
  const dir = path.join(specsDir(root), key);
  checkBranch(root, branch, dir);
  if (!isClean(root)) throw new RuleError("Pending changes on the current branch; commit or stash them before preparing a spec.");
  git(root, ["switch", "-c", branch]);
  writeCounters(root, setCounters(countersText, { spec: number, functional: counters.functional + spec.functional, technical: counters.technical + spec.technical }));
  const file = path.join(dir, "spec.md");
  writeSpec(file, spec, { id });
  writeControl(dir, createControl({ id, key, type: spec.type, branch }));
  noteQuietly(root, { event: "created", spec: id, summary: `${branch} · ${spec.title}` });
  const ids = (kind, start, count) => Array.from({ length: count }, (_, index) => makeId(kind, start + index + 1));
  return {
    branch, spec: id, file: relative(root, file), control: relative(root, path.join(dir, "control.json")),
    functional: ids("F", counters.functional, spec.functional),
    technical: ids("T", counters.technical, spec.technical), status: "draft",
  };
}

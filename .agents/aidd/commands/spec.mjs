// `aidd spec new|show`: create a spec on its own branch, or show its state and gate.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { commitPaths, git, journal, nextId, relative, RuleError, UsageError } from "../lib/core.mjs";
import { gate, readControl, requireSpec, specsDir, TYPES, writeControl } from "../lib/spec.mjs";

const template = (name) => fileURLToPath(new URL(`../../skills/define-spec/assets/${name}.md`, import.meta.url));
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function create(root, [type, slug, title], flags) {
  if (!TYPES.includes(type)) throw new UsageError(`Type must be one of: ${TYPES.join(", ")}.`);
  if (!SLUG.test(slug ?? "")) throw new UsageError("Slug must be lowercase kebab-case, like user-login.");
  if (!title?.trim()) throw new UsageError('Give a title: aidd spec new feat user-login "User login".');
  const open = git(root, ["branch", "--list", "--format=%(refname:short)", ...TYPES.map((kind) => `${kind}/S*`)]);
  if (open) throw new RuleError(`${open.split("\n")[0]} is still in progress; ship it with aidd release or delete that branch first.`);
  const domain = typeof flags.domain === "string" && SLUG.test(flags.domain) ? flags.domain : "general";
  const id = nextId(root, "S");
  const key = `${id}-${slug}`;
  const branch = `${type}/${key}`;
  git(root, ["switch", "-c", branch]);
  const dir = path.join(specsDir(root), key);
  const spec = fs.readFileSync(template(type === "feat" ? "spec.template" : "spec.fix.template"), "utf8")
    .replaceAll("S0001", id).replaceAll("{slug}", slug).replaceAll("{title}", title.trim())
    .replaceAll("{domain}", domain).replace("type: feat", `type: ${type}`).replace("branch: feat/", `branch: ${type}/`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "spec.md"), spec, "utf8");
  const control = {
    id, key, type, title: title.trim(), domain, branch,
    status: "in-progress", created: new Date().toISOString(), evaluations: [], shipped: null,
  };
  writeControl(dir, control);
  commitPaths(root, [".aiddbot/counters.yaml"], `chore(spec): reserve ${id}`);
  journal(root, { event: "created", spec: id, summary: `${branch} · ${control.title}` });
  return { spec: id, branch, file: relative(root, path.join(dir, "spec.md")) };
}

function show(root, [input]) {
  const dir = requireSpec(root, input);
  const control = readControl(dir);
  return { ...control, blockers: gate(root, dir, control) };
}

export default function spec(root, [action, ...args], flags) {
  if (action === "new") return create(root, args, flags);
  if (action === "show") return show(root, args);
  throw new UsageError("Use: aidd spec new <type> <slug> <title> [--domain <d>] | aidd spec show [<id>]");
}

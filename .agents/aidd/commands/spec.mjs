// `aidd spec new|debt|show`: create a spec on its own branch, from a request or from a debt item, or show its state and gate.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { aiddbotPath, commitPaths, git, journal, nextId, readJson, relative, RuleError, UsageError } from "../lib/core.mjs";
import { gate, readControl, requireSpec, SPEC_DEFINED, specDir, TYPES, writeControl } from "../lib/spec.mjs";

const template = (name) => fileURLToPath(new URL(`../../skills/define-spec/assets/${name}.md`, import.meta.url));
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SLUG_WORDS = 4;
/** A request defines a `feat`, a `fix`, or a `chore`; a `refactor` comes only from debt. */
const REQUESTED = ["feat", "fix", "chore"];
/** The type of the spec that repairs each debt level; low debt is a patch, with no spec. */
const FROM_DEBT = { high: "fix", medium: "refactor" };

/** Open the branch and the folder of a new spec, reserve its ID, and write its `spec.md` from `text(id, branch)`. */
function open(root, type, slug, title, domain, text) {
  const busy = git(root, ["branch", "--list", "--format=%(refname:short)", ...TYPES.map((kind) => `${kind}/S*`)]);
  if (busy) throw new RuleError(`${busy.split("\n")[0]} is still in progress; ship it with aidd release or delete that branch first.`);
  const id = nextId(root, "S");
  const key = `${id}-${slug}`;
  const branch = `${type}/${key}`;
  git(root, ["switch", "-c", branch]);
  const dir = specDir(root, type, key);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "spec.md"), text(id, key, branch), "utf8");
  writeControl(root, { key, created: new Date().toISOString(), evaluations: [], runs: {} });
  commitPaths(root, [".aiddbot/counters.yaml"], `chore(spec): reserve ${id}`);
  journal(root, { event: "created", spec: id, summary: `${branch} · ${title}` });
  return { spec: id, branch, file: relative(root, path.join(dir, "spec.md")) };
}

const domainOf = (flags) => (typeof flags.domain === "string" && SLUG.test(flags.domain) ? flags.domain : "general");

function create(root, [type, slug, title], flags) {
  if (!REQUESTED.includes(type)) throw new UsageError(`Type must be one of: ${REQUESTED.join(", ")}. A refactor comes from medium debt: aidd spec debt <D ID>.`);
  if (!SLUG.test(slug ?? "")) throw new UsageError("Slug must be lowercase kebab-case, like user-login.");
  if (!title?.trim()) throw new UsageError('Give a title: aidd spec new feat user-login "User login".');
  const domain = domainOf(flags);
  return open(root, type, slug, title.trim(), domain, (id) => fs.readFileSync(template(type === "feat" ? "spec.template" : "spec.fix.template"), "utf8")
    .replaceAll("S0001", id).replaceAll("{slug}", slug).replaceAll("{title}", title.trim())
    .replaceAll("{domain}", domain).replace("type: feat", `type: ${type}`).replace("branch: feat/", `branch: ${type}/`));
}

/** The slug of a debt title: its first words in kebab-case, or the item ID when no word is left. */
function slugOf(item) {
  const words = item.title.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, " ").trim().split(" ").filter(Boolean);
  return words.slice(0, SLUG_WORDS).join("-") || item.id.toLowerCase();
}

/** The minimal spec of a debt item: the item is its definition, so no model writes it. */
function debtSpec(item, type, domain) {
  const check = type === "refactor"
    ? `The check that reported ${item.id} passes, and the regression of the release passes.`
    : `The review of this fix shows that ${item.id} is gone, and the regression of the release passes.`;
  return (id, key, branch) => [
    "---", `id: ${id}`, `slug: ${key.slice(6)}`, `key: ${key}`, `type: ${type}`, `branch: ${branch}`, `domain: ${domain}`, "---",
    `# ${key} — ${item.title}`, "", "## Problem", "", item.evidence || item.title, "",
    "## Verification", "", check, "", "## Technical debt", "", `- ${item.id} — ${item.title}`, "",
  ].join("\n");
}

/** `spec debt <D ID>`: the minimal spec that repairs one debt item. A `refactor` (medium) is defined at once; a `fix` (high) waits for the approval of the item. */
function fromDebt(root, [id], flags) {
  if (!id) throw new UsageError("Give a debt item: aidd spec debt D0007.");
  const item = readJson(aiddbotPath(root, "debt.json"), { items: [] }).items.find((entry) => entry.id === id);
  if (!item) throw new RuleError(`No open debt item ${id}; see aidd debt list.`);
  const type = FROM_DEBT[item.priority];
  if (!type) throw new RuleError(`${item.id} is low debt: repair it as a patch, with no spec and no branch.`);
  const domain = domainOf(flags);
  const created = open(root, type, slugOf(item), item.title, domain, debtSpec(item, type, domain));
  if (type === "fix") return { ...created, debt: item.id, approved: false };
  commitPaths(root, [created.file], SPEC_DEFINED);
  journal(root, { event: "committed", spec: created.spec, summary: `${SPEC_DEFINED} from ${item.id}` });
  return { ...created, debt: item.id, approved: true };
}

function show(root, [input]) {
  const dir = requireSpec(root, input);
  const control = readControl(root, dir);
  return { ...control, blockers: gate(root, dir, control) };
}

export default function spec(root, [action, ...args], flags) {
  if (action === "new") return create(root, args, flags);
  if (action === "debt") return fromDebt(root, args, flags);
  if (action === "show") return show(root, args);
  throw new UsageError("Use: aidd spec new <feat|fix|chore> <slug> <title> [--domain <d>] | aidd spec debt <D ID> [--domain <d>] | aidd spec show [<id>]");
}

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
/** The most items that one refactor repairs: a larger one is harder to review and to revert. */
const MAX_GROUP = 5;

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

/** The minimal spec of debt items: the items are its definition, so no model writes it.
 *  A failing test that an item names (`@S0042-R03`) goes into the spec, so that the verification of the fix runs it again. */
function debtSpec(items, type, domain) {
  const [first] = items;
  const ids = items.map((item) => item.id).join(", ");
  const tags = [...new Set(items.flatMap((item) => `${item.title} ${item.evidence ?? ""}`.match(/\bS\d{4}-R\d{2}\b/g) ?? []))].map((requirement) => `@${requirement}`);
  const check = type === "refactor" ? `The check that reported ${ids} passes, and the regression of the release passes.`
    : tags.length ? `The acceptance tests ${tags.join(", ")} pass again, and the regression of the release passes.`
    : `The review of this fix shows that ${ids} is gone, and the regression of the release passes.`;
  const problem = items.length === 1 ? [first.evidence || first.title] : items.map((item) => `- ${item.id}: ${item.evidence || item.title}`);
  return (id, key, branch) => [
    "---", `id: ${id}`, `slug: ${key.slice(6)}`, `key: ${key}`, `type: ${type}`, `branch: ${branch}`, `domain: ${domain}`, "---",
    `# ${key} — ${first.title}${items.length > 1 ? ` and ${items.length - 1} more` : ""}`, "", "## Problem", "", ...problem, "",
    "## Verification", "", check, "", "## Technical debt", "", ...items.map((item) => `- ${item.id} — ${item.title}`), "",
  ].join("\n");
}

/** The one project whose folder the item names in its title or evidence, such as `cli/src/core/…`; null for none or several. */
function projectOf(projects, item) {
  const text = `${item.title} ${item.evidence ?? ""}`.replaceAll("\\", "/");
  const named = Object.entries(projects).filter(([, project]) => project.path && project.path !== "." && text.includes(`${project.path.replace(/[\\/]+$/, "")}/`));
  return named.length === 1 ? named[0][0] : null;
}

/** The items that one refactor repairs: the given item, and the other open `medium` items of its project, by D ID, at most MAX_GROUP.
 *  The rule is mechanical, so no one judges which items go together; a `fix` repairs one item, because each one needs its approval. */
function groupOf(root, item, items) {
  if (item.priority !== "medium") return [item];
  const projects = readJson(aiddbotPath(root, "config.json"), { projects: {} }).projects ?? {};
  const project = projectOf(projects, item);
  if (!project) return [item];
  const others = items.filter((entry) => entry.id !== item.id && entry.priority === "medium" && projectOf(projects, entry) === project);
  return [item, ...others.sort((a, b) => a.id.localeCompare(b.id))].slice(0, MAX_GROUP);
}

/** `spec debt <D ID>`: the minimal spec that repairs a debt item. A `refactor` (medium) is defined at once and also repairs the other medium items of the same project;
 *  a `fix` (high) repairs one item and waits for its approval. */
function fromDebt(root, [id], flags) {
  if (!id) throw new UsageError("Give a debt item: aidd spec debt D0007.");
  const items = readJson(aiddbotPath(root, "debt.json"), { items: [] }).items;
  const item = items.find((entry) => entry.id === id);
  if (!item) throw new RuleError(`No open debt item ${id}; see aidd debt list.`);
  const type = FROM_DEBT[item.priority];
  if (!type) throw new RuleError(`${item.id} is low debt: repair it as a patch, with no spec and no branch.`);
  const domain = domainOf(flags);
  const group = groupOf(root, item, items);
  const debt = group.map((entry) => entry.id);
  const created = open(root, type, slugOf(item), item.title, domain, debtSpec(group, type, domain));
  if (type === "fix") return { ...created, debt, approved: false };
  commitPaths(root, [created.file], SPEC_DEFINED);
  journal(root, { event: "committed", spec: created.spec, summary: `${SPEC_DEFINED} from ${debt.join(", ")}` });
  return { ...created, debt, approved: true };
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

// `aidd spec new|debt|show`: create a spec on its own branch, from a request or from a debt item, or show its state and gate.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { aiddbotPath, commitPaths, git, journal, nextId, readJson, relative, RuleError, UsageError } from "../lib/core.mjs";
import { gate, readControl, requireSpec, SPEC_DEFINED, specFile, TYPES, writeControl } from "../lib/spec.mjs";

const template = (name) => fileURLToPath(new URL(`../../skills/define-spec/assets/${name}.md`, import.meta.url));
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SLUG_WORDS = 4;
/** A request defines a `feat`, a `fix`, or a `chore`; a `refactor` comes only from debt. */
const REQUESTED = ["feat", "fix", "chore"];
/** The type of the spec that repairs each debt level; low debt is a patch, with no spec. */
const FROM_DEBT = { high: "fix", medium: "refactor" };
/** The most items that one debt spec repairs: a larger one is harder to review and to revert. */
const MAX_GROUP = 5;

/** Open the branch and the file of a new spec, reserve its ID, and write the file from `text(id, key, branch)`. */
function open(root, type, slug, title, domain, text) {
  const busy = git(root, ["branch", "--list", "--format=%(refname:short)", ...TYPES.map((kind) => `${kind}/S*`)]);
  if (busy) throw new RuleError(`${busy.split("\n")[0]} is still in progress; ship it with aidd release or delete that branch first.`);
  const id = nextId(root, "S");
  const key = `${id}-${slug}`;
  const branch = `${type}/${key}`;
  git(root, ["switch", "-c", branch]);
  const file = specFile(root, type, key);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text(id, key, branch), "utf8");
  writeControl(root, { key, created: new Date().toISOString(), evaluations: [], runs: {} });
  commitPaths(root, [".aiddbot/counters.yaml"], `chore(spec): reserve ${id}`);
  journal(root, { event: "created", spec: id, summary: `${branch} · ${title}` });
  return { spec: id, branch, file: relative(root, file) };
}

const domainOf = (flags) => (typeof flags.domain === "string" && SLUG.test(flags.domain) ? flags.domain : "general");

function create(root, [type, slug, title], flags) {
  if (!REQUESTED.includes(type)) throw new UsageError(`Type must be one of: ${REQUESTED.join(", ")}. A refactor comes from medium debt: aidd spec debt <D ID>.`);
  if (!SLUG.test(slug ?? "")) throw new UsageError("Slug must be lowercase kebab-case, like user-login.");
  if (!title?.trim()) throw new UsageError('Give a title: aidd spec new feat user-login "User login".');
  const domain = domainOf(flags);
  if (typeof flags.from === "string") return open(root, type, slug, title.trim(), domain, fromFile(root, { file: flags.from, type, slug, domain }));
  return open(root, type, slug, title.trim(), domain, (id) => fs.readFileSync(template(type === "feat" ? "spec.template" : "spec.fix.template"), "utf8")
    .replaceAll("S0001", id).replaceAll("{slug}", slug).replaceAll("{title}", title.trim())
    .replaceAll("{domain}", domain).replace("type: feat", `type: ${type}`).replace("branch: feat/", `branch: ${type}/`));
}

/** A spec written before the system, such as a foundation spec of an archetype: its text with the frontmatter, `{id}` as the ID, and no leading comment.
 *  No model writes it, so it skips define-spec; the caller still approves it with `aidd log approved`, which checks its size. */
function fromFile(root, { file, type, slug, domain }) {
  const source = path.resolve(root, file);
  if (!fs.existsSync(source)) throw new UsageError(`No spec file ${file}.`);
  const body = fs.readFileSync(source, "utf8").replace(/^\s*<!--[\s\S]*?-->\s*/, "");
  if (!body.startsWith("# {id}-")) throw new RuleError(`${file} must start with the heading "# {id}-${slug} — <title>".`);
  return (id, key, branch) => ["---", `id: ${id}`, `slug: ${slug}`, `key: ${key}`, `type: ${type}`, `branch: ${branch}`, `domain: ${domain}`, "---", body.replaceAll("{id}", id)].join("\n");
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
    : `The review of this fix shows that ${ids} ${items.length > 1 ? "are" : "is"} gone, and the regression of the release passes.`;
  const problem = items.length === 1 ? [first.evidence || first.title] : items.map((item) => `- ${item.id}: ${item.evidence || item.title}`);
  return (id, key, branch) => [
    "---", `id: ${id}`, `slug: ${key.slice(6)}`, `key: ${key}`, `type: ${type}`, `branch: ${branch}`, `domain: ${domain}`, "---",
    `# ${key} — ${first.title}${items.length > 1 ? ` and ${items.length - 1} more` : ""}`, "", "## Problem", "", ...problem, "",
    "## Verification", "", check, "", "## Technical debt", "", ...items.map((item) => `- ${item.id} — ${item.title}`), "",
  ].join("\n");
}

/** The items that one debt spec repairs: the given item, and the other open items of its priority and its project, by D ID, at most MAX_GROUP.
 *  The rule is mechanical, so no one judges which items go together. An item with no project goes alone. */
function groupOf(item, items) {
  if (!item.project) return [item];
  const others = items.filter((entry) => entry.id !== item.id && entry.priority === item.priority && entry.project === item.project);
  return [item, ...others.sort((a, b) => a.id.localeCompare(b.id))].slice(0, MAX_GROUP);
}

/** `spec debt <D ID>`: the minimal spec that repairs a debt item and the other items of its priority and project: a `fix` (high) or a `refactor` (medium).
 *  The items are its definition, from evidence, so it is approved at once (Halloween D48); a product question still stops the delivery. */
function fromDebt(root, [id], flags) {
  if (!id) throw new UsageError("Give a debt item: aidd spec debt D0007.");
  const items = readJson(aiddbotPath(root, "debt.json"), { items: [] }).items;
  const item = items.find((entry) => entry.id === id);
  if (!item) throw new RuleError(`No open debt item ${id}; see aidd debt list.`);
  const type = FROM_DEBT[item.priority];
  if (!type) throw new RuleError(`${item.id} is low debt: repair it as a patch, with no spec and no branch.`);
  const domain = domainOf(flags);
  const group = groupOf(item, items);
  const debt = group.map((entry) => entry.id);
  const created = open(root, type, slugOf(item), item.title, domain, debtSpec(group, type, domain));
  commitPaths(root, [created.file], SPEC_DEFINED);
  journal(root, { event: "committed", spec: created.spec, summary: `${SPEC_DEFINED} from ${debt.join(", ")}` });
  return { ...created, debt, approved: true };
}

function show(root, [input]) {
  const file = requireSpec(root, input);
  const control = readControl(root, file);
  return { ...control, blockers: gate(root, file, control) };
}

export default function spec(root, [action, ...args], flags) {
  if (action === "new") return create(root, args, flags);
  if (action === "debt") return fromDebt(root, args, flags);
  if (action === "show") return show(root, args);
  throw new UsageError("Use: aidd spec new <feat|fix|chore> <slug> <title> [--domain <d>] | aidd spec debt <D ID> [--domain <d>] | aidd spec show [<id>]");
}

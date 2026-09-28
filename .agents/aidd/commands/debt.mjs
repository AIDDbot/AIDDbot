import fs from "node:fs";
import { parseArgs, RuleError, UsageError } from "../lib/cli.mjs";
import { latestEvaluation, readControl } from "../lib/control.mjs";
import { readConfig } from "../lib/config.mjs";
import { countersFile, makeId, parseCounters, setCounters, writeCounters } from "../lib/counters.mjs";
import { PRIORITIES, readDebt, SOURCE, STATES, writeDebt } from "../lib/debt.mjs";
import { git } from "../lib/git.mjs";
import { noteQuietly } from "../lib/journal.mjs";
import { section } from "../lib/requirements.mjs";
import { findRoot } from "../lib/root.mjs";
import { resolveSpecDir } from "../lib/spec.mjs";

const TEXT = { title: "string", scope: "string", evidence: "string", impact: "string" };

function oneLine(name, value) {
  const text = value?.trim();
  if (!text || /[\r\n]/.test(text)) throw new UsageError(`--${name} must be one non-empty line.`);
  return text;
}

function checkSource(source) {
  if (!SOURCE.test(source)) throw new UsageError(`--source must be a spec report such as S0042-login/verification.md, or quality:<project>; got ${source}`);
  return source;
}

const confirmation = (root, source) => ({ at: new Date().toISOString(), commit: git(root, ["rev-parse", "HEAD"], { quiet: true }), source });

function find(debt, id) {
  const item = debt.items.find((entry) => entry.id === id);
  if (!item) throw new RuleError(`No open debt item ${id}.`);
  return item;
}

/** Register a new item with the next D ID from the counters (D9). */
export function add(argv) {
  const args = parseArgs(argv, { flags: { ...TEXT, priority: "string", source: "string" } });
  const item = Object.fromEntries(Object.keys(TEXT).map((name) => [name, oneLine(name, args[name])]));
  if (!PRIORITIES.includes(args.priority)) throw new UsageError(`--priority must be ${PRIORITIES.join(", ")}.`);
  const source = checkSource(args.source ?? "");
  const root = findRoot();
  const debt = readDebt(root);
  const countersText = fs.readFileSync(countersFile(root), "utf8");
  const number = parseCounters(countersText).debt + 1;
  const id = makeId("D", number);
  const entry = { id, ...item, priority: args.priority, state: "confirmed", origin: source.startsWith("quality:") ? "scan" : source.slice(0, 5), confirmed: confirmation(root, source) };
  debt.items.push(entry);
  writeDebt(root, debt);
  writeCounters(root, setCounters(countersText, { debt: number }));
  noteQuietly(root, { event: "debt", status: "amber", spec: entry.origin === "scan" ? null : entry.origin, summary: `${id} ${args.priority}: ${item.title}` });
  return entry;
}

/** Change an item; a `--source` records a fresh confirmation, and `--state not-revalidated` keeps the last one. */
export function update(argv) {
  const args = parseArgs(argv, { positional: ["id"], flags: { ...TEXT, priority: "string", state: "string", source: "string" } });
  const root = findRoot();
  const debt = readDebt(root);
  const item = find(debt, args.id);
  for (const name of Object.keys(TEXT)) if (args[name] !== undefined) item[name] = oneLine(name, args[name]);
  if (args.priority !== undefined) {
    if (!PRIORITIES.includes(args.priority)) throw new UsageError(`--priority must be ${PRIORITIES.join(", ")}.`);
    item.priority = args.priority;
  }
  if (args.state !== undefined && !STATES.includes(args.state)) throw new UsageError(`--state must be ${STATES.join(", ")}.`);
  if (args.state === "confirmed" && args.source === undefined) throw new UsageError("Confirming an item needs the --source of the new evidence.");
  if (args.source !== undefined) {
    if (args.state === "not-revalidated") throw new UsageError("A not-revalidated item has no new evidence; drop --source.");
    item.confirmed = confirmation(root, checkSource(args.source));
    item.state = "confirmed";
  }
  if (args.state === "not-revalidated") item.state = "not-revalidated";
  writeDebt(root, debt);
  return item;
}

/** A qualified or shipped spec that cites the item under Technical debt and whose latest verification is green. */
function specProof(root, specInput, id) {
  const { dir, file } = resolveSpecDir(root, specInput);
  const control = readControl(dir);
  if (!["qualified", "shipped"].includes(control.status)) throw new RuleError(`${control.id} is ${control.status}; resolving debt needs a qualified or shipped spec.`);
  if (latestEvaluation(control, "verification")?.status !== "green") throw new RuleError(`${control.id} has no green verification; its repair is not proven.`);
  if (!(section(fs.readFileSync(file, "utf8"), "Technical debt") ?? []).some((line) => line.includes(id))) throw new RuleError(`${control.id} does not cite ${id} in its Technical debt section.`);
  return control.id;
}

/** A project whose quality check can run, so its absence of the issue is real evidence (D32, D33). */
function scanProof(root, project) {
  const configured = readConfig(root).projects[project];
  if (!configured) throw new UsageError(`Unknown project: ${project}`);
  if (!configured.commands.quality?.length) throw new RuleError(`${project} has no quality check configured; unavailable evidence never resolves debt.`);
  return `quality:${project}`;
}

/** Remove a resolved item, only with a proof the core can check (D33). */
export function resolve(argv) {
  const args = parseArgs(argv, { positional: ["id"], flags: { spec: "string", scan: "string" } });
  if (Boolean(args.spec) === Boolean(args.scan)) throw new UsageError("Resolve with exactly one proof: --spec <spec> or --scan <project>.");
  const root = findRoot();
  const debt = readDebt(root);
  const item = find(debt, args.id);
  const proof = args.spec ? specProof(root, args.spec, item.id) : scanProof(root, args.scan);
  debt.items = debt.items.filter((entry) => entry !== item);
  writeDebt(root, debt);
  noteQuietly(root, { event: "resolved", spec: args.spec ? proof : null, summary: `${item.id} ${item.title} (proof: ${proof})` });
  return { resolved: item.id, proof, open: debt.items.length };
}

/** The open debt, highest priority first. */
export function list(argv) {
  parseArgs(argv);
  const { items } = readDebt(findRoot());
  const ordered = [...items].sort((a, b) => PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority) || a.id.localeCompare(b.id));
  return {
    open: items.length,
    byPriority: Object.fromEntries(PRIORITIES.map((priority) => [priority, items.filter((item) => item.priority === priority).length])),
    items: ordered.map(({ id, priority, state, title, scope, origin }) => ({ id, priority, state, title, scope, origin })),
  };
}

// `aidd run`, `aidd config`, `aidd debt`, and `aidd log`.
import { spawnSync } from "node:child_process";
import path from "node:path";
import {
  aiddbotPath, git, journal, nextId, productPath, readJson, RuleError, UnavailableError, UsageError, writeJson,
} from "../lib/core.mjs";
import { findSpec } from "../lib/spec.mjs";

const RUN_KINDS = ["lint", "unit", "acceptance", "quality"];
const MAX_OUTPUT = 4000;
const configFile = (root) => aiddbotPath(root, "config.json");

function exec(cwd, command) {
  const result = spawnSync(command, { cwd, shell: true, encoding: "utf8" });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
  return { command, ok: result.status === 0, exitCode: result.status ?? 1, output: output.slice(-MAX_OUTPUT) };
}

/** Run one classified command kind for every project that has it, or for `--project`. */
export function run(root, [kind], flags) {
  if (!RUN_KINDS.includes(kind)) throw new UsageError(`Kind must be one of: ${RUN_KINDS.join(", ")}.`);
  const projects = readJson(configFile(root), { projects: {} }).projects ?? {};
  const names = typeof flags.project === "string" ? [flags.project] : Object.keys(projects);
  const runs = [];
  for (const name of names) {
    const commands = [projects[name]?.commands?.[kind] ?? []].flat();
    for (const command of commands) runs.push({ project: name, ...exec(path.join(root, projects[name].path), command) });
  }
  if (!runs.length) throw new UnavailableError(`No '${kind}' command is configured; rule-project records them.`);
  const ok = runs.every((entry) => entry.ok);
  return { body: { kind, ok, runs }, exitCode: ok ? 0 : 1 };
}

/** `config get [key]` or `config set <key> <json>`, with dotted keys such as `projects.back`. */
export function config(root, [action, key, value]) {
  const current = readJson(configFile(root), { projects: {} });
  const parts = key ? key.split(".") : [];
  if (action === "get") return parts.reduce((node, part) => node?.[part], current) ?? null;
  if (action !== "set" || !parts.length || value === undefined) {
    throw new UsageError("Use: aidd config get [<key>] | aidd config set <key> <json>");
  }
  let parsed;
  try {
    parsed = JSON.parse(value);
  } catch {
    throw new UsageError(`Value must be JSON, for example '{"path":"back","commands":{"unit":"npm test"}}'.`);
  }
  if (parts[0] === "projects" && parts.length === 2 && (typeof parsed?.path !== "string" || path.isAbsolute(parsed.path))) {
    throw new UsageError('A project needs a relative "path" and a "commands" object.');
  }
  let node = current;
  for (const part of parts.slice(0, -1)) node = node[part] ??= {};
  node[parts.at(-1)] = parsed;
  writeJson(configFile(root), current);
  journal(root, { event: "configured", summary: `${key} = ${value}` });
  return { key, value: parsed };
}

const PRIORITIES = ["high", "medium", "low"];
const debtFile = (root) => productPath(root, "quality", "debt.json");

/** `debt add <title> <priority> [evidence]`, `debt list`, or `debt remove <id>`. */
export function debt(root, [action, ...args]) {
  const register = readJson(debtFile(root), { items: [] });
  if (action === "list") {
    return register.items.toSorted((a, b) => PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority));
  }
  if (action === "add") {
    const [title, priority, evidence = ""] = args;
    if (!title?.trim() || !PRIORITIES.includes(priority)) {
      throw new UsageError(`Use: aidd debt add "<title>" <${PRIORITIES.join("|")}> ["<evidence>"]`);
    }
    const spec = findSpec(root, git(root, ["branch", "--show-current"]));
    const item = { id: nextId(root, "D"), title: title.trim(), priority, evidence: evidence.trim(),
      origin: spec ? path.basename(spec).slice(0, 5) : "scan", at: new Date().toISOString().slice(0, 10) };
    register.items.push(item);
    writeJson(debtFile(root), register);
    journal(root, { event: "debt-added", summary: `${item.id} ${priority}: ${item.title}` });
    return item;
  }
  if (action === "remove") {
    const item = register.items.find((entry) => entry.id === args[0]);
    if (!item) throw new RuleError(`No open debt item ${args[0]}; see aidd debt list.`);
    register.items = register.items.filter((entry) => entry !== item);
    writeJson(debtFile(root), register);
    journal(root, { event: "debt-done", summary: `${item.id} ${item.title}` });
    return { removed: item.id };
  }
  throw new UsageError("Use: aidd debt add|list|remove");
}

const MODEL_EVENTS = { verdict: "green", select: "green", blocked: "red" };

/** `log <verdict|select|blocked> <summary> [--spec <id>]`: journal one judgment of the model. */
export function log(root, [event, summary], flags) {
  if (!Object.hasOwn(MODEL_EVENTS, event) || !summary?.trim()) {
    throw new UsageError(`Use: aidd log <${Object.keys(MODEL_EVENTS).join("|")}> "<summary>"`);
  }
  const spec = typeof flags.spec === "string" ? flags.spec : "-";
  journal(root, { actor: "model", event, spec, status: MODEL_EVENTS[event], summary });
  return { event, summary };
}

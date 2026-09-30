// `aidd run`, `aidd config`, `aidd debt`, and `aidd log`.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {
  aiddbotPath, commitPaths, currentBranch, git, journal, nextId, productPath, readJson, relative, RuleError, UnavailableError, UsageError,
  writeJson,
} from "../lib/core.mjs";
import { findSpec, readControl, writeControl } from "../lib/spec.mjs";

const RUN_KINDS = ["lint", "unit", "acceptance", "quality"];
const TAIL = 1500;
const DEFAULT_TIMEOUT_MINUTES = 20;
const configFile = (root) => aiddbotPath(root, "config.json");

/** Run one command with its whole output in `log`, so nothing is lost to a truncated reply. */
function exec(root, cwd, command, log, minutes) {
  fs.mkdirSync(path.dirname(log), { recursive: true });
  const fd = fs.openSync(log, "w");
  const started = Date.now();
  let result;
  try {
    result = spawnSync(command, { cwd, shell: true, stdio: ["ignore", fd, fd], timeout: minutes * 60_000 });
  } finally {
    fs.closeSync(fd);
  }
  const entry = { command, ok: result.status === 0, exitCode: result.status ?? 1, seconds: Math.round((Date.now() - started) / 1000) };
  if (result.error?.code === "ETIMEDOUT") entry.timedOut = `killed after ${minutes} minutes`;
  return { ...entry, log: relative(root, log), tail: fs.readFileSync(log, "utf8").trim().slice(-TAIL) };
}

/** Keep the latest run of each kind in the spec of the current branch, as evidence for `eval`. */
function recordRun(root, kind, ok, names) {
  const dir = findSpec(root, currentBranch(root));
  if (!dir) return;
  const control = readControl(dir);
  if (control.status === "shipped") return;
  const commit = git(root, ["rev-parse", "HEAD"]);
  control.runs = { ...control.runs, [kind]: { commit, ok, projects: names, at: new Date().toISOString() } };
  writeControl(dir, control);
}

/** Run one classified command kind for every project that has it, or for `--project`. */
export function run(root, [kind], flags) {
  if (!RUN_KINDS.includes(kind)) throw new UsageError(`Kind must be one of: ${RUN_KINDS.join(", ")}.`);
  const settings = readJson(configFile(root), { projects: {} });
  const projects = settings.projects ?? {};
  const minutes = settings.run?.timeoutMinutes ?? DEFAULT_TIMEOUT_MINUTES;
  const names = (typeof flags.project === "string" ? [flags.project] : Object.keys(projects))
    .filter((name) => [projects[name]?.commands?.[kind] ?? []].flat().length);
  if (!names.length) throw new UnavailableError(`No '${kind}' command is configured; rule-project records them.`);
  const runs = [];
  for (const name of names) {
    const commands = [projects[name].commands[kind]].flat();
    commands.forEach((command, index) => {
      const log = aiddbotPath(root, "runs", `${kind}-${name}${commands.length > 1 ? `-${index + 1}` : ""}.log`);
      runs.push({ project: name, ...exec(root, path.join(root, projects[name].path), command, log, minutes) });
    });
  }
  const ok = runs.every((entry) => entry.ok);
  const summary = runs.map((entry) => `${entry.project} ${entry.ok ? "ok" : `exit ${entry.exitCode}`} ${entry.seconds}s`);
  journal(root, { event: "run", level: ok ? "INFO" : "WARN", summary: `${kind}: ${summary.join(", ")}` });
  recordRun(root, kind, ok, names);
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
      origin: spec ? path.basename(spec).slice(0, 5) : "scan", at: new Date().toISOString() };
    register.items.push(item);
    writeJson(debtFile(root), register);
    journal(root, { event: "debt-added", summary: `${item.id} ${priority}: ${item.title}` });
    const committed = commitPaths(root, [".product/quality/debt.json", ".aiddbot/counters.yaml"], `docs(quality): add ${item.id}`);
    return { ...item, committed };
  }
  if (action === "remove") {
    const item = register.items.find((entry) => entry.id === args[0]);
    if (!item) throw new RuleError(`No open debt item ${args[0]}; see aidd debt list.`);
    register.items = register.items.filter((entry) => entry !== item);
    writeJson(debtFile(root), register);
    journal(root, { event: "debt-done", summary: `${item.id} ${item.title}` });
    return { removed: item.id, committed: commitPaths(root, [".product/quality/debt.json"], `docs(quality): remove ${item.id}`) };
  }
  throw new UsageError("Use: aidd debt add|list|remove");
}


const MODEL_EVENTS = { verdict: "INFO", select: "INFO", approved: "INFO", scaffolded: "INFO", blocked: "ERROR" };

/** `log <verdict|select|blocked> <summary> [--spec <id>]`: journal one judgment of the model. */
export function log(root, [event, summary], flags) {
  if (!Object.hasOwn(MODEL_EVENTS, event) || !summary?.trim()) {
    throw new UsageError(`Use: aidd log <${Object.keys(MODEL_EVENTS).join("|")}> "<summary>"`);
  }
  const spec = typeof flags.spec === "string" ? flags.spec : "-";
  journal(root, { actor: "model", event, spec, level: MODEL_EVENTS[event], summary });
  return { event, summary };
}

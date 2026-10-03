// `aidd run`, `aidd config`, `aidd debt`, and `aidd log`.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {
  aiddbotPath, commitPaths, currentBranch, git, journal, nextId, productPath, readJson, relative, RuleError, UnavailableError, UsageError,
  workingTree, writeJson,
} from "../lib/core.mjs";
import { findSpec, readControl, requireSpec, writeControl } from "../lib/spec.mjs";
import { untested } from "./eval.mjs";

const RUN_KINDS = ["lint", "format", "upgrade", "unit", "acceptance", "quality"];
const NOT_EVIDENCE = new Set(["format", "upgrade"]);
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

/** A slot that does not apply holds `{"na": "<reason>"}` instead of a command. */
const isNa = (slot) => typeof slot?.na === "string";

const MANAGER_FILES = {
  npm: ["package-lock.json", "npm-shrinkwrap.json"],
  pnpm: ["pnpm-lock.yaml", "pnpm-workspace.yaml"],
  yarn: ["yarn.lock", ".yarnrc.yml"],
  bun: ["bun.lock", "bun.lockb"],
};

/** The package managers whose lockfiles or workspace files sit in a project folder; generators leave strays. */
function packageManagers(dir) {
  return Object.keys(MANAGER_FILES).filter((name) => MANAGER_FILES[name].some((file) => fs.existsSync(path.join(dir, file))));
}

/** A slot is a command, a list of commands, or a "not applicable" with its reason. */
function validSlot(slot) {
  const command = (value) => typeof value === "string" && value.trim() !== "";
  if (Array.isArray(slot)) return slot.length > 0 && slot.every(command);
  if (slot && typeof slot === "object") return Object.keys(slot).length === 1 && isNa(slot) && slot.na.trim() !== "";
  return command(slot);
}

/** The slots that `value` sets at `parts` (`projects.<p>`, `projects.<p>.commands`, or one slot). */
function slotsOf(parts, value) {
  if (parts[0] !== "projects") return [];
  if (parts.length === 2) return Object.entries(value?.commands ?? {});
  if (parts.length === 3 && parts[2] === "commands") return Object.entries(value ?? {});
  if (parts.length === 4 && parts[2] === "commands") return [[parts[3], value]];
  return [];
}

/** Append core arguments to a classified command; an npm script needs `--` before them, or npm takes them as its own. */
function withArguments(command, args) {
  const npmScript = /^npm\s+(run|run-script|test|start)\b/.test(command) && !/\s--(\s|$)/.test(command);
  return `${command}${npmScript ? " --" : ""} ${args}`;
}

/** Keep the latest run of each kind and project in the spec of the current branch, as evidence for `eval`. */
function recordRun(root, kind, runs) {
  const dir = findSpec(root, currentBranch(root));
  if (!dir) return;
  const control = readControl(dir);
  if (control.status === "shipped") return;
  const commit = git(root, ["rev-parse", "HEAD"]);
  const at = new Date().toISOString();
  const byProject = { ...control.runs?.[kind] };
  for (const name of new Set(runs.map((entry) => entry.project))) {
    const own = runs.filter((entry) => entry.project === name);
    const na = own.find((entry) => entry.na !== undefined)?.na;
    byProject[name] = { commit, ok: own.every((entry) => entry.ok), at, ...(na !== undefined && { na }) };
  }
  control.runs = { ...control.runs, [kind]: byProject };
  writeControl(dir, control);
}

/** The last lint of each project and the tree it saw, kept in the git folder because it is local state, never history. */
const lintStateFile = (root) => path.resolve(root, git(root, ["rev-parse", "--git-path", "aidd-lint.json"]));

/** Remember each lint result with the files it saw; a format of clean files keeps that lint valid, because format is cosmetic. */
function rememberLint(root, kind, projects, runs, before) {
  const file = lintStateFile(root);
  const state = readJson(file, {});
  for (const name of new Set(runs.filter((entry) => entry.na === undefined).map((entry) => entry.project))) {
    const tree = workingTree(root, projects[name].path);
    if (kind === "lint") state[name] = { tree, ok: runs.every((entry) => entry.project !== name || entry.ok) };
    else if (state[name]?.ok && state[name].tree === before[name]) state[name].tree = tree;
  }
  writeJson(file, state);
}

/** The files that a commit of `paths` would take: changed since HEAD, or new and not ignored. */
function changedFiles(root, paths) {
  const list = (args) => (git(root, [...args, "--", ...paths], { allowFailure: true }) ?? "").split(/\r?\n/).filter(Boolean);
  return [...list(["diff", "HEAD", "--name-only", "--no-renames"]), ...list(["ls-files", "--others", "--exclude-standard"])];
}

/** A commit that changes the code of a project needs the last lint of that project to have passed on the same files. */
function requireLint(root, paths) {
  const projects = readJson(configFile(root), { projects: {} }).projects ?? {};
  const code = changedFiles(root, paths).filter((file) => !/^\.(aiddbot|product)\//.test(file) && !file.endsWith(".md"));
  const state = readJson(lintStateFile(root), {});
  const stale = [];
  for (const [name, project] of Object.entries(projects)) {
    const slot = project.commands?.lint;
    if (!slot || isNa(slot)) continue;
    const prefix = project.path === "." ? "" : `${project.path.replace(/[\\/]+$/, "")}/`;
    if (!code.some((file) => file.startsWith(prefix))) continue;
    const last = state[name];
    if (last?.ok && last.tree === workingTree(root, project.path)) continue;
    stale.push(`${name} (${!last ? "never linted" : last.ok ? "changed since its last lint" : "its last lint failed"})`);
  }
  if (stale.length) {
    throw new RuleError(`Lint before you commit: ${stale.join(", ")}. Run \`aidd run lint --project <name>\`, fix every error, then commit.`);
  }
}

/** Run one classified command kind for every project that has it, or for `--project`.
 *  `--spec` narrows acceptance to the tests of the current spec; that run is a quick check, never evidence. */
export function run(root, [kind], flags) {
  if (!RUN_KINDS.includes(kind)) throw new UsageError(`Kind must be one of: ${RUN_KINDS.join(", ")}.`);
  const settings = readJson(configFile(root), { projects: {} });
  const projects = settings.projects ?? {};
  const minutes = settings.run?.timeoutMinutes ?? DEFAULT_TIMEOUT_MINUTES;
  const names = (typeof flags.project === "string" ? [flags.project] : Object.keys(projects))
    .filter((name) => isNa(projects[name]?.commands?.[kind]) || [projects[name]?.commands?.[kind] ?? []].flat().length);
  if (!names.length) {
    throw new UnavailableError(`No '${kind}' command is configured; the foundation records each project's slots from its AGENTS.md.`);
  }
  const scoped = kind === "acceptance" && flags.spec ? requireSpec(root) : null;
  const id = scoped && path.basename(scoped).slice(0, 5);
  const runs = [];
  const tracksLint = !id && (kind === "lint" || kind === "format");
  const before = kind === "format" ? Object.fromEntries(names.map((name) => [name, workingTree(root, projects[name].path)])) : {};
  for (const name of names) {
    const slot = projects[name].commands[kind];
    if (isNa(slot)) {
      runs.push({ project: name, ok: true, na: slot.na });
      continue;
    }
    const commands = [projects[name].commands[kind]].flat().map((command) => (id ? withArguments(command, `--grep @${id}-`) : command));
    commands.forEach((command, index) => {
      const log = aiddbotPath(root, "runs", `${kind}${id ? "-scoped" : ""}-${name}${commands.length > 1 ? `-${index + 1}` : ""}.log`);
      runs.push({ project: name, ...exec(root, path.join(root, projects[name].path), command, log, minutes) });
    });
  }
  const ok = runs.every((entry) => entry.ok);
  const summary = runs.map((entry) => (entry.na !== undefined ? `${entry.project} n/a: ${entry.na}`
    : `${entry.project} ${entry.ok ? "ok" : `exit ${entry.exitCode}`} ${entry.seconds}s`));
  journal(root, { event: "run", level: ok ? "INFO" : "WARN", summary: `${kind}${id ? ` ${id}` : ""}: ${summary.join(", ")}` });
  if (!id && !NOT_EVIDENCE.has(kind)) recordRun(root, kind, runs);
  if (tracksLint) rememberLint(root, kind, projects, runs, before);
  const body = id ? { kind, spec: id, scoped: true, ok, untested: untested(root, scoped, id), runs } : { kind, ok, runs };
  return { body, exitCode: ok ? 0 : 1 };
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
  if (parts[0] === "projects" && parts.length === 2) {
    const managers = packageManagers(path.join(root, parsed.path));
    if (managers.length > 1) {
      throw new RuleError(`${parsed.path} has files of ${managers.join(" and ")}; keep only the package manager of its AGENTS.md and remove the files of the others.`);
    }
  }
  const invalid = slotsOf(parts, parsed).find(([, slot]) => !validSlot(slot));
  if (invalid) {
    throw new UsageError(`Slot '${invalid[0]}' must be a command, a list of commands, or {"na": "<reason>"}.`);
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


/** `commit <message> [<paths>]`: commit the given paths (all by default) and journal it, so the journal shows every milestone. */
export function commit(root, [message, ...paths]) {
  if (!message?.trim()) throw new UsageError('Use: aidd commit "<message>" [<path>...]');
  requireLint(root, paths.length ? paths : ["."]);
  const committed = commitPaths(root, paths.length ? paths : ["."], message.trim());
  if (committed) journal(root, { event: "committed", summary: message });
  return { committed, message: message.trim() };
}

const MODEL_EVENTS = { verdict: "INFO", select: "INFO", handoff: "INFO", approved: "INFO", scaffolded: "INFO", blocked: "ERROR" };

/** `log <verdict|select|blocked> <summary> [--spec <id>]`: journal one judgment of the model. */
export function log(root, [event, summary], flags) {
  if (!Object.hasOwn(MODEL_EVENTS, event) || !summary?.trim()) {
    throw new UsageError(`Use: aidd log <${Object.keys(MODEL_EVENTS).join("|")}> "<summary>"`);
  }
  const spec = typeof flags.spec === "string" ? flags.spec : "-";
  journal(root, { actor: "model", event, spec, level: MODEL_EVENTS[event], summary });
  return { event, summary };
}

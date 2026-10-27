// `aidd run`, `aidd config`, `aidd debt`, and `aidd log`.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {
  aiddbotPath, commitPaths, currentBranch, dayFolder, defaultBranch, git, journal, localStamp, nextId, readJson, relative, RuleError,
  UnavailableError, UsageError, writeJson,
} from "../lib/core.mjs";
import {
  findSpec, isApproved, oversize, readControl, requireSpec, SPEC_DEFINED, specMeta, TYPES, unapproved, writeControl,
} from "../lib/spec.mjs";
import { specTags, untested } from "./eval.mjs";
import { patch } from "./spec.mjs";

// Basic lint, format and the affected unit tests are not here: the technology of each project runs them in its pre-commit hook.
// Each debt kind has the name of the level of the debt that it finds.
const RUN_KINDS = ["upgrade", "test", "layers", "crap"];
const PROJECT_TYPES = ["api", "web", "cli", "e2e"];
const NOT_EVIDENCE = new Set(["upgrade", "crap"]);
const SPEC_SLOT = "test:spec";
const TAIL = 1500;
const SUMMARY_LINE = 80;
const DEFAULT_TIMEOUT_MINUTES = 20;
const RUNNING = "RUNNING";
const DEFAULT_FOLDER_ENTRIES = 16;
const GROUPED_FOLDERS = new Set(["core", "shared", "features"]);
const SKIPPED_FOLDERS = new Set(["node_modules", "dist", "build", "coverage", "out", "vendor", "target"]);
const DEFAULT_DUPLICATE_LINES = 6;
const MAX_DUPLICATES = 20;
const CODE_FILE = /\.(c|m)?[jt]sx?$|\.(css|scss|html|vue|svelte|py|go|rs|java|kt|cs|php|rb|sql|sh|ps1)$/;
const TRIVIAL_LINE = /^[\s{}()[\];,]*$/;
const COMMENT_LINE = /^(\/\/|\/\*|\*|#(?!include)|--)/;
const IMPORT_LINE = /^(import\b|export \{?.*\bfrom\b|from \S+ import\b|using\b|package\b|#include\b|require\()/;
const OPEN_IMPORT = [["{", "}"], ["(", ")"]];
const INSTALLED = /(^|\/)(node_modules|\.venv|__pycache__)\//;
/** UTF-8 text read and written again as Windows-1252, such as an em dash read as three characters: a shell with the wrong encoding writes it. */
const GARBLED = /\u00e2\u20ac|\u00c3[\u0080-\u00bf]|\u00c2[\u00a0-\u00bf]/;
const TEXT_FILE = /\.(md|[cm]?[jt]sx?|json|ya?ml|txt|css|html)$/;
const configFile = (root) => aiddbotPath(root, "config.json");

/** The tool's own summary line of a run: the last line that tells a pass (or, after a failure, a fail or an error), else the last line.
 *  Noise is never a summary: package-manager lines, which only repeat the command and its exit code, rules of a table, and lists of patterns. */
function summaryLine(tail = "", ok = true) {
  const noise = /^(npm (notice|warn|error|ERR!)|> )|^[\s=\-|+*_]+$|^(include|exclude):/;
  const lines = tail.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !noise.test(line));
  const telling = ok ? /\bpass/i : /\b(fail|error)/i;
  const line = lines.findLast((entry) => telling.test(entry)) ?? lines.at(-1) ?? "";
  return line.length > SUMMARY_LINE ? `${line.slice(0, SUMMARY_LINE - 1)}…` : line;
}

/** The name of one command of a slot with several: its npm script, else its place in the list. */
function stepName(command, index) {
  return command.match(/^npm\s+(?:run|run-script)\s+(\S+)/)?.[1] ?? `#${index + 1}`;
}

/** One project of a run for the journal: status, time and the summary line of its output. */
function runSummary(entry) {
  const status = `${entry.project}${entry.step ? ` ${entry.step}` : ""} ${entry.ok ? "ok" : `exit ${entry.exitCode}`} ${entry.seconds}s`;
  const line = summaryLine(entry.tail, entry.ok);
  return line ? `${status} (${line})` : status;
}

/** Run one command with its whole output in `log`, so nothing is lost to a truncated reply.
 *  Until the command ends, the first line of the log says that it is no result yet. */
function exec(root, cwd, command, log, minutes) {
  fs.mkdirSync(path.dirname(log), { recursive: true });
  const fd = fs.openSync(log, "w");
  const started = Date.now();
  let result;
  try {
    fs.writeSync(fd, `${RUNNING} since ${new Date(started).toISOString()}: ${command}. This log is no result until this line is gone.\n`);
    result = spawnSync(command, { cwd, shell: true, stdio: ["ignore", fd, fd], timeout: minutes * 60_000 });
  } finally {
    fs.closeSync(fd);
  }
  const output = fs.readFileSync(log, "utf8").replace(/^.*\n/, "");
  fs.writeFileSync(log, output);
  const entry = { command, ok: result.status === 0, exitCode: result.status ?? 1, seconds: Math.round((Date.now() - started) / 1000) };
  if (result.error?.code === "ETIMEDOUT") entry.timedOut = `killed after ${minutes} minutes`;
  const failure = entry.ok ? {} : { failure: keepFailure(root, log) };
  return { ...entry, log: relative(root, log), ...failure, tail: output.trim().slice(-TAIL) };
}

/** Keep the output of a failed run in the folder of its day, named by the time it ended: the next run of the slot writes its log again. */
function keepFailure(root, log) {
  const { date, time } = localStamp();
  const copy = path.join(dayFolder(root, date), `${time.replaceAll(":", "")}-${path.basename(log)}`);
  fs.mkdirSync(path.dirname(copy), { recursive: true });
  fs.copyFileSync(log, copy);
  return relative(root, copy);
}

/** The lock of the run in progress, kept in the git folder because it is local state, never history. */
const runLockFile = (root) => path.resolve(root, git(root, ["rev-parse", "--git-path", "aidd-run.lock"]));

/** Whether the process `pid` is still alive. */
function alive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error.code === "EPERM";
  }
}

/** Take the run lock, or refuse while another run is alive: two runs share ports, databases, and logs, and both fail. A dead run leaves no lock. */
function lockRun(root, kind) {
  const file = runLockFile(root);
  const held = readJson(file, null);
  if (held && held.pid !== process.pid && alive(held.pid)) {
    throw new RuleError(`'${held.kind}' is still running since ${held.started} (pid ${held.pid}). Wait until it ends: its result goes to the journal and to .aiddbot/logs/. Never start it again, and never judge its log before it ends.`);
  }
  writeJson(file, { pid: process.pid, kind, started: new Date().toISOString() });
  return () => fs.rmSync(file, { force: true });
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

/** The evidence that a run of `kind` gives for a project: a `--spec` run is spec, the `test` of an `e2e` is acceptance, any other `test` is unit. */
const evidenceOf = (kind, project, scoped) => (kind !== "test" ? kind : scoped ? "spec" : project?.type === "e2e" ? "acceptance" : "unit");

/** Keep the latest run of each kind and project in the spec of the current branch, as evidence for `eval` and `release`. */
function recordRun(root, kind, runs, projects, scoped) {
  const spec = findSpec(root, currentBranch(root));
  if (!spec) return;
  const control = readControl(root, spec);
  if (control.status === "shipped") return;
  const commit = git(root, ["rev-parse", "HEAD"]);
  const at = new Date().toISOString();
  control.runs = { ...control.runs };
  for (const name of new Set(runs.map((entry) => entry.project))) {
    const own = runs.filter((entry) => entry.project === name);
    const na = own.find((entry) => entry.na !== undefined)?.na;
    const evidence = evidenceOf(kind, projects[name], scoped);
    control.runs[evidence] = { ...control.runs[evidence], [name]: { commit, ok: own.every((entry) => entry.ok), at, ...(na !== undefined && { na }) } };
  }
  writeControl(root, control);
}

/**
 * The folder findings of one project. `crowded`: each folder of a `core`, `shared` or `features` tree, the tree included, with more direct entries than `limit`.
 * `subfolders`: each folder inside a feature folder, because a feature is one flat folder and the layer lint sees only its top. Technology-free: it reads the file system only.
 */
function folderFindings(root, project, start, limit) {
  const crowded = [];
  const subfolders = [];
  const walk = (dir, grouped, featureDepth) => {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    if (grouped && entries.length > limit) crowded.push({ project, folder: relative(root, dir), entries: entries.length, limit });
    if (featureDepth === 3) subfolders.push({ project, folder: relative(root, dir) });
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith(".") || SKIPPED_FOLDERS.has(entry.name)) continue;
      const depth = entry.name === "features" && featureDepth === 0 ? 1 : featureDepth && featureDepth + 1;
      walk(path.join(dir, entry.name), grouped || GROUPED_FOLDERS.has(entry.name), depth);
    }
  };
  walk(start, false, 0);
  const byFolder = (a, b) => a.folder.localeCompare(b.folder);
  return { crowded: crowded.sort(byFolder), subfolders: subfolders.sort(byFolder) };
}

/** The lines that carry logic: no blank, bracket-only, comment, or import line, and spaces collapsed.
 *  An import that names its items on the next lines is one import: each line up to its closer is skipped too. */
function logicLines(text) {
  let closer = null;
  return text.split(/\r?\n/).flatMap((raw, index) => {
    const line = raw.trim().replace(/\s+/g, " ");
    if (closer) {
      if (line.includes(closer)) closer = null;
      return [];
    }
    if (IMPORT_LINE.test(line)) {
      closer = OPEN_IMPORT.find(([open, close]) => line.endsWith(open) && !line.includes(close))?.[1] ?? null;
      return [];
    }
    if (TRIVIAL_LINE.test(line) || COMMENT_LINE.test(line)) return [];
    return [{ line, number: index + 1 }];
  });
}

/** The source files of a project, outside dependency, build, and hidden folders. */
function sourceFiles(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name.startsWith(".") || SKIPPED_FOLDERS.has(entry.name) ? [] : sourceFiles(full);
    return CODE_FILE.test(entry.name) ? [full] : [];
  });
}

/**
 * The blocks of `size` or more logic lines that appear in two or more places of a project: each is a candidate for one `shared` function (DRY).
 * Technology-free: it compares normalized lines only, and it reports the largest blocks first.
 */
function duplicateFindings(root, project, start, size) {
  const files = sourceFiles(start).map((file) => ({ file: relative(root, file), lines: logicLines(fs.readFileSync(file, "utf8")) }));
  const places = new Map();
  for (const [fileIndex, { lines }] of files.entries()) {
    for (let index = 0; index + size <= lines.length; index++) {
      const key = lines.slice(index, index + size).map((entry) => entry.line).join("\n");
      places.set(key, [...(places.get(key) ?? []), { fileIndex, index }]);
    }
  }
  const repeated = new Set();
  for (const list of places.values()) if (list.length > 1) for (const place of list) repeated.add(`${place.fileIndex}:${place.index}`);
  const isRepeated = (fileIndex, index) => repeated.has(`${fileIndex}:${index}`);
  const blocks = [];
  for (const list of places.values()) {
    if (list.length < 2 || list.some((place) => isRepeated(place.fileIndex, place.index - 1))) continue;
    const locations = list.map(({ fileIndex, index }) => {
      let end = index;
      while (isRepeated(fileIndex, end + 1)) end++;
      const { file, lines } = files[fileIndex];
      return { file, from: lines[index].number, to: lines[end + size - 1].number, length: end - index + size };
    });
    blocks.push({ project, lines: Math.min(...locations.map((entry) => entry.length)), locations: locations.map(({ file, from, to }) => ({ file, from, to })) });
  }
  return blocks.sort((a, b) => b.lines - a.lines).slice(0, MAX_DUPLICATES);
}

/** The files that a commit of `paths` would take: changed since HEAD (only added or modified, with `kept`), or new and not ignored. */
function changedFiles(root, paths, kept = false) {
  const list = (args) => (git(root, [...args, "--", ...paths], { allowFailure: true }) ?? "").split(/\r?\n/).filter(Boolean);
  const diff = ["diff", "HEAD", "--name-only", "--no-renames", ...(kept ? ["--diff-filter=AM"] : [])];
  return [...list(diff), ...list(["ls-files", "--others", "--exclude-standard"])];
}

/** Run one classified command kind for every project that has it, or for `--project`. `test` runs the `e2e` projects last.
 *  `--spec` runs the `test:spec` slot of each `e2e` with the tag of the current spec: the evidence of the verification.
 *  That slot ends in the filter flag of its runner, so the core adds only the tag and never knows the runner. */
export function run(root, [kind], flags) {
  if (!RUN_KINDS.includes(kind)) throw new UsageError(`Kind must be one of: ${RUN_KINDS.join(", ")}.`);
  if (flags.spec && kind !== "test") throw new UsageError("--spec applies only to test.");
  const settings = readJson(configFile(root), { projects: {} });
  const projects = settings.projects ?? {};
  const minutes = settings.run?.timeoutMinutes ?? DEFAULT_TIMEOUT_MINUTES;
  const scoped = flags.spec ? requireSpec(root) : null;
  const slotName = scoped ? SPEC_SLOT : kind;
  const names = (typeof flags.project === "string" ? [flags.project] : Object.keys(projects))
    .filter((name) => isNa(projects[name]?.commands?.[slotName]) || [projects[name]?.commands?.[slotName] ?? []].flat().length)
    .filter((name) => !scoped || projects[name].type === "e2e")
    .sort((a, b) => (kind === "test") * ((projects[a].type === "e2e") - (projects[b].type === "e2e")));
  if (!names.length) {
    const what = scoped ? `No 'e2e' project has a '${SPEC_SLOT}' command` : `No '${kind}' command is configured`;
    throw new UnavailableError(`${what}; the foundation records each project's type and slots from its AGENTS.md.`);
  }
  const id = scoped && path.basename(scoped).slice(0, 5);
  // Its own requirements, or the requirements of older specs that a fix cites; a refactor or a chore has neither.
  const tags = id ? specTags(scoped, id) : [];
  if (id && !tags.length) {
    const na = `${id} has no requirements and cites none, so no test has its tag; the regression of ship-spec checks it.`;
    return { body: { kind, spec: id, scoped: true, ok: true, na, runs: [] }, exitCode: 0 };
  }
  const runs = [];
  const unlock = lockRun(root, kind);
  try {
    for (const name of names) {
      const slot = projects[name].commands[slotName];
      if (isNa(slot)) {
        runs.push({ project: name, ok: true, na: slot.na });
        continue;
      }
      const commands = id ? [slot].flat().flatMap((command) => tags.map((tag) => withArguments(command, tag))) : [slot].flat();
      commands.forEach((command, index) => {
        // A slot name such as `test:spec` is not a valid file name on every system.
        const log = aiddbotPath(root, "logs", `${kind.replace(":", "-")}${id ? "-scoped" : ""}-${name}${commands.length > 1 ? `-${index + 1}` : ""}.log`);
        const step = commands.length > 1 && !id ? { step: stepName(command, index) } : {};
        runs.push({ project: name, ...step, ...exec(root, path.join(root, projects[name].path), command, log, minutes) });
      });
    }
  } finally {
    unlock();
  }
  const limit = settings.quality?.folderEntries ?? DEFAULT_FOLDER_ENTRIES;
  const findings = kind === "layers" ? names.map((name) => folderFindings(root, name, path.join(root, projects[name].path), limit)) : [];
  const folders = findings.flatMap((entry) => entry.crowded);
  const subfolders = findings.flatMap((entry) => entry.subfolders);
  const size = settings.quality?.duplicateLines ?? DEFAULT_DUPLICATE_LINES;
  const duplicates = kind === "layers" ? names.flatMap((name) => duplicateFindings(root, name, path.join(root, projects[name].path), size)) : [];
  // A structure finding of the core makes the layers run of its project red, as a finding of its lint does.
  const structured = new Set([...folders, ...subfolders, ...duplicates].map((entry) => entry.project));
  for (const entry of runs) if (structured.has(entry.project)) entry.ok = false;
  const ok = runs.every((entry) => entry.ok);
  const summary = runs.filter((entry) => entry.na === undefined).map(runSummary);
  journal(root, { event: "run", level: ok ? "INFO" : "WARN", summary: `${kind}${id ? ` ${id}` : ""}: ${summary.join(", ") || "n/a"}` });
  if (folders.length) {
    journal(root, { event: "run", level: "WARN", summary: `folders over ${limit} entries: ${folders.map((entry) => `${entry.folder} (${entry.entries})`).join(", ")}` });
  }
  if (subfolders.length) {
    journal(root, { event: "run", level: "WARN", summary: `subfolders in features: ${subfolders.map((entry) => entry.folder).join(", ")}` });
  }
  if (duplicates.length) {
    const where = duplicates.slice(0, 3).map((entry) => `${entry.locations[0].file}:${entry.locations[0].from} (${entry.lines} lines, ${entry.locations.length} places)`);
    journal(root, { event: "run", level: "WARN", summary: `duplicated blocks: ${duplicates.length}, such as ${where.join(", ")}` });
  }
  if (!NOT_EVIDENCE.has(kind)) recordRun(root, kind, runs, projects, Boolean(id));
  const body = id ? { kind, spec: id, scoped: true, ok, untested: untested(root, scoped, id), runs }
    : { kind, ok, runs, ...(kind === "layers" && { folders, subfolders, duplicates }) };
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
    throw new UsageError(`Value must be JSON, for example '{"type":"api","path":"api","commands":{"test":"npm test"}}'.`);
  }
  if (parts[0] === "projects" && parts.length === 2 && (typeof parsed?.path !== "string" || path.isAbsolute(parsed.path))) {
    throw new UsageError('A project needs a "type", a relative "path" and a "commands" object.');
  }
  const type = parts.length === 2 ? parsed?.type : parts.length === 3 && parts[2] === "type" ? parsed : undefined;
  if (parts[0] === "projects" && (parts.length === 2 || parts[2] === "type") && !PROJECT_TYPES.includes(type)) {
    throw new UsageError(`A project type must be one of: ${PROJECT_TYPES.join(", ")}.`);
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
const debtFile = (root) => aiddbotPath(root, "debt.json");

/** `debt add <title> <priority> [evidence] [--project <name>]`, `debt list`, or `debt remove <id>`.
 *  A `medium` item names its project: a `layers` run checks one project, and its refactor repairs the items of that project together. */
export function debt(root, [action, ...args], flags = {}) {
  const register = readJson(debtFile(root), { items: [] });
  if (action === "list") {
    return register.items.toSorted((a, b) => PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority));
  }
  if (action === "add") {
    const [title, priority, evidence = ""] = args;
    if (!title?.trim() || !PRIORITIES.includes(priority)) {
      throw new UsageError(`Use: aidd debt add "<title>" <${PRIORITIES.join("|")}> ["<evidence>"] [--project <name>]`);
    }
    const projects = Object.keys(readJson(configFile(root), { projects: {} }).projects ?? {});
    const project = typeof flags.project === "string" ? flags.project : undefined;
    if (project !== undefined && !projects.includes(project)) {
      throw new UsageError(`Project must be one of: ${projects.join(", ") || "(none configured)"}.`);
    }
    if (priority === "medium" && project === undefined) {
      throw new UsageError("A medium item needs --project <name>: the project whose layers run reported it.");
    }
    const spec = findSpec(root, git(root, ["branch", "--show-current"]));
    const item = { id: nextId(root, "D"), title: title.trim(), priority, evidence: evidence.trim(), ...(project && { project }),
      origin: spec ? path.basename(spec).slice(0, 5) : "scan", at: new Date().toISOString() };
    register.items.push(item);
    writeJson(debtFile(root), register);
    journal(root, { event: "debt-added", summary: `${item.id} ${priority}: ${item.title}` });
    const committed = commitPaths(root, [".aiddbot/debt.json", ".aiddbot/counters.yaml"], `docs(quality): add ${item.id}`);
    return { ...item, committed };
  }
  if (action === "remove") {
    const item = register.items.find((entry) => entry.id === args[0]);
    if (!item) throw new RuleError(`No open debt item ${args[0]}; see aidd debt list.`);
    register.items = register.items.filter((entry) => entry !== item);
    writeJson(debtFile(root), register);
    journal(root, { event: "debt-done", summary: `${item.id} ${item.title}` });
    return { removed: item.id, committed: commitPaths(root, [".aiddbot/debt.json"], `docs(quality): remove ${item.id}`) };
  }
  if (action === "patch") return patch(root, args);
  throw new UsageError("Use: aidd debt add|list|remove|patch");
}


/** `commit <message> [<paths>]`: commit the given paths (all by default) and journal it, so the journal shows every milestone.
 *  Never on the default branch: only `release` and `integrate` write there. */
export function commit(root, [message, ...paths]) {
  if (!message?.trim()) throw new UsageError('Use: aidd commit "<message>" [<path>...]');
  const branch = currentBranch(root);
  if (branch === defaultBranch(root)) {
    throw new RuleError(`Never commit on ${branch}: only \`aidd release\` and \`aidd integrate\` write there. Commit on the spec or task branch.`);
  }
  const spec = findSpec(root, branch);
  if (spec && message.trim() !== SPEC_DEFINED && !isApproved(root, spec)) throw new RuleError(unapproved(readControl(root, spec)));
  // The history and the changelog tell a spec by its type: each commit of a spec has the type of the spec, or one that is not a type of spec, such as `docs`.
  const type = /^(\w+)[(!:]/.exec(message.trim())?.[1];
  const meta = spec && specMeta(spec);
  if (meta && TYPES.includes(type) && type !== meta.type) {
    throw new RuleError(`${meta.key} is a ${meta.type}: commit its work as \`${meta.type}(...)\`, never \`${type}(...)\`.`);
  }
  const installed = changedFiles(root, paths.length ? paths : ["."], true).find((file) => INSTALLED.test(file));
  if (installed) {
    throw new RuleError(`Installed dependencies are never committed (${installed}). Add the dependency folder to the ignore file of its project, then commit again.`);
  }
  const garbled = changedFiles(root, paths.length ? paths : ["."], true)
    .find((file) => TEXT_FILE.test(file) && GARBLED.test(fs.readFileSync(path.join(root, file), "utf8")));
  if (garbled) {
    throw new RuleError(`${garbled} has garbled characters, such as \u00e2\u20ac\u201d for an em dash: it was written with the wrong encoding. Write it again as UTF-8, then commit again.`);
  }
  const committed = commitPaths(root, paths.length ? paths : ["."], message.trim());
  if (committed) journal(root, { event: "committed", summary: message });
  return { committed, message: message.trim() };
}

const MODEL_EVENTS = { verdict: "INFO", select: "INFO", handoff: "INFO", approved: "INFO", plan: "INFO", blocked: "ERROR" };

/** `log <verdict|select|blocked> <summary> [--spec <id>]`: journal one judgment of the model. */
export function log(root, [event, summary], flags) {
  if (!Object.hasOwn(MODEL_EVENTS, event) || !summary?.trim()) {
    throw new UsageError(`Use: aidd log <${Object.keys(MODEL_EVENTS).join("|")}> "<summary>"`);
  }
  const spec = typeof flags.spec === "string" ? flags.spec : "-";
  // An approved spec is committed here, so its definition never lands before its approval, and only within the size limits.
  const file = event === "approved" && spec !== "-" ? findSpec(root, spec) : null;
  // An approval with no spec that exists approves nothing: refuse it, so that the definition is never left out of git.
  if (event === "approved" && !file) {
    throw new RuleError(`log approved needs the ID of an existing spec, such as --spec S0001; ${spec === "-" ? "no --spec was given" : `no spec is ${spec}`}.`);
  }
  const tooLarge = file ? oversize(file) : [];
  if (tooLarge.length) throw new RuleError(tooLarge.join(" "));
  journal(root, { actor: "model", event, spec, level: MODEL_EVENTS[event], summary });
  if (file) return { event, summary, ...commit(root, [SPEC_DEFINED, relative(root, file)]) };
  return { event, summary };
}

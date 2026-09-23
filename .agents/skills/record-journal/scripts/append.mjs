#!/usr/bin/env node
// Deterministic journal writer: the caller supplies what it cannot know in
// advance (skill, event, status, summary, and revision when it applies); this
// script deduces or validates everything else — spec, stage, harness, and the
// fixed-width table format — so record-journal/SKILL.md stays short.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Single source of truth for stage names: adding a skill that journals means
// adding its row here, nowhere else.
const STAGE_BY_SKILL = {
  // Not a skill: `aiddbot init` writes exactly one genesis event through
  // this same script, so the journal's first line never duplicates its
  // format. See bin/lib/seed.js.
  init: "init",
  "architect-system-foundation": "setup",
  "build-requested-spec": "deliver",
  "craft-lasting-quality": "craft",
  "scaffold-system": "scaffold",
  "document-system": "document",
  "document-project": "document",
  "define-spec": "define",
  "implement-project": "build",
  "verify-acceptance": "verify",
  "review-implementation": "qualify",
  "ship-spec": "ship",
  "inspect-quality": "inspect",
};

const AGENT_LABELS = { Architect: "Arch", Builder: "Build", Craftsman: "Craft", Direct: "Direct" };
const STATUS_LEVELS = { green: "Info", amber: "Warn", red: "Error" };
const EFFORTS = ["low", "medium", "high"];

function usage() {
  return [
    `Usage: append.mjs <skill> <event> <status> "<summary>" [flags]`,
    "",
    `  skill    one of: ${Object.keys(STAGE_BY_SKILL).join(", ")}`,
    `  event    free text, no line breaks or |; "spawn" additionally requires --role, --effort, and --model`,
    `  status   green | amber | red`,
    `  summary  free text, quoted`,
    "",
    "Flags (all optional unless noted):",
    "  --agent      Architect | Builder | Craftsman | Direct  (default: Direct)",
    "  --spec       overrides the spec ID normally read from the current branch",
    "  --project    project or subdomain name",
    "  --revision   revision counter the agent already holds in memory",
    "  --harness    overrides auto-detection (today only claude-code auto-detects)",
    "  --model      resolved model or native control; required with event spawn",
    "  --role       role being spawned; required with event spawn",
    `  --effort     ${EFFORTS.join(" | ")}; required with event spawn`,
  ].join("\n");
}

function fail(message) {
  process.stderr.write(`${message}\n\n${usage()}\n`);
  process.exit(1);
}

function parseArgs(argv) {
  const positional = [];
  let index = 0;
  while (index < argv.length && positional.length < 4) {
    if (argv[index].startsWith("--")) fail(`Missing positional argument before ${argv[index]}`);
    positional.push(argv[index]);
    index += 1;
  }
  if (positional.length < 4) fail("Missing <skill> <event> <status> \"<summary>\"");
  const flags = {};
  while (index < argv.length) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (!flag.startsWith("--") || value === undefined) fail(`Use --name value arguments, got: ${flag}`);
    const name = flag.slice(2);
    if (flags[name] !== undefined) fail(`Duplicate argument: ${flag}`);
    flags[name] = value;
    index += 2;
  }
  for (const name of Object.keys(flags)) {
    if (!["agent", "spec", "project", "revision", "harness", "model", "role", "effort"].includes(name)) fail(`Unknown argument: --${name}`);
  }
  const [skill, event, status, summary] = positional;
  return { skill, event, status, summary, flags };
}

function clean(name, value, required = false) {
  const cleaned = value?.trim();
  if (!cleaned) {
    if (required) fail(`Missing or empty --${name}`);
    return "-";
  }
  if (/\r|\n|\|/.test(cleaned)) fail(`--${name} cannot contain a line break or |`);
  return cleaned;
}

function repositoryRoot(...starts) {
  let marked = "";
  for (const start of starts) {
    let current = path.resolve(start);
    while (true) {
      if (fs.existsSync(path.join(current, ".git"))) return current;
      if (!marked && fs.existsSync(path.join(current, ".aiddbot"))) marked = current;
      const parent = path.dirname(current);
      if (parent === current) break;
      current = parent;
    }
  }
  return marked || path.resolve(starts[0]);
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function field(value, width = 6) {
  if (value.length > width) process.stderr.write(`Note: "${value}" is longer than ${width} chars and will be truncated in the table.\n`);
  return value.trim().slice(0, width).padEnd(width, " ");
}

function specFromBranch(root) {
  try {
    const branch = execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    const match = /^(?:feat|fix|chore)\/(S\d{4})-/.exec(branch);
    return match ? match[1] : "-";
  } catch {
    return "-";
  }
}

function detectHarness() {
  if (process.env.CLAUDECODE === "1") return "claude-code";
  return "-";
}

// --- parse and validate ---

const { skill, event, status, summary, flags } = parseArgs(process.argv.slice(2));

const stage = STAGE_BY_SKILL[skill];
if (!stage) fail(`Unknown skill: ${skill}\nKnown skills: ${Object.keys(STAGE_BY_SKILL).join(", ")}`);

const cleanEvent = clean("event", event, true);
const statusKey = status.trim().toLowerCase();
if (!STATUS_LEVELS[statusKey]) fail(`Invalid status: ${status}\nValid values: ${Object.keys(STATUS_LEVELS).join(", ")}`);
const cleanSummary = clean("summary", summary, true);

const agent = flags.agent !== undefined ? clean("agent", flags.agent, true) : "Direct";
if (!AGENT_LABELS[agent]) fail(`Invalid --agent: ${agent}\nValid values: ${Object.keys(AGENT_LABELS).join(", ")}`);

const project = clean("project", flags.project);
const revision = clean("revision", flags.revision);
const harness = flags.harness !== undefined ? clean("harness", flags.harness) : detectHarness();
let model = clean("model", flags.model);

let finalSummary = cleanSummary;
if (cleanEvent.toLowerCase() === "spawn") {
  const role = clean("role", flags.role, true);
  const effort = clean("effort", flags.effort, true).toLowerCase();
  if (!EFFORTS.includes(effort)) fail(`Invalid --effort: ${flags.effort}\nValid values: ${EFFORTS.join(", ")}`);
  const spawnModel = clean("model", flags.model, true);
  finalSummary = `${role} · ${effort} → ${spawnModel} · ${cleanSummary}`;
}

const root = repositoryRoot(path.dirname(fileURLToPath(import.meta.url)), process.cwd());
const spec = flags.spec !== undefined ? clean("spec", flags.spec) : specFromBranch(root);
const journals = path.join(root, ".aiddbot", "journals");

const row = (cells) => cells.join(" ");
const now = new Date();
const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
const journal = path.join(journals, `${date}.log`);
const agentLabel = AGENT_LABELS[agent];
const line = `${row([field(time, 8), field(STATUS_LEVELS[statusKey]), field(agentLabel), field(spec), field(stage, 8), field(cleanEvent, 8), field(project), field(revision, 3), finalSummary])}\n`;

let prefix = "";
if (!fs.existsSync(journal) || fs.statSync(journal).size === 0) {
  const runtime = [["Harness", harness], ["Model", model]].filter(([, value]) => value !== "-").map(([name, value]) => `${name} · ${value}`).join(" | ");
  const names = [field("agent"), field("spec"), field("stage", 8), field("event", 8)];
  prefix = `# Journal · ${date}\n${runtime ? `# ${runtime}\n` : ""}\n${row([field("time", 8), field("status"), ...names, field("proj"), field("rev", 3), "summary"])}\n`;
}

fs.mkdirSync(journals, { recursive: true });
fs.appendFileSync(journal, prefix + line, { encoding: "utf8", flag: "a" });
process.stdout.write(line);

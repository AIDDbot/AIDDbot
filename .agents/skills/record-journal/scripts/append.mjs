#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function argumentsFrom(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 2) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (!flag?.startsWith("--") || value === undefined) fail("Use --name value arguments");
    const name = flag.slice(2);
    if (values[name] !== undefined) fail(`Duplicate argument: ${flag}`);
    values[name] = value;
  }
  return values;
}

function clean(name, value, required = false) {
  const cleaned = value?.trim();
  if (!cleaned) {
    if (required) fail(`Missing --${name}`);
    return "-";
  }
  if (/\r|\n|\|/.test(cleaned)) fail(`--${name} cannot contain a line break or |`);
  return cleaned;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function field(value, width = 6) {
  return value.trim().slice(0, width).padEnd(width, " ");
}

function level(status) {
  return { green: "Info", success: "Info", info: "Info", amber: "Warn", warning: "Warn", warn: "Warn", red: "Error", error: "Error" }[status.toLowerCase()] ?? status;
}

const input = argumentsFrom(process.argv.slice(2));
for (const name of Object.keys(input)) {
  if (!["agent", "spec", "stage", "event", "status", "summary", "project", "revision", "harness", "model"].includes(name)) fail(`Unknown argument: --${name}`);
}

const agent = clean("agent", input.agent, true);
const stage = clean("stage", input.stage, true);
const event = clean("event", input.event, true);
const status = clean("status", input.status, true);
const summary = clean("summary", input.summary, true);
const spec = clean("spec", input.spec);
const project = clean("project", input.project);
const revision = clean("revision", input.revision);
const harness = clean("harness", input.harness);
const model = clean("model", input.model);

const folder = path.resolve(".aiddbot");
const journal = path.join(folder, "journal.log");
const ignore = path.join(folder, ".gitignore");
fs.mkdirSync(folder, { recursive: true });

const ignored = fs.existsSync(ignore) ? fs.readFileSync(ignore, "utf8") : "";
if (!/^\/?journal\.log\s*$/m.test(ignored)) {
  fs.appendFileSync(ignore, `${ignored && !ignored.endsWith("\n") ? "\n" : ""}journal.log\n`, "utf8");
}

const row = (cells) => cells.join(" ");
const now = new Date();
const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
const agentLabel = { Architect: "Arch", Builder: "Build", Craftsman: "Craft", Direct: "Direct" }[agent] ?? agent;
const line = `${row([field(time, 8), field(level(status)), field(agentLabel), field(spec), field(stage, 8), field(event, 8), field(project), field(revision, 3), summary])}\n`;

let prefix = "";
if (!fs.existsSync(journal) || fs.statSync(journal).size === 0) {
  const runtime = [["Harness", harness], ["Model", model]].filter(([, value]) => value !== "-").map(([name, value]) => `${name} · ${value}`).join(" | ");
  const names = [field("agent"), field("spec"), field("stage", 8), field("event", 8)];
  prefix = `# Journal · ${date}\n${runtime ? `# ${runtime}\n` : ""}\n${row([field("time", 8), field("status"), ...names, field("proj"), field("rev", 3), "summary"])}\n`;
}

fs.appendFileSync(journal, prefix + line, { encoding: "utf8", flag: "a" });

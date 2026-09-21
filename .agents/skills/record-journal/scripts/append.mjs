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

function field(value, width = 8) {
  return value.trim().slice(0, width).padEnd(width, " ");
}

function level(status) {
  return { green: "Info", success: "Info", info: "Info", amber: "Warn", warning: "Warn", warn: "Warn", red: "Error", error: "Error" }[status.toLowerCase()] ?? status;
}

const input = argumentsFrom(process.argv.slice(2));
for (const name of Object.keys(input)) {
  if (!["flow", "spec", "stage", "event", "status", "summary", "project", "revision"].includes(name)) fail(`Unknown argument: --${name}`);
}

const flow = clean("flow", input.flow, true);
const stage = clean("stage", input.stage, true);
const event = clean("event", input.event, true);
const status = clean("status", input.status, true);
const summary = clean("summary", input.summary, true);
const spec = clean("spec", input.spec);
const project = clean("project", input.project);
const revision = clean("revision", input.revision);

const folder = path.resolve(".aiddbot");
const journal = path.join(folder, "journal.log");
const ignore = path.join(folder, ".gitignore");
fs.mkdirSync(folder, { recursive: true });

const ignored = fs.existsSync(ignore) ? fs.readFileSync(ignore, "utf8") : "";
if (!/^\/?journal\.log\s*$/m.test(ignored)) {
  fs.appendFileSync(ignore, `${ignored && !ignored.endsWith("\n") ? "\n" : ""}journal.log\n`, "utf8");
}

const row = (cells) => cells.join(" | ");
const now = new Date();
const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
const line = `${row([time, field(level(status), 6), field(flow), field(spec), field(stage), field(event), field(project), field(revision), summary])}\n`;

let prefix = "";
if (!fs.existsSync(journal) || fs.statSync(journal).size === 0) {
  const names = ["flow", "spec", "stage", "event", "project", "revision"].map((name) => field(name));
  prefix = `# Journal · ${date}\n\n${row([field("# time"), field("status", 6), ...names, "summary"])}\n`;
}

fs.appendFileSync(journal, prefix + line, { encoding: "utf8", flag: "a" });

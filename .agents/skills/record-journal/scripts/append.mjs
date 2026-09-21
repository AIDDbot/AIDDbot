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

const input = argumentsFrom(process.argv.slice(2));
for (const name of Object.keys(input)) {
  if (!["journal", "stage", "event", "status", "summary", "project", "revision"].includes(name)) fail(`Unknown argument: --${name}`);
}

const journal = path.resolve(clean("journal", input.journal, true));
const stage = clean("stage", input.stage, true);
const event = clean("event", input.event, true);
const status = clean("status", input.status, true);
const summary = clean("summary", input.summary, true);
const project = clean("project", input.project);
const revision = clean("revision", input.revision);

const parent = path.dirname(journal);
if (!fs.existsSync(parent) || !fs.statSync(parent).isDirectory()) fail(`Journal directory does not exist: ${parent}`);

const now = new Date();
const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
const line = `${time} | ${stage} | ${event} | ${status} | project=${project} | revision=${revision} | ${summary}\n`;

let prefix = "";
try {
  if (fs.statSync(journal).size === 0) prefix = `# Journal · ${date}\n\n`;
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  prefix = `# Journal · ${date}\n\n`;
}

fs.appendFileSync(journal, prefix + line, { encoding: "utf8", flag: "a" });

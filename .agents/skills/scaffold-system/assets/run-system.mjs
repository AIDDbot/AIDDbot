#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "aiddbot.system.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const children = new Set();

function readPackage(project) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, project.directory, "package.json"), "utf8"));
  } catch {
    return null;
  }
}

function commandFor(project, purpose) {
  const packageJson = readPackage(project);
  const candidates = purpose === "start" ? ["start", "dev"] : ["test:e2e", "test:acceptance", "test"];
  return candidates.find((name) => packageJson?.scripts?.[name]) ?? null;
}

function launch(project, script) {
  const command = ["npm", "run", script, "--prefix", project.directory];
  const executable = process.platform === "win32" ? process.env.ComSpec || "cmd.exe" : "npm";
  const args = process.platform === "win32" ? ["/d", "/s", "/c", command.join(" ")] : command.slice(1);
  const child = spawn(executable, args, { cwd: root, stdio: "inherit", windowsHide: true });
  children.add(child);
  child.once("exit", () => children.delete(child));
  return child;
}

function stopAll() {
  for (const child of children) child.kill();
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
}

async function wait(milliseconds) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function main() {
  const purpose = process.argv[2] ?? "start";
  if (!["start", "test:e2e"].includes(purpose)) return fail(`Unknown system command: ${purpose}`);
  const projects = manifest.projects ?? [];
  const services = projects
    .filter((project) => project.kind !== "e2e")
    .map((project) => ({ project, script: commandFor(project, "start") }))
    .filter(({ script }) => script);
  if (purpose === "start") {
    if (!services.length) return fail("No project exposes a start or dev script.");
    for (const { project, script } of services) launch(project, script);
    process.on("SIGINT", () => { stopAll(); });
    process.on("SIGTERM", () => { stopAll(); });
    return;
  }
  const e2e = projects.find((project) => project.kind === "e2e");
  if (!e2e) return fail("No e2e project was scaffolded.");
  const testScript = commandFor(e2e, "test:e2e");
  if (!testScript) return fail(`The e2e project at ${e2e.directory} has no test script.`);
  for (const { project, script } of services) launch(project, script);
  if (services.length) await wait(1000);
  const test = launch(e2e, testScript);
  const exitCode = await new Promise((resolve) => test.once("exit", (code) => resolve(code ?? 1)));
  stopAll();
  process.exitCode = exitCode;
}

main().catch((error) => { fail(error.message); stopAll(); });

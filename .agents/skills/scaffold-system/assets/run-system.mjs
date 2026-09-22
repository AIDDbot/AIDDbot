#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, ".aiddbot", "aiddbot.system.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const children = new Set();
const isWindows = process.platform === "win32";

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

// Tell the E2E project where each sibling lives, e.g. BACK_DIRECTORY and FRONT_DIRECTORY.
function targetDirectories(projects) {
  return Object.fromEntries(projects
    .filter((project) => project.kind !== "e2e")
    .map((project) => [`${project.kind.toUpperCase()}_DIRECTORY`, path.join(root, project.directory)]));
}

function launch(project, script, env = {}) {
  const command = ["npm", "run", script, "--prefix", project.directory];
  const executable = isWindows ? process.env.ComSpec || "cmd.exe" : "npm";
  const args = isWindows ? ["/d", "/s", "/c", command.join(" ")] : command.slice(1);
  // POSIX children lead their own process group so the whole tree can be stopped at once.
  const child = spawn(executable, args, {
    cwd: root,
    detached: !isWindows,
    env: { ...process.env, ...env },
    stdio: "inherit",
    windowsHide: true,
  });
  children.add(child);
  child.once("exit", () => children.delete(child));
  return child;
}

// Killing only the shell leaves the servers listening, so stop each whole process tree.
function stopTree(child) {
  if (child.exitCode !== null || child.signalCode !== null) return;
  if (isWindows) {
    spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
    return;
  }
  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    child.kill("SIGTERM");
  }
}

function stopAll() {
  for (const child of children) stopTree(child);
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
}

async function wait(milliseconds) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function stopOnSignals() {
  for (const signal of ["SIGINT", "SIGTERM"]) {
    process.on(signal, () => {
      stopAll();
      process.exit(130);
    });
  }
}

async function main() {
  const purpose = process.argv[2] ?? "start";
  if (!["start", "test:e2e"].includes(purpose)) return fail(`Unknown system command: ${purpose}`);
  const projects = manifest.projects ?? [];
  const services = projects
    .filter((project) => project.kind !== "e2e")
    .map((project) => ({ project, script: commandFor(project, "start") }))
    .filter(({ script }) => script);
  stopOnSignals();
  if (purpose === "start") {
    if (!services.length) return fail("No project exposes a start or dev script.");
    for (const { project, script } of services) launch(project, script);
    return;
  }
  const e2e = projects.find((project) => project.kind === "e2e");
  if (!e2e) return fail("No e2e project was scaffolded.");
  const testScript = commandFor(e2e, "test:e2e");
  if (!testScript) return fail(`The e2e project at ${e2e.directory} has no test script.`);
  // A self-hosting suite starts its own targets on its own ports; starting them here too only duplicates them.
  const ownedServices = e2e.startsTargets ? [] : services;
  for (const { project, script } of ownedServices) launch(project, script);
  if (ownedServices.length) await wait(1000);
  const test = launch(e2e, testScript, targetDirectories(projects));
  const exitCode = await new Promise((resolve) => test.once("exit", (code) => resolve(code ?? 1)));
  stopAll();
  process.exitCode = exitCode;
}

main().catch((error) => { fail(error.message); stopAll(); });

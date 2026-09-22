#!/usr/bin/env node
// Root entry point: `start` runs every service; `test:e2e` runs the E2E suite, which starts its own targets.
import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { projects = [] } = JSON.parse(fs.readFileSync(path.join(root, ".aiddbot", "aiddbot.system.json"), "utf8"));
const isWindows = process.platform === "win32";
const children = new Set();

const fail = (message) => {
  process.stderr.write(`${message}\n`);
  return 1;
};
const readScripts = (project) => {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, project.directory, "package.json"), "utf8")).scripts ?? {};
  } catch {
    return {};
  }
};
const firstScript = (project, names) => names.find((name) => readScripts(project)[name]);
// Tell the E2E suite where each sibling lives, e.g. BACK_DIRECTORY and FRONT_DIRECTORY.
const targetDirectories = () => Object.fromEntries(projects
  .filter((project) => project.kind !== "e2e")
  .map((project) => [`${project.kind.toUpperCase()}_DIRECTORY`, path.join(root, project.directory)]));

function launch(project, script, env = {}) {
  const command = ["npm", "run", script, "--prefix", project.directory];
  // POSIX children lead their own process group so the whole tree can be stopped at once.
  const child = spawn(isWindows ? process.env.ComSpec || "cmd.exe" : "npm", isWindows ? ["/d", "/s", "/c", command.join(" ")] : command.slice(1), {
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

// Killing only the shell leaves servers listening, so stop each whole process tree.
function stopAll() {
  for (const child of children) {
    if (isWindows) spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
    else {
      try {
        process.kill(-child.pid, "SIGTERM");
      } catch {
        // The group already exited.
      }
    }
  }
}

function start() {
  const services = projects
    .filter((project) => project.kind !== "e2e")
    .map((project) => [project, firstScript(project, ["start", "dev"])])
    .filter(([, script]) => script);
  if (!services.length) return fail("No project exposes a start or dev script.");
  for (const [project, script] of services) launch(project, script);
  return undefined;
}

async function testE2e() {
  const e2e = projects.find((project) => project.kind === "e2e");
  if (!e2e) return fail("No e2e project was scaffolded.");
  const script = firstScript(e2e, ["test:e2e", "test:acceptance", "test"]);
  if (!script) return fail(`The e2e project at ${e2e.directory} has no test script.`);
  const test = launch(e2e, script, targetDirectories());
  return new Promise((resolve) => test.once("exit", (code) => resolve(code ?? 1)));
}

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    stopAll();
    process.exit(130);
  });
}
const commands = { start, "test:e2e": testE2e };
const purpose = process.argv[2] ?? "start";
process.exitCode = Object.hasOwn(commands, purpose) ? await commands[purpose]() : fail(`Unknown system command: ${purpose}`);

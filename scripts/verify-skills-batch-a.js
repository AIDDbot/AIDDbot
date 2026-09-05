#!/usr/bin/env node
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const powerShellHelper = path.join(root, ".agents", "skills", "verify", "scripts", "free-port.ps1");
const bashHelper = path.join(root, ".agents", "skills", "verify", "scripts", "free-port.sh");
const powerShell = process.platform === "win32" ? "pwsh.exe" : "pwsh";

function fail(message) {
  throw new Error(message);
}

function startListener() {
  const source = [
    'const net = require("node:net");',
    'const server = net.createServer();',
    'server.listen(0, "127.0.0.1", () => process.stdout.write(`${server.address().port}\\n`));',
    'process.on("SIGTERM", () => server.close(() => process.exit(0)));',
  ].join("");
  const child = spawn(process.execPath, ["-e", source], { stdio: ["ignore", "pipe", "inherit"] });
  return new Promise((resolve, reject) => {
    let output = "";
    child.once("error", reject);
    child.stdout.on("data", (chunk) => {
      output += chunk;
      const newline = output.indexOf("\n");
      if (newline !== -1) resolve({ child, port: Number(output.slice(0, newline)) });
    });
    child.once("exit", (code) => reject(new Error(`listener exited before readiness (${code})`)));
  });
}

function powerShellStartIdentity(pid) {
  const result = spawnSync(powerShell, [
    "-NoProfile",
    "-Command",
    `(Get-Process -Id ${pid}).StartTime.ToUniversalTime().Ticks`,
  ], { encoding: "utf8" });
  if (result.status !== 0) fail(`could not read process identity: ${result.stderr}`);
  return result.stdout.trim();
}

function runPowerShellHelper(ownerPid, ownerStartTicks, port) {
  return spawnSync(powerShell, [
    "-NoProfile",
    "-File", powerShellHelper,
    "-OwnerPid", String(ownerPid),
    "-OwnerStartTicks", ownerStartTicks,
    String(port),
  ], { encoding: "utf8" });
}

function bashStartIdentity(pid) {
  const result = spawnSync("ps", ["-p", String(pid), "-o", "lstart="], { encoding: "utf8" });
  if (result.status !== 0) fail(`could not read process identity: ${result.stderr}`);
  return result.stdout.trim();
}

function runBashHelper(ownerPid, ownerStart, port) {
  return spawnSync("bash", [
    bashHelper,
    "--owner-pid", String(ownerPid),
    "--owner-start", ownerStart,
    String(port),
  ], { encoding: "utf8" });
}

function isListening(port) {
  return new Promise((resolve) => {
    const socket = net.connect({ host: "127.0.0.1", port });
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("error", () => resolve(false));
  });
}

async function stopSpawned(child) {
  if (child.exitCode !== null) return;
  child.kill();
  await new Promise((resolve) => child.once("exit", resolve));
}

async function verifyOwnership(startIdentity, runHelper) {
  const foreign = await startListener();
  try {
    const result = runHelper(process.pid, startIdentity(process.pid), foreign.port);
    if (result.status === 0 || !/not owned by this run/.test(`${result.stdout}\n${result.stderr}`)) {
      fail("foreign listener collision was not reported");
    }
    if (foreign.child.exitCode !== null || !(await isListening(foreign.port))) {
      fail("foreign listener was stopped");
    }
  } finally {
    await stopSpawned(foreign.child);
  }

  const stale = await startListener();
  try {
    const result = runHelper(stale.child.pid, "1", stale.port);
    if (result.status === 0 || !/start identity changed/.test(`${result.stdout}\n${result.stderr}`)) {
      fail("stale process identity was not rejected");
    }
    if (stale.child.exitCode !== null || !(await isListening(stale.port))) {
      fail("listener with mismatched start identity was stopped");
    }
  } finally {
    await stopSpawned(stale.child);
  }

  const owned = await startListener();
  const result = runHelper(owned.child.pid, startIdentity(owned.child.pid), owned.port);
  if (result.status !== 0) fail(`owned listener was not stopped: ${result.stderr}`);
  await new Promise((resolve) => setTimeout(resolve, 100));
  if (await isListening(owned.port)) fail("owned listener port remains occupied");
}

if (process.platform === "win32") {
  await verifyOwnership(powerShellStartIdentity, runPowerShellHelper);
  process.stdout.write("PASS batch A: PowerShell ownership identity and foreign-listener isolation\n");
} else {
  await verifyOwnership(bashStartIdentity, runBashHelper);
  process.stdout.write("PASS batch A: Bash ownership identity and foreign-listener isolation\n");
}

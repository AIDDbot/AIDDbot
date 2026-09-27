// Free a TCP port before an acceptance run starts, so the suite gets a fresh
// target instead of reusing a leftover listener with stale data. Self-contained
// per call: it captures whichever process is listening right now and stops
// only that one, instead of trusting a PID passed in from an earlier process
// (this absorbs verify-behavior/scripts/free-port.ps1 and .sh into the core).
import { spawnSync } from "node:child_process";
import { RuleError } from "./cli.mjs";

const WIN = process.platform === "win32";

function run(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8", windowsHide: true });
  return result.status === 0 ? result.stdout : "";
}

/** The PID listening on `port`, or null. One TCP listener is assumed per port. */
function listenerPid(port) {
  if (WIN) {
    const line = run("netstat", ["-ano", "-p", "TCP"])
      .split(/\r?\n/)
      .map((entry) => entry.trim().split(/\s+/))
      .find((columns) => columns[0] === "TCP" && new RegExp(`[:.]${port}$`).test(columns[1] ?? "") && columns[3] === "LISTENING");
    const pid = line?.at(-1);
    return pid && /^\d+$/.test(pid) ? Number(pid) : null;
  }
  const pid = (run("lsof", ["-ti", `TCP:${port}`, "-sTCP:LISTEN"]) || run("fuser", ["-n", "tcp", String(port)])).trim().split(/\s+/)[0];
  return pid && /^\d+$/.test(pid) ? Number(pid) : null;
}

function isAlive(pid) {
  try { return process.kill(pid, 0), true; } catch { return false; }
}

/** Node's `process.kill` terminates the process on Windows too, regardless of the signal name. */
function stop(pid, force) {
  try { process.kill(pid, force ? "SIGKILL" : "SIGTERM"); } catch { /* already gone */ }
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function waitUntilFree(port, pid, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (listenerPid(port) !== pid) return true;
    sleep(200);
  }
  return listenerPid(port) !== pid;
}

/** Stop the current listener on `port`, if any; throw when it cannot be freed. */
function freePort(port) {
  const pid = listenerPid(port);
  if (pid === null) return { port, freed: false, pid: null };
  stop(pid, false);
  if (!waitUntilFree(port, pid, 5000)) {
    if (isAlive(pid)) stop(pid, true);
    if (!waitUntilFree(port, pid, 5000)) throw new RuleError(`Port ${port} is still occupied by PID ${pid} after stopping it.`);
  }
  return { port, freed: true, pid };
}

/** Free every configured port before an acceptance run. Ports are optional per project. */
export function freeConfiguredPorts(ports = []) {
  return ports.map(freePort);
}

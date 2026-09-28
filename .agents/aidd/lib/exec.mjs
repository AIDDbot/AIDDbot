// Run one shell command for `aidd run` and summarize its outcome; never throws
// on a failing command — a lint or test failure is a normal result, not a bug.
import { spawnSync } from "node:child_process";

const MAX_OUTPUT = 4000;

function tail(text) {
  return text.length <= MAX_OUTPUT ? text : `… (truncated) …\n${text.slice(-MAX_OUTPUT)}`;
}

export function execCommand(cwd, command, env = {}) {
  const start = Date.now();
  const result = spawnSync(command, { cwd, shell: true, encoding: "utf8", windowsHide: true, env: { ...process.env, ...env } });
  const exitCode = result.status ?? (result.signal ? 128 : 1);
  return {
    command, exitCode, ok: exitCode === 0, durationMs: Date.now() - start,
    output: tail(`${result.stdout ?? ""}${result.stderr ?? ""}`.trim()),
  };
}

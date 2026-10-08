// Shared helpers of the core tests: each test drives the CLI in a throwaway git repository.
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CORE = fileURLToPath(new URL("../.agents/aidd/aidd.mjs", import.meta.url));

export function git(cwd, ...args) {
  return execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
}

export function write(root, file, text) {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
  fs.writeFileSync(path.join(root, file), text);
}

export function repo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "aidd-core-"));
  git(root, "init", "-q", "-b", "main");
  git(root, "config", "user.email", "test@example.com");
  git(root, "config", "user.name", "Test");
  write(root, ".aiddbot/counters.yaml", "spec: 0\ndebt: 0\n");
  write(root, ".aiddbot/config.json", '{ "projects": {} }\n');
  write(root, ".product/quality/debt.json", '{ "items": [] }\n');
  write(root, "package.json", '{ "name": "demo", "version": "0.1.0", "private": true }\n');
  git(root, "add", "-A");
  git(root, "commit", "-q", "-m", "chore: init");
  return root;
}

export function aidd(root, ...args) {
  const result = spawnSync(process.execPath, [CORE, ...args], { cwd: root, encoding: "utf8" });
  let body = null;
  try {
    body = JSON.parse(result.stdout);
  } catch {
    body = result.stdout;
  }
  return { code: result.status, body };
}

/** Configure an e2e project whose acceptance command exits with `code`, tag `specs`' R01, then run it. */
export function accept(root, code = 0, ...specs) {
  write(root, "e2e/tags.spec.ts", specs.map((id) => `test("@${id}-R01", () => {});\n`).join(""));
  const project = { path: "e2e", commands: { acceptance: `node -e "process.exit(${code})"` } };
  aidd(root, "config", "set", "projects.e2e", JSON.stringify(project));
  return aidd(root, "run", "acceptance");
}

export function readJson(root, file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
}

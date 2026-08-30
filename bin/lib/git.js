"use strict";

const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

function runGit(destRoot, args) {
  return spawnSync("git", args, { cwd: destRoot, encoding: "utf8", windowsHide: true });
}

function ensureGit(destRoot, dryRun) {
  const gitDir = path.join(destRoot, ".git");
  if (fs.existsSync(gitDir)) {
    process.stdout.write("git        skip       already a repo\n");
    return true;
  }
  if (dryRun) {
    process.stdout.write("git        create     git init\n");
    return true;
  }
  fs.mkdirSync(destRoot, { recursive: true });
  const result = runGit(destRoot, ["init"]);
  if (result.status !== 0) {
    process.stderr.write("git init failed; continuing without a repo.\n");
    if (result.stderr) process.stderr.write(result.stderr);
    return false;
  }
  process.stdout.write("git        create     git init\n");
  return true;
}

function gitConfig(destRoot, key) {
  const result = runGit(destRoot, ["config", key]);
  return result.status === 0 ? result.stdout.trim() : "";
}

function commitIdentity(destRoot) {
  if (gitConfig(destRoot, "user.name") && gitConfig(destRoot, "user.email")) return [];
  return ["-c", "user.name=AIDDbot", "-c", "user.email=aiddbot@localhost"];
}

function commitFiles(destRoot, files, message, dryRun) {
  if (!files.length) {
    process.stdout.write("git        skip       nothing to commit\n");
    return;
  }
  if (dryRun) {
    process.stdout.write(`git        would      commit ${files.length} files\n`);
    return;
  }
  if (!fs.existsSync(path.join(destRoot, ".git"))) {
    process.stdout.write("git        skip       no repo\n");
    return;
  }
  const add = runGit(destRoot, ["add", "--", ...files]);
  if (add.status !== 0) {
    process.stderr.write("git add failed; skipping commit.\n");
    if (add.stderr) process.stderr.write(add.stderr);
    return;
  }
  const staged = runGit(destRoot, ["diff", "--cached", "--quiet"]);
  if (staged.status === 0) {
    process.stdout.write("git        skip       nothing to commit\n");
    return;
  }
  const commit = runGit(destRoot, [...commitIdentity(destRoot), "commit", "-m", message]);
  if (commit.status !== 0) {
    process.stderr.write("git commit failed.\n");
    if (commit.stderr) process.stderr.write(commit.stderr);
    return;
  }
  process.stdout.write(`git        commit     ${message}\n`);
}

module.exports = { ensureGit, commitFiles };

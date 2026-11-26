import { execFileSync } from "node:child_process";
import { mkdtempSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const repository = resolve(import.meta.dir, "..", "..", "..");
const explorer = join(repository, "packages", "explorer");
const sourceBranch = "main";
const siteBranch = "refs/heads/gh-pages";

/** The local state of the source branch, compared with origin. */
export interface SourceState {
  branch: string;
  dirty: boolean;
  ahead: number;
  behind: number;
}

/** What the publication does with the source branch before it builds. */
export type SourceAction = { push: boolean } | { stop: string };

/**
 * Publish only what origin holds. A clean local main that is ahead gets pushed first;
 * any other difference stops the publication.
 */
export function checkSource(state: SourceState): SourceAction {
  if (state.branch !== sourceBranch) {
    return { stop: `Switch to ${sourceBranch} before you publish. The current branch is ${state.branch}.` };
  }
  if (state.dirty) {
    return { stop: "Commit or stash your changes before you publish. The working tree is not clean." };
  }
  if (state.behind > 0) {
    return { stop: `Pull origin/${sourceBranch} before you publish. Local ${sourceBranch} is ${state.behind} commit(s) behind.` };
  }
  return { push: state.ahead > 0 };
}

function git(args: string[], cwd = repository, env = process.env): string {
  return execFileSync("git", args, {
    cwd,
    env,
    encoding: "utf8",
    stdio: ["inherit", "pipe", "inherit"],
  }).trim();
}

function readSource(): SourceState {
  const branch = git(["rev-parse", "--abbrev-ref", "HEAD"]);
  const dirty = git(["status", "--porcelain", "--untracked-files=all"]) !== "";
  const [behind = 0, ahead = 0] = git([
    "rev-list",
    "--left-right",
    "--count",
    `refs/remotes/origin/${sourceBranch}...HEAD`,
  ])
    .split(/\s+/)
    .map(Number);
  return { branch, dirty, ahead, behind };
}

async function publish(): Promise<void> {
  git(["fetch", "--no-tags", "origin", `refs/heads/${sourceBranch}:refs/remotes/origin/${sourceBranch}`]);
  const action = checkSource(readSource());
  if ("stop" in action) {
    console.error(action.stop);
    process.exit(1);
  }
  if (action.push) {
    console.log(`Pushing ${sourceBranch} to origin`);
    git(["push", "origin", `${sourceBranch}:${sourceBranch}`]);
  }

  const revision = git(["rev-parse", "HEAD"]);
  const previous = git(["ls-remote", "--refs", "origin", siteBranch]).split(/\s+/)[0];
  if (previous) git(["fetch", "--no-tags", "origin", siteBranch]);

  const temporary = mkdtempSync(join(realpathSync(tmpdir()), "aiddbot-explorer-"));
  const site = join(temporary, "site");

  try {
    console.log(`Building the explorer from ${revision}`);
    // The checkout matches origin, so the build reuses the local dependencies.
    execFileSync(process.execPath, ["install", "--frozen-lockfile"], {
      cwd: explorer,
      stdio: "inherit",
    });
    execFileSync(process.execPath, ["run", "build", "--root", repository, "--out", site], {
      cwd: explorer,
      stdio: "inherit",
    });
    await Bun.write(join(site, ".nojekyll"), "");

    // Stage the generated site in its own index so the source index stays intact.
    const storage = git(["rev-parse", "--absolute-git-dir"]);
    const siteGit = [`--git-dir=${storage}`, `--work-tree=${site}`];
    const siteEnv = { ...process.env, GIT_INDEX_FILE: join(temporary, "site.index") };
    git([...siteGit, "add", "--all", "--force", "--", "."], site, siteEnv);
    const tree = git([...siteGit, "write-tree"], site, siteEnv);

    const parent = previous ? ["-p", previous] : [];
    const publication = git([
      "commit-tree",
      tree,
      ...parent,
      "-m",
      `chore: publish the knowledge explorer from ${revision}`,
    ]);
    git(["push", "origin", `${publication}:${siteBranch}`]);
    console.log(`Pushed ${publication} to origin/gh-pages for GitHub Pages.`);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
}

if (import.meta.main) await publish();

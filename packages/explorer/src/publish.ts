import { execFileSync } from "node:child_process";
import { mkdtempSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const repository = resolve(import.meta.dir, "..", "..", "..");
const siteBranch = "refs/heads/gh-pages";

function git(args: string[], cwd = repository, env = process.env): string {
  return execFileSync("git", args, {
    cwd,
    env,
    encoding: "utf8",
    stdio: ["inherit", "pipe", "inherit"],
  }).trim();
}

git(["fetch", "--no-tags", "origin", "refs/heads/main:refs/remotes/origin/main"]);
const revision = git(["rev-parse", "refs/remotes/origin/main"]);
const previous = git(["ls-remote", "--refs", "origin", siteBranch]).split(/\s+/)[0];
if (previous) git(["fetch", "--no-tags", "origin", siteBranch]);

const temporary = mkdtempSync(join(realpathSync(tmpdir()), "aiddbot-explorer-"));
const source = join(temporary, "source");
const site = join(temporary, "site");
let hasWorktree = false;

try {
  console.log(`Building the explorer from ${revision}`);
  git(["worktree", "add", "--detach", source, revision]);
  hasWorktree = true;

  const explorer = join(source, "packages", "explorer");
  execFileSync(process.execPath, ["install", "--frozen-lockfile"], {
    cwd: explorer,
    stdio: "inherit",
  });
  execFileSync(process.execPath, ["run", "build", "--out", site], {
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
  if (hasWorktree) git(["worktree", "remove", "--force", source]);
  rmSync(temporary, { recursive: true, force: true });
}

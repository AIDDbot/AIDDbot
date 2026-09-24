import fs from "node:fs";
import path from "node:path";
import {
  DEFAULTS,
  TRACKED_SCRIPTS,
  copyRootDefaults,
  fail,
  hasContent,
  objectOr,
  out,
  readJsonOr,
  selectedTiers,
  slug,
  spawnNpx,
  writeJson,
} from "./materialize.helpers.mjs";

function runTiged(repo, destination, workspace, dryRun) {
  const folder = path.basename(destination);
  if (dryRun) {
    out(`fetch      would      ${repo} -> ${folder}`);
    return 0;
  }
  if (hasContent(destination)) return fail(`Refusing to overwrite ${folder}`);
  const result = spawnNpx(["--yes", "--package=tiged", "--", "tiged", repo, folder], workspace);
  if (result.status !== 0) fail(`tiged failed: ${repo}`);
  return result.status ?? 1;
}

function brandFrontProject(workspace, { frontDir, name, author, dryRun }) {
  const packagePath = path.join(workspace, frontDir, "package.json");
  if (dryRun) {
    out(`update     ${frontDir}/package.json displayName, author`);
    return 0;
  }
  const packageJson = readJsonOr(packagePath, null);
  if (!packageJson) return fail(`${frontDir}/package.json is missing or invalid; cannot set displayName and author`);
  writeJson(packagePath, Object.assign(packageJson, { displayName: name.trim(), author: author.trim() }));
  return 0;
}

function describeProject(workspace, options, tier) {
  const directory = options[`${tier}Dir`];
  const scripts = objectOr(readJsonOr(path.join(workspace, directory, "package.json"), null)?.scripts);
  return {
    kind: tier,
    technology: options[tier],
    directory,
    scripts: Object.fromEntries(TRACKED_SCRIPTS.filter((key) => typeof scripts[key] === "string").map((key) => [key, scripts[key]])),
  };
}

function buildManifest(workspace, options) {
  const projects = selectedTiers(options).map((tier) => describeProject(workspace, options, tier));
  return { name: options.name, slug: slug(options.name), projects };
}

function writeManifest(workspace, manifest, dryRun) {
  const manifestPath = path.join(workspace, DEFAULTS.manifest);
  if (fs.existsSync(manifestPath)) return fail("Refusing to overwrite existing system manifest");
  if (dryRun) {
    out(`create     ${DEFAULTS.manifest}`);
    return 0;
  }
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  writeJson(manifestPath, manifest);
  return 0;
}

function writeRootPackage(workspace, options) {
  const packagePath = path.join(workspace, "package.json");
  const hasPackage = fs.existsSync(packagePath);
  const packageJson = hasPackage ? readJsonOr(packagePath, null) : {};
  if (!packageJson) return fail("Root package.json is invalid; cannot write product metadata");
  Object.assign(packageJson, { name: slug(options.name), version: DEFAULTS.package.version, description: options.name });
  for (const [key, value] of Object.entries(DEFAULTS.package.metadata)) packageJson[key] ??= value;
  packageJson.private ??= DEFAULTS.package.private;
  packageJson.scripts = objectOr(packageJson.scripts);
  packageJson.aiddbot = { ...objectOr(packageJson.aiddbot), system: DEFAULTS.manifest };
  if (options.dryRun) out(`${hasPackage ? "update    " : "create    "} package.json`);
  else writeJson(packagePath, packageJson);
  return 0;
}

export function materialize(options) {
  const workspace = process.cwd();
  const systemSlug = slug(options.name);
  out(`system     ${options.name} (${systemSlug})`);
  for (const tier of selectedTiers(options)) {
    const status = runTiged(`AIDDbot/${tier}-${options[tier]}`, path.join(workspace, options[`${tier}Dir`]), workspace, options.dryRun);
    if (status !== 0) return status;
  }
  const defaultsStatus = copyRootDefaults(workspace, options.dryRun);
  if (defaultsStatus !== 0) return defaultsStatus;
  const manifest = buildManifest(workspace, options);
  const frontStatus = options.front ? brandFrontProject(workspace, options) : 0;
  if (frontStatus !== 0) return frontStatus;
  return writeManifest(workspace, manifest, options.dryRun) || writeRootPackage(workspace, options);
}

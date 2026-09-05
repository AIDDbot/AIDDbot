#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { reconcile, runOverlay } from "../bin/lib/overlay.js";
import { loadManifest, manifestText } from "../bin/lib/manifest.js";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "aiddbot-cli-update-"));
const digest = (value) => `sha256:${crypto.createHash("sha256").update(value).digest("hex")}`;
const write = (file, value) => { const target = path.join(root, "source", ...file.split("/")); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, value); return target; };
const inventory = (files) => Object.fromEntries(Object.entries(files).map(([file, value]) => [file, { digest: digest(value), source: write(file, value) }]));
try {
  const dest = path.join(root, "dest"); fs.mkdirSync(dest);
  const first = inventory({ "x/a.txt": "one", "x/b.txt": "two" });
  let result = runOverlay(dest, { inventory: first });
  assert.equal(result.conflicts, 0); assert.equal(fs.readFileSync(path.join(dest, "x/a.txt"), "utf8"), "one");
  const firstManifest = loadManifest(dest); assert.deepEqual(Object.keys(firstManifest.files), ["x/a.txt", "x/b.txt"]);
  assert.equal(manifestText(firstManifest), manifestText(firstManifest));
  result = runOverlay(dest, { inventory: first }); assert.equal(result.conflicts, 0); assert.equal(result.written.length, 0);

  const second = inventory({ "x/a.txt": "new", "x/b.txt": "two" }); result = runOverlay(dest, { inventory: second });
  assert.equal(result.rows.find((r) => r.file === "x/a.txt").action, "update"); assert.equal(fs.readFileSync(path.join(dest, "x/a.txt"), "utf8"), "new");
  fs.writeFileSync(path.join(dest, "x/a.txt"), "consumer"); result = runOverlay(dest, { inventory: inventory({ "x/a.txt": "latest", "x/b.txt": "two" }) });
  assert.equal(result.conflicts, 1); assert.equal(fs.readFileSync(path.join(dest, "x/a.txt"), "utf8"), "consumer");
  result = runOverlay(dest, { force: true, inventory: inventory({ "x/a.txt": "latest", "x/b.txt": "two" }) }); assert.equal(result.conflicts, 0); assert.equal(fs.readFileSync(path.join(dest, "x/a.txt"), "utf8"), "latest");

  result = runOverlay(dest, { inventory: inventory({ "x/a.txt": "latest" }) }); assert.equal(result.rows.find((r) => r.file === "x/b.txt").action, "remove"); assert.equal(fs.existsSync(path.join(dest, "x/b.txt")), false);
  fs.writeFileSync(path.join(dest, "x/a.txt"), "consumer"); result = runOverlay(dest, { inventory: {} }); assert.equal(result.conflicts, 1); assert.equal(fs.existsSync(path.join(dest, "x/a.txt")), true);
  result = runOverlay(dest, { force: true, inventory: {} }); assert.equal(result.conflicts, 0); assert.equal(fs.existsSync(path.join(dest, "x/a.txt")), false);

  const legacy = path.join(root, "legacy"); fs.mkdirSync(legacy); fs.mkdirSync(path.join(legacy, "x")); fs.writeFileSync(path.join(legacy, "x/a.txt"), "foreign");
  result = runOverlay(legacy, { inventory: inventory({ "x/a.txt": "source", "x/b.txt": "new" }) }); assert.equal(result.conflicts, 1); assert.equal(fs.readFileSync(path.join(legacy, "x/a.txt"), "utf8"), "foreign"); assert.equal(fs.existsSync(path.join(legacy, "x/b.txt")), true);
  const before = fs.readFileSync(path.join(legacy, "x/b.txt")); result = runOverlay(legacy, { dryRun: true, inventory: inventory({ "x/a.txt": "source", "x/b.txt": "changed" }) }); assert.equal(fs.readFileSync(path.join(legacy, "x/b.txt")).equals(before), true);
  const unsafe = { schemaVersion: 1, packageVersion: "0.0.0", payloadDigest: digest("x"), files: { "../outside": digest("x") } }; fs.mkdirSync(path.join(legacy, ".aiddbot"), { recursive: true }); fs.writeFileSync(path.join(legacy, ".aiddbot/manifest.json"), JSON.stringify(unsafe));
  result = runOverlay(legacy, { inventory: {} }); assert.equal(result.fatal, true);
  const plan = reconcile(legacy, {}, null); assert.equal(plan.manifest.payloadDigest, reconcile(legacy, {}, null).manifest.payloadDigest);
  process.stdout.write("PASS CLI reconciliation coverage\n");
} finally {
  const resolved = path.resolve(root), temp = fs.realpathSync(os.tmpdir());
  if (path.dirname(resolved) !== temp) throw new Error(`unsafe cleanup target: ${resolved}`);
  fs.rmSync(resolved, { recursive: true, force: true });
}

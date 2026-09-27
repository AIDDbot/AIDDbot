import fs from "node:fs";

/** Write `text` to `file` through a temporary sibling and a rename, so readers never see a partial file. */
export function writeAtomic(file, text) {
  const temporary = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, text, "utf8");
  fs.renameSync(temporary, file);
}

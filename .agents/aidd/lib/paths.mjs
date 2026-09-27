import path from "node:path";

// The product folder is a fixed constant of the core, no longer configurable (D6).
export const PRODUCT = ".product";
export const AIDDBOT = ".aiddbot";

export const productPath = (root, ...parts) => path.join(root, PRODUCT, ...parts);
export const aiddbotPath = (root, ...parts) => path.join(root, AIDDBOT, ...parts);

/** Repository-relative path with forward slashes, as git and JSON output expect. */
export const relative = (root, file) => path.relative(root, file).split(path.sep).join("/");

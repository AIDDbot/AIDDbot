export function parseArgs(argv) {
  if (!argv.length) throw new Error("Provide a spec directory.");
  const result = { specDir: argv[0], product: ".product", base: null };
  const seen = new Set();
  for (let index = 1; index < argv.length; index += 2) assign(argv, index, result, seen);
  return result;
}

function assign(argv, index, result, seen) {
  const key = { "--product": "product", "--base": "base" }[argv[index]];
  const value = argv[index + 1];
  if (!key || !value) throw new Error(`Invalid option: ${argv[index]}`);
  if (seen.has(key)) throw new Error(`Duplicate option: ${argv[index]}`);
  seen.add(key);
  result[key] = value;
}

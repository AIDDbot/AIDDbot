import { copyFile, mkdir } from 'node:fs/promises';
import { constants, existsSync } from 'node:fs';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

function repositoryRoot(...starts) {
  let marked = '';
  for (const start of starts) {
    let current = resolve(start);
    while (true) {
      if (existsSync(join(current, '.git'))) return current;
      if (!marked && existsSync(join(current, '.aiddbot'))) marked = current;
      const parent = dirname(current);
      if (parent === current) break;
      current = parent;
    }
  }
  return marked || resolve(starts[0]);
}

const args = process.argv.slice(2);
const option = args.indexOf('--product-folder');
const productFolder = option >= 0 ? args[option + 1] : undefined;

if (!productFolder || option !== args.length - 2) {
  console.error('Usage: node initialize-product-docs.mjs --product-folder <path>');
  process.exitCode = 1;
} else {
  const skillFolder = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const root = repositoryRoot(skillFolder, process.cwd());
  const destination = isAbsolute(productFolder) ? productFolder : join(root, productFolder);
  const documents = [
    ['assets/PRD.template.md', 'specs/PRD.md'],
    ['assets/TDR.template.md', 'quality/TDR.md'],
  ];

  const targets = [
    ['assets/counters.template.yaml', join(root, '.aiddbot', 'counters.yaml')],
    ...documents.map(([template, relativeTarget]) => [template, join(destination, relativeTarget)]),
  ];

  for (const [template, target] of targets) {
    await mkdir(dirname(target), { recursive: true });
    try {
      await copyFile(join(skillFolder, template), target, constants.COPYFILE_EXCL);
      console.log(`created ${target}`);
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
      console.log(`preserved ${target}`);
    }
  }
}

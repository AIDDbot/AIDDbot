import { copyFile, mkdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const option = args.indexOf('--product-folder');
const productFolder = option >= 0 ? args[option + 1] : undefined;

if (!productFolder || option !== args.length - 2) {
  console.error('Usage: node initialize-product-docs.mjs --product-folder <path>');
  process.exitCode = 1;
} else {
  const skillFolder = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const destination = resolve(productFolder);
  const documents = [
    ['assets/counters.template.yaml', 'counters.yaml'],
    ['assets/PRD.template.md', 'specs/PRD.md'],
    ['assets/TDR.template.md', 'quality/TDR.md'],
  ];

  for (const [template, relativeTarget] of documents) {
    const target = join(destination, relativeTarget);
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

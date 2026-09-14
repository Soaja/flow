import { readFile, writeFile } from 'node:fs/promises';
import { compress } from 'wawoff2';

for (const name of ['SpaceGrotesk-Variable', 'Inter-Variable']) {
  const input = await readFile(new URL(`../public/fonts/${name}.ttf`, import.meta.url));
  const output = await compress(input);
  await writeFile(new URL(`../public/fonts/${name}.woff2`, import.meta.url), output);
  console.log(`${name}: ${input.length} → ${output.length} bytes (same font, WOFF2 compression)`);
}

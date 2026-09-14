import sharp from 'sharp';
import { existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

const jobs = [
  // Hero — LCP critical, full width
  { src: 'hero-athlete.jpg',       w: 1920, q: 85 },
  { src: 'hero-athlete.jpg',       w: 768,  q: 82, suffix: '-sm' },
  { src: 'hero-runner-europe-4k.png', w: 2560, q: 92 },
  { src: 'hero-runner-europe-4k.png', w: 768,  q: 84, suffix: '-sm' },
  { src: 'hero-background.png',       w: 2560, q: 90 },
  { src: 'hero-background.png',       w: 768,  q: 82, suffix: '-sm' },

  // Texture — barely visible (opacity .04), compress aggressively
  { src: 'texture.jpg',            w: 1920, q: 20 },

  // Media hub cards
  { src: 'athlete-silhouette.jpg', w: 900,  q: 82 },
  { src: 'athlete-run.jpg',        w: 900,  q: 82 },
  { src: 'athlete-parkour.jpg',    w: 900,  q: 82 },

  // Athlete roster
  { src: 'athlete-2.jpg',          w: 700,  q: 82 },
  { src: 'athlete-3.jpg',          w: 700,  q: 82 },
  { src: 'athlete-woman.jpg',      w: 700,  q: 82 },

  // Image strip + manifesto
  { src: 'athlete-shoe.jpg',       w: 700,  q: 82 },
  { src: 'flow-visual.png',        w: 900,  q: 85 },
];

async function run() {
  let totalOutput = 0;
  for (const { src, w, q, suffix = '' } of jobs) {
    const input  = join(PUBLIC, src);
    const outName = src.replace(/\.(jpe?g|png)$/i, `${suffix}.webp`);
    const output = join(PUBLIC, outName);

    if (!existsSync(input)) { console.warn(`⚠  Missing: ${src}`); continue; }

    const before = statSync(input).size;
    await sharp(input).resize({ width: w, withoutEnlargement: true }).webp({ quality: q }).toFile(output);
    const afterStat = statSync(output);
    const after = afterStat.size;

    const pct = before ? Math.round((1 - after / before) * 100) : 0;
    totalOutput += after;
    console.log(`✓  ${outName.padEnd(36)} ${(after/1024).toFixed(0).padStart(5)} KB  (−${pct}%)`);
  }
  console.log(`\nGenerated WebP variants: ${(totalOutput/1024/1024).toFixed(1)} MB total (not a page-transfer measurement)`);
}

run().catch(e => { console.error(e); process.exit(1); });

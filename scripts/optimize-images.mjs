import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
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
  let saved = 0;
  for (const { src, w, q, suffix = '' } of jobs) {
    const input  = join(PUBLIC, src);
    const outName = src.replace(/\.(jpe?g|png)$/i, `${suffix}.webp`);
    const output = join(PUBLIC, outName);

    if (!existsSync(input)) { console.warn(`⚠  Missing: ${src}`); continue; }

    const { size: before } = await sharp(input).metadata().then(m => ({ size: m.size })).catch(() => ({ size: 0 }));
    await sharp(input).resize({ width: w, withoutEnlargement: true }).webp({ quality: q }).toFile(output);
    const afterStat = (await import('fs')).statSync(output);
    const after = afterStat.size;

    const pct = before ? Math.round((1 - after / before) * 100) : 0;
    saved += (before - after);
    console.log(`✓  ${outName.padEnd(36)} ${(after/1024).toFixed(0).padStart(5)} KB  (−${pct}%)`);
  }
  console.log(`\nTotal saved: ${(saved/1024/1024).toFixed(1)} MB`);
}

run().catch(e => { console.error(e); process.exit(1); });

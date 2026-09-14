import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { loadEnv } from 'vite';
import { render } from '../dist-ssr/entry-server.js';
import { getSeo, siteOrigin } from '../src/utils/seo.js';
import { projects, projectHref } from '../src/data/projects.js';

const origin = (process.env.VITE_SITE_URL || loadEnv('production', process.cwd(), 'VITE_').VITE_SITE_URL || siteOrigin).replace(/\/$/, '');
const parsedOrigin = new URL(origin);
if (parsedOrigin.protocol !== 'https:' || parsedOrigin.pathname !== '/' || parsedOrigin.search || parsedOrigin.hash) throw new Error('VITE_SITE_URL must be an HTTPS origin without a path, query or hash.');
const template = await readFile('dist/index.html', 'utf8');
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

const pages = [
  { path: '/', file: 'index.html', components: ['Manifesto', 'MediaHub'] },
  { path: '/?page=work', file: '_pages/work.html', components: ['WorkPage'], className: 'work-archive-document' },
  ...projects.map(project => ({ path: projectHref(project), file: `_pages/projects/${project.slug}.html`, components: ['ProjectPage'], className: 'project-document' })),
  { path: '/?project=not-found', file: '_pages/not-found.html', components: [], notFound: true },
];

for (const page of pages) {
  const url = new URL(page.path, origin);
  const seo = getSeo(url, origin);
  const tags = {
    robots: seo.robots, 'twitter:card': 'summary_large_image', 'twitter:title': seo.title,
    'twitter:description': seo.description, 'twitter:image': seo.image,
  };
  const og = { title: seo.title, description: seo.description, url: seo.canonical, image: seo.image, type: 'website', site_name: 'FLOW' };
  const head = [
    ...Object.entries(tags).map(([name, content]) => `<meta name="${name}" content="${escape(content)}" />`),
    ...Object.entries(og).filter(([, value]) => value).map(([name, content]) => `<meta property="og:${name}" content="${escape(content)}" />`),
    seo.canonical ? `<link rel="canonical" href="${escape(seo.canonical)}" />` : '',
    seo.structuredData ? `<script id="flow-schema" type="application/ld+json">${JSON.stringify(seo.structuredData).replace(/</g, '\\u003c')}</script>` : '',
    ...page.components.flatMap(name => manifest[`src/components/${name}.jsx`]?.css || []).map(file => `<link rel="stylesheet" href="/${file}" />`),
  ].join('\n    ');
  let html = template.replace(/<title>.*?<\/title>/, `<title>${escape(seo.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(seo.description)}" />`)
    .replace('<!--seo-head-->', head)
    .replace('<div id="root"></div>', `<div id="root">${await render(url.href)}</div>`);
  if (page.className) html = html.replace('<html lang="en">', `<html lang="en" class="${page.className}">`);
  if (page.path !== '/') html = html.replace(/<link rel="preload" as="image"[\s\S]*?\/>/, '');
  const output = resolve('dist', page.file);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
  console.log(`Pre-rendered ${page.path}: ${(Buffer.byteLength(html) / 1024).toFixed(1)} KB HTML`);
}

await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.filter(page => !page.notFound).map(page => `\n  <url><loc>${escape(new URL(page.path, origin).href)}</loc></url>`).join('')}\n</urlset>\n`);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);

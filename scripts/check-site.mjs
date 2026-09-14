import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { Window } from 'happy-dom';
import { getSeo, siteOrigin } from '../src/utils/seo.js';
import { projects, projectHref } from '../src/data/projects.js';
import missingProject from '../api/missing-project.js';

const routes = [
  ['/', 'index.html'], ['/?page=work', '_pages/work.html'],
  ...projects.map(project => [projectHref(project), `_pages/projects/${project.slug}.html`]),
];
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const projectRule = config.rewrites.find(rule => rule.has.some(condition => condition.key === 'project' && condition.value));
const projectPattern = new RegExp(`^(?:${projectRule.has[0].value})$`);
const sitemap = await readFile('dist/sitemap.xml', 'utf8');

for (const [path, file] of routes) {
  const window = new Window({ settings: { disableCSSFileLoading: true, disableJavaScriptFileLoading: true } });
  window.document.write(await readFile(`dist/${file}`, 'utf8'));
  const document = window.document;
  const seo = getSeo(new URL(path, siteOrigin));
  assert.equal(document.title, seo.title);
  assert.equal(document.querySelectorAll('h1').length, 1, `${path}: one primary heading`);
  assert.equal(document.querySelectorAll('main').length, 1);
  assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1);
  assert.equal(document.querySelector('link[rel="canonical"]').href, seo.canonical);
  assert.equal(document.querySelector('meta[name="description"]').content, seo.description);
  assert.equal(document.querySelector('meta[property="og:url"]').content, seo.canonical);
  assert.deepEqual(JSON.parse(document.getElementById('flow-schema').textContent), seo.structuredData);
  assert.ok(document.querySelector('main').textContent.trim().length > 100, 'Content exists before JavaScript');
  assert.equal(document.querySelectorAll('.flow-loader').length, 0, 'Intro is separate from SEO HTML');
  assert.ok(sitemap.includes(seo.canonical.replaceAll('&', '&amp;')));
  const ids = [...document.querySelectorAll('[id]')].map(element => element.id);
  assert.equal(new Set(ids).size, ids.length, `${path}: no duplicate IDs`);
  for (const image of document.querySelectorAll('img')) assert.ok(image.hasAttribute('alt'), `${path}: image has alt`);
  for (const element of document.querySelectorAll('[src], link[href]')) {
    const asset = element.getAttribute('src') || element.getAttribute('href');
    if (asset.startsWith('/') && !asset.startsWith('//')) await stat(`dist${asset}`);
  }
  if (path === '/') {
    assert.ok(document.getElementById('manifesto'));
    assert.ok(document.getElementById('media'));
    assert.ok(document.getElementById('contact'));
    assert.match(document.querySelector('link[as="image"]').href, /hero-background.webp$/);
    assert.equal(document.querySelectorAll('video[src]').length, 0, 'No video fetches on initial home render');
  } else assert.equal(document.querySelectorAll('link[as="image"]').length, 0, 'No home hero preload on other pages');
  if (path.includes('project=')) assert.ok(projectPattern.test(new URL(path, siteOrigin).searchParams.get('project')), 'Vercel routes include every project');
  await window.happyDOM.close();
  console.log(`PASS HTML/SEO/assets: ${path}`);
}

const unknown = getSeo(new URL('/?project=missing', siteOrigin));
assert.equal(unknown.robots, 'noindex,follow');
assert.equal(unknown.canonical, '');
assert.equal(getSeo(new URL('/?utm_source=test#manifesto', siteOrigin)).canonical, `${siteOrigin}/`);
assert.equal(getSeo(new URL('/?page=work&project=missing', siteOrigin)).canonical, `${siteOrigin}/?page=work`);
for (const font of ['Inter-Variable', 'SpaceGrotesk-Variable']) {
  const original = await stat(`public/fonts/${font}.ttf`);
  const compressed = await readFile(`public/fonts/${font}.woff2`);
  assert.equal(compressed.subarray(0, 4).toString(), 'wOF2');
  assert.ok(compressed.length < original.size / 2);
}
console.log('PASS canonical normalization, missing-project metadata, and font compression');
const missingResponse = { headers: {}, setHeader(name, value) { this.headers[name] = value; }, end(body) { this.body = body; } };
await missingProject({ method: 'GET' }, missingResponse);
assert.equal(missingResponse.statusCode, 404);
assert.equal(missingResponse.headers['X-Robots-Tag'], 'noindex, follow');
assert.match(missingResponse.body, /Project not found/);
await missingProject({ method: 'HEAD' }, missingResponse);
assert.equal(missingResponse.body, undefined);
console.log('PASS missing project returns HTTP 404 for GET and HEAD');

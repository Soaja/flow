import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { Window } from 'happy-dom';

// DOM integration tests, not layout/FPS measurements. All remote loading is disabled.
const initialWork = process.argv.includes('--work');
const initialProject = process.argv.includes('--project');
const fresh = process.argv.includes('--fresh');
const initialPath = initialWork ? '/?page=work' : initialProject ? '/?project=jordan-the-one' : '/';
const initialFile = initialWork ? '_pages/work.html' : initialProject ? '_pages/projects/jordan-the-one.html' : 'index.html';
const window = new Window({ url: `https://flowsport.co${initialPath}`, settings: { disableCSSFileLoading: true, disableJavaScriptFileLoading: true } });
window.document.write(await readFile(`dist/${initialFile}`, 'utf8'));
if (!fresh) window.sessionStorage.setItem('flow-intro-seen', 'true');
const originalMain = window.document.querySelector('main');
const scrolls = [];
window.HTMLElement.prototype.scrollIntoView = function () { scrolls.push(this.id); };
window.scrollTo = () => { scrolls.push('top'); };
window.matchMedia = media => ({ media, matches: media.includes('reduce') || media.includes('max-width'), addEventListener() {}, removeEventListener() {} });
class Observer { observe() {} unobserve() {} disconnect() {} }
for (const key of ['window', 'document', 'navigator', 'location', 'history', 'sessionStorage', 'HTMLElement', 'Element', 'MutationObserver', 'Event', 'MouseEvent', 'PopStateEvent', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame']) {
  const value = window[key] ?? (key === 'window' ? window : undefined);
  Object.defineProperty(globalThis, key, { configurable: true, value: typeof value === 'function' && !/^[A-Z]/.test(key) ? value.bind(window) : value });
}
globalThis.IntersectionObserver = Observer;
globalThis.ResizeObserver = Observer;
// Vite's CSS preload waits for load events; CSS layout is outside this DOM test.
const observeLinks = new window.MutationObserver(records => {
  for (const record of records) for (const node of record.addedNodes) {
    if (node.nodeName === 'LINK') node.dispatchEvent(new window.Event('load'));
  }
});
observeLinks.observe(document.head, { childList: true });
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
const entry = manifest['index.html'].file;
const waitFor = async (predicate, label) => {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (predicate()) return;
    await new Promise(resolve => setTimeout(resolve, 20));
  }
  throw new Error(`Timed out: ${label}`);
};
const click = selector => {
  const element = document.querySelector(selector);
  assert.ok(element, `Link exists: ${selector}`);
  element.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
};

try {
  await import(pathToFileURL(resolve('dist', entry)).href);
  await waitFor(() => scrolls.length, 'hydration layout effect');
  await new Promise(resolve => setTimeout(resolve, 100));
  assert.equal(document.querySelector('main'), originalMain, 'Hydration reuses the existing content');
  if (fresh) {
    assert.ok(document.querySelector('.flow-loader'), 'First visit shows intro');
    await waitFor(() => !document.querySelector('.flow-loader'), 'first intro completes');
    assert.equal(window.sessionStorage.getItem('flow-intro-seen'), 'true');
  }
  assert.equal(document.querySelector('.flow-loader'), null);
  if (initialWork || initialProject) {
    click('.mobile-header > a');
    await waitFor(() => document.getElementById('hero'), 'direct entry returns home');
  }
  click('.work-more-link');
  await waitFor(() => document.querySelector('.work-archive') && document.title === 'Our Work — FLOW', 'work route');
  assert.equal(window.location.search, '?page=work');
  click('.menu-trigger');
  await waitFor(() => document.querySelector('.menu-trigger').getAttribute('aria-expanded') === 'true', 'mobile menu');
  click('#mobile-navigation a[href="/#manifesto"]');
  await waitFor(() => document.getElementById('manifesto') && window.location.hash === '#manifesto', 'about route');
  assert.equal(scrolls.at(-1), 'manifesto', 'Route lands directly on About');
  assert.equal(document.querySelector('.flow-loader'), null);
  await waitFor(() => document.body.style.overflow !== 'hidden', 'menu unlocks scroll');
  click('.media-card-wrap');
  await waitFor(() => document.querySelector('.project-page') && document.title.includes('Jordan Brand'), 'project route');
  assert.match(document.querySelector('link[rel="canonical"]').href, /project=jordan-the-one$/);
  click('.project-next');
  await waitFor(() => document.title.includes('Midnight run.'), 'next project');
  assert.match(document.querySelector('h1').textContent, /Nike/);
  assert.ok(document.querySelector('.project-play'), 'Next project resets playback');
  click('.project-back');
  await waitFor(() => document.title === 'Our Work — FLOW', 'back to work');
  click('.mobile-header > a');
  await waitFor(() => document.getElementById('hero'), 'mobile home logo');
  assert.equal(scrolls.at(-1), 'hero');
  assert.equal(document.querySelectorAll('main').length, 1);
  assert.equal(document.querySelectorAll('h1').length, 1);
  await waitFor(() => document.title === 'FLOW — Sport. Redefined.', 'home metadata');
  assert.equal(document.querySelectorAll('link[href*="gsap"]').length, 0, 'Reduced-motion visitors do not fetch GSAP');
  const modifiedClick = new window.MouseEvent('click', { bubbles: true, cancelable: true, button: 0, ctrlKey: true });
  document.querySelector('.work-more-link').dispatchEvent(modifiedClick);
  assert.equal(modifiedClick.defaultPrevented, false, 'Modified clicks preserve browser behavior');
  window.history.replaceState(null, '', '/?page=work');
  window.dispatchEvent(new window.PopStateEvent('popstate'));
  await waitFor(() => document.title === 'Our Work — FLOW', 'history navigation');
  assert.ok(document.querySelector('.work-archive'));
  console.log(`PASS ${initialPath} (${fresh ? 'first' : 'return'} visit): hydration, navigation, mobile menu, history, intro, SEO, reduced-motion imports`);
} finally {
  // Let passive effects finish before tearing down this isolated DOM fixture.
  await new Promise(resolve => setTimeout(resolve, 250));
  observeLinks.disconnect();
  await window.happyDOM.close();
}

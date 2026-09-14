# FLOW performance and SEO

React-compatible components run on Preact through Vite's aliases. Public URLs remain `/`, `/?page=work` and `/?project=<slug>`; home sections use anchors.

## Development and validation

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run check
npm run preview
```

Build requires Node 22.12+ or a compatible newer release. It compresses the supplied fonts to WOFF2, generates WebP variants, builds browser/rendering bundles, and pre-renders HTML for home, work, three projects and the missing-project fallback. Static output is in `dist`; Vercel also packages a small handler to return that fallback with HTTP 404. `dist-ssr` is a build intermediate.

Checks validate generated HTML, canonicals, metadata, JSON-LD, assets, font compression, headings and routing configuration. DOM integration tests exercise the actual production browser bundle: hydration, first/return visits, direct entries, work → about navigation, projects, mobile menu, history events and reduced-motion imports. They do not measure layout, frame rate or Core Web Vitals.

The preview server reproduces the query-based Vercel routing. Other static hosts need equivalent rewrites; serving home HTML for every query would hydrate the wrong initial page.

## SEO

The production origin is `https://flowsport.co`. Override with `VITE_SITE_URL` before building; see `.env.example`. `src/utils/seo.js` supplies pre-rendered and client-navigation titles, descriptions, canonicals, Open Graph, Twitter cards and JSON-LD. Tracking parameters and fragments are excluded from canonicals; each project keeps its own URL.

Build creates `/sitemap.xml` and `/robots.txt`. The sitemap includes five public pages, excludes section anchors and unknown projects, and contains no fabricated update dates. Structured data contains site/organization facts and the visible work collection, without invented reviews, results, social profiles or project dates.

When adding projects, update `src/data/projects.js` and the project-slug matcher in `vercel.json`. Pre-rendering and the sitemap follow the collection; checks detect missing Vercel matches. Unknown project queries return HTTP 404 and `noindex,follow` through `api/missing-project.js`, also used by local preview.

## Changes and measurements

- Fonts: 1,013,252 bytes → 399,592 bytes, 60.6% less with the same fonts, weights and glyph coverage.
- Home preloads its actual responsive hero image; other pages omit that preload. Descriptors match the actual 1672 × 941 source.
- Cursor transforms stop updating once settled. CSS motion pauses off screen/in hidden tabs, then resumes its timeline.
- Desktop GSAP setup is deferred. Mobile/reduced-motion checks precede imports. Async setup cleans up after route unmounts.
- About video covers fetch metadata near the section; hover previews load on interaction. Existing frames, media, layouts and styling are retained.
- Content arrives as HTML and hydrates in place. Page modules load before internal route commits. The independent intro runs once per browser-tab session.
- Hashed JS/CSS use immutable Vercel caching; stable media/font URLs have a shorter cache lifetime so replacements propagate.

No Lighthouse score or frame-rate improvement is claimed. A connected browser and deployed production build are still needed for desktop/mobile visual parity, slow-network behavior, LCP, INP and CLS. Check home, anchors, work and project entries, reduced motion and cold font cache.

## Existing items before launch

These were left unchanged during this work:

- The contact form changes local success state; it does not submit to a service.
- Social, Privacy and Terms links use placeholder `#` URLs.
- Project copy/gallery metadata is marked draft; year/location and impact metrics contain placeholders.
- DNS activation, Search Console verification, sitemap submission and real social URLs are not configured by this change.

References: [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [Preact server rendering](https://preactjs.com/guide/v10/server-side-rendering/), [animation performance](https://web.dev/articles/animations-guide), [Vercel rewrites](https://vercel.com/docs/routing/rewrites).

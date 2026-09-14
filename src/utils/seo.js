import { projects, projectHref } from '../data/projects.js';

export const siteDescription = 'FLOW is a sports communications agency based in Belgrade, connecting sport, brands and communities through creative campaigns, content and partnerships.';
export const siteOrigin = (import.meta.env?.VITE_SITE_URL || 'https://flowsport.co').replace(/\/$/, '');

export function getSeo(url, origin = siteOrigin) {
  const work = url.searchParams.get('page') === 'work';
  const slug = url.searchParams.get('project');
  const project = !work && projects.find(item => item.slug === slug);
  const missing = !work && Boolean(slug) && !project;
  const path = work ? '/?page=work' : project ? projectHref(project) : '/';
  const title = missing ? 'Project not found | FLOW' : work ? 'Our Work — FLOW'
    : project ? `${project.client} — ${project.title} | FLOW` : 'FLOW — Sport. Redefined.';
  const description = missing ? 'The requested FLOW project could not be found.' : work
    ? 'Explore FLOW sports campaigns, creative production and brand activations for Jordan Brand, Nike and Metcon.'
    : project ? `${project.client}: ${project.title} ${project.subtitle} ${project.role} by FLOW.` : siteDescription;
  const canonical = origin && !missing ? new URL(path, origin).href : '';
  const image = origin ? new URL(project?.image || '/hero-background.webp', origin).href : '';
  const structuredData = origin && !missing ? {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${origin}/#organization`, name: 'FLOW', url: `${origin}/`, logo: `${origin}/flow-logo.svg`, description: siteDescription },
      { '@type': 'WebSite', '@id': `${origin}/#website`, name: 'FLOW', url: `${origin}/`, publisher: { '@id': `${origin}/#organization` } },
      { '@type': work ? 'CollectionPage' : 'WebPage', '@id': canonical, url: canonical, name: title, description, inLanguage: 'en', isPartOf: { '@id': `${origin}/#website` },
        ...(work ? { mainEntity: {
          '@type': 'ItemList',
          itemListElement: projects.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: `${item.client} — ${item.title}`, url: new URL(projectHref(item), origin).href })),
        } } : {}) },
    ],
  } : null;
  return { title, description, canonical, image, structuredData, robots: missing ? 'noindex,follow' : 'index,follow,max-image-preview:large' };
}

export function applySeo(url) {
  const seo = getSeo(url);
  document.title = seo.title;
  const meta = (name, content, property = false) => {
    const attribute = property ? 'property' : 'name';
    let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
    if (!content) { element?.remove(); return; }
    if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, name); document.head.append(element); }
    element.content = content;
  };
  meta('description', seo.description);
  meta('robots', seo.robots);
  for (const [name, value] of Object.entries({ title: seo.title, description: seo.description, url: seo.canonical, image: seo.image, type: 'website', site_name: 'FLOW' })) meta(`og:${name}`, value, true);
  meta('twitter:card', 'summary_large_image');
  meta('twitter:title', seo.title);
  meta('twitter:description', seo.description);
  meta('twitter:image', seo.image);
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (seo.canonical) {
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
    canonical.href = seo.canonical;
  } else canonical?.remove();
  let schema = document.getElementById('flow-schema');
  if (seo.structuredData) {
    if (!schema) { schema = document.createElement('script'); schema.id = 'flow-schema'; schema.type = 'application/ld+json'; document.head.append(schema); }
    schema.textContent = JSON.stringify(seo.structuredData);
  } else schema?.remove();
}

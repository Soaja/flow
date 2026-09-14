import { lazy } from 'react';

function preloadable(importPage) {
  let Component;
  let pending;
  const preload = () => pending ||= importPage().then(module => {
    Component = module.default;
    return module;
  }).catch(error => { pending = undefined; throw error; });
  const LazyPage = lazy(preload);
  return { Page: (props) => Component ? <Component {...props} /> : <LazyPage {...props} />, preload };
}

export const work = preloadable(() => import('../components/WorkPage'));
export const project = preloadable(() => import('../components/ProjectPage'));
export const manifesto = preloadable(() => import('../components/Manifesto'));
export const media = preloadable(() => import('../components/MediaHub'));
export const contact = preloadable(() => import('../components/Contact'));

export const preloadRoute = (url) => url.searchParams.get('page') === 'work' ? work.preload()
  : url.searchParams.get('project') ? project.preload()
  : Promise.all([manifesto.preload(), media.preload(), contact.preload()]);

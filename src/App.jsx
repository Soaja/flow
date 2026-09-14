import { useState, useEffect, useLayoutEffect, Suspense } from 'react';
import Nav     from './components/Nav';
import Hero    from './components/Hero';
import SocialRail from './components/SocialRail';
import { projects } from './data/projects';
import { work, project, manifesto, media, contact, preloadRoute } from './utils/routes';
import { applySeo } from './utils/seo';
const WorkPage = work.Page;
const ProjectPage = project.Page;
const Manifesto = manifesto.Page;
const MediaHub = media.Page;
const Contact = contact.Page;

// This commits with the lazy page, so its anchor is positioned before paint.
function RoutePosition({ route }) {
  useLayoutEffect(() => {
    const target = document.getElementById(route.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);
  return null;
}

export default function App({ initialUrl }) {
  const [route, setRoute] = useState(() => new URL(initialUrl));
  const isWorkPage = route.searchParams.get('page') === 'work';
  const projectSlug = route.searchParams.get('project');
  const projectIndex = projects.findIndex(project => project.slug === projectSlug);
  const isProject = projectIndex !== -1;

  useEffect(() => { applySeo(route); }, [route]);

  useEffect(() => {
    let navigation = 0;
    const commitRoute = async (next, push) => {
      const request = ++navigation;
      try {
        await preloadRoute(next);
        if (request !== navigation) return;
        if (push) window.history.pushState(null, '', next);
        setRoute(next);
      } catch {
        if (request === navigation) window.location.assign(next.href);
      }
    };
    const navigate = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest('a[href]');
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const next = new URL(link.href, window.location.href);
      if (next.origin !== window.location.origin || next.pathname !== '/') return;
      if (next.search === window.location.search && next.hash && document.getElementById(next.hash.slice(1))) return;
      event.preventDefault();
      commitRoute(next, true);
    };
    const restore = () => commitRoute(new URL(window.location.href), false);
    document.addEventListener('click', navigate);
    window.addEventListener('popstate', restore);
    return () => {
      navigation++;
      document.removeEventListener('click', navigate);
      window.removeEventListener('popstate', restore);
    };
  }, []);

  // Animate only while moving; transforms avoid layout work on every frame.
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;

    let raf, cleanup;

    const init = () => {
      const cursor = document.getElementById('flow-cursor');
      if (!cursor) return;

      let curX = -100, curY = -100, aimX = -100, aimY = -100;
      const move = e => {
        aimX = e.clientX; aimY = e.clientY;
        if (!raf && !document.hidden) raf = requestAnimationFrame(tick);
      };
      document.addEventListener('mousemove', move, { passive: true });

      const tick = () => {
        curX += (aimX - curX) * 0.12;
        curY += (aimY - curY) * 0.12;
        cursor.style.transform = `translate3d(${curX}px,${curY}px,0) translate(-50%,-50%)`;
        raf = Math.abs(aimX - curX) + Math.abs(aimY - curY) > .1 ? requestAnimationFrame(tick) : null;
      };
      const visibility = () => { if (document.hidden) { cancelAnimationFrame(raf); raf = null; } };
      document.addEventListener('visibilitychange', visibility);

      const hover = event => cursor.classList.toggle('expanded', Boolean(event.target.closest('a,button')));
      document.addEventListener('mouseover', hover);

      cleanup = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseover', hover);
        document.removeEventListener('visibilitychange', visibility);
        cancelAnimationFrame(raf);
      };
    };

    const id = typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback(init, { timeout: 3000 })
      : setTimeout(init, 200);

    return () => {
      if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(id); else clearTimeout(id);
      cleanup?.();
    };
  }, []);

  return (
    <>
      {/* Smooth lagged cursor — desktop only */}
      <div id="flow-cursor" style={{
        position: 'fixed', width: 10, height: 10,
        background: 'var(--accent)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9998,
        transform: 'translate3d(-100px,-100px,0) translate(-50%,-50%)',
        transition: 'width .25s, height .25s',
        mixBlendMode: 'difference',
        left: 0, top: 0,
      }} />

      <Nav key={route.search} projectPage={Boolean(projectSlug) || isWorkPage} initialHash={route.hash} />
      <SocialRail />
      <main id="main-content">

        {/* Below-fold — lazy loaded */}
        <Suspense fallback={null}>
          {!projectSlug && !isWorkPage && <Hero />}
          {isWorkPage ? <WorkPage /> : isProject ? <ProjectPage key={projectSlug} project={projects[projectIndex]} next={projects[(projectIndex + 1) % projects.length]} /> : projectSlug ? <div style={{ padding: '160px 15%' }}><h1>Project not found.</h1><a href="/#media">Back to our work ?</a></div> : <><Manifesto /><MediaHub /><Contact /></>}
          <RoutePosition route={route} />
        </Suspense>
      </main>

      <style>{`
        #flow-cursor.expanded { width: 40px !important; height: 40px !important; }
        @media (hover: none), (prefers-reduced-motion: reduce) { #flow-cursor { display: none !important; } }
      `}</style>
    </>
  );
}

import { useState, useEffect, lazy, Suspense } from 'react';
import Loader  from './components/Loader';
import Nav     from './components/Nav';
import Hero    from './components/Hero';
import SocialRail from './components/SocialRail';
import { projects } from './data/projects';
const ProjectPage = lazy(() => import('./components/ProjectPage'));
const projectSlug = new URLSearchParams(window.location.search).get('project');
const projectIndex = projects.findIndex(project => project.slug === projectSlug);
const isProject = projectIndex !== -1;

/* Lazy-load everything below the fold — parsed only after first paint */
const Manifesto  = lazy(() => import('./components/Manifesto'));
const MediaHub   = lazy(() => import('./components/MediaHub'));
const Contact    = lazy(() => import('./components/Contact'));

export default function App() {
  const [loaded, setLoaded] = useState(Boolean(projectSlug));

  useEffect(() => {
    if (projectSlug || !loaded || !window.location.hash) return;
    const id = window.location.hash.slice(1);
    const scrollToSection = () => {
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView({ behavior: 'instant' });
      return true;
    };
    if (scrollToSection()) return;
    const observer = new MutationObserver(() => {
      if (scrollToSection()) observer.disconnect();
    });
    observer.observe(document.getElementById('root'), { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [loaded]);

  // Custom lagged cursor — deferred until browser is idle (no TBT impact)
  useEffect(() => {
    if (!loaded) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let raf, cleanup;

    const init = () => {
      const cursor = document.getElementById('flow-cursor');
      if (!cursor) return;

      let curX = -100, curY = -100, aimX = -100, aimY = -100;
      const move = e => { aimX = e.clientX; aimY = e.clientY; };
      document.addEventListener('mousemove', move, { passive: true });

      const tick = () => {
        curX += (aimX - curX) * 0.12;
        curY += (aimY - curY) * 0.12;
        cursor.style.left = curX + 'px';
        cursor.style.top  = curY + 'px';
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      const grow   = () => cursor.classList.add('expanded');
      const shrink = () => cursor.classList.remove('expanded');
      document.querySelectorAll('a,button').forEach(el => {
        el.addEventListener('mouseenter', grow);
        el.addEventListener('mouseleave', shrink);
      });

      cleanup = () => { document.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
    };

    const id = typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback(init, { timeout: 3000 })
      : setTimeout(init, 200);

    return () => {
      if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(id); else clearTimeout(id);
      cleanup?.();
    };
  }, [loaded]);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {/* Smooth lagged cursor — desktop only */}
      <div id="flow-cursor" style={{
        position: 'fixed', width: 10, height: 10,
        background: 'var(--accent)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9998,
        transform: 'translate(-50%,-50%)',
        transition: 'width .25s, height .25s',
        mixBlendMode: 'difference',
        left: '-100px', top: '-100px',
      }} />

      <main>
        {/* Above-fold — always eager */}
        <Nav projectPage={Boolean(projectSlug)} />
        <SocialRail />
        {!projectSlug && <Hero />}

        {/* Below-fold — lazy loaded */}
        <Suspense fallback={null}>
          {isProject ? <ProjectPage project={projects[projectIndex]} next={projects[(projectIndex + 1) % projects.length]} /> : projectSlug ? <div style={{ padding: '160px 15%' }}><h1>Project not found.</h1><a href="/#media">Back to our work ?</a></div> : <><Manifesto /><MediaHub /><Contact /></>}
        </Suspense>
      </main>

      <style>{`
        #flow-cursor.expanded { width: 40px !important; height: 40px !important; }
        @media (hover: none) { #flow-cursor { display: none !important; } }
      `}</style>
    </>
  );
}

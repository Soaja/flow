import { useEffect, useRef, useState } from 'react';

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#manifesto', label: 'About us' },
  { href: '#media', label: 'Our work' },
  { href: '#contact', label: 'Contact us' },
];

export default function Nav({ projectPage = false, initialHash = '' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(projectPage ? 'media' : (initialHash.slice(1) || 'hero'));
  const animationRef = useRef(null);
  const activeIndex = Math.max(0, links.findIndex((link) => link.href === `#${active}`));

  useEffect(() => {
    const observed = new Set();
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { root: null, threshold: [.35, .6] });
    const observeSections = () => {
      const sections = links.map(link => document.querySelector(link.href)).filter(Boolean);
      sections.forEach(section => {
        if (!observed.has(section)) { observer.observe(section); observed.add(section); }
      });
    };
    observeSections();
    const mutations = new MutationObserver(observeSections);
    mutations.observe(document.getElementById('root'), { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(animationRef.current);
      document.documentElement.style.removeProperty('scroll-snap-type');
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const navigateTo = (event, href) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (projectPage) { close(); return; }
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    close();
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    if (window.matchMedia('(max-width: 1024px)').matches) {
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
      window.history.replaceState(null, '', href);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      target.scrollIntoView({ behavior: 'instant' });
      window.history.replaceState(null, '', href);
      return;
    }

    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + start;
    const distance = end - start;
    // A calm pace between full-screen sections, with more time for longer trips.
    const screens = Math.abs(distance) / window.innerHeight;
    const duration = Math.min(1600, 1100 + Math.max(0, screens - 1) * 180);
    const startedAt = performance.now();
    const root = document.documentElement;
    root.style.scrollSnapType = 'none';

    const animate = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = (1 - Math.cos(Math.PI * progress)) / 2;
      window.scrollTo({ top: start + distance * eased, behavior: 'instant' });
      if (progress < 1) animationRef.current = requestAnimationFrame(animate);
      else {
        root.style.removeProperty('scroll-snap-type');
        window.history.replaceState(null, '', href);
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <>
      <header className="vertical-header" data-active-index={activeIndex}>
        <span className="section-progress" aria-hidden="true" />
        <a href={projectPage ? '/#hero' : '#hero'} className="vertical-logo" aria-label="FLOW home" onClick={(event) => navigateTo(event, '#hero')}>
          <img src="/flow-logo.svg" alt="" />
        </a>
        <nav className="vertical-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={projectPage ? (link.href === '#media' ? '/?page=work' : `/${link.href}`) : link.href} onClick={(event) => navigateTo(event, link.href)} aria-current={active === link.href.slice(1) ? 'page' : undefined} className={`vertical-link${active === link.href.slice(1) ? ' active' : ''}`}>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
      </header>

      <header className={`mobile-header${menuOpen ? ' menu-open' : ''}`}>
        <a href={projectPage ? '/#hero' : '#hero'} aria-label="FLOW home" onClick={(event) => navigateTo(event, '#hero')}><img src="/flow-logo.svg" alt="FLOW" /></a>
        <button className="menu-trigger" onClick={() => setMenuOpen(open => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation">
          <span /><span /><span />
        </button>
      </header>

      <div id="mobile-navigation" className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <img className="mobile-menu-symbol" src="/flow-symbol.svg" alt="" aria-hidden="true" />
        <p className="mobile-menu-eyebrow">Navigate the flow</p>
        {links.map((link, index) => (
          <a key={link.href} className={active === link.href.slice(1) ? 'active' : ''} href={projectPage ? (link.href === '#media' ? '/?page=work' : `/${link.href}`) : link.href} onClick={(event) => navigateTo(event, link.href)}><small>0{index + 1}</small><span>{link.label}</span></a>
        ))}
        <p className="mobile-menu-footer">Belgrade — Europe — Worldwide</p>
      </div>
    </>
  );
}

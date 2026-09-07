import { useEffect, useRef, useState } from 'react';

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#manifesto', label: 'About us' },
  { href: '#media', label: 'Our work' },
  { href: '#contact', label: 'Contact us' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const animationRef = useRef(null);
  const activeIndex = Math.max(0, links.findIndex((link) => link.href === `#${active}`));

  useEffect(() => {
    let observer;
    const timer = window.setTimeout(() => {
      const sections = links.map(link => document.querySelector(link.href)).filter(Boolean);
      observer = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      }, { root: null, threshold: [.35, .6] });
      sections.forEach(section => observer.observe(section));
    }, 150);
    return () => { window.clearTimeout(timer); observer?.disconnect(); };
  }, []);

  const close = () => setMenuOpen(false);
  const navigateTo = (event, href) => {
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    close();
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      target.scrollIntoView();
      window.history.replaceState(null, '', href);
      return;
    }

    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + start;
    const distance = end - start;
    const duration = 1050;
    const startedAt = performance.now();
    const root = document.documentElement;
    root.style.scrollSnapType = 'none';

    const animate = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = progress < .5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      window.scrollTo(0, start + distance * eased);
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
        <a href="#hero" className="vertical-logo" aria-label="FLOW home" onClick={(event) => navigateTo(event, '#hero')}>
          <img src="/flow-logo.svg" alt="" />
        </a>
        <nav className="vertical-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => navigateTo(event, link.href)} aria-current={active === link.href.slice(1) ? 'page' : undefined} className={`vertical-link${active === link.href.slice(1) ? ' active' : ''}`}>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
      </header>

      <header className="mobile-header">
        <a href="#hero" aria-label="FLOW home"><img src="/flow-logo.svg" alt="FLOW" /></a>
        <button className="menu-trigger" onClick={() => setMenuOpen(open => !open)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </header>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map((link, index) => (
          <a key={link.href} href={link.href} onClick={(event) => navigateTo(event, link.href)}><small>0{index + 1}</small>{link.label}</a>
        ))}
      </div>
    </>
  );
}

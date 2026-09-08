import { useEffect, useRef, useState } from 'react';
import { projects, projectHref } from '../data/projects';
import './WorkPage.css';

const upcoming = [
  { slug: 'next-01', title: 'A new perspective.', category: 'Next in the flow', style: 'orbit' },
  { slug: 'next-02', title: 'More than a moment.', category: 'Something is taking shape', style: 'type' },
  { slug: 'next-03', title: 'The next move.', category: 'Watch this space', style: 'symbol' },
];

function Arrow() {
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function ProjectCard({ project, index }) {
  const video = useRef(null);
  const [preview, setPreview] = useState(false);
  const active = useRef(false);
  const start = () => {
    if (!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    active.current = true;
    if (!video.current.src) video.current.src = project.video;
    video.current.play().then(() => {
      if (active.current) setPreview(true);
      else video.current?.pause();
    }).catch(() => {});
  };
  const stop = () => { active.current = false; video.current?.pause(); setPreview(false); };
  return <a className={`work-archive-card work-archive-card--live${preview ? ' is-previewing' : ''}`} href={projectHref(project)} onMouseEnter={start} onMouseLeave={stop} onFocus={start} onBlur={stop} aria-label={`View ${project.client}: ${project.title}`}>
    <div className="work-archive-art">
      <img src={project.image} alt={`${project.client} campaign`} loading={index === 0 ? 'eager' : 'lazy'} />
      <video ref={video} muted loop playsInline preload="none" aria-hidden="true" onError={() => setPreview(false)} />
      <div className="work-archive-art-top"><span>0{index + 1} / Selected work</span><span className="work-archive-status"><i /> Case study</span></div>
      <span className="work-archive-open">Explore project <Arrow /></span>
      <span className="work-archive-watermark" aria-hidden="true">{project.client}</span>
    </div>
    <div className="work-archive-card-info"><div><p>{project.client} <span>/ {project.category}</span></p><h2>{project.title}</h2></div><Arrow /></div>
  </a>;
}

export default function WorkPage() {
  const [filter, setFilter] = useState('All work');
  useEffect(() => {
    const title = document.title;
    document.title = 'Our Work — FLOW';
    document.documentElement.classList.add('work-archive-document');
    return () => { document.title = title; document.documentElement.classList.remove('work-archive-document'); };
  }, []);
  const showLive = filter !== 'Coming soon';
  const showSoon = filter !== 'Released';
  const total = (showLive ? projects.length : 0) + (showSoon ? upcoming.length : 0);

  return <div className="work-archive">
    <header className="work-archive-hero">
      <div className="work-archive-topline"><a href="/#media">← Back to FLOW</a><span>Independent spirit. Collective impact.</span></div>
      <div className="work-archive-title"><h1>OUR<br /><span>WORK</span><sup>({String(projects.length).padStart(2, '0')})</sup></h1><div className="work-archive-hero-side"><img src="/flow-symbol.svg" alt="" aria-hidden="true" /><p>Made to move.<br />Built to be felt.</p><a href="#work-collection" aria-label="Explore the work collection"><span>Explore the collection</span><Arrow /></a></div></div>
      <div className="work-archive-intro"><span className="work-archive-kicker"><i /> Sport. Culture. In motion.</span><p>Ideas that leave the deck.<br />Stories that enter the culture.</p></div>
    </header>
    <section id="work-collection" className="work-archive-collection" aria-label="Our work collection">
      <div className="work-archive-toolbar"><div className="work-archive-filters" role="group" aria-label="Filter projects">{['All work', 'Released', 'Coming soon'].map((label, index) => <button key={label} aria-pressed={filter === label} onClick={() => setFilter(label)}>{label}<sup>{index === 0 ? projects.length + upcoming.length : index === 1 ? projects.length : upcoming.length}</sup></button>)}</div><span className="work-archive-count" role="status">{String(total).padStart(2, '0')} projects / {filter}</span></div>
      <div className="work-archive-grid" key={filter}>
        {showLive && projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
        {showSoon && upcoming.map((project, index) => <article className={`work-archive-card work-archive-card--soon work-archive-card--${project.style}`} key={project.slug}>
          <div className="work-archive-art"><div className="work-archive-art-top"><span>0{projects.length + index + 1} / Up next</span><span className="work-archive-status">Coming soon</span></div><div className="work-archive-teaser" aria-hidden="true">{project.style === 'orbit' ? <div className="work-archive-orbits"><i /><i /><i /><span>↗</span></div> : project.style === 'type' ? <div className="work-archive-type">STAY<br /><span>IN THE</span><br />FLOW.</div> : <img src="/flow-symbol.svg" alt="" />}</div><span className="work-archive-soon-note">{project.category}<span>+</span></span></div>
          <div className="work-archive-card-info"><div><p>On the horizon <span>/ Coming soon</span></p><h2>{project.title}</h2></div><span className="work-archive-plus" aria-hidden="true">+</span></div>
        </article>)}
      </div>
    </section>
    <section className="work-archive-cta"><p className="work-archive-kicker">The next story could be yours.</p><a href="/#contact"><h2>LET’S MAKE<br /><span>SOMETHING MOVE.</span></h2><span className="work-archive-cta-arrow"><Arrow /></span></a></section>
    <footer className="work-archive-footer"><a href="/#hero"><img src="/flow-logo.svg" alt="FLOW home" /></a><span>Belgrade / Everywhere</span><a href="/#contact">Start a conversation ↗</a></footer>
  </div>;
}

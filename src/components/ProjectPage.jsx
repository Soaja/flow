import { useEffect, useRef, useState } from 'react';
import { projectHref } from '../data/projects';
import './ProjectPage.css';

function Arrow({ back = false }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={back ? { transform: 'rotate(180deg)' } : undefined}><path d="M4 12h16m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export default function ProjectPage({ project, next }) {
  const gallery = useRef(null);
  const video = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    document.documentElement.classList.add('project-document');
    const previousTitle = document.title;
    document.title = `${project.client} — ${project.title} | FLOW`;
    const element = gallery.current;
    const update = () => setEdges({ start: element.scrollLeft <= 2, end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
    const wheel = (event) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientWidth : 1);
      if ((delta > 0 && element.scrollLeft < element.scrollWidth - element.clientWidth - 2) || (delta < 0 && element.scrollLeft > 2)) {
        event.preventDefault();
        element.scrollLeft += delta;
      }
    };
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener('scroll', update, { passive: true });
    element.addEventListener('wheel', wheel, { passive: false });
    return () => {
      document.documentElement.classList.remove('project-document');
      document.title = previousTitle;
      observer.disconnect();
      element.removeEventListener('scroll', update);
      element.removeEventListener('wheel', wheel);
    };
  }, [project]);

  const move = (direction) => gallery.current.scrollBy({ left: direction * (gallery.current.firstElementChild.getBoundingClientRect().width + 24), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  const play = () => {
    setVideoError(false);
    setPlaying(true);
    video.current.play().catch(() => { setPlaying(false); setVideoError(true); });
  };

  return (
    <article className="project-page">
      <div className="project-container">
        <a className="project-back" href="/?page=work"><Arrow back /> All work</a>
        <header className="project-hero">
          <img className="project-symbol" src="/flow-symbol.svg" alt="" aria-hidden="true" />
          <div className="project-hero-copy">
          <p className="project-eyebrow">{project.category}</p>
          <h1><span>{project.client}</span>{project.title}</h1>
          <p className="project-intro">{project.subtitle}</p>
          </div>
          <div className="project-client-logo">
            {project.clientLogo ? <img src={project.clientLogo.src} alt={project.clientLogo.alt || `${project.client} logo`} /> : <span className="project-client-name">{project.client}</span>}
          </div>
        </header>
        <dl className="project-meta">
          {['client', 'role', 'year', 'location'].map(field => <div key={field}><dt>{field}</dt><dd>{project[field]}</dd></div>)}
        </dl>
        <section className="project-feature" aria-label="Project film and creative direction">
        <div className="project-feature-media">
        <div className="project-feature-caption"><span><i /> The main feature</span><span>{project.client}</span></div>
        <div className={`project-film${playing ? ' project-film--playing' : ''}`}>
          <video ref={video} src={project.video} poster={project.image} controls={playing} playsInline preload="none" aria-label={`${project.title} project film`} onError={() => { setVideoError(true); setPlaying(false); }} />
          {!playing && <button className="project-play" onClick={play} aria-label={`Play ${project.title}`}><span className="project-play-icon"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 4 13 8-13 8Z" fill="currentColor" /></svg></span><span className="project-film-label">Play main feature <span>↗</span></span></button>}
        </div>
        {videoError && <p role="alert" className="project-video-error">The film could not play. Try again or <a href={project.video}>open the video directly</a>.</p>}
        <div className="project-feature-credit"><span>{project.title}</span><span>Film by FLOW ↗</span></div>
        </div>
        <div className="project-story">
          <div className="project-story-topline"><span>Behind the work</span><img src="/flow-symbol.svg" alt="" aria-hidden="true" /></div>
          <section className="project-story-chapter"><span className="project-chapter-number" aria-hidden="true">01</span><p className="project-eyebrow">The brief</p><h2>The<br />challenge<span className="project-heading-dot">.</span></h2><p>{project.challenge}</p></section>
          <section className="project-story-chapter project-story-chapter--approach"><span className="project-chapter-number" aria-hidden="true">02</span><p className="project-eyebrow">Our thinking</p><h2>The<br />approach<span className="project-heading-dot">.</span></h2><p>{project.approach}</p></section>
          <div className="project-story-bottomline"><span>From an idea. Into motion.</span><Arrow /></div>
        </div>
        </section>
        <section className="project-gallery" aria-labelledby="gallery-heading">
          <div className="project-gallery-heading"><div><p className="project-eyebrow">03 / In focus</p><h2 id="gallery-heading">Moments in motion.</h2></div><div className="project-gallery-controls"><button disabled={edges.start} onClick={() => move(-1)} aria-label="Previous gallery image" aria-controls="project-gallery-track"><Arrow back /></button><button disabled={edges.end} onClick={() => move(1)} aria-label="Next gallery image" aria-controls="project-gallery-track"><Arrow /></button></div></div>
          <div className="project-gallery-track" id="project-gallery-track" ref={gallery} tabIndex={0} role="region" aria-label="Project gallery. Scroll horizontally or use the arrow buttons." onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}>
            {project.gallery.map((item, index) => <figure key={item.src}><img src={item.src} alt={item.alt} loading="lazy" decoding="async" /><figcaption><span>{String(index + 1).padStart(2, '0')} / {item.caption}</span><span>FLOW</span></figcaption></figure>)}
          </div>
        </section>
        <section className="project-impact" aria-labelledby="impact-heading">
          <h2 id="impact-heading" className="project-eyebrow">04 / The impact</h2>
          <dl className="project-metrics">
            {project.metrics.map((metric, index) => <div className="project-metric" key={index}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}
          </dl>
        </section>
        <a className="project-next" href={projectHref(next)}><div><p className="project-eyebrow">Next project / {next.client}</p><h2>{next.title}</h2></div><span className="project-next-arrow"><Arrow /></span></a>
        <footer className="project-footer"><a href="/#hero"><img src="/flow-logo.svg" alt="FLOW home" /></a><span>Belgrade. Built for everywhere.</span><a href="/#contact">Start a project ↗</a></footer>
      </div>
    </article>
  );
}

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapIdle } from '../utils/useGsap';
gsap.registerPlugin(ScrollTrigger);

const projects = [
  { num: '01', client: 'Nike · Jordan Brand', tags: ['Campaign','Production','Regional'] },
  { num: '02', client: 'Regional Club Partnership', tags: ['Brand Strategy','Social Content','Activation'] },
  { num: '03', client: 'Athlete Launch Campaign', tags: ['Talent','Brand Development','Media'] },
  { num: '04', client: 'Sports Event Marketing', tags: ['Event','Sponsorship','Adriatic Region'] },
];

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 12L12 2M12 2H4M12 2v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Work() {
  const sectionRef = useRef(null);

  useGsapIdle(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-header', { y: 36, opacity: 0, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.work-item', { y: 32, opacity: 0, stagger: .1, duration: .65, ease: 'power3.out', scrollTrigger: { trigger: '.work-list', start: 'top 78%' } });
    }, sectionRef);
    return () => ctx.revert();
  });

  return (
    <section id="work" ref={sectionRef} style={{ padding: '120px 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="work-header" style={{ marginBottom: 60 }}>
          <p style={{ fontSize: '.7rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>Our work</p>
          <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 700, letterSpacing: '-.03em', lineHeight: 1, textTransform: 'uppercase' }}>
            Campaigns<br />that moved sport.
          </h2>
        </div>

        <div className="work-list">
          {projects.map((p, i) => (
            <div key={i} className="work-item" tabIndex={0} role="listitem">
              <span style={{ fontSize: '.74rem', fontWeight: 600, letterSpacing: '.1em', color: 'var(--fg-muted)' }}>{p.num}</span>
              <div>
                <h3 className="work-client">{p.client}</h3>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontSize: '.7rem', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>— {t}</span>
                  ))}
                </div>
              </div>
              <div className="arrow-circle">
                <ArrowIcon />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

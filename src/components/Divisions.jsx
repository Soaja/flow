import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapIdle } from '../utils/useGsap';
gsap.registerPlugin(ScrollTrigger);

const divisions = [
  {
    num: '01', name: 'FLOW Agency',
    desc: 'A sports marketing agency built to bridge the gap between brands and the Balkan sports ecosystem. Campaign strategy, content production, brand partnerships — executed at the standard global brands expect.',
    services: ['Brand Strategy','Campaign Production','Partnerships','Social Activation','Event Marketing'],
    href: '#contact', cta: 'Work with us',
  },
  {
    num: '02', name: 'FLOW Media',
    desc: 'A digital-first sports media channel native to TikTok, Instagram and YouTube. Building the audience first — the community that sponsors and partners follow.',
    services: ['Short-Form Video','Documentary','Podcast','Live Coverage','Community'],
    href: '#media', cta: 'Watch content',
  },
  {
    num: '03', name: 'FLOW Management',
    desc: 'Athlete representation and brand development for the next generation of Balkan sports talent. Not just contracts — building athlete brands that outlast careers.',
    services: ['Representation','Brand Development','Endorsements','Career Strategy','Content'],
    href: '#athletes', cta: 'Our athletes',
  },
];

function DivisionCard({ d }) {
  return (
    <article className="division-card">
      {/* Left accent bar — animated via CSS */}
      <div className="division-accent-bar" />

      <div style={{ fontSize: '.7rem', fontWeight: 600, letterSpacing: '.16em', color: 'var(--accent)', marginBottom: 32 }}>{d.num}</div>
      <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-.02em', marginBottom: 16 }}>{d.name}</h3>
      <p style={{ fontSize: '.9rem', lineHeight: 1.65, color: 'var(--fg-muted)', marginBottom: 28 }}>{d.desc}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
        {d.services.map(s => (
          <span key={s} style={{
            fontSize: '.68rem', fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase',
            color: 'var(--fg-muted)', padding: '5px 10px',
            border: '1px solid var(--border)', borderRadius: 2,
          }}>{s}</span>
        ))}
      </div>

      <a href={d.href} className="division-link">
        {d.cta}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      <div style={{
        position: 'absolute', right: -16, bottom: -20,
        fontFamily: 'var(--f-display)', fontSize: '9rem', fontWeight: 700,
        color: 'var(--fg)', opacity: .02, lineHeight: 1, pointerEvents: 'none',
      }}>{d.num}</div>
    </article>
  );
}

export default function Divisions() {
  const sectionRef = useRef(null);

  useGsapIdle(() => {
    const ctx = gsap.context(() => {
      gsap.from('.division-card-wrap', {
        y: 60, opacity: 0, stagger: .12, duration: .8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
      gsap.from('.divisions-header', {
        y: 40, opacity: 0, duration: .7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  });

  return (
    <section id="divisions" ref={sectionRef} style={{ padding: '120px 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="divisions-header" style={{ marginBottom: 60 }}>
          <p style={{ fontSize: '.7rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>What we do</p>
          <h2 style={{
            fontFamily: 'var(--f-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 700, letterSpacing: '-.03em', lineHeight: 1, textTransform: 'uppercase',
          }}>Three divisions.<br />One vision.</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }} className="divisions-grid">
          {divisions.map((d) => (
            <div key={d.num} className="division-card-wrap">
              <DivisionCard d={d} />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:900px){.divisions-grid{grid-template-columns:1fr !important}}
        .division-accent-bar {
          position: absolute; top: 0; left: 0; width: 3px; height: 0;
          background: var(--accent); transition: height .4s cubic-bezier(.22,.61,.36,1);
        }
        .division-card:hover .division-accent-bar { height: 100%; }
      `}</style>
    </section>
  );
}

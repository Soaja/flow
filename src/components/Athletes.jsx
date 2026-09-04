import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapIdle } from '../utils/useGsap';
gsap.registerPlugin(ScrollTrigger);

const roster = [
  { sport: 'Basketball', name: 'Marko J.',  club: 'KK Partizan · Belgrade', num: '7',  img: '/athlete-2.webp' },
  { sport: 'Football',   name: 'Stefan M.', club: 'FK Crvena zvezda · U21',  num: '9',  img: '/athlete-3.webp' },
  { sport: 'Athletics',  name: 'Ana V.',    club: 'WTA Circuit · Serbia',     num: '23', img: '/athlete-woman.webp' },
  { sport: 'Freestyle',  name: 'Nikola P.', club: 'Balkans Region',           num: '4',  img: '/athlete-parkour.webp' },
];

export default function Athletes() {
  const sectionRef = useRef(null);
  const scrollRef  = useRef(null);

  /* drag-to-scroll */
  useEffect(() => {
    const el = scrollRef.current;
    let isDown = false, startX, scrollLeft;
    const down  = e => { isDown = true; el.classList.add('dragging'); startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; };
    const leave = () => { isDown = false; el.classList.remove('dragging'); };
    const move  = e => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 1.4; };
    el.addEventListener('mousedown', down); el.addEventListener('mouseleave', leave);
    el.addEventListener('mouseup', leave);  el.addEventListener('mousemove', move);
    return () => {
      el.removeEventListener('mousedown', down); el.removeEventListener('mouseleave', leave);
      el.removeEventListener('mouseup', leave);  el.removeEventListener('mousemove', move);
    };
  }, []);

  useGsapIdle(() => {
    const ctx = gsap.context(() => {
      gsap.from('.athlete-header', { y: 36, opacity: 0, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.athlete-card', { x: 60, opacity: 0, stagger: .1, duration: .75, ease: 'power3.out', scrollTrigger: { trigger: scrollRef.current, start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  });

  return (
    <section id="athletes" ref={sectionRef} style={{ padding: '120px 0', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
      <div className="container">
        <div className="athlete-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 60, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <p style={{ fontSize: '.7rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>FLOW Management</p>
            <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 700, letterSpacing: '-.03em', lineHeight: 1, textTransform: 'uppercase' }}>
              The athletes.<br />The next wave.
            </h2>
          </div>
          <a href="#contact" className="btn-ghost-sm">Athlete inquiry ↗</a>
        </div>
      </div>

      <div ref={scrollRef} className="drag-scroll athletes-strip" style={{
        display: 'flex', gap: 2, overflowX: 'auto', scrollbarWidth: 'none',
        paddingLeft: 40, paddingRight: 40,
      }}>
        {roster.map(a => (
          <article key={a.name} className="athlete-card athlete-card-wrap"
            style={{ flex: '0 0 300px', aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}
          >
            <img className="aimg" src={a.img} alt={a.name} loading="lazy" decoding="async" />

            {/* Number watermark */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <span style={{ fontFamily: 'var(--f-display)', fontSize: '10rem', fontWeight: 700, color: 'var(--accent)', opacity: .07, lineHeight: 1 }}>{a.num}</span>
            </div>

            {/* Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(32,33,32,.92) 0%, transparent 55%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 24 }}>
              <p style={{ fontSize: '.65rem', fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 4 }}>{a.sport}</p>
              <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '1.3rem', fontWeight: 700 }}>{a.name}</h3>
              <p style={{ fontSize: '.78rem', color: 'var(--fg-muted)', marginTop: 4 }}>{a.club}</p>
            </div>
          </article>
        ))}

        {/* CTA card */}
        <article className="athlete-card athlete-cta-card"
          style={{ flex: '0 0 300px', aspectRatio: '3/4', background: 'var(--accent)', cursor: 'pointer', position: 'relative' }}
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
            <img src="/flow-logo-symbol.svg" alt="" aria-hidden="true" style={{ width: 48, marginBottom: 20, opacity: .6 }} />
            <p style={{ fontFamily: 'var(--f-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--bg)', letterSpacing: '-.02em', lineHeight: 1.1, marginBottom: 24 }}>
              Are you the next athlete we represent?
            </p>
            <span style={{ fontFamily: 'var(--f-display)', fontSize: '.76rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--bg)', border: '1.5px solid var(--bg)', padding: '10px 20px', borderRadius: 4 }}>
              Get in touch →
            </span>
          </div>
        </article>
      </div>

      <style>{`.dragging { cursor: grabbing !important; }`}</style>
    </section>
  );
}

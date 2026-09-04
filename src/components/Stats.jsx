import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapIdle } from '../utils/useGsap';
gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: 12,    suffix: '+',  label: 'Brand campaigns executed' },
  { num: 6,     suffix: '+',  label: 'Countries in the region' },
  { num: 50,    suffix: 'k+', label: 'Social media reach' },
  { text: 'Nike', dot: '.', label: 'Campaign heritage' },
];

export default function Stats() {
  const sectionRef = useRef(null);

  useGsapIdle(() => {
    const ctx = gsap.context(() => {
      /* — stagger blocks */
      gsap.from('.stat-block', {
        y: 40, opacity: 0, stagger: .1, duration: .7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      /* — counter animation */
      sectionRef.current.querySelectorAll('[data-count]').forEach(el => {
        const target = +el.getAttribute('data-count');
        ScrollTrigger.create({
          trigger: el, start: 'top 90%', once: true,
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: target, duration: 1.4, ease: 'power2.out',
              onUpdate() { el.textContent = Math.floor(this.targets()[0].val); },
            });
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  });

  return (
    <section id="stats" ref={sectionRef} style={{ padding: '80px 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          gap: 1, background: 'var(--border)',
        }} className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-block" style={{
              background: 'var(--bg)', padding: '48px 40px', textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--f-display)', fontSize: 'clamp(2.2rem,3.5vw,3.2rem)',
                fontWeight: 700, letterSpacing: '-.04em', color: 'var(--fg)', lineHeight: 1, marginBottom: 8,
              }}>
                {s.text
                  ? <>{s.text}<span style={{ color: 'var(--accent)' }}>{s.dot}</span></>
                  : <><span data-count={s.num}>{s.num}</span><span style={{ color: 'var(--accent)' }}>{s.suffix}</span></>
                }
              </div>
              <div style={{ fontSize: '.76rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.stats-grid{grid-template-columns:repeat(2,1fr) !important}}`}</style>
    </section>
  );
}

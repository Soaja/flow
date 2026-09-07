import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapIdle } from '../utils/useGsap';
gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    type: 'Documentary',
    title: 'Inside the Balkan Basketball Circuit — How players get overlooked',
    img: '/athlete-silhouette.webp',
  },
  {
    type: 'Short-form',
    title: "The brands sleeping on Balkan football. We're waking them up.",
    img: '/athlete-run.webp',
  },
  {
    type: 'Podcast',
    title: 'Ep. 12 — What it takes to go pro from Serbia in 2025',
    img: '/athlete-parkour.webp',
  },
];

export default function MediaHub() {
  const sectionRef = useRef(null);

  useGsapIdle(() => {
    const ctx = gsap.context(() => {
      // clip-path reveal on each card
      document.querySelectorAll('.media-img-wrap').forEach((el, i) => {
        gsap.fromTo(el,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: .9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
            delay: i * .12,
          }
        );
      });

      gsap.from('.media-card-text', { y: 24, opacity: 0, stagger: .14, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: '.media-cards-grid', start: 'top 76%' } });
    }, sectionRef);
    return () => ctx.revert();
  });

  return (
    <section id="media" ref={sectionRef} className="work-showcase" style={{ padding: 0, borderBottom: '1px solid var(--border)' }}>
      <div className="work-bg-image" aria-hidden="true" />
      <div className="work-bg-grid" aria-hidden="true" />
      <div className="container work-content">
        <div className="media-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
          {cards.map((c, i) => (
            <article key={i} className="media-card-wrap" style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden' }}>
              {/* Image with clip-path reveal wrapper */}
              <div className="media-img-wrap" style={{ aspectRatio: '9/12', overflow: 'hidden', position: 'relative' }}>
                <img className="card-img" src={c.img} alt={c.type} loading="lazy" decoding="async" />

                {/* Overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(32,33,32,.96) 0%, rgba(32,33,32,.15) 55%, transparent 100%)',
                }} />

                {/* Play button — CSS hover via .media-card-wrap:hover .play-btn */}
                <div className="play-btn">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M7 5l9 5-9 5V5z" fill="#202120"/>
                  </svg>
                </div>

                {/* Card text */}
                <div className="media-card-text" style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 24px 24px',
                }}>
                  <p style={{ fontSize: '.65rem', fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>{c.type}</p>
                  <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.2, color: 'var(--fg)' }}>{c.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
      <h2 className="work-brutal"><span>Our</span><span>Work</span></h2>
      <style>{`
        .work-showcase { position:relative; overflow:hidden; isolation:isolate; background:#1f211f; }
        .work-content { position:relative; z-index:2; width:100%; max-width:none!important; padding-inline:var(--desktop-gutter) }
        .media-cards-grid{height:clamp(500px,70vh,760px)}
        .media-card-wrap,.media-img-wrap{height:100%}.media-img-wrap{aspect-ratio:auto!important}
        .work-brutal{position:absolute;z-index:2;right:var(--desktop-gutter);bottom:clamp(8px,1.1vh,12px);width:auto;margin:0;padding:0;display:flex;justify-content:flex-start;align-items:flex-end;gap:.18em;font-family:var(--f-display);font-size:clamp(7rem,min(14.5vw,20vh),15rem);font-weight:700;line-height:.7;letter-spacing:-.082em;text-transform:uppercase;color:var(--fg);white-space:nowrap}
        .work-showcase::before { content:''; position:absolute; z-index:-1; inset:0; background:linear-gradient(90deg,rgba(31,33,31,.96) 0%,rgba(31,33,31,.78) 48%,rgba(31,33,31,.94) 100%),radial-gradient(circle at 76% 30%,rgba(202,219,46,.12),transparent 28%); }
        .work-bg-image { position:absolute; z-index:-3; inset:-8%; background:url('/flow-visual.webp') center/cover no-repeat; filter:grayscale(1) contrast(1.15); opacity:.32; transform:scale(1.05); }
        .work-bg-grid { position:absolute; z-index:-1; inset:0; background-image:linear-gradient(rgba(231,233,234,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(231,233,234,.025) 1px,transparent 1px); background-size:68px 68px; mask-image:linear-gradient(to bottom,#000,transparent 88%); }
        .media-card-wrap { border:1px solid rgba(231,233,234,.1); background:#161816; box-shadow:0 22px 55px rgba(0,0,0,.24); }
        @media(min-width:1025px) and (max-height:820px){.media-cards-grid{height:65vh}.media-card-text{padding:0 18px 18px!important}.play-btn{width:46px;height:46px}}
        @media(max-width:900px){.media-cards-grid{grid-template-columns:1fr !important;height:auto;max-height:none}.media-card-wrap,.media-img-wrap{height:64vh;min-height:440px}.work-brutal{position:relative;right:auto;bottom:auto;display:block;margin:30px 0 24px;padding:0 20px;font-size:21vw;white-space:normal}.work-brutal span{display:block}}
        @media(max-width:900px){.work-showcase{height:auto!important;min-height:100dvh;padding-top:88px!important}.work-bg-image{opacity:.2}}
      `}</style>
    </section>
  );
}

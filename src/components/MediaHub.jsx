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

const platforms = ['TikTok', 'Instagram', 'YouTube', 'Podcast'];

export default function MediaHub() {
  const sectionRef = useRef(null);

  useGsapIdle(() => {
    const ctx = gsap.context(() => {
      gsap.from('.media-header', { y: 36, opacity: 0, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });

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
      gsap.from('.platform-row', { y: 20, opacity: 0, duration: .6, ease: 'power3.out', scrollTrigger: { trigger: '.platform-row', start: 'top 88%' } });
    }, sectionRef);
    return () => ctx.revert();
  });

  return (
    <section id="media" ref={sectionRef} className="work-showcase" style={{ padding: '120px 0', borderBottom: '1px solid var(--border)' }}>
      <div className="work-bg-image" aria-hidden="true" />
      <div className="work-bg-grid" aria-hidden="true" />
      <div className="work-bg-word" aria-hidden="true">WORK</div>
      <div className="work-bg-orbit" aria-hidden="true"><span /></div>
      <div className="container work-content">
        <div className="media-header" style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: 60, flexWrap: 'wrap', gap: 24,
        }}>
          <div>
            <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 700, letterSpacing: '-.03em', lineHeight: 1, textTransform: 'uppercase' }}>
              Our Work
            </h2>
          </div>
          <a href="#" className="btn-ghost-sm">All content ↗</a>
        </div>

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

        <div className="platform-row" style={{ display: 'flex', alignItems: 'center', gap: 32, marginTop: 40, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '.72rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>Find us on</span>
          {platforms.map(p => (
            <a key={p} href="#" className="platform-link" style={{
              fontFamily: 'var(--f-display)', fontSize: '.9rem', fontWeight: 700,
              color: 'var(--fg-muted)', transition: 'color .2s',
            }}>
              {p}
            </a>
          ))}
        </div>
      </div>
      <style>{`
        .work-showcase { position:relative; overflow:hidden; isolation:isolate; background:#1f211f; }
        .work-content { position:relative; z-index:2; }
        .work-showcase::before { content:''; position:absolute; z-index:-1; inset:0; background:linear-gradient(90deg,rgba(31,33,31,.96) 0%,rgba(31,33,31,.78) 48%,rgba(31,33,31,.94) 100%),radial-gradient(circle at 76% 30%,rgba(202,219,46,.12),transparent 28%); }
        .work-bg-image { position:absolute; z-index:-3; inset:-8%; background:url('/flow-visual.webp') center/cover no-repeat; filter:grayscale(1) contrast(1.15); opacity:.32; transform:scale(1.05); }
        .work-bg-grid { position:absolute; z-index:-1; inset:0; background-image:linear-gradient(rgba(231,233,234,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(231,233,234,.025) 1px,transparent 1px); background-size:68px 68px; mask-image:linear-gradient(to bottom,#000,transparent 88%); }
        .work-bg-word { position:absolute; z-index:0; right:-2vw; top:-2vh; font-family:var(--f-display); font-size:clamp(11rem,28vw,31rem); font-weight:700; line-height:.8; letter-spacing:-.09em; color:transparent; -webkit-text-stroke:1px rgba(202,219,46,.08); pointer-events:none; }
        .work-bg-orbit { position:absolute; z-index:0; right:8%; top:14%; width:min(34vw,520px); aspect-ratio:1; border:1px solid rgba(202,219,46,.12); border-radius:50%; animation:workOrbit 12s linear infinite; }
        .work-bg-orbit::before,.work-bg-orbit::after { content:''; position:absolute; border:1px solid rgba(202,219,46,.055); border-radius:50%; }.work-bg-orbit::before{inset:12%}.work-bg-orbit::after{inset:27%}
        .work-bg-orbit span { position:absolute; left:50%; top:-5px; width:10px; height:10px; border-radius:50%; background:var(--accent); box-shadow:0 0 30px 8px rgba(202,219,46,.28); }
        .media-card-wrap { border:1px solid rgba(231,233,234,.1); background:#161816; box-shadow:0 22px 55px rgba(0,0,0,.24); }
        @keyframes workOrbit { to { transform:rotate(360deg); } }
        @media(max-width:900px){.media-cards-grid{grid-template-columns:1fr !important}}
        @media(max-width:900px){.work-showcase{height:auto!important;min-height:100dvh}.work-bg-word{top:6%;right:-12%;font-size:55vw}.work-bg-orbit{width:80vw;right:-35%;top:10%}.work-bg-image{opacity:.2}}
        .platform-link:hover { color: var(--accent) !important; }
      `}</style>
    </section>
  );
}

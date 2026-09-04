import { useEffect, useRef } from 'react';

export default function Hero() {
  const sectionRef = useRef(null);
  const imgRef     = useRef(null);
  const symbolRef  = useRef(null);

  /* Lazy-load GSAP only for scroll parallax — never blocks initial paint */
  useEffect(() => {
    let ctx;
    const init = async () => {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.to(imgRef.current, {
          yPercent: 22, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to(symbolRef.current, {
          yPercent: 38, opacity: 0, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '60% top', scrub: true },
        });
      }, sectionRef);
    };
    init();
    return () => { if (ctx) ctx.revert(); };
  }, []);

  const words = ['Sport.', 'Redefined.'];

  return (
    <section id="hero" ref={sectionRef} style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      paddingBottom: 160, overflow: 'hidden',
    }}>

      {/* Full-bleed athlete image — CSS entrance animation */}
      <div ref={imgRef} className="hero-img-wrap" style={{ position: 'absolute', inset: 0 }}>
        <picture>
          <source
            srcSet="/hero-runner-europe-4k-sm.webp 768w, /hero-runner-europe-4k.webp 2560w"
            sizes="100vw"
            type="image/webp"
          />
          <img
            src="/hero-runner-europe-4k.png"
            alt="European track athlete sprinting through dramatic light"
            fetchpriority="high"
            decoding="async"
            width="2160" height="3853"
            style={{ width: '100%', height: '115%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        </picture>
      </div>

      {/* Multi-layer overlay */}
      <div className="hero-overlay" style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(to right, rgba(32,33,32,.92) 0%, rgba(32,33,32,.6) 55%, rgba(32,33,32,.1) 100%),
          linear-gradient(to top, rgba(32,33,32,.98) 0%, transparent 60%)
        `,
      }} />

      {/* Texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/texture.webp)', backgroundSize: 'cover',
        opacity: .04, mixBlendMode: 'multiply', pointerEvents: 'none',
      }} />

      {/* The supplied FLOW symbol becomes the page's living heartbeat. */}
      <div ref={symbolRef} className="hero-pulse" aria-hidden="true">
        <span className="hero-pulse-ring" />
        <img src="/flow-symbol.svg" alt="" width="520" height="520" decoding="async" />
      </div>

      <div className="container" style={{ position: 'relative' }}>

        <p className="hero-tag" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: '.72rem', fontWeight: 600, letterSpacing: '.2em',
          textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 24,
        }}>
          <span style={{ width: 24, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
          Belgrade - Europe - Worldwide
        </p>

        <h1 style={{
          fontFamily: 'var(--f-display)',
          fontSize: 'clamp(3.8rem, 9.5vw, 10rem)',
          fontWeight: 700, lineHeight: .92,
          letterSpacing: '-.04em', textTransform: 'uppercase',
          color: 'var(--fg)', maxWidth: 900, marginBottom: 32,
          overflow: 'hidden',
        }}>
          {words.map((w, i) => (
            <span key={i} className={`hero-word hero-word-${i}`} style={{
              display: 'block',
              color: i === 1 ? 'var(--accent)' : 'var(--fg)',
            }}>{w}</span>
          ))}
        </h1>

        <p className="hero-sub" style={{
          fontSize: '1.05rem', lineHeight: 1.65, color: 'rgba(230,231,231,.7)',
          maxWidth: 460, marginBottom: 44, transform: 'translateY(24px)',
        }}>
          Future communication of sports.
        </p>

        <div className="hero-actions hero-act" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', transform: 'translateY(24px)' }}>
          <a href="#contact" className="btn-primary">Partner with us →</a>
          <a href="#media" className="btn-ghost">Explore our work</a>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: -60, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase',
          color: 'rgba(230,231,231,.4)',
        }} aria-hidden="true">
          <span style={{ writingMode: 'vertical-rl' }}>Scroll</span>
          <span style={{ width: 1, height: 44,
            background: 'linear-gradient(to bottom, rgba(230,231,231,.4), transparent)',
            animation: 'scrollLine 1.8s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        /* ── Hero entrance — pure CSS, zero GSAP on initial load */
        .hero-img-wrap  { animation: hImgIn 1.4s cubic-bezier(.22,.61,.36,1) both; }
        .hero-overlay   { animation: hFade .8s ease both; }
        .hero-tag       { opacity:0; animation: hUp .7s cubic-bezier(.22,.61,.36,1) .3s both; }
        .hero-word-0    { opacity:0; animation: hWord .8s cubic-bezier(.22,.61,.36,1) .45s both; }
        .hero-word-1    { opacity:0; animation: hWord .8s cubic-bezier(.22,.61,.36,1) .54s both; }
        .hero-sub       { opacity:0; animation: hUp .6s cubic-bezier(.22,.61,.36,1) .75s both; }
        .hero-act       { opacity:0; animation: hUp .5s cubic-bezier(.22,.61,.36,1) .9s both; }

        @keyframes hImgIn { from { transform: scale(1.08); } to { transform: scale(1); } }
        @keyframes hFade  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes hUp    { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
        @keyframes hWord  { from { opacity:0; transform:translateY(60px); } to { opacity:1; transform:none; } }
        .hero-pulse { position:absolute; right:4%; top:48%; width:min(42vw,560px); aspect-ratio:1.52; display:grid; place-items:center; pointer-events:none; filter:drop-shadow(0 0 30px rgba(202,219,46,.3)); }
        .hero-pulse img { width:100%; position:relative; z-index:1; animation:flowBeat 2.2s cubic-bezier(.22,.61,.36,1) infinite; }
        .hero-pulse-ring { position:absolute; width:82%; aspect-ratio:1; border:1px solid rgba(202,219,46,.38); border-radius:50%; animation:flowRing 2.2s ease-out infinite; }
        @keyframes flowBeat { 0%,100%{transform:scale(1);opacity:.38} 8%{transform:scale(1.055);opacity:.92} 16%{transform:scale(1);opacity:.48} 24%{transform:scale(1.035);opacity:.8} 34%{transform:scale(1);opacity:.38} }
        @keyframes flowRing { 0%{transform:scale(.62);opacity:.8} 42%,100%{transform:scale(1.22);opacity:0} }

        @media (max-width: 768px) { #hero { padding-bottom: 96px; } .hero-pulse{right:-25%;top:24%;width:86vw;opacity:.38} }
      `}</style>
    </section>
  );
}

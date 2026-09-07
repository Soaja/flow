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
          yPercent: 12, opacity: 0, ease: 'none',
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
            srcSet="/hero-background-sm.webp 768w, /hero-background.webp 2560w"
            sizes="100vw"
            type="image/webp"
          />
          <img
            src="/hero-background.png"
            alt="FLOW sports communications visual with neon pulse lines"
            fetchpriority="high"
            decoding="async"
            width="2048" height="1152"
            style={{ width: '100%', height: '115%', objectFit: 'cover', objectPosition: '64% center', display: 'block' }}
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
          fontSize: 'clamp(3.8rem, min(9.5vw, 15vh), 10rem)',
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
        .hero-pulse { position:absolute; z-index:0; inset:-12% -20% -12% -18%; display:flex; align-items:center; justify-content:center; pointer-events:none; opacity:.2; overflow:hidden; mix-blend-mode:screen; filter:drop-shadow(0 0 52px rgba(202,219,46,.15)); }
        .hero-pulse::before { content:''; position:absolute; z-index:2; top:9%; bottom:9%; left:0; width:1px; opacity:0; background:linear-gradient(180deg,transparent,rgba(202,219,46,.22) 12%,var(--accent) 50%,rgba(202,219,46,.22) 88%,transparent); box-shadow:0 0 18px rgba(202,219,46,.48); animation:ekgScan 3.2s cubic-bezier(.4,0,.18,1) infinite; }
        .hero-pulse::after { content:''; position:absolute; inset:8%; background:radial-gradient(ellipse at center,rgba(202,219,46,.1),transparent 68%); filter:blur(56px); opacity:.6; }
        .hero-pulse img { position:relative; z-index:1; width:150%; max-width:none; height:122%; object-fit:contain; filter:brightness(0) saturate(100%) invert(87%) sepia(54%) saturate(1028%) hue-rotate(16deg) brightness(91%) contrast(88%) blur(.15px); clip-path:inset(0 100% 0 0); animation:ekgReveal 3.2s cubic-bezier(.4,0,.18,1) infinite; }
        @keyframes ekgReveal { 0%,4%{clip-path:inset(0 100% 0 0);opacity:0} 7%{opacity:.88} 46%{clip-path:inset(0);opacity:.88} 58%{clip-path:inset(0);opacity:.76} 78%,100%{clip-path:inset(0);opacity:0} }
        @keyframes ekgScan { 0%,4%{left:0;opacity:0} 7%{left:0;opacity:1} 46%{left:100%;opacity:1} 51%,100%{left:100%;opacity:0} }

        @media (min-width:1025px) { #hero{padding-bottom:clamp(76px,14.8vh,160px)!important} #hero .container{padding-inline:var(--desktop-gutter)} }
        @media (min-width:1025px) and (max-height:820px) { #hero .hero-tag{margin-bottom:14px!important} #hero h1{margin-bottom:20px!important} #hero .hero-sub{margin-bottom:24px!important;font-size:.94rem!important} }

        @media (max-width: 768px) { #hero { padding-bottom: 96px; } .hero-pulse{inset:-8% -45% -8% -42%;opacity:.14}.hero-pulse img{width:155%;height:112%} }
      `}</style>
    </section>
  );
}

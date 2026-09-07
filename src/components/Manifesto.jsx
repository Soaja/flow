import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapIdle } from '../utils/useGsap';
gsap.registerPlugin(ScrollTrigger);

const services = [
  'Creative & Campaigns', 'Social-First Content', 'Athlete Communications',
  'Brand Partnerships', 'Digital Strategy', 'Commercial Activations', 'Community & Events',
];

function ServiceIcon({ index }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = [
    <><path d="M12 2.5 13.8 8l5.7 1.8-5.7 1.8L12 17l-1.8-5.4-5.7-1.8L10.2 8 12 2.5Z"/><path d="M19 3v3M17.5 4.5h3"/></>,
    <><path d="M4 5.5h10.5v9H4z"/><path d="m14.5 8 5-2.5v9l-5-2.5M7 3v2.5"/></>,
    <><circle cx="8" cy="7" r="3"/><path d="M2.5 18c.7-3.3 2.5-5 5.5-5 1.8 0 3.2.6 4.1 1.8M15 5.5h6v8h-3l-2.5 2v-2H14v-8Z"/></>,
    <><path d="M9.5 14.5 7 17a3.5 3.5 0 0 1-5-5l3-3a3.5 3.5 0 0 1 5-.1"/><path d="m14.5 9.5 2.5-2.5a3.5 3.5 0 0 1 5 5l-3 3a3.5 3.5 0 0 1-5 .1M8 12h8"/></>,
    <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></>,
    <><path d="M13 2 4 13h7l-1 9 9-12h-7l1-8Z"/></>,
    <><path d="M4 6h16v14H4zM8 3v5M16 3v5M4 10h16"/><path d="m8 15 2 2 5-5"/></>,
  ];
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>{paths[index]}</svg>;
}

const moments = [
  ['/athlete-run.webp', 'Run', '/jordan-the-one.mp4', '01'],
  ['/artboard-2.png', 'Detail', null, '02'],
  ['/athlete-silhouette.webp', 'Motion', '/metcon-fortfight.mp4', '03'],
  ['/flow-logo.svg', 'Flow', null, '04—05', true],
  ['/athlete-2.webp', 'Campaign', '/nike-midnight-run.mp4', '06'],
];

export default function Manifesto() {
  const sectionRef = useRef(null);
  const playMoment = (event) => {
    const video = event.currentTarget.querySelector('.moment-portrait-preview video');
    if (video) {
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {});
    }
  };
  const stopMoment = (event) => {
    const video = event.currentTarget.querySelector('.moment-portrait-preview video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };
  useGsapIdle(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-main-copy > *', { y: 34, opacity: 0, stagger: .07, duration: .72, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' } });
      gsap.from('.service-chip', { y: 18, opacity: 0, stagger: .045, duration: .5, ease: 'power3.out', scrollTrigger: { trigger: '.service-cloud', start: 'top 82%' } });
    }, sectionRef);
    return () => ctx.revert();
  });

  return (
    <section id="manifesto" ref={sectionRef} className="about-screen">
      <div className="about-photo" aria-hidden="true" />
      <div className="about-grid" aria-hidden="true" />
      <img className="about-bg-symbol" src="/flow-symbol.svg" alt="" aria-hidden="true" />
      <div className="about-scan" aria-hidden="true" />

      <div className="about-layout">
        <div className="about-main-copy">
          <div className="about-label"><span>02</span> About us</div>
          <h2><strong>A sports marketing<br />and media agency</strong><span>Giving sport a new voice.</span></h2>
          <p className="about-intro">Born in Belgrade. Built for the future of sports.</p>
          <p className="about-description">Founded on agency experience and young energy — the team behind Jordan Brand&rsquo;s global campaigns and Nike in the region. FLOW brings together marketing, media and athlete communications under one brand.</p>
          <h3>We move sport forward through:</h3>
          <div className="service-cloud">
            {[services.slice(0, 2), services.slice(2, 4), services.slice(4)].map((row, rowIndex) => (
              <div className="service-row" key={rowIndex}>
                {row.map((service) => {
                  const index = services.indexOf(service);
                  return <span className="service-chip" key={service}><i><ServiceIcon index={index} /></i>{service}</span>;
                })}
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="moments-dock">
        <div className="moments-title" aria-label="Moments from the field" />
        <div className="moments-list">
          {moments.map(([src, label, videoSrc, number, merged]) => (
            <figure key={src} className={merged ? 'moment-merged' : (!videoSrc ? 'moment-static' : '')} tabIndex={videoSrc ? '0' : undefined} onMouseEnter={playMoment} onMouseLeave={stopMoment} onFocus={playMoment} onBlur={stopMoment}>
              {videoSrc
                ? <video className="moment-cover-video" src={videoSrc} aria-label={label} preload="auto" muted playsInline />
                : <img src={src} alt={label} loading="lazy" />}
              {videoSrc && <span className="moment-cover-cta" aria-hidden="true">
                <b>Play video</b>
                <i><svg viewBox="0 0 16 16"><path d="M5.25 3.4 12.4 8l-7.15 4.6V3.4Z" /></svg></i>
              </span>}
              {videoSrc && <div className="moment-portrait-preview" aria-hidden="true">
                {videoSrc
                  ? <video src={videoSrc} loop playsInline preload="auto" />
                  : <img src={src} alt="" loading="lazy" />}
                {!videoSrc && <span className="moment-preview-play">▶</span>}
                <small>{number} / {label}</small>
              </div>}
              <figcaption>{number} / {label}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <style>{`
        .moment-portrait-preview{pointer-events:auto!important}
        .moments-list{height:100%;min-height:0}
        .moments-list figure{height:100%;min-height:0}
        .moments-list .moment-merged{grid-column:span 2;background:var(--accent);overflow:hidden}
        .moments-list .moment-merged>img{width:72%;height:100%;margin:auto;display:block;object-fit:contain;filter:brightness(0);transform:none!important}
        .moments-list .moment-merged figcaption{color:var(--bg)}
        .moments-list .moment-static>img{filter:none!important;transform:none!important}
        .moments-list figure::after{display:none!important}
        .moment-cover-cta{position:absolute;z-index:3;left:50%;top:50%;display:flex;flex-direction:column;align-items:center;gap:8px;transform:translate(-50%,-50%);pointer-events:none;transition:opacity .2s ease,transform .3s cubic-bezier(.22,.61,.36,1)}
        .moment-cover-cta b{font-family:var(--f-display);font-size:.54rem;font-style:normal;font-weight:700;line-height:1;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);text-shadow:0 0 16px rgba(202,219,46,.42);white-space:nowrap}
        .moment-cover-cta i{width:38px;height:38px;display:grid;place-items:center;border-radius:50%;background:var(--accent);box-shadow:0 0 0 1px rgba(202,219,46,.38),0 0 24px rgba(202,219,46,.34);transition:transform .28s cubic-bezier(.22,.61,.36,1),box-shadow .28s ease}
        .moment-cover-cta svg{width:15px;height:15px;fill:var(--bg);transform:translateX(1px)}
        .moments-list figure:hover .moment-cover-cta,.moments-list figure:focus-visible .moment-cover-cta{opacity:0;transform:translate(-50%,-42%) scale(.92)}
        .moments-list .moment-cover-cta{z-index:6!important;display:flex!important;opacity:1!important;visibility:visible!important;top:48%!important;gap:10px!important}
        .moments-list .moment-cover-cta b{padding:7px 11px;border:1px solid rgba(202,219,46,.48);border-radius:999px;background:rgba(8,10,8,.78);color:var(--accent)!important;box-shadow:0 0 20px rgba(202,219,46,.12);backdrop-filter:blur(8px)}
        .moments-list .moment-cover-cta i{width:46px!important;height:46px!important;box-shadow:0 0 0 1px var(--accent),0 0 32px rgba(202,219,46,.58)!important}
        .moments-list figure>.moment-cover-video{position:absolute;inset:0;width:100%;height:100%;display:block;object-fit:cover;filter:grayscale(1) brightness(.62);transition:filter .35s}
        .moments-list figure:hover>.moment-cover-video,.moments-list figure:focus-visible>.moment-cover-video{filter:grayscale(0) brightness(.72)}
        .moment-portrait-preview video{width:100%;height:100%;display:block;object-fit:cover;filter:brightness(.86) contrast(1.04);transform:scale(1.015);transition:transform 1.8s cubic-bezier(.22,.61,.36,1)}
        .moments-list figure:hover .moment-portrait-preview video,.moments-list figure:focus-visible .moment-portrait-preview video{transform:scale(1)}
        @media(min-width:761px){
          .moment-portrait-preview{position:fixed!important;z-index:20!important;top:50%!important;right:clamp(92px,8vw,154px)!important;bottom:auto!important;left:auto!important;width:auto!important;height:min(78vh,760px)!important;aspect-ratio:9/16!important;transform:translateY(-46%) scale(.96)!important;transform-origin:center!important}
          .moments-list figure:hover .moment-portrait-preview,.moments-list figure:focus-visible .moment-portrait-preview{transform:translateY(-50%) scale(1)!important}
        }
        @media(max-width:760px){.moment-portrait-preview{display:none!important}}
        .about-screen{position:relative;display:flex;align-items:center;padding:clamp(28px,5.4vh,58px) clamp(28px,2.5vw,48px) clamp(118px,15.5vh,148px) var(--rail-width)!important;background:#1f211f;overflow:hidden;isolation:isolate}
        .about-photo{position:absolute;z-index:-4;inset:0 38% 0 0;background:url('/athlete-silhouette.webp') center/cover no-repeat;filter:grayscale(1) contrast(1.15);opacity:.32;transform:scale(1.04)}
        .about-screen::before{content:'';position:absolute;z-index:-3;inset:0;background:linear-gradient(90deg,rgba(31,33,31,.58) 0%,rgba(31,33,31,.82) 43%,#1f211f 67%),radial-gradient(circle at 25% 40%,rgba(202,219,46,.08),transparent 30%)}
        .about-grid{position:absolute;z-index:-2;inset:0;background-image:linear-gradient(rgba(231,233,234,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(231,233,234,.035) 1px,transparent 1px);background-size:72px 72px;mask-image:linear-gradient(90deg,#000,transparent 72%)}
        .about-bg-symbol{position:absolute;z-index:-1;left:-8%;bottom:5%;width:min(58vw,900px);opacity:.035;filter:drop-shadow(0 0 30px var(--accent));transform:rotate(-7deg);pointer-events:none}
        .about-scan{position:absolute;z-index:0;top:-20%;bottom:-20%;left:28%;width:1px;background:linear-gradient(transparent,rgba(202,219,46,.85),transparent);box-shadow:0 0 28px rgba(202,219,46,.5);transform:rotate(18deg);animation:aboutScan 7s ease-in-out infinite;pointer-events:none}
        .about-layout{width:100%;margin:0;padding-left:clamp(82px,8.5vw,164px);display:block;transform:translateY(clamp(-42px,-3.8vh,-20px))}
        .about-main-copy{width:min(1160px,80vw);max-width:100%}
        .about-label{display:flex;align-items:center;gap:15px;margin-bottom:27px;font-size:.72rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent)}
        .about-label::before{content:'';width:34px;height:1px;background:var(--accent)}
        .about-label span{font-size:.55rem;color:rgba(202,219,46,.68)}
        .about-main-copy h2{max-width:1120px;font-family:var(--f-display);font-size:clamp(3rem,min(4.75vw,8vh),5.3rem);font-weight:700;line-height:.91;letter-spacing:-.052em;text-transform:uppercase;color:var(--fg)}
        .about-main-copy h2 strong,.about-main-copy h2 span{display:block}.about-main-copy h2 strong{color:var(--accent);font-weight:700}.about-main-copy h2 span{margin-top:11px;color:var(--fg)}
        .about-intro{margin-top:27px;font-family:var(--f-display);font-size:clamp(1.05rem,1.28vw,1.34rem);font-weight:700;line-height:1.12;text-transform:uppercase;letter-spacing:.025em;color:var(--fg)}
        .about-description{max-width:735px;margin-top:14px;font-size:clamp(.88rem,.98vw,1.02rem);line-height:1.62;color:rgba(231,233,234,.68)}
        .about-main-copy h3{margin-top:30px;font-family:var(--f-display);font-size:clamp(1rem,1.25vw,1.28rem);font-weight:700;letter-spacing:.045em;text-transform:uppercase;color:var(--fg)}
        .service-cloud{display:flex;flex-direction:column;align-items:flex-start;gap:10px;margin-top:18px;max-width:1040px}
        .service-row{display:flex;flex-wrap:wrap;gap:10px}
        .service-chip{display:flex;align-items:center;gap:13px;min-height:52px;padding:10px 20px;border:1px solid rgba(231,233,234,.2);border-radius:999px;background:rgba(12,14,12,.3);backdrop-filter:blur(10px);font-size:clamp(.78rem,.92vw,.98rem);font-weight:600;color:rgba(231,233,234,.94);transition:background .25s,border-color .25s,color .25s,transform .25s}
        .service-chip i{width:27px;height:27px;display:grid;place-items:center;flex:0 0 27px;font-style:normal;color:var(--accent)}.service-chip i svg{width:100%;height:100%}
        .service-chip:hover{background:var(--accent);border-color:var(--accent);color:var(--bg);transform:translateY(-2px)}.service-chip:hover i{color:var(--bg)}
        .flow-poster{position:relative;width:100%;aspect-ratio:.76;max-height:610px;overflow:hidden;background:var(--accent);color:var(--bg);box-shadow:0 30px 80px rgba(0,0,0,.45);isolation:isolate}
        .poster-grain{position:absolute;inset:0;z-index:-1;background:url('/texture.webp') center/cover;mix-blend-mode:multiply;opacity:.18}
        .flow-poster::after{content:'';position:absolute;inset:0;border:1px solid rgba(31,33,31,.2)}
        .poster-top,.poster-bottom{position:absolute;left:22px;font-size:.5rem;font-weight:700;letter-spacing:.14em}.poster-top{top:20px}.poster-bottom{bottom:20px}
        .poster-logo{position:absolute;left:8%;top:15%;width:84%;filter:brightness(0) saturate(100%)}
        .poster-pulse{position:absolute;inset:34% 6% 28%;display:grid;place-items:center}.poster-pulse img{width:100%;filter:brightness(0);animation:posterBeat 2.2s cubic-bezier(.22,.61,.36,1) infinite}.poster-pulse span{position:absolute;width:28%;aspect-ratio:1;border:1px solid rgba(31,33,31,.45);border-radius:50%;animation:posterRing 2.2s ease-out infinite}
        .flow-poster p{position:absolute;left:22px;bottom:52px;font-family:var(--f-display);font-size:clamp(1.05rem,1.7vw,1.75rem);font-weight:700;line-height:.95;letter-spacing:-.035em;text-transform:uppercase}
        .moments-dock{position:absolute;left:var(--rail-width);right:0;bottom:0;height:clamp(142px,17.6vh,190px);display:grid;grid-template-columns:clamp(190px,12.5vw,240px) 1fr;background:#0d0e0d;border-top:1px solid rgba(202,219,46,.4);z-index:3}
        .moments-title{position:relative;overflow:hidden;background:var(--accent);border-right:1px solid rgba(31,33,31,.22);font-family:var(--f-display);text-transform:uppercase;color:var(--bg)}.moments-title::before{content:'MOMENTS';position:absolute;z-index:2;left:28px;top:36px;font-size:clamp(1.45rem,1.8vw,2rem);font-weight:700;line-height:1;letter-spacing:-.035em;color:var(--bg)}.moments-title::after{content:'FROM THE FIELD';position:absolute;z-index:2;left:30px;top:76px;font-size:.58rem;font-weight:700;letter-spacing:.14em;color:var(--bg)}
        .moments-list{display:grid;grid-template-columns:repeat(6,1fr);min-width:0;overflow:visible}.moments-list figure{position:relative;overflow:visible;border-right:1px solid rgba(231,233,234,.1);background:#151715;outline:none}.moments-list figure>img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) brightness(.62);transition:filter .35s}.moments-list figure::after{content:'▶';position:absolute;z-index:2;right:12px;top:12px;width:28px;height:28px;display:grid;place-items:center;border:1px solid rgba(231,233,234,.45);border-radius:50%;font-size:.48rem;color:var(--fg);opacity:.72;transition:background .25s,color .25s,border-color .25s}.moments-list figure:hover>img,.moments-list figure:focus-visible>img{filter:grayscale(0) brightness(.72)}.moments-list figure:hover::after,.moments-list figure:focus-visible::after{background:var(--accent);border-color:var(--accent);color:var(--bg)}.moments-list figcaption{position:absolute;z-index:2;left:12px;bottom:11px;font-size:.5rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--fg)}
        .moment-portrait-preview{position:absolute;z-index:8;left:0;bottom:0;width:100%;aspect-ratio:9/16;overflow:hidden;background:#0b0c0b;border:1px solid rgba(202,219,46,.7);box-shadow:0 -28px 80px rgba(0,0,0,.62),0 0 34px rgba(202,219,46,.1);opacity:0;visibility:hidden;transform:translateY(18px) scale(.96);transform-origin:bottom center;transition:opacity .24s ease,transform .38s cubic-bezier(.22,.61,.36,1),visibility 0s linear .38s;pointer-events:none}.moment-portrait-preview::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(8,9,8,.9),transparent 48%),linear-gradient(135deg,rgba(202,219,46,.1),transparent 42%)}.moment-portrait-preview img{width:100%;height:100%;object-fit:cover;filter:grayscale(.35) brightness(.78);transform:scale(1.04);transition:transform 1.8s cubic-bezier(.22,.61,.36,1),filter .35s}.moment-preview-play{position:absolute;z-index:2;left:50%;top:50%;width:46px;height:46px;display:grid;place-items:center;border-radius:50%;background:var(--accent);color:var(--bg);font-size:.7rem;transform:translate(-50%,-50%);box-shadow:0 0 28px rgba(202,219,46,.3)}.moment-portrait-preview small{position:absolute;z-index:2;left:14px;bottom:14px;font-size:.55rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--fg)}.moments-list figure:hover .moment-portrait-preview,.moments-list figure:focus-visible .moment-portrait-preview{opacity:1;visibility:visible;transform:none;transition-delay:0s}.moments-list figure:hover .moment-portrait-preview img,.moments-list figure:focus-visible .moment-portrait-preview img{transform:scale(1)}
        @keyframes posterBeat{0%,100%{transform:scale(1)}8%{transform:scale(1.04)}16%{transform:scale(1)}24%{transform:scale(1.025)}34%{transform:scale(1)}}@keyframes posterRing{0%{transform:scale(.35);opacity:.8}48%,100%{transform:scale(2.2);opacity:0}}@keyframes aboutScan{0%,100%{opacity:0;translate:-22vw 0}20%,70%{opacity:.7}80%{opacity:0;translate:48vw 0}}
        @media(min-width:1025px) and (max-height:820px){.about-layout{padding-left:clamp(56px,7vw,108px)}.about-label{margin-bottom:14px}.about-intro{margin-top:14px}.about-description{margin-top:8px;line-height:1.5}.about-main-copy h3{margin-top:16px;font-size:.9rem}.service-cloud{margin-top:10px;gap:7px}.service-row{gap:7px}.service-chip{min-height:43px;padding:7px 14px;font-size:.75rem}.service-chip i{width:22px;height:22px;flex-basis:22px}.moments-title::before{top:26px}.moments-title::after{top:62px}}
        @media(max-width:1100px){.about-screen{height:auto!important;min-height:100dvh;padding:96px 24px 212px!important}.about-layout{grid-template-columns:1fr .58fr;gap:28px;transform:translateY(-24px)}.about-main-copy h2{font-size:clamp(2.5rem,5.3vw,4rem)}.service-chip{min-height:38px}.moments-dock{left:0}}
        @media(max-width:760px){.about-screen{padding:96px 20px 0!important}.about-photo{inset:0;opacity:.18}.about-bg-symbol{width:110vw;left:-30%;bottom:40%;opacity:.025}.about-scan{display:none}.about-layout{grid-template-columns:1fr;gap:32px;transform:none}.about-description{font-size:.86rem}.flow-poster{max-width:430px;margin:auto}.moments-dock{position:relative;left:auto;right:auto;bottom:auto;width:calc(100% + 40px);height:150px;margin:42px -20px 0;grid-template-columns:130px 1fr}.moments-list{overflow-x:auto;display:flex}.moments-list figure{min-width:115px}}
      `}</style>
    </section>
  );
}

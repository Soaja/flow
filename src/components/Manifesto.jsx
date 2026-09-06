import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapIdle } from '../utils/useGsap';
gsap.registerPlugin(ScrollTrigger);

const services = [
  'Creative & Campaigns', 'Social-First Content', 'Athlete Communications',
  'Brand Partnerships', 'Digital Strategy', 'Commercial Activations', 'Community & Events',
];

const moments = [
  ['/athlete-run.webp', 'Run'], ['/athlete-shoe.webp', 'Detail'],
  ['/athlete-silhouette.webp', 'Motion'], ['/athlete-woman.webp', 'Athlete'],
  ['/athlete-parkour.webp', 'Culture'], ['/athlete-2.webp', 'Campaign'],
];

export default function Manifesto() {
  const sectionRef = useRef(null);
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
            {services.map((service, index) => (
              <span className="service-chip" key={service}><i>{String(index + 1).padStart(2, '0')}</i>{service}</span>
            ))}
          </div>
        </div>

      </div>

      <div className="moments-dock">
        <div className="moments-title" aria-label="Moments from the field" />
        <div className="moments-list">
          {moments.map(([src, label], index) => (
            <figure key={src}><img src={src} alt={label} loading="lazy" /><figcaption>0{index + 1} / {label}</figcaption></figure>
          ))}
        </div>
      </div>

      <style>{`
        .about-screen{position:relative;display:flex;align-items:center;padding:58px 48px 148px 140px!important;background:#1f211f;overflow:hidden;isolation:isolate}
        .about-photo{position:absolute;z-index:-4;inset:0 38% 0 0;background:url('/athlete-silhouette.webp') center/cover no-repeat;filter:grayscale(1) contrast(1.15);opacity:.32;transform:scale(1.04)}
        .about-screen::before{content:'';position:absolute;z-index:-3;inset:0;background:linear-gradient(90deg,rgba(31,33,31,.58) 0%,rgba(31,33,31,.82) 43%,#1f211f 67%),radial-gradient(circle at 25% 40%,rgba(202,219,46,.08),transparent 30%)}
        .about-grid{position:absolute;z-index:-2;inset:0;background-image:linear-gradient(rgba(231,233,234,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(231,233,234,.035) 1px,transparent 1px);background-size:72px 72px;mask-image:linear-gradient(90deg,#000,transparent 72%)}
        .about-bg-symbol{position:absolute;z-index:-1;left:-8%;bottom:5%;width:min(58vw,900px);opacity:.035;filter:drop-shadow(0 0 30px var(--accent));transform:rotate(-7deg);pointer-events:none}
        .about-scan{position:absolute;z-index:0;top:-20%;bottom:-20%;left:28%;width:1px;background:linear-gradient(transparent,rgba(202,219,46,.85),transparent);box-shadow:0 0 28px rgba(202,219,46,.5);transform:rotate(18deg);animation:aboutScan 7s ease-in-out infinite;pointer-events:none}
        .about-layout{width:min(1240px,100%);margin:auto;display:block;transform:translateY(-38px)}
        .about-main-copy{max-width:1080px}
        .about-label{display:flex;align-items:center;gap:14px;margin-bottom:24px;font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent)}
        .about-label::before{content:'';width:34px;height:1px;background:var(--accent)}
        .about-label span{font-size:.55rem;color:rgba(202,219,46,.68)}
        .about-main-copy h2{max-width:1040px;font-family:var(--f-display);font-size:clamp(2.65rem,4.15vw,4.65rem);font-weight:700;line-height:.94;letter-spacing:-.045em;text-transform:uppercase;color:var(--fg)}
        .about-main-copy h2 strong,.about-main-copy h2 span{display:block}.about-main-copy h2 strong{color:var(--accent);font-weight:700}.about-main-copy h2 span{margin-top:8px;color:var(--fg)}
        .about-intro{margin-top:24px;font-family:var(--f-display);font-size:clamp(.96rem,1.15vw,1.18rem);font-weight:700;text-transform:uppercase;letter-spacing:.035em;color:var(--fg)}
        .about-description{max-width:680px;margin-top:12px;font-size:clamp(.8rem,.88vw,.92rem);line-height:1.68;color:rgba(231,233,234,.64)}
        .about-main-copy h3{margin-top:26px;font-family:var(--f-display);font-size:.76rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(231,233,234,.86)}
        .service-cloud{display:flex;flex-wrap:wrap;gap:9px;margin-top:15px;max-width:980px}
        .service-chip{display:flex;align-items:center;gap:10px;min-height:40px;padding:8px 15px;border:1px solid rgba(231,233,234,.15);border-radius:999px;background:rgba(12,14,12,.18);backdrop-filter:blur(10px);font-size:clamp(.67rem,.76vw,.78rem);font-weight:600;color:rgba(231,233,234,.88);transition:background .25s,border-color .25s,color .25s,transform .25s}
        .service-chip i{font-style:normal;font-size:.52rem;letter-spacing:.05em;color:var(--accent)}
        .service-chip:hover{background:var(--accent);border-color:var(--accent);color:var(--bg);transform:translateY(-2px)}.service-chip:hover i{color:var(--bg)}
        .flow-poster{position:relative;width:100%;aspect-ratio:.76;max-height:610px;overflow:hidden;background:var(--accent);color:var(--bg);box-shadow:0 30px 80px rgba(0,0,0,.45);isolation:isolate}
        .poster-grain{position:absolute;inset:0;z-index:-1;background:url('/texture.webp') center/cover;mix-blend-mode:multiply;opacity:.18}
        .flow-poster::after{content:'';position:absolute;inset:0;border:1px solid rgba(31,33,31,.2)}
        .poster-top,.poster-bottom{position:absolute;left:22px;font-size:.5rem;font-weight:700;letter-spacing:.14em}.poster-top{top:20px}.poster-bottom{bottom:20px}
        .poster-logo{position:absolute;left:8%;top:15%;width:84%;filter:brightness(0) saturate(100%)}
        .poster-pulse{position:absolute;inset:34% 6% 28%;display:grid;place-items:center}.poster-pulse img{width:100%;filter:brightness(0);animation:posterBeat 2.2s cubic-bezier(.22,.61,.36,1) infinite}.poster-pulse span{position:absolute;width:28%;aspect-ratio:1;border:1px solid rgba(31,33,31,.45);border-radius:50%;animation:posterRing 2.2s ease-out infinite}
        .flow-poster p{position:absolute;left:22px;bottom:52px;font-family:var(--f-display);font-size:clamp(1.05rem,1.7vw,1.75rem);font-weight:700;line-height:.95;letter-spacing:-.035em;text-transform:uppercase}
        .moments-dock{position:absolute;left:var(--rail-width);right:0;bottom:0;height:190px;display:grid;grid-template-columns:240px 1fr;background:#0d0e0d;border-top:1px solid rgba(202,219,46,.4);z-index:3}
        .moments-title{position:relative;overflow:hidden;background:var(--accent);border-right:1px solid rgba(31,33,31,.22);font-family:var(--f-display);text-transform:uppercase;color:var(--bg)}.moments-title::before{content:'MOMENTS';position:absolute;z-index:2;left:28px;top:36px;font-size:clamp(1.45rem,1.8vw,2rem);font-weight:700;line-height:1;letter-spacing:-.035em;color:var(--bg)}.moments-title::after{content:'FROM THE FIELD';position:absolute;z-index:2;left:30px;top:76px;font-size:.58rem;font-weight:700;letter-spacing:.14em;color:var(--bg)}
        .moments-list{display:grid;grid-template-columns:repeat(6,1fr);min-width:0}.moments-list figure{position:relative;overflow:hidden;border-right:1px solid rgba(231,233,234,.1);background:#151715}.moments-list figure::after{content:'▶';position:absolute;right:12px;top:12px;width:28px;height:28px;display:grid;place-items:center;border:1px solid rgba(231,233,234,.45);border-radius:50%;font-size:.48rem;color:var(--fg);opacity:.72;transition:background .25s,color .25s,border-color .25s}.moments-list img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) brightness(.62);transition:transform .45s,filter .35s}.moments-list figure:hover img{transform:scale(1.08);filter:grayscale(0) brightness(.85)}.moments-list figure:hover::after{background:var(--accent);border-color:var(--accent);color:var(--bg)}.moments-list figcaption{position:absolute;left:12px;bottom:11px;font-size:.5rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--fg)}
        @keyframes posterBeat{0%,100%{transform:scale(1)}8%{transform:scale(1.04)}16%{transform:scale(1)}24%{transform:scale(1.025)}34%{transform:scale(1)}}@keyframes posterRing{0%{transform:scale(.35);opacity:.8}48%,100%{transform:scale(2.2);opacity:0}}@keyframes aboutScan{0%,100%{opacity:0;translate:-22vw 0}20%,70%{opacity:.7}80%{opacity:0;translate:48vw 0}}
        @media(max-width:1100px){.about-screen{height:auto!important;min-height:100dvh;padding:96px 24px 212px!important}.about-layout{grid-template-columns:1fr .58fr;gap:28px;transform:translateY(-24px)}.about-main-copy h2{font-size:clamp(2.5rem,5.3vw,4rem)}.service-chip{min-height:38px}.moments-dock{left:0}}
        @media(max-width:760px){.about-screen{padding:96px 20px 0!important}.about-photo{inset:0;opacity:.18}.about-bg-symbol{width:110vw;left:-30%;bottom:40%;opacity:.025}.about-scan{display:none}.about-layout{grid-template-columns:1fr;gap:32px;transform:none}.about-description{font-size:.86rem}.flow-poster{max-width:430px;margin:auto}.moments-dock{position:relative;left:auto;right:auto;bottom:auto;width:calc(100% + 40px);height:150px;margin:42px -20px 0;grid-template-columns:130px 1fr}.moments-list{overflow-x:auto;display:flex}.moments-list figure{min-width:115px}}
      `}</style>
    </section>
  );
}

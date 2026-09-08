import { useEffect, useState } from 'react';

export default function Loader({ onComplete }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    const revealDelay = reducedMotion ? 300 : (mobile ? 680 : 1850);
    const exitDuration = reducedMotion ? 160 : (mobile ? 320 : 650);
    let completeTimer;
    const revealTimer = setTimeout(() => {
      setExiting(true);
      completeTimer = setTimeout(onComplete, exitDuration);
    }, revealDelay);
    return () => {
      clearTimeout(revealTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`flow-loader${exiting ? ' is-exiting' : ''}`} role="status" aria-label="Loading FLOW">
      <div className="loader-grid" aria-hidden="true" />
      <div className="loader-glow" aria-hidden="true" />
      <div className="loader-meta loader-meta-left"><span>00</span> Loading</div>
      <div className="loader-meta loader-meta-right">Belgrade — Europe — Worldwide</div>

      <div className="loader-signal" aria-hidden="true">
        <img src="/flow-symbol.svg" alt="" />
        <i />
      </div>

      <div className="loader-identity">
        <span className="loader-logo-frame">
          <img src="/flow-logo.svg" alt="FLOW" width="1920" height="452" />
        </span>
        <p>Future communication of sports.</p>
      </div>

      <div className="loader-progress" aria-hidden="true"><i /></div>
      <div className="loader-index" aria-hidden="true"><span>F</span><span>L</span><span>O</span><span>W</span></div>

      <style>{`
        .flow-loader{position:fixed;z-index:9999;inset:0;overflow:hidden;background:#191b19;color:#e7e9e8;isolation:isolate;contain:strict;transform:translate3d(0,0,0);backface-visibility:hidden;will-change:transform,opacity;transition:transform .62s cubic-bezier(.76,0,.24,1),opacity .42s ease,visibility 0s linear .62s}
        .flow-loader.is-exiting{transform:translate3d(0,-100%,0);opacity:.98;visibility:hidden}
        .loader-grid{position:absolute;z-index:-2;inset:0;background-image:linear-gradient(rgba(231,233,234,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(231,233,234,.028) 1px,transparent 1px);background-size:clamp(54px,5vw,86px) clamp(54px,5vw,86px);mask-image:radial-gradient(circle at center,#000,transparent 78%)}
        .loader-glow{position:absolute;z-index:-1;left:50%;top:50%;width:min(72vw,1100px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(202,219,46,.1),rgba(202,219,46,.02) 38%,transparent 68%);transform:translate3d(-50%,-50%,0);will-change:transform,opacity;animation:loaderGlow 1.5s cubic-bezier(.22,.61,.36,1) both}
        .loader-meta{position:absolute;top:clamp(26px,4vw,54px);font-family:var(--f-display);font-size:clamp(.52rem,.58vw,.66rem);font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(231,233,234,.48);opacity:0;animation:loaderMeta .5s ease .2s forwards}.loader-meta-left{left:clamp(24px,3vw,58px)}.loader-meta-left span{margin-right:11px;color:var(--accent)}.loader-meta-right{right:clamp(24px,3vw,58px)}
        .loader-signal{position:absolute;z-index:0;inset:-16% -12%;display:grid;place-items:center;overflow:hidden;opacity:.17;transform:translate3d(0,0,0)}.loader-signal img{width:124%;height:124%;max-width:none;object-fit:contain;opacity:0;transform:translate3d(-1.5%,0,0) scale(.985);will-change:transform,opacity;animation:loaderSignal 1.25s cubic-bezier(.22,.61,.36,1) .08s forwards}.loader-signal i{position:absolute;top:7%;bottom:7%;left:50%;width:1px;background:linear-gradient(transparent,rgba(202,219,46,.3),var(--accent),rgba(202,219,46,.3),transparent);box-shadow:0 0 14px rgba(202,219,46,.55);opacity:0;transform:translate3d(-115vw,0,0);will-change:transform,opacity;animation:loaderScan 1.3s cubic-bezier(.55,0,.18,1) .08s forwards}
        .loader-identity{position:absolute;z-index:2;left:50%;top:50%;width:min(420px,64vw);text-align:center;transform:translate(-50%,-50%)}
        .loader-logo-frame{display:block;overflow:hidden}.loader-logo-frame img{display:block;width:100%;height:auto;opacity:0;transform:translateY(108%);filter:drop-shadow(0 0 26px rgba(202,219,46,.16));animation:loaderLogo .72s cubic-bezier(.22,.61,.36,1) .34s forwards}
        .loader-identity p{margin-top:19px;font-family:var(--f-body);font-size:clamp(.56rem,.66vw,.72rem);font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:rgba(231,233,234,.57);opacity:0;transform:translateY(8px);animation:loaderTag .5s ease .76s forwards}
        .loader-progress{position:absolute;z-index:3;left:clamp(24px,3vw,58px);right:clamp(24px,3vw,58px);bottom:clamp(28px,4vw,56px);height:1px;background:rgba(231,233,234,.1);overflow:hidden}.loader-progress i{display:block;width:100%;height:100%;background:var(--accent);transform:scaleX(0);transform-origin:left;box-shadow:0 0 14px rgba(202,219,46,.65);animation:loaderProgress 1.65s cubic-bezier(.22,.61,.36,1) .12s forwards}
        .loader-index{position:absolute;right:clamp(24px,3vw,58px);bottom:calc(clamp(28px,4vw,56px) + 14px);display:flex;gap:9px;font-family:var(--f-display);font-size:.5rem;font-weight:700;letter-spacing:.08em;color:rgba(231,233,234,.25)}.loader-index span{animation:indexFlash 1.2s ease both}.loader-index span:nth-child(2){animation-delay:.12s}.loader-index span:nth-child(3){animation-delay:.24s;color:var(--accent)}.loader-index span:nth-child(4){animation-delay:.36s}
        @keyframes loaderSignal{0%{opacity:0;transform:translate3d(-1.5%,0,0) scale(.985)}22%{opacity:.42}100%{opacity:1;transform:translate3d(0,0,0) scale(1)}}
        @keyframes loaderScan{0%,5%{opacity:0;transform:translate3d(-115vw,0,0)}12%{opacity:1}82%{opacity:1;transform:translate3d(115vw,0,0)}100%{opacity:0;transform:translate3d(115vw,0,0)}}
        @keyframes loaderLogo{to{opacity:1;transform:none}}
        @keyframes loaderTag{to{opacity:1;transform:none}}
        @keyframes loaderProgress{to{transform:scaleX(1)}}
        @keyframes loaderMeta{to{opacity:1}}
        @keyframes loaderGlow{0%{opacity:0;transform:translate3d(-50%,-50%,0) scale(.8)}100%{opacity:1;transform:translate3d(-50%,-50%,0) scale(1)}}
        @keyframes indexFlash{0%,100%{opacity:.28}45%{opacity:1;color:var(--accent)}}
        @media(max-width:700px){.loader-meta-right{display:none}.loader-signal{inset:-3% -70%;opacity:.14}.loader-identity{width:min(300px,62vw)}}
        @media(prefers-reduced-motion:reduce){.flow-loader{transition-duration:.18s}.loader-signal img,.loader-signal i,.loader-glow,.loader-logo-frame img,.loader-identity p,.loader-progress i,.loader-meta,.loader-index span{animation:none!important;opacity:1;transform:none;clip-path:none}.loader-signal i{display:none}}
      `}</style>
    </div>
  );
}

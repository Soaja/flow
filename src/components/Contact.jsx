import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const submit = event => {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="contact-scene">
      <div className="contact-brush brush-one" aria-hidden="true" />
      <div className="contact-brush brush-two" aria-hidden="true" />

      <div className="contact-layout">
        <div className="contact-map-side">
          <h2>Let&rsquo;s move<br />sport forward.</h2>
          <div className="world-map">
            <img src="/world-map.svg" alt="World map showing FLOW in Belgrade" />
            <div className="belgrade-marker">
              <span className="marker-ring ring-one" /><span className="marker-ring ring-two" />
              <i /><strong>Belgrade</strong><small>44.8° N / 20.5° E</small>
            </div>
          </div>
        </div>

        <form className="contact-card" onSubmit={submit}>
          <div className="contact-card-top"><span>Start a project</span><span>FLOW / 2026</span></div>
          <div className="field-row">
            <label>Name<input name="name" autoComplete="name" placeholder="Your name" required /></label>
            <label>Email<input name="email" type="email" autoComplete="email" placeholder="your@email.com" required /></label>
          </div>
          <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="+381" /></label>
          <label>Inquiry type
            <select name="inquiry" defaultValue="" required>
              <option value="" disabled>Select department</option>
              <option>Creative & Campaigns</option><option>Social-First Content</option>
              <option>Athlete Communications</option><option>Brand Partnerships</option><option>Other</option>
            </select>
          </label>
          <label>Message<textarea name="message" placeholder="Tell us what you’re working on..." required /></label>
          <button type="submit" className={sent ? 'sent' : ''}>{sent ? 'Message sent' : 'Send inquiry'}<span>↗</span></button>
        </form>
      </div>

      <footer className="contact-footer">
        <div className="footer-address"><img src="/flow-logo.svg" alt="FLOW" /><span>Belgrade, Serbia</span><a href="mailto:hello@flowsport.co">hello@flowsport.co</a></div>
        <div className="footer-links"><a href="#hero">Home</a><a href="#manifesto">About us</a><a href="#media">Our work</a><a href="#contact">Contact</a></div>
        <div className="footer-legal"><span>© 2026 FLOW</span><a href="#">Privacy</a><a href="#">Terms</a></div>
      </footer>

      <style>{`
        .contact-scene{position:relative;display:flex;flex-direction:column;justify-content:center;padding:clamp(24px,5vh,54px) clamp(34px,3.75vw,72px) calc(clamp(74px,8.5vh,92px) + 24px) var(--rail-width)!important;background:#090a09;overflow:hidden;isolation:isolate}
        .contact-scene::before{content:'';position:absolute;z-index:-2;inset:0;background:radial-gradient(circle at 24% 48%,rgba(202,219,46,.07),transparent 34%),linear-gradient(120deg,#090a09,#141614 58%,#090a09)}
        .contact-brush{position:absolute;z-index:-1;width:44vw;height:110px;background:var(--accent);opacity:.1;filter:blur(1px);transform:rotate(-28deg) skewX(-24deg)}.brush-one{right:-12%;top:8%}.brush-two{right:8%;bottom:12%;opacity:.07}
        .contact-layout{width:100%;margin:0;padding-left:clamp(36px,4vw,76px);display:grid;grid-template-columns:minmax(0,1.15fr) minmax(390px,.85fr);gap:clamp(32px,3.5vw,68px);align-items:center}
        .contact-map-side{position:relative;z-index:2;min-width:0}.contact-map-side h2{position:relative;z-index:3}
        .contact-map-side h2{font-family:var(--f-display);font-size:clamp(2.8rem,min(4.8vw,8.5vh),5.8rem);font-weight:700;line-height:.88;letter-spacing:-.055em;text-transform:uppercase;color:var(--fg)}
        .world-map{position:relative;z-index:1;width:160%;margin-top:clamp(6px,1vh,14px);margin-left:-36%;mask-image:radial-gradient(ellipse 70% 72% at 55% 46%,#000 64%,transparent 100%)}.world-map>img{width:100%;height:auto;display:block;background:transparent;filter:brightness(.72) contrast(1.62) drop-shadow(0 0 20px rgba(202,219,46,.1));opacity:1}
        .belgrade-marker{position:absolute;left:52.35%;top:21.55%;width:14px;height:14px}.belgrade-marker i{position:absolute;inset:0;border-radius:50%;background:var(--accent);box-shadow:0 0 24px 8px rgba(202,219,46,.35)}.marker-ring{position:absolute;left:50%;top:50%;width:42px;height:42px;border:1px solid var(--accent);border-radius:50%;transform:translate(-50%,-50%);animation:mapPulse 2.2s ease-out infinite}.ring-two{animation-delay:1.1s}.belgrade-marker strong,.belgrade-marker small{position:absolute;left:23px;white-space:nowrap;text-transform:uppercase}.belgrade-marker strong{top:-5px;font-size:.65rem;letter-spacing:.12em;color:var(--fg)}.belgrade-marker small{top:13px;font-size:.46rem;letter-spacing:.08em;color:var(--accent)}
        .contact-card{position:relative;padding:30px 34px 32px;background:#f0f1ef;color:#1f211f;box-shadow:0 32px 90px rgba(0,0,0,.45)}.contact-card-top{display:flex;justify-content:space-between;margin-bottom:22px;padding-bottom:15px;border-bottom:1px solid rgba(31,33,31,.18);font-size:.58rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase}.field-row{display:grid;grid-template-columns:1fr 1fr;gap:22px}.contact-card label{display:block;margin-bottom:14px;font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.contact-card input,.contact-card select,.contact-card textarea{width:100%;margin-top:7px;padding:9px 0;background:transparent;border:0;border-bottom:1px solid rgba(31,33,31,.52);border-radius:0;outline:none;font-family:var(--f-body);font-size:.83rem;color:#1f211f}.contact-card input:focus,.contact-card select:focus,.contact-card textarea:focus{border-color:#809000}.contact-card textarea{height:76px;resize:none}.contact-card button{width:100%;min-height:48px;margin-top:4px;display:flex;align-items:center;justify-content:space-between;padding:0 18px;background:var(--accent);font-size:.67rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--bg);transition:background .25s}.contact-card button:hover{background:#d7e84a}.contact-card button.sent{background:#b8cc22}.contact-card button span{font-size:1rem}
        .contact-footer{position:absolute;left:var(--rail-width);right:0;bottom:0;height:clamp(74px,8.5vh,92px);display:grid;grid-template-columns:1.2fr 1fr .8fr;align-items:center;padding:0 clamp(28px,2.5vw,48px);background:#101210;border-top:1px solid rgba(231,233,234,.13);font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;color:var(--fg-muted)}.footer-address,.footer-links,.footer-legal{display:flex;align-items:center;gap:clamp(12px,1.05vw,20px)}.footer-address img{width:74px}.footer-address a,.footer-links a,.footer-legal a{transition:color .2s}.footer-address a:hover,.footer-links a:hover,.footer-legal a:hover{color:var(--accent)}.footer-links{justify-content:center}.footer-legal{justify-content:flex-end}
        @keyframes mapPulse{0%{opacity:.9;transform:translate(-50%,-50%) scale(.25)}80%,100%{opacity:0;transform:translate(-50%,-50%) scale(1.7)}}
        @media(min-width:1025px) and (max-height:820px){.contact-layout{padding-left:clamp(28px,3vw,52px);gap:28px}.world-map{width:148%;margin-top:4px;margin-left:-30%}.contact-card{padding:18px 24px 20px}.contact-card-top{margin-bottom:12px;padding-bottom:10px}.contact-card label{margin-bottom:8px}.contact-card input,.contact-card select,.contact-card textarea{margin-top:4px;padding:6px 0}.contact-card textarea{height:52px}.contact-card button{min-height:42px}.footer-address img{width:62px}}
        @media(max-width:1024px){.contact-scene{height:auto!important;min-height:100svh;padding:104px 20px 0!important;justify-content:flex-start}.contact-layout{padding:0;grid-template-columns:1fr;gap:32px}.contact-map-side h2{font-size:clamp(3.2rem,13vw,5.4rem);line-height:.88}.world-map{width:148%;max-width:none;margin:22px 0 0 -31%;mask-image:radial-gradient(ellipse 76% 76% at 55% 45%,#000 62%,transparent 100%)}.belgrade-marker strong{font-size:.58rem}.contact-card{padding:24px 20px 26px;box-shadow:0 22px 60px rgba(0,0,0,.38)}.contact-card input,.contact-card select,.contact-card textarea{min-height:44px;font-size:1rem}.contact-card textarea{height:104px}.contact-card button{min-height:52px}.contact-footer{position:relative;left:auto;right:auto;bottom:auto;width:calc(100% + 40px);height:auto;margin:40px -20px 0;padding:28px 20px calc(28px + env(safe-area-inset-bottom));grid-template-columns:1fr;gap:24px}.footer-links,.footer-legal{justify-content:flex-start;flex-wrap:wrap}.footer-address img{width:88px}}
        @media(max-width:520px){.field-row{grid-template-columns:1fr;gap:0}.contact-card-top span:last-child{display:none}.footer-address{align-items:flex-start;flex-direction:column;gap:10px}.contact-brush{display:none}}
      `}</style>
    </section>
  );
}

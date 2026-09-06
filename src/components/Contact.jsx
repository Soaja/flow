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
          <div className="contact-kicker"><span>04</span> Contact us</div>
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
        .contact-scene{position:relative;display:flex;flex-direction:column;justify-content:center;padding:54px 72px 116px 140px!important;background:#090a09;overflow:hidden;isolation:isolate}
        .contact-scene::before{content:'';position:absolute;z-index:-2;inset:0;background:radial-gradient(circle at 24% 48%,rgba(202,219,46,.07),transparent 34%),linear-gradient(120deg,#090a09,#141614 58%,#090a09)}
        .contact-brush{position:absolute;z-index:-1;width:44vw;height:110px;background:var(--accent);opacity:.1;filter:blur(1px);transform:rotate(-28deg) skewX(-24deg)}.brush-one{right:-12%;top:8%}.brush-two{right:8%;bottom:12%;opacity:.07}
        .contact-layout{width:min(1520px,100%);margin:auto;display:grid;grid-template-columns:1.2fr .8fr;gap:clamp(40px,4.5vw,76px);align-items:center}
        .contact-kicker{display:flex;align-items:center;gap:12px;margin-bottom:16px;font-size:.66rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--accent)}.contact-kicker span{display:grid;place-items:center;width:30px;height:30px;border:1px solid rgba(202,219,46,.45);border-radius:50%;font-size:.53rem}
        .contact-map-side h2{font-family:var(--f-display);font-size:clamp(2.8rem,4.8vw,5.8rem);font-weight:700;line-height:.88;letter-spacing:-.055em;text-transform:uppercase;color:var(--fg)}
        .world-map{position:relative;width:175%;margin-top:-24px;margin-left:-44%;mask-image:radial-gradient(ellipse 70% 72% at 55% 46%,#000 64%,transparent 100%)}.world-map>img{width:100%;height:auto;display:block;background:transparent;filter:brightness(.72) contrast(1.62) drop-shadow(0 0 20px rgba(202,219,46,.1));opacity:1}
        .belgrade-marker{position:absolute;left:52.35%;top:21.55%;width:14px;height:14px}.belgrade-marker i{position:absolute;inset:0;border-radius:50%;background:var(--accent);box-shadow:0 0 24px 8px rgba(202,219,46,.35)}.marker-ring{position:absolute;left:50%;top:50%;width:42px;height:42px;border:1px solid var(--accent);border-radius:50%;transform:translate(-50%,-50%);animation:mapPulse 2.2s ease-out infinite}.ring-two{animation-delay:1.1s}.belgrade-marker strong,.belgrade-marker small{position:absolute;left:23px;white-space:nowrap;text-transform:uppercase}.belgrade-marker strong{top:-5px;font-size:.65rem;letter-spacing:.12em;color:var(--fg)}.belgrade-marker small{top:13px;font-size:.46rem;letter-spacing:.08em;color:var(--accent)}
        .contact-card{position:relative;padding:30px 34px 32px;background:#f0f1ef;color:#1f211f;box-shadow:0 32px 90px rgba(0,0,0,.45)}.contact-card-top{display:flex;justify-content:space-between;margin-bottom:22px;padding-bottom:15px;border-bottom:1px solid rgba(31,33,31,.18);font-size:.58rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase}.field-row{display:grid;grid-template-columns:1fr 1fr;gap:22px}.contact-card label{display:block;margin-bottom:14px;font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}.contact-card input,.contact-card select,.contact-card textarea{width:100%;margin-top:7px;padding:9px 0;background:transparent;border:0;border-bottom:1px solid rgba(31,33,31,.52);border-radius:0;outline:none;font-family:var(--f-body);font-size:.83rem;color:#1f211f}.contact-card input:focus,.contact-card select:focus,.contact-card textarea:focus{border-color:#809000}.contact-card textarea{height:76px;resize:none}.contact-card button{width:100%;min-height:48px;margin-top:4px;display:flex;align-items:center;justify-content:space-between;padding:0 18px;background:var(--accent);font-size:.67rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--bg);transition:background .25s}.contact-card button:hover{background:#d7e84a}.contact-card button.sent{background:#b8cc22}.contact-card button span{font-size:1rem}
        .contact-footer{position:absolute;left:var(--rail-width);right:0;bottom:0;height:92px;display:grid;grid-template-columns:1.2fr 1fr .8fr;align-items:center;padding:0 48px;background:#101210;border-top:1px solid rgba(231,233,234,.13);font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;color:var(--fg-muted)}.footer-address,.footer-links,.footer-legal{display:flex;align-items:center;gap:20px}.footer-address img{width:74px}.footer-address a,.footer-links a,.footer-legal a{transition:color .2s}.footer-address a:hover,.footer-links a:hover,.footer-legal a:hover{color:var(--accent)}.footer-links{justify-content:center}.footer-legal{justify-content:flex-end}
        @keyframes mapPulse{0%{opacity:.9;transform:translate(-50%,-50%) scale(.25)}80%,100%{opacity:0;transform:translate(-50%,-50%) scale(1.7)}}
        @media(max-width:1024px){.contact-scene{height:auto!important;min-height:100dvh;padding:94px 24px 0!important}.contact-layout{grid-template-columns:1fr;gap:36px}.contact-map-side h2{font-size:clamp(3rem,11vw,5rem)}.world-map{max-width:720px}.contact-card{padding:26px 24px}.contact-footer{position:relative;left:auto;right:auto;bottom:auto;width:calc(100% + 48px);height:auto;margin:48px -24px 0;padding:30px 24px;grid-template-columns:1fr;gap:24px}.footer-links,.footer-legal{justify-content:flex-start;flex-wrap:wrap}}
        @media(max-width:520px){.field-row{grid-template-columns:1fr;gap:0}.contact-card-top span:last-child{display:none}.footer-address{align-items:flex-start;flex-direction:column;gap:10px}}
      `}</style>
    </section>
  );
}

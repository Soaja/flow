import { useState } from 'react';

export default function Newsletter() {
  const [done, setDone] = useState(false);

  const submit = e => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <section id="newsletter" style={{ padding: '120px 0', background: '#272827', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="nl-grid">
          <div>
            <p style={{ fontSize: '.7rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Stay in the loop</p>
            <h2 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 700, letterSpacing: '-.03em', textTransform: 'uppercase', lineHeight: 1.05 }}>
              Sport is moving fast.<br /><span style={{ color: 'var(--accent)' }}>Don't get left behind.</span>
            </h2>
            <p style={{ fontSize: '.95rem', lineHeight: 1.65, color: 'var(--fg-muted)', marginTop: 16 }}>
              Inside sports marketing, media and athlete culture across the Balkans. No corporate filler. Straight signal.
            </p>
          </div>
          <div>
            <form onSubmit={submit} style={{ display: 'flex' }} noValidate>
              <input
                type="email" placeholder="your@email.com"
                required aria-label="Email address"
                className="form-input"
                style={{ borderRight: 'none', borderRadius: '4px 0 0 4px', flex: 1 }}
              />
              <button type="submit" className={`nl-btn${done ? ' sent' : ''}`}>
                {done ? '✓ Subscribed' : 'Subscribe'}
              </button>
            </form>
            <p style={{ fontSize: '.75rem', color: 'var(--fg-muted)', marginTop: 12 }}>
              Weekly drops. Unsubscribe anytime. Available in SR / EN.
            </p>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.nl-grid{grid-template-columns:1fr !important;gap:40px !important}}`}</style>
    </section>
  );
}

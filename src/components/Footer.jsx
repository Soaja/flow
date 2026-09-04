const socials = ['IG','TT','YT','X','LI'];
const cols = [
  { title: 'Divisions',  links: [['#divisions','FLOW Agency'],['#media','FLOW Media'],['#athletes','FLOW Management']] },
  { title: 'Company',    links: [['#manifesto','About FLOW'],['#media','Our Work'],['#partners','Partners'],['#contact','Contact']] },
  { title: 'Connect',    links: [['#','Press'],['#','Careers']] },
];
const partners = ['Nike','Jordan','KK Partizan','FK Vojvodina','SportVision','Arena Sport'];

export default function Footer() {
  return (
    <footer style={{ padding: '80px 0 40px' }}>
      <div className="container">

        {/* Partners strip */}
        <div id="partners" style={{ padding: '60px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: 64 }}>
          <p style={{ fontSize: '.7rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--fg-muted)', textAlign: 'center', marginBottom: 40 }}>
            Trusted by · Worked with
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 56, flexWrap: 'wrap' }}>
            {partners.map(p => (
              <span key={p} className="partner-logo">{p}</span>
            ))}
          </div>
        </div>

        {/* Footer grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 56, paddingBottom: 48, borderBottom: '1px solid var(--border)', marginBottom: 32 }} className="footer-grid">
          <div className="footer-brand">
            <div style={{ fontFamily: 'var(--f-display)', fontSize: '2rem', fontWeight: 700, letterSpacing: '-.02em', marginBottom: 14 }}>
              FL<span style={{ color: 'var(--accent)' }}>O</span>W
            </div>
            <p style={{ fontSize: '.85rem', lineHeight: 1.6, color: 'var(--fg-muted)', marginBottom: 28, maxWidth: 260 }}>
              Sport. Redefined. Belgrade-based. Balkan-built. Built for the global game.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map(s => (
                <a key={s} href="#" aria-label={`FLOW on ${s}`} className="social-link">{s}</a>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <p style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 20 }}>{col.title}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(([href, label]) => (
                  <li key={label}>
                    <a href={href} className="footer-link">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: '.78rem', color: 'var(--fg-muted)' }}>© 2025 FLOW Sport d.o.o. — Belgrade, Serbia</p>
          <nav style={{ display: 'flex', gap: 24 }} aria-label="Legal">
            {['Privacy Policy','Terms of Use','Cookie Policy'].map(l => (
              <a key={l} href="#" className="footer-link" style={{ fontSize: '.78rem' }}>{l}</a>
            ))}
          </nav>
        </div>
      </div>

      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr !important;gap:32px !important}}`}</style>
    </footer>
  );
}

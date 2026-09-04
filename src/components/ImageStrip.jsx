
const images = [
  { src: '/hero-athlete.webp',      label: 'Campaign' },
  { src: '/athlete-run.webp',       label: 'Media' },
  { src: '/athlete-shoe.webp',      label: 'Brand' },
  { src: '/athlete-silhouette.webp',label: 'Sport' },
  { src: '/athlete-woman.webp',     label: 'Athlete' },
  { src: '/athlete-parkour.webp',   label: 'Content' },
  // doubled for seamless loop
  { src: '/hero-athlete.webp',      label: 'Campaign' },
  { src: '/athlete-run.webp',       label: 'Media' },
  { src: '/athlete-shoe.webp',      label: 'Brand' },
  { src: '/athlete-silhouette.webp',label: 'Sport' },
  { src: '/athlete-woman.webp',     label: 'Athlete' },
  { src: '/athlete-parkour.webp',   label: 'Content' },
];

export default function ImageStrip() {
  return (
    <section id="moments" className="moments-panel" style={{ overflow: 'hidden', padding: '80px 0', borderBottom: '1px solid var(--border)', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Label row */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <span style={{ fontSize: '.7rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>
          Moments from the field
        </span>
      </div>

      {/* Scrolling strip */}
      <div style={{ display: 'flex', width: 'max-content', animation: 'imgStrip 32s linear infinite', gap: 12 }}
        onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
        onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
      >
        {images.map((img, i) => (
          <div key={i} style={{
            position: 'relative', width: 320, height: 220,
            flexShrink: 0, overflow: 'hidden', cursor: 'pointer',
          }}
          onMouseEnter={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'; e.currentTarget.querySelector('img').style.filter = 'grayscale(0%)'; e.currentTarget.querySelector('.strip-label').style.opacity = '1'; }}
          onMouseLeave={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1)'; e.currentTarget.querySelector('img').style.filter = 'grayscale(30%)'; e.currentTarget.querySelector('.strip-label').style.opacity = '0'; }}
          >
            <img src={img.src} alt={img.label} loading="lazy" decoding="async" style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform .5s cubic-bezier(.22,.61,.36,1), filter .4s',
              filter: 'grayscale(30%)',
              display: 'block',
            }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(32,33,32,.3)' }} />
            <div className="strip-label" style={{
              position: 'absolute', bottom: 12, left: 16,
              fontSize: '.65rem', fontWeight: 600, letterSpacing: '.16em',
              textTransform: 'uppercase', color: 'var(--accent)',
              opacity: 0, transition: 'opacity .3s',
            }}>{img.label}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes imgStrip {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

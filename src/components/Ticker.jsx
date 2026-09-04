const items = [
  'FLOW Agency', 'FLOW Media', 'FLOW Management',
  'Belgrade', 'Balkans', 'Sport Forward',
  'Nike · Jordan Brand Heritage', 'Gen Z Sports',
];

export default function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div style={{ background: 'var(--accent)', overflow: 'hidden', padding: '12px 0' }} aria-hidden="true">
      <div style={{
        display: 'flex', width: 'max-content',
        animation: 'ticker 28s linear infinite',
      }}
      onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
      onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 20, padding: '0 36px',
            fontFamily: 'var(--f-display)', fontSize: '.78rem', fontWeight: 700,
            letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--bg)',
            whiteSpace: 'nowrap',
          }}>
            {item}
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--bg)', opacity: .35 }} />
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  );
}

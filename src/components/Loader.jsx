import { useEffect, useState } from 'react';

/* Pre-compute wave paths once at module load — no runtime cost */
function makePath(amp, freq, phase, w = 1000) {
  let d = '';
  for (let x = 0; x <= w; x += 7) {
    const y = 200 + amp * Math.sin(freq * x + phase);
    d += x === 0 ? `M${x},${y}` : ` L${x},${y}`;
  }
  return d;
}

const W1 = makePath(52, 0.018, 0);
const W2 = makePath(32, 0.014, Math.PI * 0.4);
const W3 = makePath(68, 0.011, Math.PI * 0.8);

export default function Loader({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 450);
    }, 1300);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#1f211f',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: visible ? 1 : 0,
      transition: 'opacity .5s cubic-bezier(.22,.61,.36,1)',
      pointerEvents: visible ? 'all' : 'none',
      overflow: 'hidden',
    }}>

      {/* Waves — draw-in via stroke-dashoffset */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 1000 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <path className="lw1" d={W1} stroke="#cadb2e" strokeWidth="2.5"  fill="none" opacity=".85" strokeDasharray="1300" strokeDashoffset="1300"/>
        <path className="lw2" d={W2} stroke="#cadb2e" strokeWidth="1.2"  fill="none" opacity=".4"  strokeDasharray="1150" strokeDashoffset="1150"/>
        <path className="lw3" d={W3} stroke="#cadb2e" strokeWidth="1.5"  fill="none" opacity=".2"  strokeDasharray="1400" strokeDashoffset="1400"/>
      </svg>

      {/* Logo + tagline */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div className="l-logo">
          <svg
            viewBox="0 0 1920 451.78"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: 'min(300px, 68vw)', display: 'block' }}
          >
            <path fill="#e6e7e7" d="M220.12,196.33h170.14c11.37,0,17.75,13.09,10.74,22.04l-30.62,39.16c-3.94,5.04-9.99,7.99-16.39,7.99h-133.88c-7.53,0-13.64,6.11-13.64,13.64v73.36c0,7.53-6.11,13.64-13.64,13.64h-59.52c-7.53,0-13.64-6.11-13.64-13.64V99.26c0-7.53,6.11-13.64,13.64-13.64h273.26c11.3,0,17.7,12.95,10.84,21.92l-31.84,41.66c-4.52,5.91-11.54,9.38-18.98,9.38h-146.47c-7.53,0-13.64,6.11-13.64,13.64v10.46c0,7.53,6.11,13.64,13.64,13.64Z"/>
            <path fill="#e6e7e7" d="M490.19,352.51V99.26c0-7.53,6.11-13.64,13.64-13.64h59.53c7.53,0,13.64,6.11,13.64,13.64v180.29c0,7.53,6.11,13.64,13.64,13.64h175.98c11.3,0,17.7,12.95,10.84,21.92l-31.57,41.3c-4.69,6.14-11.98,9.74-19.71,9.74h-222.34c-7.53,0-13.64-6.11-13.64-13.64Z"/>
            <path fill="#cadb2e" d="M1249.97,225.68c0,98.12-66.26,145.08-205.47,145.08s-204.63-46.54-204.63-145.08,65.42-144.67,204.63-144.67,205.47,46.54,205.47,144.67ZM926.25,225.68c0,57.03,25.16,72.12,118.25,72.12s118.67-15.1,118.67-72.12-24.32-71.71-118.67-71.71-118.25,15.1-118.25,71.71Z"/>
            <path fill="#e6e7e7" d="M1377.89,95.64l34.22,124.14c3.28,11.91,19.44,13.67,25.21,2.75l58.15-110.06c13-23.48,26.42-31.45,52.42-31.45s38.57,7.97,51.16,31.45l57.45,110.31c5.71,10.97,21.9,9.28,25.23-2.62l34.87-124.56c1.65-5.89,7.02-9.96,13.13-9.96h56.93c9.12,0,15.67,8.77,13.08,17.52l-67.77,228.63c-7.55,24.74-25.58,39-49.9,39-20.13,0-36.07-10.06-46.55-29.35l-77.31-147.74c-5.09-9.72-18.99-9.76-24.13-.07l-78.44,147.81c-10.48,19.29-26.42,29.35-46.96,29.35-24.32,0-42.35-14.26-49.48-39l-65.85-228.73c-2.51-8.72,4.03-17.41,13.11-17.41h58.29c6.14,0,11.52,4.1,13.15,10.01Z"/>
          </svg>
        </div>
        <p className="l-tag" style={{
          fontFamily: 'sans-serif', fontSize: 11, fontWeight: 600,
          letterSpacing: '0.24em', color: '#9a9b9a',
          textTransform: 'uppercase', marginTop: 18,
        }}>
          Sport. Redefined.
        </p>
      </div>

      <style>{`
        .lw1 { animation: waveDraw .9s cubic-bezier(.25,1,.5,1) .08s both; }
        .lw2 { animation: waveDraw .9s cubic-bezier(.25,1,.5,1) .18s both; }
        .lw3 { animation: waveDraw .9s cubic-bezier(.25,1,.5,1) .03s both; }
        @keyframes waveDraw { to { stroke-dashoffset: 0; } }

        .l-logo { opacity: 0; animation: lIn .6s cubic-bezier(.34,1.56,.64,1) .08s both; }
        .l-tag  { opacity: 0; animation: lTag .4s ease .32s both; }
        @keyframes lIn  { from { opacity:0; transform:scale(.88) translateY(16px); } to { opacity:1; transform:none; } }
        @keyframes lTag { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
      `}</style>
    </div>
  );
}

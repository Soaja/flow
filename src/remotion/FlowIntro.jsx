import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from 'remotion';

function buildWave(frame, amp, freq, phase) {
  const pts = [];
  for (let x = 0; x <= 800; x += 5) {
    const y = 200 + amp * Math.sin(freq * x + phase + frame * 0.07);
    pts.push(`${x},${y}`);
  }
  return `M ${pts.join(' L ')}`;
}

export default function FlowIntro() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({ frame, fps, config: { damping: 18, stiffness: 100 } });
  const tagIn  = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 18, stiffness: 90 } });
  const waveIn = interpolate(frame, [4, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#202120', overflow: 'hidden' }}>

      {/* Animated waves */}
      <svg
        style={{ position: 'absolute', inset: 0, opacity: waveIn }}
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d={buildWave(frame, 52, 0.018, 0)}                   stroke="#cadb2d" strokeWidth="2.5" fill="none" opacity=".85"/>
        <path d={buildWave(frame, 32, 0.014, Math.PI * .4)}        stroke="#cadb2d" strokeWidth="1.2" fill="none" opacity=".4"/>
        <path d={buildWave(frame, 68, 0.011, Math.PI * .8)}        stroke="#cadb2d" strokeWidth="1.5" fill="none" opacity=".18"/>
      </svg>

      {/* Logo + tagline centered */}
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        <div style={{
          opacity: logoIn,
          transform: `scale(${0.88 + 0.12 * logoIn}) translateY(${20 * (1 - logoIn)}px)`,
          width: 320,
        }}>
          <svg viewBox="0 0 1920 451.78" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#e6e7e7" d="M220.12,196.33h170.14c11.37,0,17.75,13.09,10.74,22.04l-30.62,39.16c-3.94,5.04-9.99,7.99-16.39,7.99h-133.88c-7.53,0-13.64,6.11-13.64,13.64v73.36c0,7.53-6.11,13.64-13.64,13.64h-59.52c-7.53,0-13.64-6.11-13.64-13.64V99.26c0-7.53,6.11-13.64,13.64-13.64h273.26c11.3,0,17.7,12.95,10.84,21.92l-31.84,41.66c-4.52,5.91-11.54,9.38-18.98,9.38h-146.47c-7.53,0-13.64,6.11-13.64,13.64v10.46c0,7.53,6.11,13.64,13.64,13.64Z"/>
            <path fill="#e6e7e7" d="M490.19,352.51V99.26c0-7.53,6.11-13.64,13.64-13.64h59.53c7.53,0,13.64,6.11,13.64,13.64v180.29c0,7.53,6.11,13.64,13.64,13.64h175.98c11.3,0,17.7,12.95,10.84,21.92l-31.57,41.3c-4.69,6.14-11.98,9.74-19.71,9.74h-222.34c-7.53,0-13.64-6.11-13.64-13.64Z"/>
            <path fill="#cadb2d" d="M1249.97,225.68c0,98.12-66.26,145.08-205.47,145.08s-204.63-46.54-204.63-145.08,65.42-144.67,204.63-144.67,205.47,46.54,205.47,144.67ZM926.25,225.68c0,57.03,25.16,72.12,118.25,72.12s118.67-15.1,118.67-72.12-24.32-71.71-118.67-71.71-118.25,15.1-118.25,71.71Z"/>
            <path fill="#e6e7e7" d="M1377.89,95.64l34.22,124.14c3.28,11.91,19.44,13.67,25.21,2.75l58.15-110.06c13-23.48,26.42-31.45,52.42-31.45s38.57,7.97,51.16,31.45l57.45,110.31c5.71,10.97,21.9,9.28,25.23-2.62l34.87-124.56c1.65-5.89,7.02-9.96,13.13-9.96h56.93c9.12,0,15.67,8.77,13.08,17.52l-67.77,228.63c-7.55,24.74-25.58,39-49.9,39-20.13,0-36.07-10.06-46.55-29.35l-77.31-147.74c-5.09-9.72-18.99-9.76-24.13-.07l-78.44,147.81c-10.48,19.29-26.42,29.35-46.96,29.35-24.32,0-42.35-14.26-49.48-39l-65.85-228.73c-2.51-8.72,4.03-17.41,13.11-17.41h58.29c6.14,0,11.52,4.1,13.15,10.01Z"/>
          </svg>
        </div>

        <div style={{
          opacity: tagIn,
          transform: `translateY(${10 * (1 - tagIn)}px)`,
          fontFamily: 'sans-serif', fontSize: 12, fontWeight: 600,
          letterSpacing: '0.24em', color: '#9a9b9a',
          textTransform: 'uppercase', marginTop: 20,
        }}>
          Sport. Redefined.
        </div>

      </AbsoluteFill>
    </AbsoluteFill>
  );
}

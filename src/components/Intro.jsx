import { useCallback, useState } from 'react';
import Loader from './Loader';

export default function Intro() {
  const [complete, setComplete] = useState(() => {
    try { return sessionStorage.getItem('flow-intro-seen') === 'true'; }
    catch { return false; }
  });
  const finish = useCallback(() => {
    try { sessionStorage.setItem('flow-intro-seen', 'true'); } catch { /* Optional storage. */ }
    setComplete(true);
  }, []);
  return complete ? null : <Loader onComplete={finish} />;
}

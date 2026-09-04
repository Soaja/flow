import { useEffect } from 'react';

/**
 * Defers GSAP setup until the browser has idle time.
 * Eliminates TBT from GSAP initialization on initial page load.
 * Falls back to setTimeout for browsers without requestIdleCallback.
 *
 * @param {() => (() => void) | void} setup  — return a cleanup fn or nothing
 * @param {any[]} deps
 */
export function useGsapIdle(setup, deps = []) {
  useEffect(() => {
    let cleanup;
    let id;

    const run = () => { cleanup = setup(); };

    if (typeof requestIdleCallback !== 'undefined') {
      id = requestIdleCallback(run, { timeout: 2000 });
    } else {
      id = setTimeout(run, 80);
    }

    return () => {
      if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(id);
      else clearTimeout(id);
      cleanup?.();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

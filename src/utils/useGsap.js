import { useEffect } from 'react';

/**
 * Defers GSAP setup until the browser has idle time.
 * Moves optional animation setup away from initial rendering.
 * Falls back to setTimeout for browsers without requestIdleCallback.
 *
 * @param {() => (() => void) | void} setup  — return a cleanup fn or nothing
 * @param {any[]} deps
 */
export function useGsapIdle(setup, deps = []) {
  useEffect(() => {
    let cleanup;
    let id;

    let cancelled = false;
    const run = async () => {
      try {
        const result = await setup();
        if (cancelled) result?.();
        else cleanup = result;
      } catch { /* Animation is optional; keep the rendered content available. */ }
    };

    if (typeof requestIdleCallback !== 'undefined') {
      id = requestIdleCallback(run, { timeout: 2000 });
    } else {
      id = setTimeout(run, 80);
    }

    return () => {
      cancelled = true;
      if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(id);
      else clearTimeout(id);
      cleanup?.();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

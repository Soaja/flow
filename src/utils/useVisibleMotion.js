import { useEffect } from 'react';

// Keep the same animation timeline, but stop spending frames off screen.
export function useVisibleMotion(ref) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let visible = true;
    const update = () => {
      const paused = !visible || document.hidden;
      element.toggleAttribute('data-motion-paused', paused);
      if (paused) element.querySelectorAll('video[data-preview]').forEach(video => video.pause());
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { rootMargin: '100px' });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      element.removeAttribute('data-motion-paused');
    };
  }, [ref]);
}

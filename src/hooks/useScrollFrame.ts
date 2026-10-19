import { useEffect, useRef } from 'react';

/**
 * Runs `onFrame` at most once per animation frame while the page scrolls or resizes,
 * plus once on mount. Keeps scroll work off the event handler.
 */
export function useScrollFrame(onFrame: () => void, deps: readonly unknown[] = []) {
  const cb = useRef(onFrame);
  cb.current = onFrame;

  useEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      cb.current();
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

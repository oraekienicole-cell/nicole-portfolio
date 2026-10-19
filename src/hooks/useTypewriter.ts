import { useEffect, useState } from 'react';

type Options = {
  /** Milliseconds per character. */
  speed?: number;
  /** Milliseconds before the first character appears. */
  startDelay?: number;
  /** Skip the animation and show the full text immediately. */
  instant?: boolean;
};

/**
 * Reveals `text` one character at a time.
 * Returns the visible slice and whether typing has finished.
 */
export function useTypewriter(text: string, { speed = 38, startDelay = 600, instant = false }: Options = {}) {
  const [count, setCount] = useState(instant ? text.length : 0);

  useEffect(() => {
    if (instant) {
      setCount(text.length);
      return;
    }

    setCount(0);
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((c) => {
          if (c + 1 >= text.length) window.clearInterval(interval);
          return Math.min(c + 1, text.length);
        });
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [text, speed, startDelay, instant]);

  return { displayed: text.slice(0, count), done: count >= text.length };
}

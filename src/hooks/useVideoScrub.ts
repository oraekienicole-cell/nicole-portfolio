import { useCallback, useEffect, useRef, type RefObject } from 'react';

type Options = {
  /** Fraction of the video's duration covered by a full-width mouse sweep. */
  sensitivity?: number;
  enabled?: boolean;
};

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/**
 * Scrubs a paused video forwards and backwards with horizontal mouse movement.
 *
 * Seeks are serialised: while one seek is in flight, further mouse movement only
 * updates `targetTime`. When the browser fires `seeked`, the next seek runs if the
 * target has moved — so fast mouse movement never floods the decoder.
 *
 * Attach the returned `onSeeked` to the <video> element.
 */
export function useVideoScrub(videoRef: RefObject<HTMLVideoElement | null>, { sensitivity = 0.8, enabled = true }: Options = {}) {
  const targetTime = useRef(0);
  const seeking = useRef(false);
  const seekStartedAt = useRef(0);

  const seekTo = useCallback(
    (video: HTMLVideoElement) => {
      seeking.current = true;
      seekStartedAt.current = performance.now();
      video.currentTime = targetTime.current;
    },
    [],
  );

  const onSeeked = useCallback(() => {
    const video = videoRef.current;
    seeking.current = false;
    if (!video) return;
    if (Math.abs(video.currentTime - targetTime.current) > 1 / 60) seekTo(video);
  }, [videoRef, seekTo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled) return;

    let prevX: number | null = null;
    targetTime.current = video.currentTime || 0;

    const onMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      if (prevX === null) {
        prevX = currentX;
        return;
      }
      const delta = currentX - prevX;
      prevX = currentX;

      const duration = video.duration;
      if (!duration || !Number.isFinite(duration)) return;

      const offset = (delta / window.innerWidth) * sensitivity * duration;
      targetTime.current = clamp(targetTime.current + offset, 0, duration);

      // A seek that never reports back (e.g. data still buffering) shouldn't block forever.
      const stuck = seeking.current && performance.now() - seekStartedAt.current > 400;
      if (!seeking.current || stuck) seekTo(video);
    };

    const onLeave = () => {
      prevX = null;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [videoRef, sensitivity, enabled, seekTo]);

  return { onSeeked };
}

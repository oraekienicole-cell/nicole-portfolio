import { useRef } from 'react';
import { useVideoScrub } from '../hooks/useVideoScrub';
import { useFinePointer } from '../hooks/useMediaQuery';

export const HERO_VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';

/** Where the still frame sits on touch devices, as a fraction of the video. */
const STILL_FRAME = 0.35;

type Props = {
  /** Scrubbing only runs while the hero is on screen. */
  active: boolean;
};

export function BackgroundVideo({ active }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const finePointer = useFinePointer();
  const { onSeeked } = useVideoScrub(ref, { sensitivity: 0.8, enabled: finePointer && active });

  // Phones and tablets: no scrubbing (it would fight the scroll). Park on a good frame instead.
  const onLoadedMetadata = () => {
    const video = ref.current;
    if (!video || finePointer || !Number.isFinite(video.duration)) return;
    video.currentTime = video.duration * STILL_FRAME;
  };

  return (
    <video
      ref={ref}
      className="hero-video fixed inset-0 z-0 h-full w-full object-cover pointer-events-none"
      style={{ objectPosition: '70% center' }}
      // The media fragment makes iOS Safari paint a frame without playing.
      src={finePointer ? HERO_VIDEO_SRC : `${HERO_VIDEO_SRC}#t=0.1`}
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
      onSeeked={onSeeked}
      onLoadedMetadata={onLoadedMetadata}
    />
  );
}

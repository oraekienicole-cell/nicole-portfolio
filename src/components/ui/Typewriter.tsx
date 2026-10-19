import type { CSSProperties } from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useReducedMotion } from '../../hooks/useMediaQuery';

type Props = {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Types `text` out with a blinking cursor. The full sentence is reserved
 * invisibly underneath so surrounding layout never jumps while it types,
 * and screen readers get the whole sentence at once.
 */
export function Typewriter({ text, speed = 34, startDelay = 600, className = '', style }: Props) {
  const reduced = useReducedMotion();
  const { displayed, done } = useTypewriter(text, { speed, startDelay, instant: reduced });

  return (
    <p className={`relative ${className}`} style={style}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {displayed}
        {!done && (
          <span
            className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px]"
            style={{ animation: 'blink 1s step-end infinite' }}
          />
        )}
      </span>
    </p>
  );
}

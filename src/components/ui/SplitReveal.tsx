import { Fragment } from 'react';
import { useInView } from '../../hooks/useInView';

type Props = {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  id?: string;
  className?: string;
  /** Words (exact match, punctuation included) to set in the accent colour. */
  accent?: string[];
  stagger?: number;
};

/**
 * Headline reveal: each word rises out of its own mask.
 * The full sentence stays in the accessible name as plain text.
 */
export function SplitReveal({ text, as: Tag = 'h2', id, className = '', accent = [], stagger = 45 }: Props) {
  const [ref, inView] = useInView<HTMLHeadingElement>();
  const words = text.split(' ');

  return (
    <Tag ref={ref} id={id} className={`${inView ? 'is-in' : ''} ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="split-word" aria-hidden="true">
            <span
              style={{ transitionDelay: `${i * stagger}ms` }}
              className={accent.includes(word) ? 'text-accent' : undefined}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}

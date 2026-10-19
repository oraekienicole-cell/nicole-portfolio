import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li' | 'p' | 'header' | 'figure';
};

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: Props) {
  const [ref, inView] = useInView<HTMLElement>();
  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined;
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`reveal ${inView ? 'is-in' : ''} ${className}`} style={style}>
      {children}
    </Tag>
  );
}

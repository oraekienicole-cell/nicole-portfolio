import type { ReactNode } from 'react';
import { isSet } from '../../data/socials';

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Deprecated: external links no longer show an arrow. */
  arrow?: boolean;
  /** Hover text, e.g. to say plainly what a playful label means. */
  title?: string;
};

/**
 * One consistent treatment for links that leave the site:
 * new tab, rel="noopener noreferrer", and a screen-reader note. mailto: links open in place.
 */
export function ExternalLink({ href, children, className = 'link', title }: Props) {
  const isMail = href.startsWith('mailto:');
  return (
    <a
      href={href}
      className={className}
      title={title}
      {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
      {!isMail && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

/** A link that only exists once its URL does. Until then it renders nothing. */
export function SocialLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  if (!isSet(href)) return null;
  return (
    <ExternalLink href={href} className={className}>
      {children}
    </ExternalLink>
  );
}

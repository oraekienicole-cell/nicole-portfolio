import type { MouseEvent, ReactNode } from 'react';
import { Link } from '../../lib/router';
import { mailto } from '../../data/socials';

type Props = {
  className?: string;
  /** Pre-fills the email subject, e.g. "Speaking invitation". */
  subject?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  /** Rendered after the label only when the link opens email. */
  emailSuffix?: ReactNode;
  children: ReactNode;
};

/**
 * Every "Say Hello" on the site. With an email in socials.ts it's a mailto: link
 * that opens the visitor's email app, addressed to Nicole. Without one, it falls
 * back to scrolling to the contact section.
 */
export function SayHello({ className, subject, onClick, emailSuffix, children }: Props) {
  const href = mailto(subject);
  if (href) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
        {emailSuffix}
      </a>
    );
  }
  return (
    <Link to="/#contact" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

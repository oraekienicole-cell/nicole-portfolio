import { useState } from 'react';
import { cv, displayUrl, isSet, mailto, socials } from '../data/socials';
import { SectionLabel } from './ui/SectionLabel';
import { SplitReveal } from './ui/SplitReveal';
import { Reveal } from './ui/Reveal';
import { ExternalLink } from './ui/ExternalLink';
import { DevNote } from './ui/DevNote';

type Channel = { label: string; href: string; title?: string };

/** The quieter links under the main button. Only the ones that exist; the CV always does. */
function channels(): Channel[] {
  const list: Channel[] = [];
  if (isSet(socials.linkedin)) list.push({ label: 'LinkedIn', href: socials.linkedin });
  if (isSet(socials.medium)) list.push({ label: 'Medium', href: socials.medium });
  list.push({ label: cv.contact, href: socials.resume, title: cv.title });
  if (isSet(socials.github)) list.push({ label: 'GitHub', href: socials.github });
  if (isSet(socials.x)) list.push({ label: 'X', href: socials.x, title: displayUrl(socials.x) });
  return list;
}

export function Contact() {
  const href = mailto();

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-ink px-5 sm:px-8 md:px-10 pt-20 md:pt-40 pb-16">
      <SectionLabel index="09">Contact</SectionLabel>

      <SplitReveal
        id="contact-title"
        text="Still here? We should probably talk."
        accent={['talk.']}
        stagger={40}
        className="mt-10 md:mt-16 font-display text-[length:clamp(44px,8vw,140px)] leading-[0.95] tracking-[-0.035em] max-w-[12ch] text-balance"
      />
      <Reveal delay={250}>
        <p className="mt-8 md:mt-10 max-w-[38ch] text-[20px] sm:text-[26px] leading-[1.3] tracking-[-0.01em] text-mute text-pretty">
          For product marketing roles and projects, especially in fintech and technical products.
        </p>
      </Reveal>

      {href ? (
        <Reveal delay={350} className="mt-12 md:mt-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
          <a
            href={href}
            className="inline-flex min-h-14 w-fit items-center rounded-full bg-ink text-white px-9 py-3 text-[20px] sm:text-[24px] transition-colors duration-200 hover:bg-accent hover:text-ink focus-visible:bg-accent focus-visible:text-ink"
          >
            Say Hello
          </a>
          <EmailAddress email={socials.email} />
        </Reveal>
      ) : (
        <DevNote className="mt-12 max-w-xl">
          The “Say Hello” button and email address appear here once <code>email</code> is filled in in{' '}
          <code>src/data/socials.ts</code>. Every Say Hello on the site then opens a pre-addressed email.
        </DevNote>
      )}

      <ul
        aria-label="Elsewhere"
        className="mt-12 md:mt-24 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-8 text-[17px]"
      >
        {channels().map((c) => (
          <li key={c.label}>
            <ExternalLink href={c.href} title={c.title} arrow={false} className="link inline-flex min-h-11 items-center">
              {c.label}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The address as plain, selectable text, plus a one-click copy for people who'd rather not open an email app. */
function EmailAddress({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the address is still on screen to select by hand.
    }
  };

  return (
    <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[17px] sm:text-[19px]">
      <span className="text-mute">or write to</span>
      <a href={`mailto:${email}`} className="link select-all break-all">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="min-h-11 text-[14px] text-mute underline decoration-dotted underline-offset-4 hover:text-ink transition-colors"
      >
        <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </p>
  );
}

import { useState } from 'react';
import { missingNames, publishedTestimonials as items, type Testimonial } from '../data/testimonials';
import { isSet } from '../data/socials';
import { SectionLabel } from './ui/SectionLabel';
import { SplitReveal } from './ui/SplitReveal';
import { Reveal } from './ui/Reveal';
import { ExternalLink } from './ui/ExternalLink';
import { DevNote } from './ui/DevNote';

const pad = (n: number) => String(n).padStart(2, '0');

/** "First sentence. The rest." → ["First sentence.", "The rest."] */
const splitLead = (text: string): [string, string] => {
  const m = text.match(/^(.+?[.!?])\s+(.+)$/s);
  return m ? [m[1], m[2]] : [text, ''];
};

/**
 * Kind words. Desktop: the featured quote leads, the next two sit side by side
 * beneath it. Phones and tablets: one quote at a time, strongest first, with
 * large manual controls. Nothing autoplays.
 */
export function Testimonials() {
  if (items.length === 0) {
    return (
      <DevNote className="mx-5 sm:mx-8 md:mx-10 my-16">
        “Kind words” is hidden: no testimonials with a real quote yet. Add one in <code>src/data/testimonials.ts</code>.
      </DevNote>
    );
  }

  const [lead, ...rest] = items;

  return (
    <section
      id="kind-words"
      aria-labelledby="kind-words-title"
      className="border-t border-line px-5 sm:px-8 md:px-10 pt-24 md:pt-40 pb-24 md:pb-36"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3 md:pt-3">
          <SectionLabel index="06">Kind words</SectionLabel>
        </div>
        <div className="md:col-span-9">
          <SplitReveal
            id="kind-words-title"
            text="People I’ve worked with, in their words."
            className="font-display text-[length:clamp(32px,4.4vw,64px)] leading-[1.02] tracking-[-0.03em] max-w-[16ch] text-balance"
          />
          <Reveal delay={150}>
            <p className="mt-6 max-w-[44ch] text-[17px] sm:text-[19px] leading-[1.5] text-mute text-pretty">
              I’d rather let the people who were in the room tell you what the work felt like.
            </p>
          </Reveal>
          {missingNames > 0 && (
            <DevNote className="mt-8 max-w-xl">
              {missingNames} of these {missingNames === 1 ? 'is' : 'are'} missing the recommender’s name. Add it in{' '}
              <code>src/data/testimonials.ts</code>.
            </DevNote>
          )}
        </div>
      </div>

      {/* Desktop composition */}
      <div className="hidden lg:block">
        <div className="mt-24 grid grid-cols-12 gap-8">
          <Reveal className="col-span-9 col-start-4">
            <Quote t={lead} variant="lead" />
          </Reveal>
        </div>

        {rest.length > 0 && (
          <div className="mt-24 grid grid-cols-12 gap-8">
            <div className="col-span-9 col-start-4 grid grid-cols-2 border-t border-line">
              {rest.map((t, i) => (
                <Reveal
                  key={t.quote}
                  delay={i * 120}
                  className={`pt-12 ${i % 2 === 0 ? 'pr-12 border-r border-line' : 'pl-12'} ${i > 1 ? 'mt-12 border-t border-line' : ''}`}
                >
                  <Quote t={t} variant="regular" />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Phones and tablets: one at a time */}
      <div className="lg:hidden mt-14">
        <OneAtATime />
      </div>

      <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-12 md:gap-8">
        <p className="md:col-span-9 md:col-start-4 text-[13px] leading-[1.5] text-mute">
          Some colleagues know me as Ifeoma.
        </p>
      </div>
    </section>
  );
}

function OneAtATime() {
  const [i, setI] = useState(0);
  const go = (step: number) => setI((current) => (current + step + items.length) % items.length);

  return (
    <div>
      <div key={i} className="metric-in" aria-live="polite">
        <Quote t={items[i]} variant={items[i].featured ? 'lead' : 'regular'} />
      </div>

      {items.length > 1 && (
        <div className="mt-12 flex items-center justify-between border-t border-line pt-4">
          <p className="tabular text-[14px] text-mute">
            <span className="text-ink">{pad(i + 1)}</span> / {pad(items.length)}
          </p>
          <div className="flex">
            <button
              type="button"
              onClick={() => go(-1)}
              className="min-h-12 min-w-12 px-3 text-[16px] transition-colors hover:text-accent-ink"
              aria-label="Previous recommendation"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="min-h-12 min-w-12 pl-3 text-[16px] transition-colors hover:text-accent-ink"
              aria-label="Next recommendation"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Quote({ t, variant }: { t: Testimonial; variant: 'lead' | 'regular' }) {
  if (variant === 'lead') {
    const [first, rest] = splitLead(t.quote);
    return (
      <figure>
        <blockquote>
          {/* The first sentence carries the section; the rest follows quietly. Hanging opening quote. */}
          <p className="-indent-[0.4em] font-display text-[length:clamp(30px,4.4vw,66px)] leading-[1.05] tracking-[-0.025em] max-w-[18ch] text-balance">
            “{first}
            {!rest && '”'}
          </p>
          {rest && (
            <p className="mt-6 md:mt-8 max-w-[40ch] text-[length:clamp(19px,1.9vw,27px)] leading-[1.4] tracking-[-0.01em] text-ink/75 text-pretty">
              {rest}”
            </p>
          )}
          {t.excerpt && (
            <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-mute text-pretty">“{t.excerpt}”</p>
          )}
        </blockquote>
        <Attribution t={t} />
      </figure>
    );
  }

  return (
    <figure>
      <blockquote>
        <p className="-indent-[0.38em] font-display text-[length:clamp(21px,1.6vw,25px)] leading-[1.32] tracking-[-0.01em] max-w-[36ch] text-pretty">
          “{t.quote}”
        </p>
        {t.excerpt && (
          <p className="mt-5 max-w-[48ch] text-[16px] leading-[1.6] text-mute text-pretty">“{t.excerpt}”</p>
        )}
      </blockquote>
      <Attribution t={t} />
    </figure>
  );
}

/**
 * The person first, then how they know Nicole, then (quietly) where the words
 * come from. Role and company appear only once they're real; placeholders never render.
 */
function Attribution({ t }: { t: Testimonial }) {
  const hasName = isSet(t.name);
  const roleLine = [t.role, t.company].filter((v): v is string => isSet(v)).join(' · ');

  return (
    <figcaption className="mt-8 flex flex-col leading-snug transition-[translate] duration-300 ease-out-expo hover:translate-x-1">
      <span aria-hidden="true" className="mb-4 block h-px w-8 bg-ink/30" />
      {hasName &&
        (isSet(t.linkedin) ? (
          <span className="text-[17px] font-medium">
            <ExternalLink href={t.linkedin}>{t.name}</ExternalLink>
          </span>
        ) : (
          <span className="text-[17px] font-medium">{t.name}</span>
        ))}
      {roleLine && <span className="mt-1 text-[15px] text-mute">{roleLine}</span>}
      {t.relationship && (
        <span className={hasName ? 'mt-1 text-[15px] text-mute' : 'text-[17px] font-medium'}>{t.relationship}</span>
      )}
      <span className="mt-2 text-[12px] text-mute/80">Recommendation via LinkedIn</span>
    </figcaption>
  );
}

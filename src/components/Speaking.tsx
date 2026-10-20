import { useState } from 'react';
import { speaking, type SpeakingItem } from '../data/speaking';
import { SectionLabel } from './ui/SectionLabel';
import { SplitReveal } from './ui/SplitReveal';
import { Reveal } from './ui/Reveal';
import { SayHello } from './ui/SayHello';

const pad = (n: number) => String(n).padStart(2, '0');

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function Speaking() {
  return (
    <section
      id="speaking"
      aria-labelledby="speaking-title"
      className="px-5 sm:px-8 md:px-10 pt-20 md:pt-40 pb-20 md:pb-36"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3 md:pt-3">
          <SectionLabel index="05">Speaking</SectionLabel>
        </div>
        <div className="md:col-span-9">
          <SplitReveal
            id="speaking-title"
            text="Sometimes I take the argument outside."
            className="font-display text-[length:clamp(30px,4.4vw,64px)] leading-[1.04] tracking-[-0.03em] max-w-[16ch] text-balance"
          />
          <Reveal delay={150}>
            <p className="mt-5 md:mt-6 max-w-[44ch] text-[17px] sm:text-[19px] leading-[1.5] text-mute text-pretty">
              Talks, panels and rooms where someone was kind enough to give me a microphone.
            </p>
          </Reveal>
        </div>
      </div>

      <ol aria-labelledby="speaking-title" className="mt-12 md:mt-24 space-y-16 md:space-y-28">
        {speaking.map((item, i) => (
          <Reveal as="li" key={item.event}>
            <Appearance item={item} index={i} />
          </Reveal>
        ))}
      </ol>

      <div className="mt-14 md:mt-24 flex justify-start md:justify-end border-t border-line pt-6 text-[16px]">
        <SayHello subject="Speaking invitation" className="link group inline-flex min-h-11 items-center">
          Invite me to speak{' '}
        </SayHello>
      </div>
    </section>
  );
}

/**
 * One appearance: photo and copy side by side on desktop (alternating sides),
 * stacked on phones. With a `url`, the event name and a quiet text link open it.
 */
function Appearance({ item, index }: { item: SpeakingItem; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = !!item.image && !imageFailed;
  const flip = index % 2 === 1;
  const meta = [item.format, item.date, item.location].filter(Boolean).join(' · ');

  return (
    <article className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 md:items-center">
      {hasImage && (
        <figure className={`md:col-span-5 ${flip ? 'md:col-start-8 md:order-2' : ''}`}>
          <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-ink/[0.04]">
            <img
              src={item.image}
              alt={item.imageAlt ?? `Nicole Oraekie speaking at ${item.event}`}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: item.imagePosition ?? '50% 50%' }}
            />
          </div>
        </figure>
      )}

      <div
        className={
          hasImage
            ? `md:col-span-6 ${flip ? 'md:col-start-1 md:order-1' : 'md:col-start-7'}`
            : 'md:col-span-9 md:col-start-4 border-t border-line pt-6'
        }
      >
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-[13px] tabular text-accent-ink">{pad(index + 1)}</span>
          {meta && <span className="eyebrow text-mute">{meta}</span>}
        </p>

        <h3 className="mt-3 font-display text-[length:clamp(30px,4.2vw,60px)] leading-[1.02] tracking-[-0.03em] text-balance">
          {item.url ? (
            <a
              href={item.url}
              {...external}
              className="underline decoration-1 decoration-transparent underline-offset-[0.14em] transition-colors hover:decoration-accent focus-visible:decoration-accent"
            >
              {item.event}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            item.event
          )}
        </h3>

        {item.title && <p className="mt-3 text-[19px] sm:text-[21px] leading-[1.35] text-pretty">{item.title}</p>}

        {item.description && (
          <p className="mt-4 max-w-[46ch] text-[16px] sm:text-[17px] leading-[1.6] text-mute text-pretty">
            {item.description}
          </p>
        )}

        {item.url && (
          <p className="mt-5">
            <a href={item.url} {...external} className="link inline-flex min-h-11 items-center text-[16px]">
              {item.cta ?? 'See the event'}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        )}
      </div>
    </article>
  );
}

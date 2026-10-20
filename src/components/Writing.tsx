import { useId } from 'react';
import { publishedArticles as items, type Article } from '../data/articles';
import { isSet, socials } from '../data/socials';
import { SectionLabel } from './ui/SectionLabel';
import { SplitReveal } from './ui/SplitReveal';
import { Reveal } from './ui/Reveal';
import { ExternalLink } from './ui/ExternalLink';

/**
 * Writing: an editorial reading list. Each row is one link (new tab).
 * Desktop: category + publication | title + description | publication
 * Mobile: metadata stacked above a dominant title.
 */
export function Writing() {
  if (items.length === 0) return null;

  return (
    <section id="writing" aria-labelledby="writing-title" className="border-t border-line px-5 sm:px-8 md:px-10 pt-20 md:pt-40 pb-16 md:pb-36">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3 md:pt-3">
          <SectionLabel index="08">Writing</SectionLabel>
        </div>
        <div className="md:col-span-9">
          <SplitReveal
            id="writing-title"
            text="Ideas that needed more room."
            className="font-display text-[length:clamp(36px,5.2vw,80px)] leading-[1] tracking-[-0.03em] max-w-[14ch] text-balance"
          />
          <Reveal delay={150}>
            <p className="mt-8 max-w-[46ch] text-[17px] sm:text-[19px] leading-[1.5] text-mute text-pretty">
              On fintech, AI, finance, positioning and pricing.
            </p>
          </Reveal>
        </div>
      </div>

      <ol aria-labelledby="writing-title" className="mt-12 md:mt-24 border-t border-ink">
        {items.map((a, i) => (
          <Reveal as="li" key={a.url} delay={i * 60} className="border-b border-line">
            <ArticleRow article={a} />
          </Reveal>
        ))}
      </ol>

      {isSet(socials.medium) && (
        <p className="mt-10 flex justify-end text-[16px]">
          <ExternalLink href={socials.medium} className="link inline-flex min-h-11 items-center">
            More writing on Medium
          </ExternalLink>
        </p>
      )}
    </section>
  );
}

function ArticleRow({ article: a }: { article: Article }) {
  const descId = useId();
  const featured = !!a.featured;

  return (
    <a
      href={a.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-describedby={descId}
      className={`group relative grid grid-cols-12 gap-x-4 md:gap-x-8 gap-y-3 ${featured ? 'py-10 md:py-14' : 'py-8 md:py-10'}`}
    >
      {featured && <span aria-hidden="true" className="absolute left-0 top-0 h-[2px] w-12 bg-accent" />}

      {/* Category, publication */}
      <span className="col-span-12 md:col-span-3 flex flex-col gap-1.5 md:pt-2">
        {featured && <span className="eyebrow text-accent-ink">Featured</span>}
        <span className="eyebrow text-mute">{a.category}</span>
        {a.publication && <span className="text-[14px] text-ink/70 lg:hidden">{a.publication}</span>}
      </span>

      {/* Title, description */}
      <span className="col-span-12 md:col-span-9 lg:col-span-7">
        <span
          className={`block font-display tracking-[-0.02em] text-pretty transition-[translate] duration-500 ease-out-expo md:group-hover:translate-x-2 md:group-focus-visible:translate-x-2 ${
            featured
              ? 'text-[length:clamp(28px,3.6vw,54px)] leading-[1.04]'
              : 'text-[length:clamp(22px,2.4vw,34px)] leading-[1.12]'
          }`}
        >
          {a.title}
        </span>
        <span
          id={descId}
          className={`mt-3 block text-mute text-pretty leading-[1.55] ${
            featured ? 'max-w-[60ch] text-[17px] sm:text-[18px]' : 'max-w-[54ch] text-[16px]'
          }`}
        >
          {a.description}
        </span>
      </span>

      {/* Publication (desktop) */}
      <span className="hidden lg:block lg:col-span-2 pt-2 text-[15px] text-ink/70">{a.publication}</span>

      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

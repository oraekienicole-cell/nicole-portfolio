import { Link } from '../lib/router';
import { getProject, type Project } from '../data/projects';
import { chapters, type ChapterKey } from '../data/chapters';
import { SectionLabel } from './ui/SectionLabel';
import { SplitReveal } from './ui/SplitReveal';
import { Reveal } from './ui/Reveal';
import { Rich } from './ui/Rich';
import { Change } from './ui/Change';

/** First line of each chapter, so the featured case study reads as a preview, not a list of headings. */
function firstLine(p: Project, key: ChapterKey) {
  if (key === 'approach') return p.approachIntro ?? p.approach?.map((a) => a.area).join(' · ') ?? '';
  return p[key]?.[0] ?? '';
}

/** Only the chapters a case study actually has. */
const chaptersFor = (p: Project) => chapters.filter((c) => firstLine(p, c.key));

/** Kept for existing imports: renders a before/after figure (see ui/Change). */
export const Arrowed = Change;

export function CaseStudies() {
  const stakeet = getProject('stakeet')!;
  const maplerad = getProject('maplerad')!;

  return (
    <section id="cases" aria-labelledby="cases-title" className="px-5 sm:px-8 md:px-10 pt-20 md:pt-40 pb-16 md:pb-40 border-t border-line">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8 mb-12 md:mb-28">
        <div className="md:col-span-3 md:pt-3">
          <SectionLabel index="03">Case studies</SectionLabel>
        </div>
        <div className="md:col-span-9">
          <SplitReveal
            id="cases-title"
            text="Show your working."
            className="font-display text-[length:clamp(36px,5.2vw,80px)] leading-[1] tracking-[-0.03em]"
          />
          <Reveal delay={150}>
            <p className="mt-8 max-w-[52ch] text-[17px] sm:text-[19px] leading-[1.5] text-mute text-pretty">
              Context, problem, decision, what I did and the result.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Featured: Stakeet */}
      <article aria-labelledby="stakeet-feature" className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-5 md:sticky md:top-28 self-start">
          <p className="eyebrow text-accent-ink">Featured case study</p>
          <h3 id="stakeet-feature" className="mt-4 font-display text-[length:clamp(56px,7.5vw,120px)] leading-[0.88] tracking-[-0.035em]">
            {stakeet.title}
          </h3>
          <p className="mt-5 max-w-[22ch] text-[22px] sm:text-[26px] leading-[1.2] tracking-[-0.01em] text-pretty">
            {stakeet.headline}
          </p>
          <p className="mt-4 text-[14px] text-mute">{stakeet.descriptor}</p>

          {stakeet.metric && (
            <div className="mt-10 border-t border-line pt-6">
              <p className="font-display text-[length:clamp(44px,5.4vw,84px)] leading-none tracking-[-0.035em] tabular">
                <Arrowed text={stakeet.metric.value} />
              </p>
              <p className="mt-3 text-[14px] text-mute">{stakeet.metric.caption}</p>
            </div>
          )}

          <Link
            to={`/work/${stakeet.slug}`}
            className="group mt-10 inline-flex min-h-11 items-center gap-3 rounded-full bg-ink text-white px-6 py-3 text-[15px] transition-colors duration-200 hover:bg-accent hover:text-ink focus-visible:bg-accent focus-visible:text-ink"
          >
            Read the Stakeet case study
          </Link>
        </Reveal>

        <ol className="md:col-span-7 border-t border-ink">
          {chaptersFor(stakeet).map((c, i) => (
            <Reveal as="li" key={c.key} delay={i * 40} className="border-b border-line py-6 md:py-8 grid grid-cols-7 gap-4">
              <span className="col-span-1 text-[13px] tabular text-mute pt-1.5">{String(i + 1).padStart(2, '0')}</span>
              <div className="col-span-6">
                <h4 className="text-[20px] sm:text-[22px] leading-tight">{c.label}</h4>
                <p className="mt-2.5 max-w-[56ch] text-[15px] leading-[1.6] text-ink/75 text-pretty line-clamp-3">
                  <Rich text={firstLine(stakeet, c.key)} />
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </article>

      {/* Second case study: a wide editorial row rather than a card */}
      <article
        aria-labelledby="maplerad-feature"
        className="mt-16 md:mt-40 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8 border-t border-ink pt-10 md:pt-14"
      >
        <Reveal className="md:col-span-5">
          <p className="eyebrow text-mute">{maplerad.category}</p>
          <h3 id="maplerad-feature" className="mt-4 font-display text-[length:clamp(48px,6.4vw,100px)] leading-[0.9] tracking-[-0.035em]">
            {maplerad.title}
          </h3>
          <p className="mt-5 max-w-[22ch] text-[22px] sm:text-[26px] leading-[1.2] tracking-[-0.01em] text-pretty">
            {maplerad.headline}
          </p>
          <p className="mt-4 text-[14px] text-mute">{maplerad.descriptor}</p>
        </Reveal>

        <Reveal delay={120} className="md:col-span-7 flex flex-col">
          <p className="max-w-[52ch] text-[18px] sm:text-[20px] leading-[1.55] text-pretty">{maplerad.standfirst}</p>
          {maplerad.metric && (
            <div className="mt-10 border-t border-line pt-6">
              <p className="font-display text-[length:clamp(44px,5.4vw,84px)] leading-none tracking-[-0.035em] tabular">
                <Arrowed text={maplerad.metric.value} />
              </p>
              <p className="mt-3 text-[14px] text-mute">{maplerad.metric.caption}</p>
            </div>
          )}
          <Link
            to={`/work/${maplerad.slug}`}
            className="link group mt-10 inline-flex min-h-11 w-fit items-center gap-2 text-[16px]"
          >
            Read the Maplerad case study
          </Link>
        </Reveal>
      </article>
    </section>
  );
}

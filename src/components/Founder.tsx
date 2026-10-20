import { Link } from '../lib/router';
import { SectionLabel } from './ui/SectionLabel';
import { SplitReveal } from './ui/SplitReveal';
import { Reveal } from './ui/Reveal';

/*
 * Iglare Optics, the founder chapter.
 * Each step pairs the question a founder has to answer with the verified
 * evidence for it (filled dot). Where there's no evidence to show, the
 * question stands on its own (hollow dot).
 */
const journey: { step: string; question: string; proof: string[] }[] = [
  {
    step: 'Idea',
    question: 'Is the problem big enough to build on?',
    proof: [],
  },
  {
    step: 'Positioning',
    question: 'Why Iglare, and why trust us?',
    proof: [],
  },
  {
    step: 'Audience',
    question: 'Who needs it most, and where are they?',
    proof: [],
  },
  {
    step: 'Distribution',
    question: 'How do they find us?',
    proof: ['1M+ TikTok impressions'],
  },
  {
    step: 'Customers',
    question: 'Who buys first, and who vouches for us?',
    proof: ['International customers', 'Partnerships with Nigerian optometrists', '$5K Tony Elumelu Foundation grant'],
  },
  {
    step: 'Retention',
    question: 'Why would they come back?',
    proof: ['~35% improvement in retention'],
  },
  {
    step: 'Revenue',
    question: 'Does it add up?',
    proof: ['~25% monthly revenue growth', '~₦600k–₦1m monthly revenue'],
  },
];

export function Founder() {
  return (
    <section
      id="founder"
      data-theme="dark"
      aria-labelledby="founder-title"
      className="relative overflow-hidden bg-ink text-white px-5 sm:px-8 md:px-10 pt-20 md:pt-36 pb-14 md:pb-24"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3 md:pt-3">
          <SectionLabel index="04" tone="dark">
            Founder story
          </SectionLabel>
        </div>
        <div className="md:col-span-9">
          <SplitReveal
            id="founder-title"
            text="Before product marketing was my job, I did it for my own company."
            accent={['company.']}
            className="font-display text-[length:clamp(28px,4.6vw,76px)] leading-[1.06] tracking-[-0.03em] max-w-[20ch] text-balance"
          />
          <Reveal delay={200}>
            <p className="mt-10 max-w-[48ch] text-[18px] sm:text-[20px] leading-[1.5] text-white/70 text-pretty">
              I founded Iglare Optics and handled its marketing end to end: acquisition, retention, partnerships and revenue.
            </p>
          </Reveal>
        </div>
      </div>

      {/* The journey: a horizontal line of decisions on desktop, a vertical one on mobile */}
      <ol className="relative mt-14 md:mt-28 grid grid-cols-1 gap-0 lg:grid-cols-7 lg:gap-6">
        <span aria-hidden="true" className="absolute left-[5px] top-2 bottom-2 w-px bg-white/15 lg:left-0 lg:right-0 lg:top-[5px] lg:bottom-auto lg:h-px lg:w-auto" />
        {journey.map((j, i) => {
          const hasProof = j.proof.length > 0;
          return (
            <Reveal as="li" key={j.step} delay={i * 70} className="relative pl-8 pb-10 lg:pl-0 lg:pb-0 lg:pt-8">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full lg:top-0 ${
                  hasProof ? 'bg-accent' : 'border border-white/40 bg-ink'
                }`}
              />
              <p className="text-[13px] tabular text-white/50">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-1 font-display text-[24px] lg:text-[22px] xl:text-[26px] leading-tight tracking-[-0.02em]">
                {j.step}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.5] text-white/65 text-pretty">{j.question}</p>
              {hasProof && (
                <ul className="mt-4 space-y-1.5">
                  {j.proof.map((p) => (
                    <li key={p} className="font-display text-[17px] leading-snug text-white">
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          );
        })}
      </ol>

      <div className="mt-12 md:mt-24 flex flex-col gap-8 md:flex-row md:items-end md:justify-between border-t border-white/15 pt-10">
        <p className="max-w-[36ch] text-[22px] sm:text-[26px] leading-[1.3] tracking-[-0.01em] text-pretty">
          Running Iglare is why I don’t separate the story from the numbers.
        </p>
        <Link
          to="/work/iglare-optics"
          className="group inline-flex w-fit items-center gap-3 rounded-full border border-white px-6 py-3 text-[15px] transition-colors duration-200 hover:bg-accent hover:border-accent hover:text-ink"
        >
          Read the founder story
        </Link>
      </div>

      <p
        aria-hidden="true"
        className="text-outline pointer-events-none select-none mt-16 -mb-[0.22em] font-display text-[length:clamp(96px,24vw,380px)] leading-[0.8] tracking-[-0.045em] whitespace-nowrap"
      >
        Iglare
      </p>
    </section>
  );
}

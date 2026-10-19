import { talks } from '../data/speaking';
import { SectionLabel } from './ui/SectionLabel';
import { SplitReveal } from './ui/SplitReveal';
import { Reveal } from './ui/Reveal';
import { SayHello } from './ui/SayHello';

export function Speaking() {
  return (
    <section
      id="speaking"
      aria-labelledby="speaking-title"
      className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8 px-5 sm:px-8 md:px-10 pt-24 md:pt-40 pb-24 md:pb-36"
    >
      <div className="md:col-span-3 md:pt-3">
        <SectionLabel index="05">Speaking</SectionLabel>
      </div>
      <div className="md:col-span-9">
        <SplitReveal
          id="speaking-title"
          text="Sometimes I take the argument outside."
          className="font-display text-[length:clamp(32px,4.4vw,64px)] leading-[1.02] tracking-[-0.03em] max-w-[16ch] text-balance"
        />
        <Reveal delay={150}>
          <p className="mt-6 max-w-[44ch] text-[17px] sm:text-[19px] leading-[1.5] text-mute text-pretty">
            Talks, panels and rooms where somebody was kind enough to give me a microphone.
          </p>
        </Reveal>

        <ul aria-labelledby="speaking-title" className="mt-12 md:mt-16 border-t border-ink">
          {talks.map((t, i) => {
            const meta = [t.location, t.talk, t.year].filter(Boolean).join(' · ');
            const body = (
              <>
                <span className="font-display text-[length:clamp(36px,6.4vw,100px)] leading-[0.98] tracking-[-0.03em] transition-colors duration-300 group-hover:text-accent">
                  {t.event}
                </span>
                {meta && <span className="text-[15px] text-mute md:text-right">{meta}</span>}
              </>
            );
            const cls = 'group flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between py-6 md:py-8';
            return (
              <Reveal as="li" key={t.event} delay={i * 60} className="border-b border-line">
                {t.href ? (
                  <a href={t.href} className={cls} target="_blank" rel="noopener noreferrer">
                    {body}
                  </a>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-8 flex justify-end text-[15px]">
          <SayHello subject="Speaking invitation" className="link group w-fit">
            Invite me to speak{' '}
            <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </SayHello>
        </div>
      </div>
    </section>
  );
}

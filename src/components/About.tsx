import { elsewhere } from '../data/site';
import { cv, socials } from '../data/socials';
import { SectionLabel } from './ui/SectionLabel';
import { SplitReveal } from './ui/SplitReveal';
import { Reveal } from './ui/Reveal';
import { Rich } from './ui/Rich';
import { ExternalLink, SocialLink } from './ui/ExternalLink';

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line px-5 sm:px-8 md:px-10 pt-20 md:pt-40 pb-16 md:pb-36">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3 md:pt-3">
          <SectionLabel index="07">The Person</SectionLabel>
        </div>

        <div className="md:col-span-9">
          <SplitReveal
            id="about-title"
            text="The person behind the tabs."
            accent={['tabs.']}
            className="font-display text-[length:clamp(36px,5.2vw,80px)] leading-[1] tracking-[-0.03em] max-w-[14ch] text-balance"
          />

          <div className="mt-14 md:mt-20 grid grid-cols-1 gap-14 lg:grid-cols-9 lg:gap-8">
            <Reveal className="lg:col-span-5 space-y-6 text-[18px] sm:text-[19px] leading-[1.65] text-pretty max-w-[60ch]">
              <p>
                The products I find most interesting usually aren’t obvious in five seconds. Fintech infrastructure.
                New technology. Products creating a category customers don’t quite have language for yet.
              </p>
              <p>
                That’s where product marketing gets interesting to me. You have to understand the product properly,
                understand the customer without flattening them into a persona, and then decide what deserves to be
                said and what absolutely doesn’t.
              </p>
              <p>
                My work tends to move between research, positioning, messaging, launches, lifecycle, content and
                growth. The job title changes less often than the problem does.
              </p>
              <p className="flex flex-wrap items-baseline gap-x-8 gap-y-3 pt-4 text-[17px]">
                <ExternalLink href={socials.resume} title={cv.title} className="link inline-flex min-h-11 items-center">
                  {cv.about}
                </ExternalLink>
                <SocialLink href={socials.linkedin} className="link inline-flex min-h-11 items-center">
                  LinkedIn
                </SocialLink>
              </p>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-4">
              <h3 className="eyebrow text-mute">Elsewhere</h3>
              <dl className="mt-4 border-t border-ink">
                {elsewhere.map((e) => (
                  <div key={e.label} className="border-b border-line py-5">
                    <dt className="text-[14px] text-mute">{e.label}</dt>
                    <dd className="mt-1.5 text-[17px] leading-[1.45] text-pretty">
                      <Rich text={e.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

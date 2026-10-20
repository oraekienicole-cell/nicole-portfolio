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
          <SectionLabel index="07">About</SectionLabel>
        </div>

        <div className="md:col-span-9">
          <SplitReveal
            id="about-title"
            text="The short version."
            className="font-display text-[length:clamp(32px,4.6vw,68px)] leading-[1.02] tracking-[-0.03em] max-w-[18ch] text-balance"
          />

          <div className="mt-14 md:mt-20 grid grid-cols-1 gap-14 lg:grid-cols-9 lg:gap-8">
            <Reveal className="lg:col-span-5 space-y-6 text-[18px] sm:text-[19px] leading-[1.65] text-pretty max-w-[60ch]">
              <p>
                I work across positioning, GTM messaging, onboarding, lifecycle and growth: who a product is for, what
                it should say, how it reaches people and what keeps them using it.
              </p>
              <p>
                So far that has meant B2B fintech infrastructure at Maplerad, early-stage growth at Stakeet, and Iglare
                Optics, a company I founded and grew.
              </p>
              <p>
                The problems I’ve worked on most are products that are hard to explain and users who sign up but don’t
                stay. I research before I write, I’m comfortable with technical subjects, and I judge the work by
                adoption and revenue.
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

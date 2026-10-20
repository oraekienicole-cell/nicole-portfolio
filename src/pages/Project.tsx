import { useEffect } from 'react';
import { Link } from '../lib/router';
import { caseStudies, getProject, type Project as ProjectType } from '../data/projects';
import { chapters, type ChapterKey } from '../data/chapters';
import { Arrowed } from '../components/CaseStudies';
import { Reveal } from '../components/ui/Reveal';
import { SplitReveal } from '../components/ui/SplitReveal';
import { Rich } from '../components/ui/Rich';

export function Project({ slug }: { slug: string }) {
  const project = getProject(slug);

  useEffect(() => {
    document.title = project?.context ? `${project.title} · Nicole Oraekie` : 'Not found · Nicole Oraekie';
  }, [project]);

  if (!project || !project.context) return <NotFound />;

  const i = caseStudies.findIndex((p) => p.slug === project.slug);
  const next = caseStudies[(i + 1) % caseStudies.length];

  return (
    <article className="px-5 sm:px-8 md:px-10 pt-28 md:pt-36">
      <Link to="/#work" className="group inline-flex min-h-11 items-center gap-2 text-[15px] text-mute hover:text-ink transition-colors">
        All work
      </Link>

      <header className="mt-8 md:mt-14">
        <p className="eyebrow text-accent-ink">Case study · {project.category}</p>
        <SplitReveal
          as="h1"
          text={project.title}
          className="mt-5 font-display text-[length:clamp(64px,12vw,184px)] leading-[0.86] tracking-[-0.045em]"
        />
        <Reveal delay={150}>
          <p className="mt-8 max-w-[24ch] text-[26px] sm:text-[38px] leading-[1.15] tracking-[-0.02em] text-balance">
            {project.headline}
          </p>
          {project.standfirst && (
            <p className="mt-6 max-w-[52ch] text-[18px] sm:text-[21px] leading-[1.5] text-mute text-pretty">
              {project.standfirst}
            </p>
          )}
        </Reveal>

        <Reveal delay={250}>
          <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 border-t border-ink">
            <Meta label="Company" value={project.company} />
            {project.role && <Meta label="Role" value={project.role} />}
            {project.timeframe && <Meta label="Timeframe" value={project.timeframe} />}
            <Meta label="Work" value={project.descriptor} className="col-span-2 md:col-span-1" />
          </dl>
        </Reveal>
      </header>

      {project.metric && (
        <Reveal className="mt-14 md:mt-28 border-y border-line py-10 md:py-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <p className="font-display text-[length:clamp(52px,9vw,144px)] leading-[0.9] tracking-[-0.04em] tabular">
            <Arrowed text={project.metric.value} />
          </p>
          <p className="max-w-[30ch] text-[15px] leading-[1.5] text-mute md:text-right">{project.metric.caption}</p>
        </Reveal>
      )}

      <div className="mt-14 md:mt-28">
        {chapters
          .filter((c) => (c.key === 'approach' ? project.approach?.length : project[c.key]?.length))
          .map((c, n) => (
            <Chapter key={c.key} index={n + 1} label={c.label} project={project} chapter={c.key} />
          ))}
      </div>

      {project.media?.length ? (
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2">
          {project.media.map((m) => (
            <figure key={m.src}>
              <img src={m.src} alt={m.alt} loading="lazy" decoding="async" className="w-full h-auto" />
              {m.caption && <figcaption className="mt-2 text-[14px] text-mute">{m.caption}</figcaption>}
            </figure>
          ))}
        </div>
      ) : null}

      <nav aria-label="Next case study" className="mt-28 md:mt-40 border-t border-ink">
        <Link to={`/work/${next.slug}`} className="group block py-12 md:py-16">
          <span className="eyebrow text-mute">Next case study</span>
          <span className="mt-4 flex items-baseline gap-4 font-display text-[length:clamp(48px,9vw,140px)] leading-[0.9] tracking-[-0.035em]">
            <span className="transition-[translate] duration-500 ease-out-expo group-hover:translate-x-3">{next.title}</span>
          </span>
          <span className="mt-4 block max-w-[40ch] text-[17px] text-mute">{next.headline}</span>
        </Link>
      </nav>
    </article>
  );
}

function Meta({ label, value, className = '' }: { label: string; value: string; className?: string }) {
  return (
    <div className={`border-b border-line py-5 pr-4 ${className}`}>
      <dt className="eyebrow text-mute">{label}</dt>
      <dd className="mt-2 text-[16px] leading-snug">
        <Rich text={value} />
      </dd>
    </div>
  );
}

function Chapter({
  index,
  label,
  project,
  chapter,
}: {
  index: number;
  label: string;
  project: ProjectType;
  chapter: ChapterKey;
}) {
  const id = `chapter-${chapter}`;
  const paragraphs = chapter === 'approach' ? [] : (project[chapter] ?? []);

  return (
    <section aria-labelledby={id} className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 border-t border-line py-14 md:py-20">
      <div className="md:col-span-4 lg:col-span-3">
        <div className="md:sticky md:top-28">
          <p className="text-[13px] tabular text-accent-ink">{String(index).padStart(2, '0')}</p>
          <h2 id={id} className="mt-2 font-display text-[30px] sm:text-[36px] leading-[1.02] tracking-[-0.02em]">
            {label}
          </h2>
        </div>
      </div>

      <div className="md:col-span-8 lg:col-span-7 lg:col-start-5">
        {chapter === 'results' && project.metric && (
          <Reveal as="p" className="mb-8 font-display text-[length:clamp(40px,5vw,72px)] leading-none tracking-[-0.035em] tabular">
            <Arrowed text={project.metric.value} />
          </Reveal>
        )}

        {chapter === 'approach' ? (
          <>
            {project.approachIntro && (
              <Reveal as="p" className="max-w-[62ch] text-[19px] sm:text-[22px] leading-[1.55] text-pretty">
                <Rich text={project.approachIntro} />
              </Reveal>
            )}
            <ul className="mt-10 border-t border-ink">
              {project.approach?.map((a) => (
                <Reveal as="li" key={a.area} className="grid grid-cols-1 gap-2 sm:grid-cols-7 sm:gap-6 border-b border-line py-6">
                  <h3 className="sm:col-span-2 text-[17px] font-medium leading-snug">{a.area}</h3>
                  <p className="sm:col-span-5 text-[17px] leading-[1.6] text-pretty">
                    <Rich text={a.detail} />
                  </p>
                </Reveal>
              ))}
            </ul>
          </>
        ) : (
          <div className="space-y-6">
            {paragraphs.map((para, i) => (
              <Reveal as="p" key={i} delay={i * 60} className="max-w-[62ch] text-[19px] sm:text-[22px] leading-[1.55] text-pretty">
                <Rich text={para} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function NotFound() {
  return (
    <section className="min-h-[80vh] px-5 sm:px-8 md:px-10 pt-36 flex flex-col justify-center">
      <p className="eyebrow text-accent-ink">404</p>
      <h1 className="mt-4 font-display text-[length:clamp(48px,9vw,140px)] leading-[0.92] tracking-[-0.035em] max-w-[12ch] text-balance">
        This page hasn’t been positioned yet.
      </h1>
      <Link to="/" className="link mt-10 w-fit text-[18px]">
        Back to the homepage
      </Link>
    </section>
  );
}

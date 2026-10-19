import { useEffect, useRef, useState } from 'react';
import { Link } from '../lib/router';
import { projects, projectHref, type Project } from '../data/projects';
import { useFinePointer, useReducedMotion } from '../hooks/useMediaQuery';
import { SectionLabel } from './ui/SectionLabel';
import { SplitReveal } from './ui/SplitReveal';
import { Reveal } from './ui/Reveal';

const pad = (n: number) => String(n).padStart(2, '0');

export function ProjectIndex() {
  const finePointer = useFinePointer();
  const reduced = useReducedMotion();
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" aria-labelledby="work-title" className="px-5 sm:px-8 md:px-10 pt-20 md:pt-44 pb-16 md:pb-40">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8 mb-12 md:mb-28">
        <div className="md:col-span-3 md:pt-3">
          <SectionLabel index="01">The Work</SectionLabel>
        </div>
        <div className="md:col-span-9">
          <SplitReveal
            id="work-title"
            text="A few things I’ve moved forward."
            stagger={28}
            className="font-display text-[length:clamp(36px,5.6vw,88px)] leading-[1] tracking-[-0.03em] max-w-[14ch] text-balance"
          />
          <Reveal delay={200}>
            <p className="mt-8 max-w-[44ch] text-[18px] sm:text-[21px] leading-[1.45] text-mute text-pretty">
              Products, positioning, adoption and the occasional number worth putting in large type.
            </p>
          </Reveal>
        </div>
      </div>

      <ol className="border-b border-line" onMouseLeave={() => setActive(null)}>
        {projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i + 1} onActivate={() => setActive(p)} />
        ))}
      </ol>

      {finePointer && !reduced && <CursorPreview project={active} />}
    </section>
  );
}

function ProjectRow({ project: p, index, onActivate }: { project: Project; index: number; onActivate: () => void }) {
  const href = projectHref(p);
  const cls = 'group grid grid-cols-12 gap-x-4 md:gap-x-8 py-8 md:py-10 items-baseline';

  const inner = (
    <>
      <span
        className={`col-span-2 md:col-span-1 text-[13px] tabular text-mute transition-colors duration-300 ${
          href ? 'group-hover:text-accent-ink group-focus-visible:text-accent-ink' : ''
        }`}
      >
        {pad(index)}
      </span>

      <span className="col-span-10 md:col-span-5 flex items-baseline gap-4">
        <span
          className={`font-display text-[length:clamp(36px,5.6vw,88px)] leading-[0.95] tracking-[-0.03em] transition-[translate] duration-500 ease-out-expo ${
            href ? 'md:group-hover:translate-x-3 md:group-focus-visible:translate-x-3' : ''
          }`}
        >
          {p.title}
        </span>
        {href && (
          <span
            aria-hidden="true"
            className="hidden md:inline text-[length:clamp(22px,2.6vw,40px)] text-accent opacity-0 -translate-x-2 transition-[opacity,translate] duration-500 ease-out-expo group-hover:opacity-100 group-hover:translate-x-2 group-focus-visible:opacity-100"
          >
            →
          </span>
        )}
      </span>

      {/* The problem, the kind of work, and the verified outcome: readable without hovering */}
      <span className="col-span-12 md:col-span-6 mt-5 md:mt-0 flex flex-col gap-3 md:pt-2">
        <span className="text-[18px] sm:text-[20px] leading-[1.35] tracking-[-0.005em] text-pretty max-w-[40ch]">
          {p.problem}
        </span>
        <span className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5 text-[14px] leading-snug">
          <span className="text-mute">{p.descriptor}</span>
          {p.outcome && (
            <span className="inline-flex items-center gap-2 text-ink">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              {p.outcome}
            </span>
          )}
        </span>
      </span>
    </>
  );

  return (
    <li className="border-t border-line">
      {href ? (
        <Link to={href} onMouseEnter={onActivate} onFocus={onActivate} className={`${cls} focus-visible:outline-offset-0`}>
          {inner}
        </Link>
      ) : (
        <div onMouseEnter={onActivate} className={cls}>
          {inner}
        </div>
      )}
    </li>
  );
}

const toneClass: Record<Project['preview']['tone'], string> = {
  ink: 'bg-ink text-white',
  accent: 'bg-accent text-ink',
  paper: 'bg-paper text-ink border border-ink',
};

const PREVIEW_W = 240;
const PREVIEW_H = 176;

/** A typographic "cover" that trails the cursor across the index. Desktop only. */
function CursorPreview({ project }: { project: Project | null }) {
  const el = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<Project | null>(project);

  useEffect(() => {
    if (project) setShown(project);
  }, [project]);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;
    let first = true;

    // Eases towards the cursor and stops the loop once it has caught up.
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;
      // Sit below-right of the cursor so the hovered title stays readable;
      // flip sides near the right edge and above the cursor near the bottom.
      const offsetX = pos.x + PREVIEW_W + 40 > window.innerWidth ? -PREVIEW_W - 24 : 32;
      const offsetY = pos.y + PREVIEW_H + 48 > window.innerHeight ? -PREVIEW_H - 24 : 40;
      node.style.transform = `translate3d(${pos.x + offsetX}px, ${pos.y + offsetY}px, 0)`;
      const settled = Math.abs(target.x - pos.x) < 0.3 && Math.abs(target.y - pos.y) < 0.3;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (first) {
        pos.x = target.x;
        pos.y = target.y;
        first = false;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={el} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-20 hidden md:block">
      <div
        className={`w-[240px] h-[176px] p-5 flex flex-col justify-between transition-[opacity,scale] duration-300 ease-out-expo origin-top-left ${
          shown ? toneClass[shown.preview.tone] : ''
        }`}
        style={{ opacity: project ? 1 : 0, scale: project ? '1' : '0.92' }}
      >
        {shown && (
          <>
            <span className="eyebrow !text-[11px] opacity-80">{shown.preview.kicker}</span>
            <span key={shown.slug} className="font-display text-[40px] leading-[0.95] tracking-[-0.025em] metric-in">
              {shown.preview.big}
            </span>
            <span className="text-[13px] opacity-80">{shown.title}</span>
          </>
        )}
      </div>
    </div>
  );
}

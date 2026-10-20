import { useRef, useState } from 'react';
import { metrics, type Metric } from '../data/metrics';
import { useScrollFrame } from '../hooks/useScrollFrame';
import { SectionLabel } from './ui/SectionLabel';
import { SplitReveal } from './ui/SplitReveal';
import { Reveal } from './ui/Reveal';
import { Change } from './ui/Change';

const pad = (n: number) => String(n).padStart(2, '0');

/** Before/after figures render with a small "to" (see ui/Change). */
const Value = ({ value }: { value: string }) => <Change text={value} />;

/** Size the dominant number by its length so short and long values both fill the stage. */
const stageSize = (value: string) => {
  const len = value.replace(/\s/g, '').length;
  const vw = Math.min(30, 118 / Math.max(len, 3));
  return `min(${vw.toFixed(1)}vw, 52vh)`;
};

export function Metrics() {
  return (
    <section id="evidence" aria-labelledby="evidence-title" className="relative">
      <div className="px-5 sm:px-8 md:px-10 pt-20 md:pt-40 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3 md:pt-3">
          <SectionLabel index="02">Results</SectionLabel>
        </div>
        <div className="md:col-span-9">
          <SplitReveal
            id="evidence-title"
            text="Proof is nicer than adjectives."
            className="font-display text-[length:clamp(36px,5.2vw,80px)] leading-[1] tracking-[-0.03em] max-w-[13ch] text-balance"
          />
          <Reveal delay={150}>
            <p className="mt-8 max-w-[46ch] text-[17px] sm:text-[19px] leading-[1.5] text-mute text-pretty">
              Approximate figures, each with its context.
            </p>
          </Reveal>
        </div>
      </div>

      <MetricStage />

      {/* Mobile, tablet and screen readers: a plain, readable list. */}
      <ol className="lg:sr-only px-5 sm:px-8 md:px-10 pt-14 pb-24">
        {metrics.map((m, i) => (
          <Reveal as="li" key={m.label} className="border-t border-line py-10">
            <p className="text-[13px] tabular text-mute">
              {pad(i + 1)} / {pad(metrics.length)}
            </p>
            <p className="mt-3 font-display text-[length:clamp(56px,16vw,140px)] leading-[0.9] tracking-[-0.035em] tabular">
              <Value value={m.value} />
            </p>
            <p className="mt-4 text-[22px] leading-tight">
              {m.label} <span className="text-mute">· {m.where}</span>
            </p>
            <MetricNote metric={m} />
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function MetricNote({ metric }: { metric: Metric }) {
  return <p className="mt-3 max-w-md text-[15px] leading-[1.55] text-mute text-pretty">{metric.note}</p>;
}

/**
 * Desktop: one number owns the screen at a time. The section is tall; a sticky
 * stage swaps the dominant metric as you scroll through it.
 */
function MetricStage() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useScrollFrame(() => {
    const el = track.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const range = r.height - window.innerHeight;
    if (range <= 0) return;
    const p = Math.min(0.9999, Math.max(0, -r.top / range));
    setProgress(p);
    setActive(Math.floor(p * metrics.length));
  });

  const m = metrics[active];

  return (
    <div
      ref={track}
      aria-hidden="true"
      className="hidden lg:block relative"
      style={{ height: `calc(${metrics.length} * 75vh + 100vh)` }}
    >
      <div className="sticky top-0 h-screen px-10 pt-28 pb-10 flex flex-col">
        <div className="eyebrow flex items-baseline justify-between text-mute">
          <span className="tabular">
            <span className="text-ink">{pad(active + 1)}</span> / {pad(metrics.length)}
          </span>
          <span>{m.where}</span>
        </div>

        <div className="flex-1 flex items-center overflow-hidden">
          <p
            key={active}
            className="metric-in font-display leading-[0.85] tracking-[-0.04em] tabular whitespace-nowrap"
            style={{ fontSize: stageSize(m.value) }}
          >
            <Value value={m.value} />
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8 items-end">
          <div key={`l-${active}`} className="col-span-5 metric-in">
            <p className="font-display text-[length:clamp(28px,2.6vw,40px)] leading-tight tracking-[-0.02em]">{m.label}</p>
          </div>
          <div key={`n-${active}`} className="col-span-5 col-start-8 metric-in" style={{ animationDelay: '80ms' }}>
            <MetricNote metric={m} />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-2" style={{ gridTemplateColumns: `repeat(${metrics.length}, 1fr)` }}>
          {metrics.map((_, i) => {
            const fill = Math.min(1, Math.max(0, progress * metrics.length - i));
            return (
              <span key={i} className="relative h-[2px] bg-line overflow-hidden">
                <span
                  className={`absolute inset-y-0 left-0 ${i === active ? 'bg-accent' : 'bg-ink'}`}
                  style={{ width: `${fill * 100}%` }}
                />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

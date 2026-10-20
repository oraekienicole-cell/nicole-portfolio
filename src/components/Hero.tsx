import { useEffect, useState } from 'react';
import { Link } from '../lib/router';
import { Typewriter } from './ui/Typewriter';
import { SayHello } from './ui/SayHello';

const actions = [
  { label: 'Selected work', to: '/#work' },
  { label: 'Case studies', to: '/#cases' },
  { label: 'Writing', to: '/#writing' },
  { label: 'About', to: '/#about' },
];

const tagline = 'Product marketing · Fintech · AI · Technical products';

const pill =
  'inline-flex items-center justify-center rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap pointer-coarse:min-h-11 transition-colors duration-200';

const copySize = { fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: 400, color: '#000' } as const;

export function Hero() {
  const [showActions, setShowActions] = useState(false);

  // Independent of the typewriter: the actions arrive 400ms after load, while it types.
  useEffect(() => {
    const t = window.setTimeout(() => setShowActions(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="hero relative z-[1] flex flex-col justify-end pt-28 pb-10 md:justify-center md:pt-0 md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden"
    >
      <h1 id="hero-title" className="sr-only">
        Nicole Oraekie, product marketer for fintech and technical products
      </h1>

      {/* Phones/tablets: the copy sits over the figure, so lift it with a soft wash from below */}
      <div
        aria-hidden="true"
        className="hero-content pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(to top, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.72) 38%, rgba(255,255,255,0) 72%)',
        }}
      />

      <div className="hero-content max-w-xl relative z-10">
        <p
          className="pointer-events-none select-none mb-5 sm:mb-6"
          style={{ ...copySize, lineHeight: 1.3, filter: 'blur(4px)' }}
        >
          Good products have a communication problem.
          <br />
          I spend an unreasonable amount of time fixing that.
        </p>

        <Typewriter
          text="Product marketer for fintech and technical products. I work on positioning, go-to-market, adoption and growth."
          speed={34}
          startDelay={600}
          className="text-black mb-5 sm:mb-6"
          style={{ ...copySize, lineHeight: 1.35, minHeight: 54 }}
        />

        <nav
          aria-label="Start here"
          className="flex flex-wrap gap-y-1 -mx-[0.2em]"
          style={{
            opacity: showActions ? 1 : 0,
            transform: showActions ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {actions.map((a) => (
            <Link
              key={a.label}
              to={a.to}
              className={`${pill} bg-white text-black border border-black/10 hover:bg-accent hover:border-accent focus-visible:bg-accent`}
            >
              {a.label}
            </Link>
          ))}
          <SayHello
            className={`${pill} gap-2 sm:gap-3 bg-transparent text-black border border-black hover:bg-black hover:text-white`}
          >
            Say hello
          </SayHello>
        </nav>

        {/* Phones: the tagline sits under the actions */}
        <p className="eyebrow md:hidden mt-6 text-black/65">{tagline}</p>
      </div>

      {/* Corner notes — desktop only, where the scrub interaction exists */}
      <div
        aria-hidden="true"
        className="hero-content eyebrow pointer-events-none absolute bottom-6 left-5 right-5 sm:left-8 sm:right-8 md:left-10 md:right-10 hidden md:flex items-end justify-between text-black/70"
      >
        <span>{tagline}</span>
        <span className="hidden pointer-fine:inline rounded-full bg-white/90 px-3 py-1.5 text-black">Move your cursor</span>
      </div>
    </section>
  );
}

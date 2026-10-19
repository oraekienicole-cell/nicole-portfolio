import { useEffect, useState } from 'react';
import { Link, usePathname } from '../lib/router';
import { useScrollFrame } from '../hooks/useScrollFrame';
import { cv, socials } from '../data/socials';
import { SayHello } from './ui/SayHello';

const links = [
  { label: 'The Work', to: '/#work' },
  { label: 'The Person', to: '/#about' },
  { label: 'Things I Wrote Down', to: '/#writing' },
];

export function Navigation() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [overDark, setOverDark] = useState(false);

  // Solid once the hero has gone; inverted over dark chapters.
  useScrollFrame(() => {
    const threshold = path === '/' ? window.innerHeight - 80 : 8;
    setSolid(window.scrollY > threshold);

    const probe = 36;
    const dark = Array.from(document.querySelectorAll<HTMLElement>('[data-theme="dark"]')).some((el) => {
      const r = el.getBoundingClientRect();
      return r.top <= probe && r.bottom >= probe;
    });
    setOverDark(dark);
  }, [path]);

  // Close on route change, lock scroll while open, close on Escape.
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const dark = overDark && !open;
  const surface = open
    ? 'bg-transparent border-transparent'
    : solid
      ? dark
        ? 'bg-ink border-white/10'
        : 'bg-paper border-line'
      : 'bg-transparent border-transparent';

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-10 border-b transition-colors duration-300 ${surface} ${
          dark ? 'text-white' : 'text-black'
        }`}
      >
        <nav
          aria-label="Primary"
          className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5"
        >
          <Link to="/" className="group flex items-center gap-3" aria-label="Nicole Oraekie, home">
            <span className="wordmark text-[21px] sm:text-[26px] leading-none">Nicole Oraekie</span>
            <span
              aria-hidden="true"
              className="text-[25px] sm:text-[30px] leading-none select-none transition-[rotate,color] duration-500 ease-out-expo group-hover:rotate-90 group-hover:text-accent"
              style={{ letterSpacing: '-0.02em' }}
            >
              ✳︎
            </span>
          </Link>

          <ul className="hidden lg:flex text-[16px] xl:text-[19px] 2xl:text-[21px] leading-none whitespace-nowrap">
            {links.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:opacity-60 transition-opacity">
                  {l.label}
                </Link>
                <span aria-hidden="true" className="whitespace-pre">
                  ,{' '}
                </span>
              </li>
            ))}
            <li>
              <a
                href={socials.resume}
                target="_blank"
                rel="noopener noreferrer"
                title={cv.title}
                className="group inline-flex items-start hover:opacity-60 transition-opacity"
              >
                {cv.nav}
                <span
                  aria-hidden="true"
                  className="ml-0.5 text-[0.6em] leading-none transition-[translate,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                >
                  ↗
                </span>
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </li>
          </ul>

          <SayHello
            className="hidden lg:inline text-[16px] xl:text-[19px] 2xl:text-[21px] leading-none whitespace-nowrap underline underline-offset-2 decoration-1 hover:opacity-60 transition-opacity"
            emailSuffix={<span aria-hidden="true"> ↗</span>}
          >
            Say Hello
          </SayHello>

          <button
            type="button"
            className="lg:hidden -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${dark ? 'bg-white' : 'bg-black'} ${
                open ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${dark ? 'bg-white' : 'bg-black'} ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${dark ? 'bg-white' : 'bg-black'} ${
                open ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className="lg:hidden fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm flex flex-col justify-center items-start px-8 gap-8 transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
        inert={!open}
        aria-hidden={!open}
      >
        <ul className="flex flex-col gap-5">
          {links.map((l, i) => (
            <li
              key={l.label}
              className="transition-[opacity,translate] duration-500 ease-out-expo"
              style={{
                opacity: open ? 1 : 0,
                translate: open ? '0 0' : '0 12px',
                transitionDelay: open ? `${80 + i * 50}ms` : '0ms',
              }}
            >
              <Link to={l.to} className="text-[clamp(28px,8vw,36px)] font-display leading-[1.05] text-black" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <SayHello
          onClick={() => setOpen(false)}
          className="text-[32px] font-display leading-none text-black underline underline-offset-4 decoration-1 decoration-accent"
          emailSuffix={<span aria-hidden="true"> ↗</span>}
        >
          Say Hello
        </SayHello>
        <a
          href={socials.resume}
          target="_blank"
          rel="noopener noreferrer"
          title={cv.title}
          onClick={() => setOpen(false)}
          className="mt-2 inline-flex min-h-11 items-center text-[19px] text-black"
        >
          {cv.nav} <span aria-hidden="true">&nbsp;↗</span>
          <span className="sr-only"> (PDF, opens in a new tab)</span>
        </a>
      </div>
    </>
  );
}

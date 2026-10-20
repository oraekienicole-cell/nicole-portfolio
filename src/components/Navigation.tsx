import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, usePathname } from '../lib/router';
import { useScrollFrame } from '../hooks/useScrollFrame';
import { cv, socials } from '../data/socials';
import { SayHello } from './ui/SayHello';

const links = [
  { label: 'Work', to: '/#work' },
  { label: 'About', to: '/#about' },
  { label: 'Writing', to: '/#writing' },
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
  // Layout effect so the lock is released in the same commit the menu closes,
  // before any section jump triggered by the tap runs.
  useLayoutEffect(() => {
    if (!open) return;
    // Lock the page behind the menu (html too, for iOS Safari).
    const html = document.documentElement;
    const prev = { body: document.body.style.overflow, html: html.style.overflow };
    document.body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev.body;
      html.style.overflow = prev.html;
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
          <Link to="/" className="flex min-h-11 items-center" aria-label="Nicole Oraekie, home">
            <span className="wordmark text-[21px] sm:text-[26px] leading-none transition-opacity hover:opacity-60">
              Nicole Oraekie
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
                className="hover:opacity-60 transition-opacity"
              >
                {cv.nav}
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </li>
          </ul>

          <SayHello
            className="hidden lg:inline text-[16px] xl:text-[19px] 2xl:text-[21px] leading-none whitespace-nowrap underline underline-offset-2 decoration-1 hover:opacity-60 transition-opacity"
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
        className="lg:hidden fixed inset-0 z-[9] overflow-y-auto overscroll-contain bg-white/95 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
        inert={!open}
        aria-hidden={!open}
      >
        {/* Centred when it fits; scrolls (clear of the header) on short phones */}
        <div className="flex min-h-full flex-col justify-center px-6 sm:px-8 pt-24 pb-12">
          <ul className="flex flex-col">
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
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center py-1.5 font-display text-[length:clamp(28px,8.4vw,40px)] leading-[1.08] tracking-[-0.02em] text-black text-balance"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-1 border-t border-black/15 pt-6">
            <SayHello
              onClick={() => setOpen(false)}
              className="inline-flex min-h-12 w-fit items-center font-display text-[length:clamp(26px,7.4vw,34px)] leading-none text-black underline underline-offset-4 decoration-1 decoration-accent"
            >
              Say Hello
            </SayHello>
            <a
              href={socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              title={cv.title}
              onClick={() => setOpen(false)}
              className="inline-flex min-h-12 w-fit items-center text-[19px] text-black underline underline-offset-4 decoration-1 decoration-black/30"
            >
              {cv.nav}
              <span aria-hidden="true" className="ml-2 text-[14px] text-black/55 no-underline">
                PDF
              </span>
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

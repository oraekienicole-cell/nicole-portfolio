import { useLayoutEffect, useRef } from 'react';
import { scrollToHash, usePathname } from './lib/router';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { NotFound, Project } from './pages/Project';

export default function App() {
  const path = usePathname();
  const main = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  // After each route change: jump to the requested section (or the top) and move focus for screen readers.
  useLayoutEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => scrollToHash(hash, false));
    } else if (!firstRender.current) {
      window.scrollTo(0, 0);
    }
    if (!firstRender.current) main.current?.focus({ preventScroll: true });
    firstRender.current = false;
  }, [path]);

  const workMatch = path.match(/^\/work\/([^/]+)\/?$/);

  return (
    <>
      <Navigation />
      <main id="main" ref={main} tabIndex={-1} className="outline-none">
        {path === '/' ? <Home /> : workMatch ? <Project slug={workMatch[1]} /> : <NotFound />}
      </main>
      <div className="relative z-[1] bg-paper">
        <Footer />
      </div>
    </>
  );
}

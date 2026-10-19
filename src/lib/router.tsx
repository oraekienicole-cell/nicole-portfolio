import { useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from 'react';

/*
 * A deliberately tiny router: pathname-based, History API, no dependency.
 * Routes: "/" and "/work/:slug". Hash links ("/#writing") scroll to sections.
 */

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener('popstate', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('popstate', listener);
  };
}

export function usePathname() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.pathname,
    () => '/',
  );
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollToHash(hash: string, smooth = true) {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto', block: 'start' });
  return true;
}

export function navigate(to: string) {
  const url = new URL(to, window.location.href);
  const current = window.location.pathname;

  if (url.pathname === current && url.hash) {
    window.history.pushState(null, '', url.pathname + url.hash);
    scrollToHash(url.hash);
    return;
  }

  window.history.pushState(null, '', url.pathname + url.search + url.hash);
  listeners.forEach((l) => l());
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

export function Link({ to, onClick, target, ...rest }: LinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || target === '_blank') return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={to} target={target} onClick={handleClick} {...rest} />;
}

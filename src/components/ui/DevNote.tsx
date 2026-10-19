import type { ReactNode } from 'react';

/**
 * A note for whoever is editing the site. Rendered only by the dev server
 * (npm run dev) and stripped from production builds, so visitors never see it.
 */
export function DevNote({ children, className = '' }: { children: ReactNode; className?: string }) {
  if (!import.meta.env.DEV) return null;
  return (
    <p
      role="note"
      className={`border border-dashed border-accent/60 bg-accent/[0.05] px-4 py-3 text-[13px] leading-[1.5] text-accent-ink ${className}`}
    >
      <span className="font-medium">Dev only · </span>
      {children}
    </p>
  );
}

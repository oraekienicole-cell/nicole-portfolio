type Props = {
  index: string;
  children: string;
  tone?: 'light' | 'dark';
};

/** The small running header that opens every chapter: "03 —— Case studies". */
export function SectionLabel({ index, children, tone = 'light' }: Props) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${tone === 'dark' ? 'text-white/60' : 'text-mute'}`}>
      <span className={`tabular ${tone === 'dark' ? 'text-accent' : 'text-accent-ink'}`}>{index}</span>
      <span aria-hidden="true" className={`h-px w-8 ${tone === 'dark' ? 'bg-white/30' : 'bg-ink/25'}`} />
      <span>{children}</span>
    </p>
  );
}

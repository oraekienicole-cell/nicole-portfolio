/**
 * Renders a before/after figure such as "~90 to ~500": the numbers at full
 * size, "to" set small in the accent colour. Values without " to " render as-is.
 */
export function Change({ text }: { text: string }) {
  const parts = text.split(' to ');
  if (parts.length !== 2) return <>{text}</>;
  return (
    <>
      {parts[0]}
      <span className="mx-[0.12em] align-[0.2em] font-sans text-[0.3em] font-normal tracking-normal text-accent">
        {' to '}
      </span>
      {parts[1]}
    </>
  );
}

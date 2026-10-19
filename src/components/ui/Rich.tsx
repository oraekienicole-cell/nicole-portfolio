/**
 * Renders content strings.
 *
 * Safety net: unresolved "[ADD ...]" notes must never reach the public site.
 * If one slips into the content, it is dropped from the page (and flagged in
 * the dev console) rather than shown. Missing facts belong in
 * source-material/content-gaps.md, not in the data files.
 */
const TOKEN = /\s*\[ADD [^\]]+\]/g;

export function Rich({ text }: { text: string }) {
  if (!TOKEN.test(text)) return <>{text}</>;
  TOKEN.lastIndex = 0;
  if (import.meta.env.DEV) console.warn(`Unresolved placeholder hidden from the page: "${text}"`);
  return <>{text.replace(TOKEN, '').trim()}</>;
}

export const isPlaceholder = (value: string) => /\[ADD [^\]]+\]/.test(value);

/*
 * Every external link on the site comes from here. Change a value once and
 * the navigation, hero, About and Contact sections all update together.
 *
 * - Anything still set to "[ADD ...]" (or left blank) is never shown on the
 *   public site. In development, a dashed note marks where it will appear.
 * - `email` powers every "Say Hello" button: they open the visitor's email app
 *   with this address filled in (mailto:).
 * - `resume` can be the local PDF (put the file at public/nicole-oraekie-cv.pdf)
 *   or a full URL (Google Drive, Notion, etc.) if you'd rather host it elsewhere.
 */
export const socials = {
  // ↓ Nicole's email. Every "Say Hello" on the site becomes mailto:<this address>.
  email: "[ADD NICOLE'S REAL EMAIL HERE]",
  linkedin: '[ADD LINKEDIN URL]',
  medium: "https://medium.com/@oraekienicole",
  resume: '/nicole-oraekie-cv.pdf',

  // Optional: only appear once filled in.
  github: '',
  x: '',
};

/** The CV's labels: plain on purpose, so recruiters never have to guess. */
export const cv = {
  nav: 'View CV',
  about: 'View my CV',
  contact: 'CV / Resume',
  title: 'Nicole Oraekie’s CV (PDF, opens in a new tab)',
};

/** True once a value is a real address rather than blank or a placeholder. */
export const isSet = (value?: string): value is string => !!value && !/\[ADD /.test(value);

/** mailto: link for Nicole's email, or null until the email is filled in. */
export const mailto = (subject?: string) =>
  isSet(socials.email)
    ? `mailto:${socials.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
    : null;

/** Where a "Say Hello" goes: straight to email when there is one, otherwise the contact section. */
export const sayHelloHref = (subject?: string) => mailto(subject) ?? '/#contact';

/** "https://www.linkedin.com/in/nicole/" → "linkedin.com/in/nicole" */
export const displayUrl = (url: string) =>
  url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');

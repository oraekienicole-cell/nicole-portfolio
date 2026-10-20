/*
 * Kind words: excerpts from real LinkedIn recommendations for Nicole (Ifeoma).
 *
 * Rules:
 * - Quotes are the recommenders' own words. Trim if you must; never reword.
 * - A testimonial is shown once its `quote` is real. The attribution reads:
 *     Name (linked to LinkedIn when `linkedin` is set)
 *     Role, Company (only once they're real)
 *   `relationship` is kept for reference but not shown.
 *   "[ADD ...]" placeholders never reach the page.
 * - `linkedin`: the recommender's profile URL. When set, their name links to it.
 * - `featured`: the lead quote. Its first sentence is set largest.
 * - `hidden`: kept here, but not shown on the site.
 *
 * Order matters: the first entry is shown first (on mobile, one at a time).
 */
import { isSet } from './socials';

export type Testimonial = {
  /** The main excerpt, without surrounding quotation marks. */
  quote: string;
  /** An optional second excerpt from the same recommendation, shown smaller. */
  excerpt?: string;
  name: string;
  role: string;
  company?: string;
  /** How they know Nicole, e.g. "Mentor". */
  relationship?: string;
  linkedin?: string;
  featured?: boolean;
  hidden?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'What truly sets Ifeoma apart is her passion for execution. She doesn’t just develop impactful strategies; she ensures they are implemented with precision to achieve outstanding outcomes.',
    // Optional excerpt from the same recommendation (not shown; move into `excerpt` to use it):
    // 'She is not only an expert in the marketing space but also a dynamic thinker who stays ahead of the curve by leveraging the latest trends and strategies to bring results.'
    name: 'Akpan Victor',
    role: 'Founder',
    company: 'IQOR',
    relationship: 'Mentor',
    linkedin: '[ADD LINKEDIN URL]',
    featured: true,
  },
  {
    quote:
      'Ifeoma excels at creating awareness for a brand and identifying opportunities. She is also a collaborative team member who thrives in working well with other departments, including product and marketing.',
    excerpt: 'She will be an asset to any organization fortunate enough to work with her.',
    name: 'Tolulope Abiodun',
    role: 'Business Development Manager',
    company: 'Maplerad',
    relationship: 'Worked directly with Ifeoma',
    linkedin: '[ADD LINKEDIN URL]',
  },
  {
    quote: 'Her research and creative problem-solving skills were invaluable to our team.',
    excerpt:
      'She played a pivotal role in establishing the marketing department, creating content and marketing strategies that increased our market presence.',
    name: 'Emmanuel Ezenwere',
    role: 'CEO',
    company: 'Arone Energy',
    relationship: 'Former teammate',
    linkedin: '[ADD LINKEDIN URL]',
  },
  {
    // Kept in reserve: the three above make the stronger composition.
    quote:
      'Ifeoma had amazing creative writing skills and an extensive background in copy across multiple verticals. She is a pleasure to work with.',
    name: 'Del Aryiku',
    role: '[ADD ROLE FROM LINKEDIN]',
    company: '[ADD COMPANY]',
    relationship: 'Client',
    linkedin: '[ADD LINKEDIN URL]',
    hidden: true,
  },
];

/** What the page shows: visible entries with a real quote, featured first. */
export const publishedTestimonials = testimonials
  .filter((t) => !t.hidden && isSet(t.quote))
  .sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

/** Entries on the page still missing a real name (for the dev-only note). */
export const missingNames = publishedTestimonials.filter((t) => !isSet(t.name)).length;

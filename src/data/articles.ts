/*
 * Writing. Real, published pieces only.
 *
 * - An article appears on the site once its `title` and `description` are real
 *   (no "[ADD ...]"). Unverified entries stay here, invisible, until confirmed.
 * - `featured`: shown first, with a slightly stronger treatment.
 * - Every link opens in a new tab.
 * - Descriptions summarise the piece in plain terms; don't add claims the
 *   article doesn't make.
 */
import { isSet } from './socials';

export type Article = {
  title: string;
  publication?: string;
  category: string;
  description: string;
  url: string;
  featured?: boolean;
};

export const articles: Article[] = [
  {
    title: 'What Fintech Companies Get Wrong About Positioning',
    publication: 'Medium',
    category: 'Fintech · Positioning',
    description:
      'Why fintech positioning often collapses into features, infrastructure language and generic claims — and what it takes to make the value actually mean something to the customer.',
    url: 'https://medium.com/@oraekienicole/what-fintech-companies-get-wrong-about-positioning-427dc2827a63',
    featured: true,
  },
  {
    title: 'Credit Risk Model Validation: Strengthening Risk Assessment with Consensus Credit Ratings',
    publication: 'Credit Benchmark',
    category: 'Fintech · Credit risk',
    description:
      'A look at how consensus credit ratings can strengthen model validation and give financial institutions another lens for assessing credit risk.',
    url: 'https://docs.google.com/document/d/1xl810hVJm1O07gNH4MO_rTFbsvR3soqL4bTSi0s-Dog/edit?usp=sharing',
  },
  {
    title: 'Usage-Based Pricing: Why It’s Better for Your Business than Pure Subscriptions',
    publication: 'The CFO Club',
    category: 'B2B · Pricing',
    description:
      'An exploration of usage-based pricing and what changes when customers pay in proportion to the value or usage they receive.',
    url: 'https://docs.google.com/document/d/100BO-Boc6ZtDtRpkaoOke4o7qU2N1_1LXxlBkth_OdQ/edit?usp=sharing',
  },
  {
    title: 'Challenges and Use Cases of Generative AI in Finance',
    publication: 'GAP',
    category: 'AI · Finance',
    description:
      'A practical look at where generative AI can help finance teams, where it still struggles, and why implementation matters as much as capability.',
    url: 'https://docs.google.com/document/d/1VqXcEGBfYQioucvC63I6ZIIoEJ3WmbQ4bxLFlOjiXdY/edit?usp=sharing',
  },
  {
    // Not shown until the title and description are verified.
    // (The Google Doc itself is titled "(The CFOClub) How to Find the Best Payments Management System".)
    title: '[ADD VERIFIED TITLE]',
    publication: '[ADD PUBLICATION]',
    category: '[ADD CATEGORY]',
    description: '[ADD VERIFIED DESCRIPTION]',
    url: 'https://docs.google.com/document/d/1bDDoTZbgvebWnS6mFeyJ7rCKpjGwwOJ6jPrgM12ZOYs/edit?usp=sharing',
  },
];

/** What the page shows: verified articles, featured first. */
export const publishedArticles = articles
  .filter((a) => isSet(a.title) && isSet(a.description) && isSet(a.category))
  .sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

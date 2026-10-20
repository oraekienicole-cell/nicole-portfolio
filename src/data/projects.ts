/*
 * Project content. Add a project by appending to `projects`.
 *
 * Every case study answers the same six questions (see chapters.ts):
 * what was happening, what mattered, what I bet on, what I made,
 * what changed, and what I'd do differently.
 *
 * Content rule: nothing here may be invented, and nothing unfinished may be
 * published. If a fact isn't verified, leave the field out and log the gap in
 * source-material/content-gaps.md. Empty chapters are skipped on the page.
 */

export type ProjectPreview = {
  /** Small line above the big text in the cursor preview. */
  kicker: string;
  /** One short typographic "cover" for the project. Not a claim. */
  big: string;
  tone: 'ink' | 'accent' | 'paper';
};

export type ApproachItem = {
  area: string;
  detail: string;
};

export type Project = {
  slug: string;
  title: string;
  company: string;
  /** Eyebrow, e.g. "Fintech infrastructure". */
  category: string;
  /** Work type, e.g. "Product marketing · Positioning · Lifecycle". */
  descriptor: string;
  /** One line for the work index: the kind of problem this was. */
  problem: string;
  /** The case study's subheading. */
  headline: string;
  /** Optional paragraph under the headline on the case-study page. */
  standfirst?: string;
  /** A short paragraph for previews on the homepage. */
  summary: string;
  role?: string;
  timeframe?: string;
  /** One short, verified outcome for the work index. Leave undefined rather than guess. */
  outcome?: string;
  /** The headline number on the case-study page. Verified only. */
  metric?: { value: string; caption: string };
  preview: ProjectPreview;
  /** Internal link override (e.g. a section on the homepage instead of a case-study page). */
  href?: string;

  /* Case-study chapters */
  context?: string[];
  challenge?: string[];
  bet?: string[];
  approachIntro?: string;
  approach?: ApproachItem[];
  results?: string[];
  reflection?: string[];
  media?: { src: string; alt: string; caption?: string }[];
};

export const projects: Project[] = [
  {
    slug: 'maplerad',
    title: 'Maplerad',
    company: 'Maplerad',
    category: 'B2B fintech infrastructure',
    descriptor: 'GTM messaging · Onboarding · B2B growth',
    problem: 'Selling financial infrastructure to businesses: GTM messaging, objection handling and onboarding.',
    headline: 'Selling financial infrastructure to businesses.',
    standfirst:
      'GTM messaging, objection handling and onboarding for a B2B fintech infrastructure product. Monthly B2B revenue grew from about $1K to $8.5K.',
    summary:
      'GTM messaging, objection handling and onboarding for a B2B fintech infrastructure product. Monthly B2B revenue grew from about $1K to $8.5K.',
    outcome: '~$1K to ~$8.5K monthly B2B revenue',
    metric: { value: '$1K to $8.5K', caption: 'Approximate monthly B2B revenue.' },
    preview: { kicker: 'Monthly B2B revenue', big: '$1K to $8.5K', tone: 'ink' },
    context: [
      'Maplerad builds financial infrastructure that other businesses build on. I worked on GTM messaging, onboarding and how the product’s value was communicated to business customers.',
    ],
    challenge: [
      'Infrastructure is hard to sell. Customers buy what it lets them do, and two groups need convincing: the people who integrate it and the people who pay for it. Unclear messaging shows up later as objections and stalled onboarding.',
    ],
    bet: [
      'Treat the sales problem as an explanation problem. If a business could see what the product would let them do, why it was safe to rely on and what getting started involved, fewer conversations would stall on the same questions.',
    ],
    approach: [
      {
        area: 'GTM messaging',
        detail: 'Led with what customers could build or fix, and brought in technical detail where it built trust.',
      },
      {
        area: 'Customer objections',
        detail: 'Fed recurring objections back into the messaging, so they were answered earlier in the journey.',
      },
      { area: 'Onboarding', detail: 'Worked on the path from interest to first use, where infrastructure deals tend to stall.' },
      {
        area: 'Product value',
        detail: 'Translated platform capabilities into outcomes a business could picture, without losing the detail technical buyers check.',
      },
      { area: 'B2B growth', detail: 'Measured the work against monthly B2B revenue.' },
    ],
    results: [
      'Monthly B2B revenue grew from about $1,000 to about $8,500.',
      'Revenue has more than one cause. Messaging, objection handling and onboarding were all aimed at it.',
    ],
  },
  {
    slug: 'stakeet',
    title: 'Stakeet',
    company: 'Stakeet',
    category: 'Product marketing · Growth',
    descriptor: 'Positioning · Onboarding · Lifecycle · Adoption',
    problem: 'Turning signups into repeat users: positioning, onboarding and lifecycle.',
    headline: 'Turning signups into repeat users.',
    standfirst: 'Five months across positioning, onboarding and lifecycle. Users grew from about 90 to about 500.',
    summary: 'Five months across positioning, onboarding and lifecycle. Users grew from about 90 to about 500.',
    timeframe: 'About five months',
    outcome: '~90 to ~500 users in about five months',
    metric: { value: '~90 to ~500', caption: 'Approximate users, over about five months.' },
    preview: { kicker: 'Users, over five months', big: '90 to 500', tone: 'accent' },
    context: [
      'Early-stage product with early traction. The open question was how to turn interest into repeat use.',
    ],
    challenge: [
      'Stakeet had an acquisition problem and an adoption problem. Understanding dropped off between first visit, signup and coming back, so more signups alone wouldn’t fix growth.',
    ],
    bet: [
      'Treat positioning, onboarding, lifecycle and adoption as one system. If the promise was unclear before signup, onboarding couldn’t rescue it. If first use didn’t show the value, lifecycle messages would only remind people of something they didn’t want yet.',
    ],
    approach: [
      {
        area: 'Positioning and messaging',
        detail: 'Clarified who Stakeet was for and which problem to lead with, so the value was clear before anyone signed up.',
      },
      {
        area: 'Onboarding and adoption',
        detail: 'Mapped the path from signup to first value and focused on the points where users dropped off.',
      },
      {
        area: 'Lifecycle',
        detail: 'Used post-signup messages for context, reasons to return and a clear next step, not more notifications.',
      },
      {
        area: 'Growth',
        detail: 'Ran growth as a series of questions: which messages brought the right users, which moments built momentum, which channels earned another round.',
      },
      {
        area: 'AI-assisted workflows',
        detail: 'Used AI to speed up research, drafting and iteration, leaving more time to decide what to test.',
      },
    ],
    results: [
      'Users grew from about 90 to about 500 in roughly five months.',
      'No single campaign did that. Adoption improved once positioning, acquisition and the post-signup experience worked as one journey.',
    ],
    reflection: [
      'Instrument the journey earlier. Better behavioural data from the start would have made each iteration faster and fewer decisions instinctive.',
    ],
  },
  {
    // Index entry only: the full case study returns once the details are confirmed
    // (see source-material/content-gaps.md).
    slug: 'roam',
    title: 'Roam',
    company: 'Roam',
    category: 'Consumer product · Content strategy',
    descriptor: 'Content strategy · Audience behaviour · Distribution',
    problem: 'Content strategy for a consumer product.',
    headline: 'Content strategy for a consumer product.',
    summary: 'Content strategy for a consumer product.',
    preview: { kicker: 'Consumer product', big: 'Roam', tone: 'paper' },
  },
  {
    slug: 'iglare-optics',
    title: 'Iglare Optics',
    company: 'Iglare Optics',
    category: 'Founder · Brand & growth',
    descriptor: 'Founder · Acquisition · Retention · Partnerships',
    problem: 'Acquisition, retention and revenue for a company I founded.',
    headline: 'Acquisition, retention and revenue for a company I founded.',
    standfirst: '1M+ TikTok impressions, about 35% better retention and about 25% monthly revenue growth.',
    summary: '1M+ TikTok impressions, about 35% better retention and about 25% monthly revenue growth.',
    role: 'Founder',
    outcome: '1M+ TikTok impressions · ~35% better retention',
    metric: { value: '1M+', caption: 'TikTok impressions, alongside about 35% better retention.' },
    preview: { kicker: 'TikTok impressions', big: '1M+', tone: 'ink' },
    context: [
      'I founded Iglare Optics and ran its marketing: positioning, distribution, partnerships and retention. The Tony Elumelu Foundation backed it with a $5,000 founder grant.',
    ],
    challenge: [
      'No marketing team. I had to find customers, earn their trust, bring them back and turn attention into revenue.',
    ],
    bet: [
      'Reach alone wouldn’t carry the business. The experience after purchase needed as much attention as acquisition.',
    ],
    approach: [
      {
        area: 'Distribution',
        detail: 'Built an audience on TikTok and turned it into an acquisition channel: more than 1M organic impressions.',
      },
      { area: 'Partnerships', detail: 'Built partnerships with optometrists in Nigeria.' },
      { area: 'Customers', detail: 'Won customers outside Nigeria as well as at home.' },
      { area: 'Retention', detail: 'Focused on the post-purchase experience. Retention improved by about 35%.' },
    ],
    results: [
      'About 35% better retention and about 25% month-on-month revenue growth, reaching roughly ₦600k–₦1m a month.',
      'International customers, optometrist partnerships and a $5,000 Tony Elumelu Foundation grant.',
    ],
  },
];

export const caseStudies = projects.filter((p) => p.context);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Where a project row links: its case study, an override, or nowhere yet. */
export const projectHref = (p: Project) => p.href ?? (p.context ? `/work/${p.slug}` : undefined);

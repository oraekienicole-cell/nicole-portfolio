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
    category: 'Fintech infrastructure',
    descriptor: 'Product marketing · GTM messaging · Onboarding · B2B growth',
    problem: 'Making financial infrastructure easier to understand, easier to trust and easier to buy.',
    headline: 'Explaining the plumbing to people who only care about the water.',
    standfirst:
      'Selling financial infrastructure means selling something most customers should never have to think deeply about. My job was to make the technical value easier to understand, easier to trust and easier to buy.',
    summary:
      'Selling financial infrastructure means selling something most customers should never have to think deeply about. The work was making its value easier to understand, trust and buy, and monthly B2B revenue grew from roughly $1K to $8.5K.',
    outcome: '~$1K → ~$8.5K monthly B2B revenue',
    metric: { value: '$1K → $8.5K', caption: 'Approximate monthly B2B revenue growth.' },
    preview: { kicker: 'Monthly B2B revenue', big: '$1K → $8.5K', tone: 'ink' },
    context: [
      'Maplerad builds financial infrastructure for businesses: the layer other products are built on, and that their customers rarely see.',
      'I worked on the commercial side of that problem: GTM messaging, onboarding, and how the product’s value was explained to the businesses deciding whether to build on it.',
    ],
    challenge: [
      'Infrastructure has an awkward marketing problem. When it works, nobody notices it, so customers end up buying what it lets them do rather than the thing itself. The story has to start somewhere the product is barely visible.',
      'It also has to survive two kinds of scrutiny at once. The people integrating it want to know how it behaves. The people paying for it want to know what it unlocks, what happens if it fails, and why they should trust a provider with their money movement. In B2B, unclear messaging rarely fails loudly. It shows up later as objections, slower evaluations and onboarding that stalls before anything goes live.',
    ],
    bet: [
      'A lot of what looks like a sales problem in infrastructure is really an explanation problem. If a business can see what the product will let them do, why it is safe to rely on, and what getting started actually involves, fewer conversations stall on the same questions.',
      'So the messaging, the answers to objections and the onboarding path had to tell one consistent story, rather than three slightly different ones.',
    ],
    approachIntro:
      'The work sat where technical capability meets a commercial decision: someone has to understand it, someone has to approve it, and someone has to actually get it running.',
    approach: [
      {
        area: 'GTM messaging',
        detail:
          'Shaped how the product’s value was framed for the businesses evaluating it: lead with what they could build or fix, and bring in the technical detail where it earns trust rather than where it demands attention.',
      },
      {
        area: 'Customer objections',
        detail:
          'Treated recurring objections as feedback on the messaging. When the same question keeps coming up late in a conversation, the explanation earlier in the journey usually needs to change.',
      },
      {
        area: 'Onboarding',
        detail:
          'Worked on the path from interest to first use, because in infrastructure the gap between saying yes and actually integrating is where momentum quietly disappears.',
      },
      {
        area: 'Technical value',
        detail:
          'Translated capabilities into outcomes a business could picture, without sanding off the detail that makes them credible to the people who have to build with them.',
      },
      {
        area: 'B2B growth',
        detail: 'Kept the messaging and onboarding work pointed at the number that mattered commercially: monthly B2B revenue.',
      },
    ],
    results: [
      'Monthly B2B revenue grew from roughly $1,000 to roughly $8,500.',
      'Revenue always has more than one cause, and I would not claim this one for messaging alone. What I can say is that clearer value communication, better answers to objections and a smoother way into the product were all aimed at the same commercial outcome, and that outcome moved.',
    ],
  },
  {
    slug: 'stakeet',
    title: 'Stakeet',
    company: 'Stakeet',
    category: 'Product marketing · Growth',
    descriptor: 'Product marketing · Positioning · Lifecycle · Adoption',
    problem: 'Closing the gap between signing up and sticking around.',
    headline: 'Making adoption somebody’s problem. Mine, apparently.',
    standfirst: 'Five months of treating acquisition, understanding and repeat use as the same growth problem.',
    summary: 'Five months of treating acquisition, understanding and repeat use as the same growth problem.',
    timeframe: 'About five months',
    outcome: '~90 → ~500 users in about five months',
    metric: { value: '~90 → ~500', caption: 'Approximate user growth over five months.' },
    preview: { kicker: 'Users, over five months', big: '90 → 500', tone: 'accent' },
    context: [
      'Stakeet was still at the stage where every new user taught us something. The product had early traction, but the bigger question was how to turn interest into repeat behaviour and build a clearer path from discovering the product to actually understanding why it belonged in someone’s routine.',
    ],
    challenge: [
      'Getting someone to sign up is one problem. Giving them a reason to come back is another.',
      'The work quickly became less about “getting more users” in the abstract and more about finding where understanding dropped off: what people thought Stakeet was, what they saw when they arrived, what happened after signup, and what would make the product worth returning to.',
    ],
    bet: [
      'My bet was that the growth problem wasn’t sitting in one channel. It was spread across the whole journey. If the promise was unclear before signup, onboarding could not rescue it. If the first-use experience did not make the value obvious, lifecycle messaging would only remind people about something they had not yet learned to want.',
      'So I treated positioning, onboarding, lifecycle and adoption as one connected system rather than separate marketing tasks.',
    ],
    approachIntro:
      'I worked across the parts of the journey where product understanding could break down: how Stakeet was positioned, what users encountered before trying it, what happened after signup, and what might bring them back.',
    approach: [
      {
        area: 'Positioning and messaging',
        detail:
          'Worked on making the product’s value easier to understand before users ever reached the product itself: who it was for, what problem deserved to lead, and what language made that value immediately legible.',
      },
      {
        area: 'User journey and adoption',
        detail:
          'Looked at the path from signup to the first meaningful moment of value, then focused attention on the points where curiosity could turn into confusion or drop-off.',
      },
      {
        area: 'Lifecycle communication',
        detail:
          'Used post-signup communication to support the product experience rather than simply generate more notifications: giving users context, reasons to return and clearer next steps.',
      },
      {
        area: 'Growth',
        detail:
          'Ran growth work as a series of questions rather than disconnected campaigns: which messages attracted the right people, which moments created momentum, and which channels deserved another iteration.',
      },
      {
        area: 'AI-assisted marketing workflows',
        detail:
          'Used AI to accelerate research, drafting and iteration so more time could go into judgment: deciding what was actually worth testing, what the evidence suggested and what needed to change next.',
      },
    ],
    results: [
      'Over roughly five months, Stakeet’s user base grew from around 90 to around 500.',
      'I would not pretend one message or campaign created that growth by itself. The more useful takeaway was that adoption improved when positioning, acquisition and the post-signup experience stopped behaving like separate projects.',
    ],
    reflection: [
      'I would instrument the journey earlier. Growth gives you a much better education when you can see exactly where people hesitate, disappear or return. More behavioural data earlier would have made the iteration loop faster and some of the decisions less instinctive.',
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
    problem: 'Earning attention from people who didn’t ask for anything new.',
    headline: 'Letting the product make its own case, in places people already look.',
    summary:
      'Consumers decide in seconds, and rarely by reading. The work started with how people actually behave, then put the product’s best argument where they were already paying attention.',
    preview: { kicker: 'Consumer product', big: 'Audience first', tone: 'paper' },
  },
  {
    slug: 'iglare-optics',
    title: 'Iglare Optics',
    company: 'Iglare Optics',
    category: 'Founder · Brand & growth',
    descriptor: 'Founder · Positioning · Distribution · Retention',
    problem: 'Every marketing job at once, for a company I started.',
    headline: 'Before product marketing was my job title, it was something I had to figure out because the product was mine.',
    summary:
      'The company I founded, and my crash course in the parts of marketing that look much cleaner in a framework than they do with your own money involved.',
    role: 'Founder',
    outcome: '1M+ TikTok impressions · ~35% better retention',
    metric: { value: '1M+', caption: 'TikTok impressions, alongside a roughly 35% improvement in retention.' },
    preview: { kicker: 'TikTok impressions', big: '1M+', tone: 'ink' },
    context: [
      'I founded Iglare Optics, which meant every marketing decision in the company was mine: what to say, who to say it to, where to show up, and what happened once someone had bought.',
      'The Tony Elumelu Foundation backed the company with a $5,000 founder grant.',
    ],
    challenge: [
      'Iglare Optics became my crash course in the parts of marketing that look much cleaner in a framework than they do when your own money, customers and inventory are involved. I had to work out what people wanted, how to reach them, why they came back and what actually translated attention into revenue.',
      'There was no marketing team to brief. Every one of those questions landed on the same desk, usually in the same week.',
    ],
    bet: [
      'Reach was never going to be enough on its own. Attention only mattered if it led somewhere, first to a purchase and then to a second one, so the experience after acquisition deserved as much deliberate attention as the acquisition itself.',
    ],
    approachIntro: 'Every channel had to earn its place. These are the ones that did.',
    approach: [
      {
        area: 'Distribution',
        detail:
          'Built an audience on TikTok and turned social content into a meaningful acquisition channel, reaching more than 1M impressions organically.',
      },
      {
        area: 'Partnerships',
        detail:
          'Partnered with optometrists in Nigeria. In a category tied to eye health, professional trust is not a nice-to-have.',
      },
      { area: 'Customers', detail: 'Won customers internationally as well as at home.' },
      {
        area: 'Retention',
        detail:
          'Became more deliberate about the experience after acquisition, not just the acquisition itself. Retention improved by roughly 35%.',
      },
    ],
    results: [
      'Retention improved by roughly 35%, and revenue grew roughly 25% month on month, with monthly revenue reaching approximately ₦600k–₦1m.',
      'Along the way: international customers, working partnerships with Nigerian optometrists, and a $5,000 grant from the Tony Elumelu Foundation.',
    ],
  },
];

export const caseStudies = projects.filter((p) => p.context);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Where a project row links: its case study, an override, or nowhere yet. */
export const projectHref = (p: Project) => p.href ?? (p.context ? `/work/${p.slug}` : undefined);

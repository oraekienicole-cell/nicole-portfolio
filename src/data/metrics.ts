/*
 * The evidence section. Every number here was supplied by Nicole and verified.
 * Each one carries its context so it can't be read as more than it is.
 * Don't add a number without a source; log missing context in
 * source-material/content-gaps.md rather than on the page.
 */

export type Metric = {
  value: string;
  label: string;
  where: string;
  note: string;
};

export const metrics: Metric[] = [
  {
    value: '~90 to ~500',
    label: 'Stakeet users',
    where: 'Stakeet',
    note: 'Approximate users over about five months, while I worked on positioning, onboarding and lifecycle. Growth had more than one cause.',
  },
  {
    value: '$1K to $8.5K',
    label: 'Monthly B2B revenue',
    where: 'Maplerad',
    note: 'Approximate monthly B2B revenue over the period I worked on GTM messaging, onboarding and product value communication. Revenue had more than one cause.',
  },
  {
    value: '1M+',
    label: 'TikTok impressions',
    where: 'Iglare Optics',
    note: 'Organic impressions for Iglare Optics, which turned social content into an acquisition channel.',
  },
  {
    value: '35%',
    label: 'Retention improvement',
    where: 'Iglare Optics',
    note: 'Approximate improvement in customer retention after focusing on the post-purchase experience.',
  },
  {
    value: '25%',
    label: 'Monthly revenue growth',
    where: 'Iglare Optics',
    note: 'Approximate month-on-month revenue growth, reaching roughly ₦600k–₦1m a month.',
  },
  {
    value: '$5K',
    label: 'Tony Elumelu Foundation grant',
    where: 'Iglare Optics',
    note: 'Founder grant awarded to Iglare Optics.',
  },
];

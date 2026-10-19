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
    value: '~90 → ~500',
    label: 'Stakeet users',
    where: 'Stakeet',
    note: 'Approximate user growth over about five months, while I worked on positioning, lifecycle and adoption. Growth has more than one parent, so read this as the period’s result rather than mine alone.',
  },
  {
    value: '$1K → $8.5K',
    label: 'Monthly B2B revenue',
    where: 'Maplerad',
    note: 'Approximate growth in monthly B2B revenue across the period I worked on GTM messaging, onboarding and how the product’s value was communicated. A commercial result with several contributors, my work among them.',
  },
  {
    value: '1M+',
    label: 'TikTok impressions',
    where: 'Iglare Optics',
    note: 'Organic reach generated while building Iglare’s audience and turning social content into a meaningful acquisition channel.',
  },
  {
    value: '35%',
    label: 'Retention improvement',
    where: 'Iglare Optics',
    note: 'An approximate improvement in customer retention as Iglare became more deliberate about the experience after acquisition, not just the acquisition itself.',
  },
  {
    value: '25%',
    label: 'Monthly revenue growth',
    where: 'Iglare Optics',
    note: 'Approximate month-on-month revenue growth during the growth period, with monthly revenue reaching roughly ₦600k–₦1m.',
  },
  {
    value: '$5K',
    label: 'Tony Elumelu Foundation grant',
    where: 'Iglare Optics',
    note: 'Founder grant awarded to support the growth of Iglare Optics.',
  },
];

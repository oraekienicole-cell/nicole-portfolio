/*
 * Speaking. Real appearances only; add new ones to the top.
 *
 * Every field except `event` is optional, and anything left out simply
 * doesn't render. Never invent a title, date or link.
 *
 * - `image`: a file in public/images/speaking/ (e.g. "/images/speaking/search-africon.jpg").
 *   If the file is missing, the entry shows without an image (no broken icon).
 * - `imagePosition`: which part of the photo to keep when it's cropped,
 *   as CSS object-position (e.g. "50% 40%" keeps a little above centre).
 * - `url`: a recording, event page or post showing the talk. When set, the event
 *   name and a small text link ("See the event" by default, or `cta`) open it
 *   in a new tab.
 *
 * Details below come from Nicole, or are legible in her photos from each event.
 */

export type SpeakingItem = {
  event: string;
  /** Talk title or topic, once confirmed. */
  title?: string;
  /** e.g. "Talk", "Panel". */
  format?: string;
  date?: string;
  location?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  url?: string;
  /** Link label, e.g. "Watch the talk". Defaults to "See the event". */
  cta?: string;
  description?: string;
};

export const speaking: SpeakingItem[] = [
  {
    event: 'Search Africon',
    format: 'Talk',
    image: '/images/speaking/search-africon.jpg',
    imageAlt: 'Nicole Oraekie on stage at Search Africon, with a slide titled “Analysis paralysis” on the screen behind her.',
    imagePosition: '50% 45%',
    description:
      'On analysis paralysis in marketing data: set the objective first (more leads, higher ROI, better engagement), then track only the metrics that support it.',
  },
  {
    event: 'FCDC Meetup Abuja',
    format: 'Conversation',
    location: 'Abuja',
    image: '/images/speaking/fcdc-abuja.jpg',
    imageAlt: 'Nicole Oraekie speaking on stage at the FCDC Meetup in Abuja, with the event screen behind her.',
    imagePosition: '50% 35%',
    description: 'Marketing meetup run by the Freelance Coalition for Developing Countries.',
  },
  {
    event: 'Raising Girls Summit 2024',
    format: 'Panel',
    date: '15 November 2024',
    location: 'Abuja',
    image: '/images/speaking/raising-girls-summit.jpg',
    imageAlt: 'Nicole Oraekie speaking on a panel at the Raising Girls Summit 2024 in Abuja.',
    imagePosition: '50% 30%',
    description: 'Panel at the Raising Women Initiative’s summit. Billed as a Young Emerging Leader in Tech.',
  },
];

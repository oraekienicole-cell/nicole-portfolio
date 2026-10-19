/*
 * Events Nicole has spoken at. Add new talks to the top of the list.
 * Leave `talk`, `year` and `href` undefined until they're confirmed.
 */

export type Talk = {
  event: string;
  location?: string;
  talk?: string;
  year?: string;
  href?: string;
};

export const talks: Talk[] = [
  { event: 'Search Africon' },
  { event: 'FCDC Meetup', location: 'Abuja' },
  { event: 'Raising Girls Summit' },
];

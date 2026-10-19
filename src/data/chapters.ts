/* The six chapters every case study is written in, and the question each one answers. */
export const chapters = [
  { key: 'context', label: 'Context', question: 'What was happening?' },
  { key: 'challenge', label: 'The problem', question: 'What did I notice that mattered?' },
  { key: 'bet', label: 'The bet', question: 'What did I decide to do about it?' },
  { key: 'approach', label: 'What I did', question: 'What did I actually make or change?' },
  { key: 'results', label: 'What changed', question: 'What happened?' },
  { key: 'reflection', label: 'What I’d do differently', question: 'What did I learn?' },
] as const;

export type ChapterKey = (typeof chapters)[number]['key'];

/* The chapters every case study is written in. Empty chapters are skipped. */
export const chapters = [
  { key: 'context', label: 'Context' },
  { key: 'challenge', label: 'The problem' },
  { key: 'bet', label: 'The decision' },
  { key: 'approach', label: 'What I did' },
  { key: 'results', label: 'Result' },
  { key: 'reflection', label: 'What I’d do differently' },
] as const;

export type ChapterKey = (typeof chapters)[number]['key'];

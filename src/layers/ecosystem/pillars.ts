export const PILLARS = [
  { slug: 'legal', title: 'Legal support', status: 'planned' },
  { slug: 'unemployment', title: 'Employment', status: 'planned' },
  { slug: 'mind', title: 'Mind and wellbeing', status: 'planned' },
  { slug: 'family', title: 'Family', status: 'planned' },
  { slug: 'drug', title: 'Substance recovery', status: 'planned' },
  { slug: 'green', title: 'Green community', status: 'planned' },
  { slug: 'idea', title: 'Ideas and learning', status: 'planned' },
  { slug: 'alive', title: 'aLive Bangladesh coordination', status: 'existing-mvp' },
  { slug: 'services', title: 'Digital services', status: 'planned' },
] as const;

export function getPillar(slug: string) {
  return PILLARS.find((pillar) => pillar.slug === slug) ?? null;
}

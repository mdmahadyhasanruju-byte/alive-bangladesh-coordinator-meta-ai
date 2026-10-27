export const LIFE_DIMENSIONS = [
  'mental', 'direction', 'financial', 'emotional', 'discipline', 'spiritual', 'risk', 'execution',
] as const;

export type LifeDimension = (typeof LIFE_DIMENSIONS)[number];
export type LifeState = Record<LifeDimension, number>;

export type IdentityProfile = {
  id: string;
  displayName?: string;
  role?: 'participant' | 'coordinator' | 'reviewer' | 'admin';
  lifeState?: LifeState;
  createdAt: string;
};

export function isLifeState(value: unknown): value is LifeState {
  if (!value || typeof value !== 'object') return false;
  return LIFE_DIMENSIONS.every((dimension) => {
    const score = (value as Record<string, unknown>)[dimension];
    return typeof score === 'number' && Number.isFinite(score) && score >= 0 && score <= 100;
  });
}

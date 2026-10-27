import { LIFE_DIMENSIONS, type LifeDimension, type LifeState } from '../identity/profile';

export type AssessmentLevel = 'zero' | 'basic' | 'advanced' | 'pro';
export const ASSESSMENT_QUESTION_COUNTS: Record<AssessmentLevel, number> = {
  zero: 21, basic: 50, advanced: 75, pro: 100,
};

export type AssessmentAnswer = {
  dimension: LifeDimension;
  score: number;
};

export function calculateDimensionScore(answers: readonly AssessmentAnswer[], dimension: LifeDimension): number | null {
  const values = answers
    .filter((answer) => answer.dimension === dimension && Number.isFinite(answer.score) && answer.score >= 0 && answer.score <= 100)
    .map((answer) => answer.score);
  if (!values.length) return null;
  return Math.round(values.reduce((sum, score) => sum + score, 0) / values.length);
}

export function calculateLifeState(answers: readonly AssessmentAnswer[]): Partial<LifeState> {
  return Object.fromEntries(
    LIFE_DIMENSIONS.flatMap((dimension) => {
      const score = calculateDimensionScore(answers, dimension);
      return score === null ? [] : [[dimension, score]];
    }),
  ) as Partial<LifeState>;
}

export function summarizeAssessment(answers: readonly AssessmentAnswer[]) {
  const dimensions = calculateLifeState(answers);
  const scores = Object.values(dimensions);
  const score = scores.length ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length) : null;
  const risk = score === null ? 'UNKNOWN' : score < 35 ? 'HIGH' : score < 60 ? 'MODERATE' : 'LOW';
  return { score, risk, dimensions, state: [], plan: ['7-day reset', '30-day structure', '90-day reflection'] } as const;
}

// These are prompts for a consented reflection, not clinical or validated diagnostic questions.
export type AssessmentQuestion = { id: string; text: string; dimension: LifeDimension };
export const ZERO_LEVEL_QUESTIONS: readonly AssessmentQuestion[] = [
  { id: 'mental-1', text: 'Can you focus on one task for a short time?', dimension: 'mental' },
  { id: 'mental-2', text: 'Can you pause and think before a difficult decision?', dimension: 'mental' },
  { id: 'mental-3', text: 'Do you know where to seek help when overwhelmed?', dimension: 'mental' },
  { id: 'direction-1', text: 'Can you name one useful next step?', dimension: 'direction' },
  { id: 'direction-2', text: 'Do your current priorities feel clear to you?', dimension: 'direction' },
  { id: 'direction-3', text: 'Can you describe a goal for the next month?', dimension: 'direction' },
  { id: 'financial-1', text: 'Do you have a basic view of money coming in and going out?', dimension: 'financial' },
  { id: 'financial-2', text: 'Can you identify one practical financial support option?', dimension: 'financial' },
  { id: 'emotional-1', text: 'Can you name how you are feeling today?', dimension: 'emotional' },
  { id: 'emotional-2', text: 'Do you have someone safe to talk with?', dimension: 'emotional' },
  { id: 'emotional-3', text: 'Can you make time to recover after stress?', dimension: 'emotional' },
  { id: 'discipline-1', text: 'Do you finish what you start?', dimension: 'discipline' },
  { id: 'discipline-2', text: 'Can you keep one small routine most days?', dimension: 'discipline' },
  { id: 'discipline-3', text: 'Can you return to a task after a setback?', dimension: 'discipline' },
  { id: 'spiritual-1', text: 'Do you have values or beliefs that help guide choices?', dimension: 'spiritual' },
  { id: 'spiritual-2', text: 'Do you have a practice that helps you find meaning?', dimension: 'spiritual' },
  { id: 'risk-1', text: 'Can you identify a situation that may put your safety at risk?', dimension: 'risk' },
  { id: 'risk-2', text: 'Do you know a trusted person or service to contact in an urgent situation?', dimension: 'risk' },
  { id: 'execution-1', text: 'Can you complete one small task today?', dimension: 'execution' },
  { id: 'execution-2', text: 'Can you ask for help needed to finish a task?', dimension: 'execution' },
  { id: 'execution-3', text: 'Can you review what worked and adjust your next step?', dimension: 'execution' },
];

export type { LifeDimension, LifeState };

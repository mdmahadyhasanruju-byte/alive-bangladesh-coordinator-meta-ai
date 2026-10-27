import type { AssessmentAnswer } from './dlas-v2';
import { summarizeAssessment } from './dlas-v2';
import type { LifeDimension } from '../identity/profile';
import { createWeeklyPlan } from '../action/tasks';

export const RESPONSE_SCORE: Record<'Never' | 'Rarely' | 'Sometimes' | 'Usually' | 'Always', number> = {
  Never: 0, Rarely: 25, Sometimes: 50, Usually: 75, Always: 100,
};

export const SCORING_QUESTIONS: ReadonlyArray<{ id: string; text: string; dimension: LifeDimension }> = [
  { id: 'discipline-finish', text: 'Do you finish what you start?', dimension: 'discipline' },
  { id: 'direction-next-step', text: 'Can you name one useful next step?', dimension: 'direction' },
  { id: 'execution-small-task', text: 'Can you complete one small task today?', dimension: 'execution' },
];

export function scoreResponse(questionId: string, answer: keyof typeof RESPONSE_SCORE): AssessmentAnswer | null {
  const question = SCORING_QUESTIONS.find((item) => item.id === questionId);
  return question ? { dimension: question.dimension, score: RESPONSE_SCORE[answer] } : null;
}

export function predictGrowth(input: { discipline?: number; direction?: number; learning?: number }) {
  if ((input.discipline ?? 0) <= 28 && (input.direction ?? 0) <= 31) {
    return { label: 'Possible stagnation risk over 90 days', basis: 'Illustrative threshold rule; not a prediction about an individual.' };
  }
  if ((input.discipline ?? 0) >= 81 && (input.learning ?? 0) >= 76) {
    return { label: 'Conditions may support steady growth', basis: 'Illustrative threshold rule; not a prediction about an individual.' };
  }
  return { label: 'Not enough inputs for a useful signal', basis: 'Threshold rule.' };
}

export function suggestAutomations(input: { direction?: number; learning?: number; unemployed?: boolean }) {
  return [
    ...(typeof input.direction === 'number' && input.direction < 30 ? ['offer_weekly_plan'] : []),
    ...(typeof input.learning === 'number' && input.learning < 40 ? ['suggest_learning_path'] : []),
    ...(input.unemployed ? ['offer_unemployment_pathway'] : []),
  ];
}

export function runAutomationEngine(input: { direction?: number; learning?: number; unemployed?: boolean }) {
  return {
    weeklyPlan: typeof input.direction === 'number' && input.direction < 30 ? createWeeklyPlan() : [],
    learningPathRecommendation: typeof input.learning === 'number' && input.learning < 40,
    unemploymentPathwaySuggestion: input.unemployed === true,
    requiresHumanReview: true as const,
    persisted: false as const,
  };
}

export { summarizeAssessment };

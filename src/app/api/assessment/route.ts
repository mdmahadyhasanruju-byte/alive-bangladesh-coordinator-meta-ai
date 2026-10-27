import { NextResponse } from 'next/server';
import { LIFE_DIMENSIONS, type LifeDimension } from '@/layers/identity/profile';
import { summarizeAssessment, type AssessmentAnswer } from '@/layers/intelligence/dlas-v2';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: { answers?: unknown };
  try { body = await request.json() as { answers?: unknown }; }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
  if (!Array.isArray(body.answers) || body.answers.length > 100) {
    return NextResponse.json({ error: 'answers must be an array of up to 100 items' }, { status: 400 });
  }
  const answers: AssessmentAnswer[] = [];
  for (const value of body.answers) {
    if (!value || typeof value !== 'object') return NextResponse.json({ error: 'Invalid answer' }, { status: 400 });
    const answer = value as { dimension?: unknown; score?: unknown };
    if (!LIFE_DIMENSIONS.includes(answer.dimension as LifeDimension) || typeof answer.score !== 'number' || !Number.isFinite(answer.score) || answer.score < 0 || answer.score > 100) {
      return NextResponse.json({ error: 'Invalid dimension or score' }, { status: 400 });
    }
    answers.push({ dimension: answer.dimension as LifeDimension, score: answer.score });
  }
  return NextResponse.json({ ...summarizeAssessment(answers), synthetic: true, stored: false, notice: 'Reflective demo score only; not clinical or validated.' }, { headers: { 'Cache-Control': 'no-store' } });
}

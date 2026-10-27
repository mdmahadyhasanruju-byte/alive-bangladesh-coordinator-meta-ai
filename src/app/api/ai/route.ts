import { NextResponse } from 'next/server';
import { aggregate, getSyntheticDemoFindings } from '@/layers/intelligence/multi-agent';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  let body: { prompt?: unknown };
  try { body = await request.json() as { prompt?: unknown }; }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
  if (typeof body.prompt !== 'string' || body.prompt.length > 4_000) {
    return NextResponse.json({ error: 'A prompt up to 4000 characters is required' }, { status: 400 });
  }
  const demo = aggregate(getSyntheticDemoFindings());
  return NextResponse.json({
    emotionalState: 'Example reflection only; no personal analysis is performed.',
    rootProblem: 'Not assessed: this endpoint uses static synthetic demo data.',
    actionPlan: ['Choose one small task', 'Review the plan with a trusted person'],
    transparency: demo,
    synthetic: true,
  }, { headers: { 'Cache-Control': 'no-store' } });
}

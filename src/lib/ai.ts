export type DemoAiResult = { emotionalState: string; rootProblem: string; actionPlan: string[]; synthetic: true };

export async function runAI(prompt: string): Promise<DemoAiResult> {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  if (!response.ok) throw new Error('AI demo endpoint unavailable');
  return response.json() as Promise<DemoAiResult>;
}

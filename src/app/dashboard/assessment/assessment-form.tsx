'use client';

import { useState } from 'react';
import type { LifeDimension } from '@/layers/identity/profile';
import { ZERO_LEVEL_QUESTIONS } from '@/layers/intelligence/dlas-v2';

const choices = [{ label: 'Never', score: 0 }, { label: 'Rarely', score: 25 }, { label: 'Sometimes', score: 50 }, { label: 'Usually', score: 75 }, { label: 'Always', score: 100 }];

export function AssessmentForm() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const questions = ZERO_LEVEL_QUESTIONS;
  const dimensions = Object.fromEntries([...new Set(questions.map((q) => q.dimension))].flatMap((dimension) => {
    const scores = questions.filter((q) => q.dimension === dimension && answers[q.id] !== undefined).map((q) => answers[q.id]);
    return scores.length ? [[dimension, Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)]] : [];
  })) as Partial<Record<LifeDimension, number>>;
  const done = questions.every((q) => answers[q.id] !== undefined);
  const score = done ? Math.round(Object.values(dimensions).reduce((sum, value) => sum + (value ?? 0), 0) / Object.values(dimensions).length) : null;
  return <div><p className="mt-2 text-slate-600">Optional 21-question reflective assessment. Scores are not diagnostic and stay in this page until you leave.</p><div className="mt-6 grid gap-4">{questions.map((q, i) => <fieldset className="rounded-xl border border-slate-200 p-4" key={q.id}><legend className="px-1 font-medium">{i + 1}. {q.text}</legend><div className="mt-3 flex flex-wrap gap-2">{choices.map((choice) => <button type="button" aria-pressed={answers[q.id] === choice.score} onClick={() => setAnswers((old) => ({ ...old, [q.id]: choice.score }))} className={`rounded-full border px-3 py-1 text-sm ${answers[q.id] === choice.score ? 'border-slate-950 bg-slate-950 text-white' : ''}`} key={choice.label}>{choice.label}</button>)}</div></fieldset>)}</div>{score !== null && <section className="mt-6 rounded-2xl bg-emerald-50 p-5"><h2 className="font-semibold">Reflection score: {score}/100</h2><div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">{Object.entries(dimensions).map(([dimension, value]) => <div key={dimension}><span className="text-sm capitalize">{dimension}</span><div className="mt-1 h-2 rounded bg-emerald-200"><div className="h-2 rounded bg-emerald-700" style={{ width: `${value}%` }} /></div><span className="text-sm">{value}</span></div>)}</div><p className="mt-3 text-sm">This simple demo score is not a validated measure or clinical assessment.</p></section>}</div>;
}

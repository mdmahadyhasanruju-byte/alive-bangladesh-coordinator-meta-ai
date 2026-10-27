import { getSyntheticDemoFindings, aggregate } from '@/layers/intelligence/multi-agent';

export default function AiGuidePage() {
  const result = aggregate(getSyntheticDemoFindings());
  return <><h1 className="text-3xl font-bold">meYoo · reflection companion</h1><div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm">Synthetic demo only: the following statements are scripted examples, not conclusions about you or any real participant.</div><p className="mt-3 text-sm text-slate-600">Illustrative aggregate confidence: {Math.round((result.confidence ?? 0) * 100)}% · This is not a calibrated probability.</p><div className="mt-5 grid gap-3">{result.findings.map((finding) => <article className="rounded-xl border border-slate-200 p-4" key={finding.agent}><h2 className="font-semibold">{finding.agent}</h2><p className="mt-1">{finding.observation}</p><p className="mt-1 text-xs text-slate-500">Basis: {finding.basis} · confidence {finding.confidence}</p></article>)}</div><p className="mt-4 text-sm">No personal assessment, prediction, or automated action is connected.</p></>;
}

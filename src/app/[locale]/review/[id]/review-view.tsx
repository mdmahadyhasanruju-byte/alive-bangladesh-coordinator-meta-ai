'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import bn from '@/i18n/bn.json';
import en from '@/i18n/en.json';
import ar from '@/i18n/ar.json';
import { getClientVisit, saveClientVisit, type ClientVisitRecord } from '@/db/client-demo-store';
import type { ReviewApproval } from '@/db/demo-store';

const messages = { bn, en, ar };

export default function ReviewView({ locale, visitId }: { locale: 'bn' | 'en' | 'ar'; visitId: string }) {
  const copy = messages[locale];
  const [record, setRecord] = useState<ClientVisitRecord | null>(null);
  const [reviewer, setReviewer] = useState('');
  const [need, setNeed] = useState('');
  const [commitment, setCommitment] = useState('');
  const [responsible, setResponsible] = useState('');
  const [deadline, setDeadline] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const found = getClientVisit(visitId);
    setRecord(found ?? null);
    if (found) {
      setNeed(found.ledger.need);
      setCommitment(found.ledger.commitment ?? '');
      setResponsible(found.ledger.responsible_person_only_if_explicit ?? '');
      setDeadline(found.ledger.deadline_only_if_unambiguous ?? '');
    }
  }, [visitId]);

  function decide(decision: 'approved' | 'rejected' | 'corrected') {
    if (!record || !reviewer.trim()) return;
    if (decision === 'corrected' && !reason.trim()) {
      setError('Correction reason is required.');
      return;
    }
    const correction = decision === 'corrected'
      ? { need, commitment, responsible_person: responsible, deadline, reason }
      : undefined;
    const approval: ReviewApproval = {
      id: crypto.randomUUID(),
      ledger_id: record.ledger.id,
      reviewer: reviewer.trim(),
      decision,
      correction,
      created_at: new Date().toISOString(),
    };
    const updated: ClientVisitRecord = {
      ...record,
      ledger: {
        ...record.ledger,
        need: decision === 'corrected' ? need : record.ledger.need,
        commitment: decision === 'corrected' ? (commitment || null) : record.ledger.commitment,
        responsible_person_only_if_explicit: decision === 'corrected' ? (responsible || null) : record.ledger.responsible_person_only_if_explicit,
        deadline_only_if_unambiguous: decision === 'corrected' ? (deadline || null) : record.ledger.deadline_only_if_unambiguous,
        status: decision === 'corrected' ? 'pending_review' : decision,
      },
      approvals: [...record.approvals, approval],
      draft: `${record.draft}\nAttribution: ${decision === 'approved' ? `internally approved by ${reviewer.trim()} [human approval]` : decision === 'rejected' ? `internally rejected by ${reviewer.trim()} [human review]` : `corrected by ${reviewer.trim()}: ${reason.trim()} [human correction]`}`,
    };
    saveClientVisit(updated);
    setRecord(updated);
    setError('');
  }

  if (!record) return <main className="mx-auto max-w-3xl space-y-4 px-5 py-10 text-slate-900"><h1 className="text-2xl font-bold">Review record unavailable</h1><p>This record is not present in this browser tab session. Return to New Field Visit and submit the synthetic demo again in this tab.</p><Link className="text-blue-800 underline" href={`/${locale}/new`}>New Field Visit</Link></main>;

  return <main className="mx-auto max-w-5xl space-y-6 px-5 py-10 text-slate-900">
    <header>
      <Link className="text-sm font-semibold text-blue-800 underline" href={`/${locale}`}>{copy.app_title}</Link>
      <h1 className="mt-3 text-3xl font-bold">{copy.review}: {record.visit.id}</h1>
      <p className="mt-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{copy.review_guard}</p>
      <p className="mt-2 text-xs text-slate-500">Demo record is held in this browser tab session and is not durable storage.</p>
    </header>
    <section className="grid gap-6 md:grid-cols-2">
      <article className="rounded-xl border border-slate-200 p-5">
        <h2 className="mb-3 text-xl font-bold">{copy.transcript}</h2>
        <p className="whitespace-pre-wrap">{record.transcript}</p>
        <ul className="mt-4 space-y-2 text-sm text-slate-600">{record.segments.map((segment, index) => <li key={`${segment.start_ms}-${index}`} className="rounded bg-slate-50 p-2">{segment.start_ms}-{segment.end_ms}ms · {segment.text}</li>)}</ul>
      </article>
      <article className="rounded-xl border border-slate-200 p-5">
        <h2 className="mb-3 text-xl font-bold">{copy.evidence}</h2>
        <ul className="space-y-2 text-sm">{record.evidence_refs.map((ref) => <li className="break-words rounded bg-slate-50 p-2" key={ref.id}>{ref.type}: {ref.ref}{ref.start_ms !== undefined ? ` (${ref.start_ms}-${ref.end_ms}ms)` : ''}</li>)}</ul>
        {record.image_observations.length > 0 && <p className="mt-3 text-sm">Image context only: {record.image_observations.join('; ')}</p>}
      </article>
    </section>
    <section className="grid gap-6 md:grid-cols-2">
      <article className="rounded-xl border border-slate-200 p-5">
        <h2 className="mb-3 text-xl font-bold">{copy.action_ledger}</h2>
        <dl className="space-y-3 text-sm">
          <div><dt className="font-semibold">Need</dt><dd>{record.ledger.need || '—'}</dd></div>
          <div><dt className="font-semibold">Description</dt><dd>{record.ledger.description_evidence_backed || '—'}</dd></div>
          <div><dt className="font-semibold">Commitment</dt><dd>{record.ledger.commitment || 'None stated'}</dd></div>
          <div><dt className="font-semibold">Responsible</dt><dd>{record.ledger.responsible_person_only_if_explicit || copy.responsible_unknown}</dd></div>
          <div><dt className="font-semibold">Deadline</dt><dd>{record.ledger.deadline_only_if_unambiguous || copy.deadline_unknown}</dd></div>
          <div><dt className="font-semibold">{copy.missing_info}</dt><dd>{record.ledger.missing_info.join(', ') || '—'}</dd></div>
          <div><dt className="font-semibold">{copy.follow_up}</dt><dd>{record.ledger.follow_up}</dd></div>
          <div><dt className="font-semibold">Confidence</dt><dd>{record.ledger.confidence} · model estimate, not truth</dd></div>
          <div><dt className="font-semibold">{copy.status}</dt><dd>{record.ledger.status}</dd></div>
        </dl>
      </article>
      <article className="rounded-xl border border-slate-200 p-5"><h2 className="mb-3 text-xl font-bold">{copy.draft_note}</h2><pre className="whitespace-pre-wrap break-words rounded bg-slate-50 p-4 text-sm">{record.draft}</pre></article>
    </section>
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
      <label className="block max-w-md text-sm font-semibold">{copy.reviewer}<input className="mt-2 block w-full rounded-lg border border-slate-300 p-3 font-normal" required maxLength={120} value={reviewer} onChange={(event) => setReviewer(event.target.value)} /></label>
      <p className="text-sm text-slate-600">{copy.review_guard}</p>
      <div className="flex flex-wrap gap-3">
        <button disabled={!reviewer.trim()} className="rounded-lg bg-green-800 px-4 py-2 font-semibold text-white disabled:opacity-50" onClick={() => decide('approved')} type="button">{copy.approve}</button>
        <button disabled={!reviewer.trim()} className="rounded-lg bg-red-800 px-4 py-2 font-semibold text-white disabled:opacity-50" onClick={() => decide('rejected')} type="button">{copy.reject}</button>
      </div>
      <details className="border-t pt-4"><summary className="cursor-pointer font-semibold">{copy.correct}</summary>
        <div className="grid gap-4 pt-4 md:grid-cols-2">
          <label className="text-sm font-semibold">Need<input className="mt-1 block w-full rounded border p-2 font-normal" value={need} onChange={(event) => setNeed(event.target.value)} /></label>
          <label className="text-sm font-semibold">Commitment<input className="mt-1 block w-full rounded border p-2 font-normal" value={commitment} onChange={(event) => setCommitment(event.target.value)} /></label>
          <label className="text-sm font-semibold">Responsible person<input className="mt-1 block w-full rounded border p-2 font-normal" value={responsible} onChange={(event) => setResponsible(event.target.value)} /></label>
          <label className="text-sm font-semibold">Deadline<input className="mt-1 block w-full rounded border p-2 font-normal" value={deadline} onChange={(event) => setDeadline(event.target.value)} /></label>
          <label className="text-sm font-semibold md:col-span-2">{copy.reason}<textarea className="mt-1 block w-full rounded border p-2 font-normal" value={reason} onChange={(event) => setReason(event.target.value)} /></label>
          <button className="rounded-lg bg-slate-800 px-4 py-2 font-semibold text-white md:col-span-2" onClick={() => decide('corrected')} type="button">Save correction for review</button>
        </div>
      </details>
      {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
      {record.approvals.length > 0 && <div className="border-t pt-4 text-sm"><h3 className="font-bold">Review history</h3><ul className="mt-2 space-y-2">{record.approvals.map((approval) => <li key={approval.id}>{approval.decision} · {approval.reviewer} · {approval.created_at}</li>)}</ul></div>}
      <Link className="inline-block text-blue-800 underline" href={`/${locale}/ledger`}>{copy.action_ledger}</Link>
    </section>
  </main>;
}
